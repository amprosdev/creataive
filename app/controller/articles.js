const BaseController = require('../core/base-controller');
class ArticleController extends BaseController {
  /**
   * 列表查询
   * @return {Promise<void>}
   */
  async index() {
    const include = [{
      model: this.ctx.model.Project,
      attributes: [ 'id', 'name' ],
    }];
    await this.getPageList('Article', include);
  }
  /**
   * 新增
   * @return {Promise<void>}
   */
  async create() {
    const ctx = this.ctx;
    const { text, title = 'Untitled', gallery, summary, projectId } = ctx.request.body;
    if (!projectId) {
      this.error('项目ID不能为空');
    }
    const { userId, organizationId } = this.user;
    const org = await ctx.model.Organization.findOne({
      where: {
        id: organizationId,
      },
    });
    const count = await ctx.model.Article.count({ where: { organizationId } });
    if (org.limitDocuments <= count) {
      this.error('文档数量已达上限', 10);
      return;
    }

    const data = await ctx.model.Article.create({
      text,
      summary,
      gallery,
      title,
      type: 1,
      userId,
      organizationId,
      projectId,
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
    await this.getOne('Article');
  }
  /**
   * 更新
   * @return {Promise<void>}
   */
  async update() {
    const ctx = this.ctx;
    const { id } = ctx.params;
    const { text, gallery, summary, title, conversation } = ctx.request.body;
    const updateObj = {
      text,
      summary,
      gallery,
      conversation,
      title: title || `未命名标题${id}`,
      updatedAt: new Date(),
    };
    if (!title) {
      delete updateObj.title;
    }
    console.log(this.user);
    const [ result ] = await ctx.model.Article.update(updateObj, {
      where: {
        id,
        organizationId: this.user.organizationId,
      },
    });
    if (!this.user.verified) {
      this.error('体验账号未认证', 20);
      return;
    }
    result ? this.success() : this.forbidden();
  }
  /**
   * 删除
   * @return {Promise<void>}
   */
  async destroy() {
    await this.deleteOne('Article');
  }
}

module.exports = ArticleController;
