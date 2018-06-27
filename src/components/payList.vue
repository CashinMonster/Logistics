
<template>
    <div class="payList-wraper">
        <router-link to="/login" class="header-link">
            <div class="header">
                <img src="../assets/img/header.png" alt="">
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
                    <p class="product-name">{{ list.productName }}</p>
                    <p class="price-info">
                        <span class="price">￥{{list.unitPrice}}</span>
                        <span class="count">&nbsp;&nbsp;x{{list.count}}</span>
                        <span class="total">
                            ￥<a href="javascript:void(0);">{{list.price}}</a>
                        </span>
                    </p>
                    <p class="specification">
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
                tel: '15221097556',
                headerImg: '../assets/img/header.png',
                page: 1,
                numPerPage: 10,
                loading: false,
                lists: [
                    {
                        "orderId":777,
                        "productName": "商品1",
                        "home_picture":"data:image/png;base64,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",
                        "unitPrice":"100",
                        "price": "100",
                        "count": "1",
                        "specification": "规格",
                        "transportStatus":"已发货",
                        "status": "1"
                    },
                    {
                        "orderId":888,
                        "productName": "商品2",
                        "home_picture":"data:image/png;base64,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",
                        "unitPrice":"100",
                        "price": "100",
                        "count": "1",
                        "specification": "规格",
                        "transportStatus":"已发货",
                        "status": "0"
                    }
                ]
            }
        },
        beforeCreate(){
            document.getElementsByTagName("body")[0].setAttribute("style","background-color:#efefef");
        },
        created(){
            this.getData();
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
                    }else if (res.status == -1){
                        this.$router.replace({
                            //重定向
                            name: "login"
                        });
                    }else{
                        this.showMsgbox(res.msg);
                    }
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
    body{
        background-color: #eee;
    }
    .payList-wraper{
        width: 96%;
        position: absolute;
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