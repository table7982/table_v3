<template>
  <RouterView :key="$route.fullPath"></RouterView>
</template>

<script setup lang='ts' name='App'>
import { RouterView } from 'vue-router';
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<style scoped></style>