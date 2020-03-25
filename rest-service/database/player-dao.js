const {
	ObjectId
} = require('mongodb');

module.exports = (dbPromise) => {
	return {
		async update({ name, password }) {
			const toset = {
				name, 
				password
			};

			const db = await dbPromise;
			const user = await db
				.collection('player')
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
		async select({ _id }) {
			const db = await dbPromise;

			const response = await db
				.collection('player')
				.findOne({ _id : ObjectId(_id) });

			return response;
		}
	};
};