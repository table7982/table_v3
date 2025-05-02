<template>
  <el-main>
    <el-scrollbar>
      <el-table :data="articleList">
        <el-table-column prop="id" label="id" width="40" />
        <el-table-column prop="title" label="title" width="140" />
        <el-table-column prop="category" label="分类" width="140" />
        <el-table-column prop="category_id" label="分类id" width="80" />
        <el-table-column prop="music_name" label="音乐" width="140" />
        <el-table-column prop="music_id" label="音乐id" width="80" />
        <el-table-column prop="creat_time" label="创建时间" width="140" />
        <el-table-column prop="description" label="描述" width="140" />
        <el-table-column prop="like_number" label="喜欢" width="60" />
        <el-table-column prop="comment_number" label="评论" width="60" />
        <el-table-column prop="text_len" label="字数" width="60" />
        <el-table-column prop="author_id" label="作者id" width="80" />
        <el-table-column prop="author_name" label="作者" width="60" />
        <el-table-column prop="cover_web_path" label="封面" width="200" />
        <el-table-column label="操作" width="100" fixed="right">
          <template #default="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row.id)" :icon="Edit" circle />
            <el-button type="danger" size="small" @click="handleDelete(scope.row.id)" :icon="Delete" circle />
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
  </el-main>
</template>

<script setup lang='ts' name='ArticleManage'>
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import { useArticleStore } from '@/stores/article'
import { Edit, Delete } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import router from '@/router'
const articleStore = useArticleStore()

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
  music_name: string;
  music_id: number;
}

const articleList = ref<articleItemForm[]>([])

onMounted(async () => {
  articleList.value = await articleStore.getArticleMessage(1, 2000)
})



const handleDelete = async (article_id: number) => {
  try {
    await ElMessageBox.confirm(
      '确定要永久删除这篇文章吗？',
      '删除确认',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        // 自定义关闭图标（可选）
        closeOnClickModal: false
      }
    )
    // 用户点击确定后的逻辑
    console.log('执行删除操作')
    await articleStore.deleteArticleAction(article_id)
    articleList.value = await articleStore.getArticleMessage(1, 2000)
  } catch (error) {
    // 用户点击取消后的逻辑
    console.log('取消删除')
  }
}

const handleEdit = (id: number) => {
  router.push(`/upload/edit/article/${id}`)
}
</script>

<style scoped>
.container {
  position: relative;
  background-color: #fff;
}
</style>
