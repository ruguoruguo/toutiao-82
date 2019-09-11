<template>
  <el-row type="flex" justify="space-between" class="layout-header">
      <el-col :span="6" class="left">
        <!-- <i class="icon" @click="openOrClose" :class="{'el-icon-s-fold':!colse, 'el-icon-s-unfold':colse }"></i> -->
        <i class="icon" @click="openOrClose" :class="close ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
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
import eventBus from '../../utils/events'
export default {
  data () {
    return {
      close: false,
      userInfo: {},
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  methods: {
    // 左侧导航折叠
    openOrClose () {
      this.close = !this.close
      console.log(this.close)
      eventBus.$emit('openOrClose', this.close)
    },
    getUserInfo () {
      this.$axios({
        url: '/user/profile'

      }).then(result => {
        // console.log(result)
        this.userInfo = result.data
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
    eventBus.$on('updateInfo', () => {
      this.getUserInfo()
    })
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
