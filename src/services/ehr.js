const axios = require('axios');
const config = require('../config');
const env = process.env.NODE_ENV || 'development';

const ehrapi = config[env].ehrapi;

class EhrService {
	async getEmpinfo(params) {
		const res = await axios({
			baseURL: ehrapi.host,
			method: 'get',
			url: '/ehrapi/empinfo',
			params: {
				token: ehrapi.token,
				...params
			}
		});

		return (res && res.data) || { code: 1, data: [] };
	}

	async getDepinfo(params) {
		const res = await axios({
			baseURL: ehrapi.host,
			method: 'get',
			url: '/ehrapi/depinfo',
			params: {
				token: ehrapi.token,
				...params
			}
		});

		return (res && res.data) || { code: 1, data: [] };
	}
}

module.exports = EhrService;
