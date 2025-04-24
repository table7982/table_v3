import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '../router'
import request from './request'
import { da } from 'element-plus/es/locales.mjs';

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

