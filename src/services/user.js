class UserInfoService {
	findAndCountAll(params) {
		const { UserInfo } = global.M;

		const { where, curPage = 1, pageSize = 20, ...rest } = params;

		return UserInfo.findAndCountAll({
			where,
			limit: +pageSize,
			offset: (+curPage - 1) * +pageSize,
			...rest
		});
	}

	findAll(params) {
		const { UserInfo } = global.M;

		return UserInfo.findAll(params);
	}

	create(params, option = {}) {
		const { UserInfo } = global.M;

		return UserInfo.create(params, option);
	}

	findOne(params) {
		const { UserInfo } = global.M;

		return UserInfo.findOne(params);
	}

	update(params, option = {}) {
		const { UserInfo } = global.M;

		return UserInfo.update(params, option);
	}

	destroy(params) {
		const { UserInfo } = global.M;

		return UserInfo.destroy(params);
	}
}

module.exports = UserInfoService;
