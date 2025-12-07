<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '@/lib/supabaseClient.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const loading = ref(true);
const completedLevels = ref([]); 

// ID 1 ist der Start. ID 2 braucht ID 1 erledigt, etc.
const levels = [
    { id: 1, title: "Einstufungstest", route: "/test-user-level" }, 
    { id: 2, title: "Hintergründe", route: "/level1" },
    { id: 3, title: "Haut", route: "/level2" },
    { id: 4, title: "Farben", route: "/level3" },
    { id: 5, title: "Gesichtsausdrücke", route: "/level4" }, 
    { id: 6, title: "Anatomie", route: "/level5" },
    { id: 7, title: "Was kannst du schon?", route: "/EtappenQuiz" },
    { id: 8, title: "Moderne KIs", route: "/moderne-ki" },
    { id: 9, title: "Finales Quiz", route: "/FinalesQuiz" }
];

onMounted(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return router.push('/login');

    const { data } = await supabase.from('level_fortschritt').select('level_id');
    if (data) {
        completedLevels.value = data.map(entry => entry.level_id);
        console.log("Fertige Levels:", completedLevels.value);
    }
    loading.value = false;
});

const openLevel = (levelId, route) => {
    // Level 1 (Test) ist immer offen.
    // Alle anderen brauchen den Vorgänger (ID - 1).
    const isUnlocked = levelId === 1 || completedLevels.value.includes(levelId - 1);
    
    if (isUnlocked) {
        router.push(route);
    }
};

const getStatusClass = (id) => {
    if (completedLevels.value.includes(id)) return 'completed';
    if (id === 1 || completedLevels.value.includes(id - 1)) return 'active';
    return 'locked';
};
</script>

<template>
    <div class="content-wrapper">
        <div class="roadmap-card">
            <h1>Deine Reise</h1>
            <div v-if="loading">Lade Map...</div>
            <div v-else class="timeline">
                <div v-for="level in levels" :key="level.id" 
                     class="level-node" :class="getStatusClass(level.id)"
                     @click="openLevel(level.id, level.route)">
                    <div class="circle">
                        <span v-if="completedLevels.includes(level.id)">✓</span>
                        <span v-else-if="getStatusClass(level.id) === 'locked'">🔒</span>
                        <span v-else>{{ level.id }}</span>
                    </div>
                    <span class="level-title">{{ level.title }}</span>
                </div>
                <div class="line"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Dein CSS (unverändert lassen) */
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