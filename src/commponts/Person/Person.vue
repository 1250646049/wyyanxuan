<template>


<div class="wraps" :style="{'background':isShow==false?'#fff':'#F2F5F4'}">
    <Header></Header>
    <div  :class="isShow==false?'phone_img':'bg_img'" >
        <img src="https://yanxuan.nosdn.127.net/39c5e4583753d4c3cb868a64c2c109ea.png" alt="">
    </div>

    <div class="login" v-show="isShow">
        <button @click="isShow=false"><span class="iconfont icon-shouji"></span> 手机号快捷登陆</button><button><span class="iconfont icon-youxiang"></span> 邮箱号快捷登陆</button>
    </div>
    <div class="phone_login" v-show="!isShow">
        <ul>
            <li>
                <input type="tel" v-model="tels" name="telphone" id="" v-validate="'required|isPhone'">
                <p  style="color:red;margin-top:5px;" v-show="errors.has('telphone')">{{errors.first('telphone')}}</p>
            </li>
            <li>
                <input type="text" name="code" v-validate="'required|code'"> <a @click.prevent="getYzmCode($event)" disabled="true"   href="">获取验证码</a>
                <p style="color:red;margin-top:5px;" v-show="errors.has('code')">{{errors.first('code')}}</p>
            </li>
            <li>
                <span class="problem">遇到问题？</span>
                 <span class="use">使用密码登陆</span>
            </li>
            <li>
                <button @click="loginTo">立即登陆</button>
            </li>
        </ul>
        <p class="other" @click="isShow=true">其他登陆方式</p>
    </div>
    <footer v-show="isShow">
        <span><i class="iconfont icon-weixin"></i> 微信</span>
        <span><i class="iconfont icon-QQ"></i> QQ</span>
        <span><i class="iconfont icon-weibo"></i> 微博</span>
    </footer>
</div>



</template>




<script>
import Header from '../../pages/Header/Header' 
import { MessageBox } from 'mint-ui';
import {token,saveToken,getSaveToken} from  '../../Token/index'
export default {
    data(){
        return {
            isShow:true,
            isClick:true,
            tels:''
        }
    },

    components:{
        Header
    },
    mounted(){
        this.init()
    },
    methods:{
        getYzmCode($event){
                if(this.isClick==false) return;
            let yzm=$event.target     
            let time=30;
          let timer=setInterval(()=>{
             
                if(time==0){
                    this.isClick=true
                    yzm.innerHTML="获取验证码"
                      clearInterval(timer)
                      
                }else {
                    this.isClick=false
                     yzm.innerHTML=time--+"后重新尝试"
                }
               
              
            },1000)    

        },
        async loginTo(){
             const success = await this.$validator.validateAll(['telphone','code'])
            if(!success){
                MessageBox("警告","请将信息填写完整正确！")
                return
            }
            let name="用户:"+this.tels.substring(5);
          try {
              name= await MessageBox.prompt('登陆成功,请输入您的名字')
              name=name.value
          } catch (error) {
              console.log(error)
          }
            let usesr={
                phone:this.tels,
                name:name

            }
                saveToken(token(usesr))
            this.$router.replace("/loginSuccess")
        },
          init(){
            if(getSaveToken()){
            this.$router.replace("/loginSuccess")
            return;
        }
       this.user=getSaveToken()



    }
    }


}
</script>


<style lang='stylus' scoped rel='stylesheet/stylus'>

.wraps
    width 100vw
    z-index 1
    height 100vh
    
   
    overflow hidden
   
    .bg_img
        margin-top 40px
        position relative
        height 40vh
        text-align center
        line-height 40vh
        img 
            
            width 35%
    .phone_img
        margin-top 40px
        position relative
        height 25vh
        text-align center
        line-height 25vh
        img 
            
            width 35%
    .login
        button
            border 1px solid #DD1A21
            display block
            margin 8px auto
            width 85%
            padding 20px 0
            span    
                vertical-align sub
                font-size 18px
            &:first-child 
                background #DD1A21
                color white
                margin-bottom 15px
            &:last-child 
                background #fff
                color #DD1A21
    footer
        height 35vh
        text-align center
        font-size 14px
        line-height 35vh
        span 
            display inline-block
            margin 0 10px
            i
                font-size 16px
.phone_login
    ul
        li 
            width 90%
            margin 25px  auto
            &:first-child
                input 
                    width 100%
                    height 35px
                    border-bottom 1px solid #ccc 
                    outline none
                    font-size 14px
                    color #333
            &:nth-child(2)
                position relative
                input 
                    width 100%
                    height 35px 
                    outline none
                    border-bottom 1px solid #ccc    
                a
                    width 25%
                    height 25px
                    position absolute
                    right 0
                    text-align center
                    background #fff
                    border 1px solid #BFBFBF
                    line-height 25px
                    color #333
            &:nth-child(3)
                .problem
                    float left
                    font-size 16px
                    color #7f7f7f !important
                .use
                    font-size 16px 
                    float right
                    color #333
                &:after 
                    clear both
                    content ""
                    display block
             &:nth-child(4)
                button 
                    width 100%
                    background #DD1A21 
                    color white
                    text-align center
                    padding 15px 0 
                    border none  
    .other
        text-align center
        font-size 16px
        margin-top 10px

        margin-bottom 5px
</style>