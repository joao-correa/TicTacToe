
const matchMakerWrapper = require('./../../../socket-service/matchMaker/matchMaker');

describe('matchMaker test', () => {
	it ('shout return a object with a subscription property', () => {
		const room = jest.fn();
		const subscribers = [];
		const matchMaker = matchMakerWrapper({
			room,
			subscribers,
		});

		expect(matchMaker).toBeDefined();
		expect(matchMaker.subscriber).toBeDefined();
	});

	it ('shout return a object with a subscription property - index test', () => {
		const matchMaker = require('./../../../socket-service/matchMaker');
		expect(matchMaker).toBeDefined();
		expect(matchMaker.subscriber).toBeDefined();
	});

	it('should call the room 1 time with de p1 e p2', () => {
		const room = jest.fn();
		const subscribers = [];
		const matchMaker = matchMakerWrapper({
			room,
			subscribers,
		});

		const player1 = {
			userName: 'p1',
		};
		const player2 = {
			userName: 'p2',
		};

		matchMaker.subscriber(player1);
		matchMaker.subscriber(player2);

		expect(room).toBeCalledTimes(1);
		expect(room).toBeCalledWith({ player1, player2 });
	});

	it('should return when called with a player already subscribed', () => {
		const room = jest.fn();
		const subscribers = [];
		const matchMaker = matchMakerWrapper({
			room,
			subscribers,
		});

		const player1 = {
			userName: 'p1',
		};

		matchMaker.subscriber(player1);
		matchMaker.subscriber(player1);

		expect(subscribers.length).toBe(1);
	});

});