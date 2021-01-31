<template>
  <div id="app">
    <div class="header">
      <h3>
        <i class="iconfont icon-demo1" @click="$router.go(-1)"></i>
        {{ title }}
      </h3>
      <div class="center">
        <i class="iconfont icon-dizhi"></i>
        <img src="../assets/images/logo/white.png" alt />
        <!-- 搜索框 -->
        <input type="text" placeholder="按内容搜索" />
        <i class="iconfont icon-sousuo"></i>
        <i class="iconfont icon-store-line"></i>
      </div>
      <ul class="nav">
        <li v-for="item in menuList" :key="item.id">{{ item.name }}</li>
        <span class="fenlei">
          <i class="iconfont icon-icon-"></i> 分类
        </span>
      </ul>
    </div>
    <div class="content">
      <div class="banner wrap">
        <van-swipe :autoplay="2000">
          <van-swipe-item v-for="item in bannerList" :key="item.id">
            <img class="swiperImg" :src="$imgUrl + item.img" alt />
          </van-swipe-item>
        </van-swipe>
        <van-grid :border="false" :column-num="5">
          <van-grid-item v-for="item in picList" :key="item.title">
            <van-image :src="item.img" />
            <p class="titleName">{{ item.name }}</p>
          </van-grid-item>
        </van-grid>
        <!-- <ul class="miaosha">
          <li v-for="item in picList" :key="item.id">
            <img :src="item.img" alt="" />
            <p>{{ item.name }}</p>
          </li>
        </ul>-->
      </div>
      <div class="play">
        <div class="box1 wrap">
          <div class="left">
            <p class="p1">
              <span>限时秒杀</span>
              <a href="#">
                查看更多
                <i class="iconfont icon-shouqi"></i>
              </a>
            </p>
            <p class="p2">{{ msg1 }}</p>
            <p class="p3">
              <span>05</span>:
              <span>20</span>:
              <span>48</span>
            </p>
          </div>
          <div class="right">
            <div class="top">
              <p class="p1">品牌上新</p>
              <p class="p2">{{ msg2 }}</p>
              <a class="p3">
                疯抢红包
                <i class="iconfont icon-shouqi"></i>
              </a>
            </div>
            <div class="bottom">
              <p class="p1">日用好物</p>
              <p class="p2">{{ msg3 }}</p>
              <a class="p3">
                塞满奖券
                <i class="iconfont icon-shouqi"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <van-tabs type="card">
        <van-tab title="最新商品">
          <van-card
            v-for="newGoods in newList"
            :key="newGoods.id"
            :price="newGoods.price.toFixed(2)"
            desc="描述信息"
            :title="newGoods.goodsname"
            :thumb="
            newGoods.img ? $imgUrl + newGoods.img : 'https://img.yzcdn.cn/vant/ipad.jpeg'"
          />
        </van-tab>
        <van-tab title="爆款商品">
          <van-card
            v-for="hotGoods in hotList"
            :key="hotGoods.id"
            :price="hotGoods.price.toFixed(2)"
            desc="描述信息"
            :title="hotGoods.goodsname"
            :thumb="
            hotGoods.img ? $imgUrl + hotGoods.img : 'https://img.yzcdn.cn/vant/ipad.jpeg' "
          />
        </van-tab>
        <van-tab title="所有商品">
          <van-card
            v-for="goods in goodsList"
            :key="goods.id"
            :price="goods.price.toFixed(2)"
            desc="描述信息"
            :title="goods.goodsname"
            :thumb="
            goods.img  ? $imgUrl + goods.img: 'https://img.yzcdn.cn/vant/ipad.jpeg'"
          />
        </van-tab>
      </van-tabs>
   
    </div>
  </div>
</template>
<script>
// 引入接口文档
import { getBanner, getIndexGoodsList } from "../util/axios";
//引入axios的核心库
import axios from "axios";
export default {
  data() {
    return {
      title: "小U商城",
      flag: "0",
      isShow: "0",
      msg1: "每天0点场，好货秒不停",
      msg2: "9点整，抢大牌",
      msg3: "愿君多采撷",
      menuList: [
        {
          id: 1,
          name: "推荐"
        },
        {
          id: 2,
          name: "女装"
        },
        {
          id: 3,
          name: "鞋包"
        },
        {
          id: 4,
          name: "居家"
        },
        {
          id: 5,
          name: "母婴 "
        },
        {
          id: 6,
          name: "美妆 "
        }
      ],
      picList: [
        {
          id: 1,
          img: require("../assets/images/banner/kingkong/seckill.png"),
          name: "限时秒杀"
        },
        {
          id: 2,
          img: require("../assets/images/banner/kingkong/top.png"),
          name: "畅销商品"
        },
        {
          id: 3,
          img: require("../assets/images/banner/kingkong/brand.png"),
          name: "品质大牌"
        },
        {
          id: 4,
          img: require("../assets/images/banner/kingkong/selfsupport.png"),
          name: "小U自营"
        },
        {
          id: 5,
          img: require("../assets/images/banner/kingkong/integral.png"),
          name: "积分商城"
        }
      ],
      bannerList: [],
      hotList: [], //热门商品
      newList: [], //最新商品
      goodsList: [] //所有商品
    };
  },
  mounted() {
    //并发处理操作
    //让你按照执行接口顺序去操作你的接口
    axios.all([getBanner(), getIndexGoodsList()]).then(
      axios.spread((bannerList, goodsList) => {
        console.log(bannerList, "轮播图列表");
        console.log(goodsList, "商品列表");
        //轮播图
        if (bannerList.code == 200) {
          this.bannerList = bannerList.list;
        }
        //商品列表
        if (goodsList.code == 200) {
          this.newList = goodsList.list[0].content;
          this.hotList = goodsList.list[1].content;
          this.goodsList = goodsList.list[2].content;
        }
      })
    );
  }
};
</script>
<style lang="" scoped>
@import url("../assets/css/home.css");
</style>