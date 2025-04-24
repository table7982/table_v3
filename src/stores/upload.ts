import { defineStore } from 'pinia'
import { ref } from 'vue'
import { uploadArticle } from '../my_api/upload'
import type { uploadArticleForm } from '../my_api/upload'
import { ElMessage } from 'element-plus'
import router from '../router'
import axios from 'axios'


export const useUploadStore = defineStore('upload', () => {

  const uploadArticleAction = async (data: uploadArticleForm) => {
    try {
      const res: any = await uploadArticle(data)
      if (res.code === 200) {
        ElMessage.success(res.message || "发布文章成功")
        return res.code
      } else {
        ElMessage.error(res.message || "发布文章失败")
        return res.code
      }
    } catch (error: any) {
      console.error(error)
      return 400
    }
  }

  return {
    uploadArticleAction,
  }
})