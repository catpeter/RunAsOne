'use strict';
const basicConfig = require('../config/basic.config');
const FdfsClient = require('fdfs');
const fdfs = new FdfsClient({
  // trackers servers
  trackers: basicConfig.fdfsTrackers,
  timeout: 10000,
  defaultExt: 'jpg',
  charset: 'utf8',
});
module.exports = fdfs;
