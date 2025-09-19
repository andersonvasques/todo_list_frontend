import type { RouteRecordRaw } from 'vue-router';

import LoginLayout from 'src/pages/auth/LoginLayout.vue';
import LoginPage from 'src/pages/auth/LoginPage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'main-layout',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'main-page', component: () => import('pages/IndexPage.vue') }],
  },

  {
    path: '/login',
    name: 'login-layout',
    component: LoginLayout,
    children: [{ path: '', name: 'login-page', component: LoginPage }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
