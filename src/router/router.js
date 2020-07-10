import VueRouter from 'vue-router'
import Vue from 'vue'
import store from '@/store/store.js'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/HomeView'),
    meta: {
      authRequired: true,
    }
  },
  {
    path: '/login',
    component: () => import('@/views/LoginView')
  },
  {
    path: '/register',
    component: () => import('@/views/LoginView'),
    meta: {
      register: true,
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.authRequired)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
