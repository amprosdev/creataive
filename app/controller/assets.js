'use strict';
const BaseController = require('../core/base-controller');
const { getSignedUrl } = require('../utils');
const { HttpClient } = require('urllib');

class AssetsController extends BaseController {
  /**
   * 新增
   * @return {Promise<void>}
   */
  async create() {
    const ctx = this.ctx;
    const { url, type, name, size, bucket, key } = ctx.request.body;
    const { organizationId, userId } = this.user;
    const data = await ctx.model.Asset.create({
      url,
      bucket,
      key,
      type,
      name,
      size,
      organizationId,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    this.success(data);
  }
  /**
   * 列表查询
   * @return {Promise<void>}
   */
  async index() {
    await this.getPageList('Asset');
  }
  async show() {
    const asset = await this.getOneResult('Asset');
    const url = getSignedUrl(asset);
    const response = await this.ctx.curl(url);
    this.success(response.data.toString());
  }
}

module.exports = AssetsController;
