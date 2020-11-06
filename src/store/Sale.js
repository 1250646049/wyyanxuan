
import {gettodaysale,getbananer,getShop} from '../Api/index'

import {GETTODAYSALE,GETBANANER,GETSHOPS} from './Mutations-type'


const state={
    screenList:[],
    banner:[],
    itemList:{}
}

const mutations={
    [GETTODAYSALE](state,data){
        state.screenList=data
    },
    [GETBANANER](state,data){
        state.banner=data
    },
    [GETSHOPS](state,data){
        state.itemList=data
    }
}


const actions={
   async GETTODAYSALE({commit}){
           let data=await gettodaysale()
           commit(GETTODAYSALE,data.data.screenList)

    },

    async GETBANANER({commit}){
       let data=await getbananer()
       commit(GETBANANER,data.data)
       
    },
    async GETSHOPS({commit},id){
        let data=await getShop(id)
        console.log(data.data)
       commit(GETSHOPS,data.data)
    }


}

const getters={


}

export default{
state,
mutations,
actions,
getters

}