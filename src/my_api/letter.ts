import request from './request'

export const getLetter = (name: string) => {
  return request({
    url: `/letter/receive?name=${name}`,
    method: 'get',
  })
}
