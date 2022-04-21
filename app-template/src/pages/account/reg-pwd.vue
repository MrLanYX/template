<template lang="wxml">
    <view class="content reg-pwd">
        <u-form :model="form" ref="uForm" :error-type="['message']">
            <u-form-item v-if="buttonText=='注 册'" label-width="64" :border-bottom="false" prop="nickName">
                <view class="input">
                    <u-icon name="account"></u-icon>
                    <u-input v-model="form.nickName" placeholder="请输姓名" type="text" />
                </view>
            </u-form-item>
            <u-form-item v-if="buttonText=='注 册'" label-width="64" :border-bottom="false" prop="idNumber">
                <view class="input">
                    <u-icon name="coupon"></u-icon>
                    <u-input v-model="form.idNumber" placeholder="请输入身份证号码" type="idcard" />
                </view>
            </u-form-item>
            <u-form-item v-if="buttonText=='注 册'" label-width="64" :border-bottom="false" prop="applyHomestead">
                <view class="input">
                    <u-icon name="list-dot"></u-icon>
                    <u-input class="disableBtn" type="select" placeholder="请选择村组" v-model="form.applyHomestead" @click="applyHomesteadFlag=true" />
                    <u-select v-model="applyHomesteadFlag" mode="mutil-column-auto" value-name="id" :list="areaOptions" @confirm="confirm"></u-select>
                </view>
            </u-form-item>



            <u-form-item label-width="64" :border-bottom="false" prop="phone">
                <view class="input">
                    <u-icon name="phone"></u-icon>
                    <u-input v-model="form.phone" placeholder="请输入手机号" type="number" />
                </view>
            </u-form-item>
            <u-form-item label-width="64" :border-bottom="false" prop="captcha">
                <view class="input">
                    <u-icon name="hourglass"></u-icon>
                    <u-input v-model="form.captcha" placeholder="请输入验证码" type="number" />
                    <u-verification-code :seconds="60" @end="end" @start="start" ref="uCode" @change="codeChange"></u-verification-code>
                    <text style="color:#3399FF" @tap="getCode">{{tips}}</text>
                </view>
            </u-form-item>
            <u-form-item label-width="64" :border-bottom="false" prop="password">
                <view class="input">
                    <u-icon name="lock-open"></u-icon>
                    <u-input v-model="form.password" placeholder="请输入密码" type="password" />
                </view>
            </u-form-item>
            <u-form-item label-width="64" :border-bottom="false" prop="password2">
                <view class="input">
                    <u-icon name="lock-open"></u-icon>
                    <u-input v-model="form.password2" placeholder="请再次输入密码" type="password" />
                </view>
            </u-form-item>
        </u-form>
        <u-button class="mt52" shape="circle" type="primary" ripple @click="submit">{{buttonText}}</u-button>

        <u-toast ref="uToast" />
    </view>
</template>

<script>
    import { generateCode, changePasswordApp, register } from '@/api/login';
    import { getProvinceTrees } from '@/api/index';
    import { mapState, mapMutations, mapGetters } from 'vuex'

    export default {
        components: {},
        data() {
            return {
                buttonText: "",
                form: {
                    nickName:"",
                    idNumber:"",
                    phone: "",
                    code: "",
                    password: "",
                    password2: "",
                    applyHomestead: '',
                    applyHomesteadIds: [],
                },
                applyHomesteadFlag: false,
                areaOptions: [],
                tips: "获取验证码",
                rules: {
                    phone: [
                        { required: true, message: '手机号不能为空，请输入手机号', trigger: ['blur', 'change'] },
                        {
                            validator: (rule, value, callback) => {
                                return this.$u.test.mobile(value);
                            },
                            message: '手机号码格式不正确',
                            trigger: ['blur'],
                        }
                    ],
                    captcha: [
                        { required: true, message: '验证码不能为空，请输入验证码', trigger: ['blur', 'change'] },
                        {
                            validator: (rule, value, callback) => {
                                return this.$u.test.code(value, 6);
                            },
                            message: '验证码格式不正确',
                            trigger: ['blur'],
                        }
                    ],
                    password: [
                        { required: true, message: '密码不能为空，请输入密码', trigger: ['blur', 'change'] }
                    ],
                    password2: [
                        { required: true, message: '密码不能为空，请再次输入密码', trigger: ['blur', 'change'] },
                        {
                            validator: (rule, value, callback) => {
                                return this.form.password == this.form.password2;
                            },
                            message: '两次输入的密码不一致，请重新输入',
                            trigger: ['blur'],
                        }
                    ],
                },
            }
        },
        computed: {
            ...mapGetters(['phonenumber'])
        },
        onShow() {
            this.form.phone = this.phonenumber
        },
        onReady() {
            this.$refs.uForm.setRules(this.rules);
            getProvinceTrees().then(res => {
                this.areaOptions = res.data
            })
        },
        onLoad(res) {
            if (res.type == 'reg') {
                wx.setNavigationBarTitle({
                    title: '注册账号'
                })
                this.buttonText = "注 册"
            } else if (res.type == 'pwd') {
                wx.setNavigationBarTitle({
                    title: '忘记密码'
                })
                this.buttonText = "确 定"
            } else if (res.type == 'changePwd') {
                wx.setNavigationBarTitle({
                    title: '修改密码'
                })
                this.buttonText = "确 定"
            }
        },
        methods: {
            submit() {
                this.$refs.uForm.validate(valid => {
                    if (valid) {
                        console.log('验证通过');
                        if (this.buttonText == "确 定") {
                            changePasswordApp({
                                phone: this.form.phone,
                                captcha: this.form.code,
                                newPassword: this.form.password,
                            }).then(res => {
                                this.$store.dispatch('LogOut')
                                this.$refs.uToast.show({
                                    title: '修改成功',
                                    isTab: true,duration:500,
                                    url: '/pages/main/main',
                                })
                            })
                        } else {
                            register({
                                nickName: this.form.nickName,
                                idNumber: this.form.idNumber,
                                phoneNumber: this.form.phone,
                                password: this.form.password,
                                captcha: this.form.captcha,
                                county: this.form.applyHomesteadIds[0],
                                town: this.form.applyHomesteadIds[1],
                                village: this.form.applyHomesteadIds[2],
                                villageGroup: this.form.applyHomesteadIds[3],
                            }).then(res => {
                                this.$refs.uToast.show({
                                    title: '注册成功',
                                    isTab: true,duration:500,
                                    url: '/pages/main/main',
                                })
                            })
                        }
                    }
                });
            },
            codeChange(text) {
                this.tips = text;
            },
            getCode() {
                if (this.form.phone && this.$u.test.mobile(this.form.phone)) {
                    if (this.$refs.uCode.canGetCode) {
                        // 模拟向后端请求验证码
                        uni.showLoading({
                            title: '正在获取验证码'
                        })
                        generateCode(this.form.phone).then(res => {
                            uni.hideLoading();
                            // 这里此提示会被this.start()方法中的提示覆盖
                            this.$u.toast('验证码已发送');
                            // 通知验证码组件内部开始倒计时
                            this.$refs.uCode.start();
                        })
                    } else {
                        this.$u.toast('倒计时结束后再发送');
                    }
                } else {
                    this.$u.toast('请先输入手机号');
                }
            },
            end() {
                this.$u.toast('倒计时结束');
            },
            start() {
                this.$u.toast('倒计时开始');
            },
            confirm(e) {
                console.log(e);
                this.form.applyHomestead = ""
                this.form.applyHomesteadIds = []
                e.forEach(item => {
                    this.form.applyHomestead += item.label + "/"
                    this.form.applyHomesteadIds.push(item.value)
                });
            },
        }
    }
</script>

<style lang="scss">
    .reg-pwd {
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
    }
</style>