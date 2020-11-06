

import {itemselect,selectclassify,onorder,getshopdetail} from '../Api/index'
import { ITEMSELECT,SELECTCLASSIFY,ONORDER,GETSHOPDETAIL } from './Mutations-type'

const state={
    itemcontent:{},
    classify:{},
    order:[],
    singleShop:{},
   

}


const mutations={
    
    [ITEMSELECT](state,data){
       state.itemcontent=data
    },
    [SELECTCLASSIFY](state,data){
        state.classify=data
    },
    [ONORDER](state,data){
        state.order=data
    },
    [GETSHOPDETAIL](state,data){
        state.singleShop=data
    },
   
}
const actions={
    async ITEMSELECT({commit},item){
       let data=  await itemselect(item)
    
            commit(ITEMSELECT,data.data)
    
        },
    
   async SELECTCLASSIFY({commit},id){         
         let data=await selectclassify(id)            
            commit(SELECTCLASSIFY,data)
            },
//下单请求 order
   async ONORDER({commit}){
    let data=  await onorder()
     
            commit(ONORDER,data.data)

    },
  async GETSHOPDETAIL({commit},id){
   let data=await getshopdetail(id)
  
        commit(GETSHOPDETAIL,data.data)

  },


}
const getters={
 
}

export default {

    state,
    mutations,
    getters,
    actions
}