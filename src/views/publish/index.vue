<template>
  <el-card>
    <!-- 面包屑 -->
      <bread-crumb slot="header">
            <template slot="title">
                发布文章
            </template>
      </bread-crumb>
      <!-- 表单 -->
      {{formData}}
      <el-form style="margin-left:80px;" label-width="100px" :model = "formData" :rules = "publishRules" ref = "publishForm">
        <el-form-item label="标题" prop="title">
          <el-input style="width:400px" v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <quill-editor v-model="formData.content" style="width:800px; height: 400px; margin-bottom:120px"></quill-editor>
        </el-form-item>
        <el-form-item label="封面" >
          <el-radio-group v-model="formData.cover.type" @change="changeCoverType">
             <!-- 封面类型 -1:自动，0-无图，1-1张，3-3张 -->
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 封面 -->
        <el-form-item prop="cover">
            <cover-image :images="formData.cover.images" @onClickImg="receiveImg" ></cover-image>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id" style="margin:80px 0">
         <el-select v-model="formData.channel_id">
           <el-option v-for="item in channels" :key="item.id"  :label="item.name" :value="item.id">{{item.name}}</el-option>
         </el-select>
        </el-form-item>
        <el-form-item>
         <el-button type="primary" size="small" @click="publish(false)">发表文章</el-button>
         <el-button size="small" @click="publish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    let func = function (rule, value, callBack) {
      // debugger
      if (value.type === 1) {
        value.images.length === 1 && value.images[0] ? callBack() : callBack(new Error('您未设置封面'))
      } else if (value.type === 3) {
        value.images.length === 1 && value.images[0] && value.images[1] && value.images[2] ? callBack() : callBack(new Error('您未设置三封面'))
      } else {
        value.images.length > 0 ? callBack(new Error('设置有误')) : callBack()
      }
    }

    return {
      channels: [],
      formData: {
        title: '',
        content: '',
        cover: {
          // 封面类型 -1:自动，0-无图，1-1张，3-3张
          type: 0,
          images: []
        },
        channel_id: null
      },
      publishRules: {
        title: [{
          required: true,
          message: '标题不能为空'
        },
        {
          min: 5,
          max: 30,
          message: '标题长度5-30'
        }],
        content: [{
          required: true,
          message: '内容不能为空'
        }],
        channel_id: [{
          required: true,
          message: '频道不能为空'
        }],
        cover: [{
          // 自定义校验函数
          validator: func
        }]
      }
    }
  },
  methods: {

    // 接收cover-image 组件传过来的 url 地址和 index
    receiveImg (url, index) {
      this.formData.cover.images = this.formData.cover.images.map(function (item, i) {
        if (index === i) {
          // 如果点击封面的索引值和images数组的索引一致,则返回子组件cover-image 传过来的url,
          // 如果不一致,说明子组件未传过来url,则返回images数组中原来的item(空字符串)
          return url
        }
        return item
      })
    },
    // 切换封面类型
    changeCoverType () {
      if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']
      } else {
        this.formData.cover.images = []
      }
    },
    // 通过id获取文章详情
    getArticalId (articalId) {
      // console.log(articalId)
      this.$axios({
        url: `/articles/${articalId}`

      }).then(result => {
        // console.log(result)
        this.formData = result.data
      })
    },
    // 发布文章
    publish (draft) {
      this.$refs.publishForm.validate(isOk => {
        if (isOk) {
          let { articalId } = this.$route.params
          // let url, method
          // if (articalId) {
          //   url = `/articles/${articalId}`
          //   method = 'put'
          // } else {
          //
          //   method = 'post'
          // }

          this.$axios({
            // 判断是新增还是修改
            url: articalId ? `/articles/${articalId}` : '/articles',
            method: articalId ? 'put' : 'post',
            params: {
              draft
            },
            data: this.formData

          }).then(() => {
            // debugger
            // console.log(1)
            this.$router.push('/home/articles')
          })
        }
      })
    },
    // 获取频道列表
    getChannel () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        // console.log(result)
        this.channels = result.data.channels
      })
    }
  },
  created () {
    // 调用频道列表方法
    this.getChannel()
    // 获取动态路由参数
    let { articalId } = this.$route.params
    if (articalId) {
      // articalId 如果存在说明当前组件是用于修改文章, 如果不存在说明是发布文章
      this.getArticalId(articalId)
      // console.log(articalId)
    }
  }
}
</script>

<style>

</style>
