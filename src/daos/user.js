const UserService = require('services/user');
const EhrService = require('services/ehr');
const ehrDecrypt = require('utils/ehr-decrypt');
const userService = new UserService();
const ehrService = new EhrService();

class UserDao {
	async findAndCountAll(params) {
		const { sequelize } = global.M;
		const { where, curPage = 1, pageSize = 30, ...rest } = params;

		const { count, rows } = await userService.findAndCountAll({
			attributes: [
				[sequelize.col('uuid'), 'uuid'],
				[sequelize.col('account'), 'account'],
				[sequelize.col('badge'), 'badge'],
				[sequelize.col('emp_status'), 'empStatus'],
				[sequelize.col('nickname'), 'nickname']
			],
			where,
			curPage,
			pageSize,
			...rest
		});
		return {
			curPage: +curPage,
			pageSize: +pageSize,
			total: count,
			list: rows || []
		};
	}

	async getEhrUser(params) {
		const { token, ...rest } = params;

		let account = '';

		if (token) {
			const userObj = ehrDecrypt(token);
			account = userObj.loginId.replace(/@tongdun\.(cn|net)/g, '');
		}

		let userOne = await userService.findOne({
			where: {
				account,
				recycleStatus: 1,
				...rest
			}
		});

		if (!userOne) {
			let empInfo = await ehrService.getEmpinfo({ account });
			empInfo = (empInfo.data && empInfo.data[0]) || {};

			const params = {
				ehrId: empInfo.eid,
				badge: empInfo.badge,
				nickname: empInfo.name,
				empStatus: empInfo.empstatus,
				email: empInfo.email,
				account: empInfo.account || account,
				depId: empInfo.depid,
				leaderId: empInfo.leaderId,
				roleId: empInfo.roleId,
				staffName: empInfo.name
			};
			userOne = await userService.create(params);
		}
		return userOne;
	}

	findOne(params) {
		const { sequelize } = global.M;
		return userService.findOne({
			attributes: [
				[sequelize.col('uuid'), 'uuid'],
				[sequelize.col('account'), 'account'],
				[sequelize.col('badge'), 'badge'],
				[sequelize.col('dep_list'), 'depList'],
				[sequelize.col('emp_status'), 'empStatus'],
				[sequelize.col('nickname'), 'nickname']
			],
			...params
		});
	}

	findAll(params) {
		const { sequelize } = global.M;
		return userService.findAll({
			attributes: [
				[sequelize.col('uuid'), 'uuid'],
				[sequelize.col('account'), 'account'],
				[sequelize.col('emp_status'), 'empStatus'],
				[sequelize.col('badge'), 'badge'],
				[sequelize.col('nickname'), 'nickname']
			],
			...params
		});
	}
}

module.exports = UserDao;
