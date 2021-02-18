'use strict';

module.exports = function() {
	return async (ctx, next) => {
		if (ctx.path === '/ok.htm') {
			ctx.body = 'Success!';
		} else {
			await next();
		}
	};
};
