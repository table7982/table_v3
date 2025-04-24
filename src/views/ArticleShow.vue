<template>
  <FixedHeader />
  <backGroundMusic :music_url_props="articleMessage?.music_web_path" />
  <div class="markdown-body" style="font-size:medium">
    <el-image style="width: 100%; " :src="articleMessage?.cover_web_path" fit="fill" />
    <h2>{{ articleMessage?.title }}</h2>
    {{ articleMessage?.description }}
    <br>
    字数：{{ articleMessage?.text_len }}
    <br>
    时间：{{ articleMessage?.display_time || articleMessage?.creat_time }}
    <br>
    作者：{{ articleMessage?.author_name }}
    <br>
    <div v-if="articleMessage?.music_name">
      音乐：{{ articleMessage?.music_name }}
      <br>
    </div>
    <br>
    <div v-html="ref_result" style="margin-top: 1rem;"></div>
  </div>
  <hr>
  <div class="commentContainer markdown-body">
    <h2>发布评论：</h2>
    <div class="sentCommentContainer">
      <el-form>
        <el-form-item>
          <el-input v-model="commentContent" placeholder="写点什么吧~" />
          <br>
          <br>
          <el-button style="margin: 0 auto;display: block; width: 9rem;"
            @click="handleCommentSubmit(articleMessage?.id as number)" :loading="sendingComment">评论</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  <hr>
  <div class="commentContainer markdown-body" :class="{ 'display_comment': !if_have_comment }">

    <h2>评论列表({{ articleMessage?.comment_number }})：</h2>
    <div class="commentItemContainer" v-for="comment in articleMessage?.comments" :key="comment.id">
      <div class="commenterName">{{ comment.commenter_name }}&nbsp;:</div>
      {{ comment.content }}
      <div class="commentCreatTime"> {{ comment.creat_time }}</div>
    </div>
  </div>

</template>


<script setup lang='ts' name='ThinkingItem'>

import Header from '@/components/header/Header.vue';
import { useRoute } from 'vue-router';
// import MarkdownIt from 'markdown-it';
import 'github-markdown-css';
import { ref, onMounted, watch, reactive } from 'vue';
import backGroundMusic from '@/components/music/backGroundMusic.vue';

const route = useRoute();
const param_id = route.params.id;
const param_id_number = Number(param_id);


import { useArticleStore } from '@/stores/article'
import { ElMessage } from 'element-plus';
import FixedHeader from '@/components/header/FixedHeader.vue';
import { ar, fa } from 'element-plus/es/locales.mjs';
const articleStore = useArticleStore()

interface commentItemForm {
  id: number,
  commenter_name: string,
  content: string,
  creat_time: string

}

interface articleDetailForm {
  id: number;
  title: string;
  category: string;
  category_id: number;
  creat_time: Date;
  if_like: boolean;
  like_number: number;
  comment_number: number;
  text_len: number;
  author_name: string;
  author_id: number;
  content: string;
  display_time?: string | null;
  description: string;
  comments: commentItemForm[];
  cover_web_path: string;
  music_web_path?: string;
  music_name?: string;
}


const articleMessage = ref<articleDetailForm | null>(null)

// 使用onMounted钩子来在组件挂载后加载Markdown
onMounted(async () => {
  try {
    articleMessage.value = await articleStore.getArticleByIdAction(param_id_number)
    console.log(articleMessage.value?.id)
    loadAndRenderMarkdown(articleMessage.value?.content)
    if (articleMessage.value?.comments[0]) {
      if_have_comment.value = true
    }
  } catch {
    ElMessage.error("获取文章失败")
  }
});


const ref_result = ref("暂未获取到文章")
async function loadAndRenderMarkdown(md_content: string | undefined) {
  if (md_content) {
    // const renderer = new MarkdownIt();
    // ref_result.value = renderer.render(md_content);
    ref_result.value = md_content
  } else {
    return "解析错误"
  }

}

const if_have_comment = ref(false)


const commentContent = ref('')
const sendingComment = ref(false)
const handleCommentSubmit = async (article_id: number) => {
  sendingComment.value = true
  if (commentContent.value) {
    await articleStore.sentCommentAction(article_id, commentContent.value)
    sendingComment.value = false
    commentContent.value = ''
    try {
      articleMessage.value = await articleStore.getArticleByIdAction(param_id_number)
      console.log(articleMessage.value?.id)
      loadAndRenderMarkdown(articleMessage.value?.content)
      if (articleMessage.value?.comments[0]) {
        if_have_comment.value = true
      }
    } catch {
      ElMessage.error("获取文章失败")
    }
  } else {
    ElMessage.error("评论内容不能为空白")
    sendingComment.value = false
  }

}
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

.display_comment {
  display: none;
  visibility: hidden;
}

.commentItemContainer {
  padding: 1rem 2rem;

  .commenterName {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 130%;
  }

  .commentCreatTime {
    font-size: 80%;
  }
}


@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}

.imgContainer {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  display: block;
  /* 确保img是块级元素 */
}
</style>