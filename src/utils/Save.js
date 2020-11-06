


 function SaveItemShop(obj,item){

    window.sessionStorage.setItem(item,JSON.stringify(obj))

}

function getSessionItemShop(id){
   
    if(sessionStorage.getItem(id)){
       
       let  shopItem=JSON.parse(sessionStorage.getItem(id))
        if(shopItem &&!Object.values(shopItem.cartdetail).length) return false
        
        return shopItem
    }
    return false

}


// 读取local

function readLocal(){


    return JSON.parse(window.localStorage.getItem("cartitem"))
}

// 删除localstorage和vuex的内容

function deleteContent(id){
  
 let cartitem= JSON.parse(window.localStorage.getItem("cartitem"))
 if( cartitem&&Object.keys(cartitem).length==1){
   
   window.localStorage.removeItem("cartitem")
   window.location.reload()
   return;
 }
 if(cartitem[id]){
     delete cartitem[id]
    localStorage.setItem("cartitem",JSON.stringify(cartitem))
    window.location.reload()

 }
}
//  修改localstorage and sessionstorage

function alterContent(id,number){
   
  let cartitem=  JSON.parse(window.localStorage.getItem("cartitem"))
  if(cartitem[id]){
    cartitem[id].number=number
    window.localStorage.setItem("cartitem",JSON.stringify(cartitem))
  }

  let sessionContent=JSON.parse(window.sessionStorage.getItem(id))
  if(sessionContent){
    sessionContent['number']=number
    window.sessionStorage.setItem(id,JSON.stringify(sessionContent))
  }



    }







export {
    SaveItemShop,
    getSessionItemShop,
    readLocal,
    deleteContent,
    alterContent

}