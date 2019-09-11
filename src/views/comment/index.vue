<template>
<!-- 评论列表页 -->
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <template slot="title">评论列表</template>
    </bread-crumb>
    <!-- 表格部分 -->
    <el-table :data="list">
      <el-table-column label="标题"  prop="title" width="600"></el-table-column>
      <el-table-column label="评论状态"  prop="comment_status" :formatter="formatter"></el-table-column>
      <el-table-column label="总评论数"  prop="total_comment_count"></el-table-column>
      <el-table-column label="粉丝评论数"  prop="fans_comment_count"></el-table-column>
      <el-table-column label="操作"  width="130">
        <template slot-scope="obj">
          <el-button type="text" size="small">修改评论</el-button>
          <el-button @click="openOrClose(obj.row)" type="text" size="small" :style="{color: obj.row.comment_status ? '#409EFF' : '#F56C6C'}">{{obj.row.comment_status ? '关闭评论' : '打开评论'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页功能 -->
      <el-row type="flex" justify="center" style="margin:20px 0">
        <el-pagination @current-change="changePage"
          background
          layout="prev, pager, next"
          :total="page.total" :current-page="page.page" :page-size="page.pageSize">
        </el-pagination>
      </el-row>
  </el-card>
</template>

<script>

export default {
  data () {
    return {
      loading: false,
      list: [],
      page: {
        // 当前页
        page: 1,
        // 每页条数
        pageSize: 10,
        // 总条数
        total: 0

      }
    }
  },
  methods: {
    // 改变当前页功能
    changePage (newPage) {
      this.page.page = newPage
      this.getComments()
    },
    // 打开或关闭评论功能
    openOrClose (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`'您确定要${mess}评论吗`, '提示').then(result => {
        this.$axios({
          url: '/comments/status',
          method: 'put',
          params: {
            article_id: row.id.toString()
          },
          data: {
            allow_comment: !row.comment_status
          }
        }).then(result => {
          this.getComments()
        })
      }).catch(() => {})
    },
    // 获取评论列表
    getComments () {
      this.loading = true
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment',
          page: this.page.page,
          per_page: this.page.pageSize
        }
      }).then(result => {
        // console.log(result)
        this.loading = false
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    },
    formatter (row) {
      // console.log(row)
      return row.comment_status ? '正常' : '关闭'
    }
  },
  created () {
    this.getComments()
  }
}
</script>

<style>

</style>
