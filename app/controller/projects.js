const BaseController = require('../core/base-controller');
class ProjectController extends BaseController {
  /**
   * 列表查询
   * @return {Promise<void>}
   */
  async index() {
    await this.getPageList('Project');
  }
  /**
   * 新增
   * @return {Promise<void>}
   */
  async create() {
    const ctx = this.ctx;
    const { name, desc } = ctx.request.body;
    const { organizationId, userId } = this.user;
    if (!organizationId) {
      this.error('请选择企业');
      return;
    }
    const org = await ctx.model.Organization.findOne({
      where: {
        id: organizationId,
      },
    });
    if (!org) {
      this.error('企业不存在');
      return;
    }
    const orgUser = await ctx.model.OrganizationUser.findOne({
      where: {
        organizationId,
        userId,
      },
    });
    if (!orgUser) {
      this.error('企业用户不存在');
      return;
    }
    const count = await ctx.model.Project.count({ where: { organizationId } });
    if (org.limitProjects <= count) {
      this.error('项目数量已达上限', 10);
      return;
    }
    const data = await ctx.model.Project.create({
      name,
      desc,
      organizationId,
      userId,
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
    await this.getOne('Project');
  }
  /**
   * 更新
   * @return {Promise<void>}
   */
  async update() {
    const ctx = this.ctx;
    const { id } = ctx.params;
    const { name, desc } = ctx.request.body;
    const [ result ] = await ctx.model.Project.update({
      name,
      desc,
      updatedAt: new Date(),
    }, {
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
    const ctx = this.ctx;
    const { id } = ctx.params;
    await ctx.model.Article.destroy({
      where: {
        projectId: id,
        organizationId: this.user.organizationId,
      },
    });
    await ctx.model.Picture.destroy({
      where: {
        parentId: id,
        organizationId: this.user.organizationId,
      },
    });
    await this.deleteOne('Project');
  }
}

module.exports = ProjectController;
