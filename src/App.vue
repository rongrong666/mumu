<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
</script>

<style>
/* 全局基础设置 */
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  background-color: #f4f4f9;
}

/* 全局 flex 布局 */
#app {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 设置响应式布局 */
.router-view {
  width: 100%;
  max-width: 1200px;
  padding: 1rem;
  box-sizing: border-box;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .router-view {
    padding: 0.5rem;
  }
}
</style>
