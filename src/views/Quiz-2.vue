<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabaseClient.js'
import { useTranslation } from '@/composables/useTranslation.js'
import { useUnsplash } from '@/composables/useUnsplash.js'

import spotTheFake from '@/components/game/spotTheFake.vue'
import analysis from '@/components/game/analysis.vue'

const router = useRouter()
const { t } = useTranslation()
const { fetchRandomRealImages } = useUnsplash()

/* ---------- STATE ---------- */
const loading = ref(true)
const gameStarted = ref(false)
const gameFinished = ref(false)
const currentRound = ref(0)
const score = ref(0)
const roundsTotal = 10
const quizImages = ref([])
const roundFirstGuessMade = ref(false)

const AI_IMAGE_POOL = Array.from({ length: 100 }, (_, i) => ({
  name: `Image_${String(i + 1).padStart(4, '0')}.jpg`,
  bucket: 'Fake-Images-Quiz'
}))

const shuffle = arr => [...arr].sort(() => Math.random() - 0.5)

// Hilfsfunktion zum Vorladen einer spezifischen Runde (Identisch zu Quiz 1)
const preloadRound = (index) => {
  if (!quizImages.value[index]) return;
  const round = quizImages.value[index];
  const urls = [
    ...round.realImagesList.map(i => i.src),
    supabase.storage.from(round.bucket).getPublicUrl(round.name).data.publicUrl
  ];
  urls.forEach(url => { const img = new Image(); img.src = url; });
};

// Speichern gesehender Bilder
const saveSeenImage = async (imageName, bucketName = 'Fake-Images-Quiz') => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return
  await supabase.from('gesehene_bilder').upsert({
    user_id: user.id,
    image_name: imageName,
    bucket_name: bucketName
  }, { onConflict: 'user_id,image_name' })
}

/* ---------- DATA LOADING & FILTERING ---------- */
onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return router.push('/login')
  
  loading.value = true

  // 1. Bereits gesehene Bilder aus der DB holen
  const { data: seenData } = await supabase
    .from('gesehene_bilder')
    .select('image_name')
    .eq('user_id', user.id)
  const seenNames = seenData?.map(item => item.image_name) || []

  // 2. Filter: Nur KI-Bilder, die noch NIE gesehen wurden
  let availableAi = AI_IMAGE_POOL.filter(img => !seenNames.includes(img.name))
  
  // Notfall: Falls der User schon alles kennt, nimm den Standard-Pool
  if (availableAi.length < roundsTotal) availableAi = AI_IMAGE_POOL
  
  const aiImagesRaw = shuffle(availableAi).slice(0, roundsTotal)

  // 3. Unsplash Bilder laden (30 echte pro Runde)
  const allUnsplashImages = await fetchRandomRealImages(30, 'portrait', 'gjZvv_WF6VQ');

  // 4. Quiz-Struktur bauen
  quizImages.value = aiImagesRaw.map((img, i) => ({
    ...img,
    realImagesList: allUnsplashImages.slice(i * 3, i * 3 + 3)
  }))

  // 5. NUR Runde 1 vorladen für schnellen Start (Wie Quiz 1)
  if (quizImages.value.length > 0) {
    await preloadRound(0); 
  }
  
  loading.value = false
  // Runde 2 im Hintergrund laden
  preloadRound(1);
})

// HINTERGRUND-LADEN & GESEHEN-LOGIK
watch(currentRound, (newIdx) => {
  // Übernächste Runde vorladen
  if (quizImages.value[newIdx + 1]) preloadRound(newIdx + 1);

  // Aktuelles Bild als gesehen markieren
  const currentImg = quizImages.value[newIdx]
  if (currentImg) saveSeenImage(currentImg.name, currentImg.bucket)
})

/* ---------- GAME LOGIC ---------- */
const startGame = () => { 
    gameStarted.value = true 
    if (quizImages.value[0]) saveSeenImage(quizImages.value[0].name, quizImages.value[0].bucket)
}

const handleSuccess = () => {
  if (!roundFirstGuessMade.value) score.value++
  roundFirstGuessMade.value = false

  if (currentRound.value < quizImages.value.length - 1) {
    currentRound.value++
  } else {
    gameFinished.value = true;
    finishLevel();
  }
}

const finishLevel = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        // Upsert sorgt dafür, dass Level 7 (Quiz 2) als abgeschlossen gilt
        await supabase.from('level_fortschritt').upsert({
            user_id: user.id, level_id: 7, score: score.value
        }, { onConflict: 'user_id,level_id' });
    }
}

const goBackToMap = () => router.push('/levels')
</script>

<template>
  <div class="content-wrapper">
    <div v-if="loading" class="loading-screen">
      <div class="loader-container">
        <div class="loader-spinner"></div>
        <p>Suche neue Herausforderungen...</p>
      </div>
    </div>

    <div v-else class="level-container">
      <analysis
        v-if="!gameStarted && !gameFinished"
        title="Etappen-Quiz"
        text="Hier zeigen wir dir nur Bilder, die du noch nie gesehen hast. Kannst du die KI finden?"
        buttonText="Starten"
        @next="startGame"
      />

      <div v-if="gameStarted && !gameFinished && quizImages[currentRound]">
        <!-- PROGRESS BAR -->
        <div class="level-progress-bar">
            <span>Runde {{ currentRound + 1 }} / {{ roundsTotal }}</span>
            <div class="progress-track">
                <div class="progress-fill" :style="{ width: ((currentRound + 1) / roundsTotal * 100) + '%' }"></div>
            </div>
        </div>

        <spotTheFake
          :key="currentRound"
          :aiImage="{ src: quizImages[currentRound].name, bucket: quizImages[currentRound].bucket }"
          :realImages="quizImages[currentRound].realImagesList" 
          :levelId="7"
          @completed="handleSuccess"
          @mistake="roundFirstGuessMade = true"
        />
      </div>

      <div v-if="gameFinished" class="neo-card result-card">
        <h2 class="neo-title">Ergebnis</h2>
        <div class="score-display">{{ score }} / {{ roundsTotal }}</div>
        <button class="neo-btn" @click="goBackToMap">Abschließen</button>
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

/* Progress Bar */
.level-progress-bar { margin-bottom: 1.5rem; font-weight: 800; text-transform: uppercase; font-size: 0.9rem; }
.progress-track { width: 100%; height: 12px; background: #fff; border: 2px solid #000; margin-top: 5px; }
.progress-fill { height: 100%; background: #000; transition: width 0.3s ease; }
</style>