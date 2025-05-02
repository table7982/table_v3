import { defineStore } from 'pinia'
import { getArticle, getArticleById, likeArticle, unlikeArticle, sentComment, deleteComment, getAllCategory, getCategoryContent, deleteArticle, getAllMusic, deleteMusic, getFlattenedCategory, deleteCategory } from '../my_api/article'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'



export const useArticleStore = defineStore('article', () => {

  const getArticleMessage = async (page?: number, per_page?: number) => {
    try {
      const res: any = await getArticle(page, per_page)
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

  const deleteCommentAction = async (comment_id: number) => {
    try {
      const res: any = await deleteComment(comment_id)
      if (res.code === 200) {
        ElMessage.success("删除评论成功")
        return res.code
      } else {
        ElMessage.error("删除评论失败")
        return res.code
      }
    } catch (error: any) {
      ElMessage.error("删除评论失败")
    }
  }

  const getAllCategoryAction = async () => {
    try {
      const res: any = await getAllCategory()
      if (res.code === 200) {
        return res
      } else {
        ElMessage.error("获取分类失败")
        return res
      }
    } catch (error: any) {
      ElMessage.error("获取分类失败")
    }
  }

  const getCategoryContentAction = async (category_id: number) => {
    try {
      const res: any = await getCategoryContent(category_id)
      if (res.code === 200) {
        return res
      } else {
        ElMessage.error("获取分类失败")
        return res
      }
    } catch (error: any) {
      ElMessage.error("获取分类失败")
    }
  }

  const deleteArticleAction = async (article_id: number) => {
    try {
      const res: any = await deleteArticle(article_id)
      if (res.code === 200) {
        ElMessage.success("删除文章成功")
      } else {
        ElMessage.error("删除文章失败")
      }
    } catch (error: any) {
      ElMessage.error("删除文章失败")
    }
  }

  const getAllMusicAction = async () => {
    try {
      const res: any = await getAllMusic()
      if (res.code === 200) {
        return res
      } else {
        ElMessage.error("获取音乐失败")
      }
    } catch (error: any) {
      ElMessage.error("获取音乐失败")
    }
  }

  const deleteMusicAction = async (music_id: number) => {
    try {
      const res: any = await deleteMusic(music_id)
      if (res.code === 200) {
        ElMessage.success("删除音乐成功")
      } else {
        ElMessage.error("获取音乐失败")
      }
    } catch (error: any) {
      ElMessage.error("获取音乐失败")
    }
  }

  const getFlattenedCategoryAction = async () => {
    try {
      const res: any = await getFlattenedCategory()
      if (res.code === 200) {
        return res.data
      } else {
        ElMessage.error("获取分类失败")
      }
    } catch (error: any) {
      ElMessage.error("获取分类失败")
    }
  }

  const deleteCategoryAction = async (category_id: number) => {
    try {
      const res: any = await deleteCategory(category_id)
      console.log(res.code)
      if (res.code === 200 || res.code === 204) {
        ElMessage.success("删除分类成功")
        return res.data
      } else {
        ElMessage.error("删除分类失败")
      }
    } catch (error: any) {
      ElMessage.error("删除分类失败")
    }
  }



  return {
    getArticleMessage,
    likeArticleAction,
    unlikeArticleAction,
    getArticleByIdAction,
    sentCommentAction,
    deleteCommentAction,
    getAllCategoryAction,
    getCategoryContentAction,
    deleteArticleAction,
    getAllMusicAction,
    deleteMusicAction,
    getFlattenedCategoryAction,
    deleteCategoryAction
  }
})