<template>
  <div class="container">
    <!-- 筛选区域 -->
    <!-- 1.定义面板 -->
    <el-card>
      <div slot="header" class="clearfix">
        <my-bread>粉丝管理</my-bread>
      </div>
      <!-- 定义表单项 -->
      <el-form label-width="80px" size="small">
        <el-form-item label="状态">
          <!-- 绑定选项必须参考后台接口 -->
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 定义下拉菜单 -->
        <el-form-item label="频道">
          <!-- clearable:可将选择器清空 -->
          <!-- clearable清空的结果为值变为空字符 -->
          <!-- 使用自己封装的组件 -->
          <!--将数据传递给子组件 :value='reqParams.channel_id' -->
          <!-- @input='reqParams.channel_id=数据' -->
          <my-channel v-model="reqParams.channel_id"></my-channel>

        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            @change="changeDate"
            value-format="yyyy-MM-dd"
            v-model="dateArr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 结果区域 -->
    <el-card>
      <!-- 头部为插槽 -->
      <div slot="header">根据筛选条件共查询到{{total}}条结果:</div>
      <!-- 主体内容区域 -->
      <!-- 1.表格组件的使用 -->
      <!-- data:指定文章列表数据 -->
      <el-table :data="articles">
        <!-- prop:指定字段后的值 -->
        <!-- label:指定列名 -->
        <el-table-column label="封面">
          <!-- 渲染封面所用的图片 -->
          <!-- 获取每次遍历的对象 -->
          <!-- cover:封面 -->
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" fit="cover" style="width:120px;height:100px">
              <!--图片加载失败时 的占位图标  -->
              <div slot="error">
                <img src="../../assets/images/error.gif" style="width:120px;height:100px" alt />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <!-- 插入作用域插槽 -->
          <template slot-scope="scope">
            <!-- 添加自定义内容 -->
            <!-- info代表草稿 -->
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <!-- 代表待审核 -->
            <el-tag v-if="scope.row.status===1">待审核</el-tag>
            <!-- 代表审核通过 -->
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <!-- 代表审核失败 -->
            <el-tag v-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <!-- 代表已删除 -->
            <el-tag v-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" style="width:120px">
          <!-- 添加作用域插槽 -->
          <template slot-scope="scope">
            <el-button type="primary" plain @click='edit(scope.row.id)' icon="el-icon-edit" circle></el-button>
            <el-button type="danger" plain @click="del(scope.row.id)" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 2.分页组件的使用 -->
      <!-- layout:布局 -->
      <!-- total:数据总条数 -->
      <!-- 分页组件默认每页显示10条数据 -->
      <!-- page-size:指定每页显示条数 -->
      <!-- 更改组件的当前页码的时候,需要重新加载渲染列表 -->
      <!-- current-change:将当前页码数据和分页组件进行绑定 -->
      <div style="text-align:center;margin-top:30px">
        <el-pagination
          background
          layout="prev, pager, next, total"
          :total="total"
          :page-size="reqParams.per_page"
          @current-change='changePager'
          :current-change='reqParams.page'
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 搜集筛选出来的表单数据;
      // reqParams:请求参数;
      reqParams: {
        status: null,
        begin_pubdate: null,
        end_pubdate: null,
        channel_id: 1,
        // 当前页码;
        page: 1,
        // 每页显示的条数
        per_page: 20
      },
      // 日期数据;
      dateArr: [],
      // 声明文章列表数据;
      articles: [],
      // 文章列表总条数;
      total: 0
    }
  },
  // 侦听器watch:监听一个data数据的改变,改变后做性能开销较大操作时(异步操作)使用;
  // 使用侦听器监听数据;
  // watch: {
  //   'reqParams.channel_id': function (newVal, oldVal) {
  //     if (newVal === '') {
  //       this.reqParams.channel_id = null
  //     }
  //   }
  // },
  // 组件初始化;
  created () {
    // 获取文章列表数据;
    this.getArticles()
  },
  methods: {
    // 编辑文章列表数据;
    edit (id) {
      // 使用query传参;
      this.$router.push('/publish?id=' + id)
    },
    // 删除文章列表数据;
    // target:文章ID
    del (id) {
      // 1.弹出确认框;
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
      // 2.点击确认;发起删除请求;
        await this.$http.delete(`articles/${id}`)
        // 3.若删除成功,则给出提示并重新渲染数据列表;
        this.$message.success('删除文章列表数据成功')
        this.getArticles()
      }).catch(() => {})
    },
    // 分页功能;
    changePager (newPage) {
      // 重新向后台发送请求,渲染列表;
      // 1.改变当前页码数据;
      this.reqParams.page = newPage
      this.getArticles()
    },
    // 日期筛选功能;
    changeDate (dateArr) {
      // dateArr[]:第一项:起始日期,第二项:结束日期
      // dateArr:具有清空功能,清空的值为null,
      // 将日期进行格式转换,使用moment插件(了解)
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 筛选文章列表数据;
    search () {
      this.reqParams.page = 1
      // 重新获取数据渲染列表;
      this.getArticles()
    },
    // 获取文章列表数据;
    async getArticles () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      // 获取文章列表
      this.articles = data.results
      // 获取文章列表总条数;
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>
.el-card {
  margin-bottom: 20px;
}
</style>
