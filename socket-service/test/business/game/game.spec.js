
const gameRules = require('./../../../business/game');

describe('test - rules of the game.', () => {
	it('gameState - should return a object with the game`s initial state.', () => {
		const state = gameRules.gameState();
		expect(state).toBeInstanceOf(Object);
	}); 

	it('gameReset - should return a object with the game`s initial state.', () => {
		const state = gameRules.gameState();
		state['A1'].player = 'test';
		state['A1'].value = 'X';
		gameRules.gameReset({ state });
		expect(state['A1'].value).toBe('');
		expect(state['A1'].player).toBe('');
	}); 

	it('play - should mard de postion with de value and player recivied.', () => {
		const state = gameRules.gameState();
		const data = {
			position: 'A1',
		};
		const player = {
			userName: 'test',
			mark: 'X',
		};
		const returnedState = gameRules.play({
			player,
			state,
			data,
		});

		expect(returnedState).toEqual(state);
		expect(state[data.position].value).toEqual(player.mark);
		expect(state[data.position].player).toEqual(player.userName);
	});

	it('verifyPlay - should return false when try play in a position already filled.', () => {
		const state = gameRules.gameState();
		const data = {
			position: 'A1',
		};

		state['A1'].player = 'test';
		state['A1'].value = 'X';

		const result = gameRules.verifyPlay({
			state,
			data,
		});

		expect(result).toBeFalsy();
	});

	it('verifyPlay - should return false when the position is already filled.', () => {
		const state = gameRules.gameState();
		const data = {
			position: 'A1',
		};

		state['A1'].player = 'test';
		state['A1'].value = 'X';

		const result = gameRules.verifyPlay({
			state,
			data,
		});

		expect(result).toBeFalsy();
	});

	it('verifyPlay - should return true when the position is not already filled.', () => {
		const state = gameRules.gameState();
		const data = {
			position: 'A2',
		};

		state['A1'].player = 'test';
		state['A1'].value = 'X';

		const result = gameRules.verifyPlay({
			state,
			data,
		});

		expect(result).toBeTruthy();
	});	

	it('verifyTurn - should return false when a player try play in turn of other player.', () => {
		const player = {
			userName: 'test',
			mark: 'X',
		};
		const turn = {
			player: {
				userName: 'test2',
				mark: 'O',
			}
		};

		const result = gameRules.verifyTurn({
			player,
			turn,
		});

		expect(result).toBeFalsy();
	});

	it('verifyTurn - should return true when a player try play in your turn.', () => {
		const player = {
			userName: 'test',
			mark: 'X',
		};
		const turn = {
			player,
		};

		const result = gameRules.verifyTurn({
			player,
			turn,
		});

		expect(result).toBeTruthy();
	});

	it('verifyWinner - should return true when some player win', () => {
		const player1 = {
			mark: 'X',
		};

		const player2 = {
			mark: 'O',
		};

		let state;

		state = {
			'A1' : { value: 'O', player: '' },
			'A2' : { value: 'O', player: '' },
			'A3' : { value: 'O', player: '' },
			'B1' : { value: '', player: '' },
			'B2' : { value: '', player: '' },
			'B3' : { value: '', player: '' },
			'C1' : { value: '', player: '' },
			'C2' : { value: '', player: '' },
			'C3' : { value: '', player: '' },
		};
		const retorno1 = gameRules.verifyWinner({
			player1,
			player2,
			state
		});
		expect(retorno1.winner).toBeTruthy();

		state = {
			'A1' : { value: '', player: '' },
			'A2' : { value: '', player: '' },
			'A3' : { value: '', player: '' },
			'B1' : { value: 'O', player: '' },
			'B2' : { value: 'O', player: '' },
			'B3' : { value: 'O', player: '' },
			'C1' : { value: '', player: '' },
			'C2' : { value: '', player: '' },
			'C3' : { value: '', player: '' },
		};
		const retorno2 = gameRules.verifyWinner({
			player1,
			player2,
			state
		});
		expect(retorno2.winner).toBeTruthy;

		state = {
			'A1' : { value: '', player: '' },
			'A2' : { value: '', player: '' },
			'A3' : { value: '', player: '' },
			'B1' : { value: '', player: '' },
			'B2' : { value: '', player: '' },
			'B3' : { value: '', player: '' },
			'C1' : { value: 'O', player: '' },
			'C2' : { value: 'O', player: '' },
			'C3' : { value: 'O', player: '' },
		};
		const retorno3 = gameRules.verifyWinner({
			player1,
			player2,
			state
		});
		expect(retorno3.winner).toBeTruthy;

		state = {
			'A1' : { value: 'O', player: '' },
			'A2' : { value: '', player: '' },
			'A3' : { value: '', player: '' },
			'B1' : { value: 'O', player: '' },
			'B2' : { value: '', player: '' },
			'B3' : { value: '', player: '' },
			'C1' : { value: 'O', player: '' },
			'C2' : { value: '', player: '' },
			'C3' : { value: '', player: '' },
		};
		const retorno4 = gameRules.verifyWinner({
			player1,
			player2,
			state
		});
		expect(retorno4.winner).toBeTruthy;

		state = {
			'A1' : { value: '', player: '' },
			'A2' : { value: 'O', player: '' },
			'A3' : { value: '', player: '' },
			'B1' : { value: '', player: '' },
			'B2' : { value: 'O', player: '' },
			'B3' : { value: '', player: '' },
			'C1' : { value: '', player: '' },
			'C2' : { value: 'O', player: '' },
			'C3' : { value: '', player: '' },
		};
		const retorno5 = gameRules.verifyWinner({
			player1,
			player2,
			state
		});
		expect(retorno5.winner).toBeTruthy;

		state = {
			'A1' : { value: '', player: '' },
			'A2' : { value: '', player: '' },
			'A3' : { value: 'O', player: '' },
			'B1' : { value: '', player: '' },
			'B2' : { value: '', player: '' },
			'B3' : { value: 'O', player: '' },
			'C1' : { value: '', player: '' },
			'C2' : { value: '', player: '' },
			'C3' : { value: 'O', player: '' },
		};
		const retorno6 = gameRules.verifyWinner({
			player1,
			player2,
			state
		});
		expect(retorno6.winner).toBeTruthy;

		state = {
			'A1' : { value: 'O', player: '' },
			'A2' : { value: '', player: '' },
			'A3' : { value: '', player: '' },
			'B1' : { value: '', player: '' },
			'B2' : { value: 'O', player: '' },
			'B3' : { value: '', player: '' },
			'C1' : { value: '', player: '' },
			'C2' : { value: '', player: '' },
			'C3' : { value: 'O', player: '' },
		};
		const retorno7 = gameRules.verifyWinner({
			player1,
			player2,
			state
		});
		expect(retorno7.winner).toBeTruthy;

		state = {
			'A1' : { value: '', player: '' },
			'A2' : { value: '', player: '' },
			'A3' : { value: 'O', player: '' },
			'B1' : { value: '', player: '' },
			'B2' : { value: 'O', player: '' },
			'B3' : { value: '', player: '' },
			'C1' : { value: 'O', player: '' },
			'C2' : { value: '', player: '' },
			'C3' : { value: '', player: '' },
		};
		const retorno8 = gameRules.verifyWinner({
			player1,
			player2,
			state
		});
		expect(retorno8.winner).toBeTruthy;

	});

	it('verifyWinner - should return false when no one win the game yet', () => {
		const player1 = {
			mark: 'X',
		};

		const player2 = {
			mark: 'O',
		};
		
		let state = {
			'A1' : { value: '', player: '' },
			'A2' : { value: '', player: '' },
			'A3' : { value: '', player: '' },
			'B1' : { value: '', player: '' },
			'B2' : { value: '', player: '' },
			'B3' : { value: '', player: '' },
			'C1' : { value: '', player: '' },
			'C2' : { value: '', player: '' },
			'C3' : { value: '', player: '' },
		};
		const retorno = gameRules.verifyWinner({
			player1,
			player2,
			state,
		});

		expect(retorno).toBeUndefined();
	});

	it('verifyEndGame - should return true when there is not position to be played.', () => {
		let state = {
			'A1' : { value: 'X', player: '' },
			'A2' : { value: 'X', player: '' },
			'A3' : { value: 'O', player: '' },
			'B1' : { value: 'X', player: '' },
			'B2' : { value: 'O', player: '' },
			'B3' : { value: 'O', player: '' },
			'C1' : { value: 'X', player: '' },
			'C2' : { value: 'X', player: '' },
			'C3' : { value: 'X', player: '' },
		};
		const retorno = gameRules.verifyEndGame({
			state,
		});

		expect(retorno).toBeTruthy();
	});

	it('verifyEndGame - should return false when there is position to be played.', () => {
		let state = {
			'A1' : { value: 'X', player: '' },
			'A2' : { value: 'X', player: '' },
			'A3' : { value: 'O', player: '' },
			'B1' : { value: 'X', player: '' },
			'B2' : { value: 'O', player: '' },
			'B3' : { value: 'O', player: '' },
			'C1' : { value: 'X', player: '' },
			'C2' : { value: '', player: '' },
			'C3' : { value: 'X', player: '' },
		};
		const retorno = gameRules.verifyEndGame({
			state,
		});

		expect(retorno).toBeFalsy();
	});

});
