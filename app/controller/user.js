'use strict';
const BaseController = require('../core/base-controller');
const { usersManagement } = require('../utils/authing-util');
const { initializeOrgUser } = require('../service/organization_service');

class UserController extends BaseController {
  /**
   * 查询我的详情
   * @return {Promise<void>}
   */
  async mine() {
    const ctx = this.ctx;
    const result = await ctx.model.User.findOne({
      where: {
        id: this.user.userId,
      },
      include: [ ctx.model.Organization ],
    });
    result ? this.success(result) : this.notFound();
  }

  /**
   * 优惠券兑换
   * @return {Promise<void>}
   */
  async redeem() {
    const ctx = this.ctx;
    const { code = '', phone } = ctx.request.body;
    const password = phone.slice(-4) + '-daCqyp'; // 密码为手机号后四位加一个固定字符串
    const userInfo = {
      phone,
      password,
      phoneVerified: true,
    };

    // 查询券码
    const coupon = await ctx.model.Coupon.findOne({
      where: {
        code,
      },
    });
    if (!coupon) {
      return this.notFound('该券码不存在');
    }
    if (coupon.expirationDate < Date.now() || coupon.isRedeemed) {
      return this.error('券码过期或已使用');
    }
    // 判断手机号是否存在
    const existUser = await ctx.model.User.findOne({
      where: {
        phone,
      },
    });
    let orgUser;
    let authingUser;
    // 根据以下代码得到用户与组织的关联信息
    if (!existUser) {
      // 手机号不存在先创建用户，authing 和 自己的系统
      authingUser = await usersManagement.createUser(userInfo);
      orgUser = await initializeOrgUser(ctx, authingUser);
    } else {
      orgUser = await ctx.model.OrganizationUser.findOne({
        where: {
          userId: existUser.id,
        },
      });
    }
    const org = await ctx.model.Organization.findOne({
      where: {
        id: orgUser.organizationId,
      },
    });
    const newExpired = new Date(org.paymentExpired.getTime() + coupon.days * 24 * 60 * 60 * 1000);
    // 更新过期时间
    await ctx.model.Organization.update({
      paymentType: 1,
      paymentExpired: newExpired,
      limitProjects: 10,
      limitDocuments: 50,
      limitImages: 200,
      updatedAt: Date.now(),
    }, {
      where: {
        id: orgUser.organizationId,
      },
    });
    // 修改券码状态
    await ctx.model.Coupon.update({
      isRedeemed: true,
    }, {
      where: {
        code,
      },
    });
    this.success('success');
  }

  async update() {
    const ctx = this.ctx;
    const { avatar, phone, nickname, userSign, userLogo, language } = ctx.request.body;
    const updateObj = {
      ...(avatar && { avatar }),
      ...(phone && { phone }),
      ...(nickname && { nickname }),
      ...(language && { language }),
      ...(userSign && { userSign }),
      ...(userLogo && { userLogo }),
      updatedAt: new Date(),
    };
    const [ result ] = await ctx.model.User.update(updateObj, {
      where: {
        id: this.user.userId,
      },
    });
    result ? this.success() : this.forbidden();
  }
}

module.exports = UserController;
