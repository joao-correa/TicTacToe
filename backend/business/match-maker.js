const room = require('./room');

module.exports = ({ Room = room() } = {}) => {
  let players = [];
  let rooms = [];
  
  return {
    subscribe(observer){
      if(players.find( p => p.userName == observer.userName ))
        return;
      
      const room = rooms.find( room => rooms.socketPlayer1.userName == observer.userName || rooms.socketPlayer2.userName == observer.userName );
      if(room)
        return observer.emit("startGame", room.game);

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
