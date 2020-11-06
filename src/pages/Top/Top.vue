<template>


<div>
    <header>
        
        <slot name="logo"></slot>
       <div class="search" :style="'width:'+width">
           <span class="iconfont icon-sousuo"></span>
           {{searchName}}
       </div>
       <slot name="login"></slot>
     
    </header>

</div>


</template>




<script>


export default {
    props:["width"]
    ,
    data(){
        return {
             searchName:"搜索商品，共12506件商品",
             
        }
    }

}
</script>


<style lang='stylus' scoped rel='stylesheet/stylus'>
header
 
    background #fff
    margin-top 10px
    display flex
    justify-content space-around
    .logo
      line-height 22.08px
      margin-top 5px
      width 76.17px
      height 22.08px
      display inline-block 
      background url(../../commponts/Index/img/hxm_yanxuan-node-wap_style_img_index-20a8c6c35d0ec7b54782d2098282371f.png)
      background-size 5.013333333333334rem 5.013333333333334rem
      background-position -1.50rem -3.36rem 
    .search 
       line-height 31px
       box-sizing border-box
       padding 0 0 0 20px
       width 230px
       height 31px
       background #EDEDED
       font-size 14px
       color #767676
       border-radius 8px
       .icon-sousuo
         font-size 15px
         font-weight 600
    .login 
      font-size 14px
      font-weight 400
      border 1px solid #dd1a21
      border-radius 4px
      color #dd1a21
      height 22.08px
      line-height 22.08px
      padding 0 3px
      margin-top 3px

</style>