
<template>
    <div class="payList-wraper">
        <span>{{ tel }}</span>
        <router-link to="/" class="changeTel">更换手机号</router-link>
    </div>
</template>

<script>
    export default {
        name: "payList",
        data() {
            return {
                tel: ''
            }
        },
        beforeCreate(){
            document.getElementsByTagName("body")[0].setAttribute("style","background-color:#eee");
            // document.title = "物流中心"
        },
        mounted(){
            this.tel = this.$route.params.tel;  //输入验证码页面传过来的参数
        },
        destroyed(){
            document.getElementsByTagName("body")[0].setAttribute("style","background-color:white");
            // document.title = ""
        }
    }
</script>

<style scoped lang="scss">
    *{
        margin: 0;
        padding: 0;
        border: 0;
        -webkit-tap-highlight-color:transparent;
    }
    body{
        background-color: #eee;
    }
    .payList-wraper{
        width: 90%;
        position: absolute;
        left: 5%;
        .changeTel{
            color: rgb(241,119,46);
            font-size: 24px;
            position: absolute;
            right: 0;
        }
    }

</style>