import request from '@/api/request'

// 字典接口
export function getDicts(data) {
    return request.get('/system/dict/data/type/'+data)
}
// 所有地区
export function getProvinceTrees() {
    return request.get('/system/district/getProvinceTrees')
}