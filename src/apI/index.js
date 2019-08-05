// 配置一个axios;并将其进行导出;
// 1.导入axios;
import axios from 'axios'
// 导入token信息;
import store from '@/store'
// 2.进行配置;
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// headers配置请求头信息;
// Bearer+空格+token信息;
axios.defaults.headers = {
  Authorization: `Bearer ${store.getUser().token}`
}
// 3.进行导出;
export default axios
