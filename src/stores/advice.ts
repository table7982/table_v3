import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import { getAdvice, sentAdvice, deleteAdvice } from '@/my_api/advice'
import type { sentAdviceForm } from '@/my_api/advice'

export const useAdviceStore = defineStore('advice', () => {
  const getAdviceAction = async () => {
    try {
      const res: any = await getAdvice()
      if (res.code === 200) {
        return res.data
      } else {
        ElMessage.error(res.message || "获取留言失败")
      }
    } catch (error: any) {
      console.error(error)
    }
  }

  const sentAdviceAction = async (data: sentAdviceForm) => {
    try {
      const res: any = await sentAdvice(data)
      if (res.code === 200) {
        return res.code
      } else {
        ElMessage.error(res.message || "留言失败")
        return res.code
      }
    } catch (error: any) {
      console.error(error)
      return 400
    }
  }

  const deleteAdviceAction = async (advice_id: number) => {
    try {
      const res: any = await deleteAdvice(advice_id)
      if (res.code === 200) {
        return res.code
      } else {
        ElMessage.error(res.message || "删除留言失败")
        return res.code
      }
    } catch (error: any) {
      console.error(error)
      return 400
    }
  }

  return {
    getAdviceAction,
    sentAdviceAction,
    deleteAdviceAction
  }

})