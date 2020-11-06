import Vue from 'vue'
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'

Vue.use(VeeValidate)
// 提示信息本地化
VeeValidate.Validator.localize('zh_CN', {
    messages: zh_CN.messages,
    attributes: {
      phone: '手机号',
      code: '验证码',
      telphone:'手机号'
    }
  })


// 自定义提示信息

VeeValidate.Validator.extend("isPhone",{
    validate:value=>{

       return /^1\d{10}$/.test(value)
    },
    getMessage:error=>{

        return "必须输入正确的手机号！"
    }


})


VeeValidate.Validator.extend("code",{
    validate:value=>{

        return /^[0-9a-zA-Z]{6}$/.test(value)
    },
    getMessage:error=>"请输入正确的验证码进行校验！"


})
// 对表单项进行验证
