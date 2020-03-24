const dao = require('../dao');
const user = require('./user-business')({ dao });

module.exports = {
	user,
};
