'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async set() {
    const { ctx , app } = this;
    const query=ctx.query
    const res=app.jwt.sign(query, app.config.jwt.secret)
    ctx.body = res;
  }
  async get(){
    const { ctx } = this;
    // const res=await ctx.service.jwt.get()
    const res=ctx.state.user
    ctx.body = res;
  }
}

module.exports = HomeController;
