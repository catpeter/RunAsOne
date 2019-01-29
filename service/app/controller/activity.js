'use strict';
const Controller = require('egg').Controller;
const prefix = 'Activity';
class ActivityController extends Controller {
  async index() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.base.find(prefix, ctx.query);
  }
  async create() {
    const ctx = this.ctx;
    if (ctx.request.body.address) {
      ctx.request.body.address = JSON.parse(ctx.request.body.address);
    }
    ctx.body = await ctx.service.base.add(prefix, ctx.request.body);
  }
  async update() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.base.update(prefix, ctx.params, ctx.request.body);
  }
  async show() {
    const ctx = this.ctx;
    const populate = 'sponsor';
    ctx.body = await ctx.service.base.findOne(prefix, ctx.params.id, populate);
  }
}
module.exports = ActivityController;
