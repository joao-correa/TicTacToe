'use strict';

const roomWrapper = ({
	judge,
	rooms,
}) => {

	return ({ player1, player2 }) => {
		rooms.push({ player1, player2 });
		judge({ player1, player2 });
	};
};

module.exports = roomWrapper;
