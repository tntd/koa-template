const schedule = require('node-schedule');
const env = process.env.NODE_ENV || 'development';

// const Random = (min, max) => {
// 	return Math.floor(Math.random() * (max - min + 1) + min);
// };

const scheduleJob = (options, func) =>{
	const { type = 'all', scheduleTime } = options;
	// const instanceId = Random(0, (Number(process.env.instances) - 1));
	const job = schedule.scheduleJob(scheduleTime, () => {
		if (type === 'worker' && `${process.env.INSTANCE_ID}` === '0') {
			func && func();
		}
		if (type === 'all' || env === 'development') {
			func && func();
		}
	});

	return job;
};

module.exports = scheduleJob;
