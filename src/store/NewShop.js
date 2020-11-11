
import {GETLISTDATA} from './Mutations-type'
import {getListData} from '../Api/index'
const state={
    ListData:{}

}

const mutations={
[GETLISTDATA](state,data){

   state.ListData=data
}

}

 const actions={
    //  获取大图
   async GETLISTDATA({commit}){
     let data= await getListData()
    
    commit(GETLISTDATA,data)
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