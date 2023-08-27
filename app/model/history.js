'use strict';

module.exports = app => {
  const { STRING, TEXT, INTEGER, DATE } = app.Sequelize;
  return app.model.define('history', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    brand: STRING(255),
    name: STRING(255),
    type: STRING(255),
    feature: STRING(255),
    count: INTEGER,
    result: TEXT('long'),
    userId: { type: STRING(255), field: 'user_id' },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
  });
};
