'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ppts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING(255),
      },
      sub_title: {
        type: Sequelize.STRING(255),
      },
      image: {
        type: Sequelize.STRING(255),
      },
      speaker: {
        type: Sequelize.STRING(255),
      },
      speaker_time: {
        type: Sequelize.STRING(255),
      },
      doc_tree: {
        type: Sequelize.TEXT('long'),
      },
      doc_content: {
        type: Sequelize.TEXT('long'),
      },
      template_id: {
        type: Sequelize.STRING(64),
      },
      theme_id: {
        type: Sequelize.STRING(64),
      },
      user_id: {
        type: Sequelize.STRING(32),
      },
      organization_id: {
        type: Sequelize.STRING(64),
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
    await queryInterface.dropTable('ppts');
  },
};
