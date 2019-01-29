'use strict';
const {
  serviceHost,
} = require('../config/basic.config');
const prefix = 'service/activity';
const Httpclient = require('../util/request');
const Service = require('egg').Service;
class ActivityService extends Service {
  async find(query) {
    const ctx = this.ctx;
    const result = await Httpclient.get(ctx, serviceHost + prefix, query);
    ctx.body = result.data;
  }
  async show(id) {
    const ctx = this.ctx;
    const result = await Httpclient.get(ctx, serviceHost + prefix + '/' + id);
    ctx.body = result.data;
  }
  async create(body) {
    const ctx = this.ctx;
    const result = await Httpclient.post(ctx, serviceHost + prefix, body);
    console.log(result);
    ctx.body = result.data;
  }
  async update(_id, body) {
    const ctx = this.ctx;
    const result = await Httpclient.put(ctx, serviceHost + prefix + `/${_id}`, body);
    console.log(result);
    ctx.body = result.data;
  }
}

module.exports = ActivityService;