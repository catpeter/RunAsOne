'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller,
  } = app;
  router.get('/', controller.home.index);
  router.get('/user', controller.user.index);

  router.get('/api/activity', controller.activity.find);
  router.post('/api/activity', controller.activity.create);
  router.put('/api/activity/:_id', controller.activity.update);
  // router.get('/activity/:query', controller.activity.find);
  // router.resources('activity', '/api/activity', controller.activity);
  // router.post('/activity', controller.activity.index);
};
