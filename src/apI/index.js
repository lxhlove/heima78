// 配置一个axios;并将其进行导出;
// 1.导入axios;
import axios from 'axios'
// 导入token信息;
import store from '@/store'
// 2.进行配置;
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

// axios.defaults.headers = {
//   Authorization: `Bearer ${store.getUser().token}`
// }

// 在每次请求之前,获取token信息,追加在headers中;
// interceptors.request:请求拦截器;(只会执行一次)
// headers配置请求头信息;
// Bearer+空格+token信息;
axios.interceptors.request.use((config) => {
  // 拦截成功时执行的程序;(修改config)
  config.headers = {
    Authorization: `Bearer ${store.getUser().token}`
  }
  return config
}, (error) => {
  // 错误处理程序;
  return Promise.reject(error)
})

// 响应拦截器;
// 目的:对响应的结果进行指定的处理(获取状态码进行判断);
axios.interceptors.response.use((res) => {
// 拦截成功,
  return res
}, (err) => {
// 若拦截失败,则获取响应状态码并进行状态码的判断;
// 响应对象中包含响应状态码;err.response.status;
  if (err.response.status === 401) {
    // 跳转到登录页;
    location.hash = '#/login'
  }
  return Promise.reject(err)
})

// 3.进行导出;
export default axios
