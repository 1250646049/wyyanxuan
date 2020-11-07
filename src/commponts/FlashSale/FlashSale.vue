<template>


<div class="container">
<Header></Header>
<!-- 头部抢购时间 -->
<header>
<ul ref="myUl">
    <li @click="switchcover(item.id,index)" v-show="item.status>0" :class="index==currentIndex ?'on':''" v-for="(item,index) in screenList" :key="index">
        <h1>{{item.startTime |filterTime}}</h1>
        <h2 >{{item.status==1?'正在抢购':"即将开始"}}</h2>
    </li>


</ul>
</header>
<div class="banner">
   <div class="swiper-container">

        <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in banner" :key="index">
            <img :src="item.picUrl">
        </div>
    </div>
      <div class="swiper-pagination"></div><!--分页器。如果放置在swiper-container外面，需要自定义样式。-->

    </div>

</div>

<section>
    <ul>

        <li  v-for="(item,index) in itemList.itemList" :key="index">
           <div class="imgs">
                <img v-lazy="item.primaryPicUrl" alt="">
                <span>{{item.priceDesc}}</span>
           </div>
            <div class="contents">
                <div class="name">{{item.itemName}}</div>
                <p >
                   <span v-if="item.currentSellVolume && itemList.screenId!=currentId">限量{{item.currentSellVolume}}件</span>
                   <span :style="{'color':item.remindCount?'#2BAB52':''}"> {{item.saleDesc?item.saleDesc:item.remindCount+'人设置提醒'}}</span>
                </p>
                <div class="bottom">
                    <div class="price">
                        <span class="real">
                            ￥{{item.actualPrice}} 
                        </span>
                        <del>￥{{item.retailPrice}}</del>
                    </div>
                    <div class="buy" :style="itemList.screenId !=currentId?'background:#2BAB52':''">
                        {{itemList.screenId ==currentId?'马上抢':'提醒我'}}
                    </div>
                </div>
            </div>
        </li>
        <li></li>
    </ul>

</section>

</div>


</template>




<script>
import Header from '../../pages/Header/Header'
import {mapState} from 'vuex'
import BetterScroll from 'better-scroll'
import swiper from 'swiper'
export default {
data(){
    return {
        currentId:"",
        currentIndex:""
    }
}
,mounted(){
    this.$store.dispatch("GETTODAYSALE")
    this.$store.dispatch("GETBANANER")
    
    
},
computed:{
    ...mapState({
        screenList:state=>state.Sale.screenList,
        banner:state=>state.Sale.banner,
        itemList:state=>state.Sale.itemList
    }),

  
}
,
methods:{
    init(){
       let obj= this.screenList.find(item=>item.status==1)
        this.currentId=obj.id;
        
        let index=this.screenList.findIndex(item=>item.status==1)
        // this.currentId=obj.id
        this.currentIndex=index
        this.$store.dispatch("GETSHOPS",this.currentId)
    //    oul.style.width=width+"px"
       new BetterScroll("header",{
           scrollX:true,
           click:true
       })
       
    },
    switchcover(id,index){
        if(this.currentIndex==index) return;
         this.$store.dispatch("GETSHOPS",id)
        this.currentIndex=index
    }
}
,
components:{
    Header
},
watch:{
    screenList(){
        this.$nextTick(()=>{
             this.init()
        })
    },
    banner(){
        this.$nextTick(()=>{
            new swiper(".swiper-container",{
                loop:true,
                autoplay:true,
                pagination:{
                    el:'.swiper-pagination'
                }
            })

        })
    }
}
,
filters:{
    filterTime(value){
        var date=new Date(value)
        
        return date.getHours()+":00"
        
    }
}

}
</script>


<style lang='stylus' scoped rel='stylesheet/stylus'>
.container
    background #EEEEEE
    width 100%
    border 1px solid transparent
    header 
        background url(https://yanxuan.nosdn.127.net/c7d5a5e85a2b2a3ee3b39cae35f51c4c.png?imageView&type=webp) no-repeat
        height 45px
        margin-top 40px
        padding 5px 7px
        position relative
        overflow hidden

        ul 
            display flex
            position absolute

            li 
                display flex
                flex-direction column
                
                float left
                margin-right 30px
                margin-left 10px
                &.on 
                    h1 
                        
                        font-size 20px
                        color white 
                        font-weight 700
                        opacity 1
                        margin-bottom 0
                        margin-top 0
                    h2 
                        font-size 12px
                        color white 
                        background #FFDFDC
                        color #FF0004
                        border-radius 15px
                        padding 2px 0px
                        margin-top 5px
                        opacity 1
                        width 60px
                        text-align center
                h1 
                    font-size 16px
                    color #ffffff
                    opacity .7
                    margin-bottom 8px
                    margin-top 2px
                    display inline-block
                h2 
                    font-size 12px
                    color #ffffff
                    opacity .7
                    margin-top 1px
                    display inline-block
                    white-space nowrap
    .banner 
        background #FF3338
        border 1px solid transparent
        height 120px
        border-bottom-left-radius 50%
        border-bottom-right-radius 50%
        .swiper-container
            width 95%
            margin 10px auto
            img 
                width 100%
                border-radius 15px
    section
        margin-bottom 50px
        margin-top 30px
        ul 
            
            padding 0 10px
            li 
                
                display flex
                width 100%
                margin 5px 0
                padding 2px
                box-sizing border-box
                .imgs
                    position relative
                    img 
                        background #fff
                        flex 45%
                        height 140px
                    span 
                        background #DD1A1F
                        position absolute
                        top 0
                        left 10px
                        width 25px
                        height 20px
                        color white 
                        font-size 12px
                        font-weight 600
                        text-align center
                        padding 12px 8px
                        border-bottom-left-radius 17px
                        border-bottom-right-radius 17px
                .contents 
                    padding-right 5px
                    flex 45%
                    background #fff
                    margin-left 0px
                    padding-left 10px
                    padding-top 3px
                    padding-bottom 3px
                    position relative
                    .name   
                        font-size  14px
                        color #333
                        font-weight 700
                        line-height 22px
                    p 
                        text-align right
                        position absolute
                        bottom 50px
                        left 0
                        right 8px
                        color #DD1A21
                        span 
                            &:first-child 
                                float left
                                margin-left 10px
                            &:last-child 
                                float right
                    .bottom 
                        position absolute
                        bottom 10px
                        left 0
                        right 8px
                        display flex
                        justify-content space-between
                        .price

                            .real
                                font-size 24px
                                color #DD1A21
                                font-weight 700
                            del 
                                font-size 12px
                                color #999
                        .buy 
                            width 60px
                            height 30px
                            text-align center
                            line-height 30px
                            border-radius 15px
                            background #FC5163
                            color white

</style>