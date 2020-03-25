require('dotenv').config();
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');

const routes = require('./router');
const { Server } = require('./bin/index');

(async () => {
	try {
		const { server } = await Server();

		const swaggerOptions = {
			info: {
				title: 'Tic Tac Toe - Rest Service',
				version: '1.0.0',
			},
		};
	
		await server.register([Inert, Vision, {
			plugin: HapiSwagger,
			options: swaggerOptions,
		}]);

		server.start();
		server.route(routes);

		console.log('server started at %s', server.info.uri);
	} catch (error) {
		console.log(error);
	}
})();
