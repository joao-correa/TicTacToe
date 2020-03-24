const dao = require('../../database');

module.exports = {
	register: async ({
		request,
		onSuccess,
		onError
	}) => {
		try {
			let parameters = JSON.parse(JSON.stringify(request.payload));
			const { value, lastErrorObject } = await dao.user.update(parameters);
			let mongoResponse = value || { ...parameters, _id: lastErrorObject.upserted };

			const response = {
				data: {
					user: {
						_id: mongoResponse._id,
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
	select: async({
		request,
		onSuccess,
		onError
	}) => {
		try {
			const { _id } = request.params;
			const daoResponse = await dao.user.select({ _id });

			return onSuccess({
				data: {
					daoResponse
				},
				code: 200,
			});
		} catch (error) {
			return onError({
				code: 500,
				message: 'Error'
			});	
		}
	},
};
