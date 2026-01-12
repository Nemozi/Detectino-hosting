<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js';
import { useGameState } from '@/composables/useGameState.js'; 
import { useUnsplash } from '@/composables/useUnsplash.js';

import spotTheFake from '@/components/game/spotTheFake.vue';
import analysis from '@/components/game/analysis.vue';
import multiCheck from '@/components/game/multiCheck.vue';
import conceptTagging from '@/components/game/conceptTagging.vue';

const router = useRouter();
const { t, detectLanguage } = useTranslation();
const { fetchRandomRealImages } = useUnsplash();
const { handleScoreAction, markLevelAsCompleted } = useGameState(); 

detectLanguage();

/* ---------- STATE ---------- */
const currentStep = ref(0);
const totalSteps = 7; 
const isDataLoaded = ref(false);
const gameFinished = ref(false);
const username = ref('');
const needsRemediation = reactive({ image71: false, image21: false });

const realImagesStep0 = ref([]);
const realImagesStep5 = ref([]);

// ÄNDERUNG: Bilder-Definition mit Bucket-Zuordnung für sicheres Preloading
const aiAssets = [
    { name: 'Image_0024.jpg', bucket: 'Fake-Images' },
    { name: 'Image_0071.jpg', bucket: 'Fake-Images' },
    { name: 'Image_0021.jpg', bucket: 'Fake-Images' },
    { name: 'Image_0073.jpg', bucket: 'Fake-Images' },
    { name: 'Image_0014.jpg', bucket: 'Fake-Images' },
    { name: 'Image_0055.jpg', bucket: 'Fake-Images' },
    { name: 'Image_0035.jpg', bucket: 'Fake-Images' }
];

/* ---------- HELPER ---------- */
const preloadImages = (urls) => {
    return Promise.all(urls.map(url => new Promise(res => {
        const img = new Image();
        img.src = url; img.onload = res; img.onerror = res;
    })));
};

const logActivity = (payload) => {
    supabase.auth.getUser().then(({ data: { user } }) => {
        if (!user) return;
        supabase.from('spiel_aktivitaeten').insert({
            user_id: user.id,
            level_id: 2, 
            step_id: currentStep.value,
            task_type: payload.taskType,
            is_correct: payload.isCorrect,
            image_name: payload.imageName || username.value
        });
    });
};

/* ---------- DATA LOADING ---------- */
onMounted(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return router.push('/login');

    const { data: profile } = await supabase.from('spielerprofile').select('username').eq('user_id', user.id).maybeSingle();
    const emailName = user.email ? user.email.split('@')[0] : null;
    username.value = profile?.username || emailName || `Gast_${user.id.slice(0, 5)}`;

    // 1. Echte Bilder aus DB-Buffer laden
    const unsplashPool = await fetchRandomRealImages(6, 'portrait');
    realImagesStep0.value = unsplashPool.slice(0, 3);
    realImagesStep5.value = unsplashPool.slice(3, 6);

    // 2. Alle URLs für das Preloading sammeln
    const urlsToPreload = [];
    
    // Unsplash URLs hinzufügen
    unsplashPool.forEach(img => urlsToPreload.push(img.src));
    
    // AI URLs aus Supabase Storage generieren und hinzufügen
    aiAssets.forEach(asset => {
        const { data } = supabase.storage.from(asset.bucket).getPublicUrl(asset.name);
        urlsToPreload.push(data.publicUrl);
    });

    // 3. Warten bis ALLES im Cache ist
    await preloadImages(urlsToPreload);
    isDataLoaded.value = true; 
});

const nextStep = () => {
    currentStep.value++;
    window.scrollTo(0, 0);
};

const handleMultiCheckResult = (result) => {
    const allCorrect = result.image71Correct && result.image21Correct;
    handleScoreAction(allCorrect, 2); 
    logActivity({ taskType: 'multi_check', isCorrect: allCorrect });

    needsRemediation.image71 = !result.image71Correct;
    needsRemediation.image21 = !result.image21Correct;

    if (needsRemediation.image71) currentStep.value = 3; 
    else if (needsRemediation.image21) currentStep.value = 4; 
    else currentStep.value = 5;
    window.scrollTo(0, 0);
};

const finishLevel = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        const { error } = await supabase.from('level_fortschritt').upsert({
            user_id: user.id, level_id: 2, score: 100
        }, { onConflict: 'user_id,level_id' });
        if (!error) markLevelAsCompleted(2);
    }
    gameFinished.value = true; 
};
</script>

<template>
    <div class="content-wrapper">
        <!-- Internationalisierter Ladescreen -->
        <div v-if="!isDataLoaded" class="loading-screen">
            <div class="loader-spinner"></div>
            <p>{{ t('level1.loading') }}</p>
        </div>
        
        <div v-else class="level-container">
            <template v-if="!gameFinished">
                <!-- Internationalisierter Titel -->
                <div class="level-header-title">{{ t('level1.title') }}</div>
                
                <div class="level-progress-bar">
                    <span>{{ t('generic.step') }} {{ currentStep + 1 }} / {{ totalSteps }}</span>
                    <div class="progress-track">
                        <div class="progress-fill" :style="{ width: ((currentStep + 1) / totalSteps * 100) + '%' }"></div>
                    </div>
                </div>

                <spotTheFake 
                    v-if="currentStep === 0"
                    :levelId="2" 
                    :aiImage="{ src: 'Image_0024.jpg', bucket: 'Fake-Images' }"
                    :realImages="realImagesStep0"
                    :questionText="t('level1.step0.question')"
                    @completed="nextStep"
                />

                <analysis v-else-if="currentStep === 1" image="Image_0024.jpg" :title="t('level1.step1.title')" :text="t('level1.step1.text')" @next="nextStep" />
                
                <multiCheck v-else-if="currentStep === 2" imageLeft="Image_0071.jpg" imageRight="Image_0021.jpg" correctOption="both" :levelId="2" @completed="handleMultiCheckResult" />
                
                <analysis v-else-if="currentStep === 3" image="Image_0071.jpg" :title="t('level1.step3.title')" :text="t('level1.step3.text')" @next="() => needsRemediation.image21 ? currentStep = 4 : currentStep = 5" />
                <analysis v-else-if="currentStep === 4" image="Image_0021.jpg" :title="t('level1.step4.title')" :text="t('level1.step4.text')" @next="nextStep" />

                <spotTheFake 
                    v-else-if="currentStep === 5"
                    :levelId="2"
                    :aiImage="{ src: 'Image_0073.jpg', bucket: 'Fake-Images' }"
                    :realImages="realImagesStep5"
                    :questionText="t('level1.step5.question')"
                    @completed="nextStep"
                />

                <conceptTagging v-else-if="currentStep === 6" :levelId="2" :images="['Image_0014.jpg', 'Image_0055.jpg', 'Image_0035.jpg']" :question="t('level1.step6.title')" :subtitle="t('level1.step6.subtitle')" :terms="[{ id: 'blurred', text: t('level1.step6.terms.blurred') }, { id: 'inconsistent', text: t('level1.step6.terms.inconsistent') }, { id: 'unrealistic', text: t('level1.step6.terms.unrealistic') }, { id: 'lighting', text: t('level1.step6.terms.lighting') }]" :correctIds="['blurred', 'inconsistent', 'unrealistic', 'lighting']" :feedbackText="t('level1.step6.feedback')" @completed="finishLevel" />
            </template>

            <!-- Internationalisierte Erfolgskarte -->
            <div v-if="gameFinished" class="neo-card result-card" style="text-align:center;">
                <h2 class="neo-title">{{ t('level1.endTitle') }}</h2>
                
                <button class="neo-btn" @click="router.push('/levels')">{{ t('generic.backToMap') }}</button>
            </div>
        </div>
    </div>
</template>