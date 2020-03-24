const { register } = require('../handler');
const Joi = require('@hapi/joi');

module.exports = [
	{
		method: 'POST',
		path: '/register',
		options: {
			tags: ['api'],
			description: 'Register or recovery user data.',
			notes: 'Register or recovery user data.',
			handler: async (request, h) => {
				const onSuccess = r => h.response(r.data).code(r.code);
				const onError = r => h.response(r.data).code(r.code);
				return await register.registerPlayer({ request, onSuccess, onError });
			},
			validate: {
				payload: Joi.object({
					name: Joi.string().required().description('name'),
					password: Joi.string().required().description('password'),
					imageBuffer: Joi.array().optional().description('image buffer'),
				}),
			}
		},
	}
];
