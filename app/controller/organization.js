'use strict';
const BaseController = require('../core/base-controller');
const { initializeOrgUser } = require('../service/organization_service');
const { usersManagement } = require('../utils/authing-util');

class OrganizationController extends BaseController {
  /**
   * 查询组织详情
   * @return {Promise<void>}
   */
  async show() {
    const ctx = this.ctx;
    const { organizationId } = this.user;
    const result = await ctx.model.Organization.findOne({
      where: {
        id: organizationId,
      },
      include: [{
        model: ctx.model.User,
        through: {
          // 指定通过 OrganizationUsers 关联表关联查询 User 表的数据
          model: ctx.model.OrganizationUser,
        },
      }],
    });
    result ? this.success(result) : this.notFound();
  }
  /**
   * 初始化企业
   * @return {Promise<void>}
   */
  async create() {
    const ctx = this.ctx;
    const userId = this.user.userId;
    let orgUser = await ctx.model.OrganizationUser.findOne({
      where: {
        userId,
      },
    });
    const authingUser = await usersManagement.getUser({ userId });
    const { phone, username, email } = authingUser.data;
    // 更新用户数据
    await ctx.model.User.update({
      phone, username, email,
    }, {
      where: {
        id: userId,
      },
    });
    if (orgUser) {
      this.success(orgUser);
      return;
    }
    orgUser = await initializeOrgUser(ctx, authingUser);
    this.success(orgUser);
  }
  /**
   * 更新
   * @return {Promise<void>}
   */
  async update() {
    const ctx = this.ctx;
    const { id } = ctx.params;
    const { orgName, orgDescription } = ctx.request.body;
    const { userId, organizationId } = this.user;
    const user = await ctx.model.OrganizationUser.findOne({
      where: {
        organizationId,
        userId,
      },
    });
    if (user) {
      await ctx.model.Organization.update({
        orgName,
        orgDescription,
        updatedAt: new Date(),
      }, {
        where: {
          id,
        },
      });
      this.success();
    } else {
      this.forbidden('您没有权限');
    }
  }
}

module.exports = OrganizationController;
