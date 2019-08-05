// 内部的代码只会执行一次;
import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 导入请求模块;
import axios from '@/apI'

// 导入路由
import router from './router/index.js'

// 导入公用样式;
import '@/styles/index.less'
// 进行全局挂载;
Vue.prototype.$http = axios

// 是否开启产品级别提示;(不开启)
Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  el: '#app',
  // 配置路由
  router,
  render: h => h(App)
}).$mount('#app')
