'use strict';
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchema = new Schema({
    name: {
      type: String,
    },
    tel: {
      type: Number,
    },
    type: {
      type: Number, // 0 super 1 admin 2 ordinary
      require: true,
    },
  });
  return mongoose.model('User', UserSchema, 'users');
};
