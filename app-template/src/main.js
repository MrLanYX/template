import Vue from 'vue'
import App from './App'

import store from './store'
import { getDicts } from '@/api/index'

// 引入uview相关
import 'uview-ui/theme.scss'
import 'uview-ui/index.scss'
import uView from "uview-ui"
Vue.use(uView);

import { router, RouterMount } from '@/common/router.js' //路径换成自己的
Vue.use(router)

Vue.config.productionTip = false
Vue.prototype.$getDicts = getDicts

// Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
    ...App,
    store
})
//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app, router, '#app')
// #endif

// http拦截器，此为需要加入的内容，如果不是写在common目录，请自行修改引入路径
import httpInterceptor from '@/common/http.interceptor.js'
// 这里需要写在最后，是为了等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
Vue.use(httpInterceptor, app)

app.$mount()