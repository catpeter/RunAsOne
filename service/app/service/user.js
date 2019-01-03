'use strict';
const Service = require('egg').Service;
class UserService extends Service {
  // 获取所有文章
  async find() {
    // 这里需要注意： 只有安装了 mongoose 后， model 才会挂载到 this.ctx 上。
    return this.ctx.model.User.find().sort({
      _id: -1,
    }).exec();
  }
}

module.exports = UserService;

