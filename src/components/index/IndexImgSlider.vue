<template>
  <div class="home-style">
    <el-carousel class="swiper" width="100%" height="100vh" @change="handleCarouselChange" arrow="always">
      <el-carousel-item v-for="index_img_message in img_message_list" :key="index_img_message.img_article_id">
        <div class="container moveContainer">
          <div class="cover" :style="{ backgroundColor: `rgb(${index_img_message.cover_color_rgb.join(', ')})` }"></div>
          <img :src="index_img_message.img_file_path" alt="首页图片" class="parallax-img moveImg" id="sliderMain" />
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>

</template>

<script setup lang='ts' name='IndexDiarySlider'>
import { onBeforeUnmount } from 'vue';
import { ref, watch, onMounted } from 'vue';
import useIndexImgMove from './useIndexImgMove';
import emitter from '@/utils/emitter';

const img_message_list = [
  {
    "id": 1,
    "img_file_path": "/about_design_cover.png",
    "cover_color_rgb": [100, 100, 100],
    "img_discribe": "写在前面",
    "img_article_id": 1
  },
  {
    "id": 2,
    "img_file_path": "/sunset2.jpg",
    "cover_color_rgb": [200, 100, 100],
    "img_discribe": "写在前面",
    "img_article_id": 1
  },
  {
    "id": 3,
    "img_file_path": "/my_head_img.jpg",
    "cover_color_rgb": [100, 100, 100],
    "img_discribe": "写在前面",
    "img_article_id": 1
  },
]





let { ImgMove, RemoveImgMoveEvent } = useIndexImgMove()
onMounted(() => {
  ImgMove('.moveContainer', '.moveImg');
})

onBeforeUnmount(() => {
  RemoveImgMoveEvent('.moveContainer', '.moveImg')
})



let nowIndex = ref(0) // 当前下标


function handleCarouselChange(newIndex: number, oldIndex: number) {
  // console.log(newIndex)
  nowIndex.value = newIndex
}

watch(nowIndex, (newSliderIndexValue) => {
  emitter.emit('sendSliderNewValue', newSliderIndexValue)
}
)







</script>

<style scoped>
.home-style {
  width: 100vw;
  height: 100vh;
}

.swiper {
  width: 100%;
}

.parallax-img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: transform 0.1s ease-out;
  height: 120%;
  /* 保持宽度自动 */
  width: 120%;
  /* 高度填满容器 */
  object-fit: cover;
  /* 长边填满容器 */
  z-index: 0;
}

.container .cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(238, 103, 97);
  opacity: 0.5;
  clip-path: polygon(0 0, 35% 0, 75% 100%, 0 100%);
  z-index: 1;
}

.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
