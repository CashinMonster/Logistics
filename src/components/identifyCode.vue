
<template>
    <div class="identify-wraper">
        <p>
            已发送验证码至{{ tel }}
        </p>
        <router-link to="/login">更换手机号</router-link>
        <div id="yzm-wraper">
            <div class="ipt-box-nick mb15-nick">
                <input type="tel" maxlength="4" oncopy="return false" v-model="code" onpaste="return false" class="ipt-real-nick" @input="inputChange" />
                <div class="ipts-box-nick">
                    <div class="ipt-fake-box">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <!--<div class="ipt-active-nick">-->
                    <!--<img src="../assets/img/focus.gif">-->
                <!--</div>-->
            </div>
        </div>
        <p class="leftTime" v-if="!resendBol">
          {{ count }}秒后重新发送
        </p>
        <div class="resend" @click="getCode" v-else>重新获取验证码</div>
    </div>
</template>

<script>
    export default {
        name: "identifyCode",
        metaInfo: {
            title: '验证码'
        },
        data (){
            return {
                tel: '',  //验证的手机号
                code: '',  //验证码
                count: '',   //验证码重新发送时间 60s
                resendBol: false,  //重新发送验证码
                timer: null,   //定时器名称
                loadBol: false,  //是否加载完
            }
        },
        mounted (){
            let routerParams = this.$route.params.tel;   //login页传递过来的参数
            let sessionTel = sessionStorage.getItem('tel');   //login页记录的sessionStorage
            if(routerParams){
                this.tel = routerParams;
                this.countDown();
            }else{
                if (sessionTel){
                    this.tel = sessionTel;
                    this.countDown();
                }else{
                    this.$msgbox({
                        content: '没有手机号，请前往输入手机号',
                        className: 'pop-custom'
                    });
                }
            }
        },
        methods: {
            showMsgbox(msg){
                //弹框函数
                this.$msgbox({
                    content:msg,
                    className:'pop-custom'
                });
            },
            inputChange(){
                let inputs = document.querySelectorAll(".ipt-fake-box div"),
                    activeNick = document.querySelector(".ipt-active-nick"),
                    boxNick = document.querySelector(".ipt-box-nick");
                let yzCode = this.code;
                let codeLen = yzCode.length;
                if (yzCode == ''){
                    // activeNick.style.left = 0;
                    inputs[0].innerHTML = '';
                }else if (/^[0-9]*$/g.test(yzCode)){
                    let pwd = yzCode;
                    for (let i=0, len=pwd.length; i<len; i++){
                        inputs[i].innerHTML = pwd[i];
                        // if (inputs[i].nextSibling){   //模拟光标，先将图片容器定位，控制left值而已
                        //     activeNick.style.left = 65*len + 'px';
                        // }
                    }
                    for (var index in inputs){ //将有值的当前input后的所有input清空

                        if (index >= codeLen){
                            inputs[index].innerHTML = "";
                        }
                    }
                    if (codeLen == 4){
                        //执行其他操作,(可直接验证验证码)
                        console.log(yzCode);
                        let data = {
                            code: this.code,
                            tel: this.tel
                        };
                        this.$http.getAxio(process.env.API_HOST+this.$http.urlHead+'Transport/login', 'POST', this.$qs.stringify(data)).then(res => {

                            if (res.status == 1){
                                console.log('success');
                                this.$router.push({
                                    //重定向
                                    name: "payList",
                                    params: {
                                        tel: this.tel
                                    }
                                });
                            }else{
                                this.showMsgbox(res.msg);
                            }
                        });
                    }
                }else{
                    //清除val中的非数字，返回纯number的value
                    let arr = yzCode.match(/\d/g);
                    yzCode = yzCode.slice(0,yzCode.lastIndexOf(arr[arr.length - 1] + 1));
                }
            },
            countDown(){
                // let TIME_COUNT = null;
                // if (sessionStorage.getItem('count')){
                //     if (sessionStorage.getItem('count') == 0){
                //         this.resendBol = true;
                //     }else{
                //         TIME_COUNT = sessionStorage.getItem('count');
                //     }
                // }else{
                //     TIME_COUNT = 60;
                // }
                // if (!this.timer) {
                //     this.count = TIME_COUNT;
                //
                //     this.timer = setInterval(() => {
                //         if (this.count > 0 && this.count <= 60) {
                //             this.resendBol = false;
                //             this.count--;
                //             sessionStorage.setItem('count',this.count);
                //         } else {
                //             this.resendBol = true;
                //             clearInterval(this.timer);
                //             this.timer = null;
                //         }
                //     }, 1000);
                // }

                let TIME_COUNT = new Date().getTime();//时间戳
                if (!localStorage.getItem("TIME_COUNT")){
                    localStorage.setItem("TIME_COUNT", TIME_COUNT);
                    this.countDown();
                }else{
                    let count = TIME_COUNT - parseInt(localStorage.getItem("TIME_COUNT"), 10);
                    count = parseInt(count / 1000); //转换成秒数
                    console.log(count);
                    if (count < 60){
                        if (!this.timer) {
                            count = parseInt(count, 10);
                            this.count = 60 - count;
                            this.timer = setInterval( () => {
                                if (this.count > 0 && this.count <= 60) {
                                    this.resendBol = false;
                                    this.count--;
                                } else {
                                    this.resendBol = true;
                                    clearInterval(this.timer);
                                    this.timer = null;
                                }
                            }, 1000);
                        }else{
                            this.resendBol = true;
                        }
                    }else{
                        this.resendBol = true;
                    }
                }
            },
            getCode(){
                //点击下一步，提交手机号以获取验证码
                let data = {
                    tel: this.tel
                };
                if (this.tel.length == 0){
                    //  手机号码为空
                    this.showMsgbox('手机号码不能为空');
                }else{
                    if (this.tel.length == 11 && (/^1[3|4|5|6|8|7|9]\d{9}$/).test(this.tel)){
                        //手机号码输入正确
                        this.$http.getAxio(process.env.API_HOST+this.$http.urlHead+'Transport/telVerify/tel/' + this.tel, 'get', data).then(res => {

                            if (res.status == 1){
                                //记录电话号码的sessionstorage
                                sessionStorage.setItem("tel", this.tel);
                                localStorage.removeItem('TIME_COUNT');
                                console.log('111');
                                this.countDown();
                                this.resendBol = false;
                            }else{
                                this.showMsgbox(res.msg);
                            }
                        });
                    }else{
                        //手机号码格式错误
                        this.showMsgbox('请重新输入手机号');
                    }
                }
            }
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
        margin-top: 360px;
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
    #yzm-wraper{
        position: relative !important;
        top: 150px;
    }
    .ipt-box-nick {
        width: 500px;
        height: 100px !important;
        line-height: 100px !important;
        position: relative !important;
        margin: 0 auto;
    }

    .ipt-box-nick .ipt-real-nick {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        width: 100%;
        height: 100px !important;
        line-height: 100px !important;
        opacity: 0 !important;
        z-index: 3 !important;
    }

    .ipt-box-nick .ipts-box-nick {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        z-index: 1 !important;
        width: 100%;
        height: 100px !important;
        line-height: 100px !important;
        overflow: hidden;
    }

    .ipt-box-nick .ipts-box-nick .ipt-fake-box {
        height: 100px !important;
        line-height: 100px !important;
        display: flex !important;
        justify-content: space-between !important;
    }

    .ipt-box-nick .ipts-box-nick .ipt-fake-box div {
        width: 100px !important;
        height: 100px !important;
        border: 2px solid #ccc !important;
        color: #f1772e !important;
        font-weight: bold !important;
        font-size: 60px !important;
        text-align: center !important;
        padding: 0 !important;
        border-radius: 10px;
        box-sizing: border-box;
    }

    .ipt-box-nick .ipt-active-nick {
        width: 100px !important;
        height: 100px !important;
        line-height: 100px !important;
        text-align: center;
        position: absolute !important;
        top: 0;
        left: 0;
        z-index: 2;
    }

    .ipt-box-nick .ipt-active-nick img {
        vertical-align: middle;
    }
    .ipt-real-nick{
        caret-color: transparent;
    }
    .identify-wraper .leftTime{
        position: absolute;
        top: 400px;
        left: 0;
        right: 0;
        color: #ccc;
        font-size: 30px;
    }
    .resend{
        width: 300px;
        height: 80px;
        text-align: center;
        line-height: 80px;
        background-color: #f1772e;
        position: absolute;
        top: 400px;
        left: 150px;
        color: white;
        font-size: 30px;
        border-radius: 5px;
    }
</style>
