<template lang="wxml">
    <view class="my-card2" :style="params.bgColor">
        <view class="icon-bg">
            <!-- <u-icon :name="params.icon"></u-icon> -->
            <u-image width="40" height="40" :src="params.icon"></u-image>
        </view>
        <view style="width:100rpx"></view>
        <view class="text">
            <text style="margin-bottom:10rpx">{{params.name}}</text>
            <u-button shape="circle" size="medium" @click="go">查 看</u-button>
        </view>
    </view>
</template>

<script>
    export default {
        name: 'my-card2',
        props: {
            data: {
                type: Object,
                default: () => {
                    return {}
                }
            },
            path: {
                type: Object,
                default: () => {
                    return {}
                }
            },
        },
        components: {},
        data() {
            return {}
        },
        methods: {
            go() {
                uni.navigateTo({
                    url: `${this.path.path}?type=${this.path.type}`
                })
            }
        },
        watch: {},
        computed: {
            params() {
                // 设置默认数据，与传入数据合并
                return Object.assign({
                    bgColor: "",
                    icon: "",
                    name: "XX申请",
                    data: {},
                }, this.data);
            }
        },
    }
</script>

<style lang="scss">
    .my-card2 {
        display: flex;
        box-shadow: 0 0 10rpx #ccc;
        border-radius: 6rpx;
        padding: 30rpx;
        font-size: 32rpx;
        overflow: hidden;
        justify-content: space-around;
        align-items: center;

        .icon-bg {
            width: 120rpx;
            height: 120rpx;
            background-color: #00000015;
            border-radius: 60rpx;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .text {
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #fff;
            font-size: 40rpx;
        }
    }
</style>