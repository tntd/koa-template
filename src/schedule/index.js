const fs = require('fs');
const path = require('path');
const scheduleJob = require('utils/schedule');

module.exports = config => {
	const schedules = {};
	fs.readdirSync(__dirname)
		.filter(function(file) {
			return file.indexOf('.') !== 0 && file !== 'index.js';
		})
		.forEach(function(file) {
			let schedule = require(path.join(__dirname, file));
			schedule = scheduleJob(schedule.options, schedule.task);
			schedules[file] = schedule;
		});

	return schedules;
};
