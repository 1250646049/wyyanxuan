import axios from './axios'

// 根据id获得分类项


export const getcategory=(id)=>axios("/api/item/cateList.json?__timestamp=1604124695465&categoryId="+id)


// 根据当前分类的id 和单个商品项的id获取商品列表项


export const getshopitem =({id,cateid})=>axios.get(`/api/item/list.json?__timestamp=1604157835810&subCategoryId=${id}&categoryId=${cateid}`)

// 根据商品id获取商品详细信息

export const getcategoryshop =(id)=>axios.get(`/api/xhr/item/detailForSpec.json?__timestamp=1604187246506&id=${id}`)

// category ajax end


// cart start 
// 购物车商品项 展示商品详情数据
export const setitemshop=(id)=>axios.get(`/api/xhr/item/detailForSpec.json?__timestamp=1603889177850&id=${id}`)


//cart end 
// 首页 start
export const allcategory=()=>axios.get(`/api/xhr/index.json?__timestamp=1603773666436&`)

//首页end

// 值得买 start
// 获取首页导航栏
export const getdeservecate=()=>axios.get(`/api/topic/v1/know/navWap.json`)

// 分页展示值得买的数据
export const getdetails=(page,size)=>axios.get(`/api/topic/v1/find/recAuto.json`,{params:{
    page:page,
    size:size,
    exceptIds:"117305"   

}})

// // 详情内容页允许上下滑动的数组 封装上一页和下一页的具体内容

export const getdetailallow=()=>axios.get("/api/topic/v1/ding/listAll.json?_=1604325221192")
 //获取详情页当前要展示的数据

 export const getcurrentcontent=(id)=>axios.get("/api/topic/v1/ding/more.json?topicId="+id)

// 根据商品组id去查询商品详情

export const getgulpid=(id)=>axios.get("/aps/web/getGroups.do?groupIds="+id)

//值得买 end


// Item start
// 获取榜单item展示

export const itemselect=(item)=>axios.get("/api/xhr/item/saleRankItems.json",{params:{
    categoryId: item.categoryId,
    subCategoryId: item.id
}})

// 获取榜单导航栏目项

export const selectclassify=(id)=>axios.get("/api/item/saleRank.json?__timestamp=1603811168193&categoryId="+id+"&subCategoryId=0")


// 获取客户实时下单数据
export const onorder=()=>axios.get("/api/xhr/item/getSubmitOrderInfo.json?__timestamp=1603883586736&")

// Item 下单获取商品详情信息
export const getshopdetail =(id)=>axios.get("/api/xhr/item/detailForSpec.json?__timestamp=1603889177850&id="+id+"")
// Item end

// sale start

//获取抢购时间表
export const gettodaysale=()=>axios.get("/api/xhr/flashSale/getScreen.json")

// 获取轮播图
export const getbananer=()=>axios.get("/api/xhr/flashSale/getBanners.json")
// 获取抢购的商品


export const getShop=(id)=>axios.get("/api/xhr/flashSale/getScreen.json?screenId="+id+"&topItemId=0")