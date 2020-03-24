module.exports = ({
	business,
}) => ({
	authenticate: async ({
		request,
		onSuccess,
		onError
	}) => {
		try {
			const businessResponse = await business.user.update(request.payload);
			// const response = {
			// 	data: {
			// 		user: {
			// 			name: '',
			// 			imageBuffer: [],
			// 		},
			// 		stats: {
			// 			victory: null,
			// 			loses: null,
			// 			ties: null,
			// 		},
			// 	},
			// 	code: 200
			// };

			const response = {
				data: businessResponse,
				code: 200,
			};

			return onSuccess(response);
		} catch (error) {
			return onError({
				message: error.message || 'Internal Server Error',
				code: error.code || 500,
			});
		}
	},
});
