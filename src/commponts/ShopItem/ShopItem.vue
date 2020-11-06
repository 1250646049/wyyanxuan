<template>


<div class="wrap">
        <Header></Header>
        <section>
            <div class="lunbo">
                <div class="swiper-container">
                <div class="swiper-wrapper">
                 
                <div class="swiper-slide"  v-for="(item,index) in itemDetail" :key="index">
                    <img :src="item" alt="">
                   <div class="show">
                       <span>{{index+1}}</span><span>/</span><span>{{itemDetail.length}}</span>
                   </div>
                </div>
            </div>
            <div class="swiper-pagination"></div><!--分页器。如果放置在swiper-container外面，需要自定义样式。-->

            </div>
            </div>
            <div class="huodon" v-if="shopItem.gradientPrice">
           <div class="one_items">
                                   <img src="https://yanxuan.nosdn.127.net/ab9edc6cd420e7897630cadf7674a582.png" alt="">
                    <div class="content">
                        <div class="left">
                            <span class="intro">狂欢价</span> <br>
                        <span class="price">￥{{shopItem.gradientPrice.limitPrice}}</span>
                        </div>
                        <div class="right">
                        <span class="time">距离结束还剩{{shopItem.gradientPrice.leftTime| filterTime}}</span> <br>
                         <div class="line" v-if="shopItem.detailPromBanner.sellVolumeDesc">
                            <div class="bg"> <span class="remain" :style="'width:'+shopItem.detailPromBanner.sellVolumePercent*100+'%'"></span></div> {{shopItem.detailPromBanner.sellVolumeDesc}}
                         </div>
                            <div class="line" v-else>
                            <div class="bg"> <span class="remain" :style="'width:'+0+'%'"></span></div><span style="margin-left:3px;">暂时无销量</span>
                         </div>
                        </div>
                    </div>
           </div>
           <!-- 下方的优惠计算 -->
            <div class="two_items">
                {{shopItem.promoTip}}
            </div>

            </div>
            <div class="price" v-else>
               ￥{{shopItem.retailPrice}}
                
            </div>
            <div class="bascis">
             <div class="name">
                {{shopItem.name}}
            </div>
            <div class="good_rate">
 
              <div class="good">
                     <p>{{shopItem.goodCmtRate}}</p>
               <p>好评率</p>
              </div>
            </div>
            </div>
            <!-- 推荐理由 -->
               <div class="tuijian">
                <p>推荐理由</p>
                <ul>    
                     <li v-for="(item,index) in shopItem.recommendReason" :key="index">
                       <span>{{index+1}}</span> {{item}}     
                    </li>   
                </ul>
              </div>
            <div class="detail_select">
                <ul class="person_select">
                    <li v-if="shopItem.skuFreight" >
                        <span>邮费:</span>
                         <span>{{shopItem.skuFreight.freightInfo}}</span>
                        
                         
                    </li>
                    <li>
                        <span>请选择规格数量</span>
                    </li>
                                        <li>
                        <span>配送:</span>
                    </li>
                                        <li v-if="shopItem.remark"> 
                        
                        <span>{{shopItem.remark.remarkTitle}}</span>
                    </li>

                </ul>

                <div class="shop_item">
                    <p>商品参数</p>
                    <ul>
                        <li v-for="(item,index) in shopItem.attrList" :key="index"><span>{{item.attrName}}</span>
                        <i>{{item.attrValue}}</i></li>

                    </ul>
                </div>
            </div>
            <div class="detail">
                <div class="contents" ref="myIntro" v-if="shopItem.itemDetail" v-html="shopItem.itemDetail.detailHtml">
                    
                </div>
                <img v-for="(item,index) in shopItem.reportPicList" :key="index" v-lazy="item" alt="">
            </div>
        </section>

        <footer>
            <div class="kefu iconfont icon-fuwupingjia-kefu"></div>
            
            <div class="cart">加入购物车</div>
            <div class="buy">立即购买</div>
        </footer>

</div>


</template>




<script>
import Swiper from 'swiper'
import {mapState} from "vuex"
import Header from '../../pages/Header/Header'
import { Popup } from 'mint-ui';


export default {
data(){
    return {
        shopId:"",
        isHasContent:false,
        postVisible:false

    }
},

components:{
    Header
},

computed:{
    ...mapState({
        shopItem:state=>state.Category.shopItem
    }),
    itemDetail(){
        if(!this.shopItem.itemDetail) return;
         let itemDetail=this.shopItem.itemDetail
         
        //  if(itemDetail){
        //     if(itemDetail['detailHtml']){
        //         delete itemDetail['detailHtml']
        //     }
        //     if(itemDetail["videoInfo"]){
        //         delete itemDetail["videoInfo"]
        //     }
        //  }
        let values=Object.values(itemDetail)
        values.splice(0,1)
        values.splice(values.length-1,1)
        
         
        return values;
    }
}
,
filters:{
    filterTime(value){

      let time=(value/1000/60/60).toFixed(2)
      let hours= Math.floor(time)
      console.log(time)

        return "距结束"+Math.floor(hours/24)+"天"+Math.floor((time-hours)*24)+"小时"
    }
}
,
mounted(){
this.shopId=this.$route.query.shopId
// 请求商品详情信息
this.$store.dispatch("GETCATEGORYSHOP",this.shopId)

},
methods:{
    setStyle(){
        let contents=this.$refs.myIntro
        let imgs=contents.querySelectorAll("img")
        Array.from(imgs).forEach(item=>{
            item.style.width="100%"
        })
    },
    // 打开邮费
   
}
,
watch:{
    shopItem(){
        this.$nextTick(()=>{
           
            new Swiper('.swiper-container',{
                loop:true,
                autoplay:true,
             
            })
            this.setStyle()

        })

    }
}

}
</script>


<style lang='stylus' scoped rel='stylesheet/stylus'>
.wrap
    
    overflow hidden
    section 
        background #EEEEEE
        margin-top 40px
        .lunbo
            position relative
            img 
                width 100%
            .show
                position absolute
                z-index 999
                
                right 0
                width 40px
                height 40px
                bottom 0
                
                span 
                    display inline-block
                    font-size 14px
                    background #fff
        .huodon
          .one_items
            height 66px
            background url(https://yanxuan.nosdn.127.net/aee487bbec398d6c790d2e2a320da5e6.png)
            img 
                height 100%
                width 66px
                float left
            .content
                width calc(100% - 66px)
                box-sizing border-box
                padding 8px 6px
                float left
                .left 
                    float left
                    .intro 
                        color #ffffff
                        font-weight 600
                        font-size 15px
                    .price 
                        color #ffffff
                        font-weight 700
                        font-size 22px
                        margin-top 15px
                        display block
                .right
                    float right
                    .time
                        font-size 11px
                        color #ffffff
                        letter-spacing 0.2em
                    .line
                        margin-top 15px
                        width 120px
                        color #fff
                        .bg
                            display inline-block
                            background #C0070E
                            border-radius 15px
                            overflow hidden
                            height 8px
                            width 62px
                            span    
                                
                                display inline-block
                                background #fff
                                width 40px
                                height 8px
          .two_items
                font-size 14px
                color #F48F18
                background #FFF0DD
                text-indent 1.5em
                padding 8px 0 
        .bascis 
                background #fff
                &::after
                    content ""
                    display block
                    clear both                      

                .name
                    
                    float left
                    font-size 16px
                    font-weight 600
                    color #333
                    margin-top 10px
                    margin-bottom 8px
                    margin-left 7px
                .good_rate
                    float right
                    margin-right 10px
                    p
                        margin 8px 0
                        &:first-child
                            font-weight 700
                            font-size 14px
                            color #DD1A21
                        &:last-child
                            color #7F7F7F
                            font-size 12px
                            font-weight 600
        .tuijian
            margin-top 10px 
            box-sizing border-box
            padding 4px 5px
            background #fff
            margin-left 7px
            p
                color #333
                font-size 12px 
                margin-bottom 10px
            ul
                background #fff
                border 1px solid #E6E6E6
                padding 8px
                font-size 12px
                li
                    background #fff
                    margin 6px 0
                    span 
                        font-weight 700
                        display inline-block
                        border-radius 50%
                        border 1px solid #DD1A21
                        color #DD1A21
                        padding 0 2px          
.price
    font-size 28px 
    font-weight 700 
    color #DD1A21
    margin-top 10px
    margin-bottom 8px
    margin-left 7px  
.detail_select
    margin-top 15px
    .person_select
        background #fff
        li
            background #fff
            position relative
            margin 10px 7px
            padding 14px 4px
            border-bottom 1px solid #D9D9D9
            span 
                display inline-block
                font-size 14px
                &:first-child
                    margin-right 10px
            &:after 
                content "＞"
                position absolute
                right 0
                top 50%
                font-weight 400
                font-size 16px
                transform translateY(-50%)
    .shop_item
            background #fff
            padding 15px 6px
            margin-top 10px
            box-sizing border-box

            p
                font-size 14px
                font-weight 700
                margin-top 15px
                margin-bottom 5px
            li
                display flex
                flex-wrap wrap
                margin 15px 0
                border-bottom 1px dashed #ccc
                padding-bottom 8px
                i 
                    font-style normal
                    flex 70%
                    margin-left 20px
                    color #333
                    font-size 12px
                    line-height 25px
                span 
                    line-height 25px
                    flex 20%
                    color #999
                    font-size 12px
.detail
    .content
        p 
            width 100%
        img 
            width 100% 
    img 
        width 100%
footer
    width 100%
    position fixed
    height 50px
    bottom 0
    display flex
    background #FFFFFF
    div
        border 1px solid #ccc
        color #333
        font-size 13px
        text-align center
        line-height 50px
    .kefu
        flex 20%
        font-size 24px
    .cart 
        flex 40%
        margin-left -1px
        
    .buy 
        flex 40%
        margin-left -1px
        background #DD1A21
        color white
</style>