<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js';
import { useUnsplash } from '@/composables/useUnsplash.js';
import { useGameState } from '@/composables/useGameState.js';

import spotTheFake from '@/components/game/spotTheFake.vue';
import singleChoice from '@/components/game/singleChoice.vue';
import analysis from '@/components/game/analysis.vue';
import fakeSocialFeed from '@/components/game/fakeSocialFeed.vue';

const router = useRouter();
const { t, detectLanguage } = useTranslation();
const { fetchRandomRealImages } = useUnsplash();
const { handleScoreAction, markLevelAsCompleted } = useGameState();

const currentStep = ref(0);
const totalSteps = 7; 
const isDataLoaded = ref(false);
const gameFinished = ref(false);
const accounts = ref([]);

const BUCKET = 'Nanobanana-Images';
const getUrl = (name) => supabase.storage.from(BUCKET).getPublicUrl(name).data.publicUrl;

onMounted(async () => {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return router.push('/login');

        const realPosts1 = await fetchRandomRealImages(3, 'squarish');
        const realPosts2 = await fetchRandomRealImages(3, 'squarish');

        // Accounts mit Farb-Avataren und Metadaten
        accounts.value = [
            { 
                id: 'real1', name: 'Tom_Travels', isFake: false, 
                followers: '1.2k', joined: 'März 2019', hasAds: false, 
                bio: 'Exploring the world 🌍', avatarColor: '#4A90E2', posts: realPosts1 
            },
            { 
                id: 'real2', name: 'Sarah_Art', isFake: false, 
                followers: '4.8k', joined: 'August 2021', hasAds: false, 
                bio: 'Artist & Curator 🎨', avatarColor: '#F5A623', posts: realPosts2 
            },
            { 
                id: 'fake_inf', name: 'Lara_Life', isFake: true, 
                followers: '280k', joined: 'Dezember 2025', hasAds: true, 
                bio: 'Fashion | Beauty 💄', avatarColor: '#FF69B4', 
                posts: [
                    { src: getUrl('Image_0014.png'), bucket: BUCKET }, 
                    { src: getUrl('Image_0009.png'), bucket: BUCKET },
                    { src: getUrl('Image_0008.png'), bucket: BUCKET }

                ] 
            },
            {
                id: 'fake_inf2', name: 'Brenda Hadid', isFake: true, 
                followers: '950k', joined: 'November 2025', hasAds: false, 
                bio: 'Special girl doing special Things', avatarColor: '#8A2BE2', 
                posts: [
                    { src: getUrl('Image_0032.png'), bucket: BUCKET }, 
                    { src: getUrl('Image_0023.png'), bucket: BUCKET },
                    { src: getUrl('Image_0022.png'), bucket: BUCKET }

                ]
            },
            { 
                id: 'fake_news', name: 'Peter_Behrens', isFake: true, 
                followers: '15.2k', joined: 'November 2025', hasAds: false, 
                bio: 'Uncensored News 👁️', avatarColor: '#333333', 
                posts: [
                    { src: getUrl('Image_0012.png'), bucket: BUCKET }, 
                    { src: getUrl('Image_0013.png'), bucket: BUCKET }
                ] 
            }
        ].sort(() => 0.5 - Math.random());

        isDataLoaded.value = true;
        detectLanguage();
    } catch (e) { console.error(e); }
});

const finishLevel = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        await supabase.from('level_fortschritt').upsert({ user_id: user.id, level_id: 8, score: 100 }, { onConflict: 'user_id,level_id' });
        markLevelAsCompleted(8);
    }
    gameFinished.value = true;
};
</script>

<template>
    <div class="content-wrapper">
        <div v-if="!isDataLoaded" class="loading-screen"><div class="loader-spinner"></div></div>
        <div v-else class="level-container">
            <template v-if="!gameFinished">
                <div class="level-header-title">Level 8: Moderne KIs</div>
                <div class="level-progress-bar">
                    <span>Schritt {{ currentStep + 1 }} / {{ totalSteps }}</span>
                    <div class="progress-track"><div class="progress-fill" :style="{ width: ((currentStep + 1) / totalSteps * 100) + '%' }"></div></div>
                </div>

                <analysis v-if="currentStep === 0" :title="t('level7.step0.title')" :text="t('level7.step0.text')" @next="currentStep++" />
                
                <!-- FIX: Hier sind jetzt 3 Optionen statt 2 -->
                <singleChoice 
                    v-else-if="currentStep === 1" 
                    :levelId="8" 
                    :image="{ src: 'Image_0003.png', bucket: BUCKET }" 
                    :question="t('level7.step1.question')" 
                    correctId="scene" 
                    :options="[
                        {id:'scene', text: t('level7.step1.options.scene')}, 
                        {id:'quality', text: t('level7.step1.options.quality')},
                        {id:'filter', text: t('level7.step1.options.filter')}
                    ]" 
                    :feedbackText="t('level7.step1.feedback')" 
                    @completed="currentStep++" 
                />
                
                <spotTheFake v-else-if="currentStep === 2" :levelId="8" :aiImage="{ src: 'Image_0002.png', bucket: BUCKET }" :realImages="[{ src: 'Image_0015.png', bucket: BUCKET}]" :questionText="t('level7.step2.question')" @completed="currentStep++" />
                <analysis v-else-if="currentStep === 3" :title="t('level7.step3.title')" :text="t('level7.step3.text')" @next="currentStep++" />
                
                <fakeSocialFeed v-else-if="currentStep === 4" :accounts="accounts" @completed="currentStep++" />

                <analysis v-else-if="currentStep === 5" title="Analyse" text="Bots erkennen bedeutet Kontext prüfen. Lara_Life hat 280k Follower in einem Monat gewonnen – das ist ein klares Zeichen für einen Bot." @next="currentStep++" />
                <analysis v-else-if="currentStep === 6" title="Abschluss" text="Glückwunsch! Du hast Level 8 beendet." buttonText="Spiel beenden" @next="finishLevel" />
            </template>
            <div v-if="gameFinished" class="neo-card" style="text-align:center;">
                <h2 class="neo-title">Abgeschlossen!</h2>
                <button class="neo-btn" @click="router.push('/levels')">Zurück zur Map</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.level-container { width: 100%; max-width: 50rem; margin: 0 auto; padding: 2rem 1rem; }
.level-progress { text-align: center; font-weight: 800; margin-bottom: 1.5rem; border-bottom: 3px solid #000; }
.loading-screen { text-align: center; margin-top: 20vh; font-weight: bold; }
</style>