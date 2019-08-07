<template>
  <div class="container">
      <!-- 为内容管理添加插槽 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
          <!-- 使用默认插槽 -->
          <slot></slot>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  // 定义组件名;
  name: 'my-bread'
}
</script>

<style scoped lang='less'></style>
