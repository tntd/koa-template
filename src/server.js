require('app-module-path/register');

const Koa = require('koa');
const koabody = require('koa-body');

const config = require('./config');
const env = process.env.NODE_ENV || 'development';

global.M = require('./models')(config[env].mysql);

const healthCheck = require('./middlewares/health-check');
const sessionRedis = require('./middlewares/session-redis');
const tplRender = require('./middlewares/tpl-render');
const checkToken = require('./middlewares/check-token');

const pkg = require('../package.json');

const router = require('./router');

const app = new Koa();

const isDev = env === 'development';

const port = config[env].port;

app.name = pkg.name;
app.keys = [`${pkg.group}-${pkg.name}`];

app.use(healthCheck());
app.use(sessionRedis());
app.use(checkToken());

app.use(
	koabody({
		multipart: true,
		strict: false,
		formidable: {
			keepExtensions: true
		}
	})
);

// view
app.use(tplRender(isDev));

// 路由配置
app.use(router.routes(), router.allowedMethods());

// 启动服务
app.listen(port, () => {
	console.log(`server started at localhost:${port}`);
});
