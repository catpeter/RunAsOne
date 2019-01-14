'use strict';

const Controller = require('egg').Controller;
const prefix = 'User';
class UserController extends Controller {
  async info() {
    const { ctx } = this;
    // console.log(ctx);
    // const userId = ctx.params.id;
    const userInfo = await ctx.service.base.find(prefix);
    ctx.body = userInfo;
  }
}
module.exports = UserController;

