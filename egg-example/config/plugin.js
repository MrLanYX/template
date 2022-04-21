'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  // 插件：mysql --数据库连接操控插件
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  // 插件：sequelize --多数据源集成插件 包含了sequelize-cli数据库迁移管理工具
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  // 插件：validate --校验接受数据的工具
  validate : {
    enable: true,
    package: 'egg-validate',
  },
  // 插件：routerPlus --路由加强版，个人目前最喜欢的接口管理插件
  routerPlus : {
    enable: true,
    package: 'egg-router-plus',
  },
  // 插件：redis
  redis : {
    enable: false,
    package: 'egg-redis',
  },
  // 插件：jwt
  jwt: {
    enable: true,
    package: "egg-jwt"
  },
  // 插件：swagger
  swaggerdoc : {
    enable: true,
    package: "egg-swagger-doc"
  },
};
