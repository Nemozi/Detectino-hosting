<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js';
import { useGameState } from '@/composables/useGameState.js'; 

import spotTheFake from '@/components/game/spotTheFake.vue';
import analysis from '@/components/game/analysis.vue';
import multiCheck from '@/components/game/multiCheck.vue';
import conceptTagging from '@/components/game/conceptTagging.vue';

const router = useRouter();
const { t, detectLanguage } = useTranslation();
const { handleScoreAction, markLevelAsCompleted } = useGameState(); 
detectLanguage();

const currentStep = ref(0);
const totalSteps = 8;
const isDataLoaded = ref(false);
const gameFinished = ref(false); // NEU für Konsistenz mit Quiz 1
const username = ref(''); // Für das Logging
const needsRemediation = reactive({ image71: false, image21: false });

// Logging inkl. Username
const logActivity = async (payload) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    try {
        await supabase.from('spiel_aktivitaeten').insert({
            user_id: user.id,
            level_id: 2, // KORREKT: Level 2
            step_id: currentStep.value,
            task_type: payload.taskType,
            is_correct: payload.isCorrect,
            image_name: payload.imageName || username.value // Wir loggen den Username mit
        });
    } catch (e) { console.error("Log error:", e); }
};

onMounted(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return router.push('/login');
    
    // Username für Logging holen
    const { data: profile } = await supabase.from('spielerprofile').select('username').eq('user_id', user.id).single();
    username.value = profile?.username || user.email.split('@')[0];
    
    isDataLoaded.value = true; 
});

const nextStep = () => {
    currentStep.value++;
    window.scrollTo(0, 0);
};

const handleSpotFakeSuccess = (aiImageName) => {
    logActivity({ taskType: 'spot_fake', imageName: aiImageName, isCorrect: true });
    nextStep();
};

const handleMultiCheckResult = (result) => {
    const allCorrect = result.image71Correct && result.image21Correct;
    handleScoreAction(allCorrect, 2); // KORREKT: ID 2
    logActivity({ taskType: 'multi_check', isCorrect: allCorrect });

    needsRemediation.image71 = !result.image71Correct;
    needsRemediation.image21 = !result.image21Correct;

    if (needsRemediation.image71) currentStep.value = 3; 
    else if (needsRemediation.image21) currentStep.value = 4; 
    else currentStep.value = 5;
    window.scrollTo(0, 0);
};

const handleConceptCompleted = () => {
    handleScoreAction(true, 2); // KORREKT: ID 2
    nextStep();
};

const finishLevel = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        await supabase.from('level_fortschritt').upsert({
            user_id: user.id, 
            level_id: 2, // Schaltet das nächste Level auf der Map frei
            score: 100
        }, { onConflict: 'user_id,level_id' });
        
        markLevelAsCompleted(2); // Lokale Sperre
    }
    gameFinished.value = true; // Zeigt Ergebnis-Karte
};

const goBackToMap = () => router.push('/levels');
</script>

<template>
    <div class="content-wrapper">
        <div v-if="!isDataLoaded" class="loading-screen">{{ t('generic.loading') }}</div>
        
        <div v-else class="level-container">
            <div class="level-progress-bar" v-if="!gameFinished">
                <span>Hintergründe: Schritt {{ currentStep + 1 }} / {{ totalSteps }}</span>
                <div class="progress-track">
                    <div class="progress-fill" :style="{ width: ((currentStep + 1) / totalSteps * 100) + '%' }"></div>
                </div>
            </div>

            <!-- STEPS (v-if / v-else-if Logik) -->
            <template v-if="!gameFinished">
                <spotTheFake 
                    v-if="currentStep === 0"
                    :levelId="2" 
                    aiImage="Image_0024.jpg"
                    :realCount="3"
                    :questionText="t('level1.step0.question')"
                    @completed="handleSpotFakeSuccess"
                />

                <analysis 
                    v-else-if="currentStep === 1"
                    image="Image_0024.jpg"
                    :title="t('level1.step1.title')"
                    :text="t('level1.step1.text')"
                    @next="nextStep"
                />

                <multiCheck 
                    v-else-if="currentStep === 2"
                    imageLeft="Image_0071.jpg"
                    imageRight="Image_0021.jpg"
                    correctOption="both"
                    :levelId="2"
                    @completed="handleMultiCheckResult"
                />

                <!-- ... (Andere Analysis Steps hier einfügen) ... -->

                <conceptTagging 
                    v-else-if="currentStep === 6"
                    :images="['Image_0014.jpg', 'Image_0055.jpg', 'Image_0035.jpg']"
                    :levelId="2"
                    @completed="handleConceptCompleted" 
                />

                <analysis 
                    v-else-if="currentStep === 7"
                    :title="t('level1.step7.title')"
                    buttonText="Abschließen"
                    @next="finishLevel"
                />
            </template>

            <!-- ERGEBNIS-KARTE (Wie in Quiz 1) -->
            <div v-if="gameFinished" class="neo-card result-card" style="text-align:center;">
                <h2 class="neo-title">Level abgeschlossen!</h2>
                <p>Du hast gelernt, wie Hintergründe KI verraten können.</p>
                <button class="neo-btn" @click="goBackToMap">Zurück zur Map</button>
            </div>
        </div>
    </div>
</template>