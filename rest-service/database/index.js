const conn = require('./connection');
const user = require('./player-dao')(conn);

module.exports = {
	user
};