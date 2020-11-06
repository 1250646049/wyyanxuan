<template>


<div class="wrap" :style="!Mister?'background-image:url(https://yanxuan-static.nosdn.127.net/hxm/yanxuan-node-wap/style/img/skeleton/index-bad8841212914b21f136.png)':''" >
  <div class="mask" v-show="big_channel" @click="mask_qiehuan"></div>
  <div class="top">
      <Top>
          <a slot="logo" href="" class="logo">
       </a>

       <a slot="login" href="" class="login">登录</a>
      </Top>
    <!-- <header>
        
        <a href="" class="logo">
       </a>
       <div class="search">
           <span class="iconfont icon-sousuo"></span>
           {{searchName}}
       </div>
       <a href="" class="login">登录</a>
     
    </header> -->
    <!-- 分类 -->
    <div class="category">
        <ul v-show="short_channel">
         <li  :class="active==index?'on':''" v-for="(item,index) in categorys" :key="index" v-show="index<4"><a href="" @click.prevent="select(index,item)"  >{{item}}</a></li>
        </ul>
       <div class="all_cate" v-show="big_channel">
           <p>全部频道</p>
               <div class="short_cate">
           <span @click="qiehuan(index,item)" :class="index==on?'on':''" v-for="(item,index) in big_categorys" :key="index" >{{item}}</span>

               </div>
       </div>
       <span  @click="show_channel"  class="iconfont arr" :class="short_channel?'icon-xiangxiajiantou':'icon-xiangxiajiantou-copy'"> </span>
    </div>
      
  </div>
    <section  >
      <div class="swiper-container">

        <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in lunbo" :key="index">
            <img :src="item" alt="">
        </div>
    </div>
      <div class="swiper-pagination"></div><!--分页器。如果放置在swiper-container外面，需要自定义样式。-->

    </div>
    <!-- title -->
    <div class="title">
        <div v-for="(item,index) in title" :key="index"><img :src="item.icon" alt=""><span>{{item.name}}</span></div>
    </div>

    <!-- classify -->
    <ul class="classify" v-if="Mister.kingKongModule">
        <li v-for="(item,index) in Mister.kingKongModule.kingKongList" :key="index" ><img :src="item.picUrl" alt=""><span class="">{{item.text}}</span></li>
    </ul>
   <!-- 新人福利 -->
    <div class="new_person">
        <img src="https://yanxuan.nosdn.127.net/0f256e29c06d1954a6785b16ec7d3624.gif?imageView&quality=75" alt="">
    </div>
    <div class="tuijian">
        <div class="img">
            <img v-lazy="'https://yanxuan.nosdn.127.net/2ce893ef19956ddd2413d87a24e9b2e4.png?quality=75&type=webp&imageView&thumbnail=375x0'" alt="">
            <img v-lazy="'https://yanxuan.nosdn.127.net/9afb2a9449c66f348bf3fa4c3deda38f.png?quality=75&type=webp&imageView&thumbnail=375x0'" alt="">
        </div>
        <a href="">
            <img v-lazy="'https://yanxuan.nosdn.127.net/8346ccd16467d54491ee969769bcb21e.png?quality=75&type=webp&imageView&thumbnail=750x0'" alt="">
        </a>
    </div>
    <!-- 类目销量榜 -->
    <div class="leimu">
        <h1>类目销量榜</h1>
        <div class="paihang">
            <div class="left">
                <div class="text " >热销榜</div>
                <img v-lazy="'https://yanxuan-item.nosdn.127.net/c40842640f6a1a2509960c2029aca1b8.png?quality=75&type=webp&imageView&thumbnail=200x200'" alt="">
            </div>
            <div class="right">
                 <div class="text good">好评榜</div>
                <img v-lazy="'https://yanxuan-item.nosdn.127.net/c40842640f6a1a2509960c2029aca1b8.png?quality=75&type=webp&imageView&thumbnail=200x200'" alt="">
            </div>
        </div>
        <div class="short_paihang" v-if="Mister.categoryHotSellModule">
            <div class="item" v-show="index>=2" v-for="(item,index) in Mister.categoryHotSellModule.categoryList" :key="index" @click="GoonItem(item)">
                <p>{{item.categoryName}}</p>
                <img v-lazy="item.picUrl" alt="">
            </div>
        </div>
    </div>
</section>

</div>


</template>




<script>
import {mapState} from 'vuex'
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'

import Top from '../../pages/Top/Top'
export default {
data(){
    return {
        searchName:"搜索商品，共12506件商品",
        short_channel:true,
        big_channel:false,
        on:0,
        active:0,
        categorys:[],
        big_categorys:[],

    }
},
methods:{
    show_channel(){
        if(this.short_channel==true){
           this.short_channel=false
           this.big_channel=true 
        }else {
            this.short_channel=true
           this.big_channel=false 
        }
    },
    qiehuan(index,item){
          this.on=index
          let arrs=[]
           if(index<4){
                for (var i=index;i<index+4;i++){

              arrs.push(this.big_categorys[i])
          }
           }else if(index>this.big_categorys.length-4){
              for(var j=this.big_categorys.length-4;j<this.big_categorys.length;j++){
                  arrs.push(this.big_categorys[j])
              }
           }
            this.categorys=arrs
            this.active=this.categorys.indexOf(item)
           this.short_channel=true
           this.big_channel=false 
           

    }
,
select(index,item){
    this.active=index;
    this.on=this.big_categorys.indexOf(item);
}
,
mask_qiehuan(){
   this.big_channel=false
   this.short_channel=true
}
,
// 进入item组件
  GoonItem(item){
   
        this.$router.push({
          name:"item",
          query:{
              id:item.extra.operationResource.categoryId,
          }
      })

  }
},

computed:{
    ...mapState({
        category:state=>state.Mister.category,
        lunbo:state=>state.Mister.lunbo,
        title:state=>state.Mister.title,
        Mister:state=>state.Mister.Mister
    }),

},

mounted(){

this.categorys=this.$store.state.Mister.category.filter((item,index)=>index<4);
this.big_categorys=this.$store.state.Mister.category;
new Swiper('.swiper-container',{
    autoplay:true,
    pagination: {
    el: '.swiper-pagination',
  },
  loop:true,
})
,

this.$store.dispatch("ALLCONTENT")

         

},
watch:{

},

components:{
    Top
}

}
</script>


<style lang='stylus' scoped rel='stylesheet/stylus' >
.wrap

 margin-bottom 60px 
 overflow hidden
 .top
  &.::after
    content ""
    display block
    clear both   
  background #fff
  position fixed
  width 100%
  z-index 15  
  
  .category
     background #fff   
     position relative
     margin-top 15px
     ul
        display flex 
        margin-right 5px
        justify-content space-around 
        li 
            font-size 14px
            font-weight 700
            padding-bottom 7px
            a
                color #333
                font-weight 550
            &.on
                a 
                    color #dd1a21
                border-bottom 2px solid #dd1a21    
    .all_cate 
        padding 5px 2px
        p
            text-indent 1em
            margin-bottom 10px
            font-size 14px
        .short_cate
            padding-bottom 10px 
            span 
                float left

                display block
                width 17%
                color #333
                border 1px solid #cccccc
                text-align center

                padding 10px 6px
                margin 14px 0 14px 10px
                background #FAFAFA
                &.on 
                    border 1px solid #dd1a21
                    color #dd1a21
    .arr
            position absolute
            top 0
            right 8px
.mask 
    background rgba(127,127,127,.5)
    width 100vw
    height 100vh
    position absolute
    
section

    margin-top 79.72px
    .swiper-wrapper
        .swiper-slide
            img 
                height 200px
                width 100%
    .title
        margin 5px 0
        display flex
        justify-content space-around
        div
            img 
                width 24px
                height 24px
                vertical-align middle
            span 
                vertical-align middle
    .classify
        display flex
        justify-content space-evenly
        flex-wrap wrap
        li
            flex 18%
            text-align center
            margin 8px 2px
            img 
                width: 1.46667rem
                height: 1.46667rem
            span 
                display block
                margin-top 8px
    .new_person
        margin-top 10px
        img 
            width 100%
    .tuijian
        padding 7px 0
        background #F5C066
        border-radius 8px
        .img
            display flex
            justify-content space-around
            padding 5px
            img 
                width 48%
        a   
            display block
            text-align center
            img 
                width 96%
    .leimu
        background #fff
        margin-top 14px
        padding 4px 10px 
        h1
            margin-bottom 8px  
            font-size 22px 
        .paihang
              
            display flex
            justify-content space-around
            img 
                width 50%
                vertical-align middle
              
            &>div
                width 48%
                text-align center
                .text
                    display inline-block
                    vertical-align middle
                    font-size 14px
                    &::after 
                        content ""
                        display block
                        width 35px
                        height 2px
                        background #000
                        margin 5px 0
                &.left
                        background #F9F3E4
                &.right
                        background #EBEFF6        
        .short_paihang
            display flex
            flex-wrap wrap
            justify-content space-around
            .item
                box-sizing border-box
                padding 6px 4px 0px 4px
                background #F5F5F5
                margin 10px 3px
                p
                    text-align center
                flex 22% 
                text-align center
                img 
                    width 70%   
                    
</style>