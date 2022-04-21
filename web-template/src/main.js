import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import store from './store'
import router from './router/router'
// import ElementResizeDetectorMaker from "element-resize-detector";
import { iconfontUrl, iconfontVersion } from './common/iconfont'
import { loadStyle } from './common/util'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/common.scss'

Vue.use(ElementUI, {
  size: 'small',
  menuType: 'text'
})
Vue.use(router);
iconfontVersion.forEach(ele => {
  console.log(iconfontUrl.replace('$key', ele))
  loadStyle(iconfontUrl.replace('$key', ele))
})

Vue.prototype.$EventBus = new Vue()
// Vue.prototype.$erd = ElementResizeDetectorMaker()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
