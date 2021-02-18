const response = require('utils/response');
const env = process.env.NODE_ENV || 'development';
const config = require('../config');

module.exports = function() {
	return async (ctx, next) => {
		if (
			!ctx.session.user &&
			ctx.path.indexOf('/api') !== -1 &&
			!['/api/login'].some(path => ctx.path.startsWith(path))
		) {
			ctx.status = 401;
			ctx.body = response.error(config[env].loginUrl, '用户登录已失效');
		} else {
			await next();
		}
	};
};
