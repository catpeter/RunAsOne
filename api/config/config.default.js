'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1546485793792_6219';

  // add your config here
  config.middleware = [];
  config.security = {
    csrf: {
      enable: false,
    },
  };

  return config;
};
