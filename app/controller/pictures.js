const BaseController = require('../core/base-controller');
const { toInt } = require('../utils');
class PictureController extends BaseController {
  /**
   * 列表查询
   * @return {Promise<void>}
   */
  async index() {
    await this.getPageList('Picture');
  }
  /**
   * 列表查询
   * @return {Promise<void>}
   */
  async getEditorPick() {
    const ctx = this.ctx;
    const { current = 1, pageSize = 10, ...args } = ctx.request.query;
    const query = {
      where: {
        ...args,
        editorPick: 1,
      },
      order: [
        [ 'updated_at', 'DESC' ],
      ],
      limit: toInt(pageSize),
      offset: toInt(current - 1) * pageSize,
    };
    const { count, rows } = await ctx.model.Picture.findAndCountAll(query);
    this.success({
      current,
      total: count,
      data: rows,
    });
  }
  /**
   * 新增
   * @return {Promise<void>}
   */
  async create() {
    const ctx = this.ctx;
    const { id, name, parentId, imageUrl } = ctx.request.body;
    const { organizationId, userId } = this.user;
    const org = await ctx.model.Organization.findOne({
      where: {
        id: organizationId,
      },
    });
    const count = await ctx.model.Picture.count({ where: { organizationId } });
    if (org.limitImages <= count) {
      this.error('图片数量已达上限', 10);
      return;
    }
    const data = await ctx.model.Picture.create({
      id,
      name,
      parentId,
      imageUrl,
      editorPick: 0,
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
    await this.getOne('Picture');
  }
  /**
   * 更新
   * @return {Promise<void>}
   */
  async update() {
    const ctx = this.ctx;
    const { id } = ctx.params;
    const { parentId, name } = ctx.request.body;
    const [ result ] = await ctx.model.Picture.update({
      parentId,
      name,
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
    await this.deleteOne('Picture');
  }
}

module.exports = PictureController;
