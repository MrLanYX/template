<template lang="wxml">
    <view class="content login">
        <view class="h1">欢迎来到掌上办</view>
        <view class="h2 mt16">欢迎登录</view>
        <u-form class="mt32" :model="form" ref="uForm" :error-type="['message']">
            <u-form-item label-width="64" :border-bottom="false" prop="username">
                <view class="input" :class="{shadow:flagShadow=='username'}">
                    <u-icon name="phone"></u-icon>
                    <u-input v-model="form.username" placeholder="请输入手机号" type="number" @focus="flagShadow='username'" />
                </view>
            </u-form-item>
            <u-form-item label-width="64" :border-bottom="false" prop="password">
                <view class="input" :class="{shadow:flagShadow=='password'}">
                    <u-icon name="lock-open"></u-icon>
                    <u-input v-model="form.password" placeholder="请输入密码" type="password" :password-icon="true" @focus="flagShadow='password'" />
                </view>
            </u-form-item>
            <u-form-item label-width="64" :border-bottom="false" prop="code">
                <view class="input" :class="{shadow:flagShadow=='code'}">
                    <u-icon name="lock-open"></u-icon>
                    <u-input v-model="form.code" placeholder="请输入验证码" type="text" :password-icon="true" @focus="flagShadow='code'" />
                    <u-image width="200" height="60" :src="codeUrl" @click="getCode"></u-image>
                </view>
            </u-form-item>
        </u-form>
        <u-button class="mt16" shape="circle" type="primary" ripple @click="submit">登 录</u-button>
        <u-row class="mt32" gutter="32">
            <u-col span="6">
                <view style="text-align: right;">
                    <text @tap="$u.route({url:'/pages/account/reg-pwd',params: {type:'pwd' }})">忘记密码</text>
                </view>
            </u-col>
            <u-col span="6">
                <view>
                    <text @tap="$u.route({url:'/pages/account/reg-pwd',params: {type:'reg' }})">注册账号</text>
                </view>
            </u-col>
        </u-row>
        <view class="bottom">
            <u-divider>微信快速登录</u-divider>
            <u-image width="100rpx" height="100rpx" src="/static/img/weixin.png" @click="quickLogin"></u-image>
        </view>
        <u-toast ref="uToast" />
    </view>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import { getCodeImg, WXquickLogin } from '@/api/login'
    export default {
        components: {},
        data() {
            return {
                form: {
                    username: "18100001111",
                    password: "123456",
                    code: "",
                    uuid: "",
                    openCode: "",
                },
                wxLoginCode: "", //微信快速登入code
                codeUrl: "",
                flagShadow: "",
                rules: {
                    username: { required: true, message: '手机号不能为空，请输入手机号', trigger: ['blur', 'change'] },
                    password: { required: true, message: '密码不能为空，请输入密码', trigger: ['blur', 'change'] },
                },
            }
        },
        computed: mapState(['forcedLogin', 'hasLogin', 'univerifyErrorMsg', 'hideUniverify']),
        onLoad() {
            this.getCode()
        },
        methods: {
            ...mapMutations(['Login']),
            submit() {
                let ts = this
                this.$refs.uForm.validate(valid => {
                    if (valid) {
                        console.log('验证通过');
                        wx.login({
                            success(res) {
                                if (ts.wxLoginCode) {
                                    ts.form.openCode = res.code
                                }
                                ts.$store.dispatch('Login', ts.form).then(() => {
                                    ts.$store.dispatch("GetInfo").then(res => {
                                        ts.$refs.uToast.show({
                                            title: '登录成功',
                                            isTab: true,
                                            duration: 500,
                                            url: '/pages/main/main',
                                        })
                                    })
                                }).catch(res => {
                                    ts.getCode()
                                })
                            }
                        })
                    } else {
                        console.log('验证失败');
                    }
                });
            },
            getCode() {
                getCodeImg().then(res => {
                    this.codeUrl = 'data:image/gif;base64,' + res.img;
                    this.form.uuid = res.uuid;
                });
            },
            quickLogin() {
                let ts = this
                wx.getUserProfile({
                    lang: "zh_CN",
                    desc: "仅用于绑定账号",
                    success: (res) => {
                        wx.login({
                            success(res2) {
                                // 登入接口
                                if (res2.code) {
                                    ts.wxLoginCode = res2.code
                                    ts.$store.dispatch('wxLogin', res2.code).then(() => {
                                        ts.wxLoginCode = ""
                                        ts.$store.dispatch("GetInfo").then(res => {
                                            ts.$refs.uToast.show({
                                                title: '登录成功',
                                                isTab: true,
                                                duration: 500,
                                                url: '/pages/main/main',
                                            })
                                        })
                                    }).catch(() => {
                                        uni.showModal({
                                            title: '绑定微信',
                                            content: '此微信暂未绑定账号，将在下次账号密码登入时进行绑定',
                                            success: (res) => {},
                                            fail: () => {
                                                ts.wxLoginCode = ""
                                            }
                                        });
                                    })
                                }
                            }
                        })
                    },
                    fail: (res) => {
                        ts.$u.toast("取消微信授权登入")
                    }
                })
            },
        },
        onReady() {
            this.$refs.uForm.setRules(this.rules);
        },
    }
</script>

<style lang="scss">
    .login {
        .shadow {
            box-shadow: 0 0 20rpx #ccc;
        }

        .input {
            padding: 10rpx 20rpx;
            border-radius: 48rpx;
            border: 1px solid #eee;
            display: flex;
            align-items: center;

            u-icon {
                font-size: 32rpx;
                margin-right: 10rpx
            }

            u-input {
                flex: 1;
            }
        }

        .bottom {
            position: fixed;
            bottom: 120rpx;
            width: 100%;
        }

        .u-divider {
            margin-bottom: 32rpx !important;
        }

        .u-image {
            margin: 0 auto;
        }
    }
</style>