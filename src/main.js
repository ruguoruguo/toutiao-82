import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import Component from './components'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/index.less'
import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Component)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
