<template lang="wxml">
    <view class="content main">
        <u-swiper :list="list" height="320" title effect3d @click="seeArticle"></u-swiper>
        <view style="padding:10px">
            <view class="card">
                <u-grid :col="4">
                    <u-grid-item v-for="(item,i) in navList" @click="clickNav(item)" :key="i">
                        <u-image width="100rpx" height="100rpx" :src="item.src"></u-image>
                        <view class="grid-text">{{item.name}}</view>
                    </u-grid-item>
                </u-grid>
            </view>
        </view>
    </view>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'
    import { getImage } from '@/api/article'
    export default {
        computed: mapState(['forcedLogin']),
        data() {
            return {
                list: [],
                navList: [{
                    src: "/static/img/bssq.png",
                    name: "办事申请",
                    path: "/pagesA/allNav/allNav",
                    type: "bssq"
                }, {
                    src: "/static/img/jfyy.png",
                    name: "建房预约",
                    path: "/pagesA/allNav/allNav",
                    type: "jfyy"
                }, {
                    src: "/static/img/jdcx.png",
                    name: "进度查询",
                    path: "/pages/card/card"
                }, {
                    src: "/static/img/gsgg.png",
                    name: "公示公告",
                    path: "/pagesA/article/notice",
                }, {
                    src: "/static/img/xfjb.png",
                    name: "信访举报",
                    path: "/pagesA/report/report"
                }, {
                    src: "/static/img/bmfw.png",
                    name: "便民服务",
                    path: "/pagesA/allNav/allNav",
                    type: "bmfw"
                }, {
                    src: "/static/img/zcfg.png",
                    name: "政策法规",
                    path: "/pagesA/article/law",
                }]
            }
        },
        onLoad() {
            getImage().then(res => {
                let path = this.$store.getters.apiPath
                res.data.forEach(e => {
                    this.list.push({
                        image: path + e.image[0].filePath,
                        title: e.notice.noticeTitle,
                        id: e.notice.noticeId,
                    })
                });
                // this.list = [{
                //         image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
                //         title: '昨夜星辰昨夜风，画楼西畔桂堂东'
                //     },
                //     {
                //         image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
                //         title: '身无彩凤双飞翼，心有灵犀一点通'
                //     },
                //     {
                //         image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
                //         title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
                //     }
                // ]
            })
        },
        methods: {
            ...mapMutations(['login']),
            clickNav(item) {
                this.$u.route({ url: item.path, params: { type: item.type } })
            },
            seeArticle(i) {
                this.$u.route({
                    url: 'pagesA/article/articleDetails',
                    params: {
                        id: this.list[i].id,
                        type: "main"
                    }
                })
            }
        }

    }
</script>

<style lang="scss">
    .main {
        padding: 10px 0;

        .card {
            border-radius: 16rpx;
            box-shadow: 0 0 6px #ccc;
            overflow: hidden;
        }
    }
</style>