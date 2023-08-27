'use strict';
const BaseController = require('../core/base-controller');
const { Op } = require('sequelize');

class LoginController extends BaseController {
  async login() {
    const ctx = this.ctx;
    const { username = '', phone = '', password = '' } = ctx.request.body;
    console.log(username, password);
    const user = await ctx.model.AuthingUser.findOne({
      where: {
        [Op.or]: [
          { phone },
          { username },
        ],
      },
    });
    const tokenData = {
      updated_at: '2023-05-23T07:00:20.439Z',
      address: { country: null, postal_code: null, region: user.region, formatted: user.formatted },
      phone_number_verified: user.phoneVerified,
      phone_number: user.phone,
      locale: user.locale,
      zoneinfo: user.zoneinfo,
      birthdate: user.birthdate,
      gender: user.gender,
      email_verified: user.emailVerified,
      email: user.email,
      website: user.website,
      picture: user.photo,
      profile: user.profile,
      preferred_username: user.preferredUsername,
      nickname: user.nickname,
      middle_name: user.middleName,
      family_name: user.familyName,
      given_name: user.givenName,
      name: user.name,
      sub: user.userId,
      external_id: user.externalId,
      unionid: null,
      username: user.username,
      data: {
        type: 'user',
        userPoolId: user.userSourceId,
        appId: user.userSourceId,
        id: user.userId,
        userId: user.userId,
        _id: user.userId,
        phone: user.phone,
        email: user.email,
        username: user.username,
        unionid: null,
        openid: null,
        clientId: user.userSourceId,
      },
      userpool_id: user.userSourceId,
      aud: user.userSourceId,
    };
    const token = ctx.app.jwt.sign(tokenData, '461129c15df1222da60668074f61dacf', { expiresIn: '2d' });
    const decode = ctx.app.jwt.verify(token, '461129c15df1222da60668074f61dacf');
    console.log(decode);
    this.success(token);
  }
}

module.exports = LoginController;
