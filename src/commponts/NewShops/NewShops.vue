<template>


<div class="container">
<Header></Header>
<div class="big_img">
    <img src="https://yanxuan.nosdn.127.net/4ae1d1a4ef566349f2c21a7f8a2463fc.jpg?type=webp&imageView&quality=75&thumbnail=750x370" alt="">
</div>
<div class="tuijian">
    <div class="title">
        推荐关注
    </div>
<div class="concern" v-if="ListData.editorRecommendItems">
    <img :src="ListData.editorRecommendItems[0].primaryPicUrl" alt="">

<div class="contents">
    <p class="intros">
        {{ListData.editorRecommendItems[0].simpleDesc}}
    </p>
    <div class="huodon">
        <span>{{ListData.editorRecommendItems[0].promTag}}</span>
    </div>
    <p class="name">
       {{ListData.editorRecommendItems[0].name}}
    </p>
    <p class="price">
        ￥{{ListData.editorRecommendItems[0].retailPrice}}
    </p>
</div>
</div>

<ul class="item" v-if="ListData.editorRecommendItems" >

    <li v-show="index>0" v-for="(item, index) in ListData.editorRecommendItems" :key="index">
      <div class="top_img">
        <div class="titles">
            <div class="left">
                <span>{{item.promTag || '超级限时购'}}</span>
                <span>￥{{item.retailPrice}}起</span>    
            </div> 
            <div class="right">
                {{item.simpleDesc}}
            </div>
        </div>      
      <img v-lazy="item.primaryPicUrl" alt=""></div>
    <div class="bottom">
        <p class="name">
            {{item.name}}
        </p>
        <div class="price">
            <span class="realprice">￥{{item.retailPrice}}</span>
            <del>￥{{item.counterPrice}}</del>
        </div>
        <div class="huodon">
            <span>超级限时抢</span><span>新人优惠</span>
        </div>
    </div>
    </li>
   
</ul>
</div>

<!-- all shop -->

<div class="all_shops" ref="items" >
    <div class="title">
        全部新品
    </div>
    <div class="selects">
        <span class="active">综合</span>
        <span>价格
            <a><i class="selected">⬆</i><i>⬇</i></a>
        </span>
        <span>分类</span>
        <span>制造商</span>
    </div>
    <div class="today">
        本期新品
    </div>

    <ul class="item" v-if="ListData.newItems">

    <li  v-for="(item, index) in ListData.newItems.itemList" :key="index">
      <div class="top_img">
        <div class="titles">
            <div class="left">
                <span>{{item.promTag || '超级限时购'}}</span>
                <span>￥{{item.retailPrice}}起</span>    
            </div> 
            <div class="right">
                {{item.simpleDesc}}
            </div>
        </div>      
      <img v-lazy="item.primaryPicUrl" alt=""></div>
    <div class="bottom">
        <p class="name">
            {{item.name}}
        </p>
        <div class="price">
            <span class="realprice">￥{{item.retailPrice}}</span>
            <del>￥{{item.counterPrice}}</del>
        </div>
        <div class="huodon">
            <span>超级限时抢</span><span>新人优惠</span>
        </div>
    </div>
    </li>
   
</ul>
</div>
</div>


</template>




<script>
import Header from '../../pages/Header/Header'

import {mapState} from 'vuex'
export default {
data(){
    return {}
},

mounted(){
    // 获取所有列表数据
    this.$store.dispatch("GETLISTDATA")

},

components:{
    Header
},

computed:{
    ...mapState({
        ListData:state=>state.NewShop.ListData
    })
},
methods:{
    init(){
        let items=document.querySelector(".all_shops .selects")
        let all_shop=document.querySelector(".all_shops")
        window.addEventListener("scroll",()=>{
            let all_shop_top=all_shop.offsetTop
          
            let pageY=window.pageYOffset
            let items_top=items.offsetTop

            if(pageY>=items_top-50){
                
                items.style.position="fixed"
                items.style.background="#fff"
                if(pageY<=all_shop_top){
                     items.style.position="relative"
                        items.style.background="#FAFAFA"
                }
            }



        })
    }
}
,
watch:{
    ListData(){
        this.$nextTick(()=>{
                this.init()
        })
    }
}

}
</script>


<style lang='stylus' scoped rel='stylesheet/stylus'>
.container
    overflow hidden
    background #eeeeee
    .big_img
        padding-bottom 6px
    
        margin-top 40px
       
        img     
            width 100%
    .tuijian
        background #fff
        padding-top 4px
        .title 
            font-size 20px
            text-align center
            margin 14px 0 20px 0
        .concern 
            
            display flex
            padding 4px 6px

            img 
                width 40%
            .contents 
                flex 45%
                border-top 1px solid #cccccc
                border-bottom 1px solid #ccc
                padding 4px 0
                margin-left 6px
                .intros 
                    font-size 14px
                    color #7f7f7f
                    margin 6px 0
                .huodon
                    margin-bottom 6px 
                    span 
                        display inline-block
                        background rgb(222, 163, 76)
                        color white 
                        font-weight 600
                        font-size 12px 
                        padding 2px
                .name
                    font-size 16px
                    color #333
                    line-height 23px
                .price 
                    font-size 15px
                    margin-top 6px
                    color #dd1a21
 .item
            padding 4px 6px
            margin-top 8px 
            margin-bottom 3px
            display flex
            flex-wrap wrap
            li 
                margin-right 10px
                margin-bottom 10px
                flex 45%
                .top_img
                    position relative
                    .titles
                        overflow hidden
                        display flex 
                        color white
                        line-height 30px
                        padding 0 6px    
                        position absolute
                        background url(https://yanxuan.nosdn.127.net/d71e2460d062eaa21d5bdf97eba9da89.png) no-repeat 
                        height 30px
                        left 0
                        right 0
                        bottom 0
                        .left
                            
                            flex 30%
                            padding-right 4px
                            line-height 14px
                            background #C0070E
                            box-sizing border-box
                            
                          
                            
                            span 
                                font-size 8px
                                white-space nowrap
                                
                        .right 
                            flex 65%
                            text-align center
                            font-size 6px !important
                    img 
                        width 100%
                .name
                    margin-top 8px
                    font-size 14px
                    line-height 18px
                .price
                    margin-bottom 6px
                    margin-top 6px
                    span 
                        font-size 16px
                        color red 
                    del 
                        font-size 14px 
                        color #ccc
                        margin-left 6px
                .huodon 
                    margin 6px 0
                    span 
                        margin 0 3px
                        color #dd1a21
                        border 1px solid #dd1a21
                        font-size 11px
                        padding 1px 3px
                        border-radius 15px
    .all_shops
        overflow hidden
        margin-top 10px
        background #fff
        padding 8px 0
        .title
            text-align center
            font-size 20px 
            margin-bottom 8px
        .selects
            top 10px
            z-index 8
            padding 8px 0 8px 0
            height 35px
            box-sizing border-box
            left 0
            right 0
            background #FAFAFA
            margin-top 25px
            margin-bottom 10px
            display flex
            justify-content space-evenly
            span
                margin-top 4px 
                font-size 14px
                color #333
                &.active 
                    color red
                &:nth-child(2)
                    a 
                        margin-left 4px
                        margin-top -6px
                        i 
                            font-style normal
                            &.selected 
                                color red
                        float right
                        display flex
                        flex-direction column
        .today
            margin-top 15px
            padding-left 6px
            font-size 14px
            
            &:before 
                content ""
                float left
                height 12px
                width 4px
                border-radius 8px
                background red
                margin-top 1px
                margin-left 15px
                margin-right 4px
</style>