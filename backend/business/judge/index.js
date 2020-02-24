'use strict';

const judgeWrapper = require('./judge');
const rules = require('./../game');

module.exports = judgeWrapper({
	rules
});
