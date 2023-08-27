const BaseController = require('../core/base-controller');
class PPTController extends BaseController {
  /**
   * 列表查询
   * @return {Promise<void>}
   */
  async index() {
    await this.getPageList('Ppt');
  }
  /**
   * 新增
   * @return {Promise<void>}
   */
  async create() {
    const ctx = this.ctx;
    const {
      title,
      themeId = 'white',
      templateId = 4,
      subTitle,
      speaker,
      speakerTime,
      docTree,
      docContent,
    } = ctx.request.body;
    const { userId, organizationId } = this.user;
    const template = await ctx.model.PptTemplate.findOne({
      where: {
        id: templateId,
      },
    });
    const data = await ctx.model.Ppt.create({
      title,
      subTitle,
      themeId,
      templateId,
      image: template.image,
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
  /**
   * 查询详情
   * @return {Promise<void>}
   */
  async show() {
    await this.getOne('Ppt');
  }
  /**
   * 更新
   * @return {Promise<void>}
   */
  async update() {
    const ctx = this.ctx;
    const { id } = ctx.params;
    const { title, subTitle, speaker, speakerTime, docTree, docContent, themeId, templateId } = ctx.request.body;
    const updateObj = {
      ...(title && { title }),
      ...(subTitle && { subTitle }),
      ...(speaker && { speaker }),
      ...(speakerTime && { speakerTime }),
      ...(docTree && { docTree }),
      ...(docContent && { docContent }),
      ...(themeId && { themeId }),
      updatedAt: new Date(),
    };
    if (templateId) {
      const template = await ctx.model.PptTemplate.findOne({
        where: {
          id: templateId,
        },
      });
      updateObj.templateId = templateId;
      updateObj.image = template.image;
    }
    const [ result ] = await ctx.model.Ppt.update(updateObj, {
      where: {
        id,
        organizationId: this.user.organizationId,
      },
    });
    result ? this.success() : this.forbidden();
  }
  /**
   * 删除
   * @return {Promise<void>}
   */
  async destroy() {
    await this.deleteOne('Ppt');
  }
}

module.exports = PPTController;
