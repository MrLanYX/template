import request from '@/api/request'

// 公示公告
export function GGlists(data) {
    return request.get('/proApplyPublicityInfo/list', data)
}
// 根据id查详情
export function proApplyPublicityInfo(id) {
    return request.get('/proApplyPublicityInfo/' + id)
}


// 政策法规
export function FGlists(data) {
    return request.get('/system/notice/list', data)
}
// 根据id查详情
export function FGlistsInfo(id) {
    return request.get('/system/notice/' + id)
}


// 根据id查详情
export function getImage() {
    return request.get('/system/notice/getImage')
}