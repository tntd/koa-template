const { stringify } = require('query-string');

const env = process.env.NODE_ENV || 'development';
const config = require('../config');

const UserDao = require('daos/user');

const userDao = new UserDao();

module.exports = async ctx => {
	const { token, success, ...rest } = ctx.request.query;
	if (env !== 'development' && ctx.session && !ctx.session.user && token) {
		const userOne = await userDao.getEhrUser({ token, ...rest });

		ctx.session.user = {
			...userOne.dataValues,
			password: undefined
		};
		ctx.redirect(ctx.path + `?${stringify(rest)}`);
	} else {
		await render(ctx)('index', {
			isProd: env !== 'development' && env !== 'dev-common',
			preludeDomain: config[env].preludeDomain
		});
	}
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
