'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1546494164363_1588';

  // add your config here
  config.middleware = [];

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/RunAsOne',
      options: {
        auth: {
          authSource: 'admin',
        },
        user: 'root',
        pass: 'root',
      },
    },
  };

  return config;
};
