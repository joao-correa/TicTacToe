'use strict';

const matchMakerWrapper = require('./matchMaker');
const room = require('./../room/index');
const subscribers = [];

module.exports = matchMakerWrapper({
	room,
	subscribers
});
