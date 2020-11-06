import {setitemshop}from '../Api/index'
import {SETITEMSHOP,SETCOUNTORNUMBER} from './Mutations-type'
import Vue from 'vue'
const state={
  totalNumber:0,
  totalPrice:0.0,  
  cartshop:{}

}


const mutations={
    [SETITEMSHOP](state,data){     
        Vue.set(state.cartshop,data.id,[data.id,data.data,data.number])

    },
    [SETCOUNTORNUMBER](state,arrs){
        state.totalNumber=0
        state.totalPrice=0.0
     let values=Object.values(state.cartshop)
  
      arrs.forEach(item => {
        state.totalNumber+=values[item][2].number
        state.totalPrice+=Math.round((values[item][1].retailPrice*values[item][2].number))
        
      });


}
}

const actions={
  async SETITEMSHOP({commit},{id,number}){
    // Axios.get("/api/xhr/item/detailForSpec.json?__timestamp=1603889177850&id="+id+"")
    // .then((response)=>{
    //     commit(SETITEMSHOP,{data:response.data.data,number:number,id})
    // })
    // .catch((error)=>{
    //     console.log(error.message)
    // })
     let data= await setitemshop(id)
     commit(SETITEMSHOP,{data:data.data,number:number,id})
  }


}

const getters={
    totalNumbers(){
        return 1
    }

}

export default {
    state,
    mutations,
    actions,
    getters
}