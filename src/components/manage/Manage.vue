<template>
  <el-container style="max-height: 80vh;" class="container">
    <el-aside style="width: 10rem; min-width: 120px">
      <el-scrollbar>
        <el-menu :router="true">
          <el-menu-item-group>
            <template #title>
              <p style="font-size: 1.5rem; color: black; font-family: '黑体';">管理</p>
            </template>
            <el-menu-item index="/manage/article">文章管理</el-menu-item>
            <el-menu-item index="/manage/music">音乐管理</el-menu-item>
            <el-menu-item index="/manage/category">分类管理</el-menu-item>
          </el-menu-item-group>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <RouterView></RouterView>
  </el-container>
</template>

<script setup lang='ts' name='Manage'>
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import { ref } from 'vue'
</script>

<style scoped>
.container {
  position: relative;
  background-color: #fff;
}
</style>
