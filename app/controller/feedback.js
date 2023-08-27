'use strict';
const BaseController = require('../core/base-controller');

class FeedbackController extends BaseController {
  /**
   * 新增
   * @return {Promise<void>}
   */
  async create() {
    const ctx = this.ctx;
    const { type, desc } = ctx.request.body;
    const { organizationId, userId } = this.user;
    const data = await ctx.model.Feedback.create({
      type,
      desc,
      organizationId,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    this.success(data);
  }
}

module.exports = FeedbackController;
