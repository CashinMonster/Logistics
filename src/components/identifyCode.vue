<template>
    <div class="identify-wraper">
        <p>
            已发送验证码至{{ tel }}
        </p>
        <router-link to="/">更换手机号</router-link>
    </div>
</template>

<script>
    export default {
        name: "identifyCode",
        data (){
            return {
                tel: '',  //验证的手机号
                code: ''  //验证码
            }
        },
        created (){
            let routerParams = this.$route.params.tel;   //login页传递过来的参数
            let sessionTel = sessionStorage.getItem('tel');   //login页记录的sessionStorage
            if(routerParams){
                this.tel = routerParams;
            }else{
                if (sessionTel){
                    this.tel = sessionTel;
                }else{
                    this.$msgbox({
                        content: '没有手机号，请前往输入手机号',
                        className: 'pop-custom'
                    });
                }
            }
        },
        methods: {

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
    .identify-wraper{
        width: 600px;
        margin-left: 75px;
        margin-top: 300px;
        /*border: 1px solid red;*/
        position: relative;
        p{
            font-size: 40px;
        }
        a{
            color: rgb(241,119,46);
            text-decoration: none;
            position: absolute;
            left: 40px;
            top: 70px;
            font-size: 30px;
        }
        a:link{
            color: rgb(241,119,46);
        }
        a:visited{
            color: rgb(241,119,46);
        }
        a:active{
            color: rgb(241,119,46);
        }
        a:hover{
            color: rgb(241,119,46);
        }
    }

</style>
