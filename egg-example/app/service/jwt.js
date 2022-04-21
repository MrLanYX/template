'use strict';

const Service = require('egg').Service;

class HomeService extends Service {
    async get() {
        const info = this.ctx.state.user
        return { info }
    }
}

module.exports = HomeService;