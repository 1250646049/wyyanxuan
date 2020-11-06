
import {getdeservecate,getdetails,getdetailallow,getcurrentcontent,getgulpid,login} from '../Api/index'
import {GETDESERVECATE,GETDETAILS,GETDETAILALLOW,GETCURRENTCONTENT,GETGULPID} from './Mutations-type'
import {Anaylazy} from '../utils/AnaylazisCode'
const state={
  category:[],
  DeserveBuy:[],
  AllowArray:[],
  ContentData:{},
  // 请求推荐商品信息
  // 当前推荐的商品
  currentshop:[]

}

const mutations={
  [GETDESERVECATE](state,data){
    state.category=data
  },
  [GETDETAILS](state,data){
   
    if(state.DeserveBuy.length==0){
      state.DeserveBuy=data
    }else {
      state.DeserveBuy.forEach((item,index)=>{
        data.forEach((items,indexs)=>{
          items.forEach((itemss)=>{
            if(index==indexs){
              item.push(itemss)
            }
          })
        })
      })
    }
 
  },

  [GETDETAILALLOW](state,data){
    state.AllowArray=data
  },
  [GETCURRENTCONTENT](state,data){
    state.ContentData=data
   
  },
  [GETGULPID](state,data){
    state.currentshop=data
  },
  clearGETDETAILS(state){
    console.log(1)
    state.DeserveBuy=[]
  }
}

const actions={
    async GETDESERVECATE({commit}){
        let data =await getdeservecate()
        let cateArr=data.data.navList
        let cateArrTwo=[]
        let arr=[]
        // 将一维数组变成二维数组
        cateArr.forEach((item,index)=>{
              arr.push(item)
              if(index/7==1 || index==cateArr.length-1){
                cateArrTwo.push(arr)
                 arr=[]
              }
        })
        commit(GETDESERVECATE,cateArrTwo)
    },

   async GETDETAILS({commit},{page,size}){
      let data= await getdetails(page,size)
          let arrs=[]
          let result=data.data.result
          console.log(result)
          result.forEach((item)=>{
              let arr=[]
               
              arr=  item.topics.reduce((pre,items)=>{  
                 pre.push(items)
                 return pre
               },[])
               if(item.look){
                arr.push(item.look)      
              }
              arrs.push(arr)
          })
          
          commit(GETDETAILS,arrs)
    },

    // 详情内容页允许上下滑动的数组

    async GETDETAILALLOW({commit},id){
   
     let data= await getdetailallow()
 
         let arrs=data.data
        let index= arrs.findIndex(item=>(item==id))
        let newArr=[]
        let random=Math.floor(Math.random()*(0+arrs.length)-1)
       
        if(index>=0 && index <arrs.length-1){
          newArr.push(arrs[index-1])
          newArr.push(arrs[index+1])
        }else if(index==0) {
            newArr.push(arrs[random])
            newArr.push(arrs[index+1])
        }else {
          newArr.push(arrs[index-1])
          newArr.push(arrs[random])
        }
    
        commit(GETDETAILALLOW,newArr)
    
     
    },

    //获取详情页当前要展示的数据
   async GETCURRENTCONTENT({commit},id){
    
     let data=await getcurrentcontent(id)
       let contents=  Anaylazy(data.data.moduleInfo,id) 
       commit(GETCURRENTCONTENT,contents)

    },

  async  GETGULPID({commit},id){
    let data= await getgulpid(id)
      
    commit(GETGULPID,data.result[0].goodsList)
    },




    

}

const getters={

}

export default {
    state,mutations,actions,getters
}