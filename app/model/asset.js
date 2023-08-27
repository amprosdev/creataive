'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  return app.model.define('asset', {
    id: { type: STRING(32), primaryKey: true },
    userId: { type: STRING(32), field: 'user_id' },
    organizationId: { type: STRING(64), field: 'organization_id' },
    name: { type: STRING(255), field: 'name' },
    url: { type: STRING(255), field: 'url' },
    bucket: { type: STRING(255), field: 'bucket' },
    key: { type: STRING(255), field: 'key' },
    size: { type: INTEGER, field: 'size' },
    type: { type: STRING(64), field: 'type' },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
  });
};
