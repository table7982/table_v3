import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '../router'

const request = axios.create({
  baseURL: 'http://127.0.0.1:5000/my_api',
  timeout: 5000,
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded'
  // }
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      console.log('发送的 token:', token)
    }
    // 将请求数据转换为表单格式
    if (config.method === 'post' && !(config.data instanceof FormData)) {
      const params = new URLSearchParams()
      for (const key in config.data) {
        params.append(key, config.data[key])
      }
      config.data = params.toString()
    }
    console.log('请求配置:', config)

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    const res = response.data
    console.log('响应数据:', res)
    if (res.code !== 200) {
      ElMessage.error(res.message || '请求失败')
      if (res.code === 401) {
        localStorage.removeItem('token')
        window.location.href = '/#/login'
      }
      return Promise.reject(new Error(res.message || '请求失败'))
    }
    return res
  },
  error => {
    console.error('请求错误:', error)
    if (error.response) {
      console.error('错误状态码:', error.response.status)
      console.error('错误数据:', error.response.data)

      if (error.response.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/#/login'
      } else if (error.response.status === 403) {
        ElMessage.error('没有权限访问')
      } else if (error.response.status === 404) {
        ElMessage.error('请求的资源不存在')
      } else if (error.response.status === 500) {
        ElMessage.error('服务器内部错误')
      } else {
        ElMessage.error(error.response.data.message || '请求失败')
      }
    } else if (error.request) {
      console.error('没有收到响应:', error.request)
      ElMessage.error('服务器无响应，请检查网络连接')
    } else {
      console.error('请求配置错误:', error.message)
      ElMessage.error('请求配置错误')
    }
    return Promise.reject(error)
  }
)

export default request