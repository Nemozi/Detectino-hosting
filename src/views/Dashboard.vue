<template>
  <div class="level-container dashboard-page">
    <div class="neo-card main-report">
      
      <!-- HEADER -->
      <header class="report-header">
        <div class="header-top">
          <h1 class="neo-title">RESEARCH DATA | DETECTINO</h1>
          <div class="status-tag">LIVE DATA</div>
        </div>
        <p class="subtitle">ANALYSE DER ERKENNUNGSFÄHIGKEITEN VON GENERIERTEN BILDERN GEMESSEN DURCH DETECTINO</p>
      </header>

      <!-- 1. KPI GRID -->
      <section class="dashboard-section">
        <div class="stats-grid">
          <div class="stat-box">
            <span class="label">PARTICIPANTS (N)</span>
            <span class="value">{{ stats.totalUsers }}</span>
          </div>
          <div class="stat-box">
            <span class="label">TOTAL DECISIONS</span>
            <span class="value">{{ allActivities.length }}</span>
          </div>
          <div class="stat-box highlight">
            <span class="label">GLOBAL ACCURACY</span>
            <span class="value">{{ stats.globalAccuracy }}%</span>
          </div>
          <div class="stat-box">
            <span class="label">AVG AFFINITY</span>
            <span class="value">{{ stats.avgAffinity }}/10</span>
          </div>
        </div>
      </section>

      <!-- 2. TECH COMPARISON & DUNNING-KRUGER -->
      <div class="neo-grid-2">
        <section class="dashboard-section sub-card">
          <h2 class="section-label">TECHNOLOGY GAP</h2>
          <div class="comparison-item">
            <div class="comp-info"><span>STANDARD AI</span><strong>{{ stats.accStd }}%</strong></div>
            <div class="neo-bar-container"><div class="fill std" :style="{width: stats.accStd + '%'}"></div></div>
          </div>
          <div class="comparison-item">
            <div class="comp-info"><span>MODERNE KIS (NANO)</span><strong>{{ stats.accNano }}%</strong></div>
            <div class="neo-bar-container"><div class="fill nano" :style="{width: stats.accNano + '%'}"></div></div>
          </div>
          <div class="data-note">
            DIFFERENZ: {{ Math.abs(stats.accStd - stats.accNano) }}% PRÄZISIONSVERLUST BEI MODERNEN MODELLEN
          </div>
        </section>

        <section class="dashboard-section sub-card">
          <h2 class="section-label">ASSESSMENT CORRELATION</h2>
          <div class="dk-display">
            <div class="dk-item">
                <span class="dk-val">{{ stats.avgSelfAssessment }}</span>
                <span class="dk-lab">SELF-IMAGE (1-10)</span>
            </div>
            <div class="dk-divider">VS</div>
            <div class="dk-item">
                <span class="dk-val">{{ (stats.globalAccuracy / 10).toFixed(1) }}</span>
                <span class="dk-lab">REALITY (1-10)</span>
            </div>
          </div>
        </section>
      </div>

      <!-- 3. LERNKURVE -->
      <section class="dashboard-section">
        <h2 class="section-label">LEARNING CURVE</h2>
        <div class="learning-container">
            <div class="learning-chart">
                <div v-for="lvl in stats.levelTimeline" :key="lvl.id" class="chart-col">
                  <div class="chart-bar" 
                       :class="lvl.isFallback ? 'fallback-color' : 'analysis-color'"
                       :style="{ height: lvl.acc + '%' }">
                      <span class="chart-val">{{ lvl.acc }}%</span>
                  </div>
                  <span class="chart-label">LVL {{ lvl.id }}</span>
                </div>
            </div>
            <div class="chart-legend">
                <span class="leg-item"><span class="box black"></span> KLICK-ANALYSE</span>
                <span class="leg-item"><span class="box yellow"></span> SCORE-FALLBACK</span>
            </div>
        </div>
      </section>

      <!-- 4. DEMOGRAPHICS -->
      <section class="dashboard-section">
        <h2 class="section-label">DEMOGRAPHICS</h2>
        <div class="neo-grid-2">
          <div class="sub-card">
            <h3 class="inner-title">AGE DISTRIBUTION</h3>
            <div v-for="(count, age) in stats.ageGroups" :key="age" class="bar-row">
              <span class="bar-label">{{ age }} J.</span>
              <div class="bar-track"><div class="bar-fill-black" :style="{width: (count/stats.totalUsers*100) + '%'}"></div></div>
              <span class="bar-val">{{ count }}</span>
            </div>
          </div>
          <div class="sub-card">
            <h3 class="inner-title">GENDER PERFORMANCE</h3>
            <div v-for="(acc, gender) in stats.genderPerformance" :key="gender" class="bar-row">
              <span class="bar-label">{{ gender }}</span>
              <div class="bar-track"><div class="bar-fill-yellow" :style="{width: acc + '%'}"></div></div>
              <span class="bar-val">{{ acc }}%</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. RETENTION FUNNEL (REPARIERT) -->
      <section class="dashboard-section">
        <h2 class="section-label">RETENTION FUNNEL</h2>
        <div class="funnel-container">
          <div v-for="(f, index) in stats.funnel" :key="f.id" class="funnel-wrapper" :style="{ width: 100 - (index * 5) + '%' }">
            
            <div class="funnel-layer" :style="{ width: f.percent + '%' }">
              <div class="funnel-content">
                <span class="funnel-lvl">LVL {{ f.id }}</span>
                <span class="funnel-stats">{{ f.count }} USERS ({{ f.percent }}%)</span>
              </div>
            </div>

            <div v-if="index < stats.funnel.length - 1" class="funnel-connector"></div>
          </div>
        </div>
        <p class="small-info">ABSCHLUSSRATE PRO LEVEL BASIEREND AUF TOTAL PARTICIPANTS</p>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { supabase } from '@/lib/supabaseClient.js';

const allActivities = ref([]);
const allProfiles = ref([]);
const allProgress = ref([]);

onMounted(async () => {
  const [act, prof, prog] = await Promise.all([
    supabase.from('spiel_aktivitaeten').select('*'),
    supabase.from('spielerprofile').select('*'),
    supabase.from('level_fortschritt').select('*')
  ]);
  allActivities.value = act.data || [];
  allProfiles.value = prof.data || [];
  allProgress.value = prog.data || [];
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

  // 1. TECHNOLOGIE-FILTER
  const nano = acts.filter(a => a.task_type?.toLowerCase().includes('nanobana'));
  const std = acts.filter(a => 
    !a.task_type?.toLowerCase().includes('nanobana') && 
    !a.task_type?.toLowerCase().includes('assessment')
  );

  // 2. DEMOGRAFIE (Filtert ungültige Daten)
  const validProfs = profs.filter(p => p.alter > 0);
  const totalN = validProfs.length || 1;
  
  const ageGroups = {};
  validProfs.forEach(p => { ageGroups[p.alter] = (ageGroups[p.alter] || 0) + 1; });

  const genderPerformance = {};
  [...new Set(validProfs.map(p => p.geschlecht))].forEach(g => {
    const uIds = validProfs.filter(p => p.geschlecht === g).map(p => p.user_id);
    const gActs = acts.filter(a => uIds.includes(a.user_id));
    if (gActs.length > 0) genderPerformance[g] = calcAcc(gActs);
  });

  // 3. LERNKURVE
  const timeline = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(l => {
    const activityData = acts.filter(a => a.level_id === l);
    if (activityData.length > 0) return { id: l, acc: calcAcc(activityData), isFallback: false };
    
    const progressData = progs.filter(p => p.level_id === l);
    const avgScore = progressData.length ? Math.round(progressData.reduce((s, p) => s + (p.score || 0), 0) / progressData.length) : 0;
    // Score Normalisierung (0-10 -> 0-100)
    let finalAcc = avgScore <= 10 ? avgScore * 10 : avgScore;
    return { id: l, acc: Math.min(finalAcc, 100), isFallback: true };
  });

  // 4. FUNNEL LOGIK (Repariert)
  // Wir nehmen Level 1 als Basis (100%), da hier jeder Teilnehmer durchmuss
  const usersAtStart = Math.max(progs.filter(p => p.level_id === 1).length, totalN);

  return {
    totalUsers: totalN,
    globalAccuracy: calcAcc(acts.filter(a => !a.task_type?.includes('assessment'))),
    accNano: calcAcc(nano),
    accStd: calcAcc(std),
    ageGroups,
    genderPerformance,
    avgSelfAssessment: totalN ? (validProfs.reduce((s, p) => s + (p.erkennung_skill || 0), 0) / totalN).toFixed(1) : 0,
    avgAffinity: totalN ? (validProfs.reduce((s, p) => s + (p.internet_affinitaet || 0), 0) / totalN).toFixed(1) : 0,
    levelTimeline: timeline,
    funnel: [1, 2, 3, 4, 5, 6, 7, 8, 9].map(l => {
        const count = progs.filter(p => p.level_id === l).length;
        return { 
            id: l, 
            count, 
            percent: Math.min(Math.round((count / usersAtStart) * 100), 100) 
        };
    })
  };
});
</script>

<style scoped>
.dashboard-page { padding: 2rem 1rem; background: #f0f0f0; }
.main-report { background: #fff; border: 4px solid #000; box-shadow: 12px 12px 0 #000; padding: 2rem; max-width: 1000px; margin: 0 auto; }
.report-header { margin-bottom: 3rem; }
.header-top { display: flex; justify-content: space-between; align-items: center; }
.status-tag { background: #000; color: #fff; padding: 0.2rem 0.5rem; font-weight: 900; font-size: 0.7rem; }
.section-label { background: #000; color: #fff; padding: 0.4rem 1rem; display: inline-block; font-weight: 900; margin-bottom: 1.5rem; transform: skewX(-10deg); }
.dashboard-section { margin-bottom: 4rem; }

/* KPI Grid */
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1.5rem; }
.stat-box { border: 3px solid #000; padding: 1.5rem; background: #fff; box-shadow: 6px 6px 0 #000; }
.stat-box.highlight { background: var(--card-bg); }
.stat-box .value { font-size: 2.8rem; font-weight: 900; display: block; }
.stat-box .label { font-size: 0.7rem; font-weight: 900; color: #555; text-transform: uppercase; }

/* Bars */
.neo-bar-container { height: 25px; border: 3px solid #000; background: #eee; margin: 5px 0 15px; }
.fill { height: 100%; transition: width 1s ease-in-out; }
.fill.std { background: #000; }
.fill.nano { background: var(--card-bg); }
.comp-info { display: flex; justify-content: space-between; font-weight: 900; font-size: 0.8rem; }

/* DK Display */
.dk-display { display: flex; align-items: center; justify-content: center; gap: 2rem; background: #f9f9f9; border: 3px solid #000; padding: 1.5rem; }
.dk-val { font-size: 2.5rem; font-weight: 900; display: block; }
.dk-lab { font-size: 0.6rem; font-weight: 900; }
.dk-divider { font-weight: 900; background: #000; color: #fff; padding: 0.3rem; }

/* Lernkurve Chart */
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

/* Funnel (REPARIERT) */
.funnel-container { display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 600px; margin: 0 auto; }
.funnel-wrapper { display: flex; flex-direction: column; align-items: center; width: 100%; }
.funnel-layer { background: #000; color: #fff; padding: 0.6rem 1rem; border: 3px solid #000; box-shadow: 4px 4px 0 var(--card-bg); position: relative; z-index: 2; transition: width 0.5s ease; }
.funnel-content { display: flex; justify-content: space-between; font-weight: 900; font-size: 0.75rem; width: 100%; }
.funnel-lvl { background: var(--card-bg); color: #000; padding: 0 4px; margin-right: 10px; }
.funnel-connector { height: 20px; width: 4px; background: #000; position: relative; }
.funnel-connector::after { content: "▼"; position: absolute; bottom: -12px; left: 50%; transform: translateX(-50%); color: #000; font-size: 0.8rem; }

.small-info { font-size: 0.65rem; font-weight: 800; text-align: center; margin-top: 2rem; opacity: 0.6; }
.sub-card { border: 3px solid #000; padding: 1.5rem; margin-bottom: 1rem; }
.bar-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.bar-label { font-size: 0.7rem; font-weight: 900; width: 60px; }
.bar-track { flex: 1; height: 12px; border: 2px solid #000; background: #fff; }
.bar-fill-black { height: 100%; background: #000; }
.bar-fill-yellow { height: 100%; background: var(--card-bg); }
.bar-val { font-size: 0.7rem; font-weight: 900; width: 30px; text-align: right; }
</style>