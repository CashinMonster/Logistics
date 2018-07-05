
<template>
    <div class="payList-wraper" ref="wraper">
        <router-link to="/login" class="header-link" v-if="lists != ''">
            <div class="header">
                <img :src="headerImg" alt="">
            </div>
            <span class="tel">{{ tel | hideMiddle }}</span>
        </router-link>
        <router-link to="/login" class="changeTel" v-if="lists != ''">更换手机号</router-link>
        <p v-if="lists == ''" class="list-empty">
            无物流记录
        </p>
        <ul class="all-lists" v-else>
            <li class="list-item" v-for="list in lists" :data-id="list.orderId" :data-status="list.status" @click="toDetail($event,list.orderId,list.status)">
                <div class="item-left">
                    <img v-lazy="getResServerUrl(list.home_picture)" :onerror="defaultImg" alt="">
                </div>
                <div class="item-right">
                    <p class="product-name">{{ list.productName }}</p>
                    <p class="price-info">
                        <span class="price" v-if="list.unitPrice > 0 && list.isWheel == 0">￥{{list.unitPrice}}</span>
                        <span class="count" v-if="list.isWheel == 0">&nbsp;&nbsp;x{{list.count}}</span>
                        <span class="total" v-if="list.isWheel == 0">
                            ￥<a href="javascript:void(0);">{{list.price}}</a>
                        </span>
                    </p>
                    <p class="specification" v-if="list.specification != ''">
                        ·规格:{{list.specification}}
                    </p>
                    <p class="transportStatus">
                        ·物流状态:{{list.transportStatus}}
                    </p>
                </div>
            </li>
        </ul>

        <div class="scrollTrue" v-if="loadmoreBol">
            <img src="../assets/img/loadMore.gif" alt="">
            加载中，请稍候
        </div>
        <p class="scrollFalse" v-if="lists != '' && !loadmoreBol">{{txt}}</p>
    </div>
</template>

<script>
    export default {
        name: "payList",
        metaInfo: {
            title: '物流中心'
        },
        data() {
            return {
                tel: '***',  //手机号码
                headerImg: '',  //头像图片
                defaultImg: 'this.src="' + require('../assets/img/miss.png') + '"', //图片出错时的默认图片
                page: 1,  //显示页数
                numPerPage: 9,  //每次展示的个数
                loading: false,  //页面是否加载完毕
                lists: [],  //物流订单数组
                scroll: true,   //是否可以加载更多
                loadmoreBol: false,  //显示加载中还是上拉加载更多 (true：加载中，false：上拉加载更多)
                txt: '上拉加载更多',  //底部加载文案
                timer: null   //加载更多延时定时器
            }
        },
        beforeCreate(){
            document.getElementsByTagName("body")[0].setAttribute("style","background-color:#efefef");
        },
        mounted(){
            let _this = this;  //解决this指向问题
            this.getData();  //获取首页内容

            window.addEventListener('scroll',function (){
                //监听滚动事件
                _this.handleScroll();
            });

        },
        destroyed(){
            document.getElementsByTagName("body")[0].setAttribute("style","background-color:white");
            window.removeEventListener('scroll',function (){
                //关闭此页面时关闭滚动事件的监听
                _this.handleScroll();
            });
        },
        methods: {
            showMsgbox(msg){
                //弹框函数
                this.$msgbox({
                    content:msg,
                    className:'pop-custom'
                });
            },
            toDetail (e,id,status){
                //  id为orderId
                if(status == -1 || status == 1){
                    this.showMsgbox('待发货，快递小哥正在准备中');
                }else if (status == 0){
                    this.showMsgbox('查询不到记录，请稍后再试');
                }else if (status == 99){
                    //订单首次查询接口失败
                    this.showMsgbox('订单正在查询，请稍后再试');
                }else{
                    //跳转详情页
                    sessionStorage.removeItem('orderId');
                    this.$router.push({
                        name: "detailInfo",
                        params: {
                            orderId: id
                        }
                    });
                }
            },
            getResServerUrl(url) {
                return process.env.RESOURCE_HOST+url;
            },
            getData (){
                let data = {
                    pageNum: this.page,
                    numPerPage: this.numPerPage
                };
                this.$http.getAxio(process.env.API_HOST+this.$http.urlHead+'Transport/showListAlreadyPay', 'POST', this.$qs.stringify(data)).then(res => {

                    if (res.status == 1){
                        this.tel = res.tel;
                        this.lists = res.data;
                        this.headerImg = res.photoUrl;
                        this.loading = true;
                        if (res.data.length < this.numPerPage){
                            this.scroll = false;
                            this.txt = "暂无更多数据";
                        }
                    }else if (res.status == -1){
                        //登录失效或未登录
                        this.$router.replace({
                            //重定向
                            name: "login"
                        });
                    }else{
                        this.showMsgbox(res.msg);
                    }
                });
            },
            handleScroll (){
                //处理滚动事件函数

                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                //触发条件：滚动条距离顶部的距离加可视窗口的高度大于等于页面内容总高度的时候
                if(scrollTop + document.documentElement.offsetHeight >= document.documentElement.scrollHeight){
                    //未 全部加载完时
                    if (this.scroll){
                        this.loadmoreBol = true;  //显示loading加载中
                        if (!this.timer){
                            this.timer = setTimeout(() =>{
                                this.loadMore();
                            },700);
                        }
                    }else{
                        this.loadmoreBol = false;
                    }

                }else{
                    // this.scroll=false;
                    // this.loadmoreBol = false;
                }

            },
            loadMore (){
                //获取更多数据请求
                let _this = this;
                _this.page++;
                let data = {
                    pageNum: _this.page,
                    numPerPage: _this.numPerPage
                };

                _this.$http.getAxio(process.env.API_HOST+_this.$http.urlHead+'Transport/showListAlreadyPay', 'POST', _this.$qs.stringify(data)).then(res => {

                    if (res.status == 1){

                        res.data.forEach(function (val,index){
                            _this.lists.push(val);
                        });
                        if (res.data.length < _this.numPerPage){
                            //数据不够展示一页的
                            _this.scroll = false;
                            _this.loadmoreBol = false;
                            _this.txt = "暂无更多数据";

                        }else {
                            //还有数据，或者最后的数据刚好{{numPerPage}}个
                            _this.scroll = true;
                            _this.loadmoreBol = false;
                            _this.txt = "上拉加载更多";
                        }
                    }else{
                        // _this.showMsgbox(res.msg);
                        _this.scroll = false;
                        _this.loadmoreBol = false;
                        _this.txt = "上拉加载更多";
                    }
                    clearTimeout(_this.timer);
                    _this.timer = null;
                })
                    .catch(function (error){
                        _this.scroll = false;
                        console.log(error)
                    });
            }
        },
        filters: {
            hideMiddle(val) {
                return `${val.substring(0,3)}****${val.substring(val.length-4)}`
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
    .payList-wraper{
        width: 96%;
        position: absolute;
        margin-top: 35px;
        left: 2%;
        .changeTel{
            color: rgb(241,119,46);
            font-size: 24px;
            position: absolute;
            right: 0;
            top: 38px;
        }
        .list-empty{
            margin-top: 400px;
            font-size: 30px;
            color: #ccc;
        }
        .header-link{
            color: #333;
            width: 300px;
            height: 100px;
            display: block;
        }
        .header{
            width: 100px;
            height: 100px;
            border: 3px solid rgb(241,119,46);
            border-radius: 50px;
            box-sizing: border-box;
            position: relative;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
            }
        }
        .tel{
            position: absolute;
            left: 120px;
            top: 34px;
            font-size: 30px;
        }
        .all-lists{
            margin-top: 35px;
            .list-item{
                width: 100%;
                display: table;
                position: relative;
                margin-top: 20px;
                background-color: white;
                border-radius: 5px;
                box-shadow:10px 10px 10px #ccc;
                .item-left{
                    display: table-cell;
                    vertical-align: middle;
                    width: 30%;
                    position: relative;
                    top: 0;
                    left: 0;
                    img{
                        width: 90%;
                        vertical-align: middle;
                    }
                }
                .item-right{
                    display: table-cell;
                    width: 70%;
                    padding: 25px;
                    font-size: 24px;
                    position: relative;
                    top: 0;
                    right: 0;
                    box-sizing: border-box;
                    p{
                        margin-bottom: 10px;
                    }
                    .product-name{
                        font-size: 28px;
                        text-align: left;
                    }
                    .price-info{
                        width: 100%;
                        text-align: left;
                        position: relative;
                        .price{
                            color: rgb(241,119,46);
                        }
                        .count{
                            color: #999;
                        }
                        .total{
                            position: absolute;
                            right: 0;
                            top: -5px;
                            color: #333;
                            font-size: 28px;
                            font-weight: 500;
                            a{
                                font-size: 36px;
                                color: #333;
                                text-decoration: none;
                            }
                        }
                    }
                    .specification{
                        color: #999;
                        text-align: left;
                    }
                    .transportStatus{
                        color: rgb(241,119,46);
                        text-align: left;
                        margin-bottom: 0;
                    }
                }
            }
        }
        .scrollFalse{
            width: 100%;
            padding: 20px 0;
            margin: 10px 0;
            font-size: 26px;
            color: #666;
        }
        .scrollTrue{
            width: 100%;
            padding: 20px 0;
            margin: 10px 0;
            font-size: 26px;
            color: #666;
            line-height: 30px;
            position: relative;
            img{
                width: 28px;
                position: relative;
                top: 5px;
            }
        }
    }

</style>