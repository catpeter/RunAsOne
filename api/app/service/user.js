'use strict';
const {
  serviceHost,
} = require('../config/basic.config');
const Service = require('egg').Service;
class UserService extends Service {
  async find() {
    const ctx = this.ctx;

    const result = await ctx.curl(serviceHost + 'user', {
      // 必须指定 method
      method: 'GET',
      dataType: 'json',
    });
    console.log('result');
    console.log(result);
    ctx.body = result.data;
  }
}

module.exports = UserService;
