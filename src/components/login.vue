
<template>
  <div class="login-wraper">
    <div class="login-main">
      <input type="tel" maxlength="11" placeholder="请输入下单时填写的手机号" v-model="tel" class="telEntry" @input="telChange()">
      <hr>
      <a href="javascript:void(0);" id="clear" class="clear" @click.stop="clearTelphone()">
        <img src="../assets/img/clear.png" alt="清空输入手机号">
      </a>
      <div class="submit" v-bind:class="{orange : isEntryTel}" id="submit" @click.stop="submit()">下一步</div>
    </div>
  </div>
</template>


<script>

  export default {
    name: 'login',
      metaInfo: {
          title: '登录'
      },
    data () {
      return {
        tel:'',
        isEntryTel: false,
          TIME_COUNT: 0
      }
    },
      // beforeCreate(){
      //     document.title = "登录";
      // },
      // destroyed(){
      //     document.title = ""
      // },
    methods: {
        showMsgbox(msg){
            //弹框函数
            this.$msgbox({
              content:msg,
              className:'pop-custom'
            });
        },
        clearTelphone(){
            //清空输入的手机号
            if (this.tel){
              this.tel = "";
              this.isEntryTel = false;
            }
        },
        telChange(){
            //判断手机号个数
            if (this.tel.length == 11){
                this.isEntryTel = true;
            }else{
                this.isEntryTel = false;
            }
        },
        submit(){
          //  提交下一步
          if (this.tel.length == 0){
              //  手机号码为空
              this.showMsgbox('请输入下单时填写的手机号');
          }else{
              if (this.tel.length == 11 && (/^1[3|4|5|6|8|7|9]\d{9}$/).test(this.tel)){
                  //手机号码输入正确
                    this.judgeSubmit();

              }else{
                  //手机号码格式错误
                  this.showMsgbox('请输入正确的手机号');
              }
          }
        },
        postPhone(){
           //请求验证码
           let data = {
               tel: this.tel
           };
           this.$http.getAxio(process.env.API_HOST+this.$http.urlHead+'Transport/telVerify', 'post', this.$qs.stringify(data)).then(res => {

               if (res.status == 1){
                   //记录电话号码的sessionstorage
                   sessionStorage.setItem("tel", this.tel);
                   localStorage.removeItem('TIME_COUNT');
                   this.$router.replace({
                       //重定向
                       name: "identifyCode",
                       params: {
                           tel: this.tel
                       }
                   });
               }else{
                   this.showMsgbox(res.msg);
               }
           });
        },
        judgeSubmit(){
        //判断是否可以提交

          if (!localStorage.getItem("TIME_COUNT")){

                this.postPhone();
          }else{
              this.TIME_COUNT = new Date().getTime();
              let count = this.TIME_COUNT - parseInt(localStorage.getItem("TIME_COUNT"), 10);
              count = count / 1000; //转换成秒数
              let waitTime = 0;
              if (count < 60){
                  // count = parseInt(count, 10);
                  // waitTime = 60 - count;
                  // this.showMsgbox('请等'+ waitTime +'秒后再试');
                  this.$router.replace({
                      //重定向
                      name: "identifyCode",
                      params: {
                          tel: this.tel
                      }
                  });
              }else{
                this.postPhone();
              }
          }
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  *{
    margin: 0;
    padding: 0;
    border: 0;
    -webkit-tap-highlight-color:transparent;
  }
  body,html{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .login-wraper{
      margin-top: 60px;
  }
  input{
    -webkit-tap-highlight-color:transparent;
    -webkit-user-modify:read-write-plaintext-only;
    outline:0;
  }

  a {
    color: #42b983;
  }
  .login-main{
    width: 600px;
    margin-left: 75px;
    margin-top: 260px;
    /*border: 1px solid red;*/
    position: relative;
  }
  hr{
    width: 100%;
    height: 1px;
    background-color: #ccc;
    border: none;
    border-top: 2px solid #eee;
    margin-top: 20px;
  }

  .telEntry{
      caret-color:rgb(241,119,46) !important;
      width: 420px;
      height: 60px;
      font-size: 40px;
      letter-spacing: 4px;
      line-height: 60px;
      text-align: center;
      color: rgb(241,119,46);
  }
  .telEntry::-webkit-input-placeholder {
      font-size: 30px;
  }
  .telEntry::-moz-placeholder{
      font-size: 30px;
  }
  .telEntry:-moz-placeholder{
      font-size: 30px;
  }
  .telEntry::-ms-input-placeholder{
      font-size: 30px;
  }
  .telEntry:-ms-input-placeholder{
      font-size: 30px;
  }

  .clear{
    width: 40px;
    position: absolute;
    top: 10px;
    right: 20px;
  }
  .clear img{
    width: 100%;
  }
  .submit{
    width: 100%;
    height: 100px;
    margin-top: 40px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    color: white;
    font-size: 38px;
    line-height: 100px;
    background-color: #ccc;
  }
  .orange{
    background-color: rgb(241,119,46);
  }

</style>
