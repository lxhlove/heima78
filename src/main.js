import Vue from 'vue'
import App from './App.vue'

// 是否开启产品级别提示;(不开启)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
