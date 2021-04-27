/**
 * 配置该文件可以参考:
 * https://cli.vuejs.org/zh/config/#%E7%9B%AE%E6%A0%87%E6%B5%8F%E8%A7%88%E5%99%A8
 *
 */
const url = 'http://gclc-3dearth:8888'
// 基础路径，发布前修改这里,当前配置打包出来的资源都是相对路径
let publicPath = './'
module.exports = {
    publicPath: publicPath,
    lintOnSave: true,
    productionSourceMap: false,
    // 配置转发代理
    devServer: {
        host: '0.0.0.0',
        port: 9999,
        proxy: {
            '/': {
                target: url,
                ws: true,
                pathRewrite: {
                    '^/': '/'
                }
            },
        }
    },
}