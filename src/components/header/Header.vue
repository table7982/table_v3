<template>
  <div class="header_container" ref="headerRef" :class="{ 'hidden': !isMenuVisible }">

    <RouterLink to="/index" class="logo_container">
      <img :src='`${url}/static/logo_white.png`' class="logo"></img>
    </RouterLink>

    <ul class="header_ul">
      <li class="header_li">
        <RouterLink to="/index">首页</RouterLink>
      </li>

      <li class="header_li note_item" ref="noteRef">
        分类
        <div class="note_list_container">
          <div v-for="categoryItem in categoryList" :key="categoryItem.id">
            <div class="note_list_item" @click="handleClickCategory(categoryItem.id)">
              {{ categoryItem.name }}
            </div>
          </div>
        </div>
      </li>

      <li class="header_li">
        <RouterLink to="/advice">留言</RouterLink>
      </li>

      <li class="header_li note_item" ref="noteRef">
        其他
        <div class="note_list_container">
          <RouterLink to="/upload">
            <div class="note_list_item">
              上传
            </div>
          </RouterLink>
          <RouterLink to="/letter">
            <div class="note_list_item">
              来信
            </div>
          </RouterLink>

        </div>
      </li>
    </ul>
    <div class="login_container" @click="handleClickLogin">
      <div class="login_stuation_text">{{ visitorStore.visitorInfo ? visitorStore.visitorInfo.username[0] : "登录" }}
      </div>
    </div>
  </div>
</template>

<script setup lang='ts' name='Header'>
import { RouterLink, onBeforeRouteUpdate, useRoute } from 'vue-router';
import { ref, onMounted, onUnmounted, watch } from 'vue';
import router from '@/router';
import url from '@/my_api/config';
const visitorStore = useVisitorStore()


const isMenuVisible = ref(true)
const lastScrollY = ref(0)
const headerRef = ref<HTMLElement | null>(null)



const debounce = (fn: Function, delay: number) => {
  let timeoutId: number
  return (...args: any[]) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}


const handleScroll = () => {
  const currentScrollY = window.scrollY || window.pageYOffset

  if (currentScrollY > lastScrollY.value) {
    // 向下滚动隐藏（网页1基础逻辑）
    isMenuVisible.value = currentScrollY < 50 ? true : false
  } else {
    // 向上滚动显示（网页7的阈值控制思路）
    isMenuVisible.value = true
  }
  lastScrollY.value = currentScrollY
}


onMounted(() => {
  window.addEventListener('scroll', debounce(handleScroll, 100))

})

onUnmounted(() => {
  window.removeEventListener('scroll', debounce(handleScroll, 100))
})

const noteRef = ref<HTMLElement | null>(null)

import { useVisitorStore } from '@/stores/visitor';
import { useArticleStore } from '@/stores/article';
import type { RefSymbol } from '@vue/reactivity';
import { ElMessage } from 'element-plus';
import Category from '@/views/Category.vue';
import { ca } from 'element-plus/es/locales.mjs';

const articleStore = useArticleStore()

function handleClickLogin() {
  if (visitorStore.token && visitorStore.visitorInfo) {
    visitorStore.logout()
    ElMessage.success("登出成功")
  } else if (visitorStore.token && !visitorStore.visitorInfo) {
    visitorStore.getVisitorInfo()
  } else {
    router.push('/login')
  }
}

interface categoryListForm {
  id: number;
  name: string;
  level: number;
}

const categoryList = ref<categoryListForm[]>([])


onMounted(async () => {
  const res = await articleStore.getAllCategoryAction()
  if (res.code === 200) {
    categoryList.value = res.data
  } else {
    ElMessage("获取分类失败")
  }
})

const handleClickCategory = (category_id: number) => {
  router.push(`/category/${category_id}`)
}







</script>

<style scoped>
.logo_container {
  position: absolute;
  height: 3.5rem;
  left: 1rem;
}

.logo {
  position: absolute;
  height: 3.5rem;
  left: 1rem;
}

.header_container {
  position: fixed;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  z-index: 999;

  top: 0;
  width: 100vw;
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
  background-color: rgba(0, 0, 0, 0);
}

.header_container:hover {
  background-color: rgba(0, 0, 0, 0.6);
}

.header_ul {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  height: 5rem;
  margin-right: 1rem;
  /* background-color: pink; */

}

.header_li {
  display: inline-block;
  font-size: 1.5rem;
  position: relative;
  line-height: 4rem;
  height: 4rem;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  color: white;
  margin: 0 1rem;
  padding: 0 1rem;

}

.login_container {
  display: flex;
  align-items: center;

  cursor: pointer;
  /* 半透明底色 */
  backdrop-filter: blur(1rem);
  /* 背景模糊 */
  -webkit-backdrop-filter: blur(1rem);
  border: 0.1rem solid gray;
  /* Safari 兼容 */
  border-radius: 50%;
  width: 4rem;
  height: 4rem;

  font-size: 1.5rem;
  margin-right: 2rem;

  color: white;

}

.login_stuation_text {
  display: block;
  margin: auto;
}

.header_li::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -0.55rem;
  width: 100%;
  height: 0.5rem;
  background: #ff6b6b;
  /* 下划线颜色 */
  transform: scaleX(0);
  /* 初始隐藏 */
  transition: transform 0.3s ease;
  transform-origin: left;
  /* 滑动起点方向（left/right） */
}

.header_li:hover::after {
  transform: scaleX(1);
  /* 显示下划线 */
}

.header_li:hover {
  color: #ff6b6b;
}

.hidden {
  transform: translateY(-100%);
}


.note_item {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.note_item:hover .note_list_container {
  opacity: 1;
  visibility: visible;
}

.note_list_container {
  position: absolute;
  padding: .3rem .5rem;
  border-radius: .4rem;
  top: 4.5rem;
  width: 13rem;
  font-size: 1.5rem;

  cursor: pointer;
  color: #000000;
  background-color: rgba(230, 230, 230, 0.2);

  /* 半透明底色 */
  backdrop-filter: blur(10rem);
  /* 背景模糊 */
  -webkit-backdrop-filter: blur(10rem);
  /* Safari 兼容 */

  /* 增强玻璃质感 */
  box-shadow: 0 0 .4rem .1rem rgba(0, 0, 0, .2);
  border: 1px solid rgba(255, 255, 255, 0.18);
  opacity: 0;
  transition: opacity .5s ease-in-out;
  visibility: hidden;
  /* 过渡动画 */
}

.note_list_item {
  text-align: center;
  line-height: 2.5rem;

  backdrop-filter: blur(10px);
  /* 背景模糊 */
  -webkit-backdrop-filter: blur(10px);
  /* Safari 兼容 */

  height: 2.5rem;
  margin: .4rem 0;
  border-radius: .3rem;
  background: rgba(255, 255, 255, 0.1);
  /* 半透明底色 */
  box-shadow: 0rem .03rem .2rem 0rem rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.18);

}

.note_list_item:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>