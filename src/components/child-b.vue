<template>
  <div>
     <li >子内容</li>
     <!-- <slot ></slot> -->
     <slot :name1="count"></slot>
  </div>
</template>

<script>
export default {
  data () {
    return {
      count: '李四'
    }
  }

}
</script>

<style>

</style>
