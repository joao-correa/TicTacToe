const business = require('../business');

const auth = require('./auth-controller')({ business });
const user = require('./user-controller')({ business });

module.exports = {
	user,
	auth,
};
