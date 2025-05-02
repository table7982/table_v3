<template>
  <el-main>
    <el-button @click="handleUpload()"> 音乐上传 </el-button>
    <br>
    <br>
    <hr>
    <el-scrollbar>
      <el-table :data="musicList">
        <el-table-column prop="id" label="id" width="40" />
        <el-table-column prop="name" label="名称" width="80" />
        <el-table-column prop="web_path" label="路径" width="320" />
        <el-table-column prop="music_uploader_id" label="作者id" width="80" />
        <el-table-column prop="music_uploader" label="作者" width="100" />
        <el-table-column label="操作" width="100" fixed="right">
          <template #default="scope">
            <el-button type="danger" size="small" @click="handleDelete(scope.row.id)" :icon="Delete" circle />
            <el-button type="primary" size="small" @click="handleUpload()" :icon="Upload" circle />
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>


    <el-dialog v-model="dialogVisible" title="音乐上传" width="500px" @closed="handleDialogClose">
      <el-form :model="form" :rules="rules" ref="uploadForm">
        <!-- 音乐名称 -->
        <el-form-item label="音乐名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入音乐名称" />
        </el-form-item>

        <!-- 文件上传 -->
        <el-form-item label="音乐文件" prop="file">
          <el-upload class="upload-demo" :auto-upload="false" :on-change="handleFileChange" :show-file-list="false">
            <el-button type="primary">选择文件</el-button>
            <span v-if="form.file" class="ml-2">{{ form.file.name }}</span>
          </el-upload>
        </el-form-item>
      </el-form>

      <!-- 对话框操作 -->
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitUpload">确认上传</el-button>
      </template>
    </el-dialog>
  </el-main>
</template>

<script setup lang='ts' name='MusicManage'>
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import { onMounted, ref, reactive } from 'vue'
import { useArticleStore } from '@/stores/article'
import { useUploadStore } from '@/stores/upload'
import { Edit, Delete, Upload } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import router from '@/router'

const uploadStore = useUploadStore()

interface musicItem {
  id: number;
  name: string;
  web_path: string;
  music_uploader_id: number;
  music_uploader: string;
}

const musicList = ref<musicItem[]>([])

const articleStore = useArticleStore()
onMounted(async () => {
  const res = await articleStore.getAllMusicAction()
  musicList.value = res.data
})


const handleDelete = async (music_id: number) => {
  try {
    await ElMessageBox.confirm(
      '确定要永久删除这首音乐吗？',
      '删除确认',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        // 自定义关闭图标（可选）
        closeOnClickModal: false
      }
    )
    // 用户点击确定后的逻辑
    console.log('执行删除操作')
    await articleStore.deleteMusicAction(music_id)
    const res = await articleStore.getAllMusicAction()
    musicList.value = res.data
  } catch (error) {
    // 用户点击取消后的逻辑
    console.log('取消删除')
  }
}

const dialogVisible = ref(false)
const handleUpload = () => {
  dialogVisible.value = true
}


import type { UploadFile } from 'element-plus'

// 原有引入保持不变...

// 新增响应式数据

const form = reactive({
  name: '',
  file: null as File | null
})

// 表单验证规则
const rules = reactive({
  name: [{ required: true, message: '请输入音乐名称', trigger: 'blur' }],
  file: [{ required: true, message: '请选择音乐文件', trigger: 'change' }]
})

// 文件选择处理
const handleFileChange = (file: UploadFile) => {
  form.file = file.raw as File
}

// 提交上传
const submitUpload = async () => {
  if (!form.file || !form.name) {
    ElMessage.warning('请填写完整信息')
    return
  }

  try {
    const formData = new FormData()
    const data = {
      'music_name': form.name,
      "music_file": form.file
    }

    // 调用store中的上传action
    await uploadStore.uploadMusicAction(data)
    dialogVisible.value = false

    // 刷新列表
    const res = await articleStore.getAllMusicAction()
    musicList.value = res.data
  } catch (error) {
    ElMessage.error('上传失败')
    console.error('Upload error:', error)
  }
}

// 关闭对话框重置表单
const handleDialogClose = () => {
  form.name = ''
  form.file = null
}

</script>

<style scoped></style>