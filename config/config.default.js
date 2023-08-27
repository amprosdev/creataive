/* eslint valid-jsdoc: "off" */

'use strict';
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    security: {
      csrf: {
        enable: false,
        ignoreJSON: true,
      },
    },
    cors: {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    },
    sequelize: {
      dialect: 'mysql',
      host: 'sh-cdb-5gkg6fnm.sql.tencentcdb.com',
      port: 63873,
      database: 'mano',
      username: 'root',
      password: 'Mano@2022',
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1672749544423_1678';

  // add your middleware config here
  config.middleware = [
    'authing',
    'proxy',
  ];
  config.proxy = {
    enable: true,
    match: '/proxy', // 匹配所有以 /api 开头的请求
  };
  config.multipart = {
    mode: 'file',
    fileExtensions: [
      '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.txt', '.zip', '.rar',
      '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.md',
    ],
  };
  config.article = {
    pageSize: 5,
    testUrl: 'https://hacker-news.firebaseio.com/v0',
    serverUrl: 'https://hacker-news.firebaseio.com/v0',
  };
  config.jwt = {
    secret: '461129c15df1222da60668074f61dacf',
  };
  config.cluster = {
    listen: {
      path: '',
      port: 7001,
      hostname: '127.0.0.1', // 0.0.0.0
    },
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
