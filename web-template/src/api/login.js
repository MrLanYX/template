import request from '@/request/axios'

export function login(data) {
    return new Promise((resolve, reject) => {
        if (data.phone == "admin" && data.password == "123456") {
            resolve({ token: "token" })
        } else {
            reject({ status: 401 })
        }
    })
    return request({
        url: '/api/login',
        method: 'get',
        data: data
    })
}
export function logout() {
    return request({
        url: '/',
        method: 'get',
        data: data
    })
}
export function getInfo() {
    return request({
        url: '/',
        method: 'get',
        data: data
    })
}