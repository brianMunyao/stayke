import md5 from 'md5';
const emailjs = require('emailjs-com');

export const capitalize = (str = '') => {
    return str
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
        .join(' ');
};

export const money = (str = '') => {
    return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const encrypt = (str = '') => {
    return md5(str);
};

export const sendEmail = (params) => {
    emailjs
        .send(
            process.env.serviceID,
            process.env.templateID,
            params,
            process.env.userID
        )
        .then(
            (res) => {
                // console.log('sent' + res);
            },
            (err) => {
                // console.log('not sent', err);
            }
        );
};

export const randomGen = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

export const counties = [
    'Baringo',
    'Bomet',
    'Bungoma',
    'Busia',
    'Elgeyo-Marakwet',
    'Embu',
    'Garissa',
    'Homa-bay',
    'Isiolo',
    'Kajiado',
    'Kakamega',
    'Kericho',
    'Kiambu',
    'Kilifi',
    'Kirinyaga',
    'Kisii',
    'Kisumu',
    'Kitui',
    'Kwale',
    'Laikipia',
    'Lamu',
    'Machakos',
    'Makueni',
    'Mandera',
    'Marsabit',
    'Meru',
    'Migori',
    'Mombasa',
    'Muranga',
    'Nairobi',
    'Nakuru',
    'Nandi',
    'Narok',
    'Nyamira',
    'Nyandarua',
    'Nyeri',
    'Samburu',
    'Siaya',
    'Taita-Taveta',
    'Tana River',
    'Tharaka-Nithi',
    'Trans-Nzoia',
    'Turkana',
    'Uasin Gishu',
    'Vihiga',
    'Wajir',
    'West Pokot',
];