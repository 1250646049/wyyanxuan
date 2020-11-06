

function Anaylazy(data,id){
    let datas=JSON.parse(data)
  
    let obj={}
   
    let avater,niknamae,content_img
         ,contents,goodid,content_title=""
     datas.forEach((item,index)=>{
         let json=item.json
         
         if(json.headPic){
             avater=json.headPic ||"https://yanxuan.nosdn.127.net/42b66be616a048d3b0c9816324e92bb1.jpg"
         }
          if(json.nickName){
             niknamae=json.nickName
         }
         if(json.image){
             content_img=json.image
         }
         if(json.description){
            contents=decodeURIComponent(json.description)
         }
         if(json.goodsId){
            goodid=json.goodsId
         }
         if(json.title){
            content_title=decodeURIComponent(json.title)
         }
     })
    
    obj={
        avater:avater,
        niknamae:niknamae,
        content_img:content_img,
        contents:contents,
        goodsId:goodid,
        content_title:content_title,
        id:id
    }

    return obj


}

export {
    Anaylazy 
}