const path = require('path');
const nunjucks = require('koa-nunjucks-2');

module.exports = isDev => {
	return nunjucks({
		ext: 'html',
		path: path.join(__dirname, '../view'),
		nunjucksConfig: {
			noCache: isDev,
			autoescape: true
		}
	});
};
