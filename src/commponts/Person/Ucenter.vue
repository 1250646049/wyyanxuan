<template>


<div class="container">
<header>
<div class="person">
    <div class="avater">
        <img src="https://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png" alt="">
    </div>
    <div class="detail" >
        <h2>{{user.name}}</h2>
        <h5><span class="iconfont icon-shouji1"></span>{{user.phone}}</h5>
    </div>
</div>


</header>
<section>
    <div class="mymoney">
        我的资产
    </div>
    <ul class="short_utils">
        <li><span>￥ 45万</span><span>回馈金</span></li>
      <li><span>4</span><span>红包</span></li>
        <li><span>1</span><span>优惠卷</span></li>
        <li><span>0</span><span>津贴</span></li>
      <li><span>0</span><span>礼品卡</span></li>
    </ul>
    <div class="gg1">
        <img src="https://yanxuan.nosdn.127.net/eb2295fbdd43bdb905ea6091a92879c0.png?imageView&quality=75&thumbnail=750x0" alt="">
    </div>
</section>

<footer>
    <div class="gg2">
        <img src="https://yanxuan.nosdn.127.net/16038747147910562.png?type=webp&imageView&thumbnail=800x0&quality=75" alt="">
    </div>
    <div class="function">
        <div>
            <span class="iconfont icon-icon- "></span>
            <p>我的订单</p>
        </div>
                <div>
            <span class="iconfont icon-zhanghao"></span>
            <p>账号管理</p>
        </div>
                <div>
            <span class="iconfont icon-shouji1"></span>
            <p>我的手机号</p>
        </div>
                <div>
            <span class="iconfont icon-zhouliu "></span>
            <p>周六一起拼</p>
        </div>
                <div>
            <span class="iconfont icon-iconfonticonfonttianmaoyoujirenzheng2"></span>
            <p>邀请返利</p>
        </div>
         <div>
            <span class="iconfont icon-youxiangou"></span>
            <p>优先购</p>
        </div>
         <div>
            <span class="iconfont icon-jifenzhongxin"></span>
            <p>积分中心</p>
        </div>
         <div>
            <span class="iconfont icon-huiyuan1"></span>
            <p>会员俱乐部</p>
        </div>

    </div>
</footer>

<div class="loginout" @click="loginOut">
    退出登陆
</div>
</div>


</template>




<script>
import {getSaveToken} from  '../../Token/index'
import { MessageBox } from 'mint-ui';
export default {
data(){
    return {
        user:{}
    }
},

mounted(){
  this.init()

},

methods:{
    init(){
        if(!getSaveToken()){
            this.$router.replace("/person")
            return;
        }
       this.user=getSaveToken()



    },
    loginOut(){

        window.localStorage.removeItem("token")
        MessageBox(this.user.name+"您好：","期待下次再见！")
        .then(resolve=>{
            window.location.reload()
        })
        
    }
}

}
</script>


<style lang='stylus' scoped rel='stylesheet/stylus'>
.container
    padding-bottom 15px
    background #EEEEEE
    header

        height 140px 
        box-sizing border-box
        padding 18px 10px
        background url(https://yanxuan.nosdn.127.net/5905098f74e04c39fa5e76ebb9ff591b.png?imageView&type=webp)
        background-size cover
        background-repeat no-repeat
        .person
            &:after 
                content ""
                display block
                clear both
            float left
            .avater
                float left
                img 
                    width 80px
                    height 80px
                    border-radius 50%
            .detail
                float left
                margin-top 18px
                margin-left 14px
                font-weight 550
                h2
                    font-size 16px
                    color white
                    margin-bottom 10px
                h5 
                    font-size 14px
                    color white
    section 
        padding 8px 12px
        background #fff
        .mymoney
            background #fff
            font-size 14px
            border-bottom 1px solid #EBEBEB
            padding-bottom 12px
            padding-top 10px
            color #333
        .short_utils
            margin-top 15px
            display flex
            justify-content space-around
            li 
                display flex
                flex-direction column
                text-align center
                span 
                    margin 4px 0
                    font-size 13px
                    font-weight 700
                    color #333
                    &:last-child
                        font-weight 400 
                        margin-left 3px
                        margin-top 4px
                        margin-bottom 4px
        .gg1
            margin 25px 0
            img 
                width 100% 
                border-radius 15px  
    footer
        
        background #fff
        margin-top 11px
        padding 8px 12px
        .gg2 
            img 
                width 100%
                border-radius 15px 
        .function
            &:after 
                content ""
                display block
                clear both
            margin-top 15px
            >div
                padding 14px 2px
                float left
                width 30%
                text-align center
                border 1px solid #F6F6F6
                p 
                    font-size 14px
                    color #333
                    margin-top 8px
            span
                font-size 24px
                color #333
    .loginout
        font-size 16px
        text-align center
        background #fff
        height 40px
        margin 10px 0 50px 0
        line-height 40px
        padding 0 0



            
</style>