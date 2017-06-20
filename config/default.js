module.exports = {
	port: 9000,
	session: {
		cookieSecret: 'chens',
		key: 'chens',
		maxAge: 2592000000
	},
	mongodb: {
		development: {
			connectionString: 'mongodb://localhost:27017/chens-test'
		},
		production: {
			connectionString: 'mongodb://localhost:27017/chens'
		}
	}
};