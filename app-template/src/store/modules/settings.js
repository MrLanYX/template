const state = {
    forcedLogin: true,
    apiPath:"http://127.0.0.1:8080"
}

const mutations = {
    SET_FORCEDLOGIN: (state, forcedLogin) => {
        state.forcedLogin = forcedLogin
    },
}

const actions = {
    changeForcedLogin({ commit }, data) {
        commit('SET_FORCEDLOGIN', data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}