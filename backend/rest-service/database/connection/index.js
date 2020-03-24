require('dotenv').config();

module.exports = require('./connection')
	.creteConenction({
		dburi: process.env.DBURI,
	}).getDb(process.env.DB_NAME);
