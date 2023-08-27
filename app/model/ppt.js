'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;
  return app.model.define('ppt', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    title: {
      type: STRING(255),
    },
    subTitle: {
      type: STRING(255),
      field: 'sub_title',
    },
    image: {
      type: STRING(255),
    },
    speaker: {
      type: STRING(255),
    },
    speakerTime: {
      type: STRING(255),
      field: 'speaker_time',
    },
    userId: {
      type: STRING(32),
      field: 'user_id',
    },
    organizationId: {
      type: STRING(64),
      field: 'organization_id',
    },
    docTree: {
      type: TEXT('long'),
      field: 'doc_tree',
    },
    docContent: {
      type: TEXT('long'),
      field: 'doc_content',
    },
    templateId: {
      type: STRING(64),
      field: 'template_id',
    },
    themeId: {
      type: STRING(64),
      field: 'theme_id',
    },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
  });
};
