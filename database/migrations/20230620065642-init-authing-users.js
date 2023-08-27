'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('authing_users', {
      user_id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      work_status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      external_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone_country_code: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nickname: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      photo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      logins_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      last_login: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      last_ip: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email_verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      phone_verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      password_last_set_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      birthdate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      province: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      street_address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      postal_code: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      company: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      browser: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      device: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      given_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      family_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      middle_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      profile: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      preferred_username: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      website: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      zoneinfo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      locale: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      formatted: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      region: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      user_source_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_source_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      last_login_app: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      main_department_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      last_mfa_time: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      password_security_level: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      reset_password_on_next_login: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      register_source: {
        type: Sequelize.JSON,
        allowNull: false,
      },
      identity_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('authing_users');
  }
};
