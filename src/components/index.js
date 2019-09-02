import layoutAside from './home/layout-aside.vue'
import layoutHeader from './home/layout-header.vue'
export default {
  install: function (vue) {
    vue.component('layout-aside', layoutAside)
    vue.component('layout-header', layoutHeader)
  }
}
