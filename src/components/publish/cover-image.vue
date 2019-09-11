<template>
    <div class="cover-image">
       <div v-for="(item, index) in images" :key="index" class="image-item" @click="showDialog(index)">
           <img :src="item ? item : defaultImg" alt="">
       </div>
       <el-dialog @close="closeDialog" :visible="dialogVisible">
         <select-image @onSelectImg="receiveImg"></select-image>
       </el-dialog>
    </div>
</template>

<script>
export default {
  props: ['images'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false,
      selectIndex: -1
    }
  },
  methods: {
    receiveImg (url) {
      // alert(url)
      this.$emit('onClickImg', url, this.selectIndex)
      this.dialogVisible = false
    },
    // 显示弹层
    showDialog (index) {
      this.dialogVisible = true
      // console.log(index)
      this.selectIndex = index
    },
    // 关闭弹层
    closeDialog () {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
    .cover-image {
        display: flex;
        .image-item {
            border: 1px solid #ccc;
            margin-right: 5px;
            padding: 5px;
            width: 200px;
            height: 200px;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
