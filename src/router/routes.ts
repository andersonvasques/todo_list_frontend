import type { RouteRecordRaw } from 'vue-router';

import LoginLayout from 'src/pages/auth/LoginLayout.vue';
import LoginPage from 'src/pages/auth/LoginPage.vue';
import RegisterLayout from 'src/pages/auth/RegisterLayout.vue';
import RegisterPage from 'src/pages/auth/RegisterPage.vue';
import ResetPasswordLayout from 'src/pages/auth/ResetPasswordLayout.vue';
import ResetPasswordPage from 'src/pages/auth/ResetPasswordPage.vue';
import TasksLayout from 'src/pages/tasks/TasksLayout.vue';
import TasksPage from 'src/pages/tasks/TasksPage.vue';
import ProfileUserLayout from 'src/pages/profile/ProfileUserLayout.vue';
import ProfileUserPage from 'src/pages/profile/ProfileUserPage.vue';

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

  {
    path: '/register',
    name: 'register-layout',
    component: RegisterLayout,
    children: [{ path: '', name: 'register-page', component: RegisterPage }],
  },

  {
    path: '/reset-password',
    name: 'reset-password-layout',
    component: ResetPasswordLayout,
    children: [{ path: '', name: 'reset-password-page', component: ResetPasswordPage }],
  },

  {
    path: '/tasks',
    name: 'tasks-layout',
    component: TasksLayout,
    children: [{ path: '', name: 'tasks-page', component: TasksPage }],
  },

  {
    path: '/profile',
    name: 'profile-user-layout',
    component: ProfileUserLayout,
    children: [{ path: '', name: 'profile-user-page', component: ProfileUserPage }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
