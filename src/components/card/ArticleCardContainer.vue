<template>
  <div class="container">
    <div class="header">
      <p>最近</p>
    </div>
    <div class="article_card_container">
      <div class="card article_card" v-for="article in articleListMessage" :key="article.id">
        <div class="elment_img_container">
          <el-image :src="article.cover_web_path" fit="cover" class="img_class"
            @click="handleClickArticle(article.id)"></el-image>
        </div>
        <div class="card_message_container">
          <div class="creat_time">
            {{ article.display_time ? article.display_time : article.creat_time }}
          </div>
          <div class="article_title">
            {{ article.title }}
          </div>
          <div class="article_discribe">
            {{ article.description }}
          </div>
        </div>
        <div class="base_message_container">
          Aa:&nbsp;{{ article.text_len }} &nbsp;&nbsp;&nbsp;
          <p class="heart" @click="handleClickHeart(article.id, article.if_like)"
            :class="{ 'heart_active': article.if_like }">
            &hearts;</p>
          :&nbsp;{{ article.like_number }}
          &nbsp;&nbsp;&nbsp;评论:&nbsp;{{ article.comment_number }}
        </div>


      </div>



    </div>
  </div>
</template>

<script setup lang='ts' name='ArticleCardContainer'>
import { onMounted, ref } from 'vue'
import { useArticleStore } from '@/stores/article'
import { nextTick } from 'vue'
import { el } from 'element-plus/es/locales.mjs'
import router from '@/router'
const articleStore = useArticleStore()
const articleListMessage = ref<articleItemForm[]>([])
const reloadArticleMessage = async () => {
  articleListMessage.value = await articleStore.getArticleMessage()
}

async function handleClickHeart(article_id: number, if_like: boolean) {
  if (if_like) {
    await articleStore.unlikeArticleAction(article_id)
    reloadArticleMessage()
  } else {
    await articleStore.likeArticleAction(article_id)
    reloadArticleMessage()
  }
}

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

onMounted(async () => {
  articleListMessage.value = await articleStore.getArticleMessage()
})


// 点击图片或者标题，跳转到文章页面
const handleClickArticle = (article_id: number) => {
  router.push(`/article/${article_id}`)
}



</script>

<style scoped>
.container {
  margin-top: 2rem;
  width: 100%;
}

.card {
  box-shadow: 0 .1rem .4rem 0 rgb(100, 100, 100);
  border-radius: .5rem;
  transition: box-shadow .2s ease-in-out;

}

.card:hover {
  box-shadow: 0rem .2rem .5rem .2rem rgba(111, 111, 111, 0.7);
}

.article_card_container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, .5fr));
  grid-auto-rows: minmax(25rem, 25rem);
  /* 最小列宽300px */
  gap: 1.25rem;
  /* 横向和纵向间距统一 */
  padding: 1.25rem;
  /* 容器内边距 */

  .card {
    margin: .5rem;
  }


  .article_card {
    position: relative;
    background-color: #fff;

    /* 关键属性 */
    .elment_img_container {
      overflow: hidden;
      border-radius: .5rem .5rem 0 0;
      width: 100%;
      height: 66%;
    }

    .img_class {
      border-radius: .5rem .5rem 0 0;
      width: 100%;
      height: 100%;
      transition: all 0.5s ease-in-out;
      cursor: pointer;
    }

    .img_class:hover {

      transform: scale(1.5);
      /* 放大比例 */
    }
  }

  .card_message_container {
    width: 100%;
    padding: .5rem 1rem;

    .creat_time {
      font-size: 1rem;
      color: grey;
      margin-bottom: .2rem;
    }

    .article_title {
      font-size: 1.5rem;
      margin-bottom: .2rem;
      cursor: pointer;
    }

    .article_title:hover {
      text-decoration: underline;
      text-underline-offset: 0.2em;
    }

    .article_discribe {
      font-size: 1rem;
      height: 1rem;
      background-color: skyb;

    }

  }

  .base_message_container {
    position: absolute;
    bottom: 0.2rem;
    left: 1rem;
    color: grey;

    .heart {
      display: inline;
      cursor: pointer;
    }

    .heart_active {
      display: inline;
      cursor: pointer;
      color: red;
    }

  }
}

.header {
  width: 90%;
  display: flex;
  margin: 0 2rem;
  height: 2rem;
  /* background-color: skyblue; */


  /* 垂直居中 */

  font-size: 1.2rem;
  border-bottom: .15rem dashed grey;

}
</style>