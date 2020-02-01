const match = require('./match');

module.exports = ({ Match = match }) => {

  const listRoom = [];
  const makeGuid = () => {};

  return class Room {
    constructor(player1, player2){
      listRoom.push(this);

      this.id = makeGuid();
      this.socketPlayer1 = player1;
      this.socketPlayer2 = player2;
      this.match = new Match();
    } 
  }
}