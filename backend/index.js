const { Server } = require('./bin/index');

require('dotenv').config();

(async ()=> {
  const {server , io } = await Server();
  
  io.on('connect', (socket) => {
    console.log('connected user');

    io.emit('startGame', {
      state : {
        "A1" : { value: "", player: "" },
        "A2" : { value: "", player: "" },
        "A3" : { value: "", player: "" },
        "B1" : { value: "", player: "" },
        "B2" : { value: "", player: "" },
        "B3" : { value: "", player: "" },
        "C1" : { value: "", player: "" },
        "C2" : { value: "", player: "" },
        "C3" : { value: "", player: "" },
      }
    });
  });

  io.on('disconnect', (socket) => {
    console.log("player is disconnected");
  });

  server.start();

  console.log('server started at %s', server.info.uri);
})();