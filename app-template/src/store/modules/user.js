import { login, logout, getInfo, WXquickLogin } from '@/api/login'
import { getToken, setToken, removeToken } from '@/common/auth'

const user = {
    state: {
        token: getToken(),
        name: '',
        nickName: '',
        avatar: '',
        roles: [],
        phonenumber: ""
        // permissions: []
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_NICK_NAME: (state, nickName) => {
            state.nickName = nickName
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_PHONENUMBER: (state, phonenumber) => {
            state.phonenumber = phonenumber
        },
        // SET_PERMISSIONS: (state, permissions) => {
        //   state.permissions = permissions
        // }
    },

    actions: {
        // 登录
        Login({ commit }, userInfo) {
            const username = userInfo.username.trim()
            const password = userInfo.password
            const code = userInfo.code
            const uuid = userInfo.uuid
            const openCode = userInfo.openCode
            return new Promise((resolve, reject) => {
                login(username, password, code, uuid, openCode).then(res => {
                    setToken(res.token)
                    commit('SET_TOKEN', res.token)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 登录
        wxLogin({ commit }, code) {
            return new Promise((resolve, reject) => {
                WXquickLogin(code).then(res => {
                    setToken(res.token)
                    commit('SET_TOKEN', res.token)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },


        // 获取用户信息
        GetInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getInfo(state.token).then(res => {
                    const user = res.user
                    const avatar = user.avatar ? (user.avatar.substr(0, 4) == "http" ? user.avatar : "http://192.168.10.178:8070" + user.avatar) : "";
                    if (res.roles && res.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                        commit('SET_ROLES', res.roles)
                        // commit('SET_PERMISSIONS', res.permissions)
                    } else {
                        commit('SET_ROLES', ['ROLE_DEFAULT'])
                    }
                    commit('SET_NAME', user.userName)
                    commit('SET_NICK_NAME', user.nickName)
                    commit('SET_PHONENUMBER', user.phonenumber)
                    commit('SET_AVATAR', avatar)
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 退出系统
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_NAME', '')
                    commit('SET_PHONENUMBER', '')
                    commit('SET_NICK_NAME', '')
                    commit('SET_AVATAR', '')
                    commit('SET_ROLES', [])
                    // commit('SET_PERMISSIONS', [])
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        }
    }
}

export default user