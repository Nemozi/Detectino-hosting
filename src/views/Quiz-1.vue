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

// Pool A: Standard Bilder (JPG aus dem Quiz-Bucket)
const STANDARD_AI_POOL = Array.from({ length: 100 }, (_, i) => ({
  name: `Image_${String(i + 1).padStart(4, '0')}.jpg`,
  bucket: 'Fake-Images-Quiz',
  source: 'standard'
}))

// Pool B: Nanobanana (PNG), EXKLUSIVE der Bilder aus Level 8
// Verwendet: 0001, 0004, 0005, 0007, 0010, 0011
const NANOBANANA_POOL = [
    { name: 'Image_0001.png', bucket: 'Nanobanana-Images', source: 'nanobanana' },
    { name: 'Image_0004.png', bucket: 'Nanobanana-Images', source: 'nanobanana' },
    { name: 'Image_0005.png', bucket: 'Nanobanana-Images', source: 'nanobanana' },
    { name: 'Image_0010.png', bucket: 'Nanobanana-Images', source: 'nanobanana' },
    { name: 'Image_0011.png', bucket: 'Nanobanana-Images', source: 'nanobanana' }
]

/* ---------- HELPER ---------- */
const shuffle = arr => [...arr].sort(() => Math.random() - 0.5)

// Differenziertes Logging für deine Bachelorarbeit
const logActivity = async (isCorrect, imgData) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    
    await supabase.from('spiel_aktivitaeten').insert({
        user_id: user.id,
        level_id: 1,
        step_id: currentRound.value,
        // Unterscheidung in der DB:
        task_type: imgData.source === 'nanobanana' ? 'spot_fake_nanobanana' : 'spot_fake_standard',
        image_name: imgData.name,
        is_correct: isCorrect,
        interaction_type: `User: ${username.value}`
    });
};

const preloadImages = (urls) => {
  return Promise.all(urls.map(url => new Promise(res => {
    const img = new Image(); img.src = url; img.onload = res; img.onerror = res;
  })));
};

/* ---------- DATA LOADING ---------- */
onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return router.push('/login')
  
  // Username für Logging laden
  const { data: profile } = await supabase.from('spielerprofile').select('username').eq('user_id', user.id).maybeSingle();
  username.value = profile?.username || user.email.split('@')[0];

  loading.value = true

  // 1. Mischung: 50% Standard, 50% Nanobanana
  const selectedStandard = shuffle(STANDARD_AI_POOL).slice(0, 5)
  // Wir nehmen alle 5 verfügbaren Nanobanana Bilder (da diese exklusiv sind)
  const combinedAI = shuffle([...selectedStandard, ...NANOBANANA_POOL])

  // 2. Unsplash Bilder für die Vergleiche laden
  const allUnsplashImages = await fetchRandomRealImages(30, 'portrait', 'gjZvv_WF6VQ');

  // 3. Quiz-Struktur bauen
  quizImages.value = combinedAI.map((ai, i) => ({
    ...ai,
    realImagesList: allUnsplashImages.slice(i * 3, i * 3 + 3)
  }))

  // 4. Erste Runde vorladen (Performance-Fix)
  if (quizImages.value[0]) {
      const firstRoundUrls = [
        ...quizImages.value[0].realImagesList.map(i => i.src),
        supabase.storage.from(quizImages.value[0].bucket).getPublicUrl(quizImages.value[0].name).data.publicUrl
      ]
      await preloadImages(firstRoundUrls)
  }

  loading.value = false
})

/* ---------- GAME LOGIC ---------- */
const handleSuccess = () => {
  const currentImg = quizImages.value[currentRound.value]
  
  // Loggt differenziert nach Bildquelle
  logActivity(!roundFirstGuessMade.value, currentImg);

  if (!roundFirstGuessMade.value) score.value++
  roundFirstGuessMade.value = false

  if (currentRound.value < quizImages.value.length - 1) {
    currentRound.value++
    // Nächste Runde im Hintergrund vorladen
    const next = quizImages.value[currentRound.value]
    const nextUrls = [...next.realImagesList.map(r => r.src), supabase.storage.from(next.bucket).getPublicUrl(next.name).data.publicUrl]
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
            user_id: user.id, level_id: 1, score: score.value
        }, { onConflict: 'user_id,level_id' });
        markLevelAsCompleted(1); 
    }
}
</script>

<template>
  <div class="content-wrapper">
    <!-- Ladescreen -->
    <div v-if="loading" class="loading-screen">
        <div class="loader-spinner"></div>
        <p>Bilder werden synchronisiert...</p>
    </div>

    <div v-else class="level-container">
      <analysis 
        v-if="!gameStarted && !gameFinished" 
        title="Das Einstiegs-Quiz" 
        text="Finde das KI-Bild. In diesem Test mischen wir klassische KI-Bilder mit hochmodernen Generierungen." 
        buttonText="Starten" 
        @next="gameStarted = true" 
      />

      <!-- Spiel-Loop -->
      <div v-if="gameStarted && !gameFinished && quizImages[currentRound]">
        <div class="level-progress-bar">
            <span>Runde {{ currentRound + 1 }} / 10</span>
            <div class="progress-track">
                <div class="progress-fill" :style="{ width: ((currentRound + 1) / 10 * 100) + '%' }"></div>
            </div>
        </div>

        <spotTheFake
          :key="currentRound"
          :aiImage="{ src: quizImages[currentRound].name, bucket: quizImages[currentRound].bucket }"
          :realImages="quizImages[currentRound].realImagesList" 
          :levelId="1"
          @completed="handleSuccess"
          @mistake="roundFirstGuessMade = true"
        />
      </div>

      <!-- Ergebnis -->
      <div v-if="gameFinished" class="neo-card result-card" style="text-align:center;">
        <h2 class="neo-title">Auswertung abgeschlossen</h2>
        <div class="score-display">{{ score }} / 10</div>
        <p>Deine Daten wurden für die wissenschaftliche Analyse gespeichert.</p>
        <button class="neo-btn" @click="router.push('/levels')">Zurück zur Map</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading-screen { display: flex; justify-content: center; align-items: center; height: 50vh; }
.loader-container { background: #fff; padding: 2rem; border: 3px solid #000; box-shadow: 8px 8px 0 #000; text-align: center; }
.loader-spinner { width: 40px; height: 40px; border: 5px solid #eee; border-top: 5px solid #000; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 10px; }
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
.level-container { width: 100%; max-width: 50rem; margin: 0 auto; padding: 2rem 1rem; }
.score-display { font-size: 3rem; font-weight: 900; margin: 1rem 0; }
.level-progress-bar { margin-bottom: 1.5rem; font-weight: 800; text-transform: uppercase; font-size: 0.9rem; }
.progress-track { width: 100%; height: 12px; background: #fff; border: 2px solid #000; margin-top: 5px; }
.progress-fill { height: 100%; background: #000; transition: width 0.3s ease; }
</style>