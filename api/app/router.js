'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller,
  } = app;
  router.post('/api/user', controller.user.create);
  // router.get('/user', controller.user.index);
  router.resources('record', '/api/record', controller.record);
  router.resources('activity', '/api/activity', controller.activity);
  // router.get('/api/activity/:id', controller.activity.show);
  // router.get('/api/activity', controller.activity.find);
  // router.post('/api/activity', controller.activity.create);
  // router.put('/api/activity/:_id', controller.activity.update);
  // router.post('/api/record', controller.record.create);
  router.get('/api/index/:jscode', controller.home.index);
  // router.get('/activity/:query', controller.activity.find);
  // router.resources('activity', '/api/activity', controller.activity);
  // router.post('/activity', controller.activity.index);
};
