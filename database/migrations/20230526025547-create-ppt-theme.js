'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ppt_templates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING(255),
      },
      detail: {
        type: Sequelize.STRING(255),
      },
      image: {
        type: Sequelize.STRING(255),
      },
      cover_bg: {
        type: Sequelize.STRING(255),
      },
      catalog_bg: {
        type: Sequelize.STRING(255),
      },
      session_bg: {
        type: Sequelize.STRING(255),
      },
      scene: {
        type: Sequelize.STRING(255),
      },
      style: {
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
    await queryInterface.dropTable('ppt_themes');
  },
};
