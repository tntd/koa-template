'use strict';

module.exports = {
	success(data, message = 'success') {
		return {
			code: 200,
			success: true,
			message,
			data
		};
	},

	error(data, message = 'unkown error') {
		return {
			code: -1,
			success: false,
			message,
			data
		};
	}
};
