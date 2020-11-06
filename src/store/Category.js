import {GETCATEGORY,SELECTINDEX,GETSHOPITEM,GETCATEGORYSHOP} from './Mutations-type'

import {getcategory,getshopitem,getcategoryshop} from '../Api/index'
const  state={
 categoryGroupLis:[],
  categoryL1List:[],
  currentCategory:{},
  categoryL2List:[],
  position:[],
  itemList:[],
  shopItem:{}

}

const mutations={
[GETCATEGORY](state,data){
  state.categoryL1List=data.categoryL1List
  state.currentCategory=data.currentCategory
  state.categoryGroupLis=data.categoryGroupList
  state.categoryL2List=data.categoryL2List

},
[SELECTINDEX](state,data){
  state.position=data
},

[GETSHOPITEM](state,data){
  state.itemList=data.categoryItems.itemList
}
,
// 获取分类的商品详情信息
[GETCATEGORYSHOP](state,data){
  state.shopItem=data
}
}


const actions={
   async GETCATEGORY({commit},id){
        if(!id) id=11;
     let data=await getcategory(id)

     commit(GETCATEGORY,data.data)
    },

    // 寻找当前的下标
    SELECTINDEX({commit,state},id){
      let position=[]
      state.categoryGroupLis.forEach((item,index)=>{
        item.categoryList.forEach((items,indexs)=>{
          if(items.id==id){
            position.push(index)
            position.push(indexs)
          }
        })
        
      })
     if(position.length>1){
       commit(SELECTINDEX,position)
       
     }

    }
    ,

   async GETSHOPITEM({commit},{id,cateid}){
       let data=await getshopitem({id,cateid})
       commit(GETSHOPITEM,data.data)
    }
,
  async GETCATEGORYSHOP({commit},id){
  let data=await getcategoryshop(id)

    commit(GETCATEGORYSHOP,data.data)

  }

}



const getters={


}

export default {
state,
mutations,
actions,
getters


}