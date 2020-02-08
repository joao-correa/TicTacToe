/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const socket= require('socket.io');

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

exports.Server = async () => {
  const server = hapi.server({
    port: process.env.MODE === 'production' ? (process.env.PORT || 80) : 3000,
    routes: {
      cors: true
    }
  });

  const swaggerOptions = {
    info: {
      title: 'TicTacTow - Socket',
      version: '1.0.0',
    },
  };

  await server.register([Inert, Vision, {
    plugin: HapiSwagger,
    options: swaggerOptions,
  }]);

  const io = Socket(server.listener);

  return { server, io };
};
