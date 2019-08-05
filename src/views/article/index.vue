<template>
    <div class="container">article</div>
</template>

<script>
export default {
  // 钩子函数;在Vue实例创建完成的时候执行
  created () {
    // 测试发送请求;
    this.$http.get('http://ttapi.research.itcast.cn/mp/v1_0/articles').then(res => {
      // 测试请求是否成功;
      console.log(res.data)
    })
  }
}
</script>

<style scoped lang='less'>

</style>
