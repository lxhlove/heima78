// 封装存储用户信息的sessionStorage函数,提供给其他模块使用;
// 1.约定key的名字;(要通过key的值进行存取用户信息);
// 2.定义value的格式;(字符串格式的json数据);
const Key = 'heima78-user'
// 导入方法:
export default {
  // 设置用户信息;
  setUser (user) {
    // 存储用互信息user;
    window.sessionStorage.setItem(Key, JSON.stringify(user))
  },
  // 获取用户信息;
  getUser () {
    return JSON.parse(window.sessionStorage.getItem(Key) || '{}')
  },
  // 删除用户信息;
  clearUser () {
    window.sessionStorage.removeItem(Key)
  }
}
