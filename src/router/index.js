import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from '../commponts/Index/Index'
import Cart from '../commponts/Cart/Cart'
import Category from '../commponts/Category/Category'
import Deserve from '../commponts/Deserve/DeserveBuy'
import Person from '../commponts/Person/Person'
import Search from '../commponts/Search/Search'
import LoginSuccess from '../commponts/Person/Ucenter'
import ShopItem from '../commponts/ShopItem/ShopItem'
import CategoryList from '../commponts/ClassifyShop/ClassifyShop'

import DeserveContent from '../commponts/Deserve/DeserveContents/DeserveContents.vue'
import Item from '../commponts/Item/Item'
Vue.use(VueRouter)




export default  new VueRouter({
    mode:"history",
    routes:[
         {path:"/index",component:Index,meta:{isShow:true}},
         {path:"/cart",component:Cart,meta:{isShow:true}},
         {path:"/category",component:Category,meta:{isShow:true}},
         {path:"/person",component:Person,meta:{isShow:true}},
         {path:"/deserve",component:Deserve,meta:{isShow:true}},
         {path:"/search",component:Search,meta:{isShow:true}},
         {path:"/",redirect:"/index"},
         {path:"/item",component:Item,meta:{isShow:false},name:"item"},
         {path:"/categoryList",component:CategoryList,name:"list",meta:{isShow:false},props:true},
         {path:"/shopitems",component:ShopItem,meta:{isShow:false},name:"items",props:true},
         {path:"/deserveContent/:topid",component:DeserveContent,meta:{isShow:false},props:true,name:"deserve"},
         {path:"/loginSuccess",component:LoginSuccess,meta:{isShow:true},name:"success"}
    ],

    

})
