import request from '@/api/request'
import { encryptASE, decryptASE } from '@/common/jsencrypt'
// console.log(request);

// export const api = (data) => {
//     console.log(request);
//     return request.get(
//         '/ebapi/public_api/index1', data
//     )
// }

// 登录方法
export function login(username, password, code, uuid, openCode) {
    let data = {
        username,
        password,
        code,
        uuid,
        openCode,
    }
    data = encryptASE({
        data: data,
        key: "thanks,pig4cloud",
        param: ["username"]
    })
    data = encryptASE({
        data: data,
        key: "thanks,pig4cloud",
        param: ["password"]
    })
    return request.post('/login', data)
}

// 获取用户详细信息
export function getInfo(data) {
    return request.get('/getInfo', data)
}

// 退出方法
export function logout() {
    return request.post('/logout')
}

// 获取验证码
export function getCodeImg() {
    return request.get('/captchaImage')
}

//校验电话号码唯一性,true：唯一；false：不唯一
export function checkPhoneCode(code) {
    return request.get("/register/checkPhoneUniqueness/" + code, );
}

//发送手机验证码
export function generateCode(code) {
    return request.get("/register/generateCaptcha/" + code);
}

//校验身份证号是否唯一
export function checkID(code) {
    return request.get("/register/checkIdCodeUniqueness/" + code);
}

//注册
export function register(obj) {
    return request.post("/register", obj);
}

//手机验证码修改密码
export function changePasswordApp(obj) {
    return request.post("/system/user/profile/updateAppPwd", obj);
}

// 快速登入
export function WXquickLogin(code) {
    return request.get("/wxlogin/" + code);
}