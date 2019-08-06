<template>
  <el-container class="wrapper">
    <!-- 动态绑定,实现侧边栏的显示与隐藏切换 -->
    <el-aside :width=" isCollapse ? '64px' :'200px'">
      <!-- 1.logo -->
      <!-- 动态绑定类名,进行大小图的切换 -->
      <div class="logo" :class='{miniLogo:isCollapse }'></div>
      <!-- 2.导航菜单 -->
      <!-- 导航菜单容器 -->
      <!-- default-active="2" 默认激活的菜单项 指定的其实就是菜单项的index属性的值-->
      <!-- 导航菜单容器 -->
      <!-- background-color="#545c64" 背景颜色 -->
      <!-- text-color="#fff" 文字颜色 -->
      <!-- active-text-color="#ffd04b" 激活文字颜色 -->
      <!-- 动态绑定isCollapse,实现侧边栏文字的大小切换 -->
      <!-- 动态绑定导航栏路径:this.$route.path -->
      <!-- router:是否使用 vue-router 的模式，启用router-vue会在激活导航时以 index 作为 path 进行路由跳转 -->
      <el-menu
      router
      :collapse="isCollapse"
      :collapse-transition="false"
        :default-active="$route.path "
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <!-- el-submenu 是菜单项包含子级菜单 -->
        <!-- el-menu-item 是菜单项不包含子级菜单 -->
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/settint">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <!-- 为侧边栏切换绑定事件 -->
        <span class="el-icon-s-fold" @click='toggleMune()'></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <!-- 下拉菜单 -->
        <el-dropdown class="my-dropdown">
          <span class="el-dropdown-link">
            <!-- 将从本地存储中获取的数据信息动态绑定到用户头像和姓名 -->

            <img :src="photo" alt />
            {{name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!--添加动态绑定 -->
            <!-- 注意:click绑定的必须是原生的DOM,绑定在组件上将会被认为是自定义事件 -->
              <!-- click想要绑定在解析后的DOM上必须使用事件修饰符native:(绑定原生事件) -->
            <el-dropdown-item icon="el-icon-setting" @click.native='setting()'>个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" @click.native='logout()'>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!-- 二级路由欢迎页面的出口,(组件显示的位置) -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入本地存储模块,
import store from '@/store'
export default {
  data () {
    // 定义显示与隐藏的数据
    return {
      isCollapse: false,
      // 声明用户姓名:
      name: '',
      photo: ''
    }
  },

  // 获取用户信息;
  created () {
    // 从本地存储中获取数据;
    const user = store.getUser()
    this.name = user.name
    this.photo = user.photo
  },
  // 侧边栏进行切换;
  methods: {
    // 侧边栏进行切换(收起与展开);
    toggleMune () {
      this.isCollapse = !this.isCollapse
    },
    setting () {
      // 跳转到个人设置界面;
      this.$router.push('/setting')
    },
    logout () {
      // 清除本地存储中保存的用户信息;
      store.clearUser()
      // 跳转回登录页;
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang='less'>
//组件的名称即解析后组件容器的类名;
//设置el-container全频容器类名为wrapper;

.wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside {
    background-color: #002033;
  }
  .el-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .el-icon-s-fold {
      font-size: 24px;
      vertical-align: middle;
    }
    .text {
      vertical-align: middle;
    }
    .my-dropdown {
      float: right;
      .el-dropdown-link {
        font-weight: bold;
      }
      img {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
    }
  }
}
.logo {
  width: 100%;
  height: 60px;
  background: #002244 url(../../assets/images/logo_admin.png) no-repeat center /
    140px auto;
}
.miniLogo{
  background-image: url(../../assets/images/logo_admin_01.png);
  background-size: 36px auto;
}
.el-menu{
  border-right: none;
}
</style>
