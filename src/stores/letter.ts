import { defineStore } from 'pinia'
import { getLetter } from '../my_api/letter'
import { ElMessage } from 'element-plus'

export const useLetterStore = defineStore('letter', () => {
  const getLetterAction = async (name: string) => {
    try {
      const res: any = await getLetter(name)
      if (res.code === 200) {
        return res
      } else {
        return res
      }
    } catch (error) {
      console.error(error)
      return { "code": 400, "message": "未获取到信件" }
    }
  }

  return {
    getLetterAction
  }
})