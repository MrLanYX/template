'use strict';

const Service = require('egg').Service;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class HomeService extends Service {
  async list() {
    const list =await this.app.mysql.select('sys_user');
    return {list}
  }
  async find(userId) {
    const info =await this.app.mysql.get('sys_user',{user_id:userId});
    return {info}
  }

  async sequelizeIndex(){
    const list =await this.ctx.model.Home.findByPk(toInt("1"));
    return {list}
  }
}

module.exports = HomeService;
