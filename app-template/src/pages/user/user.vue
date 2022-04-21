<template lang="wxml">
    <view class="center">
        <view class="logo" @click="bindLogin" :hover-class="!hasLogin ? 'logo-hover' : ''">
            <u-image class="logo-u-img" src="/static/img/me-bg.png" height="100%" width="100%"> </u-image>
            <image class="logo-img" :src="user.avatar?user.avatar:'/static/img/logo.png'"></image>
            <text class="logo-name">Hi，{{user.nickName ? user.nickName : '您未登录'}}</text>
            <view class="logo-tag">
                <u-icon name="phone"></u-icon> | {{user.phonenumber?user.phonenumber:"000****0000"}}
            </view>
        </view>
        <view class="center-list">
            <view class="center-list-item" @click="$u.route({url:'/pages/account/reg-pwd',params: {type:'changePwd' }})">
                <u-icon class="list-icon" name="lock-open"></u-icon>
                <text class="list-text">修改密码</text>
                <u-icon class="navigat-arrow" name="arrow-right"></u-icon>
            </view>
        </view>
        <view class="center-list">
            <view class="center-list-item" @click="$u.route('/pages/card/card')">
                <u-icon class="list-icon" name="file-text"></u-icon>
                <text class="list-text">我的申请</text>
                <u-icon class="navigat-arrow" name="arrow-right"></u-icon>
            </view>
        </view>
        <view style="padding:10px;width:100%;display:flex;flex-direction: column;">
            <u-button v-if="user.name" type="primary" @click="bindLogout">退 出 登 录</u-button>
        </view>
    </view>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'

    export default {
        data() {
            return {}
        },
        computed: {
            ...mapState(['user'])
        },
        onShow(){
            // console.log(this.user);
        },
        methods: {
            bindLogin() {
                if (!this.user.name) {
                    uni.navigateTo({
                        url: '/pages/account/login'
                    })
                }
            },
            bindLogout() {
                this.$store.dispatch('LogOut')
            },
        }
    }
</script>

<style lang="scss">
    @font-face {
        font-family: texticons;
        font-weight: normal;
        font-style: normal;
        src: url('https://at.alicdn.com/t/font_984210_5cs13ndgqsn.ttf') format('truetype');
    }

    page,
    view {
        display: flex;
    }

    page {
        background-color: #f8f8f8;
        overflow: hidden;
        /* background-color: #D9AFD9;
        background-image: linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%); */
    }

    button {
        width: 100%;
    }

    .center {
        flex-direction: column;
    }

    .logo {
        width: 750rpx;
        height: 380rpx;
        box-sizing: border-box;

        /* background-color: #0faeff; */
        position: relative;

        .logo-img {
            width: 180rpx;
            height: 180rpx;
            border-radius: 180rpx;
            z-index: 10;
            position: absolute;
            top: 30rpx;
            left: 285rpx;
        }

        .logo-name {
            height: 150rpx;
            width: 100%;
            text-align: center;
            z-index: 10;
            line-height: 60rpx;
            color: #FFFFFF;
            position: absolute;
            top: 220rpx;
        }

        .logo-tag {
            width: 260rpx;
            z-index: 10;
            display: flex;
            justify-content: center;
            padding: 6rpx;
            border-radius: 40rpx;
            border: 1px solid #fff;
            background: #16C8A9;
            position: absolute;
            top: 290rpx;
            left: 245rpx;
        }

        .logo-u-img {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 9;
        }
    }

    .logo-hover {
        opacity: 0.8;
    }


    .go-login.navigat-arrow {
        color: #FFFFFF;
    }

    .login-title {
        height: 150rpx;
        align-items: self-start;
        justify-content: center;
        flex-direction: column;
        margin-left: 20rpx;
    }

    .center-list {
        background-color: #FFFFFF;
        margin-top: 20rpx;
        width: 750rpx;
        flex-direction: column;
    }

    .center-list-item {
        height: 90rpx;
        width: 750rpx;
        box-sizing: border-box;
        flex-direction: row;
        padding: 0rpx 20rpx;
    }

    .border-bottom {
        border-bottom-width: 1rpx;
        border-color: #c8c7cc;
        border-bottom-style: solid;
    }

    .list-icon {
        width: 32rpx;
        height: 90rpx;
        line-height: 90rpx;
        color: #0faeff;
        font-size: 32rpx;
        text-align: center;
        font-family: texticons;
        margin-right: 20rpx;
    }

    .list-text {
        height: 90rpx;
        line-height: 90rpx;
        color: #555;
        flex: 1;
        text-align: left;
    }

    .navigat-arrow {
        height: 90rpx;
        width: 40rpx;
        line-height: 90rpx;
        color: #555;
        text-align: right;
        font-family: texticons;
    }
</style>