<template>
    <div class="detail-wraper" v-if="loading">
        <div class="header">
            <div class="header-left">
                <img src="../assets/img/location.png" alt="">
            </div>
            <div class="header-right">
                <p>
                    <span v-if="name != ''">{{name}}</span>
                    <span class="tel" v-if="tel != ''">&nbsp;&nbsp;&nbsp;{{tel}}</span>
                </p>
                <p>{{addr}}</p>
            </div>
        </div>
        <ul class="detail-info">

            <li v-for="list in transportLists">
                <div class="info-left">
                    {{list.time}}
                    <p></p>
                    <img src="../assets/img/currentAddr.png" alt="" class="currentAddr">
                </div>
                <div class="info-right">
                    {{list.context}}
                </div>
            </li>
        </ul>
        <div class="empty"></div>
    </div>
</template>

<script>
    export default {
        name: "detailInfo",
        metaInfo: {
            title: '物流详情'
        },
        data(){
            return {
                tel: '',
                name: '',
                addr: '',
                transportLists: [],
                loading: false,
                orderId: null
            }
        },
        mounted(){
            if (sessionStorage.getItem('orderId')){
                this.orderId = sessionStorage.getItem('orderId');
            }else{
                this.orderId = this.$route.params.orderId;
                sessionStorage.setItem('orderId',this.$route.params.orderId);
            }

            let data = {
                orderId: this.orderId
            };
            this.$http.getAxio(process.env.API_HOST+this.$http.urlHead+'Transport/detailInfo', 'POST', this.$qs.stringify(data)).then(res => {
                console.log(res.status)
                if (res.status == 1){
                    this.tel = res.tel;
                    this.transportLists = res.transportList;
                    this.name = res.name;
                    this.addr = res.addr;
                    this.loading = true;
                }else if(res.status == -1){
                    //登录失效或未登录
                    this.$router.replace({
                        //重定向
                        name: "login"
                    });
                }else{
                    this.showMsgbox(res.msg);
                    setTimeout(() => {
                        this.$router.push({
                            //跳转到payList
                            name: "payList"
                        });
                    },2000);
                }
            });
        },
        methods :{
            showMsgbox(msg){
                //弹框函数
                this.$msgbox({
                    content:msg,
                    className:'pop-custom'
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .detail-wraper{
        width: 700px;
        font-size: 28px;
        margin-left: 25px;
        margin-top: 60px;
        position: relative;
        .header{
            width: 100%;
            display: table;
            overflow: hidden;
            color: rgb(241,119,46);
            .header-left{
                width: 150px;
                display: table-cell;
                vertical-align: top;
                overflow: hidden;
                padding-right: 5px;
                box-sizing: border-box;
                img{
                    vertical-align: middle;
                    width: 30px;
                    float: right;
                }
            }
            .header-right{
                width: 550px;
                display: table-cell;
                vertical-align: middle;
                text-align: left;
                padding: 0 25px;
                box-sizing: border-box;
                line-height: 40px;
                p{
                    padding-bottom: 5px;
                    .tel{
                        font-size: 24px;
                        /*color: #666;*/
                    }
                }
            }
        }
        .detail-info{
            width: 100%;
            margin-top: 40px;
            position: relative;
            li{
                width: 100%;
                display: table;
                position: relative;
                color: #999;
                .info-left{
                    display: table-cell;
                    width: 135px;
                    padding: 50px 0;
                    padding-bottom: 10px;
                    padding-right: 35px;
                    vertical-align: top;
                    box-sizing: border-box;
                    text-align: right;
                    position: relative;
                    border-right: 2px solid #999;
                    p{
                        width: 10px;
                        height: 10px;
                        border-radius: 5px;
                        position: absolute;
                        top: 63px;
                        right: -6px;
                        background-color: #999;
                    }
                    .currentAddr{
                        display: none;
                    }
                }
                .info-right{
                    display: table-cell;
                    width: 615px;
                    padding: 50px 25px;
                    padding-bottom: 10px;
                    padding-left: 45px;
                    vertical-align: top;
                    text-align: left;
                }
            }
            li:first-child{
                color: rgb(241,119,46);
                .info-left{
                    border-right: 2px solid rgb(241,119,46);
                    p{
                        background-color: rgb(241,119,46);
                    }
                    .currentAddr{
                        display: inline;
                        width: 30px;
                        position: absolute;
                        top: -10px;
                        right: -17px;
                    }
                }
            }
        }
        .empty{
            width: 100px;
            height: 60px;
        }
    }
</style>