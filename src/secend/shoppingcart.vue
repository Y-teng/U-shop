<template>
  <div>
    <!-- 导航栏 -->
    <div class="header">
      <h3>
        <i class="iconfont icon-demo1" @click="$router.go(-1)"></i> 购物车
      </h3>
    </div>
    <div class="nav">
      <van-list v-if="cartList.length > 0">
        <van-swipe-cell v-for="item in cartList" :key="item.id">
          <input
            name="checkbox"
            value="Item 1"
            type="checkbox"
            class="tui-checkbox"
            v-model="item.checked"
          />
          <van-card
            :price="item.price.toFixed(2)"
            desc="描述信息"
            :title="item.goodsname"
            :num="item.num"
            :thumb="
              item.img
                ? $imgUrl + item.img
                : 'https://img.yzcdn.cn/vant/ipad.jpeg'
            "
          >
            <template #footer>
              <van-stepper
                v-model="item.num"
                theme="round"
                button-size="22"
                disable-input
              />
            </template>
          </van-card>
          <template #right>
            <van-button
              @click="delCart(item.id)"
              text="删除"
              type="danger"
              class="delete-button"
            />
          </template>
        </van-swipe-cell>
        <div class="bottom">
          <div class="left">
            <div class="checkbox">
              <!-- 表单事件不用 click 事件， 用change 事件 -->
              <input
                name="checkbox"
                value="Item 1"
                type="checkbox"
                class="tui-checkbox"
                @change="checkAll"
                v-model="allCheck"
              />
            </div>
            <p>全选</p>
          </div>
          <div class="center">
            <p class="allPrice" v-if="cartList.length > 0">
              总计：<span> ￥{{ allPrice }}</span>
            </p>
            <p class="tran">不含运费，已优惠￥0.00</p>
          </div>
          <div class="right">
            <span @click="onSubmit(cartList.id)">去结算({{ allPrice }})</span>
          </div>
        </div>
      </van-list>

      <!-- 无商品列表 -->
      <van-list v-else
        ><van-empty description="购物车空空如也快去买买买！！！"
      /></van-list>
    </div>
  </div>
</template>

<script>
//引入接口
import { getCartList, deleteCart } from "../util/axios";
//引入弹框
import { Dialog, Toast } from "vant";
export default {
  data() {
    return {
      checked: false,
      allCheck: false,
      cartList: [],
      num: 1, //是商品数量
    };
  },
  mounted() {
    this.getCartList();
  },
  computed: {
    //合计金额
    allPrice() {
      //数量* 单价之后累加
      let sum = 0;
      this.cartList.map((item) => {
        if (item.checked) {
          sum += item.price * item.num;
        }
      });
      return sum;
    },
  },
  methods: {
    //购物车列表
    getCartList() {
      /*   this.$route.query.uid || JSON.parse(sessionStorage.getItem('userInfo')).uid
      如果你是从商品详情跳转过来，取值取的是商品详情的id
      如果不是，从存储中取出uid */
      getCartList({
        uid:
          this.$route.query.uid ||
          JSON.parse(sessionStorage.getItem("userInfo")).uid,
      }).then((res) => {
        if (res.code == 200) {
          this.cartList = res.list ? res.list : [];
        }
      });
    },
    //封装一个购物车删除事件
    delCart(id) {
      deleteCart({
        id,
      }).then((res) => {
        if (res.code == 200) {
          this.getCartList();
          Toast.success(res.msg);
        } else {
          Toast.fail(res.msg);
        }
      });
    },
    // 多选
    checkAll() {
      //循环遍历数组去改变checked的值，它的值应该要与 allCheck保持一致
      //循环遍历 forEach() map() for()
      this.cartList.forEach((item) => {
        item.checked = this.allCheck;
      });
    },
    onSubmit(id) {
       this.$router.push({
        path:'/order',
        query:{
          id
        }
      })
    },
  },
  watch: {
    cartList: {
      deep: true,
      handler() {
        this.allCheck = this.cartList.every((item) => item.checked);
      },
    },
  },
  //进入组件前的组件守卫
  beforeRouteEnter(to, from, next) {
    console.log(to, "进入的页面");
    console.log(from, "来自的页面");
    console.log(sessionStorage.getItem("userInfo"), "会话存储");
    if (sessionStorage.getItem("userInfo")) {
      //如果已经登录，直接放行，跳转到购物车
      next();
    } else {
      Dialog.confirm({
        title: "未登录",
        message: "未登录不能查看购物车，请先登录",
      })
        .then(() => {
          // on confirm 确定
          console.log("跳到登录");
          next("/login");
        })
        .catch(() => {
          //取消就回到上一页 取消
          next(from.path);
        });
    }
  },
};
</script>

<style  lang="" scoped>
@import url("../assets/css/shopcar.css");
</style>
