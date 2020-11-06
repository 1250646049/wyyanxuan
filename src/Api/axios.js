import axios from 'axios'
import {Indicator} from 'mint-ui'


 const instantion=axios.create({
    timeout:10000
})

instantion.interceptors.request.use((config)=>{
    // Indicator.open()
    // 有可能后台不支持postjson对象传输，所以转为urlencoded
    if(config.data instanceof Object){
        let url=""
        for( var i in config.data){
            url+=("&"+i+"="+config.data[i])
            
        }
        url=url.substring(1)
        config.data=url
    }
  return config;
})

instantion.interceptors.response.use(
    response=>{
        Indicator.close()
     return response.data
    },
    error=>{
        Indicator.close()
        alert("请求出错"+error.message)
        return new Promise(()=>{})
    }
)


export default instantion