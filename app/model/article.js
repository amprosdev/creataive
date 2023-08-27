'use strict';

module.exports = app => {
  const { STRING, TEXT, INTEGER, DATE } = app.Sequelize;
  const Article = app.model.define('article', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING('255'),
    text: TEXT('long'),
    summary: STRING('255'),
    gallery: STRING('255'),
    type: INTEGER,
    userId: { type: STRING(255), field: 'user_id' },
    organizationId: { type: STRING(64), field: 'organization_id' },
    conversation: { type: STRING(255), field: 'conversation_id' },
    projectId: { type: STRING(255), field: 'project_id' },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
  });
  Article.associate = function() {
    // 定义 Article 和 Project 的关联关系
    app.model.Article.belongsTo(app.model.Project, { foreignKey: 'projectId' });
  };
  return Article;
};
