const getters = {
    token: state => state.user.token,
    name: state => state.user.name,
    apiPrefix: state => state.settings.apiPrefix,
    apiPath: state => state.settings.apiPath,
}
export default getters