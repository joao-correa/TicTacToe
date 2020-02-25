'use strict';

const matchMakerWrapper = ({
	room,
	subscribers,
}) => {

	return {
		subscriber: (socket) => {
			if (subscribers.find(sub => sub.userName == socket.userName))
				return;

			subscribers.push(socket);

			while (subscribers.length >= 2) {
				const player1 = subscribers.shift();
				const player2 = subscribers.shift();
				room({
					player1,
					player2
				});
			}
		}
	};
};

module.exports = matchMakerWrapper;
