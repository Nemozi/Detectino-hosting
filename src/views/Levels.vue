<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '@/lib/supabaseClient.js';
import { useRouter } from 'vue-router';
import { useTranslation } from '@/composables/useTranslation.js'; // NEU

const router = useRouter();
const { t } = useTranslation(); // NEU
const loading = ref(true);
const completedLevels = ref([]); 

const levels = [
    { id: 1, route: "/test-user-level" }, 
    { id: 2, route: "/level1" },
    { id: 3, route: "/level2" },
    { id: 4, route: "/level3" },
    { id: 5, route: "/level4" }, 
    { id: 6, route: "/level5" },
    { id: 7, route: "/etappen-quiz" },
    { id: 8, route: "/level8" }, 
    { id: 9, route: "/level9" }
];

onMounted(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return router.push('/login');

    const { data } = await supabase
        .from('level_fortschritt')
        .select('level_id')
        .eq('user_id', user.id);

    if (data) {
        completedLevels.value = data.map(entry => Number(entry.level_id));
    }
    loading.value = false;
});

const openLevel = (levelId, route) => {
    const id = Number(levelId);
    const isUnlocked = id === 1 || completedLevels.value.includes(id - 1);
    if (isUnlocked) router.push(route);
};

const getStatusClass = (id) => {
    const numId = Number(id);
    if (completedLevels.value.includes(numId)) return 'completed';
    if (numId === 1 || completedLevels.value.includes(numId - 1)) return 'active';
    return 'locked';
};
</script>

<template>
    <div class="content-wrapper">
        <div class="roadmap-card">
            <h1>{{ t('levels.mainTitle') }}</h1>
            
            <div v-if="loading" class="loading-inline">{{ t('levels.loading') }}</div>
            
            <div v-else class="timeline">
                <div v-for="level in levels" :key="level.id" 
                     class="level-node" :class="getStatusClass(level.id)"
                     @click="openLevel(level.id, level.route)">
                    <div class="circle">
                        <span v-if="completedLevels.includes(Number(level.id))">✓</span>
                        <span v-else-if="getStatusClass(level.id) === 'locked'">🔒</span>
                        <span v-else>{{ level.id }}</span>
                    </div>
                    <!-- Dynamische Übersetzung basierend auf der Level-ID -->
                    <span class="level-title">{{ t('levels.level_' + level.id) }}</span>
                </div>
                <div class="line"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* DEIN CSS BLEIBT IDENTISCH */
.loading-inline { text-align: center; font-weight: 800; text-transform: uppercase; padding: 2rem; }
.roadmap-card { background: var(--card-bg, #edc531); border: 0.0625rem solid #1a1a1a; box-shadow: 0.375rem 0.375rem 0 rgba(0,0,0,1); padding: 2rem; width: 100%; max-width: 30rem; position: relative; }
h1 { text-align: center; text-transform: uppercase; border-bottom: 2px solid #000; padding-bottom: 1rem; }
.timeline { display: flex; flex-direction: column; align-items: center; gap: 2rem; position: relative; margin-top: 2rem; }
.line { position: absolute; top: 20px; bottom: 20px; width: 4px; background: #000; z-index: 0; }
.level-node { z-index: 1; display: flex; flex-direction: column; align-items: center; cursor: pointer; transition: transform 0.2s; background: var(--card-bg); padding: 10px; }
.level-node:hover:not(.locked) { transform: scale(1.1); }
.circle { width: 60px; height: 60px; border-radius: 50%; border: 3px solid #000; display: flex; justify-content: center; align-items: center; font-weight: 800; font-size: 1.5rem; background: #fff; box-shadow: 4px 4px 0 rgba(0,0,0,1); }
.level-title { margin-top: 0.5rem; font-weight: 700; text-transform: uppercase; font-size: 0.9rem; background: #fff; padding: 2px 5px; border: 1px solid #000; }
.completed .circle { background: #d4d4d4; color: #555; box-shadow: none; }
.completed .level-title { opacity: 0.7; }
.active .circle { background: #ff4757; color: #fff; animation: pulse 2s infinite; }
.locked { cursor: not-allowed; opacity: 0.6; }
.locked .circle { background: #555; color: #aaa; border-color: #333; }
@keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(255, 71, 87, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(255, 71, 87, 0); } 100% { box-shadow: 0 0 0 0 rgba(255, 71, 87, 0); } }
</style>