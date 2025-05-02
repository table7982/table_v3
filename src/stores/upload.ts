import { defineStore } from 'pinia'
import { ref } from 'vue'
import { uploadArticle, uploadMusic, editArticle, uploadCategory, editCategory } from '../my_api/upload'
import type { uploadArticleForm, uploadMusicForm, editArticleForm, uploadCategoryFrom, editCategoryForm } from '../my_api/upload'
import { ElMessage } from 'element-plus'
import router from '../router'
import axios from 'axios'
import { dataType } from 'element-plus/es/components/table-v2/src/common.mjs'


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

  const uploadMusicAction = async (data: uploadMusicForm) => {
    try {
      const res: any = await uploadMusic(data)
      if (res.code === 200) {
        ElMessage.success(res.message || "上传音乐成功")
        return res.code
      } else {
        ElMessage.error(res.message || "上传音乐失败")
        return res.code
      }
    } catch (error: any) {
      console.error(error)
      return 400
    }
  }

  const editArticleAction = async (data: editArticleForm) => {
    try {
      const res: any = await editArticle(data)
      if (res.code === 200) {
        ElMessage.success(res.message || "修改文章成功")
        return res.code
      } else {
        ElMessage.error(res.message || "修改文章失败")
        return res.code
      }
    } catch (error: any) {
      console.error(error)
      return 400
    }
  }

  const uploadCategoryAction = async (data: uploadCategoryFrom) => {
    try {
      const res: any = await uploadCategory(data)
      if (res.code === 200) {
        ElMessage.success("上传分类成功")
        return res.code
      }
      else {
        ElMessage.error(res.message || "上传分类失败")
        return res.code
      }
    } catch (error: any) {
      ElMessage.error("上传分类失败")
      console.error(error)
      return 400
    }
  }

  const editCategoryAction = async (data: editCategoryForm) => {
    try {
      const res: any = await editCategory(data)
      if (res.code === 200) {
        ElMessage.success(res.message || "修改分类成功")
        return res.code
      } else {
        ElMessage.error(res.message || "修改分类失败")
        return res.code
      }
    } catch (error: any) {
      console.error(error)
      return 400
    }
  }



  return {
    uploadArticleAction,
    uploadMusicAction,
    editArticleAction,
    uploadCategoryAction,
    editCategoryAction
  }
})