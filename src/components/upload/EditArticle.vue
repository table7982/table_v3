<template>
  <el-form :model="uploadArticleElForm" class="elment_form_container">
    <h2 class="title">文章修改</h2>
    <div class="form-item">
      <label>文章id:</label>
      <el-form-item style="max-width: 40rem;">
        <el-input v-model="uploadArticleElForm.article_id" placeholder="请添加标题" />
        <br>
        <br>
        <el-button @click="handleClickGetArticle(uploadArticleElForm.article_id)">文章获取</el-button>
      </el-form-item>
    </div>

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
      <label>分类id:</label>
      <el-form-item style="max-width: 40rem;">
        <el-input v-model="uploadArticleElForm.category_id" placeholder="请添加分类" />
      </el-form-item>
    </div>

    <div class="form-item">
      <label>分类名称:</label>
      <el-form-item style="max-width: 40rem;">
        <el-select v-model="uploadArticleElForm.category_id" placeholder="请选择城市">
          <el-option v-for="category in categoryOptions" :key="category.id" :label="category.name"
            :value="category.id" />
        </el-select>
      </el-form-item>
    </div>

    <div class="form-item">
      <label>音乐id:</label>
      <el-form-item style="max-width: 40rem;">
        <el-input v-model="uploadArticleElForm.music_id" placeholder="请添加音乐" />
      </el-form-item>
    </div>

    <div class="form-item">
      <label>音乐名称:</label>
      <el-form-item style="max-width: 40rem;">
        <el-select v-model="uploadArticleElForm.music_id" placeholder="请选择城市">
          <el-option v-for="music in musicOptions" :key="music.id" :label="music.name" :value="music.id" />
        </el-select>
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
    <el-button @click="handleSubmitArticle" :loading=uploading>提交</el-button>
  </el-form>
  <div class="title_container">
    <h2 class="title">正文编辑</h2>
  </div>

  <div style="border: 1px solid #ccc">

    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor style="height: 70vh; overflow-y: hidden;" v-model="uploadArticleElForm.content"
      :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" />
  </div>

</template>

<script setup lang='ts' name='UploadWebArticle'>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, reactive, shallowRef, onMounted, watch } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import type { IEditorConfig } from '@wangeditor/editor'
import { ElMessage } from 'element-plus'
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const mode = 'default'


const toolbarConfig = {}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}


const editorConfig: Partial<IEditorConfig> = {
  MENU_CONF: {},
  placeholder: '仅面向授权用户哦...'
}
import url from '@/my_api/config'
if (editorConfig.MENU_CONF !== undefined) {
  editorConfig.MENU_CONF['uploadImage'] = {
    server: `${url}/my_api/article/upload/img`,
    fieldName: 'img_file',
    maxFileSize: 2 * 1024 * 1024,
    maxNumberOfFiles: 20,
    allowedFileTypes: ['image/*'],
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },

    onFailed(file: File, res: any) {
      ElMessage.error(`上传失败,请确认是否有权限上传`)
    },
    onError(file: File, err: any, res: any) {
      ElMessage.error(`上传失败,请确认是否有权限上传`)
    },
  }
}




// 表单提交
import type { uploadArticleForm } from '@/my_api/upload';
import type { UploadFile } from 'element-plus'
import { uploadArticle } from '@/my_api/upload';
import { Plus } from '@element-plus/icons-vue';
import { useUploadStore } from '@/stores/upload';
import { useArticleStore } from '@/stores/article'
const uploadRef = ref()

const articleStore = useArticleStore()
const uploadStore = useUploadStore()
const uploadArticleElForm = reactive({
  title: '',
  description: '',
  category_id: -1,
  cover_img_file: null as unknown as File,
  display_time: undefined,
  content: '',
  text_len: 0,
  music_id: undefined,
  article_id: -1
})

watch(() => uploadArticleElForm.content, () => {
  uploadArticleElForm.text_len = editorRef.value.getText().length as number
})

const handleCoverImgfileChange = (file: UploadFile) => {
  uploadArticleElForm.cover_img_file = file.raw!
}

const uploading = ref(false)
const handleSubmitArticle = async () => {
  uploading.value = true
  const res = await uploadStore.editArticleAction(uploadArticleElForm)
  if (res === 200) {
    uploadArticleElForm.content = ''
    uploadArticleElForm.title = ''
    uploadArticleElForm.cover_img_file = null as unknown as File
    uploadArticleElForm.description = ''
    uploadArticleElForm.music_id = undefined
    uploadRef.value!.clearFiles()
    uploading.value = false
  } else {
    uploading.value = false
  }
}

import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import axios from 'axios';
import { id } from 'element-plus/es/locales.mjs'
import { useRoute } from 'vue-router'

const upload = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files) => {
  uploadRef.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  uploadRef.value!.handleStart(file)
}

const handleClickGetArticle = async (id: number) => {
  const res = await articleStore.getArticleByIdAction(id)
  uploadArticleElForm.title = res.title
  uploadArticleElForm.description = res.description
  uploadArticleElForm.category_id = res.category_id
  uploadArticleElForm.display_time = res.category_id
  uploadArticleElForm.content = res.content
  uploadArticleElForm.text_len = res.text_len
  uploadArticleElForm.music_id = res.music_id
  uploadArticleElForm.article_id = res.id
}

const route = useRoute();
const param_id = route.params.id;
const param_id_number = Number(param_id);
onMounted(async () => {
  loadOptions()
  if (param_id_number) {
    uploadArticleElForm.article_id = param_id_number
    handleClickGetArticle(uploadArticleElForm.article_id)
  }
})


// option加载
const categoryOptions = ref<categoryOptionsItemForm[]>([])
const musicOptions = ref<musicOptionsItemForm[]>([])

interface categoryOptionsItemForm {
  id: number;
  name: string;
}

interface musicOptionsItemForm {
  id: number;
  name: string;
}

const loadOptions = async () => {
  const category_res = await articleStore.getFlattenedCategoryAction()
  if (category_res) {
    categoryOptions.value = category_res
  }
  const music_res = await articleStore.getAllMusicAction()
  if (music_res.code === 200) {
    musicOptions.value = music_res.data
  }
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
  width: 100vw;
  background-color: #fff;
  padding: 3rem;
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

.title_container {
  width: 100vw;
  height: 8rem;
  display: flex;
  background-color: #fff;
}
</style>