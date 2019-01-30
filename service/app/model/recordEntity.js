'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const RecordSchema = new Schema({
    createTime: { // 记录创建时间
      type: Date,
      default: Date.now,
    },
    applicant: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    activity: {
      type: mongoose.Schema.ObjectId,
      ref: 'Activity',
    },
    deleted: {
      type: Boolean, // 删除标识 true：已删除，false：未删除
      default: false,
      required: true,
    },
  });
  return mongoose.model('Record', RecordSchema, 'records');
};
