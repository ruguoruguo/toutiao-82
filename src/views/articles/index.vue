<template>
    <el-card>
        <bread-crumb slot="header">
            <template slot="title">
                内容列表
            </template>
        </bread-crumb>
        <!-- 表单 -->
        <el-form>
            <el-form-item label="文章状态:">
                <el-radio-group v-model="searchForm.status" @change="changecondition">
                    <el-radio :label="5">全部</el-radio>
                    <el-radio :label="0">草稿</el-radio>
                    <el-radio :label="1">待审核</el-radio>
                    <el-radio :label="2">审核通过</el-radio>
                    <el-radio :label="3">审核失败</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="频道列表:">
                <el-select v-model="searchForm.channel_id" @change="changecondition">
                <el-option :label="item.name" :value="item.id" v-for="item in channel" :key="item.id"> {{item.name}}</el-option>
                </el-select>
            </el-form-item>
    {{searchForm}}
            <el-form-item label="时间选择:">
                <el-date-picker
                @change="changecondition"
                v-model="searchForm.dateRange"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
         </el-date-picker>
            </el-form-item>
        </el-form>
        <!-- 内容列表结构 -->
        <div class="total-info">
            共有{{page.total}}条数据
        </div>
        <div class="artical-list">
            <!-- 循环项 -->
            <div  class="artical-item" v-for="(item, index) in list" :key="index">
                <div class="left">
                    <img :src="item.cover.images.length ? item.cover.images[0] : defalutImg" alt="">
                    <div class="info">
                        <span>{{item.title}}</span>
                        <el-tag style="text-align:center" class="status" :type="item.status | statusStyle">{{item.status | statusText}}</el-tag>
                        <span>{{item.pubdate}}</span>
                    </div>
                </div>
                <div class="right">
                    <span @click="modifyItem(item)">
                      <i class="el-icon-edit">修改</i>
                    </span>
                    <span @click="delItem(item)">
                      <i class="el-icon-delete">删除</i>
                    </span>
                </div>
            </div>
        </div>
        <el-row type="flex" justify="center" style="margin:20px 0">
          <el-pagination @current-change="changePage" :total="page.total" :page-size="page.pageSize" :current-page="page.page" background layout="prev, pager, next" ></el-pagination>
        </el-row>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      page: {
        page: 1,
        pageSize: 10,
        total: 0

      },
      defalutImg: require('../../assets/img/defalutImg.jpeg'),
      list: [],
      channel: [],
      searchForm: {
        status: 5,
        channel_id: null,
        dateRange: []
      }

    }
  },
  methods: {
    // 修改文章
    modifyItem (item) {
      // 将当前行的id传到地址上
      this.$router.push(`/home/publish/${item.id.toString()}`)
    },
    // 删除文章
    delItem (item) {
      // console.log(item.toString())

      this.$confirm('您确定删除吗', '提示').then(result => {
        this.$axios({
          url: `/articles/${item.id.toString()}`,
          method: 'delete'
        }).then(() => {
          this.getConditionArticles()
        })
      }).catch(() => {})
    },
    // 更改页码
    changePage (newPage) {
      this.page.page = newPage
      this.getConditionArticles()
    },
    // 更改查询条件
    changecondition () {
      this.page.page = 1
      this.getConditionArticles()
    },

    getConditionArticles () {
      let params = {
        status: this.searchForm.status === 5 ? null : this.searchForm.status,
        channel_id: this.searchForm.channel_id,
        begin_pubdate: this.searchForm.dateRange.length > 0 ? this.searchForm.dateRange[0] : null,
        end_pubdate: this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null,
        page: this.page.page,
        per_page: this.page.pageSize

      }
      this.getArtical(params)
    },
    // 获取频道列表
    getChannel () {
      this.$axios({
        url: 'channels'
      }).then(result => {
        // console.log(result)
        this.channel = result.data.channels
      })
    },
    // 获取文章列表
    getArtical (params) {
      this.$axios({
        url: 'articles',
        params
      }).then(result => {
        // console.log(result)
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getArtical()
    this.getChannel()
  },

  filters: {
    statusText: function (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    statusStyle: function (value) {
      switch (value) {
        case 0:
          return 'success'
        case 1:
          return 'info'
        case 2:
          return 'warning'
        case 3:
          return 'danger'
        default:
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
    .total-info {
        border-bottom: 1px dashed #ccc;
        height: 40px;
        line-height: 30px;
    }
    .artical-list {
        .artical-item {
            display: flex;
            justify-content: space-between;
            padding: 15px 0;
            border-bottom: 1px solid #999;
            .left {
                display: flex;
                // justify-content: space-between;
                img {
                    width: 80px;
                    height: 80px;
                    border-radius: 10px;
                }
                .info {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    margin-left: 10px;
                    span:nth-child(1) {
                        font-size: 20px;
                    }
                    span:nth-child(2) {
                        font-size: 14px;
                    }
                    span:nth-child(3) {
                        font-size: 12px;
                        color: #ccc;
                    }
                    .status {
                        width: 80px;
                    }
                }
            }
            .right {
                display: flex;
                align-self: center;
                font-size: 12px;
                i {
                    margin-left: 5px;
                    cursor: pointer;
                }
            }
        }
    }

</style>
