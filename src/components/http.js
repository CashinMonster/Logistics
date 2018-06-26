import axios from 'axios'  //axios
//var test="/Wechatadmin/WechatDevApi/public/index.php";  //正式
var urlHead="/wxzspfse/trunk/index.php/Home/";   //IP访问
export default {
    getAxio(url,method,data){
        return axios({
            url: url,
            method: method,
            data: data
            // headers: {'X-Requested-With': 'XMLHttpRequest'},   //若需要ajax请求，可加这个header
        })
            .then(res => {
                return res.data;
            })
    },
    urlHead:urlHead
}