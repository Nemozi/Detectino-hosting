<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js';

// Vorhandene Komponenten nutzen
import spotTheFake from '@/components/game/spotTheFake.vue';
import analysis from '@/components/game/analysis.vue';
import singleChoice from '@/components/game/singleChoice.vue';

const router = useRouter();
const { t, detectLanguage } = useTranslation();
detectLanguage();

const currentStep = ref(0);
const isDataLoaded = ref(false);
const realImagesStep1 = ref([]);

// --- LOGGING ---
const logActivity = async (payload) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    try {
        await supabase.from('spiel_aktivitaeten').insert({
            user_id: user.id,
            level_id: 5, // Bildfehler Level
            step_id: currentStep.value,
            task_type: payload.taskType,
            image_name: payload.imageName || null,
            is_correct: payload.isCorrect,
            interaction_type: payload.interactionType
        });
    } catch (e) { console.error(e); }
};

// --- DATA LOADING ---
onMounted(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return router.push('/login');

    const { data: storageData } = await supabase.storage.from('Real-Images').list();
    
    if (storageData) {
        const allReal = storageData
            .filter(f => f.name.toLowerCase().match(/\.(jpg|png)$/))
            .map(f => f.name);
        
        // 3 zufällige echte Bilder für den Start
        realImagesStep1.value = allReal.sort(() => 0.5 - Math.random()).slice(0, 3);
    }
    
    isDataLoaded.value = true;
});

// --- NAVIGATION ---
const nextStep = () => {
    currentStep.value++;
    window.scrollTo(0, 0);
};

const handleMistake = () => {
    logActivity({ taskType: 'generic', isCorrect: false, interactionType: 'mistake' });
};

// Selbst-Check loggen (Ja/Nein zählen wir als "Completed")
const handleSelfCheck = () => {
    logActivity({ taskType: 'self_check', isCorrect: true, interactionType: 'review' });
    nextStep();
};

const finishLevel = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        // Schaltet Level 7 frei (Da dies Level 6 in der Map Logik ist -> ID 7 speichern)
        // Oder Level 6, je nach deiner Zählung in LevelsView.vue.
        // Angenommen Anatomie/Bildfehler ist ID 6 -> speichere 6.
        await supabase.from('level_fortschritt').upsert({
            user_id: user.id,
            level_id: 6, 
            score: 100
        }, { onConflict: 'user_id, level_id' });
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
            <div class="level-progress">Level 5: Bildfehler - Schritt {{ currentStep + 1 }}</div>

            <!-- SCHRITT 0: Intro -->
            <analysis
                v-if="currentStep === 0"
                :title="t('level5.step0.title')"
                :text="t('level5.step0.text')"
                :buttonText="t('generic.next')"
                @next="nextStep"
            />

            <!-- SCHRITT 1: Spot Fake (Image 0004) -->
            <spotTheFake 
                v-if="currentStep === 1"
                :aiImage="{ src: 'Image_0004.jpg', bucket: 'Fake-Images' }"
                :realImages="realImagesStep1"
                :questionText="t('level5.step1.question')"
                :successText="t('level5.step1.success')"
                @mistake="handleMistake"
                @completed="nextStep"
            />

            <!-- SCHRITT 2: Analyse 0004 -->
            <analysis
                v-if="currentStep === 2"
                :image="[
                    { src: 'Image_0004.jpg', bucket: 'Fake-Images' },
                    { src: 'Heatmap_0004.png', bucket: 'Heatmaps' }
                ]"
                :title="t('level5.step2.title')"
                :text="t('level5.step2.text')"
                :buttonText="t('generic.understood')"
                @next="nextStep"
            />

            <!-- === LOOP 1: Bild 11 === -->
            <!-- Schritt 3: Nur Bild zeigen -->
            <analysis
                v-if="currentStep === 3"
                :image="{ src: 'Image_0011.jpg', bucket: 'Fake-best-Images' }"
                :title="t('level5.search_task')"
                :text="t('level5.img11')"
                buttonText="Lösung anzeigen"
                @next="nextStep"
            />
            <!-- Schritt 4: Lösung + Abfrage -->
            <singleChoice
                v-if="currentStep === 4"
                :image="[
                    { src: 'Image_0011.jpg', bucket: 'Fake-best-Images' },
                    { src: 'Heatmap_0011.png', bucket: 'Heatmaps-best' }
                ]"
                :question="t('level5.check_question')"
                :options="[{id:'yes', text:t('level5.options.yes')}, {id:'no', text:t('level5.options.no')}]"
                correctId="yes" :feedbackText="t('level5.feedback')"
                @mistake="handleSelfCheck" @completed="handleSelfCheck"
            />

            <!-- === LOOP 2: Bild 12 === -->
            <analysis
                v-if="currentStep === 5"
                :image="{ src: 'Image_0012.jpg', bucket: 'Fake-best-Images' }"
                :title="t('level5.search_task')"
                buttonText="Lösung anzeigen"
                @next="nextStep"
            />
            <singleChoice
                v-if="currentStep === 6"
                :image="[
                    { src: 'Image_0012.jpg', bucket: 'Fake-best-Images' },
                    { src: 'Heatmap_0012.png', bucket: 'Heatmaps-best' }
                ]"
                :question="t('level5.check_question')"
                :options="[{id:'yes', text:t('level5.options.yes')}, {id:'no', text:t('level5.options.no')}]"
                correctId="yes" :feedbackText="t('level5.feedback')"
                @mistake="handleSelfCheck" @completed="handleSelfCheck"
            />

            <!-- === LOOP 3: Bild 48 === -->
            <analysis
                v-if="currentStep === 7"
                :image="{ src: 'Image_0048.jpg', bucket: 'Fake-best-Images' }"
                :title="t('level5.search_task')"
                buttonText="Lösung anzeigen"
                @next="nextStep"
            />
            <singleChoice
                v-if="currentStep === 8"
                :image="[
                    { src: 'Image_0048.jpg', bucket: 'Fake-Images' },
                    { src: 'Heatmap_0048.png', bucket: 'Heatmaps' }
                ]"
                :question="t('level5.check_question')"
                :options="[{id:'yes', text:t('level5.options.yes')}, {id:'no', text:t('level5.options.no')}]"
                correctId="yes" :feedbackText="t('level5.feedback')"
                @mistake="handleSelfCheck" @completed="handleSelfCheck"
            />

            <!-- === LOOP 4: Bild 67 === -->
            <analysis
                v-if="currentStep === 9"
                :image="{ src: 'Image_0067.jpg', bucket: 'Fake-best-Images' }"
                :title="t('level5.search_task')"
                buttonText="Lösung anzeigen"
                @next="nextStep"
            />
            <singleChoice
                v-if="currentStep === 10"
                :image="[
                    { src: 'Image_0067.jpg', bucket: 'Fake-Images' },
                    { src: 'Heatmap_0067.png', bucket: 'Heatmaps' }
                ]"
                :question="t('level5.check_question')"
                :options="[{id:'yes', text:t('level5.options.yes')}, {id:'no', text:t('level5.options.no')}]"
                correctId="yes" :feedbackText="t('level5.feedback')"
                @mistake="handleSelfCheck" @completed="handleSelfCheck"
            />

            <!-- SCHRITT 11: Asymmetrie (Brille) -->
            <analysis
                v-if="currentStep === 11"
                :image="[
                    { src: 'Image_0063.jpg', bucket: 'Fake-Images' },
                    { src: 'Heatmap_0063.png', bucket: 'Heatmaps' }
                ]"
                :title="t('level5.asymmetry.title')"
                :text="t('level5.asymmetry.text')"
                :buttonText="t('generic.next')"
                @next="nextStep"
            />

            <!-- SCHRITT 12: Weitere Beispiele (Bild 2) -->
            <analysis
                v-if="currentStep === 12"
                :image="{ src: 'Image_0002.jpg', bucket: 'Fake-Images' }"
                :title="t('level5.search_task')"
                buttonText="Lösung"
                @next="nextStep"
            />
            <singleChoice
                v-if="currentStep === 13"
                :image="[
                    { src: 'Image_0002.jpg', bucket: 'Fake-Images' },
                    { src: 'Heatmap_0002.png', bucket: 'Heatmaps' }
                ]"
                :question="t('level5.check_question')"
                :options="[{id:'yes', text:t('level5.options.yes')}, {id:'no', text:t('level5.options.no')}]"
                correctId="yes" :feedbackText="t('level5.feedback')"
                @mistake="handleSelfCheck" @completed="handleSelfCheck"
            />

            <!-- SCHRITT 14: Finish -->
            <analysis 
                v-if="currentStep === 14"
                :image="['Image_0004.jpg', 'Image_0063.jpg']"
                :title="t('level5.finish.title')"
                :text="t('level5.finish.text')"
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