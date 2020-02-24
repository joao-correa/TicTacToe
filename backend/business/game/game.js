'use strict';

const clonedeep = require('lodash.clonedeep');

module.exports = {
	gameState: () => (clonedeep({
		'A1': { value: '', player: '' },
		'A2': { value: '', player: '' },
		'A3': { value: '', player: '' },
		'B1': { value: '', player: '' },
		'B2': { value: '', player: '' },
		'B3': { value: '', player: '' },
		'C1': { value: '', player: '' },
		'C2': { value: '', player: '' },
		'C3': { value: '', player: '' },
	})),
	gameReset: ({
		state
	}) => {
		const positions = Object.keys(state);
		for (const position of positions) {
			state[position].value = '';
			state[position].player = '';
		}
	},
	play: ({
		player,
		state,
		data
	}) => {
		state[data.position].player = player.userName;
		state[data.position].value = player.mark;
		return state;
	},
	verifyPlay: ({
		state,
		data
	}) => {
		if (state[data.position].value !== '')
			return false;

		return true;
	},
	verifyTurn: ({
		player,
		turn,
	}) => {
		if (turn.player != player)
			return false;

		return true;
	},
	verifyWinner: ({
		player1,
		player2,
		state,
	}) => {
		const players = [player1, player2];

		for (const player of players) {
			let isWinner = false;
			const mark = player.mark;

			if (state['A1'].value == mark && state['A2'].value == mark && state['A3'].value == mark) {
				isWinner = true;
			} else if (state['B1'].value == mark && state['B2'].value == mark && state['B3'].value == mark) {
				isWinner = true;
			} else if (state['C1'].value == mark && state['C2'].value == mark && state['C3'].value == mark) {
				isWinner = true;
			} else if (state['A1'].value == mark && state['B1'].value == mark && state['C1'].value == mark) {
				isWinner = true;
			} else if (state['A2'].value == mark && state['B2'].value == mark && state['C2'].value == mark) {
				isWinner = true;
			} else if (state['A3'].value == mark && state['B3'].value == mark && state['C3'].value == mark) {
				isWinner = true;
			} else if (state['A1'].value == mark && state['B2'].value == mark && state['C3'].value == mark) {
				isWinner = true;
			} else if (state['A3'].value == mark && state['B2'].value == mark && state['C1'].value == mark) {
				isWinner = true;
			}

			if (isWinner) {
				return {
					winner: true,
					player,
				};
			}
		}

		return undefined;
	},
	verifyEndGame: ({
		state,
	}) => {
		let endGame = true;
		const positions = Object.keys(state);
		for (const position of positions) {
			if(state[position].value === ''){
				endGame = false;
				return;
			}
		}
		return endGame;
	},
};
