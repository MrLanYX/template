const TokenKey = 'uni_id_token'

export function getToken() {
    return uni.getStorageSync(TokenKey);
}

export function setToken(token) {
    return uni.setStorageSync(TokenKey, token);
}

export function removeToken() {
    return uni.removeStorageSync(TokenKey);
}