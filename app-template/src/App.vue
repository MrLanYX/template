<script>
    import {
        mapGetters,
        mapMutations
    } from 'vuex'

    export default {
        computed: {
            ...mapGetters(['token']),
        },
        onLaunch: function() {
            console.log('App Launch');
            if (this.token) {
                this.$store.dispatch("GetInfo").then(res => {}).catch(res => {})
            }
        },
        onShow: function() {
            console.log('App Show');
        },
        onHide: function() {
            console.log('App Hide');
        },
        methods: {}
    }
</script>

<style lang="scss">
    /* 头条小程序需要把 iconfont 样式放到组件外 */
    // @import "components/m-icon/m-icon.css";

    @import "uview-ui/theme.scss";
    @import "uview-ui/index.scss";

    /*每个页面公共css */
    page {
        min-height: 100%;
        display: flex;
        font-size: 14px;
    }

    input,
    textarea,
    button {
        font-size: 14px;
    }

    /* #ifdef MP-BAIDU */
    page {
        width: 100%;
        height: 100%;
        display: block;
    }

    swan-template {
        width: 100%;
        min-height: 100%;
        display: flex;
    }

    /* 原生组件模式下需要注意组件外部样式 */
    custom-component {
        width: 100%;
        min-height: 100%;
        display: flex;
    }

    /* #endif */

    /* #ifdef MP-ALIPAY */
    page {
        min-height: 100vh;
    }

    /* #endif */

    /* 原生组件模式下需要注意组件外部样式 */
    m-input {
        width: 100%;
        /* min-height: 100%; */
        display: flex;
        flex: 1;
    }

    .content {
        display: flex;
        flex: 1;
        flex-direction: column;
        // background-color: #efeff4;
        background-color: #fff;
        padding: 10px;
        margin-bottom: 20rpx;
    }

    .input-group {
        background-color: #ffffff;
        margin-top: 20px;
        position: relative;
    }

    .input-group::before {
        position: absolute;
        right: 0;
        top: 0;
        left: 0;
        height: 1px;
        content: '';
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
        background-color: #c8c7cc;
    }

    .input-group::after {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 1px;
        content: '';
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
        background-color: #c8c7cc;
    }

    .input-row {
        display: flex;
        flex-direction: row;
        position: relative;
        /* font-size: 18px; */
        height: 40px;
        line-height: 40px;
    }

    .input-row .title {
        width: 70px;
        padding-left: 15px;
    }

    .input-row.border::after {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 8px;
        height: 1px;
        content: '';
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
        background-color: #c8c7cc;
    }

    .btn-row {
        margin-top: 25px;
        padding: 10px;
    }

    button.primary {
        background-color: #0faeff;
    }





    .h1 {
        font-size: 64rpx;
    }

    .h2 {
        font-size: 36rpx;
    }

    .mt16 {
        margin-top: 16rpx;
    }

    .mt32 {
        margin-top: 32rpx;
    }

    .mt52 {
        margin-top: 52rpx;
    }

    // 修改uview表单提示会影响布局错位的问题
    .u-form-item {
        padding-bottom: 56rpx !important;
        position: relative;

        .u-form-item__message {
            position: absolute;
            bottom: 20rpx;
        }
    }
</style>