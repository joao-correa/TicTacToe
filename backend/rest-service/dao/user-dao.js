module.exports = (dbPromise) => {
	return {
		async update({ name, password, imageBuffer }) {
			const toset = {
				name, 
				password
			};

			if (imageBuffer)
				toset.imageBuffer = imageBuffer;

			const db = await dbPromise;
			const user = await db
				.collection('user')
				.findOneAndUpdate({ 
					name,
					password,
				},{ 
					$set: toset
				},{
					upsert: true
				});
				
			return user;
		},
	};
};