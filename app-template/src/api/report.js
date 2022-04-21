import request from '@/api/request'

// 下载列表
export function addReport(data, type) {
    return request.post('/complaint/report', data, {
        'Content-Type': type
    })
}