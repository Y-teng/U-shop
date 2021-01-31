<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()" />
    <van-form @submit="login">
      <van-field
        v-model="loginList.phone"
        name="手机号"
        label="手机号"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请输入手机号' }]"
      />
      <van-field
        v-model="loginList.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
// 引入轻提示
import {Toast} from 'vant'
import {login} from '../util/axios'
export default {
  data() {
    return {
         loginList:{
            phone:'',
            password:''
        }
    };
  },
   methods: {
      //封装一个登录事件
      login(){
          login(this.loginList)
          .then(res=>{
              console.log(res,'响应');
              if(res.code==200){
                  //登录成功之后把信息存储到本地存储中
                  sessionStorage.setItem('userInfo',JSON.stringify(res.list))
                  //登录成功之后跳转到 个人中心页面
                  this.$router.push('/user')
                  Toast.success(res.msg)
              }else{
                   Toast.fail(res.msg)
              }

          })
      }
  },
};
</script>

<style lang="" scoped>
.van-nav-bar {
  height: 0.88rem;
  padding-top: 0.2rem;
  background-image: linear-gradient(180deg, #ff6040 0%, #ff8a80 100%);
  box-shadow: 0 2px 6px 0 rgba(255, 149, 128, 0.5);
}
.van-field{
    height: 1rem;
    line-height: 1rem;
    margin-top: .2rem;
}
.van-button{
    background-color: #ff6040;
    outline: none;
    border-color: transparent;
}
</style>
