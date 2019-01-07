'use strict';
exports.find = async (model, query, populate = '', sort = { createTime: -1 }) => {
  const modelEntity = require(`../models/${model}Entity`);
  return await modelEntity.find(query).populate(populate).sort(sort);
};

exports.findOne = async (model, query, populate = '') => {
  const modelEntity = require(`../models/${model}Entity`);
  return modelEntity.findOne(query).populate(populate);
};

exports.add = async (model, body) => {
  const modelEntity = require(`../models/${model}Entity`);
  return modelEntity.create(body);
};

exports.insertMany = async (model, documents) => {
  const modelEntity = require(`../models/${model}Entity`);
  return modelEntity.insertMany(documents);
};

exports.update = async (model, filter, body) => {
  const modelEntity = require(`../models/${model}Entity`);
  return modelEntity.update(filter, body);
};

exports.findOneAndUpdate = async (model, filter, body, options = { new: true }) => {
  const modelEntity = require(`../models/${model}Entity`);
  return modelEntity.findOneAndUpdate(filter, body, options);
};

exports.delete = async (model, filter) => {
  const modelEntity = require(`../models/${model}Entity`);
  return modelEntity.remove(filter);
};

exports.query = async (model, query) => {
  if (query.page) {
    return exports.pageQuery(model, query.params, query.page, query.populate);
  }
  return exports.find(model, query.params, query.populate);

};

exports.pageQuery = async (model, params, page = { pageSize: 10, pageIndex: 1, sort: '_id' }, populate = '') => {
  const Model = require(`../models/${model}Entity`);
  const start = (page.pageIndex - 1) * page.pageSize;
  const [ count, records ] = await Promise.all([
    // 查询数量
    Model.countDocuments(params),
    // 查询一页的记录
    Model.find(params)
      .skip(start)
      .limit(page.pageSize)
      .populate(populate)
      .sort(page.sort),
  ]);
  const totalPages = parseInt(count / page.pageSize) + ((count % page.pageSize !== 0) ? 1 : 0);
  return {
    pageNumber: page.pageIndex,
    pageCount: Math.ceil(count / page.pageSize),
    totalCount: count,
    totalPages,
    results: records,
  };
};

exports.pageQuery2 = async (model, params, pagination = { page: 0, size: 10, sort: '_id' }, populate = '') => {
  const Model = require(`../models/${model}Entity`);
  pagination.page = parseInt(pagination.page);
  pagination.size = parseInt(pagination.size);
  const start = (pagination.page) * pagination.size;
  const [ count, records ] = await Promise.all([
    // 查询数量
    Model.countDocuments(params),
    // 查询一页的记录
    Model.find(params)
      .skip(start)
      .limit(pagination.size)
      .populate(populate)
      .sort(pagination.sort),
  ]);
  const isLast = (count - (start + records.length)) <= 0;
  const totalPages = parseInt(count / pagination.size) + ((count % pagination.size !== 0) ? 1 : 0);
  return {
    pagination: {
      isFirstPage: pagination.page === 0, // 是否是开头页,
      isLastPage: isLast, // 是否是最后一页
      totalPages, // 所有页数
      totalElements: count, // 所有个数
      page: pagination.page, // 当前是第多少页
      size: pagination.size, // 每页大小
      number: records.length, // 当前页数量
    },
    results: records,
  };
};
