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
  });
  return mongoose.model('Record', RecordSchema, 'records');
};
