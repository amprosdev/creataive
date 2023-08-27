'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  return app.model.define('ppt_graphic', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    title: {
      type: STRING(255),
    },
    image: {
      type: STRING(255),
    },
    detail: {
      type: STRING(255),
    },
    category: {
      type: STRING(255),
    },
    style: {
      type: STRING(255),
    },
    quantity: {
      type: STRING(255),
    },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
  });
};
