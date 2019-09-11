<template>
  <el-card v-loading="loading" class="box">
      <bread-crumb slot="header">
        <template slot="title">
            账户管理
        </template>
      </bread-crumb>
      <!-- 表单 -->
      <!-- {{userInfo}} -->
      <div id="imagesBox">
        <el-upload action="" :http-request="uploadHeadImg" :show-file-list="false">
          <img :src="userInfo.photo || defaultImg" alt="" class="header-img">
        </el-upload>
      </div>
      <!-- 要给form表单设置宽度,否则表单太长会覆盖右边的图片,导致无法点击到图片会使上传组件无效 -->
      <el-form label-width="100px" :model="userInfo" :rules="userRules" ref="userForm" style="width:400px">
        <el-form-item label="用户名" prop="name">
          <el-input style="width:300px" v-model="userInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="intro">
          <el-input style="width:300px" v-model="userInfo.intro"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input style="width:300px" v-model="userInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input style="width:300px" v-model="userInfo.mobile" disabled></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveUserInfo">保存</el-button>
        </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
import eventBus from '../../utils/events'
export default {
  data () {
    return {
      defaultImg: require('../../assets/img/defalutImg.jpeg'),
      loading: false,
      userInfo: {
        name: '',
        intro: '',
        email: '',
        mobile: '',
        photo: ''
      },
      userRules: {
        name: [{
          required: true,
          message: '用户名不能为空'
        }, {
          min: 2,
          max: 8,
          message: '用户名长度必须为4-8位'
        }],
        email: [{
          pattern: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/,
          message: '邮箱格式不正确'
        }]

      }
    }
  },
  methods: {
    // 上传用户头像
    uploadHeadImg (params) {
      this.loading = true
      let formData = new FormData()
      formData.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data: formData
      }).then((result) => {
        // console.log(result)
        this.loading = false
        this.getUserInfo()
        eventBus.$emit('updateInfo')
      })
    },
    // 保存信息
    saveUserInfo () {
      this.$refs.userForm.validate(isOk => {
        if (isOk) {
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.userInfo
          }).then(() => {
            this.$message({ type: 'success', message: '恭喜修改成功' })
            eventBus.$emit('updateInfo')
          })
        }
      })
    },
    // 获取用户信息
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        // console.log(result)
        this.userInfo = result.data
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
  // .header-img {
  //   position: absolute;

  //   width: 200px;
  //   height: 200px;
  //   border-radius: 50%;
  //   margin-left: 500px;
  // }
  .box {
    position: relative;
     #imagesBox{
       position: absolute;
       left: 500px;
       top:100;
    .header-img {
      width: 200px;
      height: 200px;
      border-radius: 50%;
    }
  }
  }

</style>
