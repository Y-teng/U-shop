<template>
  <div>
    <div class="header">
      <h3>
        <i class="iconfont icon-demo1" @click="$router.go(-1)"></i> 小U商城
      </h3>
      <div class="search">
        <i class="iconfont icon-sousuo"></i>
        <input type="text" name="" id="" placeholder="按内容搜索" />
      </div>
      <div class="nav">
        <van-list  v-if="goodsList.length > 0">
          <van-card
          checked=false
            v-for="item in goodsList"
            :key="item.id"
            :price="item.price.toFixed(2)"
            desc="描述信息"
            :title="item.goodsname"
            :thumb="
              item.img
                ? $imgUrl + item.img
                : 'https://img.yzcdn.cn/vant/ipad.jpeg'"

            @click="goDetail(item.id)"
          />

        </van-list>
        <van-list v-else><van-empty description="暂无商品"/></van-list>
        
      </div>
    </div>
  </div>
</template>

<script>
import { getGoods } from "../util/axios";
export default {
  data() {
    return {
      goodsList: [],
    };
  },
  mounted() {
    getGoods({
      fid: this.$route.query.id,
    }).then((res) => {
      console.log(res, "商品列白哦");
      if (res.code == 200) {
        this.goodsList = res.list ? res.list : [];
      }
    });
  },
  methods: {
    // 封装一个跳转详情事件
    goDetail(id){
      this.$router.push({
        path:'/detail',
        query:{
          id
        }
      })
    }
  },
};
</script>

<style lang="" scoped>
@import "../assets/css/list.css";
</style>
