'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('assets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.STRING(32),
      },
      organization_id: {
        type: Sequelize.STRING(64),
      },
      name: {
        type: Sequelize.STRING(255),
      },
      url: {
        type: Sequelize.STRING(255),
      },
      bucket: {
        type: Sequelize.STRING(255),
      },
      key: {
        type: Sequelize.STRING(255),
      },
      size: {
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.STRING(64),
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('assets');
  },
};
