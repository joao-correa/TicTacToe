const { Server } = require('./bin/index');

require('dotenv').config();

(async ()=> {
  const {server , io } = await Server();
  
  io.on('connect', (socket) => {
    console.log('connected user');

    socket.on('player_register', (socket) => {
      console.log("player in inside");  
    });
  });

  io.on('disconnect', (socket) => {
    console.log("player is disconnected");
  });

  server.start();

  console.log('server started at %s', server.info.uri);
})();