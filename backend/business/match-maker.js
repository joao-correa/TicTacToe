const room = require('./room');

module.exports = ({ Room = room } = {}) => {
  let players = [];
  
  // const make = (player1, player2) =>  new Game(player1.id, player2.id);

  // const Game = function(player1, player2){
  //   this.player1 = player1;
  //   this.player2 = player2;
  //   this.state = {
  //     "A1" : { value: "", player: "" },
  //     "A2" : { value: "", player: "" },
  //     "A3" : { value: "", player: "" },
  //     "B1" : { value: "", player: "" },
  //     "B2" : { value: "", player: "" },
  //     "B3" : { value: "", player: "" },
  //     "C1" : { value: "", player: "" },
  //     "C2" : { value: "", player: "" },
  //     "C3" : { value: "", player: "" },
  //   };
  //   this.winner = null; 
  // }
  
  return {
    subscribe(observer){
      this.players.push(observer);

      while( this.players.length >= 2 ){
        observer.emit('startGame', {});
        // const player1 = this.players.shift();
        // const player2 = this.players.shift();
        
        // const room = new Room(player1, player2);

        // player1.notify( room );
        // player2.notify( room );
      }
    },
    unsubscribe(observer){
      players = players.filter( o => o != observer );
      return true;
    }
  }
}
