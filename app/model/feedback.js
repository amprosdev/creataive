'use strict';

module.exports = app => {
  const { STRING, TEXT, INTEGER, DATE } = app.Sequelize;
  const Feedback = app.model.define('feedback', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: INTEGER, field: 'type' },
    desc: { type: TEXT, field: 'desc' },
    userId: { type: STRING(32), field: 'user_id' },
    organizationId: { type: STRING(64), field: 'organization_id' },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
  });
  Feedback.associate = function() {
    app.model.User.belongsToMany(app.model.Organization, {
      through: 'organization_users',
    });
  };
  return Feedback;
};
