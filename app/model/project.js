'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  return app.model.define('project', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING('255'),
    desc: STRING('255'),
    userId: { type: STRING(255), field: 'user_id' },
    organizationId: { type: STRING(64), field: 'organization_id' },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
  });
};
