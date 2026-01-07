<script setup>
import { ref, onMounted, watch } from 'vue'
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

/* ---------- IMAGE POOLS ---------- */
const BUCKET = 'Nanobanana-Images';
const EXCLUDED_IDS = ['0001', '0002', '0003', '0004', '0005', '0006', '0007', '0008', '0009', '0010', '0011', '0012', '0013', '0014', '0015', '0022', '0023', '0032'];

/* ---------- HELPER ---------- */
const shuffle = arr => [...arr].sort(() => Math.random() - 0.5)

const preloadImages = (urls) => {
  return Promise.all(urls.map(url => new Promise(res => {
    const img = new Image(); img.src = url; img.onload = res; img.onerror = res;
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
  username.value = profile?.username || user.email.split('@')[0];

  loading.value = true

  // 1. Pool aus 34 Nanobananas generieren und Filtern
  const fullPool = Array.from({ length: 34 }, (_, i) => ({
    name: `Image_${String(i + 1).padStart(4, '0')}.png`,
    bucket: BUCKET
  }));

  const available = fullPool.filter(img => {
      const id = img.name.split('_')[1].split('.')[0];
      return !EXCLUDED_IDS.includes(id);
  });

  const selection = shuffle(available).slice(0, roundsTotal);

  // 2. Echte Vergleichsbilder (aus deinem DB-Buffer)
  const allRealImages = await fetchRandomRealImages(30);

  // 3. Quiz bauen
  quizImages.value = selection.map((ai, i) => ({
    ...ai,
    realImagesList: allRealImages.slice(i * 3, i * 3 + 3)
  }))

  // 4. Runde 1 Vorladen
  if (quizImages.value[0]) {
      const firstUrls = [
        ...quizImages.value[0].realImagesList.map(r => r.src),
        supabase.storage.from(BUCKET).getPublicUrl(quizImages.value[0].name).data.publicUrl
      ];
      await preloadImages(firstUrls);
  }

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
    // Hintergrund laden
    const next = quizImages.value[currentRound.value]
    const nextUrls = [...next.realImagesList.map(r => r.src), supabase.storage.from(BUCKET).getPublicUrl(next.name).data.publicUrl]
    preloadImages(nextUrls)
  } else {
    gameFinished.value = true
    finishLevel()
  }
}

const finishLevel = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        await supabase.from('level_fortschritt').upsert({
            user_id: user.id, level_id: 9, score: score.value
        }, { onConflict: 'user_id,level_id' });
        markLevelAsCompleted(9); 
    }
}
</script>

<template>
  <div class="content-wrapper">
    <div v-if="loading" class="loading-screen">
        <div class="loader-spinner"></div>
        <p>Lade Abschlussprüfung...</p>
    </div>

    <div v-else class="level-container">
      <analysis 
        v-if="!gameStarted && !gameFinished" 
        title="Das Finale" 
        text="Nur 10 Runden trennen dich vom Ende der Studie. Hier gibt es keine Tipps mehr." 
        buttonText="Jetzt starten" 
        @next="gameStarted = true" 
      />

      <div v-if="gameStarted && !gameFinished && quizImages[currentRound]">
        <div class="level-progress-bar">
            <span>Runde {{ currentRound + 1 }} / 10</span>
            <div class="progress-track"><div class="progress-fill" :style="{ width: ((currentRound + 1) / 10 * 100) + '%' }"></div></div>
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

      <div v-if="gameFinished" class="neo-card result-card" style="text-align:center;">
        <h2 class="neo-title">Vielen Dank!</h2>
        <div class="score-display">{{ score }} / 10</div>
        <button class="neo-btn" @click="router.push('/levels')">Zurück zur Map</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading-screen { display: flex; flex-direction: column; justify-content: center; align-items: center; height: 50vh; font-weight: bold; gap: 1rem; }
.score-display { font-size: 5rem; font-weight: 900; margin: 1rem 0; }
.result-card { padding: 3rem; }
</style>