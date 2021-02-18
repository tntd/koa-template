const Redis = require('koa-redis');
const config = require('../config');
const env = process.env.NODE_ENV || 'development';

const redis = config[env].redis;

const Store = new Redis({
	host: redis.host,
	port: redis.port,
	password: redis.password,
	db: redis.db
});

module.exports = Store;
