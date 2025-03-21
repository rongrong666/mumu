<template>
  <div class="event-container">
    <el-card class="event-card">
      <h2>发布赛事</h2>
      <el-form ref="eventFormRef" :model="eventForm" :rules="rules" label-width="100px">
        
        <!-- 赛事名称 -->
        <el-form-item label="赛事名称" prop="name">
          <el-input v-model="eventForm.name" placeholder="请输入赛事名称"></el-input>
        </el-form-item>

        <!-- 赛事地点（省市区） -->
        <el-form-item label="赛事地点" prop="location">
          <el-cascader
            v-model="eventForm.location"
            :options="cityOptions"
            placeholder="请选择赛事地点"
          />
        </el-form-item>

        <!-- 赛事时间 -->
        <el-form-item label="赛事时间" prop="time">
          <el-date-picker
            v-model="eventForm.time"
            type="datetime"
            placeholder="选择赛事时间"
            format="YYYY-MM-DD HH:mm"
            value-format="YYYY-MM-DD HH:mm"
          />
        </el-form-item>

        <!-- 赛事 LOGO（1:1） -->
        <el-form-item label="赛事 LOGO" prop="logo">
          <el-upload
            class="upload-box"
            action="/api/upload"
            list-type="picture-card"
            :limit="1"
            :on-success="handleLogoSuccess"
            :before-upload="beforeLogoUpload"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
          <p class="upload-tip">建议尺寸：1:1（正方形）</p>
        </el-form-item>

        <!-- 赛事 Banner（16:9） -->
        <el-form-item label="赛事 Banner" prop="banner">
          <el-upload
            class="upload-box"
            action="/api/upload"
            list-type="picture-card"
            :limit="1"
            :on-success="handleBannerSuccess"
            :before-upload="beforeBannerUpload"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
          <p class="upload-tip">建议尺寸：16:9，例如 1600x900 像素</p>
        </el-form-item>

        <!-- 赛事详情 -->
        <el-form-item label="赛事详情" prop="details">
          <QuillEditor v-model="eventForm.details" theme="snow" />
        </el-form-item>

        <!-- 提交按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交赛事</el-button>
        </el-form-item>
        
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import { createEvent } from '../api/event';
import cityOptions from '../utils/cityOptions.json';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const eventForm = ref({
  name: '',
  location: '',
  time: '',
  logo: '',
  banner: '',
  details: ''
});

// 表单校验规则
const rules = {
  name: [{ required: true, message: '请输入赛事名称', trigger: 'blur' }],
  location: [{ required: true, message: '请选择赛事地点', trigger: 'change' }],
  time: [{ required: true, message: '请选择赛事时间', trigger: 'change' }],
  details: [{ required: true, message: '请输入赛事详情', trigger: 'blur' }]
};

// 上传 LOGO 成功回调
const handleLogoSuccess = (response) => {
  eventForm.value.logo = response.url;
};

// 上传 Banner 成功回调
const handleBannerSuccess = (response) => {
  eventForm.value.banner = response.url;
};

// 上传 LOGO 之前检查
const beforeLogoUpload = (file) => {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJPG) {
    ElMessage.error('上传的 LOGO 必须是 JPG 或 PNG 格式！');
    return false;
  }
  return true;
};

// 上传 Banner 之前检查
const beforeBannerUpload = (file) => {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJPG) {
    ElMessage.error('上传的 Banner 必须是 JPG 或 PNG 格式！');
    return false;
  }
  return true;
};

// 提交表单
const submitForm = async () => {
  try {
    await createEvent(eventForm.value);
    ElMessage.success('赛事发布成功！');
  } catch (error) {
    ElMessage.error('赛事发布失败，请检查输入！');
  }
};
</script>

<style scoped>
.event-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.event-card {
  width: 100%;
  max-width: 600px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.upload-box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.upload-tip {
  font-size: 12px;
  color: #999;
}
</style>
