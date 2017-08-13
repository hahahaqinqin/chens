module.exports = {
	port: 9000,
	session: {
		cookieSecret: 'chens',
		key: 'chens',
		maxAge: 2592000000
	},
	cookie: {
		maxAge: 2592000000,
		httpOnly: true,
		signed: true
	},
	mongodb: {
		development: {
			connectionString: 'mongodb://localhost:27017/chens'
		},
		production: {
			connectionString: 'mongodb://localhost:27017/chens-test'
		}
	},
	cloudinary: {
		cloud_name: 'dva89',
		api_key: '457997277862184',
		api_secret: 'r5RUvWwSXq_dAv-JpQq_GQYDcE0'
	},
	gmail: {
		user: 'Dante_Von_Armia',
		password: 'Kzonft19891022'
	}
};