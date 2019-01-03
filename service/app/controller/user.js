'use strict';

const Controller = require('egg').Controller;
class UserController extends Controller {
  async info() {
    const { ctx } = this;
    // console.log(ctx);
    // const userId = ctx.params.id;
    const userInfo = await ctx.service.user.find();
    ctx.body = userInfo;
  }
}
module.exports = UserController;

