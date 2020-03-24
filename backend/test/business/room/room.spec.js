
const roomWrapper = require('./../../../socket-service/room/room');

describe('room test', () => {
	it ('should call judge with de p1 and p2', () => {
		const player1 = {
			userName: 'p1',
		};
		const player2 = {
			userName: 'p2',
		};

		const judge = jest.fn();
		const rooms = [];

		const room = roomWrapper({
			judge,
			rooms,
		});

		room({
			player1,
			player2,
		});

		expect(judge).toBeCalledTimes(1);
		expect(judge).toBeCalledWith({
			player1,
			player2,
		});
		expect(rooms.length).toBe(1);
	});
});
