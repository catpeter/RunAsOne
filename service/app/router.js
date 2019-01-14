'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/user', controller.user.info);
  router.resources('activity', '/service/activity', controller.activity);
  // router.get('/activity', controller.activity.find);
  // router.post('/activity', controller.activity.add);
  // router.put('/activity/:id', controller.activity.update);
};
