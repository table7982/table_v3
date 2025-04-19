import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '@/views/Index.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Upload from '@/views/Upload.vue'
import UploadArticle from '@/components/upload/UploadArticle.vue'
import ArticleShow from '@/views/ArticleShow.vue'

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
    {
      path: '/article/:id',
      component: ArticleShow
    },
    {
      path: '/upload',
      component: Upload,
      children: [
        {
          path: '/upload/article',
          component: UploadArticle,
        }
      ]
    },
  ],
})

export default router
