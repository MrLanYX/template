// 拉取依赖
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// push跳转 promise uncaught异常 解决方法
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}
// 引入所需文件
import index from '@/pages/index.vue';
import login from '@/pages/login.vue';

export default new VueRouter({
    routes: [{
        path: '/',
        name: '',
        redirect: '/index',
        children: []
    }, {
        path: '/index',
        name: 'index',
        component: index,
        children: []
    }, {
        path: '/login',
        name: 'login',
        component: login,
        children: []
    }]
})