// src/router.js

import { createRouter, createWebHistory } from 'vue-router';

import WelcomeView from '@/views/Welcome.vue'; 
import RegisterView from '@/views/Register.vue'; 
import InfoView from '@/views/Info.vue';
import ExplainView from '@/views/Explain.vue';  
import LoginView from '@/views/Login.vue';

const routes = [
  {
    path: '/',
    name: 'welcome', 
    component: WelcomeView 
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView 
  },
  {
    path: '/info',
    name: 'info',
    component: InfoView
  },
  {
    path: '/explain',
    name: 'explain',
    component: ExplainView
  },
  {
      path: '/login',     
      name: 'login',
      component: LoginView
    }

];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;