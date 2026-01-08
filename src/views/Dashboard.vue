<template>
  <div class="level-container">
    <div class="neo-card" style="margin-top: 2rem;">
      <h1 class="neo-title">Wissenschaftliche Auswertung</h1>
      <p>Detaillierte Analyse der Erkennungsrate pro Level und Schritt.</p>

      <!-- 1. GLOBALE STATS (Zusammenfassung) -->
      <div class="stats-grid">
        <div class="stat-box">
          <span class="label">Gesamt-Antworten: </span>
          <span class="value">{{ totalResponses }}</span>
        </div>
        <div class="stat-box">
          <span class="label">Durchschn. Erkennungsquote: </span>
          <span class="value text-success">{{ globalAccuracy }}%</span>
        </div>
      </div>

      <!-- 2. LEVEL-ANALYSE -->
      <div v-for="(levelData, levelId) in groupedLevels" :key="levelId" class="level-analysis-section">
        <h2 class="neo-title level-header">Level {{ levelId }}</h2>
        
        <div class="steps-grid">
          <div v-for="step in levelData" :key="step.step_id" class="step-card">
            <div class="step-info">
              <span class="step-number">Schritt {{ step.step_id }}</span>
              <span class="image-hint">{{ step.image_name }}</span>
            </div>
            
            <!-- Visualisierung Richtig vs Falsch -->
            <div class="comparison-bar">
              <div class="bar-part correct" :style="{ width: step.percentCorrect + '%' }">
                {{ step.correct }}
              </div>
              <div class="bar-part wrong" :style="{ width: step.percentWrong + '%' }">
                {{ step.wrong }}
              </div>
            </div>
            
            <div class="step-stats-text">
              <span class="text-success">Richtig: {{ step.percentCorrect }}%</span>
              <span class="text-fail">Falsch: {{ step.percentWrong }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { supabase } from '@/lib/supabaseClient.js';

const allActivities = ref([]);

// Daten laden
onMounted(async () => {
  const { data, error } = await supabase
    .from('spiel_aktivitaeten')
    .select('level_id, step_id, is_correct, image_name');
  
  if (data) allActivities.value = data;
});

// Statistische Berechnungen
const totalResponses = computed(() => allActivities.value.length);

const globalAccuracy = computed(() => {
  if (allActivities.value.length === 0) return 0;
  const correct = allActivities.value.filter(a => a.is_correct).length;
  return Math.round((correct / allActivities.value.length) * 100);
});

// Gruppierung: Level -> Steps
const groupedLevels = computed(() => {
  const groups = {};

  allActivities.value.forEach(act => {
    if (!groups[act.level_id]) groups[act.level_id] = {};
    if (!groups[act.level_id][act.step_id]) {
      groups[act.level_id][act.step_id] = {
        level_id: act.level_id,
        step_id: act.step_id,
        image_name: act.image_name,
        correct: 0,
        wrong: 0
      };
    }

    if (act.is_correct) {
      groups[act.level_id][act.step_id].correct++;
    } else {
      groups[act.level_id][act.step_id].wrong++;
    }
  });

  // Umwandeln in sortiertes Format & Prozentrechnung
  const finalData = {};
  Object.keys(groups).forEach(lvl => {
    const stepsArray = Object.values(groups[lvl]).sort((a, b) => a.step_id - b.step_id);
    
    finalData[lvl] = stepsArray.map(step => {
      const total = step.correct + step.wrong;
      return {
        ...step,
        percentCorrect: total > 0 ? Math.round((step.correct / total) * 100) : 0,
        percentWrong: total > 0 ? Math.round((step.wrong / total) * 100) : 0
      };
    });
  });

  return finalData;
});
</script>

<style scoped>
.stats-grid { 
  display: grid; 
  grid-template-columns: 1fr 1fr; 
  gap: 1rem; 
  margin-bottom: 2rem;
}

.stat-box { 
  background: #fff; 
  border: 2px solid #000; 
  padding: 1rem; 
  box-shadow: 4px 4px 0 #000;
}

.level-header {
  background: #000;
  color: #fff;
  padding: 0.5rem 1rem;
  margin-top: 2rem;
  font-size: 1.2rem;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.step-card {
  background: #fcfcfc;
  border: 2px solid #000;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.step-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.step-number { font-weight: 900; font-size: 0.9rem; }
.image-hint { font-size: 0.7rem; color: #666; }

/* Balken-Visualisierung */
.comparison-bar {
  height: 25px;
  display: flex;
  border: 2px solid #000;
  background: #eee;
  overflow: hidden;
}

.bar-part {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
  color: #fff;
  transition: width 0.5s ease-in-out;
}

.correct { background: #00aa00; }
.wrong { background: #ff3333; }

.step-stats-text {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  font-weight: bold;
}

.text-success { color: #00aa00; }
.text-fail { color: #ff3333; }
</style>