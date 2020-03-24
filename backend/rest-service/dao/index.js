const conn = require('./connection');
const user = require('./user-dao')(conn);

module.exports = {
	user
};