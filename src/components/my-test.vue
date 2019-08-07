<template>
  <div class='container'>
      <div class="header">header</div>
      <div class="content">
          <!-- 如果不写内容,认为是默认插槽 -->
          <!-- 为插槽定义具体的名称,则成为具名插槽 -->
          <!-- 为插槽传递数据时使用动态绑定 -->
          <slot name="content" :msg='msg'>备用内容</slot>
      </div>
      <div class="footer">
          <slot name="footer"></slot>
      </div>
  </div>
</template>

<script>
export default {
  // 定义组件名;
  name: 'my-test',
  data () {
    return {
      msg: '组件内部数据'
    }
  }
}
</script>

<style scoped lang='less'></style>
