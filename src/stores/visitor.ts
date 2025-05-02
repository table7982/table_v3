import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login, register, getEmailCaptcha, getVisitorMessage, getWebMessage } from '../my_api/visitor'
import type { LoginForm, RegisterForm } from '../my_api/visitor'
import { ElMessage } from 'element-plus'
import router from '../router'
import axios from 'axios'


export const useVisitorStore = defineStore('visitor', () => {
  const token = ref(localStorage.getItem('token') || '')
  const visitorInfo = ref<any>(null)
  const webMessage = ref<any>(null)

  const sendEmailCaptcha = async (email: string) => {
    try {
      const res: any = await getEmailCaptcha(email)
      if (res.code === 200) {
        ElMessage.success('验证码已发送')
        return 200
      } else {
        ElMessage.error(res.message || '发送验证码失败')
        return
      }
    } catch (error: any) {
      ElMessage.error(error.message || '发送验证码失败')
      console.error('发送验证码失败:', error)
    }
  }

  const registerAction = async (registerForm: RegisterForm) => {
    try {
      const res: any = await register(registerForm)
      if (res.code === 200) {
        ElMessage.success('注册成功')
        router.push('/login')
      } else {
        ElMessage.error(res.message || '注册失败')
      }
    } catch (error: any) {
      ElMessage.error(error.message || '注册失败')
      console.error('注册失败:', error)
    }
  }

  const loginAction = async (loginForm: LoginForm) => {
    try {
      const res: any = await login(loginForm)
      if (res.code === 200) {
        ElMessage.success('登录成功')
        token.value = res.token
        localStorage.setItem('token', res.token)
        router.push('/index')
        visitorInfo.value = res.user
        // 显示成功消息
        ElMessage.success('登录成功')
      } else {
        ElMessage.error(res.message || '登录失败')
      }
    } catch (error: any) {
      ElMessage.error(error.message || '登录失败')
      console.error('登录失败:', error)
    }
  }

  const logout = () => {
    token.value = ''
    visitorInfo.value = null
    localStorage.removeItem('token')
  }

  const getVisitorInfo = async () => {
    try {
      const res: any = await getVisitorMessage()
      if (res.code === 200) {
        ElMessage.success('获取用户信息成功')
        visitorInfo.value = {
          "id": res.data.visitor_id,
          "username": res.data.username
        }
      } else {
        ElMessage.warning("获取用户信息失败，请重新登录")
        router.push("/login")
      }
    } catch (error: any) {
      ElMessage.error(error.message || '登录失败')
      console.error('登录失败:', error)
      router.push("/login")
    }
  }

  const getWebMessageAction = async () => {
    try {
      const res: any = await getWebMessage()
      if (res.code === 200) {
        webMessage.value = {
          "article_number": res.data.article_number,
          "visitor_number": res.data.visitor_number,
          "category_number": res.data.category_number,
        }
      }
    } catch (error: any) {
      ElMessage.error(error.message || '获取网站信息失败')
      console.error('获取网站信息失败:', error)
    }
  }

  return {
    token,
    visitorInfo,
    webMessage,

    sendEmailCaptcha,
    registerAction,
    loginAction,
    logout,
    getVisitorInfo,
    getWebMessageAction
  }
})