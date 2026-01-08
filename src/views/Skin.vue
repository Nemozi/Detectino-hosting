<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js';
import { useGameState } from '@/composables/useGameState.js'; 
import { useUnsplash } from '@/composables/useUnsplash.js';

// Komponenten
import spotTheFake from '@/components/game/spotTheFake.vue';
import analysis from '@/components/game/analysis.vue';
import singleChoice from '@/components/game/singleChoice.vue';
import gridSelect from '@/components/game/gridSelect.vue';    
import conceptTagging from '@/components/game/conceptTagging.vue';

const router = useRouter();
const { t, detectLanguage } = useTranslation();
const { handleScoreAction, markLevelAsCompleted } = useGameState(); 
const { fetchRandomRealImages } = useUnsplash();

detectLanguage();

/* ---------- STATE ---------- */
const currentStep = ref(0);
const totalSteps = 7; // 0 bis 6
const isDataLoaded = ref(false);
const gameFinished = ref(false);
const username = ref('');

const realImagesStep0 = ref([]); 
const realImagesStep3 = ref([]); 

// KI-Bilder Liste
const aiImagesToPreload = [
    { name: 'Image_0020.jpg', bucket: 'Fake-Images' },
    { name: 'Image_0082.jpg', bucket: 'Fake-Images' },
    { name: 'Image_0079.jpg', bucket: 'Fake-Images' },
    { name: 'Image_0053.jpg', bucket: 'Fake-Images' },
    { name: 'Image_0025.jpg', bucket: 'Real-Images' }
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

        const { data: profile } = await supabase.from('spielerprofile').select('username').eq('user_id', user.id).maybeSingle();
        username.value = profile?.username || user.email.split('@')[0];

        const unsplashPool = await fetchRandomRealImages(10, 'portrait');
        realImagesStep0.value = unsplashPool.slice(0, 3);
        realImagesStep3.value = unsplashPool.slice(3, 5);

        const allUrls = [...unsplashPool.map(img => img.src)];
        aiImagesToPreload.forEach(item => {
            const { data } = supabase.storage.from(item.bucket).getPublicUrl(item.name);
            allUrls.push(data.publicUrl);
        });

        await preloadAllAssets(allUrls);

    } catch (e) {
        console.warn("Preload Fehler", e);
    } finally {
        isDataLoaded.value = true;
    }
});

const nextStep = () => {
    currentStep.value++;
    window.scrollTo(0, 0);
};

const finishLevel = () => {
    // SPEED FIX: Wir setzen gameFinished SOFORT auf true für das UI
    gameFinished.value = true;

    // Speicherung im Hintergrund (kein await nötig für den Nutzer)
    supabase.auth.getUser().then(({ data: { user } }) => {
        if (user) {
            supabase.from('level_fortschritt').upsert({ 
                user_id: user.id, 
                level_id: 3, 
                score: 100 
            }, { onConflict: 'user_id,level_id' }).then(() => {
                markLevelAsCompleted(3);
            });
        }
    });
};

const goBackToMap = () => router.push('/levels');
</script>

<template>
    <div class="content-wrapper">
        <!-- Ladescreen -->
        <div v-if="!isDataLoaded" class="loading-screen">
            <div class="loader-spinner"></div>
            <p>Bilder werden synchronisiert...</p>
        </div>

        <div v-else class="level-container">
            <!-- Header & Progress Bar -->
            <template v-if="!gameFinished">
                <div class="level-header-title">Level 3: Hauttexturen</div>
                <div class="level-progress-bar">
                    <span>Schritt {{ currentStep + 1 }} / {{ totalSteps }}</span>
                    <div class="progress-track">
                        <div class="progress-fill" :style="{ width: ((currentStep + 1) / totalSteps * 100) + '%' }"></div>
                    </div>
                </div>
            </template>

            <!-- SPIELBEREICH -->
            <template v-if="!gameFinished">
                <!-- SCHRITT 0: Spot Fake -->
                <spotTheFake 
                    v-if="currentStep === 0"
                    :levelId="3"
                    :aiImage="{ src: 'Image_0020.jpg', bucket: 'Fake-Images' }"
                    :realImages="realImagesStep0"
                    :questionText="t('level2.step0.question')"
                    @completed="nextStep"
                />

                <!-- SCHRITT 1: Quiz -->
                <singleChoice 
                    v-else-if="currentStep === 1" 
                    :levelId="3" 
                    :image="{ src: 'Image_0020.jpg', bucket: 'Fake-Images' }" 
                    :question="t('level2.step1.question')" 
                    :options="[{id: 'skin', text: t('level2.step1.options.skin')}, {id: 'nose', text: t('level2.step1.options.nose')}, {id: 'eyes', text: t('level2.step1.options.eyes')}, {id: 'hair', text: t('level2.step1.options.hair')}]" 
                    correctId="skin" 
                    :feedbackText="t('level2.step1.feedback')" 
                    @completed="nextStep" 
                />
                
                <!-- SCHRITT 2: Analyse -->
                <analysis v-else-if="currentStep === 2" image="Image_0020.jpg" :title="t('level2.step2.title')" :text="t('level2.step2.text')" @next="nextStep" />

                <!-- SCHRITT 3: Grid Select -->
                    
                <gridSelect
                    v-else-if="currentStep === 3 && realImagesStep3.length > 0"
                    :levelId="3"
                    :images="[
                        { src: 'Image_0082.jpg', type: 'ai', bucket: 'Fake-Images' },
                        { src: 'Image_0079.jpg', type: 'ai', bucket: 'Fake-Images' },
                        ...realImagesStep3
                    ].sort(() => 0.5 - Math.random())" 
                    :question="t('level2.step3.question')"
                    :successText="t('level2.step3.success')"
                    @completed="nextStep"
                />

  

                <!-- SCHRITT 4: Concept Tagging -->
                <conceptTagging v-else-if="currentStep === 4" :levelId="3" :images="['Image_0053.jpg']" :question="t('level2.step4.question')" :subtitle="t('level2.step4.subtitle')" :terms="[{id: 'smooth', text: t('level2.step4.terms.smooth')}, {id: 'wrinkles', text: t('level2.step4.terms.wrinkles')}, {id: 'eyes', text: t('level2.step4.terms.eyes')}, {id: 'tattoos', text: t('level2.step4.terms.tattoos')}]" :correctIds="['smooth', 'wrinkles']" :feedbackText="t('level2.step4.feedback')" @completed="nextStep" />
                
                <!-- SCHRITT 5: Vergleich -->
                <analysis v-else-if="currentStep === 5" :image="[{ src: 'Image_0053.jpg', bucket: 'Fake-Images' }, { src: 'Image_0025.jpg', bucket: 'Real-Images' }]" :title="t('level2.step5.title')" :text="t('level2.step5.text')" @next="nextStep" />
                
                <!-- SCHRITT 6: Abschluss-Button -->
                <analysis 
                    v-else-if="currentStep === 6" 
                    image="Image_0020.jpg" 
                    :title="t('level2.step6.title')" 
                    :text="t('level2.step6.text')" 
                    buttonText="Level abschließen" 
                    @next="finishLevel" 
                />
            </template>

            <!-- ERGEBNIS-KARTE (Wird angezeigt wenn gameFinished true ist) -->
            <div v-if="gameFinished" class="neo-card result-card" style="text-align:center;">
                <h2 class="neo-title">Level abgeschlossen!</h2>
                <p>Du hast bewiesen, dass du ein Auge für Hautdetails hast.</p>
                <button class="neo-btn" @click="goBackToMap">Zurück zur Map</button>
            </div>
        </div>
    </div>
</template>

