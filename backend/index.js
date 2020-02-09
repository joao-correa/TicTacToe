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
