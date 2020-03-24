const { player } = require('../handler');
const Joi = require('@hapi/joi');

module.exports = [
	{
		method: 'POST',
		path: 'player/register',
		options: {
			tags: ['api'],
			description: 'Register or recovery user data.',
			notes: 'Register or recovery user data.',
			handler: async (request, h) => {
				const onSuccess = r => h.response(r.data).code(r.code);
				const onError = r => h.response(r.data).code(r.code);
				return await player.register({ request, onSuccess, onError });
			},
			validate: {
				payload: Joi.object({
					name: Joi.string().required().description('name'),
					password: Joi.string().required().description('password'),
					imageBuffer: Joi.array().optional().description('image buffer'),
				}),
			}
		},
	},
	{
		method: 'GET',
		path: '/player/{_id}',
		options: {
			tags: ['api'],
			description: 'Recovery player data.',
			notes: 'Recovery player data',
			handler: async (request, h) => {
				const onSuccess = r => h.response(r.data).code(r.code);
				const onError = r => h.response(r.data).code(r.code);
				return await player.select({ request, onSuccess, onError });
			},
			validate: {
				params: Joi.object({
					_id: Joi.string().required().description('identifier'),
				}),
			}
		},
	}
];
