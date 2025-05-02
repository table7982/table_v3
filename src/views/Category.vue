<template>
  <FixedHeader />
  <ArticleCardItem :category_id="param_id_number" />
</template>

<script setup lang='ts' name='Category'>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useArticleStore } from '@/stores/article';
import { ElMessage } from 'element-plus';
import router from '@/router';
import FixedHeader from '@/components/header/FixedHeader.vue';
import ArticleCardItem from '@/components/card/ArticleCardByCategory.vue';


const route = useRoute();
const param_id = ref(route.params.id);
const param_id_number = Number(param_id.value)

</script>

<style scoped></style>