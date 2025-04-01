import ExpandIcon from 'element-plus/es/components/table-v2/src/components/expand-icon.mjs'
import request from './request'
import { da } from 'element-plus/es/locales.mjs'

export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  email: string
  username: string
  password: string
  password_confirm: string
  captcha: string
}

export const login = (data: LoginForm) => {
  return request({
    url: '/visitor/login',
    method: 'post',
    data: {
      email: data.email,
      password: data.password
    }
  })
}

export const register = (data: RegisterForm) => {
  return request({
    url: '/visitor',
    method: 'post',
    data: {
      email: data.email,
      password: data.password,
      username: data.username,
      captcha: data.captcha,
      password_confirm: data.password_confirm,
    }
  })
}

export const getEmailCaptcha = (email: string) => {
  return request({
    url: '/visitor/captcha',
    method: 'post',
    data: { email }
  })
}

export const getVisitorMessage = () => {
  return request({
    url: '/visitor',
    method: 'get'
  })
} 