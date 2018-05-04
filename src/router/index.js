import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/main',
      component (resolve) {
        require(['components/main'], resolve)
      },
      // meta: { requireAuth: true },
      name: 'main'
    },
    {
      path: '/index',
      component (resolve) {
        require(['components/index'], resolve)
      },
      // meta: { requireAuth: true },
      name: 'index'
    },
    {
      path: '/detail',
      component (resolve) {
        require(['components/detail'], resolve)
      },
      // meta: { requireAuth: true },
      name: 'detail'
    },
    {
      path: '/user',
      component (resolve) {
        require(['../components/user'], resolve)
      },
      // meta: { requireAuth: true },
      name: 'user'
    }
  ]
})

export default router
