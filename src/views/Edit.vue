<template>
  <div class="edit-container">
    <el-card class="edit-box">
      <h2>{{ isEditMode ? 'Edit Item' : 'Create Item' }}</h2>
      <el-form @submit.prevent="handleSubmit">
        <el-form-item>
          <el-input v-model="formData.name" placeholder="Name" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="formData.description" placeholder="Description" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit" class="btn" round>
            {{ isEditMode ? 'Update' : 'Create' }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import { ElMessage } from 'element-plus';

const router = useRouter();
const route = useRoute();

const formData = ref({
  name: '',
  description: ''
});

const isEditMode = ref(false);

onMounted(async () => {
  if (route.params.id) {
    isEditMode.value = true;
    try {
      const response = await axios.get(`/api/items/${route.params.id}`);
      formData.value = response.data;
    } catch (error) {
      ElMessage.error('Failed to load item');
    }
  }
});

const handleSubmit = async () => {
  try {
    if (isEditMode.value) {
      await axios.put(`/api/items/${route.params.id}`, formData.value);
      ElMessage.success('Item updated successfully!');
    } else {
      await axios.post('/api/items', formData.value);
      ElMessage.success('Item created successfully!');
    }
    router.push('/home');
  } catch (error) {
    ElMessage.error('Failed to save data');
  }
};
</script>

<style scoped>
.edit-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #f4f4f9;
}

.edit-box {
  width: 100%;
  max-width: 500px;
  padding: 20px;
}
</style>
