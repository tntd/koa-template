const UserDao = require('daos/user');

const userDao = new UserDao();

module.exports = (options = {}) => {
	return async (ctx, next) => {
		if (ctx.session && ctx.session.user && ctx.session.user.sso) {
			let userOne = await userDao.findOne({
				where: {
					account: ctx.session.user.account
				}
			});
			if (!userOne) {
				userOne = await userDao.create({ ...ctx.session.user });
			}
			ctx.session.user = {
				...userOne.dataValues,
				password: undefined
			};
		}
		await next();
	};
};
