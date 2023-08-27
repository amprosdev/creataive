'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  return app.model.define('ppt_template', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    title: {
      type: STRING(255),
    },
    detail: {
      type: STRING(255),
    },
    image: {
      type: STRING(255),
    },
    coverBg: {
      type: STRING(255),
      field: 'cover_bg',
    },
    catalogBg: {
      type: STRING(255),
      field: 'catalog_bg',
    },
    sessionBg: {
      type: STRING(255),
      field: 'session_bg',
    },
    scene: {
      type: STRING(255),
    },
    style: {
      type: STRING(255),
    },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
  });
};
