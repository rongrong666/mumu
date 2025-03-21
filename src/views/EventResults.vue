<template>
    <div class="page-container">
      <h1>赛事成绩</h1>
      <el-table :data="results" style="width: 100%">
        <el-table-column prop="event" label="赛事名称" />
        <el-table-column prop="winner" label="冠军" />
        <el-table-column prop="score" label="比分" />
      </el-table>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const results = ref([
    { event: '篮球赛', winner: 'A队', score: '80-75' },
    { event: '足球赛', winner: 'B队', score: '3-1' },
  ]);
  </script>
  
  <style scoped>
  .page-container {
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
  }
  </style>
  