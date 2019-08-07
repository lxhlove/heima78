// 目的:封装一个Vue插件;
// 作用:将components下的所有组件封装为全局组件;
// Vue插键定义的规则:
// 1.定义一个对象;
// 2.对象中包含install选项,对应的是一个函数;
// 3.函数有形参(形参为Vue对象);
import MyTest from '@/components/my-test'
import MyBread from '@/components/my-bread'
export default {
  install (vue) {
    // vue.use:使用插件; Vue就是插件的调用者;
    // 将组建进行全局注册;
    vue.component(MyBread.name, MyBread)
    vue.component(MyTest.name, MyTest)
  }
}
