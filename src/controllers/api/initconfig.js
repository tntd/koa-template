const response = require('utils/response');

module.exports = async ctx => {
	ctx.body = response.success(ctx.session.user);
};
