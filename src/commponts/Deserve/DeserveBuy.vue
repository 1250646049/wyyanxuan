<template>


<div class="wrap">

<Header></Header>
<div class="header">
    <div class="intros">
        <div class="title">
            <img src="http://yanxuan.nosdn.127.net/0b7676e645253f84be662aacfc051922.png" alt="">
            <span>严选好物 用心生活</span>
        </div>
        <img class="bg" src="http://yanxuan.nosdn.127.net/a93a392fb8006ba26dea38477979b7b4.jpg?imageView" alt="">
    </div>
    <div class="container">
          <div class="banner" ref="banner">
             <ul class="swipers" v-for="(item,index) in category" :key="index">
               
            <li v-for="(items,indexs) in item" :key="indexs">
                <img :src="items.picUrl" alt="">
                <p>{{items.mainTitle}}</p>
                <span>{{items.viceTitle}}</span>
            </li>
               
        </ul>
          </div>
          <div class="xianshitiao">
              <span class="ospan"></span>
          </div>
    </div>
</div>

<section>
  
    <ul class="content" v-if="DeserveBuy[0] && DeserveBuy[1]" >
        <!-- <li  v-for="item in DeserveBuy[0].topics" :key="item.id">
            <img v-lazy="item.picUrl"  alt="">
            <div class="intro">
           {{item.title}}
            </div>
            <div class="person">
                <div class="name">
                    <img v-lazy="item.avatar"  alt="">
                  {{item.nickname}}
                </div>
                <div class="numbers">
                        <img v-lazy="'https://yanxuan.nosdn.127.net/5097bc5f2e1eb15f2a32b56895db073a.png'" alt=""><span>83k</span>
                </div>
            </div>
        </li> -->
          
       <li  v-for="(item,index) in DeserveBuy" :key="index">

           <div @click="$router.replace('/deserveContent/'+items.topicId)" class="all_show" v-for="(items,indexs) in item" :key="indexs">
                <img v-lazy="items.picUrl"  alt="">
            <div class="intro" v-if="items.nickname">
           {{items.title}}
            </div>
            <div class="person" v-if="items.nickname">
                <div class="name" >
                    <img v-lazy="items.avatar"  alt="">
                  {{items.nickname}}
                </div>
                <div class="numbers">
                        <img v-lazy="'https://yanxuan.nosdn.127.net/5097bc5f2e1eb15f2a32b56895db073a.png'" alt=""><span>83k</span>
                </div>
            </div>
             <div class="shows" v-else>
                 <h1>{{items.title}}</h1>
                 <h3>{{items.subTitle}}</h3>
             </div>
           </div>
        </li>
    </ul>
</section>
</div>


</template>




<script>
import {mapState} from 'vuex'
import BetterScroll from 'better-scroll'
import Header from '../../pages/Header/Header'
export default {
data(){
    return {
        page:1,
        isZhixing:false,
    }
},

components:{
    Header
},
computed:{
    ...mapState({
        category:state=>state.Deserve.category,
        DeserveBuy:state=>state.Deserve.DeserveBuy
    })
}
,

mounted(){
    // 获取导航信息
    this.$store.dispatch("GETDESERVECATE")
    // 请求默认数据
    this.$store.dispatch("GETDETAILS",{page:this.page,size:2})

},
watch:{
    category(){
        this.$nextTick(()=>{
            let banner=this.$refs.banner
            let oul=banner.querySelectorAll("ul")
            let oul_width=oul[0].offsetWidth
            banner.style.width=(oul_width)+"px"
            // 滑动
            console.log(oul_width)
            let ospan=document.querySelector(".ospan")
           this.scroll= new BetterScroll(".container",{
                scrollX:true,
                click:true,
                momentum:true
             
            })

            // 获取下方滚动条
            this.scroll.on("scrollEnd",(e)=>{
               let distance=Math.abs(e.x)
               if(distance>=300){
                   ospan.style.width="100%"
               }else {
                   ospan.style.width="50%"
               }
               

                
            })

        })
    }
,
DeserveBuy(){

    this.$nextTick(()=>{
         this.ajaxDeserve()
    })
}

},
methods:{
    ajaxDeserve(){
         console.log(9998)
        let content=document.querySelector(".content")
        // 滚动
        let page=1;
         let documents=document.documentElement || document.body
     
        
         window.addEventListener("scroll",()=>{
              
             if(documents.scrollHeight==documents.scrollTop+documents.clientHeight){
                    if(!this.isZhixing){
                     this.page++
                       this.$store.dispatch("GETDETAILS",{page:this.page,size:2})
                          console.log(this.page)
                          this.isZhixing=true
                    }
                window.setTimeout(()=>{
                    console.log(225)
                        this.isZhixing=false
                    },1000)
          
            
             }


         },false)
    



      
    }
},

beforeDestroy(){
  window.location.reload()
}


}
</script>


<style lang='stylus' scoped rel='stylesheet/stylus'>
.wrap
    background #EEEEEE
    &:before 
        content ""
        display table
    
    .header
        
        position relative
        margin-top 40px
        .intros
            position relative
            .bg
                
                 width 100%
            .title
                position absolute
                top 40px
                left 8px
                img 
                    width 71px
                    vertical-align middle
                    float left
                span    
                    font-size 16px
                    color white
                    display block
                    float left
                    margin-top 15px

    .container
        background #fff
        position absolute
        width 95%
        overflow hidden
        margin auto
        top 30%
        left 9px
        border-top-left-radius 10px
        border-top-right-radius 10px
        z-index 55
        height 265px
        ul
            float left
            display flex
            justify-content flex-start
            
            li
               
               margin 8px 12px
               img 
                    width 66px
                    height 66px 
                p
                   text-align center
                   margin 6px 0
                   font-weight 700
                   color #333 
                   font-size 14px
                span 
                    white-space nowrap
                    display block
                    text-align center
                    font-weight 500
                    font-size 10px
        .banner
            height 100% 
           
            transition  all .5s
            
                
        .xianshitiao

            background #d9d9d9
            width 100px
            height 5px
            border-radius 10px
            position absolute
            z-index 88
            bottom 0
            left 50%
            transform translateX(-50%)
            overflow hidden
            span 
                display inline-block
                width 50%
                transition all .5s
                background red
                height 100%
                position absolute

    section 
        margin-bottom 65px
        margin-top 95px

        .content
            &:after 
                content ""
                display block
                clear both
            li
                float left
                
                background #fff
                
                padding-bottom 6px
                width 45%
                margin 8px
                .all_show
                    &:after
                        content ""
                        display block
                        clear both 
                    margin 0  0 12px 0
                    &>img
                        
                        width 100%
                        border-top-left-radius 13px
                        border-top-right-radius 13px

                    .intro
                        box-sizing border-box
                        font-size 14px
                        margin 6px 0
                        line-height 20px
                        padding 0 4px
                    .person
                        margin-bottom 10px
                        box-sizing border-box
                        padding 0 6px 4px 6px
                        .name
                            float left
                            img 
                                width 26px
                                height 26px
                                border-radius 50%
                                vertical-align middle
                            color #7f7f7f

                        .numbers
                            color #7f7f7f
                            float right
                            margin-top 6px
                            img
                                width 16px
                                height 16px
                                vertical-align middle
                                float left
                            span    
                                display block
                                margin-top 2px
                                float left
                    .shows 
                        background #FFE1B2
                        padding 8px 4px
                        border-bottom-right-radius 15px
                        h1
                            font-size 16px
                            text-align center
                            color #39464B
                            margin-bottom 15px
                            margin-top 10px
                        h3
                            font-size 14px
                            text-align center
                            margin-top 10px
                            margin-bottom 10px

        
    

</style>