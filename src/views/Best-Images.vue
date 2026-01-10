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
const userId = ref(null);
const username = ref('');

const BUCKET = 'Nanobanana-Images';

/* ---------- PRELOADER ---------- */
const preloadAllAssets = (urls) => {
    return Promise.all(urls.map(url => new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
        img.onerror = resolve;
    })));
};

// ZENTRALES LOGGING (Verhindert Abstürze bei anonymen Usern)
const logActivity = async (isCorrect, interaction, taskType = 'step') => {
    if (!userId.value) return;
    try {
        await supabase.from('spiel_aktivitaeten').insert({
            user_id: userId.value,
            level_id: 8,
            step_id: currentStep.value,
            task_type: taskType,
            image_name: 'level8_asset',
            is_correct: isCorrect,
            interaction_type: interaction
        });
    } catch (e) {
        console.warn("Log failed silently");
    }
};

onMounted(async () => {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return router.push('/login');
        userId.value = user.id;

        // FIX: Sicherer Username-Fallback (Wichtig für anonyme User!)
        const { data: profile } = await supabase.from('spielerprofile').select('username').eq('user_id', user.id).maybeSingle();
        username.value = profile?.username || `Guest_${user.id.slice(0, 5)}`;

        const realPosts1 = await fetchRandomRealImages(3, 'squarish');
        const realPosts2 = await fetchRandomRealImages(3, 'squarish');

        const getUrl = (name) => supabase.storage.from(BUCKET).getPublicUrl(name).data.publicUrl;

        // Accounts generieren
        accounts.value = [
            { 
                id: 'real1', name: 'Tom_Travels', isFake: false, followers: '1.2k', joined: `März 2019`, hasAds: false, 
                bio: 'Exploring the world 🌍', avatarColor: '#4A90E2', posts: realPosts1 
            },
            { 
                id: 'real2', name: 'Sarah_Art', isFake: false, followers: '4.8k', joined: `August 2021`, hasAds: false, 
                bio: 'Artist & Curator 🎨', avatarColor: '#F5A623', posts: realPosts2 
            },
            { 
                id: 'fake_inf', name: 'Lara_Life', isFake: true, followers: '280k', joined: `Dezember 2025`, hasAds: true, 
                bio: 'Fashion | Buy my product here: "Link" 💄 ', avatarColor: '#FF69B4', 
                posts: [ { src: getUrl('Image_0014.png') }, { src: getUrl('Image_0009.png') }, { src: getUrl('Image_0008.png') } ] 
            },
            {
                id: 'fake_inf2', name: 'Brenda Hadid', isFake: true, followers: '950k', joined: `November 2025`, hasAds: false, 
                bio: 'Special girl doing special Things', avatarColor: '#8A2BE2', 
                posts: [ { src: getUrl('Image_0032.png') }, { src: getUrl('Image_0023.png') }, { src: getUrl('Image_0022.png') } ]
            },
            { 
                id: 'fake_news', name: 'Peter_Behrens', isFake: true, followers: '15.2k', joined: `November 2025`, hasAds: false, 
                bio: 'Uncensored News 👁️', avatarColor: '#333333', 
                posts: [ { src: getUrl('Image_0012.png') }, { src: getUrl('Image_0013.png') } ] 
            }
        ].sort(() => 0.5 - Math.random());

        // 2. ALLE URLs sammeln
        const urlsToPreload = [];
        realPosts1.forEach(p => urlsToPreload.push(p.src));
        realPosts2.forEach(p => urlsToPreload.push(p.src));
        urlsToPreload.push(getUrl('Image_0045.jpg'), getUrl('Image_0002.png'), getUrl('Image_0015.png'));
        ['Image_0014.png', 'Image_0009.png', 'Image_0008.png', 'Image_0032.png', 'Image_0023.png', 'Image_0022.png', 'Image_0012.png', 'Image_0013.png'].forEach(n => urlsToPreload.push(getUrl(n)));

        await preloadAllAssets(urlsToPreload);
        isDataLoaded.value = true;
        detectLanguage();
    } catch (e) { console.error(e); }
});

const finishLevel = async () => {
    if (userId.value) {
        await supabase.from('level_fortschritt').upsert({ user_id: userId.value, level_id: 8, score: 100 }, { onConflict: 'user_id,level_id' });
        markLevelAsCompleted(8);
    }
    gameFinished.value = true;
};
</script>

<template>
    <div class="content-wrapper">
        <div v-if="!isDataLoaded" class="loading-screen">
            <div class="loader-spinner"></div>
            <p>{{ t('generic.loading') }}</p>
        </div>
        <div v-else class="level-container">
            <template v-if="!gameFinished">
                <div class="level-header-title">{{ t('level8.title') }}</div>
                <div class="level-progress-bar">
                    <!-- Wir haben 6 aktive Schritte vor dem Abschluss -->
                    <span>{{ t('generic.step') }} {{ currentStep + 1 }} / 6</span>
                    <div class="progress-track"><div class="progress-fill" :style="{ width: ((currentStep + 1) / 6 * 100) + '%' }"></div></div>
                </div>

                <!-- SCHRITT 0: Analyse -->
                <analysis v-if="currentStep === 0" :title="t('level8.step0.title')" :text="t('level8.step0.text')" @next="currentStep++" />
                
                <!-- SCHRITT 1: Quiz (Context) -->
                <singleChoice 
                    v-else-if="currentStep === 1" 
                    :levelId="8" 
                    :image="{ src: 'Image_0045.jpg', bucket: BUCKET }" 
                    :question="t('level8.step1.question')" 
                    correctId="scene" 
                    :options="[{id:'scene', text: t('level8.step1.options.scene')}, {id:'quality', text: t('level8.step1.options.quality')}, {id:'filter', text: t('level8.step1.options.filter')}]" 
                    :feedbackText="t('level8.step1.feedback')" 
                    :failFeedbackText="t('level8.step1.fail')"
                    @completed="currentStep++" 
                    @answer-checked="(isCorrect, interaction) => logActivity(isCorrect, interaction, 'quiz_context_nano')"                 
                />
                
                <!-- SCHRITT 2: Spot the Fake (Clickbait) -->
                <spotTheFake 
                    v-else-if="currentStep === 2" 
                    :levelId="8" 
                    :aiImage="{ src: 'Image_0002.png', bucket: BUCKET }" 
                    :realImages="[{ src: 'Image_0015.png', bucket: BUCKET}]" 
                    :questionText="t('level8.step2.question')" 
                    :feedbackText="t('level8.step2.fail')" 
                    @completed="currentStep++" 
                    @answer-checked="(isCorrect, interaction) => logActivity(isCorrect, interaction, 'spot_fake_clickbait_nano')"
                />

                <analysis v-else-if="currentStep === 3" :title="t('level8.step3.title')" :text="t('level8.step3.text')" @next="currentStep++" />
                
                <!-- SCHRITT 4: Social Feed -->
                <fakeSocialFeed 
                    v-else-if="currentStep === 4" 
                    :accounts="accounts" 
                    :levelId="8"
                    @completed="currentStep++" 
                    @answer-checked="(isCorrect, interaction) => logActivity(isCorrect, interaction, 'social_feed_total_nano')"
                />

                <!-- SCHRITT 5: Analyse & Abschluss-Trigger -->
                <analysis v-else-if="currentStep === 5" :title="t('level8.analysis.title')" :text="t('level8.analysis.text')" :buttonText="t('generic.completeLevel')" @next="finishLevel" />
            </template>

            <!-- EINZIGES FINISH DISPLAY -->
            <div v-if="gameFinished" class="neo-card result-card" style="text-align:center;">
                <h2 class="neo-title">{{ t('level8.endTitle') }}</h2>
                <p style="margin: 1.5rem 0;">{{ t('level8.finish.text') }}</p>
                <button class="neo-btn" @click="router.push('/levels')">{{ t('generic.backToMap') }}</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.level-container { width: 100%; max-width: 50rem; margin: 0 auto; padding: 2rem 1rem; }
.level-progress { text-align: center; font-weight: 800; margin-bottom: 1.5rem; border-bottom: 3px solid #000; }
.loading-screen { text-align: center; margin-top: 20vh; font-weight: bold; }
</style>