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
                        <u-input v-model="form.homeownerNativePlace" type="textarea" height="140" border />
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
                            <u-input v-model="form['address'+(i+1)]" type="textarea" height="140" border />
                        </u-form-item>
                    </view>
                    <u-select v-model="householderRelationFlag" :list="typeOptions" label-name="dictLabel" value-name="dictValue" @confirm="confirm($event,1)"></u-select>
                    <u-button @click="addMember">添加成员</u-button>
                </view>


                <view class="sq-card">
                    <view class="sq-card-title">宅基地及流转情况</view>
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
                    <u-form-item required label="房产证书号" prop="housePropertyNum">
                        <u-input v-model="form.housePropertyNum" border />
                    </u-form-item>
                </view>

                <view class="sq-card">
                    <view class="sq-card-title">宅基地及{{type}}承诺</view>
                    <u-form-item required label="承诺内容" prop="remark">
                        <u-input v-model="form.remark" border type="textarea" height="140" />
                    </u-form-item>
                </view>

                <u-button @click="next">下 一 步</u-button>
            </view>

            <view v-show="formSpeed==2">
                <view class="sq-card">
                    <view class="sq-card-title">现宅基地及农房情况</view>
                    <u-table>
                        <u-tr>
                            <u-th width="40rpx">序号</u-th>
                            <u-th>住宅{{type}}申请材料</u-th>
                            <u-th>格式</u-th>
                            <u-th>操作</u-th>
                        </u-tr>
                        <u-tr v-for="(item,i) in tableData" :key="i">
                            <u-td>{{i+1}}</u-td>
                            <u-td>{{item.name}}</u-td>
                            <u-td>{{item.format}}</u-td>
                            <u-td>
                                <uni-file-picker :v-model="item.fileLists" :file-extname="item.format" fileMediatype="all" mode="list" @select="select($event,item)" @delete="handleRemove" />
                            </u-td>
                        </u-tr>
                    </u-table>
                </view>
                <u-button @click="$emit('update:formSpeed', 1)">上 一 步</u-button>
                <u-button @click="submit">确 定</u-button>
            </view>

        </u-form>
        <u-toast ref="uToast" />
    </view>
</template>

<script>
    import { uniFilePicker } from '@dcloudio/uni-ui'
    import { LZSQaddApplyInfo, JYSQaddApplyInfo, BASQaddApplyInfo, getUserPro, uploadFiles } from '@/api/housingApplication'
    import FormData from '@/common/formData'
    export default {
        name: '',
        components: { uniFilePicker, },
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

                    applyHomestead: '',
                    applyHomesteadIds: [],
                    applyHomesteadArea: '',
                    applyHomesteadBuildingArea: '',
                    housePropertyNum: '',

                    remark: "",
                    fileIds: []
                },

                tableData: [{
                    name: '',
                    format: '',
                    fileLists: [],
                    type: 0
                }],

                sexOptions: [],
                buildOptions: [],
                typeOptions: [],
                areaOptions: [],
                num: 0, // 成员数量
                applyHomesteadFlag: false,
                householderRelationFlag: false,
                openHouseholderRelationFlagId: "",

                rules: {},

                fileListObj: [],
                type: "",
            };
        },
        computed: {},
        mounted() {},
        methods: {
            initData(type) {
                // 判断交易申请和流转申请
                this.type = type
                console.log(this.type);
                if (type == '流转') {
                    this.tableData = [{
                        name: '《不动产证书》复印件',
                        format: 'pdf,jpg',
                        fileLists: [],
                        type: 1
                    }, {
                        name: '赠与、继承协议书等证明文件',
                        format: 'pdf,jpg',
                        fileLists: [],
                        type: 2
                    }, {
                        name: '家庭户口簿复印件',
                        format: 'pdf,jpg',
                        fileLists: [],
                        type: 3
                    }, {
                        name: '户主身份证复印件',
                        format: 'pdf,jpg',
                        fileLists: [],
                        type: 4
                    }, {
                        name: '被赠与人、继承人家庭户口簿复印件',
                        format: 'pdf,jpg',
                        fileLists: [],
                        type: 5
                    }, {
                        name: '被赠与人、继承人身份证复印件',
                        format: 'pdf,jpg',
                        fileLists: [],
                        type: 6
                    }]
                } else if (type == '交易') {
                    this.tableData = [{
                        name: '《不动产证书》复印件',
                        format: 'pdf,jpg',
                        fileLists: [],
                        type: 1
                    }, {
                        name: '出售、租赁合同',
                        format: 'pdf,jpg',
                        fileLists: [],
                        type: 7
                    }, {
                        name: '家庭户口簿复印件',
                        format: 'pdf,jpg',
                        fileLists: [],
                        type: 3
                    }, {
                        name: '户主身份证复印件',
                        format: 'pdf,jpg',
                        fileLists: [],
                        type: 4
                    }, {
                        name: '购买人、租赁人身份证复印件',
                        format: 'pdf,jpg',
                        fileLists: [],
                        type: 8
                    }]
                } else if (type == '备案') {
                    this.tableData = [{
                        name: '《农村宅基地和建房（规划许可）申请表》复印件',
                        format: 'pdf,jpg',
                        fileLists: [],
                        type: 9
                    }, {
                        name: '《农村宅基地使用承诺书》',
                        format: 'pdf,jpg',
                        fileLists: [],
                        type: 10
                    }, {
                        name: '家庭户口簿复印件',
                        format: 'pdf,jpg',
                        fileLists: [],
                        type: 3
                    }, {
                        name: '户主身份证复印件',
                        format: 'pdf,jpg',
                        fileLists: [],
                        type: 4
                    }]
                }



                this.$refs.uForm.setRules(this.rules);
                this.$getDicts("sys_user_sex").then(response => {
                    this.sexOptions = response.data;
                });
                this.$getDicts("build_type").then(response => {
                    this.buildOptions = response.data;
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
                    }
                });
            },
            submit() {
                if (this.fileListObj.length >= this.tableData.length) {
                    console.log("表单", this.form);
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
                            applyHomesteadCounty: form.applyHomesteadIds[0],
                            applyHomesteadTown: form.applyHomesteadIds[1],
                            applyHomesteadVillage: form.applyHomesteadIds[2],
                            applyHomesteadVillageGroup: form.applyHomesteadIds[3],
                            applyHomesteadArea: form.applyHomesteadArea,
                            applyHomesteadBuildingArea: form.applyHomesteadBuildingArea,
                            housePropertyNum: form.housePropertyNum,
                        },
                        fileIds: this.form.fileIds,
                        remark: form.remark,
                    }
                    console.log("结果", params);


                    if (this.type == '流转') {
                        LZSQaddApplyInfo(params).then(res => {
                            this.$refs.uToast.show({
                                title: '流转申请提交成功',
                                isTab: true,
                                duration: 500,
                                url: '/pages/main/main',
                            })
                        })
                    } else if (this.type == '交易') {
                        JYSQaddApplyInfo(params).then(res => {
                            this.$refs.uToast.show({
                                title: '交易申请提交成功',
                                isTab: true,
                                duration: 500,
                                url: '/pages/main/main',
                            })
                        })
                    } else if (this.type == '备案') {
                        BASQaddApplyInfo(params).then(res => {
                            this.$refs.uToast.show({
                                title: '备案申请提交成功',
                                isTab: true,
                                duration: 500,
                                url: '/pages/main/main',
                            })
                        })
                    }
                } else {
                    this.$u.toast("请将文件上传完全")
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
            // 获取上传状态
            select(param, row) {
                const formData = new FormData()
                formData.appendFile('files', param.tempFiles[0].file.path)
                formData.append('tableName', 'pro_over_info')
                formData.append('type', row.type)
                let data = formData.getData()
                uploadFiles(data.buffer, data.contentType).then(res => {
                    this.$u.toast('上传成功')
                    row.fileLists.push(param)
                    this.form.fileIds = this.form.fileIds.concat(res.data)
                    const obj = { id: res.data[0] }
                    const obj2 = Object.assign(param.tempFiles[0].file, obj);
                    this.fileListObj.push(obj2)
                    console.log(this.fileListObj, this.form);
                })
            },
            handleRemove(file) {
                const data = this.fileListObj.filter(function(item) {
                    return item.uuid == file.uuid;
                })
                const indexOf = this.form.fileIds.indexOf(data[0].id)
                this.form.fileIds.splice(indexOf, 1)
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
</style>