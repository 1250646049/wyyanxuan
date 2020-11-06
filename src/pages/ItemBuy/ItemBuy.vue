<template>

<transition name="fade">
<div class="container" v-show="isShow" >
    
    
    
    <div class="wrap"  >
        <div class="top">
            <img  :src="singleShop.primaryPicUrl" alt="">
            <div class="content">
                <div  class="name" >{{singleShop.name}}</div>
                <div  class="price" v-if="singleShop.gradientPrice">￥{{singleShop.gradientPrice.limitPrice}}</div>
                <div class="select"><span>已选择:</span>{{selectContent}}</div>

            </div>
        </div>
        <div @click="selectCurrent(item,index,$event)" class="center" v-for="(item,index) in singleShop.skuSpecList" :key="index">
            <p>{{item.name}}:</p>
                <span :class="isClass.indexOf(items.value)!=-1?'on':''" v-for="(items,indexs) in item.skuSpecValueList" :key="indexs" >{{items.value}}</span>
      

        </div>
        <div class="bottom">
            <p>数量:</p>
            <div class="number">
                <span class="dev" :class="number==1?'grey':''" @click="alterNumber(false)">-</span>
                <input type="text" v-model="number" disabled>
                <span class="add" @click="alterNumber(true)">+</span>
                <!-- <strong>限购一件</strong> -->
            </div>
        </div>

        <div class="end" @click="submit">
            确定
    </div>
     
</div>
  
<div class="mask" ref="mask" @click="isShow=false"  ></div>
</div>
</transition> 
</template>




<script>

import {mapState} from 'vuex'
import {Toast} from 'mint-ui'
import {SaveItemShop,getSessionItemShop} from '../../utils/Save'

export default {
data(){
    return{
        isShow:false,
        select:-1,
        selectObj:{},
        number:1,
        shopid:'',
        currentId:-1
    }
}
,
mounted(){
 
this.$allBus.$on("getShopId",(id)=>{
    // 根据id异步请求商品信息
    // 保存进session
  
    this.currentId=id
    this.opSession(id)
    this.$store.dispatch("GETSHOPDETAIL",id)
    
   
})
// 修改当前内容

this.$allBus.$on("alterCurrent",({id,value})=>{
    if(this.currentId==id){
        this.number=value
    }


})


},
computed:{
    ...mapState({
        singleShop:state=>state.Item.singleShop,
    }),
    selectContent(){
        var content=""
        var values=Object.values(this.selectObj);
        values.forEach(item=>{
            content+=(item+" ")
        })


        return content ;
    },

    isClass(){
        
        var values=Object.values(this.selectObj);
       
        return values
    }
}
,methods:{

opSession(id){
   if(this.shopid){
        
     if(this.selectObj){
         
            var sessionObjs={}
            sessionObjs.number=this.number
            sessionObjs.cartdetail=this.selectObj 
            SaveItemShop(sessionObjs,this.shopid)
           
                this.selectObj={}
                this.number=1
}
    }
    this.isShow=true
    this.shopid=id
    // 读取session的值
    if(getSessionItemShop(this.shopid)){
       let SessionItem=getSessionItemShop(this.shopid)
        this.number=SessionItem.number
        this.selectObj=SessionItem.cartdetail
       
        // sessionStorage.removeItem(this.shopid)
       
    }


}
,
selectCurrent(item,index,$event){
    let leibie=$event.target.textContent
   
    if (item.name+":"===leibie || $event.target.tagName=="DIV" ) return
   
    if(Object.values(this.selectObj).indexOf($event.target.textContent)!=-1){
        $event.target.classList.remove("on")
        this.$delete(this.selectObj,index)
        // console.log(index)
        return
    }
       this.$set(this.selectObj,index,$event.target.textContent)

},
// 提交商品

submit(){
var keys=Object.keys(this.selectObj)
// console.log(this.singleShop.skuSpecList)
var skuSpecList=this.singleShop.skuSpecList
if(keys.length==skuSpecList.length){
   Toast({
  message: '恭喜你,加入购物车成功！',
  iconClass: 'iconfont icon-chenggong',
  duration:2000
}); 

// 
this.opSession(this.shopid)
// 分发全局事件
this.$allBus.$emit("handlePage")
// 执行成功逻辑
let cartitem= window.localStorage.getItem("cartitem")
if(!cartitem){
    var items={}
    items[this.shopid]={number:this.number,s:this.selectContent}
    window.localStorage.setItem("cartitem",JSON.stringify(items))

}else  {
  let cartitem= JSON.parse(window.localStorage.getItem("cartitem"))
    if(cartitem[this.shopid]){
         cartitem[this.shopid]= {number:this.number,s:this.selectContent}
        window.localStorage.setItem("cartitem",JSON.stringify(cartitem))
    }else {
        cartitem[this.shopid]= {number:this.number,s:this.selectContent}
        window.localStorage.setItem("cartitem",JSON.stringify(cartitem)) 
    }
}

}else {
 
    for (var i=0;i<skuSpecList.length;i++){
        if(keys[i]!=i){
             
               Toast({
        message: "请选择"+skuSpecList[i].name
  
        }); 
            return
        }
    }
}


},

alterNumber(bool){
 if(bool){
this.number++

 }else {

if(this.number>1){
    this.number--
}else {
    
Toast({
  message: '此商品一件起售',
  position: 'center',
  duration: 2000
});
}

 }


}

},

watch:{



},


beforeDestroy(){
    
},



}


</script>


<style lang='stylus' scoped rel='stylesheet/stylus'>
.wrap

    position fixed
    z-index 999
    bottom 0
    
    width 100%
    background #fff
    
    box-sizing border-box
    .top
        padding 0 18px
        display flex
        img 
            width 120px
            height 120px
            background #F4F4F4
        .content 
            margin-top 20px
            margin-left 10px
            .name 
                font-size 20px
                margin-bottom 8px
            .price  
                color red
                font-size 16px
                font-weight 700
                margin-bottom 8px
                margin-top 20px
            .select 
                white-space nowrap
                overflow hidden
                text-overflow ellipsis
                margin-top 20px
                font-size 13px
                span
                    font-size 11px
    .bottom
         padding 0 18px
         margin-top 12px
         p
          font-size 14px
         .number
            margin 10px 0 
            span
                width 30px
                height 30px
                display inline-block
                background rgb(249,249,249)
                border 1px solid #ccc
                font-size 14px
                font-weight 600
                text-align center
                line-height 30px
                &.grey
                    color #ccc
            input 
                width 60px
                height 30px
                text-align center
                outline none 
                border 1px solid #ccc
            strong 
                margin-left 15px
              
    .center
            padding 0 18px
            margin-top 12px
            p
                font-size 14px
            span
                padding 8px 12px
                font-size 13px
                border 1px solid #ccc
                margin 8px 6px
                display inline-block
                &.on
                    color red
                    border 1px solid red
    .end
        height 40px
        text-align center
        color white
        background #DD1A21
        line-height 40px
        margin-top 5px
        font-size 16px 
            
.fade-enter-active,.fade-leave-active
     transition: opacity .5s
.fade-enter,.fade-leave-to
    opacity 0
.mask 
        
        background-color: rgba(0,0,0,.5);
        top 0
        bottom 0
        opacity .5
        
        position fixed
        width 100%
        z-index 998



        


</style>