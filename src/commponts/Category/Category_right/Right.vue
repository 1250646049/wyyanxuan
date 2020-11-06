<template>


<div class="wrap">
 <div class="container">
      <div class="swiper-container" v-if="isShowConten&&isShowConten.length>1">
        <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in isShowConten" :key="index">
            <img :src="item.picUrl" alt="">
        </div>
    </div>
      <div class="swiper-pagination"></div><!--分页器。如果放置在swiper-container外面，需要自定义样式。-->
    </div>
    <div class="gg"  v-if="isShowConten&&isShowConten.length===1">
        <img :src="isShowConten[0].picUrl" alt="">
    </div>
 </div>
  <div class="scroll">
       <div class="content" v-if="categoryGroupList">
     <div class="singleContent" v-for="(item,index) in categoryGroupList" :key="index" >
         <div class="title">
             {{item.name}}
         </div>
         <ul class="right_scroll">
            <li @click="openShopItem(items.id,items.superCategoryId)" v-for="(items,indexs) in item.categoryList" :key="indexs"><img v-lazy="items.wapBannerUrl" alt=""> <span>{{items.name}}</span></li>

        </ul>
     </div>
 </div>
  </div>
</div>


</template>




<script>
import Swiper from 'swiper'
import BetterScroll from 'better-scroll'
import 'swiper/css/swiper.min.css'
export default {
  props:["categoryGroupLis","isShowConten","categoryGroupList"],
  data(){
return {
  
}
  },

  watch:{
      isShowConten(){
          this.$nextTick(()=>{
              if(this.isShowConten&&this.isShowConten.length>1){
                  this.init()
              }
              
              
          })

      },
      categoryGroupLis(){
          
        this.$nextTick(()=>{
              this.right_scroll= new BetterScroll(".scroll",{
                scrollY:true,
                click:true
          })
        })
        
      }
  },
  mounted(){
  

  }
,
  methods:{
      init(){
          new Swiper('.swiper-container',{
              loop:true,
              autoplay:true,
                pagination: {
                el: '.swiper-pagination',
                }

          })

      }
  ,

  openShopItem(id,cateid){
   let type= Math.floor(Math.random()*(1+500)-1)
    this.$router.replace({
        name:"list",
        query:{
            category:cateid,
           subCategoryId:id,
           currentType:type
        }
    })

  }
  
  }

}



</script>


<style lang='stylus' scoped rel='stylesheet/stylus'>
.wrap
    height 100%
    overflow hidden
.container
    text-align center
    img
        width 95%
.right_scroll
    overflow hidden
    li
        margin 10px 4px 10px 10px
        float left
        width 25%
        img 
            width 80%
        span 
            width 80%
            display block
            text-align center
            font-size 10px
            margin 5px 0
            color #333
            white-space nowrap
.title
    text-indent 1.2em
    font-size 13px
    margin 4px 0
.scroll
    height calc(100% - 115px)
    overflow hidden
    position relative
    
.gg
    position relative
    z-index 2
.content 
    padding-bottom 10px
    min-height 500px
    
</style>