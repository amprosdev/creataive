'use strict';
const BaseController = require('../core/base-controller');
const { uuid } = require('../utils');
const { PAYMENT_TYPE, USER_TYPE } = require('../constants');

class OrganizationUsersController extends BaseController {
  /**
   * 添加成员
   * @return {Promise<void>}
   */
  async create() {
    const ctx = this.ctx;
    const { organizationId } = this.user;
    const { userId, userType } = ctx.request.body;
    if (userType !== USER_TYPE.ADMIN && userType !== USER_TYPE.COLLAB) {
      return this.error('用户类型错误');
    }
    const existUser = await ctx.model.User.findOne({
      where: {
        id: userId,
      },
    });
    if (!existUser) {
      return this.error('用户不存在');
    }
    const existOrganizationUser = await ctx.model.OrganizationUser.findOne({
      where: {
        organizationId,
        userId,
      },
    });
    if (existOrganizationUser) {
      return this.error('该成员已存在');
    }
    const user = await ctx.model.OrganizationUser.create({
      organizationId,
      userId,
      userType,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    this.success(user);
  }
  /**
   * 更新
   * @return {Promise<void>}
   */
  async update() {
    const ctx = this.ctx;
    const { id } = ctx.params;
    const { userType } = ctx.request.body;
    // const { organizationId, userId } = this.user;
    if (userType !== USER_TYPE.ADMIN && userType !== USER_TYPE.COLLAB) {
      return this.error('用户类型错误');
    }
    const existOrganizationUser = await ctx.model.OrganizationUser.findOne({
      where: {
        id,
      },
    });
    if (!existOrganizationUser) {
      return this.error('该成员不存在');
    }
    const [ result ] = await ctx.model.OrganizationUser.update({
      userType,
      updatedAt: new Date(),
    }, {
      where: {
        id,
      },
    });
    result ? this.success() : this.forbidden();
  }
  /**
   * 删除成员
   * @return {Promise<void>}
   */
  // eslint-disable-next-line no-empty-function
  async destroy() {
    const ctx = this.ctx;
    const { id } = ctx.params;
    const existOrganizationUser = await ctx.model.OrganizationUser.findOne({
      where: {
        id,
      },
    });
    if (!existOrganizationUser) {
      return this.error('该成员不存在');
    }
    if (existOrganizationUser.userType === USER_TYPE.OWNER) {
      return this.error('不能删除拥有者');
    }
    await this.deleteOne('OrganizationUser');
  }
}

module.exports = OrganizationUsersController;
