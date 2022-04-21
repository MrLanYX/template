const state = {
    apiPrefix:"api",
    apiPath:"http://192.168.1.1:8080"
}

const mutations = {
    SET_APIPREFIX: (state, apiPrefix) => {
        state.apiPrefix = apiPrefix
    },
}

const actions = {
    changeApiPrefix({ commit }, data) {
        commit('SET_APIPREFIX', data)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}