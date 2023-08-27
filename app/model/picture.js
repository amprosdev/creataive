'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  return app.model.define('picture', {
    id: { type: STRING(32), primaryKey: true },
    parentId: { type: STRING(32), field: 'parent_id' },
    userId: { type: STRING(32), field: 'user_id' },
    organizationId: { type: STRING(64), field: 'organization_id' },
    name: { type: STRING(255), field: 'name' },
    imageUrl: { type: STRING(255), field: 'image_url' },
    editorPick: { type: INTEGER, field: 'editor_pick' },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
  });
};
