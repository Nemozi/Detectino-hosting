<script setup>
import { ref, onMounted, computed } from 'vue';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js';

const { t } = useTranslation();
const allActivities = ref([]);
const allProfiles = ref([]);
const allProgress = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const [act, prof, prog] = await Promise.all([
      supabase.from('spiel_aktivitaeten').select('*'),
      supabase.from('spielerprofile').select('*'),
      supabase.from('level_fortschritt').select('*')
    ]);
    allActivities.value = act.data || [];
    allProfiles.value = prof.data || [];
    allProgress.value = prog.data || [];
  } finally {
    isLoading.value = false;
  }
});

const stats = computed(() => {
  const acts = allActivities.value || [];
  const profs = allProfiles.value || [];
  const progs = allProgress.value || [];

  const calcAcc = (list) => {
    if (!list || list.length === 0) return 0;
    const correct = list.filter(a => String(a.is_correct) === 'true').length;
    return Math.round((correct / list.length) * 100);
  };

  // 1. DATA CLEANING (Filtere User mit Alter 0 oder 100)
  const validProfs = profs.filter(p => p.alter > 5 && p.alter < 110);
  const vIds = validProfs.map(p => p.user_id);
  const vActs = acts.filter(a => vIds.includes(a.user_id));
  const vProgs = progs.filter(p => vIds.includes(p.user_id));

  // 2. QUIZ SCORES & DELTAS
  const getAvgScore = (lvlId) => {
    const data = vProgs.filter(p => p.level_id === lvlId);
    if (!data.length) return 0;
    const avg = data.reduce((s, p) => s + (p.score || 0), 0) / data.length;
    // FIX: Wenn der Score bereits > 10 ist (z.B. 100), nicht mehr mal 10 rechnen!
    return avg > 10 ? Math.round(avg) : Math.round(avg * 10);
  };

  const q1 = getAvgScore(1);
  const q2 = getAvgScore(7);
  const q3 = getAvgScore(9);

  // 3. TECH SPLIT (Standard vs Nano)
  const isNano = (a) => a.task_type?.toLowerCase().includes('nano') || a.image_name?.toLowerCase().includes('nano');
  
  // Wir schauen uns Quiz 1 und Quiz 2 im Detail an
  const techSplit = (lvlIds) => {
    const relevantActs = vActs.filter(a => lvlIds.includes(a.level_id));
    return {
      std: calcAcc(relevantActs.filter(a => !isNano(a))),
      nano: calcAcc(relevantActs.filter(a => isNano(a)))
    };
  };

  const techQ1 = techSplit([1]);
  const techQ2 = techSplit([7]);

  // 4. LERNKURVE (Timeline)
  const timeline = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(l => {
    const levelActs = vActs.filter(a => a.level_id === l);
    // Bevorzugt Aktivitäts-Daten, sonst Score-Daten
    const acc = levelActs.length > 0 ? calcAcc(levelActs) : getAvgScore(l);
    return { id: l, acc, isQuiz: [1, 7, 9].includes(l) };
  });

  return {
    totalUsers: vIds.length,
    globalAccuracy: calcAcc(vActs),
    q1, q2, q3,
    delta1: q2 - q1,
    delta2: q3 - q2,
    techQ1,
    techQ2,
    levelTimeline: timeline,
    funnel: [1, 2, 3, 4, 5, 6, 7, 8, 9].map(lvl => {
      const count = new Set(vProgs.filter(p => p.level_id === lvl).map(p => p.user_id)).size;
      return { id: lvl, count, percent: Math.min(Math.round((count / Math.max(vIds.length, 1)) * 100), 100) };
    })
  };
});
</script>

<template>
  <div class="level-container dashboard-page">
    <!-- Übersetzung: Lade-Screen -->
    <div v-if="isLoading" class="loading-screen">{{ t('dashboard.loading') }}</div>
    
    <div v-else class="neo-card main-report">
      <header class="report-header">
        <div class="header-top">
          <!-- Übersetzung: Titel & Status -->
          <h1 class="neo-title">{{ t('dashboard.header.title') }}</h1>
          <div class="status-tag">{{ t('dashboard.header.status') }}</div>
        </div>
        <!-- Übersetzung: Untertitel -->
        <p class="subtitle">{{ t('dashboard.header.subtitle') }} (N = {{ stats.totalUsers }})</p>
      </header>

      <!-- 1. KPI GRID -->
      <section class="dashboard-section">
        <div class="stats-grid">
          <div class="stat-box">
            <span class="label">{{ t('dashboard.kpis.participants') }}</span>
            <span class="value">{{ stats.totalUsers }}</span>
          </div>
          <div class="stat-box highlight">
            <span class="label">{{ t('dashboard.kpis.phase1') }}</span>
            <span class="value" :style="{color: stats.delta1 >= 0 ? '#00aa00' : '#ff3333'}">
                {{ stats.delta1 > 0 ? '+' : '' }}{{ stats.delta1 }}%
            </span>
          </div>
          <div class="stat-box highlight">
            <span class="label">{{ t('dashboard.kpis.phase2') }}</span>
            <span class="value" :style="{color: stats.delta2 >= 0 ? '#00aa00' : '#000'}">
                {{ stats.delta2 > 0 ? '+' : '' }}{{ stats.delta2 }}%
            </span>
          </div>
          <div class="stat-box">
            <span class="label">{{ t('dashboard.kpis.precision') }}</span>
            <span class="value">{{ stats.globalAccuracy }}%</span>
          </div>
        </div>
      </section>

      <!-- 2. TECH-GAP -->
      <div class="neo-grid-2">
        <section class="dashboard-section sub-card">
          <h2 class="section-label">{{ t('dashboard.sections.modelComparison') }}</h2>
          <div class="tech-comparison">
             <div class="tech-row">
                <span class="tech-row-label">QUIZ 1</span>
                <div class="bar-group">
                   <div class="mini-bar black" :style="{width: stats.techQ1.std + '%'}">{{ stats.techQ1.std }}%</div>
                   <div class="mini-bar yellow" :style="{width: stats.techQ1.nano + '%'}">{{ stats.techQ1.nano }}%</div>
                </div>
             </div>
             <div class="tech-row">
                <span class="tech-row-label">QUIZ 2</span>
                <div class="bar-group">
                   <div class="mini-bar black" :style="{width: stats.techQ2.std + '%'}">{{ stats.techQ2.std }}%</div>
                   <div class="mini-bar yellow" :style="{width: stats.techQ2.nano + '%'}">{{ stats.techQ2.nano }}%</div>
                </div>
             </div>
          </div>
          <div class="chart-legend">
            <span class="leg-item"><span class="box black"></span> {{ t('dashboard.charts.standard') }}</span>
            <span class="leg-item"><span class="box yellow"></span> {{ t('dashboard.charts.nano') }}</span>
          </div>
        </section>

        <section class="dashboard-section sub-card">
          <h2 class="section-label">{{ t('dashboard.sections.quizTimeline') }}</h2>
          <div class="quiz-timeline">
            <div class="q-node"><span>Q1</span><strong>{{ stats.q1 }}%</strong></div>
            <div class="q-line"></div>
            <div class="q-node"><span>Q2</span><strong>{{ stats.q2 }}%</strong></div>
            <div class="q-line"></div>
            <div class="q-node"><span>Q3</span><strong>{{ stats.q3 }}%</strong></div>
          </div>
        </section>
      </div>

      <!-- 4. LERNKURVE -->
      <section class="dashboard-section">
        <h2 class="section-label">{{ t('dashboard.sections.learningCurve') }}</h2>
        <div class="learning-container">
            <div class="learning-chart">
                <div v-for="lvl in stats.levelTimeline" :key="lvl.id" class="chart-col">
                  <div class="chart-bar" 
                       :class="lvl.isQuiz ? 'analysis-color' : 'fallback-color'"
                       :style="{ height: lvl.acc + '%' }">
                      <span class="chart-val">{{ lvl.acc }}%</span>
                  </div>
                  <span class="chart-label">LVL {{ lvl.id }}</span>
                </div>
            </div>
            <div class="chart-legend">
                <span class="leg-item"><span class="box black"></span> {{ t('dashboard.charts.quizResult') }}</span>
                <span class="leg-item"><span class="box yellow"></span> {{ t('dashboard.charts.learningUnit') }}</span>
            </div>
        </div>
      </section>

      <!-- 6. RETENTION FUNNEL -->
      <section class="dashboard-section">
        <h2 class="section-label">{{ t('dashboard.sections.retentionFunnel') }}</h2>
        <div class="funnel-container">
          <div v-for="(f, index) in stats.funnel" :key="f.id" class="funnel-wrapper" :style="{ width: 100 - (index * 2) + '%' }">
            <div class="funnel-layer">
              <div class="funnel-content">
                <span class="funnel-lvl">LVL {{ f.id }}</span>
                <span class="funnel-stats">{{ f.count }} {{ t('dashboard.charts.graduates') }} ({{ f.percent }}%)</span>
              </div>
            </div>
            <div v-if="index < stats.funnel.length - 1" class="funnel-connector"></div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* Dein bestehendes CSS ergänzt um die neuen Elemente */
.tech-row { margin-bottom: 1.5rem; }
.tech-row-label { font-weight: 900; font-size: 0.7rem; display: block; margin-bottom: 5px; }
.bar-group { display: flex; flex-direction: column; gap: 4px; border-left: 3px solid #000; padding-left: 5px; }
.mini-bar { height: 18px; color: #fff; font-size: 0.6rem; font-weight: 900; display: flex; align-items: center; padding-left: 5px; border: 2px solid #000; transition: width 1s ease; }
.mini-bar.black { background: #000; }
.mini-bar.yellow { background: var(--card-bg); color: #000; }

.quiz-timeline { display: flex; align-items: center; justify-content: space-between; padding: 20px 0; }
.q-node { display: flex; flex-direction: column; align-items: center; background: #fff; border: 3px solid #000; padding: 8px; box-shadow: 4px 4px 0 #000; }
.q-node strong { font-size: 1.1rem; }
.q-line { flex: 1; height: 4px; background: #000; margin: 0 5px; }

  .analysis-color { background-color: #000 !important; }
.fallback-color { background-color: var(--card-bg) !important; }
.data-note { font-weight: 800; font-size: 0.75rem; margin-top: 1rem; text-transform: uppercase; }
.dashboard-page { padding: 2rem 1rem; background: #f0f0f0; }
.main-report { background: #fff; border: 4px solid #000; box-shadow: 12px 12px 0 #000; padding: 2rem; max-width: 1000px; margin: 0 auto; }
.report-header { margin-bottom: 3rem; }
.header-top { display: flex; justify-content: space-between; align-items: center; }
.status-tag { background: #000; color: #fff; padding: 0.2rem 0.5rem; font-weight: 900; font-size: 0.7rem; }
.section-label { background: #000; color: #fff; padding: 0.4rem 1rem; display: inline-block; font-weight: 900; margin-bottom: 1.5rem; transform: skewX(-10deg); }
.dashboard-section { margin-bottom: 4rem; }

.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1.5rem; }
.stat-box { border: 3px solid #000; padding: 1.5rem; background: #fff; box-shadow: 6px 6px 0 #000; }
.stat-box.highlight { background: var(--card-bg); }
.stat-box .value { font-size: 2.8rem; font-weight: 900; display: block; }
.stat-box .label { font-size: 0.7rem; font-weight: 900; color: #555; text-transform: uppercase; }

.neo-bar-container { height: 25px; border: 3px solid #000; background: #eee; margin: 5px 0 15px; }
.fill { height: 100%; transition: width 1s ease-in-out; }
.fill.std { background: #000; }
.fill.nano { background: var(--card-bg); }
.comp-info { display: flex; justify-content: space-between; font-weight: 900; font-size: 0.8rem; }

.dk-display { display: flex; align-items: center; justify-content: center; gap: 2rem; background: #f9f9f9; border: 3px solid #000; padding: 1.5rem; }
.dk-val { font-size: 2.5rem; font-weight: 900; display: block; }
.dk-lab { font-size: 0.6rem; font-weight: 900; }
.dk-divider { font-weight: 900; background: #000; color: #fff; padding: 0.3rem; }

.learning-chart { display: flex; align-items: flex-end; gap: 8px; height: 200px; border-bottom: 4px solid #000; padding-bottom: 5px; }
.chart-col { flex: 1; display: flex; flex-direction: column; align-items: center; height: 100%; justify-content: flex-end; }
.chart-bar { width: 100%; border: 3px solid #000; border-bottom: none; position: relative; transition: height 0.8s ease; }
.chart-bar.fallback-color { background-color: var(--card-bg); }
.chart-bar.analysis-color { background-color: #000; }
.chart-val { position: absolute; top: -25px; font-weight: 900; font-size: 0.7rem; width: 100%; text-align: center; }
.chart-label { font-size: 0.6rem; font-weight: 900; margin-top: 8px; }
.chart-legend { display: flex; gap: 1.5rem; margin-top: 1.5rem; font-size: 0.7rem; font-weight: 800; }
.box { display: inline-block; width: 12px; height: 12px; border: 2px solid #000; margin-right: 5px; }
.box.black { background: #000; }
.box.yellow { background: var(--card-bg); }

.funnel-container { display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 600px; margin: 0 auto; }
.funnel-wrapper { display: flex; flex-direction: column; align-items: center; width: 100%; }
.funnel-layer { background: #000; color: #fff; padding: 0.6rem 1rem; border: 3px solid #000; box-shadow: 4px 4px 0 var(--card-bg); margin-bottom: 2px; }
.funnel-content { display: flex; justify-content: space-between; font-weight: 900; font-size: 0.75rem; width: 100%; }
.funnel-lvl { background: var(--card-bg); color: #000; padding: 0 4px; margin-right: 10px; }
.funnel-connector { height: 20px; width: 4px; background: #000; position: relative; }
.funnel-connector::after { content: "▼"; position: absolute; bottom: -12px; left: 50%; transform: translateX(-50%); color: #000; font-size: 0.8rem; }

.sub-card { border: 3px solid #000; padding: 1.5rem; margin-bottom: 1rem; }
.bar-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.bar-label { font-size: 0.7rem; font-weight: 900; width: 60px; }
.bar-track { flex: 1; height: 12px; border: 2px solid #000; background: #fff; }
.bar-fill-black { height: 100%; background: #000; }
.bar-fill-yellow { height: 100%; background: var(--card-bg); }
.bar-val { font-size: 0.7rem; font-weight: 900; width: 30px; text-align: right; }
.inner-title { font-weight: 900; text-transform: uppercase; font-size: 1rem; margin-bottom: 1rem; border-bottom: 2px solid #000; }
.small-info { font-size: 0.65rem; font-weight: 800; margin-top: 10px; opacity: 0.6; }


</style>