const Pool = require('pg').Pool;
require('dotenv').config();

// const devConfig = {
//     user: process.env.user,
//     password: process.env.password,
//     host: process.env.host,
//     port: process.env.DB_PORT,
//     database: process.env.database,
// };

const devConfig = `postgresql://${process.env.user}:${process.env.password}@${process.env.host}:${process.env.DB_PORT}/${process.env.database}`;

const proConfig = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString: process.env.NODE_ENV === 'production' ? proConfig : devConfig,
});

module.exports = pool;