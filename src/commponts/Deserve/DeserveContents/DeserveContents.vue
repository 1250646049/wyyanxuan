<template>


<div class="container" >
    <div class="top">
   {{messages}}
</div>
<div class="wraps">
    <header>
    <span class="avater">
        <img :src="ContentData.avater" alt="">
    </span>
    <span class="name">
        {{ContentData.niknamae}}
    </span>
</header>

<section>
    <div class="title" v-html="ContentData.content_title">
       
    </div>
    <div class="coontent">
        <img :src="ContentData.content_img" alt="">
        <div class="posts" style="font-size:16px;line-height:24px;" v-html="ContentData.contents">

        </div>
    </div>
</section>
<footer>
    <div class="tuijianss" v-if="CurrentShop[0]" @click="openShop(CurrentShop[0].itemId)">
        <div class="left">
            <div class="youhuis">
                <span v-for="(item,index) in CurrentShop[0].itemTagList" :key="index" class="youhui">{{item.name}}</span>
            </div>
            <div class="names">{{CurrentShop[0].name}}</div>
            <div class="intros">{{CurrentShop[0].simpleDesc}}</div>
            <div class="prices">
                <span>￥</span>{{CurrentShop[0].yxRetailPrice}}
                <del>￥{{CurrentShop[0].retailPrice}}</del>
            </div>
            <button>立即购买</button>
        </div>
        <div class="right">
            <img :src="CurrentShop[0].primaryPicUrl" alt=""/>
        </div>
    </div>
    <div class="detail">
       <div class="left">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA/JJREFUWAntlltIFGEUx11vuEFCptgaIdFLSBSUQQVqJFkZvpniS2kXrYcgsUC0XS+rbuJDEfRgEkFFVEIPiaBRofnSxR4ioiAkKMLtJhRRXta131lndHacmV27vM0HZ7/LOed//vP/vv1mYmLsZitgK2ArYCtgK/A3Cjj+NLmtrW355OTkLvJ3Y2uwdGwFJs2PfcRGHA5H/8zMTH9jY+MXcSy2LZpgc3PzpmAw2EShPRSOjaYgJIPE9cXGxjZ6PJ6n0eSoMVETRIEUkjohVSzJFP1Fd5/+HvYI0qLYJ/HFx8enBQIBUXQLthPbQd4Sesm7nZiYWFlXV/dV5pFaVARRbTMEuimSSYHvgF6gyFmKfI5UQPw8XCrdCew4GMlgvEfNfaj5WPxWLSJBwLMBeADwUlGKcSlr76xAzXwtLS2rUPYGWNvA+kFcPlhPzOJl3ZIggJkADgOYCuBVl8t1qKqqakoPiMI5KHyKdXkYacMo1IFCQ7PT+V8IxTPrArMczLG4uLhst9v9dj4ifGR5yCF3USHXm5WVVWFEjoJ1kBskrghzKVbE2oD4wsuFtjsA1mHI3SE2ZXp6uksfo52bEgS8EIACgOTwl5eUlExrE2VMTC5dCzaFYrWcywwxGbMWwLyiLn1YU7AqwB6lRn5TU1NRWIBmInKbtWPiAMTX0NBgdoedpIADQh5i2jVA7RSNQcUzytYbbfUYMT7yz2NHye3R5M8NTRUkYqtEkXxzLnrhIHTmuFau6F2aNfVc6kPkOrqlLMp1ZNisCMoWSUuc7f79Lw+fpKBOmKFbERxQkg6ZJbM+LD7+TPv1MZq1UIzer+QdUdYHjPyyZnUGz+EvxWq8Xu81roI3kqBtcpVwxvaiRLOcOXVbhZyscX6DEqPNUcf8wdYyrlbmUsuwWd6DgFyi0EEKPU9KSsqrra39pkeBWL2QwcJ2Q8gR6wajTZ/j8/mWTUxMPCRnHXFdxFTqY9R5GKi6qOmrAXgF0Ibx8fE+gFI1vtCQf28rKm0nrgcbVaxH1ozI8RWUBrk+hdxLp9NZo8fUzi0VlEDeJivZsiEAV1P8A4XLjN4QWlCzMXdiHkfiOlgZYI0kJCTk1NfXj5rFy3pEghKEEhl08g7NAVi2rhuirRB9If5Ijfz1xJzGisEAwjEIubJI5AQ3KoISSBH5Q3kwuZydFJlh/Ay7iw1BeBR15K0TwzhdVJIHYlqAbVSI/WTcwavOa/RmwregRU1QzYSofDXLO/YARZPVdaueh5FPtMuo5kO10ENYxWt9iyaoJnd2dib4/f5cSBayJleGEHcpfjlXfuw11stX0JDRh4YSa3e2ArYCtgK2ArYC/1GB38h0sPsXf7/jAAAAAElFTkSuQmCC" alt=""><span>407</span>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAl5JREFUWAntlkFrE1EQx7PG9RS99NaDFYsfQPGgJxH04K3exHMvQr0IvRhCEgJS6AeQQAQ9WPwMFaQ3b94KBUFaKSRHEU/FJP7+6VZ3u2/fTnEDCu/B5M2bmZ355z87L6nVwgoMBAYCA4GBf5qBqAxdp9O5R8yr6XR6uSxW/iiKdnjm7ulYbFexHbIfnfb5zud8zsQ3sIIrygWoS/jeIx97vd61ojiX/bzLmLYBbglWflIkTtvPqC8qnlw3xuPxp263u9Zut99YclgYVJ6xJVlRDF9uD991vugWIBuTyeQ1treImPWuUgaTp6feLA5nv9+PR6PRCoBWcN9EZiwCcoS+gP0x+i1A3ke+OFLMTHMBSAsfDofDTUAsOwo3UrZv6Iepc061Asw96DLAhF6ZDVq4Lj8M7bINkG3kKyLbU/wv2H/U6/VHrVbLO9WVAqT+BqytU/wIeYb+EtATAdPSBDMkz6XjXwPcZ+m+ZQVYel+qrWJO4Cj4gCn9kC4M0AuAewfoBjFbVU9xulZO10BQeFMOMQeYDDjZ4zheSPwaiCfSLct6zXgZTKZ1GXC7aqurcLPZHGK/jWhqv7tiXDZri13P/rYBSleJ1iD9zh2b/nziU/vFoHlVwiDVdM9pbR9vxZ+A3JEUR2Q9Vga9LSblYpJ2dpVkS2RPsH0na/GfrAz6s8zRWwmDtOzivDBaGSxr8bzw1QLAv6XW9A4yeZFExfhJK2w3P1+5v2Vc3jnbWUAXFjtJwgDsA27p5FzFDugD8l6x5LK8g6tKaElmiUlyrVpiQ0xgIDAQGAgM/AcM/AJoWs1gcmM0vwAAAABJRU5ErkJggg==" alt=""><span>0</span>
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAA0BJREFUWAntlktoE1EYhdvEtAliXEgXCkpBEURRfCytNgtp1Qo+QMG60q0brVCofVdLS/AFbgsurCBWEGyFurG6ropuBEGwFBUfCFVi0qZJ/E6ckTSknTtJwIVz4c+993+c/8yZuZmpqPCGp4CngKeAp0DZFOju7l4nKxsgQL5ygfX09FzMZDJT4L2HZHu5cCvLAdTb27s3nU4/AStl4fl9Pl+ks7Pzaan4JSs4ODi4AnK3UK+ScUmmtXyK/XOC8Xj8GoRqITbJfFlmrWsVK5VgSbeYZ60JQg8hlPD7/Ts6OjreiFBfX9+mVCr1gliQ2CHyRosl6pogTSs5ENtp2ISdZV/D83a+q6trgVrknOM2X4XgV/JuYqPkvGSfYW08jAhGo9HlsVhsH6gidQBSq+0ONLxD41P5ja0Luc18Mif3E+sxyx6j7C87ttjsSJATuhMlxmm0ygaBzLSaMD+A3LjtLzSjZAO1h4kdZF5r51D7DeUbOenPbV+heVkhZ64PchdEDsBX2F3WY1z569ycpdbWBWQvgrqtYIjoCWwb2C3U/lW4EI7J38xnq/AHoFE35PIbqlYY+H9asS/5Ofl7R4JVVVX62/gAcB3FA/kARewHwNotTGE71TsSbGtr0yk8DmAS4BaeqSNOoIvFUfCoMIQlTAt7sfSs379k1ApOTExMRyIR3eJGXPvr6+tH8H03qbVzILeB9SOsmsPRwn7Eji01OypoF/Ow3+DK70EyjG/I9ruYh1QrDGGZ1hkTFGAoFDpDAylX19/fX2PaxMqtU60wTOuU54pga2urTl8MJfQxEDRtNDc3F1KNai0M01J3BC3Uas3z8/Ozpl0CgYCdm601rVOeKwUt4GyTYDBoN3Xsl0wm7VzXBB3fJAW6Z5skEgm7aQUnUl8tekM0KJ+1Xo164yS0D4fDszMzM1q6Juj4LhZq7qBpWs8TI4B/D9aMHcO3MjePuBjdx4axZ8ST+DLUu7prxSgoVULYFE3XMGcHzSdZiIxGM7FdzKdlxD7KyYj/mcx/iyF4Bfh2kaPxO9YiNYwyb3PaXme/kb3UFdn1VmzBN2NOfnmXNN/CZ9hmU1S3+aa4Xp6ngKeAp8D/oMBvpJFuEH4A5XYAAAAASUVORK5CYII=" alt=""><span>0</span>
       </div>
       <div class="right">
           去留言 >
       </div>
    </div>
</footer>
<transition name="fade">
<div class="end">
   {{message}}
</div>
</transition>
</div>
</div>


</template>




<script>
import {mapState} from 'vuex'

export default {
data(){
    return {
        isShowEnd:false,
        message:"往下翻，看看李淮源为你推荐了什么？",
         messages:"往上翻，看看李淮源为你推荐了什么？",
         count:1
    }
}
,props:["topid"]
,
mounted(){
    //获取允许上下滑动的的详情页的数组
    this.$store.dispatch("GETDETAILALLOW",this.topid)
    // 获取当前页面要展示的数据
   
    this.$store.dispatch("GETCURRENTCONTENT",this.topid)
    // 根据商品id渲染商品
   
    
   
},

computed:{
    ...mapState({
        ContentData:state=>state.Deserve.ContentData,
        
        AllayRange:state=>state.Deserve.AllowArray,
        // 本页推荐的商品
        CurrentShop:state=>state.Deserve.currentshop

    })
},
methods:{
    // 上拉或下拉读取下一页内容
    isScroll(){
        let container= document.querySelector(".container")
        let that=this
        let private_document=document.documentElement || document.body
        document.ontouchstart=function(e){
          let touch= e.changedTouches[0]
            let start=touch.clientY
            this.ontouchmove=function(e){
                // 获取中间滑动的距离
                   let touch= e.changedTouches[0]
                   let move=touch.clientY
                    // 判断是否到达底部
                    if(private_document.scrollHeight==private_document.scrollTop+private_document.clientHeight){
                            container.style.transform=`translateY(${-move}px)`
                             setTimeout(()=>{
                                 that.message="松开手指，为您推荐到第二页！"
                                 return;
                             },1000)
                              container.style.transform=`translateY(0px)`
                             document.ontouchend=function(){
                  if(start-move>=70 && start-move<=1000){
                        //    console.log("将执行滑动",start-move)
                        that.isShowEnd=true
                         
                            that.$router.replace(`/deserveContent/${that.AllayRange[0]}?time=`+Date.now())
                           
                            location.reload()
                       }else {
                        that.isShowEnd=false
                     }
            }
                        
                    }else if(private_document.scrollTop==0){
                        container.style.transform=`translateY(50px)`
                      document.ontouchend=function(){
                           
                            if(start-move<=-100 ){
                            //往上滑动
                          
                             setTimeout(()=>{
                                 that.messages="松开手指，为您推荐到上一页！"
                                 
                                 console.log(that.messages)
                             },1000)
                              container.style.transform=`translateY(0px)`
                             that.$router.push(`/deserveContent/${that.AllayRange[1]}?time=`+Date.now())
                            location.reload() 
                     }
                      }
                     

                    }
           
              
            }

           

        }

 

    },
    openShop(id){
        console.log(id)
        this.$router.replace({
           name:"items",
            query:{
                shopId:id
            }
        })
    }
},
watch:{
    ContentData(){
        this.$nextTick(()=>{
             this.isScroll()
            //  去查询此topid的位置，并且获取上一页和下一页两两页的topid
           
            //  请求推荐商品信息
             //根据商品分类id请求指定的商品
             console.log(this.ContentData.goodsId)
             this.$store.dispatch("GETGULPID",this.ContentData.goodsId)
        })
    
      
    }
}


}
</script>


<style lang='stylus' scoped rel='stylesheet/stylus'>
.container
    transition all .5s
    padding 6px 14px
    header
       
        display flex
        justify-content flex-start
        .avater
            display inline-block
            width 26px
            height 26px
            margin-right 8px 
            
            img 
                width 100%
                border-radius 50%
                vertical-align middle
        .name
            display block
            margin-top 4px
            color #333
            font-size 14px    
    section 
        margin-top 30px            
        .title
            font-size 16px
            color #2a2a2a

            &:after 
                content ""
                display block
                width 40px
                height 1px
                background #BC9162
                margin 10px 0
        .coontent 
            img 
                width 100%
            &>p
                font-size 14px
                color #333
                line-height 24px
                margin 4px 0
    footer
        margin-top 15px
        .tuijianss
           
            box-sizing border-box
            &:after 
                content ""
                display block
                clear both
            border 1px solid #ccc

            .right
                float right
                width 45%    
                img 
                    height 100%
                    width 100%
            .left 
                margin-left 15px
                margin-top 15px
                box-sizing border-box
               
                float left
                width 50%
                box-sizing border-box
                
               
                .youhuis
                    margin-bottom 3px
                    display inline-block
                    background #E36843
                    color white
                    span 
                        padding 2px 4px
                        display inline-block
                        
                .names 
                    margin-top 5px
                    color #333
                    white-space nowrap
                    overflow hidden
                    text-overflow  ellipsis 
                    font-weight 400
                    font-size 18px
                .intros
                    margin 6px 0 8px 0
                    color #999
                    font-size 12px
                    white-space nowrap
                    overflow hidden
                    text-overflow  ellipsis 
                .prices
                    margin-bottom 8px
                    font-size 20px
                    color red
                    font-weight 600
                    span 
                        font-size 12px
                    del
                        font-size 13px
                        color #999
                        margin-left 5px
                button
                    font-size 13px
                    background #C95059
                    color white
                    padding 2px 6px
                    border none
        .detail
            margin-top 10px
            &:after 
                content ""
                display block
                clear both
            .left 
                img 
                    width 26px
                    height 26px
                    vertical-align middle
                    margin-right 2px
                span 
                    font-size 12px
                    vertical-align middle
                    margin-right 8px
                float left
            .right 
                float right
                margin-top 5px
                font-size 13px     
.end
        text-align center
        font-size 18px
        color #333
        font-weight 700
        margin-top 20px
        border-top 1px solid #ccc
        padding-top 10px   
.top
    font-size 18px
    text-align center
    position absolute
    top -30px
    left 0
    right 0    
    
</style>