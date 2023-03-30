const Pool = require('pg').Pool;
require('dotenv').config();

// const devConfig = `postgresql://${process.env.user}:${process.env.password}@${process.env.host}:${process.env.DB_PORT}/${process.env.database}`;

// const proConfig = process.env.DATABASE_URL;

const pool = new Pool({
	user: 'postgres',
	password: 'postgrespassword',
	host: 'db',
	port: 5432,
	database: 'stayke',
	// connectionString: process.env.DATABASE_URL,
	ssl: process.env.NODE_ENV
		? {
				require: true,
				rejectUnauthorized: false,
		  }
		: false,
});

module.exports = pool;
