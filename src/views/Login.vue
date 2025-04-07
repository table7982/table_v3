<template>
  <Header />
  <div class="login-container">
    <!-- 标题区 -->
    <div class="title">用户登录</div>

    <!-- 表单区 -->
    <el-form class="login-form" :model="loginForm" :rules="rules" ref="loginFormRef">
      <div class="form-item">
        <label>邮箱</label>
        <el-form-item prop="email">
          <el-input type="text" class="input-box" placeholder="请输入邮箱" v-model="loginForm.email"></el-input>
        </el-form-item>
      </div>

      <div class="form-item">
        <label>密码</label>
        <el-form-item prop="password">
          <el-input type="password" class="input-box" placeholder="请输入密码" v-model="loginForm.password"></el-input>
        </el-form-item>
      </div>

      <el-button class="submit-btn" @click="handleLoginButtonClick" :loading="loading">立即登录</el-button>
    </el-form>

    <!-- 辅助功能区 -->
    <div class="auxiliary-area">
      <RouterLink to="/register" class="login-link">没有账号？立即注册</RouterLink>
      <RouterLink to="/index" class="login-link">访客登录，直接跳转首页</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
// 逻辑代码区可根据需要添加表单验证等逻辑
import Header from '@/components/header/Header.vue';
import { ref } from 'vue';
import { useVisitorStore } from '../stores/visitor'
import type { FormInstance } from 'element-plus'

const visitorStore = useVisitorStore()
const loginFormRef = ref<FormInstance>()
const loginForm = ref({
  email: '',
  password: ''
})

const rules = {
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    { type: 'email', message: '无效邮箱', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 20, message: '6-20位密码', trigger: 'blur' }
  ],
}

const loading = ref(false)

const handleLoginButtonClick = async () => {
  if (!loginFormRef.value) return
  await loginFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        await visitorStore.loginAction({
          email: loginForm.value.email,
          password: loginForm.value.password
        })
      } catch (error) {
        console.error('登录失败:', error)
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<style scoped>
/* 容器基础样式 */
.login-container {
  margin-top: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

/* 标题样式 */
.title {
  font-size: 2.4rem;
  color: #303133;
  margin: 4rem 0 3rem;
}

/* 表单容器 */
.login-form {
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

  label {
    display: block;
    font-size: 1.4rem;
    color: #606266;
    margin-bottom: 0.8rem;
  }
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
    opacity: 0.9;
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
</style>