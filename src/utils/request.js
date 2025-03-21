import axios from 'axios';
import { ElMessage } from 'element-plus';
import router from '../router';

// 创建 axios 实例
const service = axios.create({
  baseURL: '/api', // API 基础路径
  timeout: 5000, // 超时时间
});

// 请求拦截器：自动拼接 Token 到 URL
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // 确保 URL 末尾正确拼接 token
      if (config.url.includes('?')) {
        config.url += `&token=${token}`;
      } else {
        config.url += `?token=${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器：处理错误和未登录状态
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 200) {
      ElMessage.error(res.message || '请求失败');
      return Promise.reject(new Error(res.message || '请求失败'));
    }
    return res.data;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        ElMessage.error('登录已过期，请重新登录');
        localStorage.removeItem('token');
        router.push('/');
      } else {
        ElMessage.error(error.response.data.message || '请求出错');
      }
    } else {
      ElMessage.error('网络错误，请稍后再试');
    }
    return Promise.reject(error);
  }
);

export default service;
