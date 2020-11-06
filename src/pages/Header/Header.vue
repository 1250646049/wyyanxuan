<template>


<div class="wrap" >
<div class="home" @click="$router.push('index')">

</div>


<div class="title">

</div>

<div class="utils">
    <div class="search"></div>

<div class="cart" @click="$router.push('cart')"></div>
</div>
</div>


</template>




<script>


export default {


}
</script>


<style lang='stylus' scoped rel='stylesheet/stylus'>
.wrap
    border-bottom 1px solid #ccc
    position fixed
    width 100%
    z-index 997
    background #fff !important
    padding 3px 8px 0px 5px
    height 40px
    box-sizing border-box
    display flex
    width 100%
    justify-content space-between
    .home
        width 70px
        height 50px
        background url(./img/hxm_yanxuan-node-wap_style_img_hd-4de7d1dc8847215399843e49de640d68.png) no-repeat
        background-position: 0 -2.52rem;
        background-size 140px 120px
    .title
        
        width 100px
        height 30px
        background url(./img/hxm_yanxuan-node-wap_style_img_hd-4de7d1dc8847215399843e49de640d68.png) no-repeat
        background-size 140px 120px
    .search
        width 55px
        height 35px
        background url(./img/hxm_yanxuan-node-wap_style_img_hd-4de7d1dc8847215399843e49de640d68.png) no-repeat
        background-position: -2.6rem 0;
        background-size 140px 120px
        margin-top -5px
    .cart
        width 35px
        height 35px
        background url(./img/hxm_yanxuan-node-wap_style_img_hd-4de7d1dc8847215399843e49de640d68.png) no-repeat
        background-position: -1.27rem -1.05rem;
        background-size 140px 120px
    .utils 
        display flex
</style>