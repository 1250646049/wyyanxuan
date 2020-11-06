<template>
<div id="warp">
  <router-view></router-view>
  
  <!-- 导航 -->
  <ul class="category"  v-show="$route.meta.isShow">
      <li @click="goto('/index')" :class="$route.path=='/index'?'active':''" ><span class="iconfont icon-shouye"></span><span>首页</span></li>
      <li @click="goto('/category')" :class="$route.path=='/category'?'active':''"><span class="iconfont icon-leimupinleifenleileibie"></span><span>分类</span></li>
      <li @click="goto('/deserve')" :class="$route.path=='/deserve'?'active':''"><span class="iconfont icon-zhidemai-active"></span><span>值得买</span></li>
      <li @click="goto('/cart')" :class="$route.path=='/cart'?'active':''"><span class="iconfont icon-gouwuche"></span><span>购物车</span></li>
      <li @click="goto('/person')" :class="$route.path=='/person'?'active':''"><span class="iconfont icon-wodejuhuasuan"></span><span>个人</span></li>
  </ul>
  
</div>


</template>




<script>


export default {

methods:{
data() {
    return {
      current_page:"/path" ,   
    }
},
    goto(path){
        if(path ===this.$route.path){
            return;
        }
        this.$router.replace(path);
        this.current_page=path
      
    }
}
    
}
</script>


<style lang='stylus' scoped rel='stylesheet/stylus' >
.category
  z-index 8 
  background #fff
  border-top 1px solid #ccc
  width 100% 
  position fixed
  bottom 0
  height 54.09px

  display flex
  justify-content space-around
  font-size 14px
  li
    cursor pointer
    margin-top 15px
    display flex
    flex-direction column
    text-align center
    .iconfont
        margin-bottom 5px
        font-size 16px
    &.active
        span 
            color red
  


</style>