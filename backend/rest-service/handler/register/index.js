const daoPromise = require('../../database');

module.exports = {
	registerPlayer: async ({
		request,
		onSuccess,
		onError
	}) => {
		try {
			const dao = await daoPromise;

			let parameters = JSON.parse(JSON.stringify(request.payload));
			const { value, lastErrorObject } = await dao.user.update(parameters);
			let mongoResponse = value || { ...parameters, _id: lastErrorObject.upserted };

			const response = {
				data: {
					user: {
						name: mongoResponse.name,
						imageBuffer: mongoResponse.imageBuffer,
					},
					stats: {
						victory: null,
						loses: null,
						ties: null,
					},
				},
				code: 200
			};

			return onSuccess(response);
		} catch (error) {
			return onError({
				message: error.message || 'Internal Server Error',
				code: error.code || 500,
			});
		}
	},
};
