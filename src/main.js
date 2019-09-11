import Vue from 'vue'
import App from './App.vue'
import router from './permission'
import ElementUI from 'element-ui'
import Component from './components'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/index.less'
import axios from './utils/axios.config'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Component)
Vue.use(axios)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
