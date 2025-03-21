import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import CreateEvent from '../views/CreateEvent.vue';
import ManageEvents from '../views/ManageEvents.vue';
import EventUsers from '../views/EventUsers.vue';
import EventResults from '../views/EventResults.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/create-event', component: CreateEvent },
  { path: '/manage-events', component: ManageEvents },
  { path: '/event-users', component: EventUsers },
  { path: '/event-results', component: EventResults },
  { path: '/:pathMatch(.*)*', redirect: '/' }
];


const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.path !== '/' && !token) {
    next('/');
  } else {
    next();
  }
});

export default router;
