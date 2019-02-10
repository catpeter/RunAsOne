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
      await ctx.service.wxapp.getSession(ctx.request.body.code);
      const data = ctx.body.data;
      if (!data.openid || !data.session_key || data.errcode) {
        return {
          result: -2,
          message: data.errmsg || '返回数据字段不完整',
        };
      }
      console.log('data: ', data);
      const pc = new WXBizDataCrypt(AppID, data.session_key);
      const result = pc.decryptData(ctx.request.body.encryptedData, ctx.request.body.iv);
      console.log('解密后 data: ', result);
    }
    // await ctx.service.user.create(ctx.request.body);
    return 1;
  }
}

module.exports = UserController;
