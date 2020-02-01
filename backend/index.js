const { Server } = require('./bin/index');
const matchMaker = require('./business/match-maker');

require('dotenv').config();

(async ()=> {

  try {
  
    const {server , io } = await Server();

    const maker = matchMaker();
    
    io.on('connect', (socket) => {
      console.log('connected user', socket.id);    
      
      socket.on('subscribe', function( data ){
        socket.userName = data;
        console.log( 'sub ->', data );
        maker.subscribe( socket );
      });
  
    });
  
    io.on('disconnect', (socket) => {
      console.log("player is disconnected");
    });
  
    server.start();
  
    console.log('server started at %s', server.info.uri);

  } catch (error) {
    console.log(error); 
  }
  
})();

// socket.emit('start', {
//   state : {
//     "A1" : { value: "", player: "" },
//     "A2" : { value: "", player: "" },
//     "A3" : { value: "", player: "" },
//     "B1" : { value: "", player: "" },
//     "B2" : { value: "", player: "" },
//     "B3" : { value: "", player: "" },
//     "C1" : { value: "", player: "" },
//     "C2" : { value: "", player: "" },
//     "C3" : { value: "", player: "" },
//   }
// })