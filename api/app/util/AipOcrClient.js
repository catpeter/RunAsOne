'use strict';
const AipOcrClient = require('baidu-aip-sdk').ocr;

// 设置APPID/AK/SK
const APP_ID = '15909087';
const API_KEY = 'GCQsjdkjs9GMGqPzMZToMKbp';
const SECRET_KEY = 'gGBtGYWNv40guEfvwC8bvhEqlEGIaMH0';

// 新建一个对象，建议只保存一个对象调用服务接口
module.exports = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);

