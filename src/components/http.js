import axios from 'axios';  //axios
var urlHead="/wxzspfse/trunk/index.php/Home/";   //IP访问

export default {
    getAxio(url,method,data){
        return axios({
            url: url,
            method: method,
            data: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'  //不加这段，post请求的时候数据，后台接收不到数据
                // 'X-Requested-With': 'XMLHttpRequest'  //若需要ajax方式的请求，可加这个header
            }
        })
        .then(res => {
            return res.data;
        })
    },
    urlHead:urlHead
}