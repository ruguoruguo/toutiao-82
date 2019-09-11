import layoutAside from './home/layout-aside.vue'
import layoutHeader from './home/layout-header.vue'
import breadCrumb from './common/bread-crumb.vue'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import coverImage from './publish/cover-image.vue'
import selectImage from './publish/select-image.vue'
export default {
  install: function (vue) {
    vue.component('layout-aside', layoutAside)
    vue.component('layout-header', layoutHeader)
    vue.component('bread-crumb', breadCrumb)
    vue.component('quill-editor', quillEditor) // 注册quilleditor编辑器
    vue.component('cover-image', coverImage) // 注册封面组件
    vue.component('select-image', selectImage) // 注册弹层组件
  }
}
