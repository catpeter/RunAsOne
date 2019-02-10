'use strict';
const {
  AppID,
  AppSecret,
} = require('../config/basic.config');
const Service = require('egg').Service;
class WxappService extends Service {
  async getSession(jsCode) {
    const ctx = this.ctx;

    const result = await ctx.curl(`https://api.weixin.qq.com/sns/jscode2session?appid=${AppID}&secret=${AppSecret}&js_code=${jsCode}&grant_type=authorization_code`, {
      // 必须指定 method
      method: 'GET',
      dataType: 'json',
    });
    return result.data;
  }
}

module.exports = WxappService;
