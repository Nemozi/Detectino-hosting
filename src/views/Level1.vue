<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js';

import spotTheFake from '@/components/game/spotTheFake.vue';
import analysis from '@/components/game/analysis.vue';
import multiCheck from '@/components/game/multiCheck.vue';
import conceptTagging from '@/components/game/conceptTagging.vue';

const router = useRouter();
const { t, detectLanguage } = useTranslation();
detectLanguage();

const currentStep = ref(0);
const isDataLoaded = ref(false);

const needsRemediation = reactive({
    image71: false,
    image21: false
});

// --- LOGGING ---
const logActivity = async (payload) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    try {
        await supabase.from('spiel_aktivitaeten').insert({
            user_id: user.id,
            level_id: 1, // ID 1 (oder 2 je nach deiner Zählung in der DB)
            step_id: currentStep.value,
            task_type: payload.taskType,
            image_name: payload.imageName || null,
            is_correct: payload.isCorrect,
            interaction_type: payload.interactionType
        });
    } catch (e) {
        console.error("Log error:", e);
    }
};

// --- DATA LOADING ---
onMounted(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return router.push('/login');

    // Wir müssen keine Bilder mehr vorladen, das macht jetzt die Komponente via Unsplash!
    isDataLoaded.value = true; 
});

// --- HANDLERS & NAVIGATION ---

const handleSpotFakeError = (imageName) => {
    logActivity({
        taskType: 'spot_fake',
        imageName: imageName,
        isCorrect: false,
        interactionType: 'click_wrong'
    });
};

const handleSpotFakeSuccess = (aiImageName) => {
    logActivity({
        taskType: 'spot_fake',
        imageName: aiImageName,
        isCorrect: true,
        interactionType: 'completed_step'
    });
    nextStep();
};

const nextStep = () => {
    currentStep.value++;
    window.scrollTo(0, 0);
};

const handleMultiCheckResult = (result) => {
    const allCorrect = result.image71Correct && result.image21Correct;
    logActivity({
        taskType: 'multi_check',
        isCorrect: allCorrect,
        interactionType: 'completed_step'
    });

    needsRemediation.image71 = !result.image71Correct;
    needsRemediation.image21 = !result.image21Correct;

    if (needsRemediation.image71) {
        currentStep.value = 3; 
    } else if (needsRemediation.image21) {
        currentStep.value = 4; 
    } else {
        currentStep.value = 5;
    }
    window.scrollTo(0, 0);
};

const afterRemediation71 = () => {
    if (needsRemediation.image21) {
        currentStep.value = 4;
    } else {
        currentStep.value = 5;
    }
    window.scrollTo(0, 0);
};

const finishLevel = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
        // Level ID 2 für Hintergründe speichern
        const { data: existing } = await supabase
            .from('level_fortschritt')
            .select('*')
            .eq('user_id', user.id)
            .eq('level_id', 2) 
            .single();

        if (!existing) {
            await supabase.from('level_fortschritt').insert({
                user_id: user.id,
                level_id: 2, 
                score: 100
            });
        } 
    }
    router.push('/levels');
};
</script>

<template>
    <div class="content-wrapper">
        <div v-if="!isDataLoaded" class="loading-screen">
            <div class="loader">{{ t('generic.loading') }}</div>
        </div>

        <div v-else class="level-container">
            <div class="level-progress">Level 1: Hintergründe - Schritt {{ currentStep + 1 }}</div>

            <!-- SCHRITT 0: Spot Fake mit Unsplash -->
            <!-- Wir übergeben KEINE realImages -> Komponente lädt Unsplash -->
            <spotTheFake 
                v-if="currentStep === 0"
                aiImage="Image_0024.jpg"
                :realCount="3"
                collectionId="3320248"
                topic="portrait"
                :questionText="t('level1.step0.question')"
                :successText="t('level1.step0.success')"
                @mistake="handleSpotFakeError"
                @completed="handleSpotFakeSuccess"
            />

            <!-- SCHRITT 1: Analyse -->
            <analysis 
                v-if="currentStep === 1"
                image="Image_0024.jpg"
                :title="t('level1.step1.title')"
                :text="t('level1.step1.text')"
                :buttonText="t('generic.understood')"
                @next="nextStep"
            />

            <!-- SCHRITT 2: Multi Check -->
            <multiCheck 
                v-if="currentStep === 2"
                imageLeft="Image_0071.jpg"
                imageRight="Image_0021.jpg"
                correctOption="both"
                :questionText="t('level1.step2.question')"
                @completed="handleMultiCheckResult"
            />

            <!-- SCHRITT 3: Remediation 71 -->
            <analysis 
                v-if="currentStep === 3"
                image="Image_0071.jpg"
                :title="t('level1.step3.title')"
                :text="t('level1.step3.text')"
                :buttonText="t('generic.next')"
                @next="afterRemediation71"
            />

            <!-- SCHRITT 4: Remediation 21 -->
            <analysis 
                v-if="currentStep === 4"
                image="Image_0021.jpg"
                :title="t('level1.step4.title')"
                :text="t('level1.step4.text')"
                :buttonText="t('generic.next')"
                @next="nextStep"
            />

            <!-- SCHRITT 5: Spot Fake mit Unsplash (Wiederholung) -->
            <spotTheFake 
                v-if="currentStep === 5"
                aiImage="Image_0073.jpg"
                :realCount="3"
                topic="portrait outdoor"
                :questionText="t('level1.step5.question')"
                :successText="t('level1.step5.success')"
                @mistake="handleSpotFakeError"
                @completed="handleSpotFakeSuccess"
            />

            <!-- SCHRITT 6: Concept Tagging -->
            <conceptTagging 
                v-if="currentStep === 6"
                :images="['Image_0014.jpg', 'Image_0055.jpg', 'Image_0035.jpg']"
                :question="t('level1.step6.title')"
                :subtitle="t('level1.step6.subtitle')"
                :terms="[
                    { id: 'blurred', text: t('level1.step6.terms.blurred') },
                    { id: 'inconsistent', text: t('level1.step6.terms.inconsistent') },
                    { id: 'unrealistic', text: t('level1.step6.terms.unrealistic') },
                    { id: 'lighting', text: t('level1.step6.terms.lighting') }
                ]"
                :correctIds="['blurred', 'inconsistent', 'unrealistic', 'lighting']"
                :feedbackText="t('level1.step6.feedback')"
                @completed="nextStep"
            />

            <!-- SCHRITT 7: Finish -->
            <analysis 
                v-if="currentStep === 7"
                :image="['Image_0001.jpg', 'Image_0012.jpg']"
                :title="t('level1.step7.title')"
                :text="t('level1.step7.text')"
                :buttonText="t('generic.finish')"
                @next="finishLevel"
            />
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