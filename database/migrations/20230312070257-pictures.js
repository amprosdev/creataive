'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('pictures', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(32),
      },
      user_id: {
        type: Sequelize.STRING(255),
      },
      organization_id: {
        type: Sequelize.STRING(64),
      },
      parent_id: {
        type: Sequelize.STRING(32),
      },
      name: {
        type: Sequelize.STRING(255),
      },
      image_url: {
        type: Sequelize.STRING(255),
      },
      editor_pick: {
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

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('pictures');
  },
};
