<script setup>
import { ref, onMounted } from 'vue';
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
const totalSteps = 9; // 0 bis 8
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
    { name: 'Image_0014.jpg', bucket: 'Fake-best-Images' },
    { name: 'Heatmap_0014.png', bucket: 'Heatmaps-best' },
    { name: 'Image_0035.jpg', bucket: 'Fake-Images' },
    { name: 'Heatmap_0035.png', bucket: 'Heatmaps' },
    { name: 'Image_0067.jpg', bucket: 'Fake-Images' },
    { name: 'Heatmap_0067.png', bucket: 'Heatmaps' },
    { name: 'Image_0063.jpg', bucket: 'Fake-Images' },
    { name: 'Heatmap_0063.png', bucket: 'Heatmaps' }
];

const preloadAllAssets = (urls) => {
    return Promise.all(urls.map(url => new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
        img.onerror = resolve; 
    })));
};

onMounted(async () => {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return router.push('/login');
        userId.value = user.id;

        const { data: profile } = await supabase.from('spielerprofile').select('username').eq('user_id', user.id).maybeSingle();
        const emailName = user.email ? user.email.split('@')[0] : null;
        username.value = profile?.username || emailName || `Gast_${user.id.slice(0, 5)}`;

        const unsplashImages = await fetchRandomRealImages(3, 'portrait');
        realImagesStep1.value = unsplashImages;

        const urlsToPreload = [...unsplashImages.map(img => img.src)];
        aiAssets.forEach(asset => {
            const { data } = supabase.storage.from(asset.bucket).getPublicUrl(asset.name);
            urlsToPreload.push(data.publicUrl);
        });

        await preloadAllAssets(urlsToPreload);

    } catch (e) {
        console.warn("Preload Fehler", e);
    } finally {
        isDataLoaded.value = true;
        detectLanguage();
    }
});

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
    if (!solutionUnlocked.value) return `${t('level5.searching')} (${searchCountdown.value}s)`;
    return `${t('level5.unlocked')} ${standardQuestion}`;
};

const nextStep = () => {
    currentStep.value++;
    window.scrollTo(0, 0);
    const searchSteps = [3, 4, 5, 6];
    if (searchSteps.includes(currentStep.value)) {
        startSearchTimer();
    }
};

const handleSelfCheckResult = (choice) => {
    if (userId.value) {
        supabase.from('spiel_aktivitaeten').insert({
            user_id: userId.value, level_id: 6, step_id: currentStep.value,
            task_type: 'anatomy_self_assessment', is_correct: choice === 'yes', interaction_type: 'self_check'
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

const getLockedImageStack = (baseImg, heatmapImg, bucket) => {
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
        <div v-if="!isDataLoaded" class="loading-screen">
            <div class="loader-spinner"></div>
            <p>{{ t('level5.loading') }}</p>
        </div>
        
        <div v-else class="level-container">
            <template v-if="!gameFinished">
                <div class="level-header-title">{{ t('level5.title') }}</div>
                <div class="level-progress-bar">
                    <span>{{ t('generic.step') }} {{ currentStep + 1 }} / {{ totalSteps }}</span>
                    <div class="progress-track"><div class="progress-fill" :style="{ width: ((currentStep + 1) / totalSteps * 100) + '%' }"></div></div>
                </div>
            </template>

            <template v-if="!gameFinished">
                <analysis v-if="currentStep === 0" :title="t('level5.step0.title')" :text="t('level5.step0.text')" @next="nextStep" />
                
                <spotTheFake v-else-if="currentStep === 1" :levelId="6" :aiImage="{ src: 'Image_0004.jpg', bucket: 'Fake-Images' }" :realImages="realImagesStep1" :questionText="t('level5.step1.question')" @completed="nextStep" />
                
                <analysis v-else-if="currentStep === 2" :image="[{ src: 'Image_0004.jpg', bucket: 'Fake-Images' }, { src: 'Heatmap_0004.png', bucket: 'Heatmaps' }]" :title="t('level5.step2.title')" :text="t('level5.step2.text')" @next="nextStep" />

                <singleChoice
                    v-else-if="currentStep === 3"
                    :isSurvey="true" :isLocked="!solutionUnlocked"
                    :image="getLockedImageStack('Image_0011.jpg', 'Heatmap_0011.png', 'Fake-Images')"
                    :question="getDynamicTitle(t('level5.check_question'))"
                    :options="[{id:'yes', text:t('level5.options.yes')}, {id:'no', text:t('level5.options.no')}]"
                    @completed="handleSelfCheckResult"
                />

                <singleChoice
                    v-else-if="currentStep === 4"
                    :isSurvey="true" :isLocked="!solutionUnlocked"
                    :image="getLockedImageStack('Image_0014.jpg', 'Heatmap_0014.png', 'Fake-best-Images')"
                    :question="getDynamicTitle(t('level5.check_question'))"
                    :options="[{id:'yes', text:t('level5.options.yes')}, {id:'no', text:t('level5.options.no')}]"
                    @completed="handleSelfCheckResult"
                />

                <singleChoice
                    v-else-if="currentStep === 5"
                    :isSurvey="true" :isLocked="!solutionUnlocked"
                    :image="getLockedImageStack('Image_0035.jpg', 'Heatmap_0035.png', 'Fake-Images')"
                    :question="getDynamicTitle(t('level5.check_question'))"
                    :options="[{id:'yes', text:t('level5.options.yes')}, {id:'no', text:t('level5.options.no')}]"
                    @completed="handleSelfCheckResult"
                />
                <singleChoice
                    v-else-if="currentStep === 6"
                    :isSurvey="true" :isLocked="!solutionUnlocked"
                    :image="getLockedImageStack('Image_0067.jpg', 'Heatmap_0067.png', 'Fake-Images')"
                    :question="getDynamicTitle(t('level5.check_question'))"
                    :options="[{id:'yes', text:t('level5.options.yes')}, {id:'no', text:t('level5.options.no')}]"
                    @completed="handleSelfCheckResult"
                />

                <analysis v-else-if="currentStep === 7" :image="[{ src: 'Image_0063.jpg', bucket: 'Fake-Images' }, { src: 'Heatmap_0063.png', bucket: 'Heatmaps' }]" :title="t('level5.asymmetry.title')" :text="t('level5.asymmetry.text')" @next="nextStep" />

                <analysis v-else-if="currentStep === 8" :image="[{ src: 'Image_0004.jpg', bucket: 'Fake-Images' }, { src: 'Image_0063.jpg', bucket: 'Fake-Images' }]" :title="t('level5.finish.title')" :text="t('level5.finish.text')" :buttonText="t('generic.completeLevel')" @next="finishLevel" />

                <!-- DISCLAIMER: Erscheint bei Heatmap-Schritten oder wenn Lösung entsperrt ist -->
                <div v-if="[2, 3, 4, 5, 6, 7].includes(currentStep) && (solutionUnlocked || [2, 7].includes(currentStep))" class="heatmap-disclaimer">
                    <small>*{{ t('level5.disclaimer') }}</small>
                </div>
            </template>

            <div v-if="gameFinished" class="neo-card result-card" style="text-align:center;">
                <h2 class="neo-title">{{ t('level5.endTitle') }}</h2>
                <button class="neo-btn" @click="goBackToMap">{{ t('generic.backToMap') }}</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.result-card { padding: 3rem; display: flex; flex-direction: column; gap: 1.5rem; }
.loading-screen { display: flex; flex-direction: column; justify-content: center; align-items: center; height: 50vh; font-weight: bold; gap: 1rem; }

/* Disclaimer Styling */
.heatmap-disclaimer {
    margin-top: 1.5rem;
    padding: 0.8rem;
    background: #fdfdfd;
    border: 1px solid #000000;
    text-align: center;
    color: #000000;
    line-height: 1.3;
}
</style>