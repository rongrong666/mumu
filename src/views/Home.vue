<template>
  <div class="home-container">
    <h1 class="title">慕慕赛事管理系统</h1>
    <el-row :gutter="20" justify="center">
      <el-col :xs="24" :sm="12" :md="6" v-for="(box, index) in boxes" :key="index">
        <el-card class="box" shadow="hover" @click="goToPage(box.route)">
          <div class="box-content">
            <el-icon :size="40" class="box-icon"><component :is="box.icon" /></el-icon>
            <h3>{{ box.title }}</h3>
            <p>{{ box.description }}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Edit, FolderOpened, User, Trophy } from '@element-plus/icons-vue';

const router = useRouter();

const boxes = ref([
  { title: '发布赛事', description: '创建新的赛事', icon: Edit, route: '/create-event' },
  { title: '赛事管理', description: '管理所有赛事', icon: FolderOpened, route: '/manage-events' },
  { title: '赛事用户', description: '查看参赛用户', icon: User, route: '/event-users' },
  { title: '赛事成绩', description: '查看赛事成绩', icon: Trophy, route: '/event-results' },
]);

const goToPage = (route) => {
  router.push(route);
};
</script>

<style scoped>
.home-container {
  padding: 40px;
  text-align: center;
}

.title {
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
}

.box {
  transition: transform 0.3s ease-in-out;
  text-align: center;
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
}

.box:hover {
  transform: scale(1.05);
  background-color: #f0f8ff;
}

.box-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.box-icon {
  color: #409eff;
  margin-bottom: 10px;
}

h3 {
  margin: 10px 0;
  color: #333;
}

p {
  color: #666;
  font-size: 14px;
}

@media (max-width: 768px) {
  .box {
    margin-bottom: 20px;
  }
}
</style>
