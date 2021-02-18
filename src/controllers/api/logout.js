const { stringify } = require('query-string');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config');

module.exports = async ctx => {
	const { backUrl } = ctx.request.query;
	const params = {
		logout: true,
		tokenEncoding: true,
		callbackUrl: backUrl
	};

	ctx.session.user = null;
	ctx.redirect(`${config[env].loginUrl}?${stringify(params)}`);
};
