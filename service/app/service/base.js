'use strict';
const Service = require('egg').Service;
const mongoose = require('mongoose');
class BaseService extends Service {
  async find(modelName, query, populate = '', sort = { createTime: -1 }) {
    // 这里需要注意： 只有安装了 mongoose 后， model 才会挂载到 this.ctx 上。
    return this.ctx.model[modelName + 'Entity'].find(query).populate(populate).sort(sort)
      .exec();
  }
  async add(modelName, body) {
    return this.ctx.model[modelName + 'Entity'].create(body);
  }
  async update(modelName, filter, body) {
    if (filter.id) {
      filter._id = mongoose.Types.ObjectId(filter.id);
      delete filter.id;
    }
    return this.ctx.model[modelName + 'Entity'].update(filter, body);
  }
}

module.exports = BaseService;
