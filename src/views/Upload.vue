<template>
  <FixedHeader />
  <div class="upload_container">
    <el-menu mode="horizontal" :router="true" class="elment_menu_container">
      <el-menu-item index="/upload" class="el_menu_item">
        上传类型
      </el-menu-item>
      <el-menu-item index="/manage" class="el_menu_item">
        资源管理
      </el-menu-item>
      <el-menu-item index="/upload/webarticle" class="el_menu_item">
        文章上传
      </el-menu-item>
      <el-menu-item index="/upload/edit/article" class="el_menu_item">
        文章修改
      </el-menu-item>
    </el-menu>
  </div>
  <RouterView></RouterView>
</template>


<script setup lang='ts' name='Upload'>
import FixedHeader from '@/components/header/FixedHeader.vue';
import { ref } from 'vue';

</script>

<style scoped>
.upload_header {
  display: flex;
  width: 80%;
  height: 10rem;
  margin: 0 auto;
  flex-direction: row;
  align-items: center;
  justify-content: space-between
}

.elment_menu_container {
  z-index: 1;
  height: 5rem;

  .el_menu_item {
    font-size: 1.5rem;
  }
}
</style>