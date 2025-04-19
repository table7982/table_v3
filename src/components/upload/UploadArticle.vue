<template>

  <el-form :model="uploadArticleElForm" class="elment_form_container">
    <h2 class="title">文章提交表单</h2>
    <div class="form-item">
      <label>标题:</label>
      <el-form-item style="max-width: 40rem;">
        <el-input v-model="uploadArticleElForm.title" placeholder="请添加标题" />
      </el-form-item>
    </div>
    <div class="form-item">
      <label>描述:</label>
      <el-form-item style="max-width: 40rem;">
        <el-input v-model="uploadArticleElForm.description" placeholder="请添加描述" />
      </el-form-item>
    </div>
    <div class="form-item">
      <label>分类:</label>
      <el-form-item style="max-width: 40rem;">
        <el-input v-model="uploadArticleElForm.category_id" placeholder="请添加描述" />
      </el-form-item>
    </div>
    <div class="form-item">
      <label>时间:</label>
      <el-form-item style="max-width: 40rem;">
        <el-date-picker v-model="uploadArticleElForm.display_time" type="date" placeholder="选择时间"
          value-format="YYYY-MM-DD" clearable />
      </el-form-item>
    </div>

    <div class="form-item">
      <label>md文件:</label>
      <el-form-item style="max-width: 40rem;">
        <el-upload ref="uploadRef" class="upload-demo" :limit="1" :on-exceed="handleExceed" :auto-upload="false"
          :on-change="handleMdfileChange">
          <template #trigger>
            <el-button type="primary">选择文件</el-button>
          </template>
        </el-upload>
      </el-form-item>
    </div>

    <div class="form-item">
      <label>封面文件:</label>
      <el-form-item style="max-width: 40rem;">
        <el-upload ref="uploadRef" class="upload-demo" :limit="1" :on-exceed="handleExceed" :auto-upload="false"
          :on-change="handleCoverImgfileChange">
          <template #trigger>
            <el-button type="primary">选择文件</el-button>
          </template>
        </el-upload>
      </el-form-item>
    </div>
    <el-button @click="handleSubmitArticle">提交</el-button>
  </el-form>

  <!-- <el-button @click="console.log(uploadArticleElForm.md_file)">dia</el-button> -->

</template>

<script setup lang='ts' name='UploadArticle'>
import type { uploadArticleForm } from '@/my_api/upload';
import { ref, reactive } from 'vue';
import type { UploadFile } from 'element-plus'
import { uploadArticle } from '@/my_api/upload';
import { Plus } from '@element-plus/icons-vue';
import { useUploadStore } from '@/stores/upload';
const uploadStore = useUploadStore()
const uploadArticleElForm = reactive({
  title: '',
  description: '',
  category_id: -1,
  md_file: null as unknown as File,
  cover_img_file: null as unknown as File,
  display_time: undefined
})

const handleMdfileChange = (file: UploadFile) => {
  uploadArticleElForm.md_file = file.raw!
}

const handleCoverImgfileChange = (file: UploadFile) => {
  uploadArticleElForm.cover_img_file = file.raw!
}



const handleSubmitArticle = async () => {
  const res = await uploadStore.uploadArticleAction(uploadArticleElForm)
}

import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import axios from 'axios';

const upload = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}





</script>

<style scoped>
.title {
  display: block;
  font-size: 2rem;
  margin: 2rem auto;
  text-align: center;

}

.elment_form_container {
  width: 70%;
  max-width: 50rem;
  backdrop-filter: blur(20rem);
  background: linear-gradient(45deg, rgba(255, 0, 150, 0.1), rgba(0, 204, 255, 0.1));
  padding: 3rem;
  border-radius: 0.8rem;
  box-shadow: 0 0.2rem 1.2rem rgba(0, 0, 0, 0.08);
  margin: 0 auto;

}

.form-item {

  margin-bottom: 2rem;

  label {
    display: block;
    font-size: 1.4rem;
    color: black;
    margin-bottom: 0.8rem;
  }
}
</style>
