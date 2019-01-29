'use strict';
const Service = require('egg').Service;
const mongoose = require('mongoose');
class BaseService extends Service {
  async find(modelName, query) {
    // 这里需要注意： 只有安装了 mongoose 后， model 才会挂载到 this.ctx 上。
    let populate = '';
    let sort = {
      createTime: -1,
    };
    if (query.populate) {
      populate = query.populate;
      delete query.populate;
    }
    if (query.sort) {
      sort = query.sort;
      delete query.sort;
    }
    return this.ctx.model[modelName + 'Entity'].find(query).populate(populate).sort(sort)
      .exec();
  }
  async findOne(modelName, id, populate = '') {
    // 这里需要注意： 只有安装了 mongoose 后， model 才会挂载到 this.ctx 上。
    return this.ctx.model[modelName + 'Entity'].findOne({
      _id: id,
    }).populate(populate)
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
