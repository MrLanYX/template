<template lang="wxml">
    <view class="content allNav">
        <me-Card v-for="(item,i) in nav" :key="i" :data="item" :path="item.data"></me-Card>
    </view>
</template>

<script>
    import meCard from '@/pagesA/components/my-card2.vue'
    export default {
        components: {
            meCard,
        },
        data() {
            return {
                nav: [],
            }
        },
        onShow() {},
        onReady() {},
        onLoad(res) {
            if (res.type == 'bssq') {
                wx.setNavigationBarTitle({
                    title: '办事申请'
                })
                this.nav = [{
                    bgColor: "background-image: linear-gradient(90deg, #42CB6F 0%, #328A4F 100%);",
                    icon: "/static/img/110@3x.png",
                    name: "建房申请",
                    data: {
                        path:'pagesA/housingApplication/housingApplication',
                        type:'jfsq',
                    },
                }, {
                    bgColor: "background-image: linear-gradient(90deg, #42C2CB 0%, #327E8A 100%);",
                    icon: "/static/img/111@3x.png",
                    name: "流转申请",
                    data: {
                        path:'pagesA/housingApplication/housingApplication',
                        type:'lzsq',
                    },
                }, {
                    bgColor: "background-image: linear-gradient(90deg, #4270CB 0%, #4270CB 100%);",
                    icon: "/static/img/140@3x.png",
                    name: "交易申请",
                    data: {
                        path:'pagesA/housingApplication/housingApplication',
                        type:'jysq',
                    },
                }, {
                    bgColor: "background-image: linear-gradient(90deg, #FFBB54 0%, #CE6000 100%);",
                    icon: "/static/img/112@3x.png",
                    name: "建房备案",
                    data: {
                        path:'pagesA/housingApplication/housingApplication',
                        type:'jfba',
                    },
                }, ]
            } else if (res.type == 'jfyy') {
                wx.setNavigationBarTitle({
                    title: '建房预约'
                })
                this.nav = [{
                    bgColor: "background-image: linear-gradient(90deg, #42CB6F 0%, #328A4F 100%);",
                    icon: "/static/img/141@3x.png",
                    name: "丈量批放预约",
                    data: {
                        path:'pagesA/subscribe/subscribe',
                        type:'zlpfyy',
                    },
                }, {
                    bgColor: "background-image: linear-gradient(90deg, #42C2CB 0%, #327E8A 100%);",
                    icon: "/static/img/113@3x.png",
                    name: "竣工验收预约",
                    data: {
                        path:'pagesA/subscribe/subscribe',
                        type:'jgysyy',
                    },
                }]
            } else if (res.type == 'bmfw') {
                wx.setNavigationBarTitle({
                    title: '便民服务'
                })
                this.nav = [{
                    bgColor: "background-image: linear-gradient(90deg, #42CB6F 0%, #328A4F 100%);",
                    icon: "/static/img/114@3x.png",
                    name: "材料下载",
                    data: {
                        path:'pagesA/download/download',
                        type:'clxz',
                    },
                }, {
                    bgColor: "background-image: linear-gradient(90deg, #42C2CB 0%, #327E8A 100%);",
                    icon: "/static/img/115@3x.png",
                    name: "常见问题",
                    data: {
                        path:'pagesA/issue/issue',
                        type:'cjwt',
                    },
                }]
            }
        },
        methods: {}
    }
</script>

<style lang="scss">
    .allNav {

        me-card {
            >view {
                margin-bottom: 40rpx;
            }
        }
    }
</style>