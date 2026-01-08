<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js';
// HIER WAR DER FEHLER: Import hinzugefügt
import { useGameState } from '@/composables/useGameState.js'; 

// Komponenten
import spotTheFake from '@/components/game/spotTheFake.vue';
import analysis from '@/components/game/analysis.vue';
import singleChoice from '@/components/game/singleChoice.vue';

const router = useRouter();
const { t, detectLanguage } = useTranslation();
const { handleScoreAction, markLevelAsCompleted } = useGameState(); 

const totalSteps = 6; 
detectLanguage();

const currentStep = ref(0);
const isDataLoaded = ref(false);
const gameFinished = ref(false);
const username = ref('');

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
            level_id: 5, // KORREKT FÜR LEVEL 5
            step_id: currentStep.value,
            task_type: payload.taskType || 'step',
            image_name: payload.imageName || username.value,
            is_correct: payload.isCorrect ?? true,
            interaction_type: 'click'
        });
    } catch (e) { console.error("Logging error", e); }
};

// --- DATA LOADING ---
onMounted(async () => {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return router.push('/login');

        // Username für Logging laden
        const { data: profile } = await supabase.from('spielerprofile').select('username').eq('user_id', user.id).single();
        username.value = profile?.username || user.email.split('@')[0];

        const { data: storageData } = await supabase.storage.from('Real-Images').list();
        
        if (storageData) {
            const allReal = storageData
                .filter(f => f.name.toLowerCase().match(/\.(jpg|png|jpeg)$/))
                .map(f => f.name);

            // Suche spezifisches Bild oder Fallback
            realImage27.value = allReal.find(n => n.includes('0027')) || allReal[0];
            const shuffled = allReal.sort(() => 0.5 - Math.random());
            randomRealImages.value = shuffled.filter(n => n !== realImage27.value).slice(0, 3);
        }
    } catch (err) {
        console.warn("Storage-Fehler, nutze Fallbacks");
    } finally {
        // Stellt sicher, dass der graue Screen verschwindet
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
        await supabase.from('level_fortschritt').upsert({ 
            user_id: user.id, 
            level_id: 5, 
            score: 100 
        }, { onConflict: 'user_id,level_id' });
        markLevelAsCompleted(5);
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
            <template v-if="!gameFinished">
                <div class="level-header-title">Level 5: Gesichtsausdrücke</div>
                
                <!-- PROGRESS BAR -->
                <div class="level-progress-bar">
                    <span>Schritt {{ currentStep + 1 }} / {{ totalSteps }}</span>
                    <div class="progress-track">
                        <div class="progress-fill" :style="{ width: ((currentStep + 1) / totalSteps * 100) + '%' }"></div>
                    </div>
                </div>
            </template>

            <template v-if="!gameFinished">
                <!-- SCHRITT 0: Quiz (level4 in de.js) -->
                <singleChoice
                    v-if="currentStep === 0"
                    :levelId="5"
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
                    @completed="nextStep"
                />

                <!-- SCHRITT 1: Analyse -->
                <analysis
                    v-else-if="currentStep === 1"
                    :image="[
                        { src: 'Image_0002.jpg', bucket: 'Fake-best-Images' },
                        { src: 'Heatmap_0002.png', bucket: 'Heatmaps-best' }
                    ]"
                    :title="t('level4.step1.title')"
                    :text="t('level4.step1.text')"
                    @next="nextStep"
                />

                <!-- SCHRITT 2: Spot Fake -->
                <spotTheFake 
                    v-else-if="currentStep === 2"
                    :levelId="5"
                    :aiImage="{ src: 'Image_0025.jpg', bucket: 'Fake-best-Images' }"
                    :realImages="[realImage27]"
                    :questionText="t('level4.step2.question')"
                    :successText="t('level4.step2.success')"
                    @completed="nextStep"
                />

                <!-- SCHRITT 3: Analyse -->
                <analysis
                    v-else-if="currentStep === 3"
                    :image="[
                        { src: 'Image_0025.jpg', bucket: 'Fake-best-Images' },
                        { src: 'Heatmap_0025.png', bucket: 'Heatmaps-best' }
                    ]"
                    :title="t('level4.step3.title')"
                    :text="t('level4.step3.text')"
                    @next="nextStep"
                />

                <!-- SCHRITT 4: Spot Fake -->
                <spotTheFake 
                    v-else-if="currentStep === 4"
                    :levelId="5"
                    aiImage="Image_0015.jpg"
                    
                    :questionText="t('level4.step4.question')"
                    :successText="t('level4.step4.success')"
                    @completed="nextStep"
                />

                <!-- SCHRITT 5: Abschluss -->
                <analysis
                    v-else-if="currentStep === 5"
                    :image="[
                        { src: 'Image_0027.jpg', bucket: 'Fake-Images' },
                        { src: 'Heatmap_0027.png', bucket: 'Heatmaps' }
                    ]"
                    :title="t('level4.step5.title')"
                    :text="t('level4.step5.text')"
                    buttonText="Level abschließen"
                    @next="finishLevel"
                />
            </template>

            <!-- ERGEBNIS-KARTE -->
            <div v-if="gameFinished" class="neo-card result-card" style="text-align:center;">
                <h2 class="neo-title">Level abgeschlossen!</h2>
                <p>Du erkennst nun sogar subtile Fehler in der Mimik.</p>
                <button class="neo-btn" @click="goBackToMap">Zurück zur Map</button>
            </div>
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