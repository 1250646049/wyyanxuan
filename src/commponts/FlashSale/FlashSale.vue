<template>


<div class="container">
<Header></Header>
<!-- 头部抢购时间 -->
<header>
<ul ref="myUl">
    <li v-show="item.status>0" :class="1==item.status?'on':''" v-for="(item,index) in screenList" :key="index">
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
            <img v-lazy="item.primaryPicUrl" alt="">
            <div class="contents">
                <div class="name">{{item.itemName}}</div>
                <p>
                    {{item.saleDesc}}
                </p>
                <div class="bottom">
                    <div class="price">
                        <span class="real">
                            ￥{{item.actualPrice}} 
                        </span>
                        <del>￥{{item.retailPrice}}</del>
                    </div>
                    <div class="buy">
                        马上抢
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
        currentId:""
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
        this.currentId=obj.id
        this.$store.dispatch("GETSHOPS",this.currentId)
    //    oul.style.width=width+"px"
       new BetterScroll("header",{
           scrollX:true,
           click:true
       })
       
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
                img 
                    background #fff
                    flex 45%
                    height 140px
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
                        font-size  16px
                        color #333
                        font-weight 700
                    p 
                        text-align right
                        position absolute
                        bottom 50px
                        left 0
                        right 8px
                        color #DD1A21
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