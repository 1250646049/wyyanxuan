<template>


<div class="wrap">
<Top width="95%"></Top>

<section>
    <div class="left">
        <ul class="left_scroll">
            <li @click="TabAlter(item.id,index)" :class="active===index?'active':''" v-for="(item,index) in categoryL1List" :key="index">{{item.name}}</li>

        </ul>
    </div>
    <div class="right">
      <keep-alive>
            <Right :categoryGroupLis="categoryGroupLis" 
        :isShowConten="currentCategory.bannerList"
        :categoryGroupList="categoryGroupLis"
        />
      </keep-alive>
    </div>
</section>
</div>


</template>




<script>
import Right from './Category_right/Right'
import {mapState} from 'vuex'
import Top from '../../pages/Top/Top'
export default {
data(){
    return {
      active:-1,
    
    }
}
,

mounted(){

// 异步请求地址
this.TabAlter(11,0)

}
,    
methods:{
TabAlter(id,index){
    
  
  if(index==this.active)return
   this.active=index
  this.$store.dispatch("GETCATEGORY",id)
    
}
}
,
computed:{
    ...mapState({
        categoryGroupLis:state=>state.Category.categoryGroupLis,
        categoryL1List:state=>state.Category.categoryL1List,
        currentCategory:state=>state.Category.currentCategory,
        // categoryGroupLis:state=>state.Category.categoryGroupLis

    })
}
,
components:{
    Top,
    Right
}

}
</script>


<style lang='stylus' scoped rel='stylesheet/stylus'>
.wrap
    overflow hidden
    
    width 100%
    section
        overflow hidden
        position relative 
        display flex
        margin-top 15px
        border-top 1px solid #F2F2F2
        padding-top 7px
        height 90vh
        .left
            position fixed
            top 60px
            bottom 60px
            border-right 1px solid #F2F2F2
            width 2.16rem
            li
                font-size 14px
                margin 25px 0
                color #333
                padding 6px 4px
                text-align center
                &.active
                    color #ab2b2b
                    border-left 3px solid #AB2B2B
                    font-weight 600
        .right
            overflow hidden
            position absolute
            right 0
            width  calc(100% - 2.16rem)
            z-index 1
            top 30px
            height calc(100% - 2.16rem)
            

           
            

</style>