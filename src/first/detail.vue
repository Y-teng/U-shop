<template>
<div>
   <!-- 导航栏 -->
    <van-nav-bar title="商品详情" left-arrow @click-left="$router.back()" />
    <!-- 详情内容渲染 -->
    <div class="content">
      <img
        :src="
          detailList.img
            ? $imgUrl + detailList.img
            : 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.bjtata.com%2Fimg%2F596623fa6155615e.jpg&refer=http%3A%2F%2Fimg.bjtata.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613783283&t=162b9eed06c469f5802e7d367181dcc5'
        "
        alt=""
      />
    </div>
    <p class="goodsname">商品名称：{{ detailList.goodsname }}</p>
    <p>
      <span class="price">￥{{ detailList.market_price }}</span>
      <span class="priceInfo">（此价格不与套装优惠同享）</span>
    </p>
    <div>
      <span class="goodsname">购买数量</span>
      <van-stepper v-model="num" />
    </div>
    <div class="box">
      <p class="goodsname">商品属性:</p>
      <span class="goodsname"> {{ detailList.specsname }}: </span>
      <van-tag v-for="attr in attrList" :key="attr" type="danger">{{
        attr
      }}</van-tag>
      <div class="goodsname">
        商品详情:
      </div>
      <div v-html="detailList.description">
      </div>
            <img
        :src="
          detailList.img
            ? $imgUrl + detailList.img
            : 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.bjtata.com%2Fimg%2F596623fa6155615e.jpg&refer=http%3A%2F%2Fimg.bjtata.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613783283&t=162b9eed06c469f5802e7d367181dcc5'
        "
        alt=""
      />
    </div>
    <!-- 商品导航 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-button
        @click="toCart"
        type="warning"
        text="加入购物车"
      />
      <van-goods-action-button @click="toBuy" type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
//调取封装的接口
import { getGoodsInfo,addCart} from "../util/axios";
import {Toast} from 'vant'
//调用弹框要引入一下
import {Dialog} from 'vant'
export default {
  data() {
    return {
      detailList: {}, //商品详情
      num: 0, //购买数量
      attrList: []
    };
  },
  mounted() {
    //组件一加载就调取商品详情接口
    getGoodsInfo({
      id: this.$route.query.id
    }).then(res => {
      console.log(res, "商品详情");
      if (res.code == 200) {
        this.detailList = res.list[0];
        this.attrList = res.list[0].specsattr
          ? res.list[0].specsattr.split(",")
          : [];
      }
    });
  },
  methods: {
    //跳转购物车事件
    toCart() {
        //已登录的状态，跳转到购物车页面并调取添加购物车接口
        if(sessionStorage.getItem('userInfo')){
            //调取添加购物车接口
            addCart({
                uid:JSON.parse(sessionStorage.getItem('userInfo')).uid,
                num:this.num,
                goodsid:this.detailList.id
            })
            .then(res=>{
                Toast.success(res.msg)
                //跳转到购物车列表
                this.$router.push({
                    path:'/shoppingcart',
                    query:{
                        uid:JSON.parse(sessionStorage.getItem('userInfo')).uid
                    }
                })
            })
        }else{
            //未登录的状态让其去登录
            this.$router.push('/login')
        }
        
    },
    //跳转到订单页
    toBuy() {
      Dialog.alert({
        message: "暂无订单页，再见！！！"
      }).then(() => {
        // on close
      });
    }
  }
};
</script>

<style lang="" scoped>
@import "../assets/css/detail.css";
</style>
