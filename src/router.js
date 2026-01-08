import { createRouter, createWebHashHistory } from 'vue-router'; // Wechsel zu HashHistory für Tablet-Reload-Stabilität
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
  { path: '/test-user-level', name: 'test-user-level', component: TestUserLevelView }, // ID 1
  { path: '/level1', name: 'level1', component: Level1 }, // ID 2
  { path: '/level2', name: 'level2', component: Level2 }, // ID 3
  { path: '/level3', name: 'level3', component: Level3 }, // ID 4
  { path: '/level4', name: 'level4', component: Level4 }, // ID 5
  { path: '/level5', name: 'level5', component: Level5 }, // ID 6
  { path: '/etappen-quiz', name: 'etappen-quiz', component: EtappenQuiz }, // ID 7
  { path: '/level8', name: 'level8', component: Level8 }, // ID 8
  { path: '/level9', name: 'level9', component: Level9 }, // ID 9

  { path: '/:pathMatch(.*)*', redirect: '/' }
];

const router = createRouter({
  // TIPP: Nutze createWebHashHistory(), wenn Reloads auf Tablets ohne Server-Config funktionieren sollen
  history: createWebHashHistory(), 
  routes,
});

router.beforeEach(async (to, from, next) => {
  // Wir holen die Session. Supabase kümmert sich um das Caching.
  const { data: { session } } = await supabase.auth.getSession();
  
  const authPages = ['welcome', 'login', 'register'];
  const publicPages = ['info', 'stats', 'leaderboard', 'explain'];
  
  const isAuthPage = authPages.includes(to.name);
  const isPublicPage = publicPages.includes(to.name);

  if (session) {
    // Nutzer ist eingeloggt
    if (isAuthPage) {
      // Wenn eingeloggt, keine Login/Willkommens-Seiten zeigen -> ab zur Map
      next({ name: 'levels' });
    } else {
      // Alles andere (Levels, Profil, Stats) ist erlaubt
      next();
    }
  } else {
    // Nutzer ist NICHT eingeloggt
    if (isAuthPage || isPublicPage) {
      // Darf nur Auth-Seiten und öffentliche Seiten sehen
      next();
    } else {
      // Versuch auf ein Level oder Profil zuzugreifen? -> Zurück zum Start
      next({ name: 'welcome' });
    }
  }
});

export default router;