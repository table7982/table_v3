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
    <div v-html="ref_result" style="margin-top: 1rem;" class="articleContentContainer"></div>
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
  <div class="commentContainer markdown-body" v-if="articleMessage?.comments[0]">
    <h2>评论列表({{ articleMessage?.comment_number }})：</h2>
    <div class="commentItemContainer" v-for="comment in articleMessage?.comments" :key="comment.id">
      <div class="commenterName">{{ comment.commenter_name }}&nbsp;:</div>
      {{ comment.content }}
      <div class="commentCreatTime">
        <div>{{ comment.creat_time }}</div>
        <div><svg t="1745457640451" class="delete_icon" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="4275" width="2rem" height="2rem"
            @click="handle_delete_click(comment.id)">
            <path
              d="M256 343.472a19.2 19.2 0 0 1 19.2 19.2V768a66.128 66.128 0 0 0 66.144 66.128h341.328A66.128 66.128 0 0 0 748.8 768V362.672a19.2 19.2 0 1 1 38.4 0V768a104.528 104.528 0 0 1-104.528 104.528H341.328A104.528 104.528 0 0 1 236.8 768V362.672a19.2 19.2 0 0 1 19.2-19.2zM405.344 260.048a19.2 19.2 0 0 0 19.2-19.2 66.128 66.128 0 0 1 66.128-66.144h42.656a66.128 66.128 0 0 1 66.144 66.144 19.2 19.2 0 1 0 38.4 0 104.528 104.528 0 0 0-103.04-104.528h-45.648a104.544 104.544 0 0 0-103.04 104.528 19.2 19.2 0 0 0 19.2 19.2z"
              fill="#ccc" p-id="4276"></path>
            <path
              d="M172.8 266.672a19.2 19.2 0 0 1 19.2-19.2h640a19.2 19.2 0 1 1 0 38.4H192a19.2 19.2 0 0 1-19.2-19.2zM426.672 380.8a19.2 19.2 0 0 1 19.2 19.2v320a19.2 19.2 0 1 1-38.4 0V400a19.2 19.2 0 0 1 19.2-19.2zM597.344 380.8a19.2 19.2 0 0 1 19.2 19.2v320a19.2 19.2 0 0 1-38.4 0V400a19.2 19.2 0 0 1 19.2-19.2z"
              fill="#ccc" p-id="4277"></path>
          </svg></div>
      </div>

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

const handle_delete_click = async (comment_id: number) => {
  try {
    const res = await articleStore.deleteCommentAction(comment_id)
    if (res === 200) {
      try {
        articleMessage.value = await articleStore.getArticleByIdAction(param_id_number)
        loadAndRenderMarkdown(articleMessage.value?.content)
        if (articleMessage.value?.comments[0]) {
          if_have_comment.value = true
        }
      } catch {
        ElMessage.error("删除失败")
      }
    } else {
      ElMessage.error("删除失败")
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<style scoped>
.articleContentContainer :deep(img) {
  display: block;
  margin: 0 auto;
  width: 80% !important;
  height: auto !important;
}

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
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .delete_icon {
      cursor: pointer;
    }
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