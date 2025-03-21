<template>
    <div class="page-container">
      <h1>赛事管理</h1>
      <el-table :data="events" style="width: 100%">
        <el-table-column prop="name" label="赛事名称" />
        <el-table-column prop="date" label="日期" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="danger" @click="deleteEvent(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { ElMessage } from 'element-plus';
  
  const events = ref([
    { name: '篮球赛', date: '2025-04-10' },
    { name: '足球赛', date: '2025-05-20' },
  ]);
  
  const deleteEvent = (event) => {
    events.value = events.value.filter(e => e !== event);
    ElMessage.success('赛事已删除');
  };
  </script>
  
  <style scoped>
  .page-container {
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
  }
  </style>
  