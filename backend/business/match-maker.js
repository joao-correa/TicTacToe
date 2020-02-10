const room = require('./room');

module.exports = (Room = room()) => {
  let players = [];
  let rooms = [];
  
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

        player1.emit('startGame', room.game.state);
        player2.emit('startGame', room.game.state);
      }
    },
    unsubscribe(observer){
      players = players.filter( o => o != observer );
      return true;
    }
  }
}
