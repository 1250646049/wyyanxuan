<template>


<div class="wrap">
    <header>
        <div class="tobuy">
            购物车
        </div>
        <div class="utils">
            <span>领卷</span><a href="javascript:;" v-show="isHasItem">编辑</a>

        </div>
    </header>
    <div class="post" v-show="isHasItem">
        已满足包邮条件
    </div>
    <div class="intro" v-show="!isHasItem">
        <span>30天无忧退货</span>
        <span>48小时急速退款</span>
        <span>满99元包邮</span>
    </div>
    <div class="hd" v-show="isHasItem">
        <div class="promotion">
            <span>全场换购</span>
            <p>已满100元享低至3折超值换购</p>
            <a href="">再逛逛 ></a>
        </div>
        <a class="promBtn">
            <span>去换购商品</span>
            <span>></span>    
        </a>
    </div>
   <div class="center"  v-show="!isHasItem">
       <div class="top">
           <img src="https://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/noCart-d6193bd6e4.png?imageView&type=webp" alt="">
       </div>
       <div class="bottom">
           登陆
       </div>
   </div>
    <ul class="shop" v-show="isHasItem"  >
        <li  v-for="(item,index) in cartitems" :key="index" @touchstart="ontouchmove(index,$event)">
             <div class="radio">
                <input type="checkbox"  id="" :value="index" v-model="ischecked"   > 
                </div>   
            <img class="pic" v-lazy="item[1].primaryPicUrl" alt="">
            <div class="content">
                <div class="name">{{item[1].name}}</div>
                <span class="option" @click="openItem(item[1].id)">
                     <span >{{selectContent}}</span>{{item[2].s}}<span>> </span>
                </span>
                 <div class="price" > <a >￥{{item[1].retailPrice}}</a></div>
            </div>
           
            <div class="operation">
               
                <span class="dev" @click="alterNumber(false,item[1].id,index)"  >-</span>
                <input type="text" disabled :value="item[2].number" ref="numbers"  >
                <span class="add" @click="alterNumber(true,item[1].id,index)" >+</span>
            </div>
            <div class="del" @click="deleteItem(item[1].id)">
                删除
            </div>
        </li>
        
    </ul>

    <div class="end" v-show="isHasItem">
        <div class="allselect">
            <input type="checkbox" name="" id=""  :checked="isallchecked" @click="isall">
            <span>合计{{totalNumber}}件</span>
        </div>
       <div class="totalnumber">
           <span>合计 {{totalPrice}} 元</span>
           <button class="submit" :style="totalNumber>1?'background:#DD1A21;color:white;':''">
                下单
           </button>
        </div> 
    </div>
    <!-- itemBuy -->
      <ItemBuy></ItemBuy>
</div>


</template>




<script>
import {readLocal,deleteContent,alterContent} from '../../utils/Save'
import { MessageBox,Toast } from 'mint-ui';
import ItemBuy from '../../pages/ItemBuy/ItemBuy'
import {mapState} from 'vuex'

export default {
data(){
    return{
       isHasItem:false,
       number:1,
       selectContent:"",
       localData:"",
    
       ischecked:[],
       isSingChecked:false,
       number:1,
       alterContent:{}
       
       
       
      
       
    }
},
components:{
    ItemBuy
}
,
mounted(){

     this.isHasCartItem()

    this.$allBus.$on("handlePage",()=>{
   
        // window.location.reload()
       this.localData=readLocal()
    //    console.log(readLocal())

    })
    //设置对应的vuex数据

    // this.alterContent=JSON.parse(window.sessionStorage.getItem("clhyzuishuai"))&&JSON.parse(window.sessionStorage.getItem("clhyzuishuai"))

    

},

computed:{
    ...mapState({
        cartshop:state=>state.Cart.cartshop,
        totalNumber:state=>state.Cart.totalNumber,
        totalPrice:state=>state.Cart.totalPrice
    }),
   

    cartitems(){
       
    let values=Object.values(this.cartshop)

        return values

    },
    isallchecked(){

        return this.cartitems.length==this.ischecked.length
    }
  
},

methods:{
  isHasCartItem(){
     let cartitem=window.localStorage.getItem("cartitem")
     if(cartitem){
         cartitem=JSON.parse(cartitem)
         this.isHasItem=true
      

         for(var i in cartitem){
             this.$store.dispatch("SETITEMSHOP",{id:i,number:cartitem[i]})

         }
     }

  }

  ,
  deleteItem(id){
  MessageBox.confirm("你确定要删除吗？")
  .then(()=>{
    //   根据id删除指定的内容 包括 localstorage 和删除vuex的内容
   deleteContent(id)

    
  })
  .catch(()=>{

      console.log("取消")
  })

  }
  ,
  ontouchmove(index,$event){
     let currentLi= document.querySelectorAll("li")[index] 
    let startpageX=$event.changedTouches[0].pageX
    $event.target.ontouchend=(e)=>{
        let endpageX=startpageX-e.changedTouches[0].pageX
       
       if(endpageX>=50 ){
         currentLi.style.transition="all .5s"
        currentLi.style.transform="translateX(-50px)"
        currentLi.querySelector(".del").style.display="block"
        
           
       }else if(endpageX<=-20 ){
           currentLi.style.transition="all .5s"
        currentLi.style.transform="translateX(0px)"
         currentLi.querySelector(".del").style.display="none"

       }
       

    }

  }
,
  openItem(id){
      this.$allBus.$emit("getShopId",id)
      
  },
//   修改添加数量
alterNumber(bool,id,index){
    let value=Number(this.$refs.numbers[index].value)
   
    if(bool){
        value+=1
        
    }else {
        
        if(value==1){
           Toast({
        message: '此商品一件起售',
        position: 'center',
        duration: 3000
        });
        return;
        }
        value-=1
    }
    this.$refs.numbers[index].value=value
    alterContent(id,value)
    this.$allBus.$emit("alterCurrent",{id,value})
    this.isHasCartItem()
     
}
  ,
  isall(){
      this.isHasCartItem()
     this.isSingChecked=!this.isSingChecked

     if(this.isSingChecked){

         for(var i=0;i<this.cartitems.length;i++){
             this.ischecked.push(i)

         }
     }else {
         this.ischecked=[]
     }
  }

},

watch:{
localData(){

    window.location.reload()
},

ischecked(){
    
    this.$store.commit("setcountornumber",this.ischecked)

}


},

//组件死亡前

// beforeDestroy(){
//     window.sessionStorage.setItem("clhyzuishuai",JSON.stringify(this.alterContent))

// }

}
</script>


<style lang='stylus' scoped rel='stylesheet/stylus'>
body 
 background #eee
    
.wrap
  height 100vh
  background #F4F4F4
  header
    padding 0 10px    
    .tobuy
        float left
        color #333
        font-size 19px
    .utils
        float right
        font-size 16px
        span
            color #dd1a21
        a
            margin 0 8px 0 10px
            color #333 
            
    height 48.56px
    background #fff
    border-bottom 1px solid #ccc
    line-height 48.56px  
  .post 
      height 44.16px
      font-size 17px
      line-height 44.16px
      color #f48f18
      background #fff8d8
      padding 0 8px      
   .hd
    
     background #fff    
     .promotion
        display flex
        justify-content space-evenly
        padding 14px 0
        p
          text-align left
          font-size 13px 
          margin-right  8px
        span
            
            font-size 10px
            color white
            padding 2px
            background linear-gradient(-225deg,#FC865F 0,#FC625F 100%)
     .promBtn
        background #FFF8F7
        padding 8px 4px
        &::after 
            content ""
            display block
            clear both
        width 60%
        display block
        margin auto
        font-size 12px
        span 
            &:first-child
                font-size 13px 
                float left
            &:last-child
                font-size 13px
                float right

.shop
   margin-bottom 120px
   li
    padding 10px 0
    margin 10px 0
    position relative
    display flex
    justify-content flex-start
    background #fff
    flex-wrap wrap
    .del
        width 50px
        color white
        background #E83A3A
        position absolute
        right -50px
        top 0
        bottom 0
        text-align center
        line-height 114px
        display none
        transition all .5s
    .pic
        width 95px
        height 95px
        background #EEEEEE 
    .radio
        margin-top 30px
        margin-left 15px
        margin-right 10px
        input
            width 15px
            height 15px
            border-radius 8px

    .content
        .name
            margin-top 5px 
            margin-left 10px
            font-size 14px
            border-bottom none
            max-width 227px
            overflow hidden
            text-overflow ellipsis
           
        .option
            margin-top 15px
            display block
            background #FAFAFA
            margin-left 10px
            font-size 13px
            width 226px
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
            span 
                margin 0 4px
    .operation
        position absolute
        right 16px
        bottom 5px
        font-size 13px
        input 
            width 40px
            height 20px
            text-align center
        span 
            width 20px
            height 20px
            display inline-block
            color #CFCECB
            border 1px solid #CFCECB
            font-size 15px
            text-align center
            line-height 20px
    .price
        margin-top 30px
        font-size 14px
        margin-left 8px
.end
    position fixed
    height 65.13px
    width 100%
    bottom 54px
    background #fff
    line-height 65.13px
    padding 0 0 0 15px
    box-sizing border-box
    font-size 13px
    .allselect
        input 
            margin-top 5px
        float left
        span 
            margin-left 5px 
    .totalnumber
        float right
        span 
            margin-right 5px
            color red
    button
        height 65.13px
        width 124px
        border none
        background #CCCCCC
        color white
.intro
    display flex
    justify-content space-around
    font-size 13px
    margin-top 10px
    background #EEEEEE
    border-bottom 1px solid #EEEEEE
    padding-bottom 8px
.center
    position absolute
    
    top 50%
    left 50%
    transform translate(-50%) translateY(-50%)
    img 
        width 136px
        height 136px
    text-align center
    .bottom
        margin-top 8px
        width 264px
        background #DD1A21
        color white
        
        padding 15px 0
</style>