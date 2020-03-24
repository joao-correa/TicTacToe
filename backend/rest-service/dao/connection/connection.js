const { MongoClient } = require('mongodb');

exports.creteConenction = ({ dburi, client = MongoClient }) => {
	const locals = {};
	const connect = async () => {
		if (locals.conn) return locals.conn;
		locals.conn = await client.connect(dburi, { useUnifiedTopology: true });
		return locals.conn;
	};

	return {
		async getDb(dbname) {
			const conn = await connect();
			return conn.db(dbname);
		},
	};
};