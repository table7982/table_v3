import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '@/views/Index.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/index'
    },

    {
      path: '/index',
      component: Index
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
  ],
})

export default router
