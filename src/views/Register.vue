<template>
  <Header />
  <div class="register-container">
    <!-- 标题区 -->
    <div class="title">用户注册</div>

    <!-- 表单区 -->
    <el-form class="register-form" :rules="rules" :model="registerForm" ref="registerFormRef">
      <div class="form-item">
        <label>用户名</label>
        <el-form-item prop="username">
          <el-input type="text" class="input-box" placeholder="请输入用户名(2-16位字符)"
            v-model="registerForm.username"></el-input>
        </el-form-item>
      </div>

      <div class="form-item">
        <label>邮箱</label>
        <el-form-item prop="email">
          <el-input type="email" class="input-box" placeholder="请输入有效邮箱" v-model="registerForm.email"></el-input>
          <el-button @click="handleCaptchaButtonClick" class="captcha_button" :disabled="!!countdown">
            {{ countdown ? `${countdown}s后重试` : '获取验证码' }}</el-button>
        </el-form-item>

      </div>

      <div class="form-item">
        <label>验证码</label>
        <el-form-item prop="captcha">
          <el-input type="text" class="input-box" placeholder="请输入验证码" v-model="registerForm.captcha"></el-input>
        </el-form-item>
      </div>

      <div class="form-item">
        <label>密码</label>
        <el-form-item prop="password">
          <el-input type="password" class="input-box" placeholder="请输入密码(6-20位)"
            v-model="registerForm.password"></el-input>
        </el-form-item>
      </div>

      <div class="form-item">
        <label>确认密码</label>
        <el-form-item prop="confirm_password">
          <el-input type="password" class="input-box" placeholder="请再次输入密码"
            v-model="registerForm.confirm_password"></el-input>
        </el-form-item>
      </div>

      <el-button type="primary" class="submit-btn" @click="handleRegisterClick" :loading="loading">立即注册</el-button>
    </el-form>

    <!-- 辅助功能区 -->
    <div class="auxiliary-area">
      <RouterLink to="/login" class="login-link">已有账号？立即登录</RouterLink>
      <RouterLink to="/index" class="login-link">访客登录，直接跳转首页</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import Header from '@/components/header/Header.vue';

// 表单数据响应式绑定
const registerForm = ref({
  username: '',
  email: '',
  password: '',
  captcha: '',
  confirm_password: ''
})


const validateConfirmPassword = (rule: any, value: string, callback: any) => {
  if (value !== registerForm.value.password) {
    callback(new Error('两次输入密码不一致'))
  } else {
    callback()
  }
}

const rules = {
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 2, max: 16, message: '长度在2到16个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    { type: 'email', message: '无效邮箱', trigger: 'blur' }
  ],
  captcha: [
    { required: true, message: '验证码不能为空', trigger: 'blur' },
    { min: 6, max: 6, message: '6位验证码', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 20, message: '6-20位密码', trigger: 'blur' }
  ],

  confirm_password: [
    { validator: validateConfirmPassword, trigger: 'blur' },
    { required: true, message: '请确认密码', trigger: 'blur' },]
}



// 验证码处理
import { useVisitorStore } from '../stores/visitor'
const visitorStore = useVisitorStore()
const countdown = ref(0)

const startCountdown = () => {
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}

const handleCaptchaButtonClick = async () => {
  if (!registerForm.value.email) {
    ElMessage.warning('请先输入邮箱')
    return
  }
  try {
    startCountdown()
    const code = await visitorStore.sendEmailCaptcha(registerForm.value.email)
    if (code === 200) {
      ElMessage.success('验证码已发送')
    }
  } catch (error) {
    console.error('发送验证码失败:', error)
  }
}



// 注册逻辑处理

import type { FormInstance } from 'element-plus'
import { el } from 'element-plus/es/locales.mjs';
const loading = ref(false)

const registerFormRef = ref<FormInstance>()

const handleRegisterClick = async () => {
  // TODO: 添加表单验证和提交逻辑
  if (!registerFormRef.value) {
    ElMessage.error("输入有误")
    return
  }
  await registerFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        await visitorStore.registerAction({
          email: registerForm.value.email,
          username: registerForm.value.username,
          password: registerForm.value.password,
          password_confirm: registerForm.value.confirm_password,
          captcha: registerForm.value.captcha
        })
      }
      finally {
        loading.value = false
      }
    } else {
      ElMessage.error("输入不正确")
    }
  })
}



</script>

<style scoped>
/* 继承登录页基础样式 */

.register-container {
  margin-top: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

/* 注册表单专属样式 */


/* 注册按钮专属样式 */
/* .submit-btn {
  background: linear-gradient(45deg, #ff7e5f, #feb47b);
  letter-spacing: 0.1rem;
} */

/* 链接交互优化 */
.login-link {
  position: relative;
  color: #409eff;
  display: block;
  margin-bottom: .8rem;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 1px;
    background: #409eff;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
}


/* 标题样式 */
.title {
  font-size: 2.4rem;
  color: #303133;
  margin: 4rem 0 3rem;
}

/* 表单容器 */
.register-form {
  width: 100%;
  max-width: 36rem;
  backdrop-filter: blur(20rem);
  background: linear-gradient(45deg, rgba(255, 0, 150, 0.1), rgba(0, 204, 255, 0.1));
  padding: 3rem;
  border-radius: 0.8rem;
  box-shadow: 0 0.2rem 1.2rem rgba(0, 0, 0, 0.08);
}

/* 表单项 */
.form-item {
  margin-bottom: 2rem;
  position: relative;

  label {
    display: block;
    font-size: 1.4rem;
    color: #606266;
    margin-bottom: 0.8rem;
  }
}

.captcha_button {
  position: absolute;
  width: 9rem;
  height: 4rem;
  right: 1rem;
  font-size: 1.3rem;

}

/* 输入框 */
.input-box {
  width: 100%;
  height: 4rem;
  padding: 0 1.2rem;
  font-size: 1.4rem;

  &:focus {
    border-color: #409eff;
    box-shadow: 0 0 0.4rem rgba(64, 158, 255, .3);
  }
}

/* 提交按钮 */
.submit-btn {
  width: 100%;
  height: 4.4rem;
  background: #409eff;
  color: #fff;
  font-size: 1.6rem;
  border: none;
  border-radius: 0.4rem;
  margin-top: 2rem;
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 1;
  }
}

/* 辅助功能区 */
.auxiliary-area {
  margin-top: 3rem;
  text-align: center;
}

.register-link {
  color: #409eff;
  font-size: 1.4rem;
  text-decoration: none;
}

.third-party {
  margin-top: 2rem;

  .divider {
    color: #909399;
    font-size: 1.2rem;
  }

  .icons {
    margin-top: 1.6rem;

    .icon {
      width: 3.2rem;
      height: 3.2rem;
      margin: 0 1rem;
    }
  }
}
</style>