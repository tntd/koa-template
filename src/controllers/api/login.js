const UserDao = require('daos/user');

const userDao = new UserDao();

module.exports = async ctx => {
	const { token, backUrl, ...rest } = ctx.request.query;

	const userOne = await userDao.getEhrUser({ token, ...rest });

	ctx.session.user = {
		...userOne.dataValues,
		password: undefined
	};
	ctx.redirect(backUrl);
};
