'use strict';

module.exports = app => {
  const { STRING, DATE } = app.Sequelize;
  const User = app.model.define('user', {
    id: { type: STRING(32), primaryKey: true },
    avatar: STRING(255),
    phone: STRING(255),
    username: { type: STRING(32) },
    email: { type: STRING(255) },
    nickname: { type: STRING(32) },
    language: { type: STRING(32) },
    userLogo: { type: STRING(255), field: 'user_logo' },
    userSign: { type: STRING(32), field: 'user_sign' },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
  });
  User.associate = function() {
    app.model.User.belongsToMany(app.model.Organization, {
      through: 'organization_users',
    });
  };
  return User;
};
