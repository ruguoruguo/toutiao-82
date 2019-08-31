<template>
  <div id="app">
   <child-b >
     789
     <template slot-scope="obj">
       {{obj.name1}}
     </template>
     </child-b>

  </div>
</template>

<script>
import childB from './components/child-b'
export default {
  name: 'app',
  data () {
    return {
      city: ['北京', '上海', '天津']
    }
  },
  components: {
    'child-b': childB
  }

}
</script>

<style lang="less">

</style>
