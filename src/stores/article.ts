import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getArticle } from '../my_api/article'
import { ElMessage } from 'element-plus'
import router from '../router'
import axios from 'axios'

export const useArticleStore = defineStore('article', () => {

  const getArticleMessage = async () => {
    try {
      const res: any = await getArticle()
      if (res.code === 200) {
        return res.data
      } else {
        ElMessage.error(res.message || "获取文章失败")
      }
    } catch (error: any) {
      console.error(error)
    }


  }

  return {
    getArticleMessage,
  }
})