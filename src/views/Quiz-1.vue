<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabaseClient.js'
import { useTranslation } from '@/composables/useTranslation.js'
import { useUnsplash } from '@/composables/useUnsplash.js'
import { useGameState } from '@/composables/useGameState.js' 

import RealOrFake from '@/components/game/realOrFake.vue'
import analysis from '@/components/game/analysis.vue'

const router = useRouter()
const { t } = useTranslation()
const { fetchRandomRealImages } = useUnsplash()
const { markLevelAsCompleted } = useGameState();

/* ---------- STATE ---------- */
const loading = ref(true)
const gameStarted = ref(false)
const gameFinished = ref(false)
const currentRound = ref(0)
const score = ref(0)
const roundsTotal = 10
const quizImages = ref([])
const roundFirstGuessMade = ref(false)
const username = ref('')

const BUCKET_NANO = 'Nanobanana-Images';
const BUCKET_STD = 'Fake-Images-Quiz';
const EXCLUDED_IDS = ['0001', '0002', '0003', '0004', '0005', '0006', '0007', '0008', '0009', '0010', '0011', '0012', '0013', '0014', '0015', '0022', '0023', '0032'];

const shuffle = arr => [...arr].sort(() => Math.random() - 0.5)

/* ---------- HELPER ---------- */
const preloadAllImages = (urls) => {
  return Promise.all(urls.map(url => new Promise(res => {
    const img = new Image(); 
    img.src = url; 
    img.onload = res; 
    img.onerror = res; 
  })));
};

const logActivity = async (isCorrect, interaction) => {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const currentImg = quizImages.value[currentRound.value];
        const { error } = await supabase.from('spiel_aktivitaeten').insert({
            user_id: user.id,
            level_id: 1,
            step_id: currentRound.value,
            task_type: `binary_${currentImg.source || 'standard'}`,
            image_name: currentImg.name,
            is_correct: isCorrect,
            interaction_type: interaction
        });
        if (error) console.error("Supabase Log Error:", error.message);
    } catch (e) { console.error("Logging failed:", e); }
};

const saveImageAsSeen = async (img) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return
  await supabase.from('gesehene_bilder').upsert({
    user_id: user.id, image_name: img.name, bucket_name: img.bucket
  }, { onConflict: 'user_id,image_name' })
}

/* ---------- DATA LOADING ---------- */
onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return router.push('/login')
  
  const { data: profile } = await supabase.from('spielerprofile').select('username').eq('user_id', user.id).maybeSingle();
  const emailName = user.email ? user.email.split('@')[0] : null;
  username.value = profile?.username || emailName || `Gast_${user.id.slice(0, 5)}`;

  loading.value = true

  const { data: seenData } = await supabase.from('gesehene_bilder').select('image_name').eq('user_id', user.id);
  const seenNames = seenData?.map(item => item.image_name) || []

  // 4 Real, 3 Std AI, 3 Nano AI
  const realPool = await fetchRandomRealImages(25);
  const realSelection = realPool.filter(img => !seenNames.includes(img.src)).slice(0, 4)
    .map(img => ({ src: img.src, name: img.src, isAi: false, bucket: 'Unsplash', source: 'real', credit: img.credit }));

  const stdPool = Array.from({ length: 100 }, (_, i) => ({
    name: `Image_${String(i + 1).padStart(4, '0')}.jpg`, bucket: BUCKET_STD, isAi: true, source: 'standard'
  })).filter(img => !seenNames.includes(img.name) && !EXCLUDED_IDS.some(id => img.name.includes(id)));
  const stdSelection = shuffle(stdPool).slice(0, 3).map(img => ({ ...img, src: img.name }));

  const nanoPool = Array.from({ length: 34 }, (_, i) => ({
    name: `Image_${String(i + 1).padStart(4, '0')}.png`, bucket: BUCKET_NANO, isAi: true, source: 'nanobanana'
  })).filter(img => !seenNames.includes(img.name) && !EXCLUDED_IDS.some(id => img.name.includes(id)));
  const nanoSelection = shuffle(nanoPool).slice(0, 3).map(img => ({ ...img, src: img.name }));

  quizImages.value = shuffle([...realSelection, ...stdSelection, ...nanoSelection]);

  const allUrls = quizImages.value.map(img => {
    if (img.isAi) return supabase.storage.from(img.bucket).getPublicUrl(img.src).data.publicUrl;
    return img.src;
  });

  await preloadAllImages(allUrls);
  loading.value = false
})

/* ---------- GAME LOGIC ---------- */
const handleAnswerChecked = (isCorrect, interaction) => { logActivity(isCorrect, interaction); };

const handleSuccess = () => {
  const currentImg = quizImages.value[currentRound.value]
  saveImageAsSeen(currentImg);
  if (!roundFirstGuessMade.value) score.value++
  roundFirstGuessMade.value = false
  if (currentRound.value < quizImages.value.length - 1) { currentRound.value++ } 
  else { gameFinished.value = true }
}

const finishLevel = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        await supabase.from('level_fortschritt').upsert({
            user_id: user.id, level_id: 1, score: score.value
        }, { onConflict: 'user_id,level_id' });
        markLevelAsCompleted(1); 
    }
    router.push('/levels');
}
</script>

<template>
  <div class="content-wrapper">
    <div v-if="loading" class="loading-screen">
        <div class="loader-spinner"></div>
        <p>{{ t('level0.loading') }}</p>
    </div>

    <div v-else class="level-container">
      <analysis 
        v-if="!gameStarted && !gameFinished" 
        :title="t('level0.introTitle')" 
        :text="t('level0.introText')" 
        :buttonText="t('level0.startBtn')" 
        @next="gameStarted = true" 
      />

      <div v-if="gameStarted && !gameFinished && quizImages[currentRound]">
        <div class="level-progress-bar">
            <span>{{ t('generic.image') }} {{ currentRound + 1 }} / {{ roundsTotal }}</span>
            <div class="progress-track">
                <div class="progress-fill" :style="{ width: ((currentRound + 1) / roundsTotal * 100) + '%' }"></div>
            </div>
        </div>

        <RealOrFake
          :key="currentRound"
          :imageData="quizImages[currentRound]"
          :levelId="1"
          @completed="handleSuccess"
          @mistake="roundFirstGuessMade = true"
          @answer-checked="handleAnswerChecked" 
        />
      </div>

      <div v-if="gameFinished" class="neo-card result-card" style="text-align:center;">
        <h2 class="neo-title">{{ t('level0.endTitle') }}</h2>
        <div class="score-display">{{ score }} / 10</div>
        <p>{{ t('level0.endText') }}</p>
        <button class="neo-btn" @click="finishLevel">{{ t('generic.completeLevel') }}</button>
      </div>
    </div>
  </div>
</template>

  <style scoped>
  .loading-screen { display: flex; flex-direction: column; justify-content: center; align-items: center; height: 50vh; font-weight: bold; gap: 1rem; }
  .score-display { font-size: 5rem; font-weight: 900; margin: 1rem 0; text-align: center;}
  .result-card { padding: 3rem; }
  </style>