'use strict';

const roomWrapper = require('./room');
const judge = require('./../judge');
const rooms = [];

module.exports = roomWrapper({
	judge,
	rooms,
});
