module.exports = ({
	dao,
}) => ({
	update: async ({
		name,
		password,
		imagebuffer
	}) => {
		let parameters = {
			name, 
			password,
			imagebuffer,
		};

		parameters = JSON.parse(JSON.stringify(parameters));

		const { value, lastErrorObject } = await dao.user.update(parameters);
		
		return value || { name, password, imagebuffer, _id: lastErrorObject.upserted };
	}
});
