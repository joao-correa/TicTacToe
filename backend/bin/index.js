/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const hapi = require('@hapi/hapi');
const socket = require('socket.io');

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

	const io = socket(server.listener);

	return { server, io };
};
