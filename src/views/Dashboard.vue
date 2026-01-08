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
            <div class="comp-info"><span>MODERNE KIS</span><strong>{{ stats.accNano }}%</strong></div>
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

      <!-- 3. LERNKURVE (REPARIERT: HÖHE UND FARBE) -->
      <section class="dashboard-section">
        <h2 class="section-label">LEARNING CURVE</h2>
        <div class="learning-container">
            <div class="learning-chart">
                <div v-for="lvl in stats.levelTimeline" :key="lvl.id" class="chart-col">
                  <!-- Wir nutzen eine Klasse für die Farbe statt nur Style-Binding -->
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
              <span class="bar-label">{{ age === '0' ? 'N/A' : age + ' J.' }}</span>
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

      <!-- 5. RETENTION FUNNEL -->
            <section class="dashboard-section">
              <h2 class="section-label">RETENTION FUNNEL</h2>
              <div class="funnel-container">
                <div v-for="(f, index) in stats.funnel" :key="f.id" class="funnel-wrapper">
                  
                  <!-- Der Balken -->
                  <div class="funnel-layer" :style="{ width: f.percent + '%' }">
                    <div class="funnel-content">
                      <span class="funnel-lvl">LEVEL {{ f.id }}</span>
                      <span class="funnel-stats">{{ f.count }} USERS ({{ f.percent }}%)</span>
                    </div>
                  </div>

                  <!-- Das Verbindungsstück (nur zwischen den Balken) -->
                  <div v-if="index < stats.funnel.length - 1" class="funnel-connector">
                    <div class="connector-line"></div>
                  </div>
                </div>
              </div>
              <p class="small-info">DARSTELLUNG DER ABBRUCHRATE ÜBER DEN GESAMTEN STUDIENVERLAUF</p>
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

  // 1. TECHNOLOGIE-FILTER (Verbessert & Robuster)
  // Alles was 'nanobana' im Namen hat
  const nano = acts.filter(a => 
    a.task_type?.toLowerCase().includes('nanobana')
  );
  
  // Alles andere, was eine echte Spiel-Entscheidung war (Level 1-8)
  const std = acts.filter(a => 
    !a.task_type?.toLowerCase().includes('nanobana') && 
    !a.task_type?.toLowerCase().includes('assessment') &&
    !a.task_type?.toLowerCase().includes('navigation')
  );

  // 2. DEMOGRAFIE
  // Wir filtern "Test-Leichen" (Alter 0) aus der Statistik
  const validProfs = profs.filter(p => p.alter > 0);
  
  const ageGroups = {};
  validProfs.forEach(p => {
    const age = p.alter;
    ageGroups[age] = (ageGroups[age] || 0) + 1;
  });

  const genderPerformance = {};
  const uniqueGenders = [...new Set(validProfs.map(p => p.geschlecht))];
  uniqueGenders.forEach(g => {
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
    return { id: l, acc: Math.min(avgScore > 10 ? avgScore : avgScore * 10, 100), isFallback: true };
  });

  // 4. SELBSTEINSCHÄTZUNG NORMALISIERUNG
  const avgSelf = validProfs.length ? (validProfs.reduce((s, p) => {
      let val = p.erkennung_skill || 0;
      return s + (val > 10 ? val / 10 : val); // Macht aus 60% eine 6.0
  }, 0) / validProfs.length).toFixed(1) : 0;

  const avgAffinity = validProfs.length ? (validProfs.reduce((s, p) => s + (p.internet_affinitaet || 0), 0) / validProfs.length).toFixed(1) : 0;

  return {
    totalUsers: validProfs.length,
    globalAccuracy: calcAcc(acts.filter(a => !a.task_type?.includes('assessment'))),
    accNano: calcAcc(nano),
    accStd: calcAcc(std),
    ageGroups,
    genderPerformance,
    avgSelfAssessment: avgSelf,
    avgAffinity,
    levelTimeline: timeline,
    funnel: [1, 2, 3, 4, 5, 6, 7, 8, 9].map(l => {
        const count = progs.filter(p => p.level_id === l).length;
        return { id: l, count, percent: validProfs.length ? Math.round((count / validProfs.length) * 100) : 0 };
    })
  };
});
</script>

<style scoped>
.dashboard-page { padding: 3rem 1rem; background: #f0f0f0; }
.main-report { background: #fff; border: 4px solid #000; box-shadow: 15px 15px 0 #000; padding: 4rem; max-width: 1000px; margin: 0 auto; }

.report-header { margin-bottom: 4rem; }
.header-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem; }
.status-tag { background: #000; color: #fff; padding: 0.3rem 0.6rem; font-weight: 900; font-size: 0.7rem; }
.subtitle { font-weight: 800; color: #888; letter-spacing: 0.05em; }

.section-label { 
  background: #000; color: #fff; padding: 0.4rem 1.2rem; display: inline-block; 
  font-weight: 900; margin-bottom: 2rem; transform: skewX(-10deg); 
}

.dashboard-section { margin-bottom: 6rem; }

/* KPI Grid */
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; }
.stat-box { border: 4px solid #000; padding: 2rem; background: #fff; box-shadow: 8px 8px 0 #000; }
.stat-box.highlight { background: var(--card-bg); }
.stat-box .label { display: block; font-size: 0.7rem; font-weight: 900; color: #555; margin-bottom: 0.5rem; }
.stat-box .value { font-size: 3.5rem; font-weight: 900; line-height: 1; }

/* Technology & DK */
.comparison-item { margin-bottom: 2rem; }
.comp-info { display: flex; justify-content: space-between; font-weight: 900; font-size: 0.9rem; margin-bottom: 8px; }
.neo-bar-container { height: 35px; border: 4px solid #000; background: #eee; }
.fill { height: 100%; transition: width 1.5s cubic-bezier(0.19, 1, 0.22, 1); }
.fill.std { background: #00aa00; }
.fill.nano { background: #ff3333; }
.data-note { margin-top: 1.5rem; font-weight: 900; border-left: 5px solid #000; padding-left: 1rem; font-size: 0.8rem; }

.dk-display { display: flex; align-items: center; justify-content: space-around; background: #f9f9f9; border: 3px solid #000; padding: 2rem; margin-bottom: 1rem; }
.dk-item { text-align: center; }
.dk-val { font-size: 3rem; font-weight: 900; display: block; }
.dk-lab { font-size: 0.6rem; font-weight: 900; color: #666; }
.dk-divider { font-weight: 900; font-size: 1.2rem; background: #000; color: #fff; padding: 0.5rem; }

/* Bar Rows */
.bar-row { display: grid; grid-template-columns: 100px 1fr 50px; align-items: center; gap: 1rem; margin-bottom: 0.8rem; }
.bar-track { height: 15px; border: 3px solid #000; background: #fff; }
.bar-fill-black { height: 100%; background: #000; }
.bar-fill-yellow { height: 100%; background: var(--card-bg); }
.bar-label, .bar-val { font-weight: 900; font-size: 0.75rem; }

/* Learning Curve Chart Fix */
.learning-container { background: #fff; border: 4px solid #000; padding: 3.5rem 2rem 2rem; margin-top: 1rem; }
.learning-chart { display: flex; align-items: flex-end; gap: 12px; height: 250px; border-bottom: 4px solid #000; position: relative; }
.chart-col { flex: 1; height: 100%; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; }
.chart-bar { width: 80%; position: relative; transition: height 1s; border: 3px solid #000; border-bottom: none; }

/* FARB-KLASSEN */
.fallback-color { background-color: var(--card-bg); }
.analysis-color { background-color: #000; }

.chart-val { position: absolute; top: -30px; font-weight: 900; font-size: 0.75rem; width: 100%; text-align: center; color: #000; }
.chart-label { font-size: 0.65rem; font-weight: 900; margin-top: 10px; text-transform: uppercase; }
.chart-legend { display: flex; gap: 2rem; margin-top: 2rem; font-weight: 800; font-size: 0.7rem; }
.box { display: inline-block; width: 14px; height: 14px; border: 2px solid #000; margin-right: 6px; vertical-align: middle; }
.box.black { background: #000; }
.box.yellow { background: var(--card-bg); }

/* Funnel */
/* --- RETENTION FUNNEL STYLING --- */
.funnel-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
    background: #fff;
    border: 4px solid #000;
}

.funnel-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.funnel-layer {
    background: #000;
    color: #fff;
    padding: 0.75rem 1.5rem;
    border: 3px solid #000;
    box-shadow: 6px 6px 0 var(--card-bg);
    min-width: 120px; /* Mindestbreite damit Text lesbar bleibt */
    transition: width 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    z-index: 2;
}

.funnel-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-weight: 900;
    font-size: 0.8rem;
    text-transform: uppercase;
    white-space: nowrap;
}

.funnel-lvl {
    background: var(--card-bg);
    color: #000;
    padding: 2px 6px;
    margin-right: 10px;
}

/* Verbindungs-Linien zwischen den Balken */
.funnel-connector {
    height: 25px;
    width: 4px;
    background: #000;
    position: relative;
    z-index: 1;
}

.funnel-connector::after {
    content: "V"; /* Technischer Pfeil-Ersatz */
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    font-weight: 900;
    color: #000;
    font-size: 0.8rem;
}

/* Optimierung für die Lernkurve (Zusatz zu vorhin) */
.chart-bar.fallback-color {
    background-color: var(--card-bg) !important;
}

.chart-bar.analysis-color {
    background-color: #000 !important;
}

.chart-val {
    background: #fff;
    border: 1px solid #000;
    padding: 2px 4px;
}
</style>