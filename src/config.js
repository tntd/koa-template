const config = {
	development: {
		preludeDomain: 'http://prelude-dev',
		loginUrl: 'http://login-inner-dev.tongdun.cn:8088/userLogin.htm',
		port: 8889,
		redis: {
			host: '127.0.0.1',
			port: 6379,
			password: 'xxxx',
			db: 1
		},
		ehrapi: { // 公司Ehr申请token
			host: 'http://192.168.8.66:88',
			token: 'xxxx'
		},
		mysql: {
			database: 'xxxx',
			host: '127.0.0.1',
			port: 3306,
			user: 'xxxx',
			password: 'xxxx'
		}
	},
	'dev-common': {
		preludeDomain: 'http://prelude-dev',
		loginUrl: 'http://login-inner-dev.tongdun.cn:8088/userLogin.htm',
		port: 8088,
		redis: {
			host: '127.0.0.1',
			port: 6379,
			password: 'xxxx',
			db: 1
		},
		ehrapi: {
			host: 'http://192.168.8.66:88',
			token: 'xxxx'
		},
		mysql: {
			database: 'xxxx',
			host: '127.0.0.1',
			port: 3306,
			user: 'xxxx',
			password: 'xxxx'
		}
	},
	staging: {
		preludeDomain: 'https://prelude',
		loginUrl: 'https://login-inner.tongdun.cn/userLogin.htm',
		port: 8088,
		redis: {
			host: '127.0.0.1',
			port: 6379,
			password: 'xxxx',
			db: 0
		},
		ehrapi: {
			host: 'http://192.168.121.156',
			token: 'xxxx'
		},
		mysql: {
			database: 'xxxx',
			host: '127.0.0.1',
			port: 3307,
			user: 'xxxx',
			password: 'xxxx'
		}
	},
	production: {
		preludeDomain: 'https://prelude',
		loginUrl: 'https://login-inner.tongdun.cn/userLogin.htm',
		port: 8088,
		redis: {
			host: '127.0.0.1',
			port: 6379,
			password: 'xxxx',
			db: 0
		},
		ehrapi: {
			host: 'http://192.168.121.156',
			token: 'xxxx'
		},
		mysql: {
			database: 'xxxx',
			host: '127.0.0.1',
			port: 3307,
			user: 'xxxx',
			password: 'xxxx'
		}
	}
};

module.exports = config;
