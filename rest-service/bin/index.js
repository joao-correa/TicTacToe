const hapi = require('@hapi/hapi');

process.on('unhandledRejection', (err) => {
	console.log(err);
	process.exit(1);
});

exports.Server = async () => {
	const server = hapi.server({
		port: process.env.MODE === 'production' ? (process.env.PORT || 80) : 3001,
		routes: {
			cors: true
		}
	});

	return { server };
};
