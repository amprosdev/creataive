const { Controller } = require('egg');
const { toInt } = require('../utils');

class BaseController extends Controller {
  get user() {
    return this.ctx.state.user;
  }

  success(data = 'success') {
    this.ctx.body = {
      code: 0,
      data,
    };
  }

  error(data = 'error', code = 1) {
    this.ctx.body = {
      code,
      data,
    };
  }

  notFound(msg) {
    this.ctx.body = {
      code: 404,
      msg: msg || 'not found',
    };
  }

  forbidden(msg) {
    this.ctx.body = {
      code: 403,
      msg: msg || 'forbidden',
    };
  }

  badRequest(msg = '参数缺失') {
    this.ctx.body = {
      code: 400,
      msg: msg || '参数缺失',
    };
  }

  async getOneResult(model) {
    const ctx = this.ctx;
    const { id } = ctx.params;
    const where = {
      id,
    };
    if ([ 'PptTemplate' ].indexOf(model) < 0) {
      where.organizationId = this.user.organizationId;
    }
    return await ctx.model[model].findOne({
      where,
    });
  }

  async getOne(model) {
    const result = await this.getOneResult(model);
    result ? this.success(result) : this.notFound();
  }

  async deleteOne(model) {
    const ctx = this.ctx;
    const { id } = ctx.params;
    const result = await ctx.model[model].destroy({
      where: {
        id,
        organizationId: this.user.organizationId,
      },
    });
    result ? this.success() : this.notFound();
  }

  async getPageList(model, include) {
    const ctx = this.ctx;
    const { current = 1, pageSize = 10, ...args } = ctx.request.query;
    const where = {
      organizationId: this.user.organizationId,
      ...args,
    };
    const query = {
      where,
      order: [
        [ 'created_at', 'DESC' ],
      ],
      limit: toInt(pageSize),
      offset: toInt(current - 1) * pageSize,
    };
    if (include) {
      query.include = include;
    }
    const { count, rows } = await ctx.model[model].findAndCountAll(query);

    if (!this.user.verified) {
      this.error({
        current,
        total: count,
        data: rows,
      }, 20);
    } else {
      this.success({
        current,
        total: count,
        data: rows,
      });
    }

  }
}

module.exports = BaseController;
