<template>
  <FixedHeader />
  <div class="markdown-body" style="font-size:medium" v-for="ref_result in ref_result_list" :key="ref_result.id">
    <div v-html="ref_result.content" style="margin-top: 1rem;" class="articleContentContainer"></div>
  </div>
</template>

<script setup lang='ts' name='LetterShow'>
import router from '@/router';
import { useRoute } from 'vue-router';
import 'github-markdown-css';
import { onMounted, ref } from 'vue';
import FixedHeader from '@/components/header/FixedHeader.vue';
import { useLetterStore } from '@/stores/letter';
const letterStore = useLetterStore()
const route = useRoute()
const name = route.params.name as string
const ref_result_list = ref<ref_result_item[]>([])

interface ref_result_item {
  id: number;
  name: string;
  nickname: string;
  creat_time: string;
  content: string;

}

onMounted(async () => {
  const res = await letterStore.getLetterAction(name)
  if (res.code === 200) {
    ref_result_list.value = res.data
  }
})

</script>

<style scoped>
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 3rem;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
}
</style>