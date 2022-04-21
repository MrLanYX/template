<template lang="wxml">
    <view>
        <u-form :model="form" ref="uForm" label-position="top" :error-type="['message','toast']">

            <view v-show="formSpeed==1">
                <view class="sq-card">
                    <view class="sq-card-title">申请户主信息</view>
                    <u-form-item required label="姓名" prop="homeownerName">
                        <u-input v-model="form.homeownerName" border />
                    </u-form-item>
                    <u-form-item required label="性别" prop="homeownerGender" label-position="left">
                        <u-radio-group v-model="form.homeownerGender">
                            <u-radio :name="item.dictValue" v-for="(item, index) in sexOptions" :key="index">{{item.dictLabel}}</u-radio>
                        </u-radio-group>
                    </u-form-item>
                    <u-form-item required label="联系电话" prop="homeownerPhoneNum">
                        <u-input v-model="form.homeownerPhoneNum" border />
                    </u-form-item>
                    <u-form-item required label="身份证号码" prop="homeownerIdCard">
                        <u-input v-model="form.homeownerIdCard" border />
                    </u-form-item>
                    <u-form-item required label="户口所在地" prop="homeownerNativePlace">
                        <u-input v-model="form.homeownerNativePlace" border type="textarea" height="140" />
                    </u-form-item>
                </view>


                <view class="sq-card">
                    <view class="sq-card-title">家庭成员信息</view>
                    <view v-for="i in num" :key="i">
                        <u-form-item required label="姓名" :prop="'name'+(i+1)">
                            <u-input v-model="form['name'+(i+1)]" border />
                        </u-form-item>
                        <u-form-item required label="与户主关系" :prop="'householderRelation'+(i+1)">
                            <u-input v-model="form['householderRelation'+(i+1)]" type="select" border @click="openHouseholderRelationFlag(i+1)" />
                        </u-form-item>
                        <u-form-item required label="身份证号" :prop="'idCard'+(i+1)">
                            <u-input v-model="form['idCard'+(i+1)]" border />
                        </u-form-item>
                        <u-form-item required label="户口所在地" :prop="'idCard'+(i+1)">
                            <u-input v-model="form['address'+(i+1)]" border type="textarea" height="140" />
                        </u-form-item>
                    </view>
                    <u-select v-model="householderRelationFlag" :list="typeOptions" label-name="dictLabel" value-name="dictValue" @confirm="confirm($event,1)"></u-select>
                    <u-button @click="addMember">添加成员</u-button>
                </view>


                <view class="sq-card">
                    <view class="sq-card-title">现宅基地及农房情况</view>
                    <u-form-item required label="宅基地面积" prop="nowHomesteadArea">
                        <u-input v-model="form.nowHomesteadArea" border />
                    </u-form-item>
                    <u-form-item required label="建筑面积" prop="nowHomesteadBuildingArea">
                        <u-input v-model="form.nowHomesteadBuildingArea" border />
                    </u-form-item>
                    <u-form-item required label="权属证书号" prop="nowHomesteadOwnershipNum">
                        <u-input v-model="form.nowHomesteadOwnershipNum" border />
                    </u-form-item>
                    <u-form-item required label="户口所在地" prop="nowHomesteadDisposal">
                        <u-input v-model="form.nowHomesteadDisposal" border type="textarea" height="140" />
                    </u-form-item>
                </view>


                <view class="sq-card">
                    <view class="sq-card-title">拟申请宅基地及建房情况</view>
                    <u-form-item required label="所在地" prop="applyHomestead">
                        <u-input class="disableBtn" type="select" v-model="form.applyHomestead" border @click="applyHomesteadFlag=true" />
                        <u-select v-model="applyHomesteadFlag" mode="mutil-column-auto" value-name="id" :list="areaOptions" @confirm="confirm($event,2)"></u-select>
                    </u-form-item>
                    <u-form-item required label="宅基地面积" prop="applyHomesteadArea">
                        <u-input v-model="form.applyHomesteadArea" border />
                    </u-form-item>
                    <u-form-item required label="建筑面积" prop="applyHomesteadBuildingArea">
                        <u-input v-model="form.applyHomesteadBuildingArea" border />
                    </u-form-item>
                    <u-form-item required label="地址" prop="applyHomesteadAddress">
                        <u-input v-model="form.applyHomesteadAddress" border />
                    </u-form-item>
                    <u-form-item required label="四至" prop="eastTo">
                        <u-input class="mb10" v-model="form.eastTo" border placeholder="请输入东至" />
                        <u-input class="mb10" v-model="form.westTo" border placeholder="请输入西至" />
                        <u-input class="mb10" v-model="form.southTo" border placeholder="请输入南方" />
                        <u-input class="mb10" v-model="form.northTo" border placeholder="请输入北至" />
                    </u-form-item>
                    <u-form-item required label="地类" prop="landType">
                        <u-radio-group v-model="form.landType">
                            <u-radio :name="item.dictValue" v-for="(item, index) in landOptions" :key="index">{{item.dictLabel}}</u-radio>
                        </u-radio-group>
                    </u-form-item>
                    <u-form-item required label="建房类型" prop="buildingType">
                        <u-radio-group v-model="form.buildingType">
                            <u-radio :name="item.dictValue" v-for="(item, index) in buildOptions" :key="index">{{item.dictLabel}}</u-radio>
                        </u-radio-group>
                    </u-form-item>
                    <u-form-item required label="住房建筑面积" prop="houseBuildingArea">
                        <u-input v-model="form.houseBuildingArea" border />
                    </u-form-item>
                    <u-form-item required label="建筑层数" prop="buildingLayer">
                        <u-input v-model="form.buildingLayer" border />
                    </u-form-item>
                    <u-form-item required label="建筑高度" prop="buildingHeight">
                        <u-input v-model="form.buildingHeight" border />
                    </u-form-item>
                    <u-form-item required label="是否征得相邻权利人意见" prop="isSeekNeighborOpinion" label-position="left" label-width="400rpx">
                        <u-radio-group v-model="form.isSeekNeighborOpinion">
                            <u-radio :name="item.dictValue" v-for="(item, index) in yesOrNoOptions" :key="index">{{item.dictLabel}}</u-radio>
                        </u-radio-group>
                    </u-form-item>
                    <u-form-item required label="申请理由" prop="applyReason">
                        <u-input v-model="form.applyReason" border type="textarea" height="140" />
                    </u-form-item>
                </view>
                <u-button @click="next">下 一 步</u-button>
            </view>


            <view v-show="formSpeed==2">
                <view class="sq-card">
                    <view class="sq-card-title">现宅基地及农房情况</view>

                    <view style="white-space:pre-wrap">
因 <text style="color:red"> {{buildingTypeLabel}} </text>需要，本人申请在<text style="color:red"> {{componentArea(0)}} </text>乡（镇街道）<text style="color:red"> {{componentArea(1)}} </text>村<text style="color:red"> {{componentArea(2)}} </text>使用宅基地建房，现郑重承诺：

1. 本人及家庭成员符合“一户一宅”申请条件，申请材料真实有效；

2. 宅基地和建房申请经批准后，我将严格按照批复位置和面积动工建设，在批准后 <u-input v-model="form.month" class="input" placeholder="请输入"></u-input> 月内建成并使用；

3. 新住房建设完成后，按照规定 <u-input v-model="form.day" class="input" placeholder="请输入"></u-input> 日内拆除旧房，并无偿退出原有宅基地。如有隐瞒或未履行承诺，本人愿承担一切经济和法律责任。

                        <view style="text-align:right">承诺人： {{form.homeownerName}}</view>
                        <view style="text-align:right">{{form.date}}</view>
                    </view>
                </view>
                <u-button @click="$emit('update:formSpeed', 1)">上 一 步</u-button>
                <u-button @click="submit">确 定</u-button>
            </view>

        </u-form>
        <u-toast ref="uToast" />
    </view>
</template>

<script>
    import { JFSQaddApplyInfo, getUserPro } from '@/api/housingApplication'
    export default {
        name: '',
        components: {},
        props: {
            formSpeed: Number,
        },
        data() {
            return {
                form: {
                    homeownerName: '',
                    homeownerGender: '',
                    homeownerPhoneNum: '',
                    homeownerIdCard: '',
                    homeownerNativePlace: '',

                    nowHomesteadArea: '',
                    nowHomesteadBuildingArea: '',
                    nowHomesteadOwnershipNum: '',
                    nowHomesteadDisposal: '',

                    applyHomestead: '',
                    applyHomesteadIds: [],
                    applyHomesteadArea: '',
                    applyHomesteadBuildingArea: '',
                    applyHomesteadAddress: '',
                    eastTo: '',
                    westTo: '',
                    southTo: '',
                    northTo: '',
                    landType: '',
                    buildingType: '',
                    houseBuildingArea: '',
                    buildingLayer: '',
                    buildingHeight: '',
                    isSeekNeighborOpinion: '',
                    applyReason: "",

                    month: "",
                    day: "",
                    date: ""
                },
                sexOptions: [],
                landOptions: [],
                buildOptions: [],
                yesOrNoOptions: [],
                typeOptions: [],
                areaOptions: [],
                num: 0, // 成员数量
                applyHomesteadFlag: false,
                householderRelationFlag: false,
                openHouseholderRelationFlagId: "",

                rules: {
                    homeownerName: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 2, max: 18, message: '长度在 2 到 18 个字符', trigger: 'blur' }
                    ],
                    homeownerGender: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    homeownerIdCard: [
                        { required: true, message: '请输入身份证号', trigger: 'blur' }
                    ],
                    homeownerPhoneNum: [
                        { required: true, message: '请输入联系方式', trigger: 'blur' }
                    ],
                    homeownerNativePlace: [
                        { required: true, message: '请输入户口所在地', trigger: 'blur' }
                    ],
                    area: [
                        { required: true, message: '请输入宅基地面积', trigger: 'blur' }
                    ],
                    buildArea: [
                        { required: true, message: '请输入建筑面积', trigger: 'blur' }
                    ],
                    housePropertyNum: [
                        { required: true, message: '请输入房产证书号', trigger: 'blur' }
                    ],
                    householderRelation1: [
                        { required: true, message: '请输入与户主的关系', trigger: 'blur' }
                    ],
                    county: [
                        { required: true, message: '请输入', trigger: 'blur' }
                    ],
                    town: [
                        { required: true, message: '请输入', trigger: 'blur' }
                    ],
                    village: [
                        { required: true, message: '请输入', trigger: 'blur' }
                    ],
                    villageGroup: [
                        { required: true, message: '请输入', trigger: 'blur' }
                    ],
                    nowHomesteadArea: [
                        { required: true, message: '请输入现宅基地面积', trigger: 'blur' }
                    ],
                    nowHomesteadBuildingArea: [
                        { required: true, message: '请输入现宅基地建筑面积', trigger: 'blur' }
                    ],
                    nowHomesteadOwnershipNum: [
                        { required: true, message: '请输入现宅基地权属证书号', trigger: 'blur' }
                    ],
                    applyHomestead: [
                        { required: true, message: '请选择', trigger: 'change' }
                    ],
                    applyHomesteadArea: [
                        { required: true, message: '请输入宅基地面积', trigger: 'blur' }
                    ],
                    applyHomesteadBuildingArea: [
                        { required: true, message: '请输入建筑面积', trigger: 'blur' }
                    ],
                    applyHomesteadAddress: [
                        { required: true, message: '请输入地址', trigger: 'blur' }
                    ],
                    landType: [
                        { required: true, message: '请选择地类', trigger: 'change' }
                    ],
                    buildingType: [
                        { required: true, message: '请选择建房类型', trigger: 'change' }
                    ],
                    houseBuildingArea: [
                        { required: true, message: '请输入住房面积', trigger: 'blur' }
                    ],
                    buildingLayer: [
                        { required: true, message: '请输入建筑层数', trigger: 'blur' }
                    ],
                    buildingHeight: [
                        { required: true, message: '请输入建筑高度', trigger: 'blur' }
                    ],
                    isSeekNeighborOpinion: [
                        { required: true, message: '请选择是否征得意见', trigger: 'change' }
                    ],
                    applyReason: [
                        { required: true, message: '请输入申请理由', trigger: 'blur' }
                    ],
                },
            };
        },
        computed: {
            buildingTypeLabel() {
                let obj = this.buildOptions.find((n) => n.dictValue == this.form.buildingType)
                return obj ? obj.dictLabel : "XXX"
            }
        },
        mounted() {},
        methods: {
            initData() {
                this.$refs.uForm.setRules(this.rules);
                this.$getDicts("sys_user_sex").then(response => {
                    this.sexOptions = response.data;
                });
                this.$getDicts("land_type").then(response => {
                    this.landOptions = response.data;
                });
                this.$getDicts("build_type").then(response => {
                    this.buildOptions = response.data;
                });
                this.$getDicts("sys_yes_no").then(response => {
                    this.yesOrNoOptions = response.data;
                });
                this.$getDicts("householder_relation").then(response => {
                    this.typeOptions = response.data;
                });
                getUserPro({ type: 1 }).then(res => {
                    this.areaOptions = res.data
                })
            },
            next() {
                this.$refs.uForm.validate(valid => {
                    if (valid) {
                        this.$emit("update:formSpeed", 2)
                        let da = new Date();
                        let year = da.getFullYear() + '年';
                        let month = da.getMonth() + 1 + '月';
                        let day = da.getDate() + '日';
                        this.form.date = [year, month, day].join(' ')
                    }
                });
            },
            submit() {
                if (this.form.month && this.form.day) {
                    let form = this.form
                    // 处理成员信息
                    let familiesInfoList = []
                    for (let i = 1; i <= this.num; i++) {
                        familiesInfoList.push({
                            name: form['name' + i],
                            householderRelation: form['householderRelation' + i],
                            idCard: form['idCard' + i],
                            address: form['address' + i],
                        })
                    }
                    let params = {
                        familiesInfoList: familiesInfoList,
                        proHouseholderInfo: {
                            homeownerName: form.homeownerName,
                            homeownerGender: form.homeownerGender,
                            homeownerIdCard: form.homeownerIdCard,
                            homeownerPhoneNum: form.homeownerPhoneNum,
                            homeownerNativePlace: form.homeownerNativePlace,
                        },
                        proBuildingApplyInfo: {
                            nowHomesteadArea: form.nowHomesteadArea,
                            nowHomesteadBuildingArea: form.nowHomesteadBuildingArea,
                            nowHomesteadOwnershipNum: form.nowHomesteadOwnershipNum,
                            nowHomesteadDisposal: form.nowHomesteadDisposal,
                            applyHomesteadCounty: form.applyHomesteadIds[0],
                            applyHomesteadTown: form.applyHomesteadIds[1],
                            applyHomesteadVillage: form.applyHomesteadIds[2],
                            applyHomesteadVillageGroup: form.applyHomesteadIds[3],
                            applyHomesteadArea: form.applyHomesteadArea,
                            applyHomesteadBuildingArea: form.applyHomesteadBuildingArea,
                            applyHomesteadAddress: form.applyHomesteadAddress,
                            eastTo: form.eastTo,
                            westTo: form.westTo,
                            southTo: form.southTo,
                            northTo: form.northTo,
                            landType: form.landType,
                            buildingType: form.buildingType,
                            houseBuildingArea: form.houseBuildingArea,
                            buildingLayer: form.buildingLayer,
                            buildingHeight: form.buildingHeight,
                            isSeekNeighborOpinion: form.isSeekNeighborOpinion,
                            applyReason: form.applyReason,
                            dismantleDay: form.day,
                            buildingMonth: form.month,
                        },
                        time: form.date
                    }
                    console.log("结果", params);
                    JFSQaddApplyInfo(params).then(res => {
                        this.$refs.uToast.show({
                            title: '建房申请提交成功',
                            isTab: true,duration:500,
                            url: '/pages/main/main',
                        })
                    })
                } else {
                    this.$u.toast("请输入规定时限")
                }
            },
            confirm(e, type) {
                if (type == 1) {
                    this.form['householderRelation' + this.openHouseholderRelationFlagId] = e[0].label
                } else if (type == 2) {
                    this.form.applyHomestead = ""
                    this.form.applyHomesteadIds = []
                    e.forEach(item => {
                        this.form.applyHomestead += item.label + "/"
                        this.form.applyHomesteadIds.push(item.value)
                    });
                }
            },
            addMember() {
                this.num += 1
                let name = 'name' + this.num
                let householderRelation = 'householderRelation' + this.num
                let idCard = 'idCard' + this.num
                let address = 'address' + this.num

                this.$set(this.form, name, "")
                this.$set(this.form, householderRelation, "")
                this.$set(this.form, idCard, "")
                this.$set(this.form, address, "")

                this.$set(this.rules, name, [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 2, max: 18, message: '长度在 2 到 18 个字符', trigger: 'blur' }
                ])
                this.$set(this.rules, householderRelation, [
                    { required: true, message: '请输入与户主的关系', trigger: ['change', 'blur', 'click'] }
                ])
                this.$set(this.rules, idCard, [
                    { required: true, message: '请输入身份证号', trigger: 'blur' }
                ])
                this.$set(this.rules, address, [
                    { required: true, message: '请输入地址', trigger: 'blur' }
                ])

                this.$refs.uForm.setRules(this.rules);
            },
            openHouseholderRelationFlag(i) {
                this.householderRelationFlag = true
                this.openHouseholderRelationFlagId = i
            },
            componentArea(i) {
                if (this.form.applyHomestead) {
                    let arr = this.form.applyHomestead.split("/")
                    if (i == 2 && !arr[2]) return "XXX"
                    return arr[i]
                } else {
                    return "XXX"
                }
            },
        },
        onLoad(res) {},
    };
</script>

<style lang="scss" scope>
    .input {
        text-align: center;
        width: 100rpx;
        display: inline-block;

        input {
            text-align: center;
        }
    }

    .sq-card {
        .mb10 {
            >view {
                margin-bottom: 10px;
            }
        }
    }
</style>