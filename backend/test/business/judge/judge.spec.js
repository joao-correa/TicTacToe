
const judge = require('./../../../socket-service/judge');

describe('judge test', () => {
	it('startup game' , () => {
		let player1Fn = undefined;
		let player2Fn = undefined;

		let player1Response = undefined;
		let player2Response = undefined;

		let player1Event = undefined;
		let player2Event = undefined;

		const player1 = {
			on : (event, fn) => { player1Fn = fn; player1Event = event; },
			emit: (event, resp) => { player1Response = resp; player1Event = event; },
			userName: 'player1',
		};

		const player2 = {
			on : (event, fn) => { player2Fn = fn; player2Event = event; },
			emit: (event, resp) => { player2Response = resp; player2Event = event; },
			userName: 'player2',
		};

		judge({
			player1,
			player2,
		});

		expect(player1.mark).toBeDefined();
		expect(player2.mark).toBeDefined();
		expect(player1.mark).toEqual('X');
		expect(player2.mark).toEqual('O');
		expect(player1Fn).toBeDefined();
		expect(player2Fn).toBeDefined();
		expect(player1Event).toEqual('play');
		expect(player2Event).toEqual('play');
	});

	it('play - player2 make a move it turn of player1, and player 1 make a turn' , () => {
		let player1Fn = undefined;
		let player2Fn = undefined;

		let player1Response = undefined;
		let player2Response = undefined;

		let player1Event = undefined;
		let player2Event = undefined;

		const player1 = {
			on : (event, fn) => { player1Fn = fn; player1Event = event; },
			emit: (event, resp) => { player1Response = resp; player1Event = event; },
			userName: 'player1',
		};

		const player2 = {
			on : (event, fn) => { player2Fn = fn; player2Event = event; },
			emit: (event, resp) => { player2Response = resp; player2Event = event; },
			userName: 'player2',
		};

		judge({
			player1,
			player2,
		});

		player2Fn({
			position: 'A1',
		});

		expect(player2Response).toBeDefined();
		expect(player2Response.message).toEqual('Is not your turn.');
		expect(player2Event).toEqual('cantPlay');

		player1Fn({
			position: 'A1',
		});

		expect(player1Response.state).toBeDefined();
		expect(player2Response.state).toBeDefined();
		expect(player1Response.state).toEqual(player2Response.state);
	});

	it('play - player1 make a move then player2 make a move' , () => {
		let player1Fn = undefined;
		let player2Fn = undefined;

		let player1Response = undefined;
		let player2Response = undefined;

		let player1Event = undefined;
		let player2Event = undefined;

		const player1 = {
			on : (event, fn) => { player1Fn = fn; player1Event = event; },
			emit: (event, resp) => { player1Response = resp; player1Event = event; },
			userName: 'player1',
		};

		const player2 = {
			on : (event, fn) => { player2Fn = fn; player2Event = event; },
			emit: (event, resp) => { player2Response = resp; player2Event = event; },
			userName: 'player2',
		};

		judge({
			player1,
			player2,
		});

		player1Fn({
			position: 'A1',
		});

		player2Fn({
			position: 'A1',
		});

		expect(player2Response).toBeDefined();
		expect(player2Response.message).toEqual('You can`t play here.');
		expect(player2Event).toEqual('cantPlay');

		player2Fn({
			position: 'A2',
		});

		expect(player1Response.state).toBeDefined();
		expect(player2Response.state).toBeDefined();
		expect(player1Response.state).toEqual(player2Response.state);
	});

	it('play - players make a move and the player 1 win the game' , () => {
		let player1Fn = undefined;
		let player2Fn = undefined;

		let player1Response = undefined;
		let player2Response = undefined;

		let player1Event = undefined;
		let player2Event = undefined;

		const player1 = {
			on : (event, fn) => { player1Fn = fn; player1Event = event; },
			emit: (event, resp) => { player1Response = resp; player1Event = event; },
			userName: 'player1',
		};

		const player2 = {
			on : (event, fn) => { player2Fn = fn; player2Event = event; },
			emit: (event, resp) => { player2Response = resp; player2Event = event; },
			userName: 'player2',
		};

		judge({
			player1,
			player2,
		});

		player1Fn({
			position: 'B2',
		});

		player2Fn({
			position: 'B1',
		});

		player1Fn({
			position: 'A2',
		});

		player2Fn({
			position: 'A1',
		});

		player1Fn({
			position: 'C2',
		});

		expect(player1Event).toEqual('winner');
		expect(player1Response.message).toEqual('You win.');

		expect(player2Event).toEqual('lose');
		expect(player2Response.message).toEqual('You lose.');
	});

	it('play - players make a move and the player 2 win the game' , () => {
		let player1Fn = undefined;
		let player2Fn = undefined;

		let player1Response = undefined;
		let player2Response = undefined;

		let player1Event = undefined;
		let player2Event = undefined;

		const player1 = {
			on : (event, fn) => { player1Fn = fn; player1Event = event; },
			emit: (event, resp) => { player1Response = resp; player1Event = event; },
			userName: 'player1',
		};

		const player2 = {
			on : (event, fn) => { player2Fn = fn; player2Event = event; },
			emit: (event, resp) => { player2Response = resp; player2Event = event; },
			userName: 'player2',
		};

		judge({
			player1,
			player2,
		});

		player1Fn({
			position: 'B2',
		});

		player2Fn({
			position: 'B1',
		});

		player1Fn({
			position: 'A2',
		});

		player2Fn({
			position: 'A1',
		});

		player1Fn({
			position: 'A3',
		});

		player2Fn({
			position: 'C1',
		});

		expect(player2Event).toEqual('winner');
		expect(player2Response.message).toEqual('You win.');

		expect(player1Event).toEqual('lose');
		expect(player1Response.message).toEqual('You lose.');
	});

	it('play - reset game with winner' , async () => {
		let player1Fn = undefined;
		let player2Fn = undefined;

		let player1Event = undefined;
		let player2Event = undefined;

		const player1 = {
			on : (event, fn) => { player1Fn = fn; player1Event = event; },
			emit: (event, resp) => { player1Response = resp; player1Event = event; },
			userName: 'player1',
		};

		const player2 = {
			on : (event, fn) => { player2Fn = fn; player2Event = event; },
			emit: (event, resp) => { player2Response = resp; player2Event = event; },
			userName: 'player2',
		};

		judge({
			player1,
			player2,
		});

		player1Fn({
			position: 'B2',
		});

		player2Fn({
			position: 'B1',
		});

		player1Fn({
			position: 'A2',
		});

		player2Fn({
			position: 'A1',
		});

		player1Fn({
			position: 'A3',
		});

		const reset = await player2Fn({
			position: 'C1',
		});
		
		expect(player2Event).toEqual('update');
		expect(player1Event).toEqual('update');
	});

	it('play - reset game withou winner' , async () => {
		let player1Fn = undefined;
		let player2Fn = undefined;

		let player1Event = undefined;
		let player2Event = undefined;

		const player1 = {
			on : (event, fn) => { player1Fn = fn; player1Event = event; },
			emit: (event, resp) => { player1Response = resp; player1Event = event; },
			userName: 'player1',
		};

		const player2 = {
			on : (event, fn) => { player2Fn = fn; player2Event = event; },
			emit: (event, resp) => { player2Response = resp; player2Event = event; },
			userName: 'player2',
		};

		judge({
			player1,
			player2,
		});

		player1Fn({ position: 'A1' });
		player2Fn({ position: 'A2' });
		player1Fn({ position: 'A3' });
		player2Fn({ position: 'B2' });
		player1Fn({ position: 'B1' });
		player2Fn({ position: 'B3' });
		player1Fn({ position: 'C2' });
		player2Fn({ position: 'C1' });
		await player1Fn({ position: 'C3' });
		
		expect(player2Event).toEqual('update');
		expect(player1Event).toEqual('update');
	});
});
