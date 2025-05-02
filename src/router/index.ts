import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '@/views/Index.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Upload from '@/views/Upload.vue'
import ArticleShow from '@/views/ArticleShow.vue'
import UploadWebArticle from '@/components/upload/UploadWebArticle.vue'
import Category from '@/views/Category.vue'
import ArticleManage from '@/components/manage/ArticleManage.vue'
import MusicManage from '@/components/manage/MusicManage.vue'
import Manage from '@/components/manage/Manage.vue'
import EditArticle from '@/components/upload/EditArticle.vue'
import CategoryManage from '@/components/manage/CategoryManage.vue'
import Advice from '@/views/Advice.vue'
import Letter from '@/views/Letter.vue'
import LetterShow from '@/views/LetterShow.vue'

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
      path: '/advice',
      component: Advice
    },
    {
      path: '/letter',
      component: Letter
    },
    {
      path: '/letter/:name',
      component: LetterShow
    },

    {
      path: '/register/:id?',
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
          path: '/manage',
          component: Manage,
          children: [
            {
              path: '/manage/article',
              component: ArticleManage,
            },
            {
              path: '/manage/music',
              component: MusicManage,
            },
            {
              path: '/manage/category',
              component: CategoryManage,
            },
          ]
        },
        {
          path: '/upload/webarticle',
          component: UploadWebArticle,
        },
        {
          path: '/upload/edit/article/:id?',
          component: EditArticle,
        },
      ]
    },
  ],
})

export default router
