const env = process.env.NODE_ENV || 'development';
const config = require('../config');

module.exports = async ctx => {
	await render(ctx)('index', {
		isProd: env !== 'development' && env !== 'dev-common',
		preludeDomain: config[env].preludeDomain
	});
};

// 优化模板不存在的时候的提示
const render =
	env === 'development'
		? ctx => {
				return async (...args) => {
					try {
						await ctx.render(...args);
					} catch (e) {
						ctx.body = 'HTML 静态模板编译中，请稍后刷新页面...';
					}
				};
		  }
		: ctx => ctx.render;
