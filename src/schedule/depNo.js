const redisStore = require('utils/redis-store');

module.exports = {
	options: {
		scheduleTime: '59 44 11 * * ?', // cron 表达式
		type: 'worker' // type(all、worker) 默认 all  worker 第一个
	},
	async task() {
		const TASK_NAME = 'DEP_TASK';

		const res = [];// 获取需要存储的列队
		await redisStore.destroy(TASK_NAME);
		if (res && res.length) {
			res.forEach(element => {
				const item = element.get({ plain: true });

				redisStore.client.lpush(TASK_NAME, JSON.stringify(item));
			});
			await redisStore.set(`${TASK_NAME}_TOTAL`, `${res.length}`);
		}

		await redisStore.set(`${TASK_NAME}_CUR_INDEX`, '0');
		await redisStore.set(`${TASK_NAME}_SET_FIRST`, 'false');
		await redisStore.destroy(`${TASK_NAME}_BEGIN_TIME`);
	}
};
