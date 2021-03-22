const Redlock = require('redlock');
const redisStore = require('./redis-store');

const redisQueue = (TASK_NAME = 'DEFAULT_TASK', TaskFunc) => {

	const redlock = new Redlock([redisStore.client], {
		retryCount: 100,
		retryDelay: 200 // time in ms
	});

	const setBeginTime = async redlock => {
		const lock = await redlock.lock(`locks:${TASK_NAME}_SET_FIRST`, 1000);
		const setFirst = await redisStore.get(`${TASK_NAME}_SET_FIRST`);
		if (setFirst !== 'true') {
			console.log('获取第一个!');
			await redisStore.set(`${TASK_NAME}_SET_FIRST`, 'true');
			await redisStore.set(`${TASK_NAME}_BEGIN_TIME`, `${+new Date()}`);
		}
		await lock.unlock().catch(e => e);
	};

	const tasksHandler = async () => {
		let curIndex = Number(await redisStore.get(`${TASK_NAME}_CUR_INDEX`));
		const taskAmount = Number(await redisStore.get(`${TASK_NAME}_TOTAL`));
		if (taskAmount === 0) {
			console.info('等待新的任务');
			return;
		}
		if (curIndex === taskAmount) {
			const beginTime = await redisStore.get(`${TASK_NAME}_BEGIN_TIME`);

			const cost = +new Date() - Number(beginTime);
			console.info(`所有任务已跑完: ${cost}ms. ${beginTime}`);

			await redisStore.set(`${TASK_NAME}_TOTAL`, '0');
			await redisStore.set(`${TASK_NAME}_CUR_INDEX`, '0');
			await redisStore.set(`${TASK_NAME}_SET_FIRST`, 'false');
			await redisStore.destroy(`${TASK_NAME}_BEGIN_TIME`);
			return;
		}

		await setBeginTime(redlock);

		let task = await redisStore.client.rpop(TASK_NAME);

		task = task || {};

		await TaskFunc(task);

		try {
			const lock = await redlock.lock(`locks:${TASK_NAME}_CUR_INDEX`, 1000);
			curIndex = Number(await redisStore.get(`${TASK_NAME}_CUR_INDEX`));

			await redisStore.set(`${TASK_NAME}_CUR_INDEX`, `${curIndex + 1}`);

			await lock.unlock().catch(e => e);
		} catch (e) {
			console.log(e);
		}
		await tasksHandler();
	};
	tasksHandler();
};

module.exports = redisQueue;
