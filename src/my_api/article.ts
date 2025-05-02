
import request from './request'

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

export const deleteComment = (comment_id: number) => {
  return request({
    url: `/comment/comment?comment_id=${comment_id}`,
    method: 'delete',
  })
}

export const getAllCategory = () => {
  return request({
    url: `/article/category`,
    method: 'get',
  })
}

export const getCategoryContent = (category_id: number) => {
  return request({
    url: `/article/category?category_id=${category_id}`,
    method: 'get',
  })
}

export const deleteArticle = (article_id: number) => {
  return request({
    url: `/article/article?article_id=${article_id}`,
    method: 'delete',
  })
}

export const getAllMusic = () => {
  return request({
    url: `/music/music`,
    method: 'get',
  })
}

export const deleteMusic = (music_id: number) => {
  return request({
    url: `/music/music?music_id=${music_id}`,
    method: 'delete',
  })
}

export const getFlattenedCategory = () => {
  return request({
    url: `/article/category/flattened`,
    method: 'get',
  })
}

export const deleteCategory = (category_id: number) => {
  return request({
    url: `/article/category?category_id=${category_id}`,
    method: 'delete',
  })
}


