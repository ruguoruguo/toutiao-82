<template>
   <el-container>
       <!-- 左侧导航 -->
       <el-aside :style="{width: collapse ? '60px' : '201px'}">
           <layout-aside></layout-aside>
       </el-aside>
       <el-container>
           <!-- 头部 -->
           <el-header>
               <layout-header></layout-header>
           </el-header>
           <!-- 主体 -->
           <el-main style='margin:0; padding: 0;'>
             <router-view></router-view>
           </el-main>
       </el-container>
   </el-container>
</template>

<script>
import eventBus from '../../utils/events'
export default {
  data () {
    return {
      collapse: false
    }
  },
  methods: {
    changeClose (s) {
      this.collapse = s
    }
  },
  created () {
    //   要用箭头函数, this指向的是当前vue实例
    eventBus.$on('openOrClose', (status) => {
      console.log(this)
      this.collapse = status
    //   console.log(this.collapse, 1)
    })
  }
}
</script>

<style>

</style>
