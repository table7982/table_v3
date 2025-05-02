<template>
  <FixedHeader />

  <div class="envelopeContainer">
    <svg id="图层_1" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 454 400.69" class="svgClass">
      <polygon class="cls-2"
        points="453.5 129.06 453.5 151.45 250.68 265.47 226 251.89 202.56 264.94 0.5 145.9 0.5 129.06 453.5 129.06" />
      <polygon class="cls-3" points="453.5 115.56 453.5 129.06 0.5 129.06 0.5 115.56 226.5 0.56 453.5 115.56" />

      <polygon :class="{ paper: true, paperActive: haveLetter }" points="40 90 414 90 414 400.69 40 400.69 40 90" />

      <text x="50%" y="40%" font-family="Arial" font-size="24" fill="#3a506b" text-anchor="middle"
        :class="{ message: true, messageActive: haveLetter }" dominant-baseline="middle">
        <tspan x="227" dy="1.2em">{{ haveLetter ? "您有信件" : '未查询到您的信件哦！' }}</tspan>
        <tspan x="227" dy="1.2em" @click="handleClickDetailLetter(name)" style="cursor: pointer;">
          {{ haveLetter ? "点击查看" : '' }}</tspan>
      </text>

      <polygon class="cls-4" points="453.5 151.45 453.5 377.12 250.68 265.47 453.5 151.45" />
      <polygon class="cls-4" points="202.56 264.94 0.5 377.43 0.5 145.9 202.56 264.94" />
      <polygon class="cls-1"
        points="453.5 377.12 453.5 400.56 0.5 400.56 0.5 377.43 202.56 264.94 226 251.89 250.68 265.47 453.5 377.12" />
    </svg>
    <div class="elFormContainer">
      <el-form>
        <el-form-item>
          <el-input placeholder="你的名字" style="width: 10rem;" v-model="name"></el-input>
          <el-button @click=handleClickLook(name)>查看</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="quoteContainer">远方来信:来自时空的远方给你写信</div>
  </div>

</template>

<script setup lang="ts">
import FixedHeader from '@/components/header/FixedHeader.vue';
import { useLetterStore } from '@/stores/letter'
import { useArticleStore } from '@/stores/article'
import { ref, watch } from 'vue';
import router from '@/router';
const articleStore = useArticleStore()
const letterStore = useLetterStore()

const name = ref("")
const haveLetter = ref<boolean>(false)

const handleClickLook = async (name: string) => {
  const res = await letterStore.getLetterAction(name)
  if (res.code === 200) {
    haveLetter.value = true
  }
}
watch(() => name.value, () => {
  haveLetter.value = false
})

const handleClickDetailLetter = (name: string) => {
  if (haveLetter.value) {
    router.push(`/letter/${name}`)
  }
}
</script>

<style scoped>
.envelopeContainer {
  position: relative;
  width: 70%;
  height: auto;
  margin: 2rem auto;
}

.cls-1 {
  fill: #f0ebd8;
  stroke-width: 0.25px;
}

.paper {
  fill: #fefdf7;
  transform: translateY(50px);
  transition: all 0.3s ease-in-out;
}

.paperActive {
  transform: translateY(0);
}

.message {
  fill: #fefdf7;
  transform: translateY(50px);
  transition: all 0.3s ease-in-out;
}

.messageActive {
  fill: #000000;
  transform: translateY(0);
}

.paper,
.cls-1,
.cls-4,
.cls-2,
.cls-3 {
  stroke: #000;
  stroke-miterlimit: 10;
  stroke-width: 0.25px;
}

.cls-2 {
  fill: #ede4c5;
}

.cls-4 {
  fill: #ede4c5;
}

.cls-3 {
  fill: #e1d1ad;
}


.cls-1 {
  filter:
    drop-shadow(5px 1px 10px rgba(0, 0, 0, 0.5));
}

.cls-4 {
  filter:
    drop-shadow(0px 1px 5px rgba(0, 0, 0, 0.5));
}

.svgClass {
  filter:
    drop-shadow(5px 1px 10px rgba(0, 0, 0, 0.5));
  perspective: 1200px;
}

.elFormContainer {
  position: absolute;
  bottom: 1%;
  left: 50%;
  transform: translateX(-50%);
}

.quoteContainer {
  text-align: right;
}
</style>