<template>
  <el-card class="material">
      <bread-crumb slot="header">
        <template slot="title">
            素材管理
        </template>
      </bread-crumb>
      <!-- 上传组件 -->
      <div class="box" >
          <el-upload   action="" :http-request="upLoadImg" :show-file-list="false">
              <el-button type="primary" size="small">上传素材</el-button>
          </el-upload>
      </div>
      <el-tabs v-model="activeName" @tab-click="changeTab">
        <el-tab-pane label="全部素材" name="all">
            <!-- 全部素材的内容 -->
            <div class="card-list">
              <el-card v-for="item in list" :key="item.id" class="img-card">
                <img :src="item.url" alt="">
                <el-row type="flex" justify="space-around"  class="oprate">
                  <i @click="collectOrCancel(item)" class="el-icon-star-on" :style="{color: item.is_collected ? '#F56C6C' : ''}"></i>
                  <i class="el-icon-delete" @click="delImg(item.id)"></i>
                </el-row>
              </el-card>
           </div>
           <!-- 页码 -->
           <el-row type="flex" justify="center">
             <el-pagination @current-change="changePage" :total="page.total" :current-page="page.page" :page-size="page.pageSize" background layout="prev, pager, next" ></el-pagination>
           </el-row>
        </el-tab-pane>
        <el-tab-pane label="收藏图片" name="collect">
            <!-- 收藏素材的内容 -->
             <div class="card-list">
              <el-card v-for="item in list" :key="item.id" class="img-card">
                <img :src="item.url" alt="">
              </el-card>
           </div>
           <!-- 页码 -->
            <el-row type="flex" justify="center">
             <el-pagination @current-change="changePage" :total="page.total" :current-page="page.page" :page-size="page.pageSize" background layout="prev, pager, next" ></el-pagination>
           </el-row>
        </el-tab-pane>
      </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      page: {
        page: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  methods: {
    // 上传素材
    upLoadImg (params) {
      // console.log(params)
      let obj = new FormData()
      obj.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data: obj
      }).then(() => {
        this.getMaterial()
      })
    },
    collectOrCancel (item) {
      let mess = item.is_collected ? '取消' : ''
      this.$confirm(`您确定要${mess}收藏吗`, '提示').then(() => {
        this.$axios({
          url: `/user/images/${item.id}`,
          method: 'put',
          data: {
            collect: !item.is_collected
          }
        }).then(() => {
          this.getMaterial()
        })
      }).catch(err => {
        console.log(1, err, 3)
      })
    },
    // 删除图片
    delImg (item) {
      // console.log(item)
      this.$confirm('确定要删除吗', '提示').then(() => {
        this.$axios({
          url: `/user/images/${item}`,
          method: 'delete'
        }).then(() => {
          this.getMaterial()
        })
      })
    },
    // 更改当前页
    changePage (newPage) {
      // console.log(newPage)
      this.page.page = newPage
      this.getMaterial()
    },
    // 切换tab页签
    changeTab () {
      // console.log(this.activeName)
      this.page.page = 1
      this.getMaterial()
    },
    // 获取素材
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          page: this.page.page,
          per_page: this.page.pageSize,
          collect: this.activeName === 'collect'
        }
      }).then(result => {
        // / '' [] number  null  booler  {}
        console.log(result)
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
  .material {
    // 问题:为什么给了相对定位之后,上传按钮点击无效
    // position: relative;
    .upload-btn {
      position: absolute;
      right: 50px;
      // 为什么距离顶部给了100px之后,上传按钮点击无效
      top: 60px;
    }
    .card-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .img-card {
         padding: 5px 0;
        margin: 10px 0;

         img {
            width: 160px;
            height: 160px;
      }
      }
      .oprate {
        margin-top: 10px;
        font-size: 20px;
      }

    }
  }

</style>
