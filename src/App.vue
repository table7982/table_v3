<template>
  <RouterView :key="$route.fullPath"></RouterView>
  <PageEnd />
</template>

<script setup lang='ts' name='App'>
import { RouterView } from 'vue-router';
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import PageEnd from './components/PageEnd.vue';
</script>

<style scoped></style>