import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '../router'
import request from './request'
export interface uploadArticleForm {
  description: string;
  title: string;
  content: string;
  text_len: number;
  category_id: number;
  cover_img_file: File;
  display_time?: string;
  music_id?: number;
}

export interface uploadMusicForm {
  music_name: string;
  music_file: File;
}

export interface editArticleForm {
  article_id: number;
  description?: string;
  title?: string;
  content?: string;
  text_len?: number;
  category_id?: number;
  cover_img_file?: File;
  display_time?: string;
  music_id?: number;
}

export interface uploadCategoryFrom {
  name: string;
  level: number;
  parent_id?: number;
  description: string;
}

export interface editCategoryForm {
  id: number;
  name?: string | null;
  level: number;
  parent_id: number | null;
  description?: string | null;
}


export const uploadArticle = (data: uploadArticleForm) => {
  const formData = new FormData()
  // 附加文件字段

  formData.append('cover_img_file', data.cover_img_file)

  // 附加其他字段
  formData.append('title', data.title)
  formData.append('description', data.description)
  formData.append('content', data.content)
  formData.append('text_len', data.text_len.toString())
  formData.append('category_id', data.category_id.toString())

  // 处理可选字段
  if (data.display_time) {
    formData.append('display_time', data.display_time)
  }

  if (data.music_id) {
    formData.append('music_id', data.music_id.toString())
  }


  return request({
    url: "/article/article",
    method: "post",
    data: formData, // 直接传递 FormData 对象
    headers: {
      // 删除手动 Content-Type 设置
      'X-Requested-With': 'XMLHttpRequest' // 可选安全头
    }
  })
}

export const uploadMusic = (data: uploadMusicForm) => {
  const formData = new FormData()
  formData.append('music_name', data.music_name)
  formData.append('music_file', data.music_file)
  return request({
    url: "/music/music",
    method: "post",
    data: formData, // 直接传递 FormData 对象
    headers: {
      // 删除手动 Content-Type 设置
      'X-Requested-With': 'XMLHttpRequest' // 可选安全头
    }
  })
}


export const editArticle = (data: editArticleForm) => {
  const formData = new FormData()
  formData.append('article_id', data.article_id.toString())

  // 附加文件字段
  if (data.cover_img_file) formData.append('cover_img_file', data.cover_img_file)
  if (data.title) formData.append('title', data.title)
  if (data.description) formData.append('description', data.description);
  if (data.content) formData.append('content', data.content)
  if (data.text_len) formData.append('text_len', data.text_len.toString())
  if (data.category_id) formData.append('category_id', data.category_id.toString())
  if (data.display_time) formData.append('display_time', data.display_time)
  if (data.music_id) formData.append('music_id', data.music_id.toString())

  return request({
    url: "/article/article",
    method: "patch",
    data: formData, // 直接传递 FormData 对象
    headers: {
      // 删除手动 Content-Type 设置
      'X-Requested-With': 'XMLHttpRequest' // 可选安全头
    }
  })
}

export const uploadCategory = (data: uploadCategoryFrom) => {
  const sentData: uploadCategoryFrom = {
    "name": data.name,
    "level": data.level,
    "description": data.description,
  }

  if (data.parent_id) {
    sentData['parent_id'] = data.parent_id
  }

  return request({
    url: '/article/category',
    method: 'post',
    data: sentData
  })
}

export const editCategory = (data: editCategoryForm) => {
  const sentDate: editCategoryForm = {
    "id": data.id,
    'level': data.level,
    "parent_id": data.parent_id
  }
  if (data.description) { sentDate['description'] = data.description }
  if (data.name) { sentDate['name'] = data.name }

  const formData = new FormData()
  formData.append('id', sentDate.id.toString())
  if (sentDate.parent_id) { formData.append('parent_id', sentDate.parent_id.toString()) }
  formData.append('level', sentDate.level.toString())
  if (sentDate.description) { formData.append('description', sentDate.description.toString()) }
  if (sentDate.name) { formData.append('name', sentDate.name.toString()) }

  return request({
    url: '/article/category',
    method: 'patch',
    data: formData
  })
}