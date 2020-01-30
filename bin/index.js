/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
// const Routes = require('./../router/index');

process.on('unhandledRejection', (err) => {
  console.log(JSON.stringify(err));
  process.exit(1);
});

exports.Server = async ({ routes = Routes } = {}) => {
  
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

  // server.route(routes);

  return server;
};
