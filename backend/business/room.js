const match = require('./match');

module.exports = ({ Match = match() } = {}) => {
  const listRoom = [];

  const winner = (state, mark) => {
    if (state[ "A1" ].value == mark && state[ "A2" ].value == mark && state[ "A3" ].value == mark) {
      return true
    } else if (state[ "B1" ].value == mark && state[ "B2" ].value == mark && state[ "B3" ].value == mark) {
      return true
    } else if (state[ "C1" ].value == mark && state[ "C2" ].value == mark && state[ "C3" ].value == mark) {
      return true
    } else if (state[ "A1" ].value == mark && state[ "B1" ].value == mark && state[ "C1" ].value == mark) {
      return true
    } else if (state[ "A2" ].value == mark && state[ "B2" ].value == mark && state[ "C2" ].value == mark) {
      return true
    } else if (state[ "A3" ].value == mark && state[ "B3" ].value == mark && state[ "C3" ].value == mark) {
      return true
    } else if (state[ "A1" ].value == mark && state[ "B2" ].value == mark && state[ "C3" ].value == mark) {
      return true
    } else if (state[ "A3" ].value == mark && state[ "B2" ].value == mark && state[ "C1" ].value == mark) {
      return true
    }

    return false;
  }

  return class Room {
    constructor (player1, player2) {
      listRoom.push(this);

      this.game = {
        p1: player1.id,
        p2: player2.id,
        state: (new Match()).state,
      }

      this.socketPlayer1 = player1;
      this.socketPlayer2 = player2;

      player1.on('play', (data) => {
        console.log(data);
        if (this.game.state[ data.position ].value.length > 0)
          return player1.emit('cantPlay', data.position);

        this.game.state[ data.position ] = { value: "X" };

        const isWinner = winner(this.game.state, "X");

        player1.emit('updateGame', this.game);
        player2.emit('updateGame', this.game);

        if (isWinner) {
          player1.emit('resultado', "You win");
          player2.emit('resultado', "You lose");

          setTimeout(() => {
            this.game.state = (new Match()).state;

            player1.emit('reset', this.game);
            player2.emit('reset', this.game);
          }, 5000);

          return;
        }

      });

      player2.on('play', (data) => {
        console.log(data);

        if (this.game.state[ data.position ].value.length > 0)
          return player2.emit('cantPlay', data.position);

        this.game.state[ data.position ] = { value: "O" };

        player2.emit('updateGame', this.game);
        player1.emit('updateGame', this.game);

        const isWinner = winner(this.game.state, "O");

        if (isWinner) {
          player2.emit('resultado', "You win");
          player1.emit('resultado', "You lose");

          setTimeout(() => {
            this.game.state = (new Match()).state;

            player1.emit('reset', this.game);
            player2.emit('reset', this.game);
          }, 5000);

          return;
        }

      });

    }
  }
}