import request from '@/api/request'

// 列表
export function lists(data) {
    return request.get('/proBuildingApplyInfo/getBuildingTaskList', data)
}
// 进度查看
export function speed(data, type) {
    return request.post('/process/listHistory', data, type)
}