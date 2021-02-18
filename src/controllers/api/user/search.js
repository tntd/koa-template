const UserDao = require('daos/user');
const response = require('utils/response');
const { Op } = require('sequelize');

const userDao = new UserDao();

module.exports = async ctx => {
	const userId = ctx.session.user.id;

	const { searchKey } = ctx.request.query;

	const userFilter = {};

	userFilter[Op.or] = [
		{ nickname: { [Op.like]: `%${searchKey}%` } },
		{ account: { [Op.like]: `%${searchKey}%` } }
	];
	userFilter.id = {
		[Op.ne]: userId
	};

	const res = await userDao.findAndCountAll({
		where: {
			recycleStatus: 1,
			...userFilter
		}
	});

	ctx.body = response.success(res);
};
