
<template>
    <div class="payList-wraper" ref="wraper" v-if="loading">
        <router-link to="/login" class="header-link">
            <div class="header">
                <img :src="headerImg" alt="">
            </div>
            <span class="tel">{{ tel | hideMiddle }}</span>
        </router-link>
        <router-link to="/login" class="changeTel">更换手机号</router-link>
        <p v-if="lists == ''" class="list-empty">
            无物流记录
        </p>
        <ul class="all-lists" v-else>
            <li class="list-item" v-for="list in lists" :data-id="list.orderId" :data-status="list.status" @click="toDetail($event,list.orderId,list.status)">
                <div class="item-left">
                    <img :src="list.home_picture" alt="">
                </div>
                <div class="item-right">
                    <p class="product-name">{{ list.productName }}{{list.orderId}}</p>
                    <p class="price-info">
                        <span class="price" v-if="list.unitPrice > 0 && list.isWheel == 0">￥{{list.unitPrice}}</span>
                        <span class="count" v-if="list.count > 0">&nbsp;&nbsp;x{{list.count}}</span>
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
                tel: '***',
                headerImg: '../assets/img/header.png',
                page: 1,
                numPerPage: 7,
                loading: false,
                lists: [],
                scroll: true
            }
        },
        beforeCreate(){
            document.getElementsByTagName("body")[0].setAttribute("style","background-color:#efefef");
        },
        mounted(){
            let _this = this;
            this.getData();

            window.addEventListener('scroll',function (){
                console.log(1111);

                _this.handleScroll();
            });
        },
        destroyed(){
            document.getElementsByTagName("body")[0].setAttribute("style","background-color:white");
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
                }else{
                    //跳转详情页
                    this.$router.push({
                        name: "detailInfo",
                        params: {
                            orderId: id
                        }
                    });
                }
            },
            getData (){
                let data = {
                    pageNum: this.page,
                    numPerPage: this.numPerPage
                };
                this.$http.getAxio(process.env.API_HOST+this.$http.urlHead+'Transport/showListAlreadyPay', 'POST', this.$qs.stringify(data)).then(res => {
                    console.log(res.status)
                    if (res.status == 1){
                        console.log('success');
                        this.tel = res.tel;
                        this.lists = res.data;
                        this.headerImg = res.photoUrl;
                        this.loading = true;
                        if (res.data.length < this.numPerPage){
                            this.scroll = false;
                        }
                    }else if (res.status == -1){
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
                // console.log(222)
                if(document.documentElement.scrollTop+document.documentElement.clientHeight>= document.documentElement.scrollHeight){
                    this.page +=1;
                    this.loadMore();
                }else{
                    this.scroll=false;
                }

            },
            loadMore (){
                let _this = this;
                let data = {
                    pageNum: _this.page,
                    numPerPage: _this.numPerPage
                };
                if (_this.scroll){
                    _this.$http.getAxio(process.env.API_HOST+_this.$http.urlHead+'Transport/showListAlreadyPay', 'POST', _this.$qs.stringify(data)).then(res => {
                        console.log(res.status)
                        if (res.status == 1){
                            alert(_this.page);
                            res.data.forEach(function (val,index){
                                _this.lists.push(val);
                            });
                            if (res.data.length < _this.numPerPage){
                                //数据不够展示一页的
                                _this.scroll = false;
                            }else {
                                _this.scroll = true;
                            }
                        }else{
                            _this.showMsgbox(res.msg);
                        }
                    })
                        .catch(function (error){
                            console.log(error)
                        })
                }

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
        margin-top: 60px;
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
            margin-top: 20px;
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

    }

</style>