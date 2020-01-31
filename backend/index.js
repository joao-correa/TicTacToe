const { Server } = require('./bin/index');

require('dotenv').config();

(async ()=> {
  const server = await Server();
  
  server.start();

  console.log('server started at %s', server.info.uri);
})();