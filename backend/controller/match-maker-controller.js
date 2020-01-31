
module.exports = () => {
  let players = [];
  
  const make = (player1, player2) =>  new Game(player1.id, player2.id);

  const Game = function(player1, player2){
    this.player1 = player1;
    this.player2 = player2;
    this.state = {
      "A1" : { value: "", player: "" },
      "A2" : { value: "", player: "" },
      "A3" : { value: "", player: "" },
      "B1" : { value: "", player: "" },
      "B2" : { value: "", player: "" },
      "B3" : { value: "", player: "" },
      "C1" : { value: "", player: "" },
      "C2" : { value: "", player: "" },
      "C3" : { value: "", player: "" },
    };
    this.winner = null; 
  }
  
  return {
    subscribe(observer){
      this.players.push(observer);

      while( this.players.length >= 2 ){
        const player1 = this.players.shift();
        const player2 = this.players.shift();
        const game = make(player1, player2);

        player1.notify( game);
        player2.notify( game );
      }
    },
    unsubscribe(observer){
      players = players.filter( o => o != observer );
      return true;
    }
  }
}
