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
import conceptTagging from '@/components/game/conceptTagging.vue';
import imageMatching from '@/components/game/imageMatching.vue'; 

const router = useRouter();
const { t, detectLanguage } = useTranslation();
const { handleScoreAction, markLevelAsCompleted } = useGameState(); 
const { fetchRandomRealImages } = useUnsplash();

const totalSteps = 9;
detectLanguage();

const currentStep = ref(0);
const isDataLoaded = ref(false);
const gameFinished = ref(false);
const username = ref('');

// Bild-Variablen
const realImage26Url = ref(''); // Das spezifische Vergleichsbild
const realImagesStep3 = ref([]); // Die Unsplash-Bilder für später

// Liste ALLER KI-Assets und spezifischen Real-Assets für den Preload
const assetsToPreload = [
    { name: 'Image_0018.jpg', bucket: 'Fake-best-Images' }, // Step 0 & 1
    { name: 'Image_0026.jpg', bucket: 'Real-Images' },      // Step 0 (Referenz)
    { name: 'Image_0083.jpg', bucket: 'Fake-Images' },      // Step 3 & 4
    { name: 'Image_0047.jpg', bucket: 'Fake-Images' },      // Step 5 & 6
    { name: 'Heatmap_0047.png', bucket: 'Heatmaps' },       // Step 6
    { name: 'Image_0022.jpg', bucket: 'Fake-best-Images' }, // Step 7
    { name: 'Image_0032.jpg', bucket: 'Fake-Images' },      // Step 7
    { name: 'Image_0021.jpg', bucket: 'Fake-best-Images' }, // Step 7
    { name: 'Image_0006.jpg', bucket: 'Fake-best-Images' }  // Step 8
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

        // 1. Profil laden
        const { data: profile } = await supabase.from('spielerprofile').select('username').eq('user_id', user.id).maybeSingle();
        username.value = profile?.username || user.email.split('@')[0];

        // 2. Unsplash Bilder aus DB-Buffer holen (3 Stück für Schritt 3)
        const unsplashPool = await fetchRandomRealImages(3);
        realImagesStep3.value = unsplashPool;

        // 3. URLs für Preload sammeln
        const allUrls = [...unsplashPool.map(img => img.src)];
        
        assetsToPreload.forEach(asset => {
            const { data } = supabase.storage.from(asset.bucket).getPublicUrl(asset.name);
            allUrls.push(data.publicUrl);
            // Speichere die URL für Image_0026 separat für Schritt 0
            if (asset.name === 'Image_0026.jpg') {
                realImage26Url.value = data.publicUrl;
            }
        });

        // 4. Warten bis alles im Cache ist
        await preloadAllAssets(allUrls);

    } catch (e) {
        console.warn("Preload Fehler in Level 4", e);
    } finally {
        isDataLoaded.value = true;
    }
});

const nextStep = () => {
    currentStep.value++;
    window.scrollTo(0, 0);
};

const finishLevel = () => {
    gameFinished.value = true;
    supabase.auth.getUser().then(({ data: { user } }) => {
        if (user) {
            supabase.from('level_fortschritt').upsert({ 
                user_id: user.id, level_id: 4, score: 100 
            }, { onConflict: 'user_id,level_id' }).then(() => {
                markLevelAsCompleted(4);
            });
        }
    });
};

const goBackToMap = () => router.push('/levels');
</script>

<template>
    <div class="content-wrapper">
        <div v-if="!isDataLoaded" class="loading-screen">
            <div class="loader-spinner"></div>
            <p>Inhalte werden geladen...</p>
        </div>
        
        <div v-else class="level-container">
            <template v-if="!gameFinished">
                <div class="level-header-title">Level 4: Farben & Sättigung</div>
                <div class="level-progress-bar">
                    <span>Schritt {{ currentStep + 1 }} / {{ totalSteps }}</span>
                    <div class="progress-track">
                        <div class="progress-fill" :style="{ width: ((currentStep + 1) / totalSteps * 100) + '%' }"></div>
                    </div>
                </div>

                <!-- SCHRITT 0: Spot Fake (Original Bild 18 vs Bild 26) -->
                <spotTheFake 
                    v-if="currentStep === 0"
                    :levelId="4"
                    :aiImage="{ src: 'Image_0018.jpg', bucket: 'Fake-best-Images' }"
                    :realImages="[{ src: 'Image_0026.jpg', bucket: 'Real-Images' }]"
                    :questionText="t('level3.step0.question')"
                    :successText="t('level3.step0.success')"
                    @completed="nextStep"
                />

                <!-- SCHRITT 1: Quiz -->
                <singleChoice
                    v-else-if="currentStep === 1"
                    :levelId="4"
                    :image="{ src: 'Image_0018.jpg', bucket: 'Fake-best-Images' }"
                    :question="t('level3.step1.question')"
                    :options="[
                        {id: 'colors', text: t('level3.step1.options.colors')},
                        {id: 'bg', text: t('level3.step1.options.bg')},
                        {id: 'eyes', text: t('level3.step1.options.eyes')},
                        {id: 'hat', text: t('level3.step1.options.hat')}
                    ]"
                    correctId="colors"
                    :feedbackText="t('level3.step1.feedback')" 
                    @completed="nextStep"
                />

                <!-- SCHRITT 2: Theorie -->
                <singleChoice
                    v-else-if="currentStep === 2"
                    :levelId="4"
                    :question="t('level3.step2.question')"
                    :options="[
                        {id: 'indicator', text: t('level3.step2.options.indicator')},
                        {id: 'all', text: t('level3.step2.options.all')},
                        {id: 'none', text: t('level3.step2.options.none')}
                    ]"
                    correctId="indicator"
                    :feedbackText="t('level3.step2.feedback')"
                    @completed="nextStep"
                />

                <!-- SCHRITT 3: Spot Fake -->
                <spotTheFake 
                    v-if="currentStep === 3"
                    :levelId="4"
                    :aiImage="{ src: 'Image_0083.jpg', bucket: 'Fake-Images' }"
                    :realImages="realImagesStep3"
                    :questionText="t('level3.step3.question')"
                    :successText="t('level3.step3.success')"
                    @completed="nextStep"
                />

                <!-- SCHRITT 4: Analyse -->
                <analysis
                    v-else-if="currentStep === 4"
                    image="Image_0083.jpg"
                    :title="t('level3.step4.title')"
                    :text="t('level3.step4.text')"
                    @next="nextStep"
                />

                <!-- SCHRITT 5: Concept Tagging -->
                <conceptTagging 
                    v-else-if="currentStep === 5"
                    :levelId="4"
                    :images="['Image_0047.jpg']"
                    :question="t('level3.step5.title')"
                    :subtitle="t('level3.step5.subtitle')"
                    :terms="[
                        { id: 'skin', text: t('level3.step5.terms.skin') },
                        { id: 'eyes', text: t('level3.step5.terms.eyes') },
                        { id: 'makeup', text: t('level3.step5.terms.makeup') },
                        { id: 'smooth', text: t('level3.step5.terms.smooth') }
                    ]"
                    :correctIds="['skin', 'eyes', 'smooth']"
                    :feedbackText="t('level3.step5.feedback')"
                    @completed="nextStep"
                />

                <!-- SCHRITT 6: Heatmap -->
                <analysis
                    v-else-if="currentStep === 6"
                    :image="[
                        { src: 'Image_0047.jpg', bucket: 'Fake-Images' },
                        { src: 'Heatmap_0047.png', bucket: 'Heatmaps' } 
                    ]"
                    :title="t('level3.step6.title')"
                    :text="t('level3.step6.text')"
                    @next="nextStep"
                />

                <!-- SCHRITT 7: Image Matching -->
                <imageMatching
                    v-else-if="currentStep === 7"
                    :levelId="4"
                    :question="t('level3.step7.question')"
                    :terms="[
                        { id: 'hair', text: t('level3.step7.terms.hair') },
                        { id: 'smooth', text: t('level3.step7.terms.smooth') },
                        { id: 'sat', text: t('level3.step7.terms.sat') }
                    ]"
                    :items="[
                        { id: 'img22', src: 'Image_0022.jpg', bucket: 'Fake-best-Images', correctTermId: 'sat' },
                        { id: 'img32', src: 'Image_0032.jpg', bucket: 'Fake-Images', correctTermId: 'hair' },
                        { id: 'img21', src: 'Image_0021.jpg', bucket: 'Fake-best-Images', correctTermId: 'smooth' }
                    ]"
                    :successText="t('level3.step7.success')"
                    @completed="nextStep"
                />

                <!-- SCHRITT 8: Abschluss -->
                <analysis 
                    v-else-if="currentStep === 8"
                    :image="{ src: 'Image_0006.jpg', bucket: 'Fake-best-Images' }"
                    :title="t('level3.step8.title')"
                    :text="t('level3.step8.text')"
                    buttonText="Level abschließen"
                    @next="finishLevel"
                />
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
/* Container Style */
.level-container { width: 100%; max-width: 50rem; margin: 0 auto; padding: 0 1rem 2rem 1rem; box-sizing: border-box; }
.level-progress { text-align: center; font-weight: 800; text-transform: uppercase; margin-bottom: 1.5rem; border-bottom: 3px solid #000; padding-bottom: 0.5rem; font-size: 1.2rem; }
.loading-screen { display: flex; justify-content: center; align-items: center; height: 50vh; font-size: 1.5rem; font-weight: bold; text-transform: uppercase; }
.loader { animation: blink 1s infinite; }
@keyframes blink { 50% { opacity: 0.5; } }
:deep(.content-wrapper) { padding-top: 1rem; align-items: flex-start; }
</style>