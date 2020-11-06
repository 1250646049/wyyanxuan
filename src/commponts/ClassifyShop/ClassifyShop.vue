<template>


<div class="wrap">
<Header></Header>
<section>
    <div class="scrollX" v-if="categoryGroupLis">
        <ul class="categorys" ref="mycategory">
        
           <li v-for="(item, index) in categoryGroupLis" :key="index" >
               <span  @click="scrollToposition(index,indexs,items.id)"   v-for="(items,indexs) in item.categoryList" :key="indexs">{{items.name}}</span>
           </li>
          
        </ul>
    </div>

    <ul class="container">
        <li v-for="(item,index) in itemList" :key="index" v-show="item.name" @click="openShop(item.id)">
           <div class="imgs">
                <img v-lazy="item.primaryPicUrl" alt="">
                <p class="title">{{item.simpleDesc}}</p>
           </div>
            <div class="content">
                <div class="name">{{item.name}}</div>
                <div class="price">
                    <span>¥{{item.retailPrice}}</span> <del v-if="item.counterPrice">¥{{item.counterPrice}}</del>
                </div>
                <div class="tagWraper">
                    <span class="tag">
                        11.11预售
                    </span>
                </div>
            </div>
        </li>
       <li v-show="itemList.length%2!=0"></li>
    </ul>
</section>
</div>


</template>




<script>
import Header from '../../pages/Header/Header'
import BetterScroll from 'better-scroll'
import {mapState} from 'vuex'
export default {
data(){
    return {
      category:"",
      subCategoryId:"",
      currentOn:0,
      currentPosition:[],
      lastItems:"",
      lastindex:[-1,-1]
    }
}
,
mounted(){
    this.category=this.$route.query.category
    this.subCategoryId=this.$route.query.subCategoryId,
    this.$store.dispatch("GETCATEGORY",this.category)
    this.$store.dispatch("GETSHOPITEM",{id:this.subCategoryId,cateid:this.category})


}
,

computed:{
   ...mapState({
        categoryGroupLis:state=>state.Category.categoryGroupLis,
        categoryL1List:state=>state.Category.categoryL1List,
        // 进入的位置
        position:state=>state.Category.position,
        itemList:state=>state.Category.itemList
   })
}
,
components:{
    Header,
},
methods:{
    scrollToposition(index,indexs,id){
        if(this.lastindex[0]==index && this.lastindex[1]==indexs) return;
        this.currentPosition=[index,indexs]
         this.$store.dispatch("GETSHOPITEM",{id,cateid:this.category})
         this.lastindex=[index,indexs]
    },
    // 刷新初始化
    init(){
     
    },
    openShop(id){
    
        this.$router.replace({
            name:"items",
            query:{
                shopId:id
            }
        })

    }
}
,
watch:{
    categoryGroupLis(){
      
        this.$store.dispatch("SELECTINDEX",this.subCategoryId)
        this.$nextTick(()=>{
                     this.scrollToposition(this.position[0],this.position[1],this.subCategoryId)
      let items=  document.querySelectorAll("li")[this.position[0]].querySelectorAll("span")[this.position[1]]
  
        })
    },
    currentPosition(value){
        
     this.lastItems&&this.lastItems.classList.remove("on")
    let mycategory=this.$refs.mycategory
    let oli=mycategory.querySelectorAll("li")
    
    oli=Array.from(oli)
    oli.forEach((item,index)=>{
        let span=item.querySelectorAll("span")
       let ospan=Array.from(span)
        ospan.forEach((items,indexs)=>{
           if(value[0]==index && value[1]==indexs){
               mycategory.style.transition="all .5s"
               if(oli.length==1){
                   if(indexs<=ospan.length-4){
                mycategory.style.transform=`translateX(-${items.offsetLeft}px)`
               }else {
                   mycategory.style.transform=`translateX(-${ospan[indexs-3].offsetLeft}px)`
                    }
               }else {
                 mycategory.style.transform=`translateX(-${items.offsetLeft}px)`
               }
               items.classList.add("on")
               this.lastItems=items
               
               
           }
        })
    })

    },
    position(){
        this.currentPosition=this.position
        
    },
    itemList(){
        this.$nextTick(()=>{
            new BetterScroll(".scrollX",{
                click:true,
                scrollX:true
            })
        })
    }
}


}
</script>


<style lang='stylus' scoped rel='stylesheet/stylus'>
.wrap
    width 100%
    overflow hidden
    section
        width 100% 
        margin-top 40px
        overflow hidden
    .scrollX
        position fixed
        width 100%
        height 40px
        background #fff
        z-index 88
        overflow hidden
        .categorys
            line-height 32px
            display flex
            position absolute
            li
                white-space nowrap
                font-size 13px
                span 
                    
                    display inline-block
                    margin-right 15px
                    font-weight 580
                    font-size 13px
                    color #333
                    margin-left 15px
                    padding 0 5px
                    &.on
                        color #dd1a21
                        border-bottom 3px solid #dd1a21

.container
    display flex
    justify-content space-between
    flex-wrap wrap
    overflow hidden
    li
        
        flex 40%
        margin 12px
        img 
            width 100%
        .name
            
            font-size 14px
            margin 8px 0 5px 0
            color #333
        .price
            span 
                font-size 13px
                color red
            del
                font-size 12px
                color #999
                margin-left 8px
        .tagWraper
            margin-top 5px
            .tag
                display inline-block
                font-size 8px
                color #dd1a21
                padding 2px 2px
                border 1px solid #dd1a21
                border-radius 15px
        .imgs
            position relative
            overflow hidden
            .title
                font-size 10px
                position absolute
                bottom 0
                left 0
                right 0
                width 100%
                z-index 5
                background #F1ECE2
                white-space nowrap
                overflow hidden
                text-overflow ellipsis
                color #9f8a60
                padding 4px

</style>