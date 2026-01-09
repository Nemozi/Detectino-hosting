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

detectLanguage();

/* ---------- STATE ---------- */
const currentStep = ref(0);
const totalSteps = 6; 
const isDataLoaded = ref(false);
const gameFinished = ref(false);
const username = ref('');
const userId = ref(null);

// Bild-Variablen
const realImage27 = ref({ src: 'Image_0027.jpg', bucket: 'Real-Images' }); 
const fallbackRealImages = ref([]); // Für Spot-the-Fake Schritt 4

// Liste ALLER Assets für den Preload
const assetsToPreload = [
    { name: 'Image_0002.jpg', bucket: 'Fake-best-Images' }, // Step 0 & 1
    { name: 'Heatmap_0002.png', bucket: 'Heatmaps-best' },  // Step 1
    { name: 'Image_0025.jpg', bucket: 'Fake-best-Images' }, // Step 2 & 3
    { name: 'Image_0027.jpg', bucket: 'Real-Images' },      // Step 2 (Referenz)
    { name: 'Heatmap_0025.png', bucket: 'Heatmaps-best' },  // Step 3
    { name: 'Image_0036.png', bucket: 'Nanobanana-Images' },// Step 4
    { name: 'Image_0027.jpg', bucket: 'Fake-Images' },      // Step 5 (Anderes Bild, gleicher Name)
    { name: 'Heatmap_0027.png', bucket: 'Heatmaps' }        // Step 5
];

/* ---------- PRELOADER ---------- */
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

        // Profil/Username laden
        const { data: profile } = await supabase.from('spielerprofile').select('username').eq('user_id', user.id).maybeSingle();
        const emailName = user.email ? user.email.split('@')[0] : null;
        username.value = profile?.username || emailName || `Gast_${user.id.slice(0, 5)}`;

        // 1. Fallback-Bilder für Schritt 4 (Real-Bilder aus DB Buffer)
        const unsplashPool = await fetchRandomRealImages(5, 'portrait');
        fallbackRealImages.value = unsplashPool;

        // 2. Alle URLs für Preload sammeln
        const allUrls = [...unsplashPool.map(img => img.src)];
        
        assetsToPreload.forEach(asset => {
            const { data } = supabase.storage.from(asset.bucket).getPublicUrl(asset.name);
            allUrls.push(data.publicUrl);
        });

        // 3. Warten bis alles im Cache ist
        await preloadAllAssets(allUrls);

    } catch (e) {
        console.warn("Preload Fehler in Level 5", e);
    } finally {
        isDataLoaded.value = true;
    }
});

const nextStep = () => {
    currentStep.value++;
    window.scrollTo(0, 0);
};

const finishLevel = async () => {
    if (userId.value) {
        await supabase.from('level_fortschritt').upsert({ 
            user_id: userId.value, level_id: 5, score: 100 
        }, { onConflict: 'user_id,level_id' });
        markLevelAsCompleted(5);
    }
    gameFinished.value = true;
};

const goBackToMap = () => router.push('/levels');
</script>

<template>
    <div class="content-wrapper">
        <div v-if="!isDataLoaded" class="loading-screen">
            <div class="loader-spinner"></div>
            <p>{{ t('level4.loading') }}</p>
        </div>

        <div v-else class="level-container">
            <template v-if="!gameFinished">
                <div class="level-header-title">{{ t('level4.title') }}</div>
                
                <div class="level-progress-bar">
                    <span>{{ t('generic.step') }} {{ currentStep + 1 }} / {{ totalSteps }}</span>
                    <div class="progress-track">
                        <div class="progress-fill" :style="{ width: ((currentStep + 1) / totalSteps * 100) + '%' }"></div>
                    </div>
                </div>
            </template>

            <template v-if="!gameFinished">
                <!-- SCHRITT 0: Quiz -->
                <singleChoice
                    v-if="currentStep === 0"
                    :levelId="5"
                    :image="{ src: 'Image_0002.jpg', bucket: 'Fake-best-Images' }"
                    :question="t('level4.step0.question')"
                    :options="[
                        {id: 'pose', text: t('level4.step0.options.pose')},
                        {id: 'nothing', text: t('level4.step0.options.nothing')},
                        {id: 'expression', text: t('level4.step0.options.expression')},
                        {id: 'bg', text: t('level4.step0.options.bg')}
                    ]"
                    correctId="expression"
                    :feedbackText="t('level4.step0.feedback')"
                    :failFeedbackText="t('level4.step0.fail')"
                    @completed="nextStep"
                />

                <!-- SCHRITT 1: Analyse -->
                <analysis
                    v-else-if="currentStep === 1"
                    :image="[
                        { src: 'Image_0002.jpg', bucket: 'Fake-best-Images' },
                        { src: 'Heatmap_0002.png', bucket: 'Heatmaps-best' }
                    ]"
                    :title="t('level4.step1.title')"
                    :text="t('level4.step1.text')"
                    @next="nextStep"
                />

                <!-- SCHRITT 2: Spot Fake -->
                <spotTheFake 
                    v-else-if="currentStep === 2"
                    :levelId="5"
                    :aiImage="{ src: 'Image_0025.jpg', bucket: 'Fake-best-Images' }"
                    :realImages="[realImage27]"
                    :questionText="t('level4.step2.question')"
                    :successText="t('level4.step2.success')"
                    :feedbackText="t('level4.step2.fail')"
                    @completed="nextStep"
                />

                <!-- SCHRITT 3: Analyse -->
                <analysis
                    v-else-if="currentStep === 3"
                    :image="[
                        { src: 'Image_0025.jpg', bucket: 'Fake-best-Images' },
                        { src: 'Heatmap_0025.png', bucket: 'Heatmaps-best' }
                    ]"
                    :title="t('level4.step3.title')"
                    :text="t('level4.step3.text')"
                    @next="nextStep"
                />

                <!-- SCHRITT 4: Spot Fake (MIT FALLBACK FIX) -->
                <spotTheFake 
                    v-else-if="currentStep === 4"
                    :levelId="5"
                    :aiImage="{ src: 'Image_0036.png', bucket: 'Nanobanana-Images' }"
                    :realImages="fallbackRealImages"
                    :questionText="t('level4.step4.question')"
                    :successText="t('level4.step4.success')"
                    :feedbackText="t('level4.step4.fail')"
                    @completed="nextStep"
                />

                <!-- SCHRITT 5: Abschluss -->
                <analysis
                    v-else-if="currentStep === 5"
                    :image="[
                        { src: 'Image_0027.jpg', bucket: 'Fake-Images' },
                        { src: 'Heatmap_0027.png', bucket: 'Heatmaps' }
                    ]"
                    :title="t('level4.step5.title')"
                    :text="t('level4.step5.text')"
                    :buttonText="t('generic.completeLevel')"
                    @next="finishLevel"
                />
            </template>

            <!-- ERGEBNIS-KARTE -->
            <div v-if="gameFinished" class="neo-card result-card" style="text-align:center;">
                <h2 class="neo-title">{{ t('level4.endTitle') }}</h2>
                <p>{{ t('level4.endText') }}</p>
                <button class="neo-btn" @click="goBackToMap">{{ t('generic.backToMap') }}</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.level-container { width: 100%; max-width: 50rem; margin: 0 auto; padding: 0 1rem 2rem 1rem; box-sizing: border-box; }
.level-progress { text-align: center; font-weight: 800; text-transform: uppercase; margin-bottom: 1.5rem; border-bottom: 3px solid #000; padding-bottom: 0.5rem; font-size: 1.2rem; }
.loading-screen { display: flex; justify-content: center; align-items: center; height: 50vh; font-size: 1.5rem; font-weight: bold; text-transform: uppercase; }
.loader { animation: blink 1s infinite; }
@keyframes blink { 50% { opacity: 0.5; } }
:deep(.content-wrapper) { padding-top: 1rem; align-items: flex-start; }
</style>