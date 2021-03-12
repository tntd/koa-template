class UserInfoService {
	findAndCountAll(params) {
		const { UserInfo } = global.M;

		return UserInfo.findAndCountAll(params);
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
