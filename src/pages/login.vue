<template>
    <div>
        <div style="width:200px;margin:100px auto">
            <el-input v-model="form.phone"></el-input>
            <el-input v-model="form.password"></el-input>
            <el-button @click="login">登入</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: '',
        props: {},
        components: {

        },
        data() {
            return {
                form: {
                    phone: "admin",
                    password: "123456"
                }
            }
        },
        methods: {
            login() {
                this.$store.dispatch("Login", this.form).then(() => {
                    this.$router.push({ path: '/index' });
                }).catch(() => {
                    this.$message.error("错误")
                })
            }
        },
        mounted() {

        },
        watch: {

        },
        computed: {

        },
        filters: {

        },
        beforeDestroy() {

        }
    }
</script>

<style>

</style>