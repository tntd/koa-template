'use strict';

const { v1: uuidv1 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
	const { STRING, INTEGER, DATE, TEXT, UUID } = DataTypes;

	const UserInfo = sequelize.define(
		'UserInfo',
		{
			uuid: {
				type: UUID,
				primaryKey: true,
				defaultValue: () => {
					return uuidv1().replace(/-/g, '');
				}
			},
			ehrId: {
				type: INTEGER(20),
				field: 'ehr_id'
			},
			badge: {
				type: STRING(32),
				field: 'badge'
			},
			nickname: {
				type: STRING(255),
				field: 'nickname'
			},
			staffName: {
				type: STRING(32),
				field: 'staff_name'
			},
			headerImage: {
				type: STRING(255),
				field: 'header_image'
			},
			sign: {
				type: STRING(255),
				field: 'sign'
			},
			email: {
				type: STRING(255),
				field: 'email'
			},
			account: {
				type: STRING(255),
				field: 'account'
			},
			password: {
				type: STRING(32),
				field: 'password'
			},
			depId: {
				type: INTEGER(20),
				field: 'dep_id'
			},
			depList: {
				type: TEXT,
				field: 'dep_list'
			},
			leaderId: {
				type: STRING(32),
				field: 'leader_id'
			},
			teamId: {
				type: INTEGER(20),
				field: 'team_id'
			},
			jobId: {
				type: INTEGER(20),
				field: 'job_id'
			},
			admin: {
				type: INTEGER(8),
				field: 'admin'
			},
			roleId: {
				type: INTEGER(20),
				field: 'role_id'
			},
			empStatus: {
				type: INTEGER(8),
				field: 'emp_status'
			},
			recycleStatus: {
				type: INTEGER(8),
				field: 'recycle_status'
			},
			gmtCreate: {
				type: DATE,
				field: 'gmt_create'
			},
			gmtModify: {
				type: DATE,
				field: 'gmt_modify'
			}
		},
		{
			tableName: 'user_info'
		}
	);

	return UserInfo;
};
