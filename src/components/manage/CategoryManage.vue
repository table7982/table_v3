<template>
  <el-main>
    <el-button @click="handleUpload()"> 分类上传 </el-button>
    <br>
    <br>
    <hr>
    <el-scrollbar>
      <el-table :data="categoryList">
        <el-table-column prop="id" label="id" width="40" />
        <el-table-column prop="name" label="分类" width="80" />
        <el-table-column prop="level" label="等级" width="60" />
        <el-table-column prop="creat_time" label="创建时间" width="250" />
        <el-table-column prop="description" label="描述" width="150" />
        <el-table-column prop="parent_id" label="父分类id" width="80" />
        <el-table-column prop="parent_name" label="父分类" width="80" />
        <el-table-column label="操作" width="100" fixed="right">
          <template #default="scope">
            <el-button type="danger" size="small" @click="handleDelete(scope.row.id)" :icon="Delete" circle />
            <el-button type="primary" size="small" @click="handleEdit(scope.row.id)" :icon="Edit" circle />
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>

    <el-dialog v-model="dialogVisible" title="分类上传" width="500px" @closed="handleDialogClose">
      <el-form :model="uploadForm" :rules="rules">
        <!-- 音乐名称 -->
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="uploadForm.name" placeholder="请输入分类名称" />
        </el-form-item>

        <el-form-item label="分类描述" prop="description">
          <el-input v-model="uploadForm.description" placeholder="请输入分类描述" />
        </el-form-item>

        <el-form-item label="分类等级" prop="level">
          <el-input v-model="uploadForm.level" placeholder="请输入分类等级" />
        </el-form-item>

        <el-form-item label="父分类id" prop="parent_id">
          <el-input v-model="uploadForm.parent_id" placeholder="请输入父分类id" />
        </el-form-item>

        <el-form-item label="父分类" prop="parent_id">
          <el-select v-model="uploadForm.parent_id" placeholder="请选择父分类">
            <el-option v-for="category in categoryList" :key="category.id" :label="category.name"
              :value="category.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <!-- 对话框操作 -->
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitUpload">确认上传</el-button>
      </template>
    </el-dialog>


    <el-dialog v-model="editDialogVisible" title="分类修改" width="500px">
      <el-form :model="editForm" :rules="editRules">
        <!-- 音乐名称 -->
        <el-form-item label="修改分类id" prop="id">
          <el-input v-model="editForm.id" placeholder="请输入修改分类id" />
        </el-form-item>

        <el-form-item label="修改分类名称" prop="name">
          <el-input v-model="editForm.name" placeholder="请输入修改分类名称" />
        </el-form-item>

        <el-form-item label="分类描述" prop="description">
          <el-input v-model="editForm.description" placeholder="请输入分类描述" />
        </el-form-item>

        <el-form-item label="分类等级" prop="level">
          <el-input v-model="editForm.level" placeholder="请输入分类等级" />
        </el-form-item>

        <el-form-item label="父分类id" prop="parent_id">
          <el-input v-model="editForm.parent_id" placeholder="请输入父分类id" />
        </el-form-item>

        <el-form-item label="父分类" prop="parent_id">
          <el-select v-model="editForm.parent_id" placeholder="请选择父分类">
            <el-option v-for="category in categoryList" :key="category.id" :label="category.name"
              :value="category.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <!-- 对话框操作 -->
      <template #footer>
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitEdit()">确认修改</el-button>
      </template>
    </el-dialog>

  </el-main>
</template>

<script setup lang='ts' name='MusicManage'>
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import { onMounted, ref, reactive, watch, computed } from 'vue'
import { useArticleStore } from '@/stores/article'
import { useUploadStore } from '@/stores/upload'
import { Edit, Delete, Upload } from '@element-plus/icons-vue'
import { ElMention, ElMessage, ElMessageBox } from 'element-plus'
import router from '@/router'

const uploadStore = useUploadStore()
const articleStore = useArticleStore()

interface categoryItem {
  id: number;
  name: string;
  level: number;
  ceate_time: string;
  description: string;
  parent_id: number;
  parent_name: string;
}

const categoryList = ref<categoryItem[]>([])


onMounted(async () => {
  const res = await articleStore.getFlattenedCategoryAction()
  categoryList.value = res
})

const handleDelete = async (category_id: number) => {
  try {
    await ElMessageBox.confirm(
      '确定要永久删除这个分类吗？',
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
    await articleStore.deleteCategoryAction(category_id)
    const res = await articleStore.getFlattenedCategoryAction()
    categoryList.value = res
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
import type { editCategoryForm, uploadCategoryFrom } from '@/my_api/upload'

// 原有引入保持不变...

// 新增响应式数据

const uploadForm = reactive({
  name: '',
  description: '',
  parent_id: null,
  level: 1,

})

// 表单验证规则
const rules = reactive({
  name: [{ required: true, message: '请输入音乐名称', trigger: 'blur' }],
  description: [{ required: true, message: '请选择音乐文件', trigger: 'blur' }],
  parent_id: [{ required: false, message: '请输入音乐名称', trigger: 'blur' }],
  level: [{ required: true, message: '请选择音乐文件', trigger: 'blur' }]
})


// 提交上传
const submitUpload = async () => {
  if (!uploadForm.name || !uploadForm.description || !uploadForm.level) {
    ElMessage.warning('请填写完整信息')
    return
  }
  try {
    const data: uploadCategoryFrom = {
      'name': uploadForm.name,
      "parent_id": uploadForm.parent_id || undefined,
      'level': uploadForm.level,
      'description': uploadForm.description,
    }

    // 调用store中的上传action

    const upload_res = await uploadStore.uploadCategoryAction(data)
    console.log(666, data.name)
    if (upload_res === 200) {
      dialogVisible.value = false
    }

    // 刷新列表
    const res = await articleStore.getFlattenedCategoryAction()
    categoryList.value = res
  } catch (error) {
    ElMessage.error('上传失败')
    console.error('Upload error:', error)
  }
}



// 关闭对话框重置表单
const handleDialogClose = () => {
  uploadForm.name = '';
  uploadForm.description = '';
  uploadForm.parent_id = null;
  uploadForm.level = 1;
}

watch(() => uploadForm.parent_id, (parent_id) => {
  if (parent_id) {
    for (let i = 0; i < categoryList.value.length; i++) {
      if (categoryList.value[i].id == parent_id) {
        uploadForm.level = categoryList.value[i].level + 1
        return
      }
    }
    uploadForm.level = -1

  } else {
    uploadForm.level = 1
  }
})


const editDialogVisible = ref(false)

const editForm = reactive({
  "id": -1,
  "name": '',
  "description": '',
  "level": 1,
  "parent_id": null as number | null
})

const editRules = reactive({
  id: [{ required: true, message: '请输入id', trigger: 'blur' }],
  name: [{ required: false, message: '请输入名称', trigger: 'blur' }],
  description: [{ required: false, message: '请添加描述', trigger: 'blur' }],
  parent_id: [{ required: false, message: '请输入父分类id', trigger: 'blur' }],
  level: [{ required: true, message: '请选择分类等级', trigger: 'blur' }]
})

const handleEdit = async (category_id: number) => {
  editDialogVisible.value = true
  const category = categoryList.value.find(item => item['id'] === category_id)
  if (category) {
    editForm.id = category.id
    editForm.level = category.level
    editForm.description = category.description
    editForm.parent_id = category.parent_id
    editForm.name = category.name
  }
}


watch(() => editForm.parent_id, (parent_id) => {
  if (parent_id) {
    for (let i = 0; i < categoryList.value.length; i++) {
      if (categoryList.value[i].id == parent_id) {
        editForm.level = categoryList.value[i].level + 1
        return
      }
    }
    uploadForm.level = -1
  } else {
    uploadForm.level = 1
  }
})

const submitEdit = async () => {
  if (!editForm.id || !editForm.level) {
    ElMessage.warning("请填写完整信息")
    return
  }
  try {
    const data: editCategoryForm = {
      "id": editForm.id,
      "name": editForm.name,
      "level": editForm.level,
      "description": editForm.description,
      "parent_id": editForm.parent_id,
    }

    const editRes = await uploadStore.editCategoryAction(data)
    if (editRes === 200) {
      editDialogVisible.value = false
    }
    const res = await articleStore.getFlattenedCategoryAction()
    categoryList.value = res
  } catch (error) {
    ElMessage.error('编辑失败')
    console.error("editCategoryError:", error)
  }
}
</script>

<style scoped></style>