<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabaseClient.js'
import { useTranslation } from '@/composables/useTranslation.js'
import { useUnsplash } from '@/composables/useUnsplash.js'
import { useGameState } from '@/composables/useGameState.js' 


import spotTheFake from '@/components/game/spotTheFake.vue'
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

const BUCKET = 'Nanobanana-Images';
const MAX_AVAILABLE = 44;
const EXCLUDED_IDS = ['0001', '0002', '0003', '0004', '0005', '0006', '0007', '0008', '0009', '0010', '0011', '0012', '0013', '0014', '0015', '0022', '0023','0031', '0032', '0033', '0036'];

const shuffle = arr => [...arr].sort(() => Math.random() - 0.5)

const preloadAllImages = (urls) => {
  return Promise.all(urls.map(url => new Promise(res => {
    const img = new Image(); 
    img.src = url; 
    img.onload = res; 
    img.onerror = res;
  })));
};

const logActivity = async (isCorrect, imgData) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from('spiel_aktivitaeten').insert({
        user_id: user.id,
        level_id: 9,
        step_id: currentRound.value,
        task_type: 'spot_fake_nanobanana_final',
        image_name: imgData.name,
        is_correct: isCorrect,
        interaction_type: `User: ${username.value}`
    });
};

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

  const fullPool = Array.from({ length: MAX_AVAILABLE }, (_, i) => ({
    name: `Image_${String(i + 1).padStart(4, '0')}.png`, bucket: BUCKET
  }));

  let available = fullPool.filter(img => {
      const id = img.name.split('_')[1].split('.')[0];
      return !EXCLUDED_IDS.includes(id) && !seenNames.includes(img.name);
  });

  if (available.length < roundsTotal) {
      available = fullPool.filter(img => !EXCLUDED_IDS.includes(img.name.split('_')[1].split('.')[0]));
  }

  const selection = shuffle(available).slice(0, roundsTotal);
  const allRealImages = await fetchRandomRealImages(30);

  quizImages.value = selection.map((ai, i) => ({
    ...ai,
    realImagesList: allRealImages.slice(i * 3, i * 3 + 3)
  }))

  const allUrlsToCache = [];
  quizImages.value.forEach(round => {
      const { data } = supabase.storage.from(round.bucket).getPublicUrl(round.name);
      allUrlsToCache.push(data.publicUrl);
      round.realImagesList.forEach(r => allUrlsToCache.push(r.src));
  });

  await preloadAllImages(allUrlsToCache);
  loading.value = false
})

/* ---------- GAME LOGIC ---------- */
const handleSuccess = () => {
  const currentImg = quizImages.value[currentRound.value]
  logActivity(!roundFirstGuessMade.value, currentImg);

  if (!roundFirstGuessMade.value) score.value++
  roundFirstGuessMade.value = false

  if (currentRound.value < quizImages.value.length - 1) {
    currentRound.value++
  } else {
    finishLevel()
  }
}

const triggerConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#edc531', '#000000'] });
        confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#edc531', '#000000'] });
        if (Date.now() < end) requestAnimationFrame(frame);
    }());
};

const finishLevel = async () => {
    // UI sofort umschalten
    gameFinished.value = true;

    // Confetti nur triggern, wenn kein Fehler geworfen wird
    try {
        triggerConfetti();
    } catch (e) {
        console.warn("Confetti library missing?");
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        // In die Datenbank schreiben
        const { error } = await supabase.from('level_fortschritt').upsert({
            user_id: user.id, 
            level_id: 9, // <--- Das muss exakt mit der ID in Levels.vue übereinstimmen
            score: score.value
        }, { onConflict: 'user_id,level_id' });

        if (!error) {
            // Globalen State informieren
            markLevelAsCompleted(9); 
        } else {
            console.error("Fehler beim Speichern des Fortschritts:", error);
        }
    }
}
</script>

<template>
  <div class="content-wrapper">
    <div v-if="loading" class="loading-screen">
        <div class="loader-spinner"></div>
        <p>{{ t('level9.loading') }}</p>
    </div>

    <div v-else class="level-container">
      <analysis 
        v-if="!gameStarted && !gameFinished" 
        :title="t('level9.introTitle')" 
        :text="t('level9.introText')" 
        :buttonText="t('level9.startBtn')" 
        @next="gameStarted = true" 
      />

      <div v-if="gameStarted && !gameFinished && quizImages[currentRound]">
        <div class="level-progress-bar">
            <span>{{ t('level9.roundLabel') }} {{ currentRound + 1 }} / {{ roundsTotal }}</span>
            <div class="progress-track">
                <div class="progress-fill" :style="{ width: ((currentRound + 1) / roundsTotal * 100) + '%' }"></div>
            </div>
        </div>

        <spotTheFake
          :key="currentRound"
          :aiImage="{ src: quizImages[currentRound].name, bucket: quizImages[currentRound].bucket }"
          :realImages="quizImages[currentRound].realImagesList" 
          :levelId="9"
          @completed="handleSuccess"
          @mistake="roundFirstGuessMade = true"
        />
      </div>

      <!-- ABSCHLUSS POPUP -->
      <div v-if="gameFinished" class="neo-card result-card finish-popup">
        <img src="/Detectino.png" alt="Logo" class="finish-logo">
        <h2 class="neo-title">{{ t('level9.endTitle') }}</h2>
        <div class="score-display">{{ score }} / 10</div>
        <p class="finish-text">{{ t('level9.endText') }}</p>
        
        <div class="finish-actions">
            <button class="neo-btn highlight" @click="router.push('/leaderboard')">
                 {{ t('level9.viewLeaderboard') }}
            </button>
            <button class="neo-btn" @click="router.push('/levels')">
                {{ t('generic.backToMap') }}
            </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading-screen { display: flex; flex-direction: column; justify-content: center; align-items: center; height: 50vh; font-weight: bold; gap: 1rem; }
.score-display { font-size: 5rem; font-weight: 900; margin: 1rem 0; text-align: center; color: #000; }
.result-card { padding: 3rem; text-align: center; }

/* Finish Popup Styles */
.finish-popup {
    border: 6px solid #000;
    box-shadow: 15px 15px 0 #000;
    background: #fff;
    animation: popup-bounce 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.finish-logo { width: 80px; margin: 0 auto 1.5rem; display: block; }
.finish-text { font-weight: 600; line-height: 1.5; margin-bottom: 2rem; }
.finish-actions { display: flex; flex-direction: column; gap: 1rem; }
.neo-btn.highlight { background: var(--card-bg); color: #000; }

@keyframes popup-bounce {
    0% { transform: scale(0.8); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
}
</style>