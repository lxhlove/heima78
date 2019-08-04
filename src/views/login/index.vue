<template>

    <div class="container">
        <el-card class="my-card">
            <!-- 1.登录logo -->
            <img src="../../assets/images/logo_index.png" alt="">
            <!-- 2.表单元素 -->
            <!--ref:操作DOM  -->
            <!-- :model="form":做表单校验时会用 -->
            <!-- el-form标签需要进行添加属性 rules;(校验规则对象,声明在data中) -->
            <!-- status-icon自定义校验规则 -->
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules" status-icon>
                <!-- 表单项 -->
                <!-- label:指定该表单元素的说明文字 -->
                <el-form-item  prop="mobile">
                <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
                </el-form-item>

                <!-- el-form-item添加属性 prop;(指定校验的字段名称); -->
                <el-form-item prop="code" >
                <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:230px;margin-right:15px"></el-input>
                <el-button>发送验证码</el-button>
                </el-form-item>
                <!-- 复选框 -->
                <el-form-item>
                    <el-checkbox :value='true'>我已阅读并同意用户协议和隐私条款</el-checkbox>
                </el-form-item>

                <el-form-item>
                    <!-- 对表单进行整体校验时的点击事件 -->
                    <el-button type="primary" style="width:100%" @click='login()'>登 录</el-button>
                </el-form-item>
            </el-form>

        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    // 声明自定义校验函数;
    const checkMobile = (rule, value, callback) => {
      // 校验手机号等需要进行校验的值value;
      // return:阻止当前程序的运行;
      // 手机号格式:1开头, 第二位3-9,后面连接9位数字;
      if (!/^1[3-9]\d{9}$/.test(value)) return callback(new Error('手机号码格式错误'))

      // 校验成功;
      callback()
    }
    return {
      // 表单的数据对象;
      loginForm: {
        // 字段参考后端提供的接口文档;
        mobile: '',
        code: ''
      },
      // 校验规则对象;
      loginRules: {
        // 定义关于mobile的校验规则;
        // require:必填项;
        // trigger:触发事件;
        mobile: [
          { required: true, message: '请输入手机号', triggerer: 'blur' },
          // 定义校验格式的规则;
          // validator:自定义校验函数;
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', triggerer: 'blur' },
          { len: 6, message: '请输入六位验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      // 对整体表单进行校验;
      // 1.获取el-form对象;
      this.$refs.loginForm.validate((valid) => {
        // 判断校验是否成功;
        if (valid) {
          console.log('success')
        }
        // 2.校验成功则发起登录请求;
        this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm).then(res => {
          // res:响应对象;
          // res.data:返回的数据;
          // 判断请求是否成功;
        //   console.log(res.data)
          // 若请求成功,则直接跳转到首页;
          // 首页的路由为'/';
          this.$router.push('/')
        })
        // 请求失败;
          .catch(() => {
            // 提示用户名或密码错误;
            this.$message.error('手机号或密码错误')
          })
      })
    }
  }
}
</script>

<style scoped lang='less'>
//定义登录界面的全频容器;
    .container{
        width:100%;
        height:100%;
        position:absolute;
        //center / cover:北京图定位/背景图尺寸;
        //cover :等比缩放,铺满容器;
        background: url(../../assets/images/login_bg.jpg) no-repeat center / cover;

        .my-card{
            width:400px;
            height:360px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-60%);
            img{
                width: 200px;
                display: block;
                margin: 0 auto;
                margin-bottom: 30px;

            }
        }
    }
</style>
