import request from '@/api/request'

// 下载列表
export function lists() {
    return request.get('/workhall/download/list')
}
// 
// export function addApply(data) {
//     return request.post('/proAttendanceApply',data)
// }