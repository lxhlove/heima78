// index.js的作用:初始化路由对象,提供给main.js去使用;
// 导入包;
import VueRouter from 'vue-router'
import Vue from 'vue'

// 导入登录组件;
import Login from '@/views/login'

Vue.use(VueRouter)
const router = new VueRouter({
  // []:填写对象,配置路由规则,路径对应的组件
  routes: [
    // 跳转路由:$router.push('/login')或$router.push({name:'login'});
    // component:对应登录组件;
    { path: '/login', name: 'login', component: Login }
  ]
})

// 导出配置项
export default router
