<template>
  <div class="login-container">
    <el-card class="login-box">
      <h2>欢迎使用慕慕管理后台</h2>
      <el-form @submit.prevent="handleLogin">
        <el-form-item>
          <el-input v-model="mobile" placeholder="mobile" clearable />
        </el-form-item>
        <el-form-item>
          <el-input v-model="password" type="password" placeholder="Password" show-password />
        </el-form-item>
        <!-- 这里让按钮居中 -->
        <el-form-item style="text-align: center;">
          <el-button type="primary" @click="handleLogin" class="btn" round>登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../store';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const mobile = ref('');
const password = ref('');
const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  if (!mobile.value || !password.value) {
    ElMessage.warning('Please enter mobile and password');
    return;
  }

  await authStore.login(mobile.value, password.value);
  if (authStore.token) {
    ElMessage.success('Login successful!');
    router.push('/home');
  } else {
    ElMessage.error('Login failed');
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #6a11cb, #2575fc);
}

.login-box {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border-radius: 12px;
}

/* 让按钮宽度适中，并在父容器中居中 */
.btn {
  width: 50%;
  display: block;
  margin: 0 auto; /* 居中 */
}
</style>
