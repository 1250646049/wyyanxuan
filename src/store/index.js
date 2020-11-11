import Vue from 'vue'
import Vuex from 'vuex'

import state from './State'
import getters from './Getters'
import mutations from './Mutations'
import actions from './Actions'

import Mister from './Mister' 
import Item from './Item'
import Cart from './Cart'
import Category from './Category'
import Deserve from './DeserveBuy'
import NewShop from './NewShop'
import Sale from './Sale'
Vue.use(Vuex)


export default new Vuex.Store({
   modules:{
    Mister,
    Item,
    Cart,
    Category,
    Deserve,
    Sale,
    NewShop
   },
   state,
   mutations,
   actions,
   getters
})