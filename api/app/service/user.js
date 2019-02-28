'use strict';
const {
  serviceHost,
} = require('../config/basic.config');
const prefix = 'service/user';
const Httpclient = require('../util/request');
const Service = require('egg').Service;
class UserService extends Service {
  async find() {
    const ctx = this.ctx;

    const result = await ctx.curl(serviceHost + 'user', {
      // 必须指定 method
      method: 'GET',
      dataType: 'json',
    });
    ctx.body = result.data;
  }
  async create(body) {
    const ctx = this.ctx;
    const result = await Httpclient.post(ctx, serviceHost + prefix, body);
    ctx.body = result.data;
  }
}

module.exports = UserService;
