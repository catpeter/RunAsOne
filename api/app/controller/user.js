'use strict';

const Controller = require('egg').Controller;
const WXBizDataCrypt = require('../util/WXBizDataCrypt');
const {
  AppID,
} = require('../config/basic.config');

class UserController extends Controller {
  async index() {
    this.ctx.body = this.ctx.service.user.find();
  }
  async create() {
    const ctx = this.ctx;
    if (ctx.request.body.code) {
      const data = await ctx.service.wxapp.getSession(ctx.request.body.code);
      if (!data.openid || !data.session_key || data.errcode) {
        return {
          result: -2,
          message: data.errmsg || '返回数据字段不完整',
        };
      }
      const pc = new WXBizDataCrypt(AppID, data.session_key);
      const result = pc.decryptData(ctx.request.body.encryptedData, ctx.request.body.iv);
      await ctx.service.user.create(result);
    }
    // await ctx.service.user.create(ctx.request.body);
    return 1;
  }
}

module.exports = UserController;
