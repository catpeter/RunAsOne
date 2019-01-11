'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1546494164363_1588';

  // add your config here
  config.middleware = [];

  config.mongoose = {
    client: {
      url: 'mongodb://207.246.99.183:27017/RunAsOne',
      options: {
        user: 'root',
        pass: 'pyw123',
      },
    },
  };

  return config;
};
