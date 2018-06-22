<template>
  <div class="login-wraper">
    <!--<h1>{{ msg }}</h1>-->
    <!--<h2>Essential Links</h2>-->
    <div class="login-main">
      <input type="tel" maxlength="11" placeholder="请输入手机号" v-model="tel" class="telEntry" @change="telChange()">
      <hr>
      <a href="javascript:void(0);" id="clear" class="clear" @click.stop="clearTelphone()">
        <img src="../assets/img/clear.png" alt="清空输入手机号">
      </a>
      <div class="submit" v-bind:class="{orange : isEntryTel}" id="submit" @click.stop="submitPhone()">下一步</div>
    </div>
    <div>
      <label id="msgbox" @click.stop="showMsgbox">点击我显示msgbox</label>
    </div>
  </div>

</template>


<script>

  export default {
    name: 'login',
    data () {
      return {
        tel:'',
        isEntryTel: false
      }
    },
    methods: {
      clearTelphone(){
        if (this.tel){
          this.tel = "";
          this.isEntryTel = false;
        }
      },
      telChange(){
        if (this.tel.length == 11){
          this.isEntryTel = true;
        }
      },
      submitPhone(){

      },
      showMsgbox(){
        this.$msgbox({
          title:'温馨提示',
          cancel:'取消',
          content:'这里是消息弹出内容',
          confirm:'确定按钮',
          className:'pop-custom'
        }).then(()=>{
          console.log("我点击了确定按钮")
        }).catch((err)=>{
          console.log("error");
        })
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

  input{
    -webkit-tap-highlight-color:transparent;
    -webkit-user-modify:read-write-plaintext-only;
    outline:0;
  }
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .login-main{
    width: 600px;
    margin-left: 75px;
    margin-top: 300px;
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
    caret-color:rgb(241,119,46);
    width: 400px;
    height: 60px;
    font-size: 40px;
    line-height: 60px;
    text-align: center;
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
