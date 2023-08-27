'use strict';
const axios = require('axios');
const BaseController = require('../core/base-controller');
const { AuthenticationClient } = require('authing-js-sdk');
const { usersManagement } = require('../utils/authing-util');


class WxBaseController extends BaseController {
  constructor(ctx) {
    super(ctx);
    this.accessToken = null;
    this.accessTokenExpiresIn = null;
  }

  /**
   * 获取微信 Access Token
   * @return {Promise<string>} Token
   */
  async getAccessToken() {
    if (this.accessToken && this.accessTokenExpiresIn > Date.now()) {
      return this.accessToken;
    }
    const appid = 'wxbb70f481c0f29a81';
    const secret = '16224d598ff8d616cc3e297585430e5a';
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`;
    const response = await axios.get(url);
    this.accessToken = response.data.access_token;
    this.accessTokenExpiresIn = Date.now() + response.data.expires_in * 1000 - 5 * 60 * 1000; // 5 minutes early expiration
    return this.accessToken;
  }

  /**
   * 调用微信 API 获取用户手机号码
   * @return {Promise<string>} 手机号码
   */
  async getPhoneNumber() {
    const ctx = this.ctx;
    const { code } = ctx.query;
    const accessToken = await this.getAccessToken();
    const url = `https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=${accessToken}`;
    const data = {
      code,
    };
    const response = await axios.post(url, data);
    if (response.data.errcode === 0) {
      this.success(response.data.phone_info);
    } else {
      this.error(response.data);
    }
  }

  async sendSmsCode() {
    const { ctx } = this;
    const { phone } = ctx.request.body;

    try {
      const authClient = new AuthenticationClient({
        appId: '63c6bee82db7ec890b96bca8',
        // appSecret: '461129c15df1222da60668074f61dacf',
        appHost: 'https://creataive.authing.cn',
      });
      await authClient.sendSmsCode(phone);
      this.success('SMS code sent successfully');
    } catch (error) {
      console.error(error);
      this.error(error.message);
    }
  }

  // 绑定手机号
  async bindPhone() {
    const { ctx } = this;
    const { phone, code } = ctx.request.body;

    try {
      const authClient = new AuthenticationClient({
        appId: '63c6bee82db7ec890b96bca8',
        // appSecret: '461129c15df1222da60668074f61dacf',
        appHost: 'https://creataive.authing.cn',
        token: ctx.request.header.authorization,
      });
      await authClient.bindPhone(phone, code); // 验证短信验证码并登录
      const user = await authClient.refreshToken();
      this.success(user.token);
    } catch (error) {
      console.error(error);
      this.error(error.message);
    }
  }

  // 手机号登录
  async phoneCodeLogin() {
    const { ctx } = this;
    const { phone, code } = ctx.request.body;

    try {
      const authClient = new AuthenticationClient({
        appId: '63c6bee82db7ec890b96bca8',
        // appSecret: '461129c15df1222da60668074f61dacf',
        appHost: 'https://creataive.authing.cn',
      });
      const user = await authClient.loginByPhoneCode(phone, code); // 验证短信验证码并登录
      this.success(user.token);
    } catch (error) {
      console.error(error);
      this.error(error.message);
    }
  }

  async createTrialAccount() {

    const authing = new AuthenticationClient({
      appId: '63c6bee82db7ec890b96bca8',
      // appSecret: '461129c15df1222da60668074f61dacf',
      appHost: 'https://creataive.authing.cn',
    });

    function generateUsername() {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let username = '';
      for (let i = 0; i < 10; i++) {
        username += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return username;
    }

    const userInfo = {
      username: generateUsername(),
      password: generateUsername(),
    };

    async function createUser() {
      return await usersManagement.createUser(userInfo);
    }

    async function login({ username, password }) {
      const { token } = await authing.loginByUsername(username, password);
      return token;
    }

    await createUser()
      .then(async res => {
        console.log(res);
        const token = await login(userInfo);
        this.success(token);
      });
  }

  async pushUser() {
    const ctx = this.ctx;
    const { dataList } = ctx.request.body;
    for (const item of JSON.parse(dataList)) {
      console.log(item);
      await ctx.model.AuthingUser.create(item);
    }
    // const user = await ctx.model.User.create();
    this.success(JSON.parse(dataList));
  }

  async getPassword() {
    const userList = await usersManagement.getUserBatch({
      userIds: [
        '648b0285bb3008f53b3f560b',
        '648a69170085961b92af3eb0',
        '6488b283ef1c58dc1b21c4c8',
        '6488b282a11daa6c706d19be',
        '6487cd866d014db170a00da4',
        '648299ce8f1e0fd5129ace9f',
        '6482985835f6bc0d78d2c5fb',
        '647e3a523205c782b0c4b85a',
        '647c3635446e76066b074677',
        '64759124443473d4136d9eba',
        '647457a029ca7092b364dd88',
        '64740fd1e4320842f58b6fc1',
        '6471d19d524aeb2d2bcd896e',
        '647179f9ff4150b55ae67dec',
        '647179f7eefba1ef83937959',
        '646eaf8679f94de9daf5ab18',
        '646e18f30a5b77e07a89e7ac',
        '646e16252066abf8c75e689b',
        '646e1624c626b0ffced2b453',
        '646d7ac99f30776dde656210',
        '646c4d7bfec0ba3cd9f503e3',
        '646c4d7a16d7cfc4001c3dc6',
        '646c4d79ef407e6c3c063071',
        '646b5bac21feb5d144eeb298',
        '646b5b162249c92cb968821b',
        '646b5ae0799ed7020b660d13',
        '646b59482e3072883f054526',
        '646b58b3b517794e0d94160e',
        '646b577d94f406808c1374c5',
        '646b56b5f02d1e36ab41e71b',
        '646b568fb50c1f2daf348db2',
        '646b43dabd51f7dbe7f74ecd',
        '646b42cd42942f4221f1a212',
        '646b42c6fba53cd0831a20c4',
        '646b42bebeff483dfb1263d6',
        '646b428d7f584df4e91c9e5b',
        '646b422b5e2be2079cc18a6b',
        '6469af6fbd50382149206755',
        '6464e0a09d837c8d50204a63',
        '6464ab5e8ef80b54b17ddddf',
        '646477c8e4d4345fe29212ec',
        '64632ff7188c52b8f785996b',
        '6462f5be0c7c82d6d47199ef',
        '6462e6f32a58007b908fd845',
        '6462e6f388cdde21cf717b4c',
        '6462e6f151eed84dd8154ffd',
        '6461161a9dcb525ca16940c1',
        '6461161905e3b1c958eb818e',
        '646110be56c5e6ada07786d4',
        '646102b4dcd6ae7f9e90f7bd',
      ],
    });
    this.success(userList.data);
  }

  async createUserIfNotExists() {
    const authing = new AuthenticationClient({
      appId: '63c6bee82db7ec890b96bca8',
      // appSecret: '461129c15df1222da60668074f61dacf',
      appHost: 'https://creataive.authing.cn',
    });

    async function login(phone, password) {
      const { token } = await authing.loginByPhonePassword(phone, password);
      return token;
    }

    async function setPassword(id, phone) {
      const newPassword = phone.slice(-4) + '-daCqyp'; // 密码为手机号后四位加一个固定字符串
      await usersManagement.updateUser({ userId: id, password: newPassword });
      return newPassword;
    }

    async function createUser(userInfo) {
      return await usersManagement.createUser(userInfo);
    }

    const ctx = this.ctx;
    const { phone } = ctx.request.body;
    const user = await usersManagement.getUser({ userId: phone, userIdType: 'phone' });
    if (user) {
      const { userId, password } = user.data;
      if (!password) {
        const newPassword = await setPassword(userId, phone);
        const token = await login(phone, newPassword);
        this.success(token);
      } else {
        const token = await login(phone, password);
        this.success(token);
      }
    } else {
      const password = phone.slice(-4) + '-daCqyp'; // 密码为手机号后四位加一个固定字符串
      const userInfo = { phone, password };
      await createUser(userInfo);
      const token = await login(phone, password);
      this.success(token);
    }
  }
}

module.exports = WxBaseController;
