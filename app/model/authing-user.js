'use strict';

module.exports = app => {
  const { DataTypes } = app.Sequelize;
  const AuthingUsers = app.model.define('authing_users', {
    userId: {
      type: DataTypes.STRING,
      field: 'user_id',
      allowNull: false,
      primaryKey: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    workStatus: {
      type: DataTypes.STRING,
      field: 'work_status',
      allowNull: true,
    },
    externalId: {
      type: DataTypes.STRING,
      field: 'external_id',
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneCountryCode: {
      type: DataTypes.STRING,
      field: 'phone_country_code',
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    loginsCount: {
      type: DataTypes.INTEGER,
      field: 'logins_count',
      allowNull: false,
    },
    lastLogin: {
      type: DataTypes.DATE,
      field: 'last_login',
      allowNull: true,
    },
    lastIp: {
      type: DataTypes.STRING,
      field: 'last_ip',
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      field: 'email_verified',
      allowNull: false,
    },
    phoneVerified: {
      type: DataTypes.BOOLEAN,
      field: 'phone_verified',
      allowNull: false,
    },
    passwordLastSetAt: {
      type: DataTypes.DATE,
      field: 'password_last_set_at',
      allowNull: true,
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    province: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    streetAddress: {
      type: DataTypes.STRING,
      field: 'street_address',
      allowNull: true,
    },
    postalCode: {
      type: DataTypes.STRING,
      field: 'postal_code',
      allowNull: true,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    browser: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    device: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    givenName: {
      type: DataTypes.STRING,
      field: 'given_name',
      allowNull: true,
    },
    familyName: {
      type: DataTypes.STRING,
      field: 'family_name',
      allowNull: true,
    },
    middleName: {
      type: DataTypes.STRING,
      field: 'middle_name',
      allowNull: true,
    },
    profile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    preferredUsername: {
      type: DataTypes.STRING,
      field: 'preferred_username',
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zoneinfo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    locale: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    formatted: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userSourceType: {
      type: DataTypes.STRING,
      field: 'user_source_type',
      allowNull: false,
    },
    userSourceId: {
      type: DataTypes.STRING,
      field: 'user_source_id',
      allowNull: true,
    },
    lastLoginApp: {
      type: DataTypes.STRING,
      field: 'last_login_app',
      allowNull: true,
    },
    mainDepartmentId: {
      type: DataTypes.STRING,
      field: 'main_department_id',
      allowNull: true,
    },
    lastMfaTime: {
      type: DataTypes.DATE,
      field: 'last_mfa_time',
      allowNull: true,
    },
    passwordSecurityLevel: {
      type: DataTypes.INTEGER,
      field: 'password_security_level',
      allowNull: true,
    },
    resetPasswordOnNextLogin: {
      type: DataTypes.BOOLEAN,
      field: 'reset_password_on_next_login',
      allowNull: false,
    },
    registerSource: {
      type: DataTypes.JSON,
      field: 'register_source',
      allowNull: false,
    },
    identityNumber: {
      type: DataTypes.STRING,
      field: 'identity_number',
      allowNull: true,
    },
  });

  return AuthingUsers;
};
