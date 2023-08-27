const BaseController = require('../core/base-controller');
const { toInt } = require('../utils');
class PPTTemplateController extends BaseController {
  /**
   * 列表查询
   * @return {Promise<void>}
   */
  async index() {
    const ctx = this.ctx;
    const { current = 1, pageSize = 100, ...args } = ctx.request.query;
    const query = {
      where: {
        ...args,
      },
      limit: toInt(pageSize),
      offset: toInt(current - 1) * pageSize,
    };
    const { count, rows } = await ctx.model.PptTemplate.findAndCountAll(query);
    this.success({
      current,
      total: count,
      data: rows,
    });
  }
  /**
   * 查询详情
   * @return {Promise<void>}
   */
  async show() {
    await this.getOne('PptTemplate');
  }
  /**
   * 删除
   * @return {Promise<void>}
   */
  async destroy() {
    await this.deleteOne('PptTemplate');
  }
}

module.exports = PPTTemplateController;
