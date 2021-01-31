<template>
  <div>
    <div class="header">
      <h3>
        <i class="iconfont icon-demo1" @click="$router.go(-1)"></i> 确认订单
      </h3>
       <div class="address" v-for="item in list" :key="item.id">
      <p class="p1">
        <span>{{ item.name }}</span>
        <span>{{ item.tel.replace("0133", "****") }}</span>
      </p>
      <p class="p2">{{ item.address }}</p>
    </div>
    </div>
    <div class="mask"></div>
    <div class="goodsSelect">
      <div class="goodsSelect-in">
        <div class="title">
          <div class="left">
            <div class="cars">
              <i class="iconfont icon-gouwuchekong"></i>
            </div>
            <h3>品牌精选</h3>
          </div>
          <div class="right">
            <p>已免运费</p>
            <span>|</span>
            <p>领券</p>
          </div>
        </div>
        <!-- 第一列 -->
        <div class="goods">
          <div class="pic">
            <img :src="goodsList.img" alt="" />
          </div>
          <div class="right">
            <div class="top">
              <h3>溪牧原山茶花洁面泡沫 氨基酸洗面奶150ML 浸透舒缓</h3>
            </div>
            <div class="bottom">
              <div class="priceNum">
                <div class="price">
                  <span>￥</span>
                  <p>999</p>
                </div>
                <div class="num">
                  <span>x</span>
                  <span>1</span>
                </div>
              </div>
              <div class="button">
                <div class="one">
                  <p class="first">7天无理由退货</p>
                  <span class="second"> 特价</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="goods">
          <div class="pic">
            <img :src="goodsList.img" alt="" />
          </div>
          <div class="right">
            <div class="top">
              <h3>溪牧原山茶花洁面泡沫 氨基酸洗面奶150ML 浸透舒缓</h3>
            </div>
            <div class="bottom">
              <div class="priceNum">
                <div class="price">
                  <span>￥</span>
                  <p>999</p>
                </div>
                <div class="num">
                  <span>x</span>
                  <span>1</span>
                </div>
              </div>
              <div class="button">
                <div class="one">
                  <p class="first">7天无理由退货</p>
                  <span class="second"> 特价</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="beizhu">
          <p>发票类型 <a href="#">不卡发票></a></p>
          <p>售后免邮 <span>部分商家赠送</span></p>
          <p>
            买家留言
            <span>填写内容需要与商家协商并确认，45字以内</span>
          </p>
        </div>
      </div>
      <div class="order">
        <p>商品金额 <span>￥1998</span></p>
        <p>优惠活动 <span>-￥200</span></p>
        <!-- 优惠券单元格 -->
        <p>
          <van-coupon-cell
            :coupons="coupons"
            :chosen-coupon="chosenCoupon"
            @click="showList = true"
          />
          <!-- 优惠券列表 -->
          <van-popup
            v-model="showList"
            round
            position="bottom"
            style="height: 90%; padding-top: 4px"
          >
            <van-coupon-list
              :coupons="coupons"
              :chosen-coupon="chosenCoupon"
              :disabled-coupons="disabledCoupons"
              @change="onChange"
              @exchange="onExchange"
            />
          </van-popup>
        </p>
      </div>
    </div>
    <div class="tall">
      <div class="left">
        <p>合计:<i>￥1998</i></p>
        <p><span>已免运费</span> <span>已优惠￥200元</span></p>
      </div>
      <div class="right">
        <span>确认订单</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
const coupon = {
  available: 1,
  condition: "无使用门槛\n最多优惠12元",
  reason: "",
  value: 150,
  name: "优惠券名称",
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: "1.5",
  unitDesc: "元",
};
export default {
  data() {
    return {
      showList: false,
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon],
      list: [
        {
          id: "1",
          name: "袁腾腾",
          tel: "17301330280",
          address: "北京市 朝阳区 王四营镇 五方桥 中公教育基地 1号楼 1107室 ",
        },
      ],
      goodsList: {
        id: 1,
        img: require("../assets/images/commodity/01.png"),
      },
    };
  },
  methods: {
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange(code) {
      this.coupons.push(coupon);
    },
  },
};
</script>

<style lang="" scoped>
@import "../assets/css/order/order.css";

</style>
