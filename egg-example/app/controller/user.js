'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async info() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.user.list();
  }

}

module.exports = UserController;
