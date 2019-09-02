<template>
  <el-row type="flex" justify="space-between" class="layout-header">
      <el-col :span="6" class="left">
        <i class="el-icon-s-fold icon"></i>
        <span>江苏传智播客</span>
      </el-col>
      <el-col :span="4" class="right">
        <img :src="userInfo.photo ? userInfo.photo : defaultImg" alt="" class="head-img">
         <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
           {{userInfo.name}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">个人信息</el-dropdown-item>
            <el-dropdown-item command="b">git地址</el-dropdown-item>
            <el-dropdown-item command="c">退出</el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {},
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  methods: {
    getUserInfo () {
      let token = window.localStorage.getItem('user-token')

      console.log(token)
      this.$axios({
        url: '/user/profile',
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(result => {
        console.log(result)
        this.userInfo = result.data.data
      })
    },
    handleCommand (command) {
      console.log(command)
      if (command === 'a') {
        console.log('count')
      } else if (command === 'b') {
        location.href = 'https://github.com/new'
      } else {
        window.localStorage.clear()
        this.$router.push('/login')
      }
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
  .layout-header {
    padding: 10px 0;
    .left {
      display: flex;
      align-items: center;

      .icon {
        font-size: 18px;
        margin-right: 5px;

      }

    }
    .right {
      display: flex;
      align-items: center;
      img {
        border-radius: 50%;
        width: 35px;
      }
    }
  }
</style>
