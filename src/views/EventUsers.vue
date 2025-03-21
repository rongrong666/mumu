<template>
    <div class="page-container">
      <h1>赛事用户</h1>
      <el-table :data="users" style="width: 100%">
        <el-table-column prop="name" label="用户姓名" />
        <el-table-column prop="event" label="参赛赛事" />
        <el-table-column label="状态">
          <template #default="{ row }">
            <el-tag :type="row.status === '已确认' ? 'success' : 'warning'">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const users = ref([
    { name: '张三', event: '篮球赛', status: '已确认' },
    { name: '李四', event: '足球赛', status: '待审核' },
  ]);
  </script>
  
  <style scoped>
  .page-container {
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
  }
  </style>
  