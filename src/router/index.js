const Router = require('koa-router');

const home = require('controllers/home');
const customRouter = require('./router');

const router = new Router();

// 首页
router
	.get('/', home)
	// 路由定义
	.use(customRouter.routes())
	.all('*', async (ctx, next) => {
		await home(ctx);
	});

module.exports = router;
