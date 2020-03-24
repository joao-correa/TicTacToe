const basePath = process.env.VUE_APP_API_HOST;

const register = async (data) => {
	const url = 'player/register';
	const init = {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'accept': 'application/json',
			'content-type' : 'application/json',
		},
	};

	const response = await fetch(`${basePath}${url}`, init);
	return response.json();
};	

export default {
	register
};
