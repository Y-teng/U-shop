import axios from 'axios'

let http  = axios.create({
    baseURL:'/api'//你的代理服务器地址
})

//axios拦截器
//请求拦截
http.interceptors.request.use(req=>{
      //从存储中取出来token
      let token = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')).token :''
      // 需求：在请求头中添加token令牌
      req.headers.authorization =token
      //设置请求拦截之后，要返回值这个配置
    return req
})

//响应拦截 一般用于全局拦截错误
http.interceptors.response.use(res=>{
    return res.data
})

export default http


