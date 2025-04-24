<template>
  这是分类页面
  <div class="category_container" v-if="categoryList[0]">
    <div class="category_item" v-for="categoryItem in categoryList" :key="categoryItem.category_id"
      @click="handleClickCategory(categoryItem.category_id)">
      {{ categoryItem.category_name }}
    </div>
  </div>
  <div class="article_container" v-if="articleList[0]">
    <div class="article_item" v-for="articleItem in articleList" :key="articleItem.id">
      {{ articleItem.title }}
    </div>
  </div>
</template>

<script setup lang='ts' name='Category'>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useArticleStore } from '@/stores/article';
import { ElMessage } from 'element-plus';
import router from '@/router';
const articleStore = useArticleStore()
const route = useRoute();
const param_id = ref(route.params.id);
const param_id_number = Number(param_id.value)


interface articleItemForm {
  id: number;
  title: string;
  category: string;
  category_id: number;
  creat_time: Date;
  display_time?: string | null;
  description: string;
  like_number: number;
  comment_number: number;
  author_name: string;
  author_id: string;
  text_len: number;
  cover_web_path: string;
  if_like: boolean;

}

interface categoryItemForm {
  category_id: number;
  category_name: string;
  category_level: number;
}

const articleList = ref<articleItemForm[]>([])
const categoryList = ref<categoryItemForm[]>([])

onMounted(async () => {
  const res = await articleStore.getCategoryContentAction(param_id_number)
  if (res.code === 200) {
    articleList.value = res.data.articles
    categoryList.value = res.data.category_children
  } else {
    ElMessage.error("获取分类失败")
  }
})

const handleClickCategory = (category_id: number) => {
  router.push(`/category/${category_id}`)
}

</script>

<style scoped></style>