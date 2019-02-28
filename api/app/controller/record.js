'use strict';
const Controller = require('egg').Controller;

class recordController extends Controller {
  async index() {
    const ctx = this.ctx;
    await ctx.service.record.index(ctx.query);
  }
  async show() {
    const ctx = this.ctx;
    await ctx.service.record.show(ctx.params.id);
  }

  async create() {
    const ctx = this.ctx;
    ctx.service.activity.update(ctx.request.body.activity, {
      appNum: ctx.request.body.appNum,
    });
    delete ctx.request.body.appNum;
    await ctx.service.record.create(ctx.request.body);
  }

  async update() {
    const ctx = this.ctx;
    await ctx.service.record.update(ctx.params.id, ctx.request.body);
  }
  async destroy() {
    const ctx = this.ctx;
    ctx.service.activity.update(ctx.request.body.activity, {
      appNum: ctx.request.body.appNum,
    });
    await ctx.service.record.destroy(ctx.params.id, ctx.request.body);
  }
}

module.exports = recordController;
