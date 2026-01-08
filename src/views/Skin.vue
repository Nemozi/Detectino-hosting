<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js';
import { useGameState } from '@/composables/useGameState.js'; 

// Komponenten
import spotTheFake from '@/components/game/spotTheFake.vue';
import analysis from '@/components/game/analysis.vue';
import singleChoice from '@/components/game/singleChoice.vue';
import gridSelect from '@/components/game/gridSelect.vue';    
import conceptTagging from '@/components/game/conceptTagging.vue';

const router = useRouter();
const { t, detectLanguage } = useTranslation();
const { handleScoreAction, markLevelAsCompleted } = useGameState(); 

detectLanguage();

const currentStep = ref(0);
const totalSteps = 7; 
const isDataLoaded = ref(false);
const gameFinished = ref(false);
const username = ref('');

// Bild-Pools für echte Vergleichsbilder
const realImagesStep3 = ref([]); 

const logActivity = async (payload) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    try {
        await supabase.from('spiel_aktivitaeten').insert({
            user_id: user.id,
            level_id: 3, // Datenbank ID
            step_id: currentStep.value,
            task_type: payload.taskType || 'step',
            image_name: payload.imageName || username.value,
            is_correct: payload.isCorrect ?? true,
            interaction_type: 'click'
        });
    } catch (e) { console.error("Logging failed", e); }
};

onMounted(async () => {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return router.push('/login');

        // Username für Logging holen
        const { data: profile } = await supabase.from('spielerprofile').select('username').eq('user_id', user.id).single();
        username.value = profile?.username || user.email.split('@')[0];

        // Echte Bilder aus Storage für Abwechslung
        const { data: storageData } = await supabase.storage.from('Real-Images').list();
        if (storageData) {
            const allReal = storageData.filter(f => f.name.toLowerCase().match(/\.(jpg|png|jpeg)$/)).map(f => f.name);
            const shuffled = allReal.sort(() => 0.5 - Math.random());
            realImagesStep0.value = shuffled.slice(0, 3);
            realImagesStep3.value = shuffled.slice(3, 5);
        }
    } catch (err) {
        console.warn("Storage Error, using fallbacks");
    } finally {
        isDataLoaded.value = true;
    }
});

const nextStep = () => {
    currentStep.value++;
    window.scrollTo(0, 0);
};

const finishLevel = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        // Muss level_id: 3 sein!
        await supabase.from('level_fortschritt').upsert({
            user_id: user.id, 
            level_id: 3, 
            score: 100
        }, { onConflict: 'user_id,level_id' });
        
        markLevelAsCompleted(3);
    }
    gameFinished.value = true;
};

const goBackToMap = () => router.push('/levels');
</script>

<template>
    <div class="content-wrapper">
        <div v-if="!isDataLoaded" class="loading-screen">
            <div class="loader-spinner"></div>
            <p>{{ t('generic.loading') }}</p>
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

            <template v-if="!gameFinished">
                <!-- SCHRITT 0: Spot the Fake (Mapped auf level2.step0) -->
                <spotTheFake 
                    v-if="currentStep === 0"
                    :levelId="3"
                    aiImage="Image_0020.jpg"
                    :questionText="t('level2.step0.question')"
                    :successText="t('level2.step0.success')"
                    @completed="nextStep"
                />

                <!-- SCHRITT 1: Quiz (Mapped auf level2.step1) -->
                <singleChoice
                    v-else-if="currentStep === 1"
                    :levelId="3"
                    image="Image_0020.jpg"
                    :question="t('level2.step1.question')"
                    :options="[
                        {id: 'skin', text: t('level2.step1.options.skin')},
                        {id: 'nose', text: t('level2.step1.options.nose')},
                        {id: 'eyes', text: t('level2.step1.options.eyes')},
                        {id: 'hair', text: t('level2.step1.options.hair')}
                    ]"
                    correctId="skin"
                    :feedbackText="t('level2.step1.feedback')"
                    @completed="nextStep"
                />

                <!-- SCHRITT 2: Analyse (Mapped auf level2.step2) -->
                <analysis
                    v-else-if="currentStep === 2"
                    image="Image_0020.jpg"
                    :title="t('level2.step2.title')"
                    :text="t('level2.step2.text')"
                    :buttonText="t('generic.next')"
                    @next="nextStep"
                />

                <!-- SCHRITT 3: Grid Select (Mapped auf level2.step3) -->
                <gridSelect
                    v-else-if="currentStep === 3"
                    :levelId="3"
                    :images="[
                        { src: 'Image_0082.jpg', type: 'ai', bucket: 'Fake-Images' },
                        { src: realImagesStep3[0] || 'Image_0001.jpg', type: 'real', bucket: 'Real-Images' },
                        { src: 'Image_0079.jpg', type: 'ai', bucket: 'Fake-Images' },
                        { src: realImagesStep3[1] || 'Image_0002.jpg', type: 'real', bucket: 'Real-Images' }
                    ].sort(() => 0.5 - Math.random())" 
                    :question="t('level2.step3.question')"
                    :successText="t('level2.step3.success')"
                    @completed="nextStep"
                />

                <!-- SCHRITT 4: Concept Tagging (Mapped auf level2.step4) -->
                <conceptTagging
                    v-else-if="currentStep === 4"
                    :levelId="3"
                    :images="['Image_0053.jpg']"
                    :question="t('level2.step4.question')"
                    :subtitle="t('level2.step4.subtitle')"
                    :terms="[
                        {id: 'smooth', text: t('level2.step4.terms.smooth')},
                        {id: 'wrinkles', text: t('level2.step4.terms.wrinkles')},
                        {id: 'eyes', text: t('level2.step4.terms.eyes')},
                        {id: 'tattoos', text: t('level2.step4.terms.tattoos')}
                    ]"
                    :correctIds="['smooth', 'wrinkles']"
                    :feedbackText="t('level2.step4.feedback')"
                    @completed="nextStep"
                />

                <!-- SCHRITT 5: Vergleich (Mapped auf level2.step5) -->
                <analysis
                    v-else-if="currentStep === 5"
                    :image="[
                        { src: 'Image_0053.jpg', bucket: 'Fake-Images' },
                        { src: 'Image_0025.jpg', bucket: 'Real-Images' } 
                    ]"
                    :title="t('level2.step5.title')"
                    :text="t('level2.step5.text')"
                    @next="nextStep"
                />

                <!-- SCHRITT 6: Abschluss (Mapped auf level2.step6) -->
                <analysis
                    v-else-if="currentStep === 6"
                    image="Image_0020.jpg" 
                    :title="t('level2.step6.title')"
                    :text="t('level2.step6.text')"
                    :buttonText="t('generic.finish')"
                    @next="finishLevel"
                />
            </template>

            <!-- ERGEBNIS-KARTE -->
            <div v-if="gameFinished" class="neo-card result-card" style="text-align:center;">
                <h2 class="neo-title">Level abgeschlossen!</h2>
                <p>Hauttexturen sind ein starkes Indiz. Echte Haut ist nie perfekt.</p>
                <button class="neo-btn" @click="goBackToMap">Zurück zur Map</button>
            </div>
        </div>
    </div>
</template>