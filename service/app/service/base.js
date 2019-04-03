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
  /**
   *
   * @param {*} Model
   * @param {*} params
   * @param {*} page {
   *   @param {*} pageIndex: 1
   *   @param {*} pageSize: 10
   * }
   * @param {*} sort
   * @param {*} populate
   */
  async pageQuery(model, filter, pagination = {
    page: 0,
    size: 10,
  }, sort = '_id', populate = '') {
    const Model = require(`../models/${model}Entity`)
    pagination.page = parseInt(pagination.page)
    pagination.size = parseInt(pagination.size)
    var start = (pagination.page) * pagination.size
    const [count, records] = await Promise.all([
      // 查询数量
      Model.countDocuments(filter),
      // 查询一页的记录
      Model.find(filter)
      .skip(start)
      .limit(pagination.size)
      .populate(populate)
      .sort(sort)
    ])
    let isLast = (count - (start + records.length)) <= 0
    let totalPages = parseInt(count / pagination.size) + ((count % pagination.size !== 0) ? 1 : 0)
    return {
      pagination: {
        isFirstPage: pagination.page === 0, // 是否是开头页,
        isLastPage: isLast, // 是否是最后一页
        totalPages: totalPages, // 所有页数
        totalElements: count, // 所有个数
        page: pagination.page, // 当前是第多少页
        size: pagination.size, // 每页大小
        number: records.length // 当前页数量
      },
      results: records
    }
  }
}

module.exports = BaseService;
