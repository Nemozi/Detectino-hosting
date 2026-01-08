<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js';
import { useGameState } from '@/composables/useGameState.js'; 

// Komponenten
import spotTheFake from '@/components/game/spotTheFake.vue';
import analysis from '@/components/game/analysis.vue';
import singleChoice from '@/components/game/singleChoice.vue';

const router = useRouter();
const { t, detectLanguage } = useTranslation();
const { handleScoreAction, markLevelAsCompleted } = useGameState();

const currentStep = ref(0);
const totalSteps = 10; 
const isDataLoaded = ref(false);
const gameFinished = ref(false);
const realImagesStep1 = ref([]);
const username = ref('');

// Countdown Logik für die Fehlersuche
const searchCountdown = ref(10);
const solutionUnlocked = ref(false);
let timer = null;
const goBackToMap = () => router.push('/levels');

const startSearchTimer = () => {
    searchCountdown.value = 10;
    solutionUnlocked.value = false;
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
        if (searchCountdown.value > 0) {
            searchCountdown.value--;
        } else {
            solutionUnlocked.value = true;
            clearInterval(timer);
        }
    }, 1000);
};

// --- LOGGING ---
const logActivity = async (payload) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    try {
        await supabase.from('spiel_aktivitaeten').insert({
            user_id: user.id,
            level_id: 6, 
            step_id: currentStep.value,
            task_type: payload.taskType || 'anatomy_check',
            image_name: payload.imageName || null,
            is_correct: payload.isCorrect ?? true,
            interaction_type: `User: ${username.value}`
        });
    } catch (e) { console.error("Logging failed", e); }
};

onMounted(async () => {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return router.push('/login');

        const { data: profile } = await supabase.from('spielerprofile').select('username').eq('user_id', user.id).single();
        username.value = profile?.username || user.email.split('@')[0];

        const { data: storageData } = await supabase.storage.from('Real-Images').list();
        if (storageData) {
            const allReal = storageData.filter(f => f.name.toLowerCase().match(/\.(jpg|png|jpeg)$/)).map(f => f.name);
            realImagesStep1.value = allReal.sort(() => 0.5 - Math.random()).slice(0, 3);
        }
    } catch (e) { console.warn("Storage fallbacks used"); }
    
    isDataLoaded.value = true;
    detectLanguage();
});

const nextStep = () => {
    currentStep.value++;
    window.scrollTo(0, 0);
    
    // Timer starten für die kombinierten Such-Schritte (3, 4, 5, 6, 8)
    const combinedSearchSteps = [3, 4, 5, 6, 8];
    if (combinedSearchSteps.includes(currentStep.value)) {
        startSearchTimer();
    }
};

const handleSelfCheckResult = (choice) => {
    logActivity({ taskType: 'self_assessment', isCorrect: choice === 'yes' });
    nextStep();
};

const finishLevel = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        await supabase.from('level_fortschritt').upsert({ 
            user_id: user.id, level_id: 6, score: 100 
        }, { onConflict: 'user_id,level_id' });
        markLevelAsCompleted(6);
    }
    gameFinished.value = true;
};

// Helper um Bilder-Stack zu bauen: Heatmap erscheint erst nach 10s
const getLockedImageStack = (baseImg, heatmapImg, bucket = 'Fake-best-Images') => {
    const stack = [{ src: baseImg, bucket: bucket }];
    if (solutionUnlocked.value) {
        const heatmapBucket = bucket.includes('best') ? 'Heatmaps-best' : 'Heatmaps';
        stack.push({ src: heatmapImg, bucket: heatmapBucket });
    }
    return stack;
};
</script>

<template>
    <div class="content-wrapper">
        <div v-if="!isDataLoaded" class="loading-screen"><div class="loader-spinner"></div></div>
        
        <div v-else class="level-container">
            <template v-if="!gameFinished">
                <div class="level-header-title">Level 6: Bildfehler erkennen</div>
                <div class="level-progress-bar">
                    <span>Schritt {{ currentStep + 1 }} / {{ totalSteps }}</span>
                    <div class="progress-track"><div class="progress-fill" :style="{ width: ((currentStep + 1) / totalSteps * 100) + '%' }"></div></div>
                </div>
            </template>

            <template v-if="!gameFinished">
                <!-- SCHRITTE 0 - 2 (Standard Intro & Game) -->
                <analysis v-if="currentStep === 0" :title="t('level5.step0.title')" :text="t('level5.step0.text')" @next="nextStep" />
                <spotTheFake v-else-if="currentStep === 1" :levelId="6" :aiImage="{ src: 'Image_0004.jpg', bucket: 'Fake-Images' }" :questionText="t('level5.step1.question')" @completed="nextStep" />
                <analysis v-else-if="currentStep === 2" :image="[{ src: 'Image_0004.jpg', bucket: 'Fake-Images' }, { src: 'Heatmap_0004.png', bucket: 'Heatmaps' }]" :title="t('level5.step2.title')" :text="t('level5.step2.text')" @next="nextStep" />

                <!-- KOMBINIERTE SUCH-SCHRITTE (3, 4, 5, 6, 8) -->
                <div v-else-if="[3,4,5,6,8].includes(currentStep)" class="search-step-wrapper">
                    <!-- Banner über dem Bild (keine Überlappung mehr) -->
                    <div class="info-status-banner" :class="{ 'unlocked': solutionUnlocked }">
                        <span v-if="!solutionUnlocked">🔎 Suche alle Fehler! Lösung kommt in {{ searchCountdown }}s</span>
                        <span v-else> Du hast die Lösung freigeschaltet! Swipe zum Vergleichen.</span>
                    </div>

                    <singleChoice
                        v-if="currentStep === 3"
                        :isSurvey="true" 
                        :image="getLockedImageStack('Image_0011.jpg', 'Heatmap_0011.png')"
                        :question="t('level5.check_question')"
                        :options="[{id:'yes', text:t('level5.options.yes')}, {id:'no', text:t('level5.options.no')}]"
                        @completed="handleSelfCheckResult"
                    />
                    <singleChoice
                        v-else-if="currentStep === 4"
                        :isSurvey="true" 
                        :image="getLockedImageStack('Image_0012.jpg', 'Heatmap_0012.png')"
                        :question="t('level5.check_question')"
                        :options="[{id:'yes', text:t('level5.options.yes')}, {id:'no', text:t('level5.options.no')}]"
                        @completed="handleSelfCheckResult"
                    />
                    <singleChoice
                        v-else-if="currentStep === 5"
                        :isSurvey="true" 
                        :image="getLockedImageStack('Image_0048.jpg', 'Heatmap_0048.png', 'Fake-Images')"
                        :question="t('level5.check_question')"
                        :options="[{id:'yes', text:t('level5.options.yes')}, {id:'no', text:t('level5.options.no')}]"
                        @completed="handleSelfCheckResult"
                    />
                    <singleChoice
                        v-else-if="currentStep === 6"
                        :isSurvey="true" 
                        :image="getLockedImageStack('Image_0067.jpg', 'Heatmap_0067.png', 'Fake-Images')"
                        :question="t('level5.check_question')"
                        :options="[{id:'yes', text:t('level5.options.yes')}, {id:'no', text:t('level5.options.no')}]"
                        @completed="handleSelfCheckResult"
                    />
                    <singleChoice
                        v-else-if="currentStep === 8"
                        :isSurvey="true" 
                        :image="getLockedImageStack('Image_0002.jpg', 'Heatmap_0002.png', 'Fake-Images')"
                        :question="t('level5.check_question')"
                        :options="[{id:'yes', text:t('level5.options.yes')}, {id:'no', text:t('level5.options.no')}]"
                        @completed="handleSelfCheckResult"
                    />
                </div>

                <!-- SCHRITT 7: Asymmetrie -->
                <analysis v-else-if="currentStep === 7" :image="[{ src: 'Image_0063.jpg', bucket: 'Fake-Images' }, { src: 'Heatmap_0063.png', bucket: 'Heatmaps' }]" :title="t('level5.asymmetry.title')" :text="t('level5.asymmetry.text')" @next="nextStep" />

                <!-- SCHRITT 9: Abschluss -->
                <analysis v-else-if="currentStep === 9" :image="['Image_0004.jpg', 'Image_0063.jpg']" :title="t('level5.finish.title')" :text="t('level5.finish.text')" buttonText="Level abschließen" @next="finishLevel" />
            </template>

            <!-- ERGEBNIS-KARTE -->
            <div v-if="gameFinished" class="neo-card result-card" style="text-align:center;">
                <h2 class="neo-title">Abgeschlossen!</h2>
                <button class="neo-btn" @click="goBackToMap">Zurück zur Map</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.search-step-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.info-status-banner {
    background: #000;
    color: #edc531;
    padding: 1rem;
    text-align: center;
    font-weight: 900;
    border: 3px solid #000;
    text-transform: uppercase;
    font-size: 0.9rem;
    box-shadow: 4px 4px 0 #fff;
    transition: all 0.3s;
}

.info-status-banner.unlocked {
    background: #00aa00;
    color: #fff;
    box-shadow: 4px 4px 0 #000;
}

.result-card { padding: 3rem; display: flex; flex-direction: column; gap: 1.5rem; }
</style>