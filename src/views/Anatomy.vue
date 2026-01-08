<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js';
import { useGameState } from '@/composables/useGameState.js'; 
import { useUnsplash } from '@/composables/useUnsplash.js';

// Komponenten
import spotTheFake from '@/components/game/spotTheFake.vue';
import analysis from '@/components/game/analysis.vue';
import singleChoice from '@/components/game/singleChoice.vue';

const router = useRouter();
const { t, detectLanguage } = useTranslation();
const { handleScoreAction, markLevelAsCompleted } = useGameState();
const { fetchRandomRealImages } = useUnsplash();

const currentStep = ref(0);
const totalSteps = 10; 
const isDataLoaded = ref(false);
const gameFinished = ref(false);
const realImagesStep1 = ref([]);
const username = ref('');
const userId = ref(null);

// --- COUNTDOWN LOGIK ---
const searchCountdown = ref(10);
const solutionUnlocked = ref(false);
let timer = null;

// --- PRELOAD ASSETS LISTE ---
const aiAssets = [
    { name: 'Image_0004.jpg', bucket: 'Fake-Images' },
    { name: 'Heatmap_0004.png', bucket: 'Heatmaps' },
    { name: 'Image_0011.jpg', bucket: 'Fake-best-Images' },
    { name: 'Heatmap_0011.png', bucket: 'Heatmaps-best' },
    { name: 'Image_0012.jpg', bucket: 'Fake-best-Images' },
    { name: 'Heatmap_0012.png', bucket: 'Heatmaps-best' },
    { name: 'Image_0048.jpg', bucket: 'Fake-Images' },
    { name: 'Heatmap_0048.png', bucket: 'Heatmaps' },
    { name: 'Image_0067.jpg', bucket: 'Fake-Images' },
    { name: 'Heatmap_0067.png', bucket: 'Heatmaps' },
    { name: 'Image_0063.jpg', bucket: 'Fake-Images' },
    { name: 'Heatmap_0063.png', bucket: 'Heatmaps' },
    { name: 'Image_0002.jpg', bucket: 'Fake-Images' },
    { name: 'Heatmap_0002.png', bucket: 'Heatmaps' }
];

const preloadAllAssets = (urls) => {
    return Promise.all(urls.map(url => new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
        img.onerror = resolve; 
    })));
};

/* ---------- INITIALISIERUNG ---------- */
onMounted(async () => {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return router.push('/login');
        userId.value = user.id;

        // 1. Username für Logging
        const { data: profile } = await supabase.from('spielerprofile').select('username').eq('user_id', user.id).maybeSingle();
        username.value = profile?.username || user.email.split('@')[0];

        // 2. Unsplash Vergleichsbilder laden
        const unsplashImages = await fetchRandomRealImages(3, 'portrait');
        realImagesStep1.value = unsplashImages;

        // 3. Alle URLs sammeln
        const urlsToPreload = [...unsplashImages.map(img => img.src)];
        aiAssets.forEach(asset => {
            const { data } = supabase.storage.from(asset.bucket).getPublicUrl(asset.name);
            urlsToPreload.push(data.publicUrl);
        });

        // 4. Warten bis ALLES geladen ist
        await preloadAllAssets(urlsToPreload);

    } catch (e) {
        console.warn("Preload Fehler", e);
    } finally {
        isDataLoaded.value = true;
        detectLanguage();
    }
});

/* ---------- GAME LOGIK ---------- */

const startSearchTimer = () => {
    searchCountdown.value = 10;
    solutionUnlocked.value = false;
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
        if (searchCountdown.value > 0) searchCountdown.value--;
        else {
            solutionUnlocked.value = true;
            clearInterval(timer);
        }
    }, 1000);
};

const getDynamicTitle = (standardQuestion) => {
    if (!solutionUnlocked.value) return `🔎 SUCHE ALLE FEHLER... (${searchCountdown.value}s)`;
    return `LÖSUNG FREI! ${standardQuestion}`;
};

const nextStep = () => {
    currentStep.value++;
    window.scrollTo(0, 0);
    const combinedSearchSteps = [3, 4, 5, 6, 8];
    if (combinedSearchSteps.includes(currentStep.value)) {
        startSearchTimer();
    }
};

const handleSelfCheckResult = (choice) => {
    // Logging (Fire and Forget)
    if (userId.value) {
        supabase.from('spiel_aktivitaeten').insert({
            user_id: userId.value,
            level_id: 6,
            step_id: currentStep.value,
            task_type: 'anatomy_self_assessment',
            is_correct: choice === 'yes',
            interaction_type: `Username: ${username.value}`
        });
    }
    nextStep();
};

const finishLevel = async () => {
    if (userId.value) {
        await supabase.from('level_fortschritt').upsert({ 
            user_id: userId.value, level_id: 6, score: 100 
        }, { onConflict: 'user_id,level_id' });
        markLevelAsCompleted(6);
    }
    gameFinished.value = true;
};

const getLockedImageStack = (baseImg, heatmapImg, bucket = 'Fake-best-Images') => {
    const stack = [{ src: baseImg, bucket: bucket }];
    if (solutionUnlocked.value) {
        const heatmapBucket = bucket.includes('best') ? 'Heatmaps-best' : 'Heatmaps';
        stack.push({ src: heatmapImg, bucket: heatmapBucket });
    }
    return stack;
};

const goBackToMap = () => router.push('/levels');
</script>

<template>
    <div class="content-wrapper">
        <!-- Zentraler Ladescreen (wartet auf Preload) -->
        <div v-if="!isDataLoaded" class="loading-screen">
            <div class="loader-spinner"></div>
            <p>Bilder werden synchronisiert...</p>
        </div>
        
        <div v-else class="level-container">
            <template v-if="!gameFinished">
                <div class="level-header-title">Level 6: Bildfehler erkennen</div>
                <div class="level-progress-bar">
                    <span>Schritt {{ currentStep + 1 }} / {{ totalSteps }}</span>
                    <div class="progress-track"><div class="progress-fill" :style="{ width: ((currentStep + 1) / totalSteps * 100) + '%' }"></div></div>
                </div>
            </template>

            <template v-if="!gameFinished">
                <!-- SCHRITTE 0 - 2 (Einführung) -->
                <analysis v-if="currentStep === 0" :title="t('level5.step0.title')" :text="t('level5.step0.text')" @next="nextStep" />
                <spotTheFake v-else-if="currentStep === 1" :levelId="6" :aiImage="{ src: 'Image_0004.jpg', bucket: 'Fake-Images' }" :realImages="realImagesStep1" :questionText="t('level5.step1.question')" @completed="nextStep" />
                <analysis v-else-if="currentStep === 2" :image="[{ src: 'Image_0004.jpg', bucket: 'Fake-Images' }, { src: 'Heatmap_0004.png', bucket: 'Heatmaps' }]" :title="t('level5.step2.title')" :text="t('level5.step2.text')" @next="nextStep" />

                <!-- KOMBINIERTE SUCHE (isLocked verhindert Klicks während Timer läuft) -->
                <singleChoice
                    v-else-if="currentStep === 3"
                    :isSurvey="true" 
                    :isLocked="!solutionUnlocked"
                    :image="getLockedImageStack('Image_0011.jpg', 'Heatmap_0011.png')"
                    :question="getDynamicTitle(t('level5.check_question'))"
                    :options="[{id:'yes', text:t('level5.options.yes')}, {id:'no', text:t('level5.options.no')}]"
                    @completed="handleSelfCheckResult"
                />
                <singleChoice
                    v-else-if="currentStep === 4"
                    :isSurvey="true" 
                    :isLocked="!solutionUnlocked"
                    :image="getLockedImageStack('Image_0012.jpg', 'Heatmap_0012.png')"
                    :question="getDynamicTitle(t('level5.check_question'))"
                    :options="[{id:'yes', text:t('level5.options.yes')}, {id:'no', text:t('level5.options.no')}]"
                    @completed="handleSelfCheckResult"
                />
                <singleChoice
                    v-else-if="currentStep === 5"
                    :isSurvey="true" 
                    :isLocked="!solutionUnlocked"
                    :image="getLockedImageStack('Image_0035.jpg', 'Heatmap_0035.png', 'Fake-Images')"
                    :question="getDynamicTitle(t('level5.check_question'))"
                    :options="[{id:'yes', text:t('level5.options.yes')}, {id:'no', text:t('level5.options.no')}]"
                    @completed="handleSelfCheckResult"
                />
                <singleChoice
                    v-else-if="currentStep === 6"
                    :isSurvey="true" 
                    :isLocked="!solutionUnlocked"
                    :image="getLockedImageStack('Image_0067.jpg', 'Heatmap_0067.png', 'Fake-Images')"
                    :question="getDynamicTitle(t('level5.check_question'))"
                    :options="[{id:'yes', text:t('level5.options.yes')}, {id:'no', text:t('level5.options.no')}]"
                    @completed="handleSelfCheckResult"
                />

                <analysis v-else-if="currentStep === 7" :image="[{ src: 'Image_0063.jpg', bucket: 'Fake-Images' }, { src: 'Heatmap_0063.png', bucket: 'Heatmaps' }]" :title="t('level5.asymmetry.title')" :text="t('level5.asymmetry.text')" @next="nextStep" />

                <singleChoice
                    v-else-if="currentStep === 8"
                    :isSurvey="true" 
                    :isLocked="!solutionUnlocked"
                    :image="getLockedImageStack('Image_0014.jpg', 'Heatmap_0014.png', 'Fake-best-Images')"
                    :question="getDynamicTitle(t('level5.check_question'))"
                    :options="[{id:'yes', text:t('level5.options.yes')}, {id:'no', text:t('level5.options.no')}]"
                    @completed="handleSelfCheckResult"
                />

                <analysis v-else-if="currentStep === 9" :image="['Image_0004.jpg', 'Image_0063.jpg']" :title="t('level5.finish.title')" :text="t('level5.finish.text')" buttonText="Level abschließen" @next="finishLevel" />
            </template>

            <!-- ERGEBNIS-BILDSCHIRM -->
            <div v-if="gameFinished" class="neo-card result-card" style="text-align:center;">
                <h2 class="neo-title">Level abgeschlossen!</h2>
                <button class="neo-btn" @click="goBackToMap">Zurück zur Map</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.result-card { padding: 3rem; display: flex; flex-direction: column; gap: 1.5rem; }
</style>