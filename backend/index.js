require('dotenv').config();
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');

const routes = require('./rest-service');
const { Server } = require('./bin/index');
const matchMaker = require('./socket-service/matchMaker');

process.on('uncaughtException', (error) => {
	console.log('error -->', error);
});

(async () => {
	try {
		const { server, io } = await Server();

		io.on('connect', (socket) => {
			socket.on('subscribe', function (data) {
				socket.userName = data.name;
				matchMaker.subscriber(socket);
			});
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

		server.start();
		server.route(routes);

		console.log('server started at %s', server.info.uri);
	} catch (error) {
		console.log(error);
	}
})();
