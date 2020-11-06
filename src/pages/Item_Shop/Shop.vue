<template>


<div class="wrap"  >
<div class="visable_cate" ref="myCate"  v-if="classify.currentCategory " :id="isShows?'show':'none'"  >

    <div class="top_classify" >
        <span @click="allclassify" :class="isAll?'on':''">全部</span>
     <span :class="isIndex==index?'on':''" @click="scrollSpan(index,item.id)" v-for="(item,index) in classify.currentCategory.subCateList" :key="index">{{item.name}}</span>
    </div>
    <div class="arror iconfont icon-xiangxiajiantou">

    </div>
    
  
</div>
<div class="banner" v-if="classify.bannerList" :style="{'background':`url(${classify.bannerList[0].picUrl})`}">
    <div class="xiadan">
        <div class="swiper-container">

        <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in order" :key="index" >
           {{item}}
        </div>

    </div> 
    </div>
    </div>
</div>

<div class="shop">
    <div class="category" v-show="!isShows">
        <div class="content" ref="content" v-if="classify.currentCategory" >
            <span @click="allclassify" :class="isAll?'on':''">全部</span>
            <span :class="isIndex==index?'on':''" @click="scrollSpan(index,item.id)" v-for="(item,index) in classify.currentCategory.subCateList" :key="index">{{item.name}}</span>

        </div>
        
        <div class="arror iconfont icon-xiangxiajiantou">

        </div>
    </div>
     <ul class="shop_item" v-if="(itemcontent.itemList && isAll) || (itemcontent.itemList&&isIndex) || (itemcontent.itemList && isOne)">
         <li v-for="(item,index) in itemcontent.itemList" :key="index">
       <div class="top">
            <img v-lazy="item.listPicUrl" alt="" @click="opdetail(item.id)">
           <div class="contents">
            <span class="time" v-if="item.promTag">{{item.promTag}}</span>
              <h1 class="name">
                  {{item.name}}
             </h1>  
             <p class="rate">
                 {{item.goodCmtRate}}好评率
             </p>
             <div class="end">
                 <span  class="price">¥{{item.retailPrice}}</span>
                 <del v-show="item.counterPrice">¥{{item.counterPrice}}</del>
                 <span class="buy" @click="ItemBuy(item.id)">马上抢</span>
             </div>
            </div>  
       </div>
            <div class="bottom" v-if="item.hotSaleListBottomInfo">
               <img v-lazy="item.hotSaleListBottomInfo.iconUrl" alt=""> 
               <p>{{item.hotSaleListBottomInfo.content}}</p>    
            </div>
         </li>
      
     </ul>

</div>

<!-- end -->
<ItemBuy/>
</div>


</template>




<script>
import ItemBuy from '../../pages/ItemBuy/ItemBuy'

import Swiper from 'swiper'
import BetterScroll from 'better-scroll'
import {mapState} from 'vuex'
export default {
data(){
    return {
        isAll:true,
        isIndex:-1,
        isOne:false,
        index:-1,
        isShows:false
        
    }
}
,props:["categoryId"],
components:{
    ItemBuy
}
,
mounted(){
    // 查询分类项目
    this.$store.dispatch("SELECTCLASSIFY",this.categoryId)
    // better-scroll
    // 查询全部内容
   let {categoryId}=this
    this.$store.dispatch("ITEMSELECT",{categoryId,id:0})
     this.onmuse()
    // 查询现在下单者
    
    this.$store.dispatch("ONORDER")
         this.$nextTick(function(){
        new Swiper(".swiper-container",{
        loop:true,
        autoplay:true,
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true,//修改swiper的父元素时，自动初始化swiper
         })

        })
        
    if(this.classify.categoryId){
        console.log(1)
        this.init()
    }
 


},

computed:{
    ...mapState({
        classify:state=>state.Item.classify,
        itemcontent:state=>state.Item.itemcontent,
        order:state=>state.Item.order,
    })
},
methods:{
    init(){
     this.header_scroll=new BetterScroll('.category',{
        scrollX:true,
        click:true
        })
   
          this.visable_cate=new BetterScroll(this.$refs.myCate,{
          scrollX:true,
          click:true,
          probeType: 1
      })

    //   
    //  this.visable_cate.on("scrollEnd",(pos)=>{
    //      console.log(pos.x)
    //  })
      
    },
    opdetail(id){
        this.$router.replace({
            name:"items",
            query:{
                shopId:id
            }
        })
    }

,
ItemBuy(id){
  
    this.$allBus.$emit("getShopId",id)

}
,
scrollSpan(index,id){
    this.isIndex=index;
    this.isAll=false
    if(this.index===index) return;
    // this.header_scroll.scrollTo(-688,0,easing)
    let last_index=this.$refs.content.children[index].offsetWidth;
    this.header_scroll.scrollToElement(this.$refs.content.children[index],2,last_index,0,'easing')
    // this.visable_cate.scrollToElement(this.$refs.content.children[index+1],2,last_index,0,'easing')
     this.visable_cate.refresh()
    
    let {categoryId}=this
    this.index=index
    if (index==0){
           this.$store.dispatch("ITEMSELECT",{categoryId,id:0})
           this.isOne=true
           return 
    }
    this.$store.dispatch("ITEMSELECT",{categoryId,id})
    
},
allclassify(){
    this.isAll=true;
    this.isIndex=-1
    let {categoryId}=this
    this.$store.dispatch("ITEMSELECT",{categoryId,id:0})
   
}
// 监听鼠标滑动事件
,

onmuse(){
   document.addEventListener("scroll",()=>{
      if(document.documentElement.scrollTop>=200){
          this.isShows=true 
          
      }else {
          this.isShows=false
           
      }
   

   })

}

// onload
,


},

watch:{
    classify(){
        this.$nextTick(()=>{
            this.init()
            
        })
    },
    order(){
       
   
    

    }



}

}

</script>


<style lang='stylus' scoped rel='stylesheet/stylus'>
body
 background #eee   
 .wrap
    overflow hidden
    .banner
        margin-top 50px
        height 250px
        background-size cover !important
        border-bottom-left-radius 30%
        overflow hidden
        position relative
    .shop

        position absolute
        transform translateY(-70px) 
        left 10px
        right 10px
        border-top-left-radius 8px
        border-top-right-radius 8px
        background #fff
        .category
            overflow hidden
            height: 1.33333rem
            position relative            
            box-sizing border-box
            padding 0 10px
            
            border-bottom 1px solid rgba(0,0,0,.5)
            .content
                transition all 1s
                position absolute
                display flex
                span 
                  
                    margin-top 15px    
                    white-space nowrap
                    color #333
                    font-size 14px
                    margin-right 8px
                    margin-left 8px
                    font-weight 600
                    padding 4px 6px                                  
                    &.on
                        background #dd1a21
                        color white
                        border-radius 15px
            .arror
                z-index 15
                background #fff
                position absolute
                right 0px
                width 25px
                top 50%
                transform translateY(-50%)
                font-weight 700
        .shop_item
            li
             margin 10px 0
             .top 
                display flex
                img
                   width: 3.2rem;
                   height: 3.2rem; 
                .contents
                    flex 70%
                    margin-top 10px
                    margin-left 10px
                    .time
                        font-size 12px
                        padding 0 3px
                        border 1px solid #dd1a21
                        color #dd1a21
                        border-radius 8px
                        margin-bottom 8px
                        display inline-block
                    .name
                        margin 0 0
                        font-size 16px
                        line-height 24px    
                    .rate
                        margin 1px 0
                        font-size 14px 
                    .end
                        margin-top 20px
                        .price
                            font-size 15px
                            color #dd1a21
                            font-weight 600
                        del
                            margin-left 5px
                            color #999
                        .buy
                            float right
                            font-size 15px
                            background  linear-gradient(90deg,#f55,#ce2424)
                            color white
                            font-weight 450
                            padding 5px
                            border-radius 13px
             .bottom
                width 95%
                background #F6F6F6
                display flex
                padding 5px 3px
                border-radius  25px
                margin-top 10px
                img
                    border-radius 50%
                    width: .53333rem;
                    height: .53333rem;
                    margin-top 10px
                    
                p
                    margin-top 13px
                    font-size 13px
                    white-space nowrap
                    overflow hidden
                    text-overflow ellipsis
                    flex 75%
                    margin-left 5px
 .visable_cate
    overflow hidden
    position fixed
    width 100%
    background #fff
    height 40px
    top 40px
    z-index 999
    .top_classify
        position absolute
        padding-bottom 8px
        background #fff
        display flex
        
        span
            margin-top 15px    
            white-space nowrap
            color #333
            font-size 14px
            margin-right 8px
            margin-left 8px
            font-weight 600
            padding 4px 6px                                  
            &.on
                background #dd1a21
                color white
                border-radius 15px               
    .arror
        height 25px
        text-align center
        line-height 25px
        z-index 998
        background #fff
        position fixed
        right 0px
        width 45px
        top 65px
        transform translateY(-50%)
        font-weight 700
#show 
   z-index 998
#none
    z-index -100
.xiadan
    width 200px
    overflow hidden
    white-space nowrap
    text-overflow ellipsis
    position absolute
    left 50%
    top 50%
    transform translateX(-50%)
    background #A3794E
    color white
    text-align center
    border-radius 10px
    padding 4px 10px

</style>