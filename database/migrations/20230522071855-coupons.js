'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('coupons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      coupon_type: {
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.STRING(255),
      },
      days: {
        type: Sequelize.INTEGER,
      },
      code: {
        type: Sequelize.STRING(32),
      },
      user_id: {
        type: Sequelize.STRING(32),
      },
      is_redeemed: {
        type: Sequelize.BOOLEAN,
      },
      discount_percent: {
        type: Sequelize.DECIMAL,
      },
      discount_amount: {
        type: Sequelize.DECIMAL,
      },
      expiration_date: {
        type: Sequelize.DATE,
      },
      redeemed_at: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('coupons');
  },
};
