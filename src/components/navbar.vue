<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/lib/supabaseClient.js';
import { useGameState } from '@/composables/useGameState.js'; 

const router = useRouter();
const user = ref(null); 

const isMobileMenuOpen = ref(false);
const isDesktopDropdownOpen = ref(false);

const { totalScore, scoreFeedback, streakFeedback, initGameState } = useGameState();

const toggleMobileMenu = () => isMobileMenuOpen.value = !isMobileMenuOpen.value;
const toggleDesktopDropdown = (e) => {
    e.stopPropagation();
    isDesktopDropdownOpen.value = !isDesktopDropdownOpen.value;
};

const closeMenus = () => { isDesktopDropdownOpen.value = false; };

const handleLogout = async () => {
    await supabase.auth.signOut();
    isMobileMenuOpen.value = false;
    isDesktopDropdownOpen.value = false;
    user.value = null;
    router.push('/'); 
};

onMounted(() => {
    window.addEventListener('click', closeMenus);
    supabase.auth.getSession().then(({ data: { session } }) => {
        user.value = session?.user || null;
        if (user.value) initGameState();
    });
    supabase.auth.onAuthStateChange((_event, session) => {
        user.value = session?.user || null;
    });
});
onUnmounted(() => { window.removeEventListener('click', closeMenus); });
</script>

<template>
  <nav class="navbar">
    <div class="navbar-left">
      <router-link to="/" class="navbar-logo">
        <img src="/Detectino.png" alt="Logo" class="logo-image">
        <span class="logo-text">Detectino</span>
      </router-link>
    </div>

    <div v-if="user" class="navbar-center">
        <div class="score-pill" :class="{ 'pill-bounce': scoreFeedback }">
            <span class="icon">🏆</span>
            <span class="value">{{ totalScore }}</span>
        </div>
    </div>

    <div class="navbar-right">
        <router-link to="/info" class=" desktop-only navbar-button">Info</router-link>
        <template v-if="!user">
            <router-link to="/login" class="navbar-button">Login</router-link>
        </template>
        <template v-else>
            <div class="dropdown-container ">
                <button @click.stop="toggleDesktopDropdown" class="navbar-button">Menü ▼</button>
                <div v-if="isDesktopDropdownOpen" class="neo-dropdown">
                    <router-link to="/leaderboard" @click="closeMenus">Leaderboard</router-link>
                    <router-link to="/stats" @click="closeMenus">Statistiken</router-link>
                    <router-link to="/profile" @click="closeMenus">Mein Profil</router-link>
                    <div class="dropdown-divider"></div>
                    <button @click="handleLogout">Abmelden</button>
                </div>
            </div>
        </template>
    </div>

    <!-- GLOBALER ANIMATIONS-LAYER -->
    <transition name="global-fly">
        <div v-if="scoreFeedback" :key="'score' + scoreFeedback.id" class="global-score-flyer" :class="scoreFeedback.type">
            {{ scoreFeedback.text }}
        </div>
    </transition>

    <transition name="streak-fly">
        <div v-if="streakFeedback" :key="'streak' + streakFeedback.id" class="streak-flyer">
            🔥 {{ streakFeedback.count }}er STREAK!
        </div>
    </transition>
  </nav>
</template>

<style scoped>
/* --- BASIS NAVBAR --- */
.navbar { display: flex; justify-content: space-between; align-items: center; height: 65px; padding: 0 1.5rem; background-color: var(--card-bg, #edc531); border-bottom: 3px solid #000; position: sticky; top: 0; z-index: 3000; }
.navbar-logo { text-decoration: none; display: flex; align-items: center; color: #000; font-weight: 900; font-size: 1.3rem; text-transform: uppercase; }
.logo-image { max-height: 2.2rem; margin-right: 0.5rem; }
.navbar-center { position: absolute; left: 50%; transform: translateX(-50%); z-index: 3000; }
.score-pill { background: #fff; border: 2px solid #000; padding: 0.3rem 0.8rem; font-weight: 900; box-shadow: 3px 3px 0 #000; display: flex; gap: 0.5rem; }
.navbar-right { display: flex; align-items: center; gap: 1rem; z-index: 3001; }
.navbar-button { background-color: #000; color: #fff;  font-size: 0.9rem; font-weight: 700; padding: 0.5rem 1rem; text-decoration: none; text-transform: uppercase; cursor: pointer; }
.navbar-button:hover { background: #fff; color: #000; transform: translate(2px, 2px); box-shadow: 3px 3px 0 #333; }
.neo-dropdown { position: absolute; top: calc(100% + 10px); right: 0; background: #fff; border: 3px solid #000; box-shadow: 6px 6px 0 #000; min-width: 180px; display: flex; flex-direction: column; }
.neo-dropdown a, .neo-dropdown button { padding: 0.8rem 1rem; text-decoration: none; color: #000; font-weight: 700; text-align: left; border: none; background: none; border-bottom: 2px solid #000; cursor: pointer; }
.dropdown-divider { height: 4px; background: #000; }

/* --- ANIMATIONS-ELEMENTE --- */
.global-score-flyer, .streak-flyer {
    position: fixed;
    left: 50%;
    transform: translate(-50%, -50%); /* Immer zentriert */
    z-index: 9999;
    font-weight: 900;
    pointer-events: none;
    text-transform: uppercase;
    color: #fff;
    -webkit-text-stroke: 2px #000;
    filter: drop-shadow(4px 4px 0px #000);
    opacity: 0; /* Standardmäßig unsichtbar */
}

.global-score-flyer { top: 50%; font-size: 5rem; }
.streak-flyer { top: 60%; font-size: 3.5rem; color: #ffaa00; margin-top: 20px; }

.global-score-flyer.positive { color: #00ff00; }
.global-score-flyer.negative { color: #ff3333; }

/* --- TRANSITION LOGIK (REPARIERT) --- */

.global-fly-enter-active {
    animation: master-fly 1.2s forwards cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.streak-fly-enter-active {
    animation: streak-fly 1.2s forwards cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* WICHTIG: Verhindert das Aufploppen am Ende */
.global-fly-leave-active, .streak-fly-leave-active {
    opacity: 0 !important;
    transition: none !important;
}

@keyframes master-fly {
    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.3); }
    20% { opacity: 1; transform: translate(-50%, -50%) scale(1.3); }
    80% { opacity: 1; transform: translate(-50%, -40vh) scale(0.8); }
    100% { opacity: 0; transform: translate(-50%, -55vh) scale(0.4); }
}

@keyframes streak-fly {
    0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
    20% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
    100% { opacity: 0; transform: translate(100px, -60vh) scale(0.5); }
}

.pill-bounce { animation: pill-hit 0.3s ease-out 0.9s; }
@keyframes pill-hit { 50% { transform: scale(1.3); } }

/* Mobile */
@media (max-width: 850px) { .desktop-only { display: none; } .logo-text { display: none; } }
</style>