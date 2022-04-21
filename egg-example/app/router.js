'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller,jwt  } = app;

  // 普通mysql操控
  router.get('/', controller.home.index);
  router.get('/find', controller.home.find);

  // 通过sequelize插件初始化数据库操控数据库
  router.get('/sequelize', controller.home.sequelizeIndex);

  // 利用 validate 实现 RESTful API 快速接口规范
  app.router.resources('topics', '/api/v1/topics', app.controller.topics);
  // 目前来看并不是很喜欢这种接口方式
  // 后续应该会采用 egg-router-plus 嵌套接口的方式来管理请求
  // 两种管理方式配合使用（推荐）
  const apiRouter = app.router.namespace('/api');
  apiRouter.get('/list', controller.home.index);
  
  // 鉴权管理
  router.get('/set',controller.jwt.set)
  router.get('/get',jwt ,controller.jwt.get)
};
