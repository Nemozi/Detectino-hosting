import { createRouter, createWebHistory } from 'vue-router';
import { supabase } from '@/lib/supabaseClient.js';

import WelcomeView from '@/views/Welcome.vue'; 
import RegisterView from '@/views/Register.vue'; 
import InfoView from '@/views/Info.vue';
import ExplainView from '@/views/Explain.vue';  
import LoginView from '@/views/Login.vue';
import Profile from '@/views/Profile.vue';
import Levels from '@/views/Levels.vue';
import Dashboard from '@/views/Dashboard.vue';
import Leaderboard from '@/views/Leaderboard.vue';

// LEVEL IMPORTS
import TestUserLevelView from '@/views/Quiz-1.vue'; 
import Level1 from '@/views/Background.vue';
import Level2 from '@/views/Skin.vue';
import Level3 from '@/views/Colors.vue';
import Level4 from '@/views/Expressions.vue';
import Level5 from '@/views/Anatomy.vue'; 
import EtappenQuiz from '@/views/Quiz-2.vue'; 
import Level8 from '@/views/Best-Images.vue'; 
import Level9 from '@/views/Quiz-3.vue';

const routes = [
  
  { path: '/', name: 'welcome', component: WelcomeView },
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/info', name: 'info', component: InfoView },
  { path: '/explain', name: 'explain', component: ExplainView },
  { path: '/profile', name: 'profile', component: Profile },
  { path: '/levels', name: 'levels', component: Levels },
  { path: '/stats', name: 'stats', component: Dashboard },
  { path: '/leaderboard', name: 'leaderboard', component: Leaderboard },
  // --- LEVEL ROUTES ---
  // ID 1
  { path: '/test-user-level', name: 'test-user-level', component: TestUserLevelView },
  // ID 2
  { path: '/level1', name: 'level1', component: Level1 },
  // ID 3
  { path: '/level2', name: 'level2', component: Level2 },
  // ID 4
  { path: '/level3', name: 'level3', component: Level3 },
  // ID 5
  { path: '/level4', name: 'level4', component: Level4 },
  // ID 6
  { path: '/level5', name: 'level5', component: Level5 },
  // ID 7
  { path: '/etappen-quiz', name: 'etappen-quiz', component: EtappenQuiz },
  
  { path: '/level8', name: 'level8', component: Level8 },

  { path: '/level9', name: 'level9', component: Level9 },

  { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const { data: { session } } = await supabase.auth.getSession();
  
  // 1. Füge hier stats und leaderboard zur Liste hinzu
  const publicPages = ['welcome', 'login', 'register', 'info', 'explain', 'stats', 'leaderboard'];
  const isPublicPage = publicPages.includes(to.name);

  if (session) {
    // 2. Hier prüfen wir, ob die Seite eine Ausnahme ist.
    // Wir fügen 'stats' und 'leaderboard' zu den Ausnahmen hinzu,
    // damit man sie AUCH eingeloggt ansehen kann, ohne zu /levels geschickt zu werden.
    const exceptions = ['info', 'explain', 'stats', 'leaderboard'];
    
    if (isPublicPage && !exceptions.includes(to.name)) {
      next({ name: 'levels' });
    } else {
      next(); 
    }
  } else {
    if (isPublicPage) {
      next();
    } else {
      next({ name: 'welcome' });
    }
  }
});

export default router;