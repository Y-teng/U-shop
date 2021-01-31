<template>
  <div id="app">
    <!--一级路由出口 设置路由出口 -->
    <router-view></router-view>
  </div>
</template>

<script>
import vHome from "./secend/home.vue";
export default{
  components:{
    vHome,
  }
}
</script>

<style>
@import url("./assets/css/reset.css");
</style>
