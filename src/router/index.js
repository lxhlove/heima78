// index.js的作用:初始化路由对象,提供给main.js去使用;
// 导入包;
import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)
const router = new VueRouter({
  // []:填写对象,路由规则,路径对应的组件
  routes: []
})

// 导出配置项
export default router
