import ExpandIcon from 'element-plus/es/components/table-v2/src/components/expand-icon.mjs'
import request from './request'
import { da } from 'element-plus/es/locales.mjs'

export const getArticle = (page: number = 1, per_page: number = 6) => {
  return request({
    url: `/article/article?page=${page}&per_page=${per_page}`,
    method: 'get',
  })
}

export const likeArticle = (article_id: number) => {
  return request({
    url: '/article/like',
    method: 'post',
    data: {
      'article_id': article_id
    }
  })

}

export const unlikeArticle = (article_id: number) => {
  return request({
    url: `/article/like?article_id=${article_id}`,
    method: 'delete',
  })
}

export const getArticleById = (id: number) => {
  return request({
    url: `/article/getArticleById?id=${id}`,
    method: 'get',
  })
}

export const sentComment = (id: number, content: string) => {
  return request({
    url: `/comment/comment`,
    method: 'post',
    data: {
      'article_id': id,
      'content': content
    }
  })
}