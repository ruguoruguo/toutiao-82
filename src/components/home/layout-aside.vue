<template>
    <div class="aside">
        <div class="title">
            <img :src="collapse ? smallImg : bigImg " alt="">
        </div>
        <el-menu
        background-color="#323745"
        text-color="#adafb5"
        active-text-color=" #ffd04b"
        router
        :collapse="collapse"
        :style="{width:collapse ? '60px' : '200px'}"
        style="border-right:none"
        >
        <el-menu-item index="">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-s-fold"></i>
                <span>内容管理</span>
            </template>
            <el-menu-item index="/home/publish">发布文章</el-menu-item>
            <el-menu-item index="/home/articles">内容列表</el-menu-item>
            <el-menu-item index="/home/comment">评论管理</el-menu-item>
            <el-menu-item index="/home/material">素材管理</el-menu-item>
        </el-submenu>
        <el-submenu   index="1">
            <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span>粉丝管理</span>
            </template>
            <el-menu-item index='/home/fansdata'>图文数据</el-menu-item>
            <el-menu-item index='/home/fansinfo'>粉丝概况</el-menu-item>
            <el-menu-item index='/home/fanslist'>粉丝列表</el-menu-item>
            <el-menu-item index='/home/fansimg'>粉丝画像</el-menu-item>
        </el-submenu>
         <el-menu-item index="/home/account">
            <i class="el-icon-s-home"></i>
            <span slot="title">账户管理</span>
        </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
import eventBus from '../../utils/events'
export default {
  data () {
    return {
      collapse: false,
      smallImg: require('../../assets/img/toutiao.png'),
      bigImg: require('../../assets/img/logo_admin.png')
    }
  },
  created () {
    eventBus.$on('openOrClose', (status) => {
      this.collapse = status
    })
  }
}
</script>

<style lang="less" scoped>
    .aside {
        overflow: hidden;
        height: 100vh;
        background-color: #323745;
        .title {
            text-align: center;
            width: 100%;
            padding: 10px;
            background-color:  #2e2f32;

            img {
                width: 100%;
            }
        }

    }
</style>
