const BaseController = require('../core/base-controller');
const { toInt } = require('../utils');
class PPTChosenController extends BaseController {
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
    const { count, rows } = await ctx.model.PptChosen.findAndCountAll(query);
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
    await this.getOne('PptChosen');
  }

  /**
   * 新增
   * @return {Promise<void>}
   */
  async create() {
    const ctx = this.ctx;
    const {
      chosenId,
    } = ctx.request.body;
    const { userId, organizationId } = this.user;
    const chosen = await ctx.model.PptChosen.findOne({
      where: {
        id: chosenId,
      },
    });
    const {
      title,
      subTitle,
      themeId,
      templateId,
      image,
      speaker,
      speakerTime,
      docTree,
      docContent,
    } = chosen;
    const data = await ctx.model.Ppt.create({
      title,
      subTitle,
      themeId,
      templateId,
      image,
      speaker,
      speakerTime,
      docTree,
      docContent,
      userId,
      organizationId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    this.success(data);
  }
}

module.exports = PPTChosenController;
