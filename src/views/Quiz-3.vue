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

/* ---------- CONFIG ---------- */
const BUCKET = 'Nanobanana-Images';
const MAX_AVAILABLE = 44;
const EXCLUDED_IDS = ['0001', '0002', '0003', '0004', '0005', '0006', '0007', '0008', '0009', '0010', '0011', '0012', '0013', '0014', '0015', '0022', '0023', '0032'];

/* ---------- HELPER ---------- */
const shuffle = arr => [...arr].sort(() => Math.random() - 0.5)

// Vorladen aller Bilder
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
    supabase.from('spiel_aktivitaeten').insert({
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
  
  loading.value = true

  // 1. User Profil laden
  const { data: profile } = await supabase.from('spielerprofile').select('username').eq('user_id', user.id).maybeSingle();
  username.value = profile?.username || user.email.split('@')[0];

  // 2. Bereits gesehene Bilder (Ausschluss-Logik)
  const { data: seenData } = await supabase.from('gesehene_bilder').select('image_name').eq('user_id', user.id);
  const seenNames = seenData?.map(item => item.image_name) || []

  // 3. Nanobanana Pool filtern
  const fullPool = Array.from({ length: MAX_AVAILABLE }, (_, i) => ({
    name: `Image_${String(i + 1).padStart(4, '0')}.png`,
    bucket: BUCKET
  }));

  let available = fullPool.filter(img => {
      const id = img.name.split('_')[1].split('.')[0];
      return !EXCLUDED_IDS.includes(id) && !seenNames.includes(img.name);
  });

  // Notfall-Auffüllung falls zu viele Bilder ausgeschlossen wurden
  if (available.length < roundsTotal) {
      available = fullPool.filter(img => !EXCLUDED_IDS.includes(img.name.split('_')[1].split('.')[0]));
  }

  const selection = shuffle(available).slice(0, roundsTotal);

  // 4. Echte Bilder (30 Stück) aus DB Buffer laden
  const allRealImages = await fetchRandomRealImages(30);

  // 5. Quiz-Struktur bauen
  quizImages.value = selection.map((ai, i) => ({
    ...ai,
    realImagesList: allRealImages.slice(i * 3, i * 3 + 3)
  }))

  // 6. ALLE URLs sammeln für den Preload
  const allUrlsToCache = [];
  quizImages.value.forEach(round => {
      // AI Image URL
      const { data } = supabase.storage.from(round.bucket).getPublicUrl(round.name);
      allUrlsToCache.push(data.publicUrl);
      // Unsplash Image URLs
      round.realImagesList.forEach(r => allUrlsToCache.push(r.src));
  });

  // 7. Warten bis alle 40 Bilder im Cache sind
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
    <!-- Zentraler Ladescreen (aus base.css) -->
    <div v-if="loading" class="loading-screen">
        <div class="loader-spinner"></div>
        <p>Inhalte Laden...</p>
    </div>

    <div v-else class="level-container">
      <analysis 
        v-if="!gameStarted && !gameFinished" 
        title="Das Finale" 
        text="Nur Nanobanana-Bilder. Keine Tipps. Dies ist der finale Test deiner Fähigkeiten." 
        buttonText="Jetzt starten" 
        @next="gameStarted = true" 
      />

      <div v-if="gameStarted && !gameFinished && quizImages[currentRound]">
        <!-- Globale Progress Bar -->
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
          :levelId="9"
          @completed="handleSuccess"
          @mistake="roundFirstGuessMade = true"
        />
      </div>

      <!-- Ergebnis -->
      <div v-if="gameFinished" class="neo-card result-card" style="text-align:center;">
        <h2 class="neo-title">Vielen Dank für deine Teilnahme!</h2>
        <div class="score-display">{{ score }} / 10</div>
        <p>Du hast das Training abgeschlossen. Dein Beitrag ist sehr wertvoll für meine Forschung.</p>
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