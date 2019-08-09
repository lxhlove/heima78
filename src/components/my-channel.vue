<template>
  <!-- 封装组件 -->
  <el-select clearable :value='value' placeholder="请选择" @change="fn">
    <!-- item.name:频道名称 -->
    <!-- item.id:频道ID -->
    <!-- key:唯一标识符 -->
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  // 接收value的值;
  props: ['value'],
  data () {
    return {
      channelOptions: []
    }
  },
  watch: {
    'myValue': function (newVal, oldVal) {
      if (newVal === '') {
        this.myValue = null
      }
    }
  },
  created () {
    // 获取频道下拉选项数据;
    this.getChannelOptions()
  },
  methods: {
    fn (val) {
      // 后端不支持空字符问题
      if (val === '') { val = null }

      // 更新父组件的频道列表;
      this.$emit('input', val)
    },
    // 向服务器发起请求,获取频道下拉菜单选项数据;
    async getChannelOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.channelOptions = data.channels
    }
  }
}
</script>

<style scoped lang='less'></style>
