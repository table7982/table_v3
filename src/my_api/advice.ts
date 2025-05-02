import request from './request'
export interface sentAdviceForm {
  content: string
}

export const getAdvice = () => {
  return request({
    url: `/advice/advice`,
    method: 'get',
  })
}

export const sentAdvice = (data: sentAdviceForm) => {
  return request({
    url: `/advice/advice`,
    method: 'post',
    data: {
      content: data.content
    }
  })
}

export const deleteAdvice = (advice_id: number) => {
  return request({
    url: `/advice/advice?advice_id=${advice_id}`,
    method: 'delete',
  })
}
