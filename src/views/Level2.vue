<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js';

// Komponenten
import spotTheFake from '@/components/game/spotTheFake.vue';
import analysis from '@/components/game/analysis.vue';
import singleChoice from '@/components/game/singleChoice.vue';
import gridSelect from '@/components/game/gridSelect.vue';    
import conceptTagging from '@/components/game/conceptTagging.vue';

const router = useRouter();
const { t, detectLanguage } = useTranslation();
detectLanguage();

const currentStep = ref(0);
const isDataLoaded = ref(false);

// Bild-Pools
const realImagesStep0 = ref([]); 
const realImagesStep3 = ref([]); 
const realImage25 = ref('Image_0025.jpg'); 

// --- LOGGING ---
const logActivity = async (payload) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    try {
        await supabase.from('spiel_aktivitaeten').insert({
            user_id: user.id,
            level_id: 2,
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

onMounted(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return router.push('/login');

    const { data: storageData, error } = await supabase.storage.from('Real-Images').list();
    if (error) console.error(error);
    
    if (storageData) {
        const allReal = storageData
            .filter(f => f.name.toLowerCase().match(/\.(jpg|png)$/))
            .map(f => f.name);

        realImage25.value = allReal.find(n => n.includes('0025')) || allReal[0];

        const shuffled = allReal.sort(() => 0.5 - Math.random());
        realImagesStep0.value = shuffled.slice(0, 3);
        realImagesStep3.value = shuffled.slice(3, 5);
    }
    
    isDataLoaded.value = true;
});

// --- NAVIGATION & HANDLERS ---

const nextStep = () => {
    // Schritt-Abschluss loggen
    logActivity({
        taskType: 'navigation',
        isCorrect: true,
        interactionType: 'step_completed'
    });
    currentStep.value++;
    window.scrollTo(0, 0);
};

// Fehler-Handler für SpotTheFake etc.
const handleMistake = (context) => {
    logActivity({
        taskType: 'generic_game',
        imageName: typeof context === 'string' ? context : null,
        isCorrect: false,
        interactionType: 'click_wrong'
    });
};

const finishLevel = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
        // Prüfen ob ID 3 schon existiert
        const { data: existing } = await supabase
            .from('level_fortschritt')
            .select('*')
            .eq('user_id', user.id)
            .eq('level_id', 3) 
            .single();

        if (!existing) {
            await supabase.from('level_fortschritt').insert({
                user_id: user.id,
                level_id: 3, // <--- WICHTIG: 3
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
            <div class="level-progress">Level 3: Hauttexturen - Schritt {{ currentStep + 1 }}</div>

            <!-- SCHRITT 0: Spot the Fake -->
            <spotTheFake 
                v-if="currentStep === 0"
                aiImage="Image_0020.jpg"
                :realImages="realImagesStep0"
                :questionText="t('level2.step0.question')"
                :successText="t('level2.step0.success')"
                @mistake="handleMistake"
                @completed="nextStep"
            />

            <!-- SCHRITT 1: Quiz -->
            <singleChoice
                v-if="currentStep === 1"
                image="Image_0020.jpg"
                :question="t('level2.step1.question')"
                :options="[
                    {id: 'nose', text: t('level2.step1.options.nose')},
                    {id: 'skin', text: t('level2.step1.options.skin')},
                    {id: 'eyes', text: t('level2.step1.options.eyes')},
                    {id: 'hair', text: t('level2.step1.options.hair')}
                ]"
                
                correctId="skin"
                :feedbackText="t('level2.step1.feedback')"
                @mistake="handleMistake"
                @completed="nextStep"
            />

            <!-- SCHRITT 2: Analyse -->
            <analysis
                v-if="currentStep === 2"
                image="Image_0020.jpg"
                :title="t('level2.step2.title')"
                :text="t('level2.step2.text')"
                :buttonText="t('generic.understood')"
                @next="nextStep"
            />

            <!-- SCHRITT 3: Grid Select -->
            <gridSelect
                v-if="currentStep === 3"
                :images="[
                    { src: 'Image_0082.jpg', type: 'ai', bucket: 'Fake-Images' },
                    { src: realImagesStep3[0], type: 'real', bucket: 'Real-Images' },
                    { src: 'Image_0079.jpg', type: 'ai', bucket: 'Fake-Images' },
                    { src: realImagesStep3[1], type: 'real', bucket: 'Real-Images' }
                ].sort(() => 0.5 - Math.random())" 
                :question="t('level2.step3.question')"
                :successText="t('level2.step3.success')"
                @completed="nextStep"
            />

            <!-- SCHRITT 4: Concept Tagging -->
            <conceptTagging
                v-if="currentStep === 4"
                :images="['Image_0053.jpg']"
                :question="t('level2.step4.question')"
                :subtitle="t('level2.step4.subtitle')"
                :terms="[
                    {id: 'smooth', text: t('level2.step4.terms.smooth')},
                    {id: 'eyes', text: t('level2.step4.terms.eyes')},
                    {id: 'wrinkles', text: t('level2.step4.terms.wrinkles')},
                    {id: 'tattoos', text: t('level2.step4.terms.tattoos')}
                ]"
                :correctIds="['smooth', 'wrinkles']"
                :feedbackText="t('level2.step4.feedback')"
                @completed="nextStep"
            />

            <!-- SCHRITT 5: Vergleich -->
            <analysis
                v-if="currentStep === 5"
                :image="['Image_0053.jpg',  'realImage25']" 
                :title="t('level2.step5.title')"
                :text="t('level2.step5.text')"
                :buttonText="t('generic.next')"
                @next="nextStep"
            />

            <!-- SCHRITT 6: Abschluss -->
            <analysis
                v-if="currentStep === 6"
                image="Image_0020.jpg" 
                :title="t('level2.step6.title')"
                :text="t('level2.step6.text')"
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