import request from '@/api/request'

// 下载列表
export function list(data) {
    return request.get('/workhall/problem/list',data)
}