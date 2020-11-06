<template>


<div class="wrap">
<Header></Header>
<Shop :categoryId="$route.query.id"></Shop>
</div>


</template>




<script>
import Header from '../../pages/Header/Header'
import Shop from '../../pages/Item_Shop/Shop'
export default {

components:{
    Header,
    Shop
}
}
</script>


<style lang='stylus' scoped rel='stylesheet/stylus'>


</style>