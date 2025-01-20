import { createRouter, createWebHistory } from 'vue-router';
import DashboardPage from '@/pages/DashboardPage.vue';
import BacklogPage from '@/pages/BacklogPage.vue';
import BoardPage from '@/pages/BoardPage.vue';
import ReleasesPage from '@/pages/ReleasesPage.vue';
import SettingsPage from '@/pages/SettingsPage.vue';

const routes = [
  { path: '/', component: DashboardPage },
  { path: '/backlog', component: BacklogPage },
  { path: '/board', component: BoardPage },
  { path: '/releases', component: ReleasesPage },
  { path: '/settings', component: SettingsPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;