import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store';

import toast from 'components/common/toast/index';
import FastClick from 'fastclick';
import VueLazyLoad from 'vue-lazyload';
// 用Vue.use就会执行obj(toast).install

// 安装toast插件
Vue.use(toast)

Vue.config.productionTip = false

// 解决移动端300ms延迟
FastClick.attach(document.body)

// 使用懒加载的插件
Vue.use(VueLazyLoad,{
  // 当图片没加载时候的占位图
  loading:require('./assets/img/detail/chire.png')
})

// 事件总线
Vue.prototype.$bus = new Vue({})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
