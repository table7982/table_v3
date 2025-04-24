import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '@/views/Index.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Upload from '@/views/Upload.vue'
import UploadArticle from '@/components/upload/UploadArticle.vue'
import ArticleShow from '@/views/ArticleShow.vue'
import UploadWebArticle from '@/components/upload/UploadWebArticle.vue'
import Category from '@/views/Category.vue'

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
      path: '/category/:id',
      component: Category
    },
    {
      path: '/upload',
      component: Upload,
      children: [
        {
          path: '/upload/article',
          component: UploadArticle,

        },
        {
          path: '/upload/webarticle',
          component: UploadWebArticle,

        },
      ]
    },
  ],
})

export default router
