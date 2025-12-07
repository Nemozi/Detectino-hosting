// src/router.js

import { createRouter, createWebHistory } from 'vue-router';

import WelcomeView from '@/views/Welcome.vue'; 
import RegisterView from '@/views/Register.vue'; 
import InfoView from '@/views/Info.vue';
import ExplainView from '@/views/Explain.vue';  
import LoginView from '@/views/Login.vue';
import Profile from '@/views/Profile.vue';
import TestUserLevelView from '@/views/TestUserLevel.vue';
import Levels from './views/Levels.vue';
import Level1 from './views/Level1.vue';
import Level2 from './views/Level2.vue';
import Level3 from './views/Level3.vue';
import Level4 from './views/Level4.vue';
import Level5 from './views/Level5.vue';

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
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/test-user-level',
    name: 'test-user-level',
    component: TestUserLevelView
  },
  {
    path: '/levels',
    name: 'levels',
    component: Levels
  },
  {
    path: '/level1',
    name: 'level1',
    component: Level1
  }
  ,
  {
    path: '/level2',
    name: 'level2',
    component: Level2
  },
  {
    path: '/level3',
    name: 'level3',
    component: Level3
  },
  {
    path: '/level4',
    name: 'level4',
    component: Level4
  },
  {
    path: '/level5',
    name: 'level5',
    component: Level5
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;