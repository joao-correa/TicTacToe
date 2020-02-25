require('dotenv').config();
const { Server } = require('./bin/index');
const matchMaker = require('./business/matchMaker');

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

		server.start();

		console.log('server started at %s', server.info.uri);
	} catch (error) {
		console.log(error);
	}
})();
