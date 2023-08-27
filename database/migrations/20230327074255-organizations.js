'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('organizations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(64),
      },
      org_name: {
        type: Sequelize.STRING(32),
      },
      org_description: {
        type: Sequelize.STRING(255),
      },
      org_type: {
        type: Sequelize.STRING(32),
      },
      seats: {
        type: Sequelize.INTEGER,
      },
      payment_type: {
        type: Sequelize.INTEGER,
      },
      payment_expired: {
        type: Sequelize.DATE,
      },
      limit_projects: {
        type: Sequelize.INTEGER,
      },
      limit_documents: {
        type: Sequelize.INTEGER,
      },
      limit_images: {
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('organizations');
  }
};
