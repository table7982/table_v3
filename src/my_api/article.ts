import ExpandIcon from 'element-plus/es/components/table-v2/src/components/expand-icon.mjs'
import request from './request'
import { da } from 'element-plus/es/locales.mjs'

export const getArticle = (page: number = 1, per_page: number = 6) => {
  return request({
    url: `/article/article?page=${page}&per_page=${per_page}`,
    method: 'get',
  })
}