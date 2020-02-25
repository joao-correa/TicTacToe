'use strict';

const judgeWrapper = ({
	rules,
}) => {

	const play = ({ player, opponent, state, data, turn }) => {
		let resetGame = false;

		const verifiedTurn = rules.verifyTurn({
			player,
			turn,	
		});

		if (!verifiedTurn) {
			return player.emit('cantPlay', {
				message: 'Is not your turn.',
			});
		}

		const verifiedPlay = rules.verifyPlay({
			state,
			data,			
		});

		if (!verifiedPlay) {
			return player.emit('cantPlay', {
				message: 'You can`t play here.',
			});
		}

		rules.play({
			player,
			state,
			data,
		});

		turn.player = opponent;

		player.emit('update', {
			state
		});

		opponent.emit('update', {
			state
		});

		const verifiedWinner = rules.verifyWinner({
			player1: player,
			player2: opponent,
			state,	
		});

		if(verifiedWinner && verifiedWinner.winner){
			resetGame = true;	

			player.emit('winner', {
				message: 'You win.'
			});

			opponent.emit('lose', {
				message: 'You lose.'
			});
		} else {
			const verifiedEndGame = rules.verifyEndGame({
				state,
			});

			if (verifiedEndGame)
				resetGame = true;
		}

		if (resetGame) {
			return new Promise((resolve) => {
				setTimeout(() => {
					rules.gameReset({ state });
	
					player.emit('update', {
						state
					});
					opponent.emit('update', {
						state
					});
					resolve('resolved');
				}, 5000);
			});
		}
	};

	return ({ player1, player2 }) => {
		const state = rules.gameState();		
		const turn = {
			player: player1
		};

		player1.mark = 'X';
		player2.mark = 'O';

		player1.emit('update', {
			state
		});

		player2.emit('update', {
			state
		});

		player1.on('play', (data) => {
			return play({ 
				player: player1,
				opponent: player2,
				state,
				data,
				turn
			});
		});

		player2.on('play', (data) => {
			return play({ 
				player: player2,
				opponent: player1,
				state,
				data,
				turn
			});
		});
	};
};

module.exports = judgeWrapper;
