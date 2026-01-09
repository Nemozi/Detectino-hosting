<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/lib/supabaseClient.js';
import { useGameState } from '@/composables/useGameState.js'; 
import { useTranslation } from '@/composables/useTranslation.js';

const router = useRouter();
const user = ref(null); 

// Menü-Zustände
const isDesktopDropdownOpen = ref(false);
const isLangDropdownOpen = ref(false); 

const { totalScore, scoreFeedback, streakFeedback, initGameState } = useGameState();
const { t, locale, setLocale, detectLanguage } = useTranslation(); 

const languages = [
    { code: 'de', label: 'Deutsch' },
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'it', label: 'Italiano' },
    { code: 'gr', label: 'Ελληνικά' },
    { code: 'rs', label: 'Српски' },
    { code: 'zh', label: '中文' }
];

const toggleDesktopDropdown = (e) => {
    e.stopPropagation();
    isLangDropdownOpen.value = false;
    isDesktopDropdownOpen.value = !isDesktopDropdownOpen.value;
};

const toggleLangDropdown = (e) => {
    e.stopPropagation();
    isDesktopDropdownOpen.value = false;
    isLangDropdownOpen.value = !isLangDropdownOpen.value;
};

const closeMenus = () => {
    isDesktopDropdownOpen.value = false;
    isLangDropdownOpen.value = false;
};

const handleLogout = async () => {
    // ÄNDERUNG: .auth hinzugefügt
    const { error } = await supabase.auth.signOut(); 
    if (error) {
        console.error("Fehler beim Abmelden:", error.message);
    }
    
    closeMenus();
    user.value = null;
    window.location.href = '/'; 
};

onMounted(() => {
    detectLanguage();
    window.addEventListener('click', closeMenus);
    supabase.auth.getSession().then(({ data: { session } }) => {
        user.value = session?.user || null;
        if (user.value) initGameState();
    });
    supabase.auth.onAuthStateChange((_event, session) => {
        user.value = session?.user || null;
    });
});

onUnmounted(() => {
    window.removeEventListener('click', closeMenus);
});
</script>

<template>
  <nav class="navbar">
    
    <!-- LINKS: LOGO -->
    <div class="navbar-left">
      <router-link to="/" class="navbar-logo">
        <img src="/Detectino.png" alt="Logo" class="logo-image">
        <span class="logo-text">Detectino</span>
      </router-link>
    </div>

    <!-- MITTE: SCORE -->
    <div v-if="user" class="navbar-center">
        <div class="score-pill" :class="{ 'pill-bounce': scoreFeedback }">
            <span class="icon">🏆</span>
            <span class="value">{{ totalScore }}</span>
        </div>
    </div>

    <!-- RECHTS: NAVIGATION -->
    <div class="navbar-right">
        
        <!-- SPRACH-DROPDOWN (DESKTOP) -->
        <div class="dropdown-container desktop-only">
            <button @click.stop="toggleLangDropdown" class="navbar-button lang-btn">
                {{ (locale || 'de').toUpperCase() }} ▼
            </button>
            <div v-if="isLangDropdownOpen" class="neo-dropdown lang-dropdown">
                <button v-for="lang in languages" :key="lang.code" @click="setLocale(lang.code)">
                    {{ lang.label }}
                </button>
            </div>
        </div>

        <!-- ZUM SPIEL (ÜBERSETZT) -->
        <router-link v-if="user" to="/levels" class="navbar-button play-btn desktop-only">
            🕹️ {{ t('navbar.play') }}
        </router-link>

        <!-- INFO (ÜBERSETZT) -->
        <router-link to="/info" class="desktop-only navbar-button">
            {{ t('navbar.info') }}
        </router-link>

        <template v-if="!user">
            <router-link to="/register" class="navbar-button play-btn">
                {{ t('navbar.participate') }}
            </router-link>
        </template>

        <template v-else>
            <!-- HAUPT-MENÜ DROPDOWN -->
            <div class="dropdown-container">
                <button @click.stop="toggleDesktopDropdown" class="navbar-button menu-trigger">
                    {{ t('navbar.menu') }} ▼
                </button>
                
                <div v-if="isDesktopDropdownOpen" class="neo-dropdown">
                    <router-link to="/levels" @click="closeMenus" class="mobile-only-item">
                        🕹️ {{ t('navbar.play') }}
                    </router-link>
                    
                    <div class="mobile-only-item lang-mobile-section">
                        <div class="lang-grid">
                            <button v-for="lang in languages" :key="lang.code" 
                                    @click="setLocale(lang.code)"
                                    :class="{ 'active-lang': locale === lang.code }">
                                {{ lang.code.toUpperCase() }}
                            </button>
                        </div>
                    </div>

                    <!-- ÜBERSETZTE MENÜ-PUNKTE -->
                    <router-link to="/leaderboard" @click="closeMenus">{{ t('navbar.leaderboard') }}</router-link>
                    <router-link to="/stats" @click="closeMenus">{{ t('navbar.stats') }}</router-link>
                    <router-link to="/profile" @click="closeMenus">{{ t('navbar.profile') }}</router-link>
                    
                    <router-link to="/info" @click="closeMenus" class="mobile-only-item">
                        {{ t('navbar.info') }}
                    </router-link>
                    
                    <div class="dropdown-divider"></div>
                    <button @click="handleLogout" class="logout-link">
                        {{ t('navbar.logout') }}
                    </button>
                </div>
            </div>
        </template>
    </div>

    <!-- ANIMATIONS-LAYER -->
    <transition name="global-fly">
        <div v-if="scoreFeedback" :key="'score' + scoreFeedback.id" class="global-score-flyer" :class="scoreFeedback.type">
            {{ scoreFeedback.text }}
        </div>
    </transition>

    <transition name="streak-fly">
        <div v-if="streakFeedback" :key="'streak' + streakFeedback.id" class="streak-flyer">
            🔥 {{ streakFeedback.count }}{{ t('navbar.streakSuffix') }}
        </div>
    </transition>
  </nav>
</template>


<style scoped>
/* DEIN ORIGINALES CSS */
.navbar { display: flex; justify-content: space-between; align-items: center; height: 65px; padding: 0 1.5rem; background-color: var(--card-bg, #edc531); border-bottom: 3px solid #000; position: sticky; top: 0; z-index: 3000; }
.navbar-logo { text-decoration: none; display: flex; align-items: center; color: #000; font-weight: 900; font-size: 1.3rem; text-transform: uppercase; }
.logo-image { max-height: 2.2rem; margin-right: 0.5rem; }
.navbar-center { position: absolute; left: 50%; transform: translateX(-50%); z-index: 3000; }
.score-pill { background: #fff; border: 2px solid #000; padding: 0.3rem 0.8rem; font-weight: 900; box-shadow: 3px 3px 0 #000; display: flex; gap: 0.5rem; }
.navbar-right { display: flex; align-items: center; gap: 0.8rem; z-index: 3001; }

.navbar-button { 
    background-color: #000; color: #fff; border: 2px solid #000;
    font-size: 0.85rem; font-weight: 700; padding: 0.5rem 0.8rem; 
    text-decoration: none; text-transform: uppercase; cursor: pointer; 
    transition: all 0.1s; 
}
.navbar-button:hover { background: #fff; color: #000; transform: translate(-2px, -2px); box-shadow: 3px 3px 0 #000; }
.play-btn { background-color: #fff; color: #000; box-shadow: 3px 3px 0 #000; }
.play-btn:hover { background-color: #000; color: #fff; }

.dropdown-container { position: relative; }
.neo-dropdown { 
    position: absolute; top: calc(100% + 10px); right: 0; 
    background: #fff; border: 3px solid #000; box-shadow: 6px 6px 0 #000; 
    min-width: 200px; display: flex; flex-direction: column; 
}
.neo-dropdown a, .neo-dropdown button { 
    padding: 0.8rem 1rem; text-decoration: none; color: #000; 
    font-weight: 700; text-align: left; border: none; background: none; 
    border-bottom: 2px solid #000; cursor: pointer; text-transform: uppercase;
}
.neo-dropdown a:hover { background: var(--card-bg); }
.dropdown-divider { height: 4px; background: #000; }
.logout-link { color: #ff3333 !important; border-bottom: none !important; }

/* ERGÄNZUNGEN FÜR SPRACHE */
.lang-btn { background-color: #fff; color: #000; min-width: 60px; }
.lang-dropdown { min-width: 140px; }

.lang-mobile-section {
    background: #f0f0f0;
    padding: 0.5rem;
    border-bottom: 2px solid #000;
}

.lang-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 4px;
}

.lang-grid button {
    padding: 6px 0 !important;
    text-align: center !important;
    font-size: 0.7rem !important;
    border: 2px solid #000 !important;
    background: #fff !important;
}

.lang-grid button.active-lang {
    background: var(--card-bg) !important;
}

/* ANIMATIONS-ELEMENTE */
.global-score-flyer, .streak-flyer { position: fixed; left: 50%; transform: translate(-50%, -50%); z-index: 9999; font-weight: 900; pointer-events: none; text-transform: uppercase; color: #fff; -webkit-text-stroke: 2px #000; filter: drop-shadow(4px 4px 0px #000); opacity: 0; }
.global-score-flyer { top: 50%; font-size: 5rem; }
.streak-flyer { top: 60%; font-size: 3.5rem; color: #ffaa00; margin-top: 20px; }
.global-score-flyer.positive { color: #00ff00; }
.global-score-flyer.negative { color: #ff3333; }
.global-fly-enter-active { animation: master-fly 1.2s forwards cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.streak-fly-enter-active { animation: streak-fly 1.2s forwards cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.global-fly-leave-active, .streak-fly-leave-active { opacity: 0 !important; transition: none !important; }

@keyframes master-fly { 0% { opacity: 0; transform: translate(-50%, -50%) scale(0.3); } 20% { opacity: 1; transform: translate(-50%, -50%) scale(1.3); } 100% { opacity: 0; transform: translate(-50%, -55vh) scale(0.4); } }
@keyframes streak-fly { 0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); } 20% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); } 100% { opacity: 0; transform: translate(100px, -60vh) scale(0.5); } }

.pill-bounce { animation: pill-hit 0.3s ease-out 0.9s; }
@keyframes pill-hit { 50% { transform: scale(1.3); } }

/* RESPONSIVE LOGIK */
.mobile-only-item { display: none; }

@media (max-width: 850px) {
    .desktop-only { display: none; }
    .mobile-only-item { display: block; }
    .logo-text { display: none; }
    .navbar-center { left: 45%; }
}
</style>