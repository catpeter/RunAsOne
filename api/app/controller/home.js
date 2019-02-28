'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const ctx = this.ctx;
    if (ctx.params.jscode) {
      const data = await ctx.service.wxapp.getSession(ctx.params.jscode);
      if (!data.openid || !data.session_key || data.errcode) {
        ctx.body = {
          result: -2,
          message: data.errmsg || '返回数据字段不完整',
        };
      } else {
        const person = await ctx.service.user.getUser(data.openid);
      }
    }
    this.ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
