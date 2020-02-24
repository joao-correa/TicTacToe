const match = require('./match');

module.exports = ({ Match = match() } = {}) => {

	const play = (player, oponente, game) => {
		return (position) => {
			const retorno = game.play(position);

			if (!retorno.state) {
				return player.emit('cantPlay', retorno.message);
			}
				
			player.emit('updateGame', game);
			oponente.emit('updateGame', game);

			const winner = game.verifyWinner();

			if (winner) {
				game.restart();

				player.emit('updateGame', game);
				oponente.emit('updateGame', game);

				player.emit('finishMatch', winner);
				oponente.emit('finishMatch', winner);

				return;
			} 

			if (game.remainderPlaces == 0) {
				game.restart();
				player.emit('updateGame', game);
				oponente.emit('updateGame', game);
			}
		};
	};

	return class Room {
		constructor (player1, player2) {
			this.game = new Match({ player1, player2 });
			
			this.socketPlayer1 = player1;
			this.socketPlayer2 = player2;

			player1.on('play' , play(player1, player2, this.game));
			player2.on('play' , play(player2, player1, this.game));
		}
	};
};
