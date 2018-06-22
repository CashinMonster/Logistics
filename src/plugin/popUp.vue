<template>
  <transition name="msgbox">
    <div v-if="show" class="msgbox-container" :class="className">
      <div class="msgbox-bg"></div>
      <div class="content-body">
        <div>{{content}}</div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    data () {
      return {
        show: false,    //为true时弹框弹出，false弹框消失
        content: '',    //弹框信息内容
        className:''
      }
    },
    watch:{
      show (val) {
        if (val) {
          if(!this.hasClass(document.body,"pop-mask")){
            this.addClass(document.body,"pop-mask");
          }
        }else{
          this.removeClass(document.body,"pop-mask");
        }
      }
    },
    beforeMount () {
      //如果已经存在，则阻止出现第二次
      let node = document.querySelector('.msgbox-container')
      if (node && node.parentNode) {
        node.parentNode.removeChild(node)
      }
    },
    methods: {

      addClass(obj, cls){
        var that = this;
        var obj_class = obj.className,
          blank = (obj_class != '') ? ' ' : '';
        var added = obj_class + blank + cls;
        that.showBg = true;
        obj.className = added;
        //弹框显示1.5s
        setTimeout(function (){
          that.show = false;   //弹框消失
        },1500);
      },
      removeClass(obj, cls){
        var obj_class = ' '+obj.className+' ';
        obj_class = obj_class.replace(/(\s+)/gi, ' ');
        var removed = obj_class.replace(' '+cls+' ', ' ');
        removed = removed.replace(/(^\s+)|(\s+$)/g, '');
        obj.className = removed;//替换原来的 class.
      },
      hasClass(obj, cls){
        var obj_class = obj.className,
          obj_class_lst = obj_class.split(/\s+/);
        var x = 0;
        for(x in obj_class_lst) {
          if(obj_class_lst[x] == cls) {
            return true;
          }
        }
        return false;
      }
    }
  }
</script>
<style lang="scss" scoped>
  .msgbox-container{
    position: fixed;
    top:500px;
    left:50%;
    width: 300px;
    min-height: 100px;
    padding: 40px;
    background: rgba(0,0,0,.6);
    color: white;
    border-radius: 20px;
    transform:translate(-50%,-50%) scale(1, 1);
    .msgbox-bg{
      width: 800%;
      height: 800%;
      position: fixed;
      top: -300%;
      left: -300%;
    }
    .content-body{
      font-size: 30px;
      margin: 20px 10px;
      line-height: 40px;
      overflow-y: auto;
      color: white;
      div{
        /*padding: 0 1rem;*/
        text-align: center;
        word-break: break-all;
      }
    }
  }
  .msgbox-enter,.msgbox-leave-to{
    -webkit-transform:  translate(-50%,-50%) scale(0,0);
  }
  .msgbox-enter-active,.msgbox-leave-active{
    -webkit-transition: all .3s;
    transition: all .3s;
  }
  .msgbox-enter-to,.msgbox-leave{
    -webkit-transform:  translate(-50%,-50%) scale(1,1);
  }
</style>
