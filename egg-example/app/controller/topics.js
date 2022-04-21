const Controller = require('egg').Controller;

// 定义创建接口的请求参数规则
const createRule = {
    title: 'string',
};

class TopicController extends Controller {
    async index(){
        const ctx = this.ctx;
        console.log("index");
        ctx.body = {
            topic_id: "index",
        };
    }
    async create() {
        const ctx = this.ctx;
        // 校验 `ctx.request.body` 是否符合我们预期的格式
        // 如果参数校验未通过，将会抛出一个 status = 422 的异常
        console.log(ctx.request.query);
        ctx.validate(createRule, ctx.request.query);
        // 调用 service 创建一个 topic
        const id = await ctx.service.topics.create(ctx.request.body);
        // 设置响应体和状态码
        ctx.body = {
            topic_id: id,
        };
        ctx.status = 201;
    }
}
module.exports = TopicController;