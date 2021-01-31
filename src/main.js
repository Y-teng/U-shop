// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入全局样式
import './assets/css/reset.css'
// 引入rem js
import './assets/js/remScale.js'

// 引入iconfont
import './assets/css/iconfont.css'
import '../node_modules/swiper/css/swiper.min.css'
import '../node_modules/swiper/js/swiper'

// 引入vant UI框架
import VantUI from 'vant'
import 'vant/lib/index.css'
Vue.use(VantUI)


// s设置图片服务器
Vue.prototype.$imgUrl="http://localhost:3000"
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

