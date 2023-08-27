'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Organization = app.model.define('organization', {
    id: { type: STRING(64), primaryKey: true },
    orgName: { type: STRING(32), field: 'org_name' },
    orgDescription: { type: STRING(255), field: 'org_description' },
    orgType: { type: STRING(32), field: 'org_type' },
    seats: { type: INTEGER, field: 'seats' },
    paymentType: { type: INTEGER, field: 'payment_type' },
    paymentExpired: { type: DATE, field: 'payment_expired' },
    limitProjects: { type: INTEGER, field: 'limit_projects' },
    limitDocuments: { type: INTEGER, field: 'limit_documents' },
    limitImages: { type: INTEGER, field: 'limit_images' },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
  });
  Organization.associate = function() {
    app.model.Organization.belongsToMany(app.model.User, {
      through: 'organization_users',
    });
  };
  return Organization;
};
