import Vue from 'vue'
import Router from 'vue-router'

// import login from './views/login/index.vue'
// 此处index.vue 可以省略, 不写index ,默认会找login下面的index组件
import Login from './views/login'
import Home from './views/home'
import Main from './views/home/main.vue'
import notFind from './views/publish/404.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      component: notFind
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [{
        path: '',
        component: Main
      }, {
        path: 'comment',
        component: () => import(/* webpackChunkName: "about" */ './views/comment/index.vue')
      }, {
        path: 'material',
        component: () => import(/* webpackChunkName: "about" */ './views/material/index.vue')
      },
      {
        // 内容列表
        path: 'articles',
        component: () => import(/* webpackChunkName: "about" */ './views/articles/index.vue')
      },
      {
        // 发布文章
        path: 'publish',
        component: () => import(/* webpackChunkName: "about" */ './views/publish/index.vue')
      },
      {
        // 修改文章
        path: 'publish/:articalId',
        component: () => import(/* webpackChunkName: "about" */ './views/publish/index.vue')
      },
      {
        // 修改文章
        path: 'account',
        component: () => import(/* webpackChunkName: "about" */ './views/account/index.vue')
      },
      {
        // 粉丝数据
        path: 'fansdata',
        component: () => import(/* webpackChunkName: "about" */ './views/fans/fansdata.vue')
      }
      ]
    },
    {
      path: '/login',
      component: Login
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
