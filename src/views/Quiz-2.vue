<script setup>
import { ref, onMounted, watch } from 'vue'
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
const { markLevelAsCompleted } = useGameState()

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

const BUCKET_NANO = 'Nanobanana-Images'
const BUCKET_STD = 'Fake-Images-Quiz'
const EXCLUDED_IDS = ['0001', '0002', '0003', '0004', '0005', '0006', '0007', '0008', '0009', '0010', '0011', '0012', '0013', '0014', '0015', '0022', '0023', '0032']

const shuffle = arr => [...arr].sort(() => Math.random() - 0.5)

/* ---------- HELPER ---------- */
const preloadRound = (index) => {
  if (!quizImages.value[index]) return
  const img = quizImages.value[index]
  const url = img.isAi 
    ? supabase.storage.from(img.bucket).getPublicUrl(img.src).data.publicUrl 
    : img.src
  const loader = new Image()
  loader.src = url
}

const saveImageAsSeen = async (img) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return
  await supabase.from('gesehene_bilder').upsert({
    user_id: user.id,
    image_name: img.name,
    bucket_name: img.bucket
  }, { onConflict: 'user_id,image_name' })
}

/* ---------- DATA LOADING & FILTERING (Das Herzstück von Quiz 2) ---------- */
onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return router.push('/login')
  
  const { data: profile } = await supabase.from('spielerprofile').select('username').eq('user_id', user.id).maybeSingle()
  username.value = profile?.username || user.email.split('@')[0]

  loading.value = true

  // 1. Bereits gesehene Bilder laden
  const { data: seenData } = await supabase.from('gesehene_bilder').select('image_name').eq('user_id', user.id)
  const seenNames = seenData?.map(item => item.image_name) || []

  // 2. REAL IMAGES (3 Stück, ungesehen)
  const realPool = await fetchRandomRealImages(20)
  const realSelection = realPool
    .filter(img => !seenNames.includes(img.src))
    .slice(0, 3)
    .map(img => ({ src: img.src, name: img.src, isAi: false, bucket: 'Unsplash', source: 'real' }))

  // 3. STANDARD AI (4 Stück, ungesehen, nicht Level 8)
  const stdPool = Array.from({ length: 100 }, (_, i) => ({
    name: `Image_${String(i + 1).padStart(4, '0')}.jpg`,
    bucket: BUCKET_STD, isAi: true, source: 'standard'
  })).filter(img => !seenNames.includes(img.name) && !EXCLUDED_IDS.some(id => img.name.includes(id)))
  
  const stdSelection = shuffle(stdPool).slice(0, 4).map(img => ({
      src: img.name, name: img.name, bucket: img.bucket, isAi: true, source: 'standard'
  }))

  // 4. NANOBANANA AI (3 Stück, ungesehen, nicht Level 8)
  const nanoPool = Array.from({ length: 34 }, (_, i) => ({
    name: `Image_${String(i + 1).padStart(4, '0')}.png`,
    bucket: BUCKET_NANO, isAi: true, source: 'nanobanana'
  })).filter(img => !seenNames.includes(img.name) && !EXCLUDED_IDS.some(id => img.name.includes(id)))

  const nanoSelection = shuffle(nanoPool).slice(0, 3).map(img => ({
      src: img.name, name: img.name, bucket: img.bucket, isAi: true, source: 'nanobanana'
  }))

  // 5. Finaler Mix (3 Real / 7 AI)
  quizImages.value = shuffle([...realSelection, ...stdSelection, ...nanoSelection])

  // Notfall-Check: Falls der Pool zu klein ist
  if (quizImages.value.length < 10) {
      console.warn("Zu wenige ungesehene Bilder übrig. Mische gesehene Bilder unter.")
      // Hier könnte man die Filterung lockern
  }

  if (quizImages.value[0]) await preloadRound(0)
  loading.value = false
})

/* ---------- GAME LOGIC ---------- */
watch(currentRound, (newIdx) => {
  if (quizImages.value[newIdx + 1]) preloadRound(newIdx + 1)
})

const handleSuccess = () => {
  const currentImg = quizImages.value[currentRound.value]
  saveImageAsSeen(currentImg)

  if (!roundFirstGuessMade.value) score.value++
  roundFirstGuessMade.value = false

  if (currentRound.value < quizImages.value.length - 1) {
    currentRound.value++
    preloadRound(currentRound.value)
  } else {
    gameFinished.value = true
    finishLevel()
  }
}

const finishLevel = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
        await supabase.from('level_fortschritt').upsert({
            user_id: user.id, level_id: 7, score: score.value
        }, { onConflict: 'user_id,level_id' })
        markLevelAsCompleted(7) 
    }
}
</script>

<template>
  <div class="content-wrapper">
    <div v-if="loading" class="loading-screen">
        <div class="loader-spinner"></div>
        <p>Lade Inhalte...</p>
    </div>

    <div v-else class="level-container">
      <analysis 
        v-if="!gameStarted && !gameFinished" 
        title="Das Etappen-Quiz" 
        text="Bist du bereit für Phase 2? Hier zeigen wir dir nur Bilder, die du in diesem Spiel noch nie gesehen hast." 
        buttonText="Quiz starten" 
        @next="gameStarted = true" 
      />

      <!-- Spiel-Loop -->
      <div v-if="gameStarted && !gameFinished && quizImages[currentRound]">
        <div class="level-progress-bar">
            <span>Runde {{ currentRound + 1 }} / {{ roundsTotal }}</span>
            <div class="progress-track">
                <div class="progress-fill" :style="{ width: ((currentRound + 1) / roundsTotal * 100) + '%' }"></div>
            </div>
        </div>

        <RealOrFake
          :key="currentRound"
          :imageData="quizImages[currentRound]"
          :levelId="7"
          questionText="Echt oder KI?"
          @completed="handleSuccess"
          @mistake="roundFirstGuessMade = true"
        />
      </div>

      <!-- Ergebnis -->
      <div v-if="gameFinished" class="neo-card result-card" style="text-align:center;">
        <h2 class="neo-title">Zwischenstand</h2>
        <div class="score-display">{{ score }} / 10</div>
        <p>Hervorragend. Du hast die zweite Etappe der Studie abgeschlossen.</p>
        <button class="neo-btn" @click="router.push('/levels')">Zurück zur Map</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading-screen { display: flex; flex-direction: column; justify-content: center; align-items: center; height: 50vh; font-weight: bold; gap: 1rem; }
.score-display { font-size: 5rem; font-weight: 900; margin: 1rem 0; text-align: center;}
.result-card { padding: 3rem; }
</style>