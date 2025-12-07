<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js';

// Komponenten
import spotTheFake from '@/components/game/spotTheFake.vue';
import analysis from '@/components/game/analysis.vue';
import singleChoice from '@/components/game/singleChoice.vue';
import conceptTagging from '@/components/game/conceptTagging.vue';
import imageMatching from '@/components/game/imageMatching.vue'; 

const router = useRouter();
const { t, detectLanguage } = useTranslation();
detectLanguage();

const currentStep = ref(0);
const isDataLoaded = ref(false);

const realImage26 = ref(''); 
const realImagesStep3 = ref([]); 

const logActivity = async (payload) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    try {
        await supabase.from('spiel_aktivitaeten').insert({
            user_id: user.id,
            level_id: 4, 
            step_id: currentStep.value,
            task_type: payload.taskType,
            image_name: payload.imageName || null,
            is_correct: payload.isCorrect,
            interaction_type: payload.interactionType
        });
    } catch (e) { console.error(e); }
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

        realImage26.value = allReal.find(n => n.includes('0026')) || allReal[0];

        const shuffled = allReal.sort(() => 0.5 - Math.random());
        realImagesStep3.value = shuffled.slice(0, 3);
    }
    
    isDataLoaded.value = true;
});

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
        // Prüfen ob ID 4 schon existiert
        const { data: existing } = await supabase
            .from('level_fortschritt')
            .select('*')
            .eq('user_id', user.id)
            .eq('level_id', 4) 
            .single();

        if (!existing) {
            await supabase.from('level_fortschritt').insert({
                user_id: user.id,
                level_id: 4, 
                score: 100
            });
        } 
    }
    router.push('/levels');
};
</script>

<!-- Template bleibt wie du es hattest -->
<template>
    <div class="content-wrapper">
        <div v-if="!isDataLoaded" class="loading-screen">
            <div class="loader">{{ t('generic.loading') }}</div>
        </div>

        <div v-else class="level-container">
            <div class="level-progress">Level 3: Farben - Schritt {{ currentStep + 1 }}</div>

            <!-- SCHRITT 0: Spot Fake (Fake-Best 18 vs Real 26) -->
            <spotTheFake 
                v-if="currentStep === 0"
                :aiImage="{ src: 'Image_0018.jpg', bucket: 'Fake-best-Images' }"
                :realImages="[realImage26]"
                :questionText="t('level3.step0.question')"
                :successText="t('level3.step0.success')"
                @mistake="handleMistake"
                @completed="nextStep"
            />

            <!-- SCHRITT 1: Quiz (Warum Bild 18?) -->
            <singleChoice
                v-if="currentStep === 1"
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
                @mistake="handleMistake"
                @completed="nextStep"
            />

            <!-- SCHRITT 2: Theorie Quiz -->
            <singleChoice
                v-if="currentStep === 2"
                :question="t('level3.step2.question')"
                :options="[
                    {id: 'all', text: t('level3.step2.options.all')},
                    {id: 'indicator', text: t('level3.step2.options.indicator')},
                    {id: 'none', text: t('level3.step2.options.none')}
                ]"
                correctId="indicator"
                :feedbackText="t('level3.step2.feedback')"
                @mistake="handleMistake"
                @completed="nextStep"
            />

            <!-- SCHRITT 3: Spot Fake (Türkise Haare - Fake 83) -->
            <spotTheFake 
                v-if="currentStep === 3"
                :aiImage="{ src: 'Image_0083.jpg', bucket: 'Fake-Images' }"
                :realImages="realImagesStep3"
                :questionText="t('level3.step3.question')"
                :successText="t('level3.step3.success')"
                @mistake="handleMistake"
                @completed="nextStep"
            />

            <!-- SCHRITT 4: Analyse Türkise Haare -->
            <analysis
                v-if="currentStep === 4"
                image="Image_0083.jpg"
                :title="t('level3.step4.title')"
                :text="t('level3.step4.text')"
                :buttonText="t('generic.understood')"
                @next="nextStep"
            />

            <!-- SCHRITT 5: Concept Tagging (Bild 47) -->
            <conceptTagging 
                v-if="currentStep === 5"
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

            <!-- SCHRITT 6: Heatmap Analyse -->
            <analysis
                v-if="currentStep === 6"
                :image="[
                    { src: 'Image_0047.jpg', bucket: 'Fake-Images' },
                    { src: 'Heatmap_0047.png', bucket: 'Heatmaps' } 
                ]"
                :title="t('level3.step6.title')"
                :text="t('level3.step6.text')"
                :buttonText="t('generic.next')"
                @next="nextStep"
            />

            <!-- SCHRITT 7: Image Matching (Neu) -->
            <imageMatching
                v-if="currentStep === 7"
                :question="t('level3.step7.question')"
                :terms="[
                    { id: 'sat', text: t('level3.step7.terms.sat') },
                    { id: 'hair', text: t('level3.step7.terms.hair') },
                    { id: 'smooth', text: t('level3.step7.terms.smooth') }
                ]"
                :items="[
                    { id: 'img22', src: 'Image_0022.jpg', bucket: 'Fake-best-Images', correctTermId: 'sat' },
                    { id: 'img32', src: 'Image_0032.jpg', bucket: 'Fake-Images', correctTermId: 'hair' },
                    { id: 'img21', src: 'Image_0021.jpg', bucket: 'Fake-best-Images', correctTermId: 'smooth' }
                ]"
                :successText="t('level3.step7.success')"
                @completed="nextStep"
            />

            <!-- SCHRITT 8: Abschluss (Bild 06 aus best_generated) -->
            <analysis 
                v-if="currentStep === 8"
                :image="{ src: 'Image_0006.jpg', bucket: 'Fake-best-Images' }"
                :title="t('level3.step8.title')"
                :text="t('level3.step8.text')"
                :buttonText="t('generic.finish')"
                @next="finishLevel"
            />

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