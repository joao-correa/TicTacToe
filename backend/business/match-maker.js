const room = require('./room');

module.exports = ({ Room = room() } = {}) => {
  let players = [];
  let rooms = [];
  
  // const make = (player1, player2) =>  new Game(player1.id, player2.id);

  // const Game = function(player1, player2){
  //   this.player1 = player1;
  //   this.player2 = player2;
  //   this.state = {
 
  //   };
  //   this.winner = null; 
  // }
  
  return {
    subscribe(observer){
      if(players.find( p => p.userName == observer.userName ))
        return;

      players.push(observer);

      while( players.length >= 2 ){
        const player1 = players.shift();
        const player2 = players.shift();
        const room = new Room(player1, player2);

        rooms.push(room);

        player1.emit('startGame', room.game);
        player2.emit('startGame', room.game);
      }
     
    },
    unsubscribe(observer){
      players = players.filter( o => o != observer );
      return true;
    }
  }
}
