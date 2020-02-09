require('dotenv').config();
const { Server } = require('./bin/index');
const matchMaker = require('./business/match-maker');

(async ()=> {
  try {
    const { server , io } = await Server();
    const maker = matchMaker();
    
    io.on('connect', (socket) => {
      socket.on('subscribe', function( data ){
        socket.userName = data.name;
        console.log( 'sub ->', data );
        maker.subscribe( socket );
      });
    });
 
    server.start();
  
    console.log('server started at %s', server.info.uri);
  } catch (error) {
    console.log(error); 
  }
})();
