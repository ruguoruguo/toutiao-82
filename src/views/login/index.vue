<template>
    <div class="login">
       <el-card class="login-card" >
           <div class="logo">
               <img src="../../assets/img/logo_index.png" alt="">
           </div>
           <!-- 表单组件 -->
           <el-form style="margin-top:20px;" :model="loginForm" :rules="loginRules" ref="loginForm">
               <!-- 手机号部分 -->
               <el-form-item prop="mobile">
                   <el-input placeholder="输入手机号" v-model="loginForm.mobile"></el-input>
               </el-form-item>
               <!-- 验证码 -->
               <el-form-item prop="code">
                   <el-input style="width:260px;" placeholder="输入验证码" v-model="loginForm.code"></el-input>
                   <el-button  style="float:right">验证码</el-button>
               </el-form-item>
               <!-- 复选框 -->
               <el-form-item prop="check">
                   <el-checkbox v-model="loginForm.check">我已经阅读并同意</el-checkbox>
               </el-form-item>
                <!-- 登录按钮 -->
                <el-form-item>
                    <el-button type="primary"  style="width:100%;" @click="login">登录</el-button>
                </el-form-item>
           </el-form>
       </el-card>

    </div>
</template>

<script>

export default {

  data () {
    let validator = function (rule, value, callBack) {
      if (value) {
        callBack()
      } else {
        callBack(new Error('必须同意'))
      }
    }
    return {
      loginForm: {
        mobile: '',
        code: '',
        check: false
      },
      loginRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3456789]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '必须为6位数'
        }],
        check: [{
          validator
        }]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate(isOk => {
        if (isOk) {
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.loginForm
          }).then((res) => {
            window.localStorage.setItem('user-token', res.data.token)
            this.$router.push('/')
          }).catch(() => {
            this.$message({
              message: '用户名错误',
              type: 'warning'
            })
          })
        }
      })
    }
  }

}
</script>

<style lang="less" scoped>
 .login {
    background-image: url(../../assets/img/login_bg.jpg);
    height: 100vh;
    background-size: cover;
     display: flex;
    justify-content: center;
    align-items: center;
    .login-card {
        width: 450px;
        height: 350px;
        .logo {
            text-align: center;
            img {
                height: 45px;
            }
        }
    }
}
</style>
