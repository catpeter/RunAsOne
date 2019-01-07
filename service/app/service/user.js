'use strict';
const Service = require('egg').Service;
class UserService extends Service {
  // 获取所有文章
  async find(query, populate = '', sort = { createTime: -1 }) {
    // 这里需要注意： 只有安装了 mongoose 后， model 才会挂载到 this.ctx 上。
    return this.ctx.model.User.find(query).populate(populate).sort(sort)
      .exec();
  }
  async add(body) {
    this.ctx.model.User.create(body);
  }
  async update(filter, body) {
    this.ctx.model.User.update(filter, body);
  }
}

module.exports = UserService;
