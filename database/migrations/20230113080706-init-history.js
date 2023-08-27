'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, TEXT, DATE, STRING } = Sequelize;
    await queryInterface.createTable('histories', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      brand: STRING(255),
      name: STRING(255),
      type: STRING(255),
      feature: STRING(255),
      count: INTEGER,
      result: TEXT('long'),
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('histories');
  },
};
