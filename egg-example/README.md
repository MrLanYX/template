# example

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.

## egg

- 作为孵化工具本身只有接口请求、返回数据等基本功能
- 需要业务操作、连接数据库等操作需要安装插件
- 插件社区也就是egg强大的地方

### 插件 MySQL

- 简单配置就能使用自带的查询、更新等方法调用数据库

### 插件 sequelize

- 主流数据库的一键连接插件
- 支持 MySQL、PostgreSQL、SQLite 和 MSSQL 等多个数据源

### 插件 sequelize-cli

- 使用 sequelize-cli 来初始化数据库 简化数据库的迭代操作
- 用js代码 管理数据库字段

### 插件 validate

- egg的参数校验插件
- 参数不符合规范会返回422异常

### 插件 egg-router-plusus

- egg的router加强工具
- 更为方便的管理接口地址

### 插件 redis

- 存储中间数据
- 减少数据库查询时间
- 常用于用户信息查询、路由查询等频繁请求（用户每次刷新都要获取）不怎么修改的数据

### 插件 jwt

- 把用户信息生成token
- 接口鉴权拦截
- token反解出用户信息以便使用

### 插件 swagger

- 接口生成swagger-UI方便使用