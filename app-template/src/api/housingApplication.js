import request from '@/api/request'
// console.log(request);

// export const api = (data) => {
//     console.log(request);
//     return request.get(
//         '/ebapi/public_api/index1', data
//     )
// }

// 地区列表
export function getUserPro(data) {
    return request.get('/system/district/getProvinceTrees', data)
}
// 建房申请
export function JFSQaddApplyInfo(data) {
    return request.post('/proBuildingApplyInfo/startBuildingAct', data)
}

// 流转申请
export function LZSQaddApplyInfo(data) {
    return request.post('/system/proOverInfo', data)
}
// 交易申请
export function JYSQaddApplyInfo(data) {
    return request.post('/system/proTransactionApplyInfo', data)
}
// 流转上传文件
export function uploadFiles(data,type) {
    return request.post('/proUploadfile/upload', data, {
        'Content-Type': type
    })
}