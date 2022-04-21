'use strict';

const Controller = require('egg').Controller;
/**
 * @Controller user
 */
class HomeController extends Controller {
  async index() {
    // const user=await this.app.redis.get('user')
    // console.log(JSON.parse(user));
    const { ctx } = this;
    const res=await ctx.service.home.list()
    ctx.body = res;
  }
  /**
   * @summary 获取文章列表
   * @description 分页获取文章列表
   * @router get /find
   * @request query integer curPage 页码 默认 1
   * @request query integer pageSize 单页数量 默认 20
   * @response 200 JsonBody
   */
  async find(){
    const { ctx } = this;
    const userId = ctx.query.id;
    const res=await ctx.service.home.find(userId)
    ctx.body = res;
  }
  
  async sequelizeIndex(){
    const { ctx } = this;
    const res=await ctx.service.home.sequelizeIndex()
    ctx.body = res;
  }
}

module.exports = HomeController;
