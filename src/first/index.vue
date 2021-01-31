<template>
  <div>
    <!-- 
        路由导航链接  to属性一定要和path地址匹配
        router-link 默认是a标签。你不喜欢，通过tag属性去改变它的
        默认标签
     -->
    <van-tabbar router v-model="active" active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item to='/home' icon="wap-home">商城</van-tabbar-item>
      <van-tabbar-item to='/classify' icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item to='/shoppingcart' icon="shopping-cart">购物车</van-tabbar-item>
      <van-tabbar-item to='/user' icon="friends">个人中心</van-tabbar-item>
    </van-tabbar>
    <!-- 二级路由出口 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
data() {
  return {
     active:0
  }
},
};
</script>

<style lang="" scoped>
</style>
