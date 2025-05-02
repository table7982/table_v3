<template>
  <Header style="z-index: 100;" />
  <IndexImgSlider />
  <IndexPrefaceSlider />
  <IndexMianContainer />

</template>

<script setup lang='ts' name='Index'>
import Header from '@/components/header/Header.vue';
import IndexImgSlider from '@/components/index/IndexImgSlider.vue';
import IndexPrefaceSlider from '@/components/index/IndexPrefaceSlider.vue';
import IndexMianContainer from '@/components/index/IndexMianContainer.vue';

</script>

<style scoped>
.test_content {
  width: 100vw;
  height: 100rem;
  /* background-color: pink; */

}
</style>