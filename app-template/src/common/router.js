// router.js
import { RouterMount, createRouter } from 'uni-simple-router';
import Vue from 'vue'

const router = createRouter({
    platform: process.env.VUE_APP_PLATFORM,
    routes: [...ROUTES]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
    next();
});
// 全局路由后置守卫
router.afterEach((to, from) => {
    console.log(to);
    let uniIdToken = uni.getStorageSync('uni_id_token')
    if (uniIdToken) {
        console.log("have token");
    } else {
        if (to.path == '/pages/account/login' || to.fullPath == '/pages/account/reg-pwd?type=pwd' || to.fullPath == '/pages/account/reg-pwd?type=reg') {
            console.log("不弹窗");
        } else {
            uni.showModal({
                title: '未登录',
                content: '您需要登录后才能继续',
                showCancel: !Vue.prototype.$store.getters.forcedLogin,
                success: (res) => {
                    console.log(to.path);
                    if (res.confirm) {
                        uni.reLaunch({
                            url: '/pages/account/login'
                        })
                        // Vue.prototype.$u.route('/pages/account/login')
                    }
                }
            });
        }
    }
    console.log('跳转结束')
})

export {
    router,
    RouterMount
}