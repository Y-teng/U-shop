import http from './axios'

// 前台移动端接口集合
// 调用接口

// 启动服务器 api

// 封装轮播图接口 
export function getBanner(){
    return http.get('/api/getbanner')
}

// 封装获取商品列表接口 
export function getIndexGoodsList(){
    return http.get('/api/getindexgoods')
}

// 封装一个获取分类树结构列表接口
export function getClassifyList(){
    return http.get('/api/getcatetree')
}
// 封装一个获取分类商品列表接口
export function getGoods(params){
    return http.get('/api/getgoods',{params})
}
// 封装一个商品详情接口
export function getGoodsInfo(params){
    return http.get('/api/getgoodsinfo',{params})
}

//封装一个注册接口
export function register(data){
    return http.post('/api/register',data)
}
//封装一个登录接口
export function login(data){
    return http.post('/api/login',data)
}
//封装一个购物车添加接口
export function addCart(data){
    return http.post('/api/cartadd',data)
}

//封装一个购物车删除接口
export function deleteCart(data){
    return http.post('/api/cartdelete',data)
}

//封装一个购物车列表
export function getCartList(params){
    return http.get('/api/cartlist',{ params })
}