const express = require('express');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const cloudinary = require('cloudinary');

require('dotenv').config();
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === 'production') {
    //serve static files
    app.use(express.static(path.join(__dirname, 'client/build')));
}

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
    secure: process.env.secure,
});

//---users routes
app.post('/user/login', async(req, res) => {
    const result = {};
    try {
        const { email, password } = req.body;
        const user = await pool.query(
            'SELECT id,fullname,email,phone FROM users WHERE email=$1 AND password=$2', [email, password]
        );

        if (user.rowCount === 1) {
            const props = await pool.query(
                'SELECT * FROM properties WHERE user_id=$1', [user.rows[0].id]
            );
            result.data = {
                ...user.rows[0],
                hasProperties: props.rowCount > 0,
            };
            res.json(result);
        } else {
            result.error = 'Invalid email or password';
            res.json(result);
        }
    } catch (e) {
        result.error = 'Server error. Try again later.';
        res.json(result);
    }
});
app.post('/user/signup', async(req, res) => {
    const result = {};
    try {
        const { fullname, phone, email, password } = req.body;

        //check email
        const checkEmail = await pool.query(
            'SELECT email FROM users WHERE email=$1', [email]
        );
        if (checkEmail.rowCount > 0) {
            result.error = 'Email already exists';
        } else {
            const user = await pool.query(
                'INSERT INTO users (fullname,phone,email,password) VALUES($1,$2,$3,$4) RETURNING id,fullname,email,phone', [fullname, phone, email, password]
            );
            result.data = {...user.rows[0], hasProperties: false };
        }
    } catch (e) {
        result.error = 'Error creating account. Try again later.';
    }
    res.json(result);
});

const upload = multer({
    fileFilter: (req, file, cb) => {
        const validImgs = /jpg|jpeg|png/;

        const ext = validImgs.test(
            path.extname(file.originalname).toLowerCase()
        );
        if (file.mimetype && ext) {
            return cb(null, true);
        } else {
            return cb('Error: images only');
        }
    },
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'client/public/uploads/');
        },
        filename: (req, file, cb) => {
            let img_name = Date.now() + path.extname(file.originalname);
            cb(null, img_name);
        },
    }),
}).single('file');

let PROPERTY_QUERY =
    'SELECT properties.*, users.fullname, users.email, users.phone FROM properties INNER JOIN users ON properties.user_id=users.id ';

//get house data

app.route('/')
    .get(async(req, res) => {
        const result = {};
        try {
            const properties = await pool.query(
                `${PROPERTY_QUERY} WHERE properties.img1 IS NOT null`
            );
            result.data = properties.rows;
        } catch (e) {
            result.error = 'Error getting houses';
        }
        res.json(result);
    })
    .post(async(req, res) => {
        const result = {};
        try {
            const newProperty = await pool.query(
                `INSERT INTO properties (${Object.keys(
					req.body
				)}) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
                Object.values(req.body)
            );
            result.data = newProperty.rows[0];
        } catch (e) {
            result.error = 'Server error. Try again later.';
            console.log(e);
        }
        res.json(result);
    });

// //get properties by owner id
app.get('/properties/:id', async(req, res) => {
    const result = {};
    try {
        const properties = await pool.query(
            `${PROPERTY_QUERY} WHERE properties.user_id=$1`, [req.params.id]
        );
        result.data = properties.rows;
    } catch (e) {
        result.error = 'Error getting houses';
    }
    res.json(result);
});

//get specific house
app.route('/property/:id')
    .get(async(req, res) => {
        const result = {};
        try {
            const property = await pool.query(
                `${PROPERTY_QUERY} WHERE properties.id=$1`, [req.params.id]
            );
            const relParams = [
                property.rows[0].no_of_bathrooms,
                property.rows[0].no_of_bedrooms,
                property.rows[0].town,
                property.rows[0].county,
            ];

            const related = await pool.query(
                `${PROPERTY_QUERY} WHERE no_of_bathrooms=$1 OR no_of_bedrooms=$2 OR town ILIKE $3 OR county ILIKE $4 AND img1 IS NOT null`,
                relParams
            );

            result.data = property.rows[0];
            result.related = related.rows.filter((r) => r.img1);
        } catch (e) {
            result.error = 'Error getting house';
        }
        res.json(result);
    })
    .put(async(req, res) => {
        const result = {};
        const { id } = req.params;

        const { key, value } = req.body;
        if (!key) {
            try {
                upload(req, res, async(err) => {
                    if (err) {
                        result.error = err;
                    } else {
                        result.path = res.req.file.filename;
                        try {
                            const filepath =
                                __dirname +
                                '\\client\\public\\uploads\\' +
                                req.file.filename;

                            let imgUpdateQuery =
                                'UPDATE properties SET img1=$1 WHERE id=$2 RETURNING *';

                            const checkImg = await pool.query(
                                'SELECT img1 from properties WHERE id=$1', [id]
                            );
                            if (checkImg.rows[0].img1 !== null) {
                                imgUpdateQuery =
                                    'UPDATE properties SET img2=$1 WHERE id=$2 RETURNING *';
                            }

                            await cloudinary.uploader.upload(
                                filepath,
                                async(r, err) => {
                                    await pool
                                        .query(imgUpdateQuery, [
                                            r.secure_url,
                                            id,
                                        ])
                                        .then((re) => console.log(re.rows))
                                        .catch((e) => console.log(e));

                                    result.data = r.secure_url;
                                }
                            );
                        } catch (cloud_err) {
                            console.log(cloud_err);
                        }
                    }
                    res.json(result);
                });
            } catch (e) {
                result.error = 'File not accessible';
                res.json(result);
            }
        } else {
            try {
                const updated = await pool.query(
                    `UPDATE properties SET ${key}=$1 WHERE id=$2 RETURNING *`, [value, id]
                );
                result.data = updated.rows[0];
            } catch (e) {
                result.error = 'Could not update information';
            }
            res.json(result);
        }
    })
    .delete(async(req, res) => {
        const result = {};
        try {
            const removed = await pool.query(
                'DELETE FROM properties WHERE id=$1 RETURNING *', [req.params.id]
            );
            result.data = removed.rows[0];
        } catch (e) {
            result.error = 'Unable to delete property';
        }
    });

app.put('/property/update/:id', async(req, res) => {
    const result = {};
    const query = `UPDATE properties SET ${req.body.label}=null WHERE id=$1 RETURNING *`;
    try {
        const removed = await pool.query(query, [req.params.id]);
        result.data = removed.rows[0];
    } catch (e) {
        result.error = 'Unable to delete image';
    }
    res.json(result);
});

app.get('/search', async(req, res) => {
    const result = {};
    const { term, bathrooms, bedrooms, rent } = req.query;

    let searchQuery = PROPERTY_QUERY;
    const AND = ' AND ';
    const WHERE = ' WHERE ';
    let whereAbsent = true;
    let queryParams = [];

    const getParamNum = (val) => {
        const res = `$${queryParams.length + 1}`;
        queryParams.push(val);
        return res;
    };

    const checkWhere = (str) => {
        if (whereAbsent) {
            whereAbsent = false;
            return WHERE + str;
        }
        return AND + str;
    };

    if (term.length > 0) {
        const pNum = getParamNum('%' + term + '%');
        searchQuery += checkWhere(
            ` town ILIKE ${pNum} OR county ILIKE ${pNum} OR apt_name ILIKE ${pNum} `
        );
    }
    if (bedrooms != 0) {
        const pNum = getParamNum(bedrooms);
        if (bedrooms === 3) {
            searchQuery += checkWhere(`no_of_bedrooms>=${pNum}`);
        } else {
            searchQuery += checkWhere(`no_of_bedrooms=${pNum}`);
        }
    }
    if (bathrooms != 0) {
        const pNum = getParamNum(bathrooms);
        if (bathrooms === 3) {
            searchQuery += checkWhere(`no_of_bathrooms>=${pNum}`);
        } else {
            searchQuery += checkWhere(`no_of_bathrooms=${pNum}`);
        }
    }

    const pNum1 = getParamNum(rent[0]);
    const pNum2 = getParamNum(rent[1]);
    searchQuery += checkWhere(`rent>=${pNum1} AND rent<=${pNum2}`);

    searchQuery += checkWhere('img1 IS NOT null');

    try {
        const searched = await pool.query(searchQuery, queryParams);
        result.data = searched.rows.filter((r) => r.img1);
        let alt = await pool.query(PROPERTY_QUERY + ' WHERE img1 IS NOT null');
        result.alt = alt.rows;
    } catch (e) {
        result.error = 'Error in searching' + e;
    }
    res.json(result);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));