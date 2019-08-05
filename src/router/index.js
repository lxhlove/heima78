// index.js的作用:初始化路由对象,提供给main.js去使用;
// 导入包;
import VueRouter from 'vue-router'
import Vue from 'vue'

// 导入登录组件;
import Login from '@/views/login'
// 导入首页组件;
import Home from '@/views/home'
// 导入欢迎页面组件;
import Welcome from '@/views/welcome'
// 导入内容管理页面组件;
import Article from '@/views/article'
// 导入404页面的组件;
import Notfound from '@/views/404'
// 导入本地存储模块;
import store from '@/store'

Vue.use(VueRouter)
const router = new VueRouter({
  // []:填写对象,配置路由规则,路径对应的组件
  routes: [
    // 跳转路由:$router.push('/login')或$router.push({name:'login'});
    // component:对应登录组件;
    { path: '/login', name: 'login', component: Login },
    // 定义首页路由规则;
    // { path: '/',
    //   name: 'home',
    //   component: Home,
    //   // 将首页进行重定向;
    //   redirect: '/welcome',
    //   // 定义欢迎页面的二级路由;
    //   children: [{
    //     path: '/welcome', name: 'welcome', component: Welcome
    //   }] }

    // 首页路由规则简洁写法:
    {
      path: '/',
      name: 'home',
      component: Home,
      // 定义默认子级路由;
      children: [
        { path: '/', name: 'welcome', component: Welcome },
        // 定义内容管理页面的子级路由;
        { path: '/article', name: 'article', component: Article }
      ]
    },
    // 定义404页面的路由规则;
    { path: '*', name: '404', component: Notfound }
  ]
})
// 创建全局前置导航守卫;(设置跳转路由时的访问权限)
router.beforeEach((to, from, next) => {
  // 1.如果为登录路由则放行;
  if (to.path === '/login') return next()
  // 2.获取用户信息,如果没有,则将其拦截到登录页面;
  if (!store.getUser().token) return next('/login')
  // 3.获取用户信息,如果存在,则放行;
  next()
})

// 导出配置项
export default router
