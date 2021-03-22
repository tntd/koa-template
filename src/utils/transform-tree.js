'use strict';

const transformTree = (list, options = {}) => {
	const {
		keyField = 'id',
		childField = 'children',
		parentField = 'parentId',
		formatData
	} = options;

	const tree = [];
	const record = {};

	for (let i = 0, len = list.length; i < len; i++) {
		let item = list[i].dataValues || list[i];
		const id = item[keyField];

		if (!id) {
			continue;
		}

		if (record[id]) {
			item[childField] = record[id];
		} else {
			item[childField] = record[id] = [];
		}

		if (item[parentField]) {
			const parentId = item[parentField];

			if (!record[parentId]) {
				record[parentId] = [];
			}
			if (formatData) {
				item = formatData(item);
			}
			record[parentId].push(item);
		} else {
			if (formatData) {
				item = formatData(item);
			}
			tree.push(item);
		}
	}

	return tree;
};

module.exports = transformTree;
