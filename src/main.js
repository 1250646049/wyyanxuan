import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import Vuelazyload from 'vue-lazyload'


import { Cell,Checklist,Popup } from 'mint-ui';
import './assets/reset.css'
import './utils/guard'
import 'lib-flexible'
import './VeeValidate/index'

Vue.component(Popup.name, Popup);


Vue.use(Vuelazyload,{
  preLoad: 1
  ,loading:"https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3028672281,4280382655&fm=26&gp=0.jpg",
})
Vue.config.productionTip = false


Vue.component(Checklist.name, Checklist);
Vue.component(Cell.name,Cell)
new Vue({
  beforeCreate() {
    Vue.prototype.$allBus=this
  },
  render: h => h(App),
  router,
  store

}).$mount('#app')
