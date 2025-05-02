<template>
  <FixedHeader />
  <div class="introductionContainer">
    <div style="display: block;">
      你好！
      <strong>欢迎来到留言界面！！！</strong>
      <br>
      如果发现了<strong>网站bug、文章错误、或者任何需要改进的问题</strong>欢迎留言。
      <br>
      如果你有任何<strong>建议、合作、感想、问题</strong>等，欢迎留言，十分感谢。
    </div>
  </div>

  <el-form class="formContainer" @submit.prevent="submitMessage">
    <el-form-item class="form-item">
      <el-input v-model="message" placeholder="写点什么吧..." class="input-with-button">
        <template #append>
          <el-button type="primary" native-type="submit" :disabled="!message.trim()">
            <el-icon :size="16">
              <Promotion />
            </el-icon>
          </el-button>
        </template>
      </el-input>
    </el-form-item>
  </el-form>
  <hr>

  <div class="commentContainer markdown-body" v-if="adviceMessage?.advice_list[0]">
    <h2>留言列表({{ adviceMessage?.advice_number }})：</h2>
    <div class="commentItemContainer" v-for="advice in adviceMessage?.advice_list" :key="advice.id">
      <div class="commenterName">{{ advice.adviser_name }}&nbsp;:</div>
      {{ advice.content }}
      <div class="commentCreatTime">
        <div>{{ advice.creat_time }}</div>
        <div><svg t="1745457640451" class="delete_icon" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="4275" width="2rem" height="2rem"
            @click="handle_delete_click(advice.id)">
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

<script setup lang="ts" name="Advice">
import { onMounted, ref } from 'vue'
import FixedHeader from '@/components/header/FixedHeader.vue';
import { Promotion } from '@element-plus/icons-vue'
import 'github-markdown-css';

const message = ref('')



import { useAdviceStore } from '@/stores/advice';
const adviceStore = useAdviceStore()
interface adviceItemForm {
  id: number;
  content: string;
  creat_time: string;
  adviser_name: string;
  adviser_id: number;
}
const adviceMessage = ref({
  "advice_number": 0,
  "advice_list": [] as adviceItemForm[]
})

const reloadAdvice = async () => {
  const res = await adviceStore.getAdviceAction()
  if (res) {
    adviceMessage.value.advice_list = res.advice_list
    adviceMessage.value.advice_number = res.advice_number
  }
}

onMounted(async () => {
  await reloadAdvice()
})

const handle_delete_click = async (advice_id: number) => {
  const res = await adviceStore.deleteAdviceAction(advice_id)
  if (res === 200) {
    reloadAdvice()
  }
}

const submitMessage = async () => {
  if (message.value.trim()) {
    console.log('提交内容：', message.value)
    const res = await adviceStore.sentAdviceAction({ "content": message.value })
    if (res === 200) {
      message.value = ''
      reloadAdvice()
    }
  }
}

</script>

<style scoped>
.introductionContainer {
  font-size: 1.5rem;
  margin: 2rem;
  line-height: 2.5rem;
  text-align: center;
}

.formContainer {
  width: 60vw;
  min-width: 300px;
  margin: 2rem auto;
}

:deep(.el-input-group__append) {
  padding: 0 12px !important;
  background-color: var(--el-color-primary);
  box-shadow: var(--el-box-shadow-light);

  .el-button {
    color: white;
    margin: 0 -12px;
  }
}

:deep(.el-input__wrapper) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
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