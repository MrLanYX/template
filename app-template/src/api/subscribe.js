import request from '@/api/request'

// 用户列表
export function searchList(data) {
    return request.get('/proBuildingApplyInfo/list',data)
}
// 丈量批放预约 & 竣工验收预约
export function addApply(data) {
    return request.post('/proAttendanceApply',data)
}
// // 用户列表
// export function searchList(data) {
//     return request.get('/proBuildingApplyInfo/list',data)
// }