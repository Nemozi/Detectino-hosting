<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js';

// Komponenten
import spotTheFake from '@/components/game/spotTheFake.vue';
import analysis from '@/components/game/analysis.vue';
import singleChoice from '@/components/game/singleChoice.vue';

const router = useRouter();
const { t, detectLanguage } = useTranslation();
detectLanguage();

const currentStep = ref(0);
const isDataLoaded = ref(false);

// Bild-Variablen
const realImage27 = ref(''); 
const randomRealImages = ref([]); 

// --- LOGGING ---
const logActivity = async (payload) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    try {
        await supabase.from('spiel_aktivitaeten').insert({
            user_id: user.id,
            level_id: 4, // Level 4 = Gesichtsausdrücke
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

    const { data: storageData, error } = await supabase.storage.from('Real-Images').list();
    if (error) console.error(error);
    
    if (storageData) {
        const allReal = storageData
            .filter(f => f.name.toLowerCase().match(/\.(jpg|png)$/))
            .map(f => f.name);

        // 1. Suche spezifisches echtes Bild (Image_0027) für den Vergleich
        realImage27.value = allReal.find(n => n.includes('0027')) || allReal[0];

        // 2. Suche 3 zufällige echte Bilder für die letzte Aufgabe
        const shuffled = allReal.sort(() => 0.5 - Math.random());
        // Sicherstellen, dass wir nicht Image 27 nochmal nehmen, falls möglich
        randomRealImages.value = shuffled.filter(n => n !== realImage27.value).slice(0, 3);
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

const finishLevel = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        const { data: existing } = await supabase
            .from('level_fortschritt')
            .select('*')
            .eq('user_id', user.id)
            .eq('level_id', 5) 
            .single();

        if (!existing) {
            await supabase.from('level_fortschritt').insert({
                user_id: user.id,
                level_id: 5, 
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
            <div class="level-progress">Level 4: Gesichtsausdrücke - Schritt {{ currentStep + 1 }}</div>

            <!-- SCHRITT 0: Single Choice (Was fällt auf?) -->
            <singleChoice
                v-if="currentStep === 0"
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
                @mistake="handleMistake"
                @completed="nextStep"
            />

            <!-- SCHRITT 1: Analyse mit Heatmap -->
            <analysis
                v-if="currentStep === 1"
                :image="[
                    { src: 'Image_0002.jpg', bucket: 'Fake-best-Images' },
                    { src: 'Heatmap_0002.png', bucket: 'Heatmaps-best' }
                ]"
                :title="t('level4.step1.title')"
                :text="t('level4.step1.text')"
                :buttonText="t('generic.understood')"
                @next="nextStep"
            />

            <!-- SCHRITT 2: Spot Fake (Vergleich Kind: Fake 25 vs Echt 27) -->
            <!-- Hinweis: spotTheFake erwartet, dass man das KI Bild klickt. -->
            <spotTheFake 
                v-if="currentStep === 2"
                :aiImage="{ src: 'Image_0025.jpg', bucket: 'Fake-best-Images' }"
                :realImages="[realImage27]"
                :questionText="t('level4.step2.question')"
                :successText="t('level4.step2.success')"
                @mistake="handleMistake"
                @completed="nextStep"
            />

            <!-- SCHRITT 3: Analyse Fake Kind (25) mit Heatmap -->
            <analysis
                v-if="currentStep === 3"
                :image="[
                    { src: 'Image_0025.jpg', bucket: 'Fake-best-Images' },
                    { src: 'Heatmap_0025.png', bucket: 'Heatmaps-best' }
                ]"
                :title="t('level4.step3.title')"
                :text="t('level4.step3.text')"
                :buttonText="t('generic.next')"
                @next="nextStep"
            />

            <!-- SCHRITT 4: Spot Fake (1 vs 3) mit Bild 15 -->
            <spotTheFake 
                v-if="currentStep === 4"
                aiImage="Image_0015.jpg"
                :realImages="randomRealImages"
                :questionText="t('level4.step4.question')"
                :successText="t('level4.step4.success')"
                @mistake="handleMistake"
                @completed="nextStep"
            />

            <!-- SCHRITT 5: Abschluss -->
            <analysis
                v-if="currentStep === 5"
                :image="[{ src: 'Image_0027.jpg', bucket: 'Fake-Images' },
                 { src: 'Heatmap_0027.png', bucket: 'Heatmaps' }]"
                :title="t('level4.step5.title')"
                :text="t('level4.step5.text')"
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