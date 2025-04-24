import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getArticle, getArticleById, likeArticle, unlikeArticle, sentComment } from '../my_api/article'
import { ElMessage } from 'element-plus'
import router from '../router'
import axios from 'axios'
import { ca } from 'element-plus/es/locales.mjs'

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



  const likeArticleAction = async (article_id: number) => {
    try {
      const res: any = await likeArticle(article_id)
      if (res.code === 200) {
        ElMessage.success("点赞成功")
      } else {
        ElMessage.error("点赞失败")
      }
    } catch (error: any) {
      ElMessage.error("点赞失败")
    }
  }

  const unlikeArticleAction = async (article_id: number) => {
    try {
      const res: any = await unlikeArticle(article_id)
      if (res.code === 200) {
        ElMessage.success("取消点赞成功")
      } else {
        ElMessage.error("取消点赞失败")
      }
    } catch (error: any) {
      ElMessage.error("取消点赞失败")
    }
  }

  const getArticleByIdAction = async (article_id: number) => {
    try {
      const res: any = await getArticleById(article_id)
      if (res.code === 200) {
        // ElMessage.success("获取文章成功")
        return res.data
      } else {
        ElMessage.error("获取文章失败")
      }
    } catch (error: any) {
      ElMessage.error("获取文章失败")
    }
  }
  
  const sentCommentAction = async (article_id: number, content: string) => {
    try {
      const res: any = await sentComment(article_id, content)
      if (res.code === 200) {
        ElMessage.success("发表评论成功")
        return res.code
      } else {
        ElMessage.error("发表评论失败")
        return res.code
      }
    } catch (error: any) {
      ElMessage.error("发表评论失败")
    }
  }


  return {
    getArticleMessage,
    likeArticleAction,
    unlikeArticleAction,
    getArticleByIdAction,
    sentCommentAction
  }
})