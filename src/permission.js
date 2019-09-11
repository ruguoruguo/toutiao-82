import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 全局前置守卫
router.beforeEach(function (to, from, next) {
  NProgress.start() // 开启进度条
  let token = window.localStorage.getItem('user-token')
  if (to.path.startsWith('/home')) {
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
// 全局后置钩子
router.afterEach(function () {
  NProgress.done() // 关闭进度条
})
export default router
