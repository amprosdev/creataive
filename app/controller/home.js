'use strict';
const BaseController = require('../core/base-controller');

class HomeController extends BaseController {
  /**
   * 列表查询
   * @return {Promise<void>}
   */
  async index() {
    this.success();
  }
  /**
   * 新增
   * @return {Promise<void>}
   */
  async create() {
    this.success();
  }
  /**
   * 查询详情
   * @return {Promise<void>}
   */
  async show() {
    this.success();
  }
  /**
   * 更新
   * @return {Promise<void>}
   */
  async update() {
    this.success();
  }
  /**
   * 删除
   * @return {Promise<void>}
   */
  async destroy() {
    this.success();
  }
}

module.exports = HomeController;
