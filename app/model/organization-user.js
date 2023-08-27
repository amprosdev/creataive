'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const OrganizationUser = app.model.define('organization_user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    organizationId: {
      type: STRING(64),
      field: 'organization_id',
      references: {
        model: 'Organizations',
        key: 'id',
      },
    },
    userId: {
      type: STRING(32),
      field: 'user_id',
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    userType: { type: INTEGER, field: 'user_type' },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
  });
  return OrganizationUser;
};
