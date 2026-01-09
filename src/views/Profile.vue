<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js'; // NEU

const router = useRouter();
const { t } = useTranslation(); // NEU
const loading = ref(true);
const profileData = ref(null);
const email = ref('');

const displayName = computed(() => {
    if (profileData.value?.username) return profileData.value.username;
    return email.value ? email.value.split('@')[0] : t('profile.fallbackName');
});

onMounted(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        router.push('/login');
        return;
    }
    email.value = user.email;
    const { data } = await supabase
        .from('spielerprofile')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

    if (data) profileData.value = data;
    loading.value = false;
});

const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
};
</script>

<template>
    <div class="content-wrapper">
        <div class="neo-card profile-card">
            <h1 class="neo-title">{{ t('profile.title') }}</h1>
            
            <div v-if="loading" class="loading-state">{{ t('profile.loading') }}</div>
            
            <div v-else class="profile-inner">
                <div class="user-header">
                    <div class="user-meta">
                        <span class="meta-label">{{ t('profile.loggedAs') }}</span>
                        <div class="user-name-title">{{ displayName }}</div>
                    </div>
                </div>

                <div class="email-info">
                   <span class="label">{{ t('profile.emailLabel') }}:</span> {{ email }}
                </div>
                
                <div v-if="profileData" class="stats-row">
                    <div class="stat-box">
                        <span class="s-label">{{ t('profile.stats.age') }}</span>
                        <span class="s-val">{{ profileData.alter }}</span>
                    </div>
                    <div class="stat-box">
                        <span class="s-label">{{ t('profile.stats.internet') }}</span>
                        <span class="s-val">{{ profileData.internet_affinitaet }}</span>
                    </div>
                    <div class="stat-box dark">
                        <span class="s-label">{{ t('profile.stats.skill') }}</span>
                        <span class="s-val">{{ profileData.erkennung_skill }}%</span>
                    </div>
                </div>

                <div class="profile-actions">
                    <router-link to="/stats" class="neo-btn stats-action-btn">
                        📊 {{ t('profile.actions.viewStats') }}
                    </router-link>

                    <button @click="handleLogout" class="neo-btn logout-action-btn">
                        {{ t('profile.actions.logout') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Karte & Layout */
.profile-card {
    max-width: 32rem; /* Begrenzt die gesamte Karte */
    margin: 0 auto;
    box-sizing: border-box;
}

.profile-inner {
    display: flex;
    flex-direction: column;
    gap: 1.5rem; /* Sauberer Abstand zwischen allen Elementen */
}

/* Header */
.user-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: #fff;
    padding: 1rem;
    border: 2px solid #000;
}
.meta-label { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; opacity: 0.6; }
.user-name-title { font-size: 1.3rem; font-weight: 900; text-transform: uppercase; }

.email-info {
    font-weight: 700;
    border-bottom: 2px dashed rgba(0,0,0,0.2);
    padding-bottom: 0.5rem;
}

/* Stats Row */
.stats-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
}
.stat-box {
    background: #fff;
    border: 2px solid #000;
    padding: 0.75rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    box-shadow: 2px 2px 0 #000;
}
.stat-box.dark { background: #000; color: #fff; }
.s-label { font-size: 0.6rem; font-weight: 800; text-transform: uppercase; }
.s-val { font-size: 1.1rem; font-weight: 900; }

/* --- BUTTONS: UNTEREINANDER & BEGRENZTE BREITE --- */
.profile-actions {
    display: flex;
    flex-direction: column; /* Stapeln */
    gap: 1.2rem; /* VIEL Abstand zwischen den Knöpfen gegen Überlappen */
    align-items: center; /* Zentriert die Knöpfe */
    width: 100%;
    margin-top: 1rem;
}

.neo-btn {
    width: 100%;
    max-width: 100%; 
    padding: 0.9rem;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 4px 4px 0 #000;
    border: 2px solid #000;
    box-sizing: border-box; /* Wichtig gegen Überlappen */
}

.stats-action-btn {
    background: #fff;
    color: #000;
}

.logout-action-btn {
    background: #ff4444;
    color: #fff;
}

.neo-btn:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 #000;
}

.neo-btn:active {
    transform: translate(0,0);
}

@media (max-width: 480px) {
    .stats-row { grid-template-columns: 1fr; }
    .neo-btn { max-width: 100%; } /* Auf Mini-Handys doch volle Breite */
}
</style>    