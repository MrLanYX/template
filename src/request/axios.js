import axios from 'axios'
import store from "@/store";

// 超时
axios.defaults.timeout = 40000
// 返回其他状态吗
axios.defaults.validateStatus = function(status) {
    return status >= 200 && status <= 500 // 默认的
}
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true

// HTTPrequest拦截
axios.interceptors.request.use(config => {
    const isToken = (config.headers || {}).isToken === false
    let token = store.getters.token
    if (token && !isToken) {
        config.headers['Authorization'] = 'Bearer ' + token // token
    }
    return config
}, error => {
    return Promise.reject(error)
})

// HTTPresponse拦截
axios.interceptors.response.use(res => {
    const status = Number(res.status) || 200
    const message = res.data.msg || errorCode[status] || errorCode['default']
    if (status === 401) {
        store.dispatch('LogOut').then(() => {
            router.push({ path: '/index' })
        })
        return
    }

    if (status !== 200 || res.data.code === 1) {
        Message({
            message: message,
            type: 'error'
        })
        return Promise.reject(new Error(message))
    }

    return res
}, error => {
    return Promise.reject(new Error(error))
})

export default axios