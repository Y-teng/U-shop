// 封装路由模块
// 路由是vue的核心插件
// 引入核心库
import Vue from 'vue'
// 引入路由插件
import Router from 'vue-router'
// 在vue中调用路由插件
Vue.use(Router)
// 实例化Router 得到它的属性和方法
//引入要渲染的组件
//@代表src


export default new Router({
  routes: [
    {
      path: '/index', //地址,urL访问的地址
      component: () => import('@/first/index'),
      //路由再哪里渲染就在哪里注册
      children: [
        {
          path: "/home",
          component: () => import('@/secend/home'),
        },
        {
          path: "/shoppingcart",
          component: () => import('@/secend/shoppingcart'),
        },
        {
          path: "/user",
          component: () => import('@/secend/user'),
        },
        {
          path: "/classify",
          component: () => import('@/secend/classify'),
        },
        {
          //二级路由重定向
          path: "",
          redirect: "/home"
        }
      ]
    },
    {
      path: '/order',
      component: () => import('@/first/order')
    },
    {
      path: '/list',
      component: () => import('@/first/list')
    },
    {
      path: '/regist',
      component: () => import('@/first/regist'),
    },
    {
      path: '/login',
      component: () => import('@/first/login'),
    },
    {
      path: '/detail',
      component: () => import('@/first/detail'),
    },
    //一级路由重定向
    {
      path: "*",
      redirect: "/index"
    }
  ]
})