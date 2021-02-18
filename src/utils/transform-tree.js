'use strict';

module.exports = {
	transformTree(list, options = {}) {
		const { keyField = 'id', childField = 'children', parentField = 'parentId' } = options;

		const tree = [];
		const record = {};

		for (let i = 0, len = list.length; i < len; i++) {
			const item = list[i].dataValues || list[i];
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

				record[parentId].push(item);
			} else {
				tree.push(item);
			}
		}

		return tree;
	}
};
