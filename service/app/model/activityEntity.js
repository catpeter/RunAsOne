'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ActivitySchema = new Schema({
    createTime: { // 记录创建时间
      type: Date,
      default: Date.now,
    },
    activityName: {
      type: String, // 活动名称
      required: true,
    },
    sponsor: { // 活动发起人
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    deadLine: { // 报名截止时间
      type: String,
      required: true,
    },
    address: { // 活动地址
      type: mongoose.Schema.Types.Mixed,
    },
    remark: { // 备注
      type: String,
    },
    activityType: {
      type: Number, // 活动类型 0：跑步，1：娱乐，2：其他
      required: true,
    },
    activityDate: { // 活动日期
      type: String,
      required: true,
    },
    status: { // 活动状态， 0 报名中， 1 已结束
      type: Number,
      default: 0,
      required: true,
    },
    deleted: {
      type: Boolean, // 删除标识 true：已删除，false：未删除
      default: false,
      required: true,
    },
  });
  return mongoose.model('Activity', ActivitySchema, 'activities');
};
