const match = require('./match');

module.exports = ({ Match = match() } = {}) => {

  const play = (player, oponente, game) => {
    return (position) => {
      console.log(`play called by -> ${player.userName}`);

      const gamePlayer = game.player1.userName == player.userName ? game.player1 : game.player2;
      const retorno = game.play(position);

      if (!retorno.state) {
        return player.emit("cantPlay", retorno.message);
      }
        
      player.emit("updateGame", game);
      oponente.emit("updateGame", game);

      const winner = game.verifyWinner(gamePlayer);

      if (winner) {
        player.emit("finishMatch", winner);
        oponente.emit("finishMatch", winner);

        setTimeout(() => {
          game.restart();
          player.emit("updateGame", game);
          oponente.emit("updateGame", game);
        }, 5000);

        return;
      } 

      if (game.remainerPlaces == 0) {
        game.restart();

        setTimeout(() =>  {
          player.emit("updateGame", game);
          oponente.emit("updateGame", game);
        }, 2000);
      }
    }
  }

  return class Room {
    constructor (player1, player2) {
      this.game = new Match({ player1, player2 });
      
      this.socketPlayer1 = player1;
      this.socketPlayer2 = player2;

      player1.on("play" , play(player1, player2, this.game));
      player2.on("play" , play(player2, player1, this.game));
    }
  }
}
