import {allcategory} from "../Api/index"
import { ALLCONTENT } from './Mutations-type'


const state={
    category:["推荐","居家生活","服饰鞋包","美食酒水","个护清洁","母婴清洁","运动旅行"],
    lunbo:["https://yanxuan.nosdn.127.net/fbb75aa5dfea5242193b16beb6c112a3.jpg?type=webp&imageView&quality=75&thumbnail=750x0","https://yanxuan.nosdn.127.net/0f7ec0253d559b40f6cd8c9566fdce32.jpg?type=webp&imageView&quality=75&thumbnail=750x0","https://yanxuan.nosdn.127.net/6d7a9ead6d98dafef2136678ca326fb9.jpg?type=webp&imageView&quality=75&thumbnail=750x0"],
    title:[{
        name:"淮源自营品牌",
        icon:"https://yanxuan.nosdn.127.net/a03dd909803b9ac032eba58b7253a2f6.png"
    },
    {
        name:"30天无忧退货",
        icon:"https://yanxuan.nosdn.127.net/2d0402ffcd52b3ec3b07422681c42a89.png"
    },
    {
        name:"48小时快速退款",
        icon:"https://yanxuan.nosdn.127.net/eb61ee48e8942dbd1784c9ee75ebe955.png"
    },
],
   Mister:{},
   
 

}

const mutations={
    [ALLCONTENT](state,data){
      
        state.Mister=data
      
    }

}

const actions={
   async ALLCONTENT({commit}){
        // Axios.get("/api/xhr/index.json?__timestamp=1603773666436&")
        // .then((response)=>{
         
        //    commit(ALLCONTENT,response.data.data.data)
        // }).catch((error)=>{
        //     console.log(error.message)
        // })
      let data=await allcategory()
      commit(ALLCONTENT,data.data.data)
    },

  

}


const getters={


}

export default {
    state,
    getters,
    mutations,
    actions

}