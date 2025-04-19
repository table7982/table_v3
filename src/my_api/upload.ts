import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '../router'
import request from './request'
import { da } from 'element-plus/es/locales.mjs';

export interface uploadArticleForm {
  description: string;
  title: string;
  category_id: number;
  md_file: File;
  cover_img_file: File;
  display_time?: string;
}


export const uploadArticle = (data: uploadArticleForm) => {
  const formData = new FormData()
  // 附加文件字段
  const mdFile = new File([data.md_file], data.md_file.name, {
    type: 'text/markdown'
  });
  formData.append('md_file', mdFile, mdFile.name)
  formData.append('cover_img_file', data.cover_img_file)

  // 附加其他字段
  formData.append('title', data.title)
  formData.append('description', data.description)
  formData.append('category_id', data.category_id.toString()) // 转换为字符串

  // 处理可选字段
  if (data.display_time) {
    formData.append('display_time', data.display_time)
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

