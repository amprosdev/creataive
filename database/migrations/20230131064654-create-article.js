'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      project_id: {
        type: Sequelize.STRING(255),
      },
      user_id: {
        type: Sequelize.STRING(255),
      },
      organization_id: {
        type: Sequelize.STRING(64),
      },
      title: {
        type: Sequelize.STRING(255),
      },
      type: {
        type: Sequelize.INTEGER,
      },
      text: {
        type: Sequelize.TEXT('long'),
      },
      summary: {
        type: Sequelize.STRING(255),
      },
      gallery: {
        type: Sequelize.STRING(255),
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('articles');
  },
};
