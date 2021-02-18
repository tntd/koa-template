const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const config = require('../config');
const env = process.env.NODE_ENV || 'development';

const redis = config[env].redis;

module.exports = option => {
	return session({
		store: redisStore({
			host: redis.host,
			port: redis.port,
			password: redis.password,
			db: redis.db
		}),
		prefix: 'tnt_cli_identify_SESS:',
		key: 'tnt_cli_identify_SESS',
		cookie: {
			httpOnly: true, // 必启xss
			secure: false, // true=https
			maxAge: 1000 * 60 * 60 * 24 // 生命周期
		},

		errorHandler: (err, type, ctx) => {
			console.log('--session--\n', err, type, ctx);
		}
	});
};
