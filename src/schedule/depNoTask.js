const redisQueue = require('utils/queue');

module.exports = {
	options: {
		scheduleTime: '59 48 11 * * ?' // cron 表达式
		// type: 'all' // type(all、worker) 默认 all  worker 第一个
	},
	async task() {
		const TASK_NAME = 'DEP_TASK';

		// 消费消息队列

		redisQueue(TASK_NAME, async (task) => {
			try {
				task = JSON.parse(task);
			} catch (error) {
				task = {};
			}
			return new Promise((resolve) => {
				setTimeout(async () => {
				  console.log(`adfadfasd`)
				  resolve()
				}, 2000)
			  });
		});
	}
};
