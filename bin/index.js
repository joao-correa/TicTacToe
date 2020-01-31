/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Socket= require('socket.io');

process.on('unhandledRejection', (err) => {
  console.log(JSON.stringify(err));
  process.exit(1);
});

exports.Server = async ({ routes = Routes, socket = Socket } = {}) => {
  
  const server = hapi.server({
    port: process.env.MODE === 'production' ? (process.env.PORT || 80) : 3000
  });

  const swaggerOptions = {
    info: {
      title: 'Concrete - Node.js Challange',
      version: '1.0.0',
    },
  };

  await server.register([Inert, Vision, {
    plugin: HapiSwagger,
    options: swaggerOptions,
  }]);

  const io = Socket(server.listening);

  io.on('connection', (socket) => {
    console.log( 'alguem logou com sucesso' );
  });

  return server;
};
