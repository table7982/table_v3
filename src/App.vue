<template>
  <RouterView :key="$route.fullPath"></RouterView>
  <PageEnd />
</template>

<script setup lang='ts' name='App'>
import { RouterView } from 'vue-router';
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import PageEnd from './components/PageEnd.vue';
import { onMounted } from 'vue';
import { useVisitorStore } from './stores/visitor';
const visitorStore = useVisitorStore()
import url from './my_api/config';
onMounted(async () => {
  document.body.style.backgroundImage = `url(${url}/static/bgImg.png)`;
  await visitorStore.getVisitorInfo()
})

</script>

<style scoped></style>