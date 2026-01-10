<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js'; // NEU

const { t } = useTranslation(); // NEU
const leaders = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
        .from('spielerprofile')
        .select('user_id, username, global_score')
        .order('global_score', { ascending: false })
        .limit(20);

    if (error) throw error;

    if (data) {
        leaders.value = data.map(profile => ({
            id: profile.user_id,
            name: profile.username || `Agent_${profile.user_id.substring(0, 5)}`,
            score: profile.global_score || 0,
            isMe: user?.id === profile.user_id
        }));
    }
  } catch (err) {
    console.error("Leaderboard Error:", err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="level-container">
    <div class="neo-card leaderboard-card">
      <div class="header-flex">
        <h1 class="neo-title">{{ t('leaderboard.title') }}</h1>
      </div>
      
      <p class="leaderboard-desc">{{ t('leaderboard.description') }}</p>

      <div class="leaderboard-table">
        <div class="leader-row header">
          <span class="rank-col">{{ t('leaderboard.colRank') }}</span>
          <span class="name-col">{{ t('leaderboard.colUser') }}</span>
          <span class="score-col">{{ t('leaderboard.colPoints') }}</span>
        </div>
        
        <div v-if="loading" class="loading-inline">
            {{ t('leaderboard.loading') }}
        </div>

        <div v-else v-for="(player, index) in leaders" 
             :key="player.id" 
             class="leader-row" 
             :class="{ 'is-me': player.isMe, 'top-three': index < 3 }">
          
          <span class="rank-col">
            <span v-if="index === 0">🥇</span>
            <span v-else-if="index === 1">🥈</span>
            <span v-else-if="index === 2">🥉</span>
            <span v-else>{{ index + 1 }}</span>
          </span>

          <span class="name-col text-truncate">
            {{ player.name }}
            <span v-if="player.isMe" class="me-badge">{{ t('leaderboard.meBadge') }}</span>
          </span>

          <span class="score-col font-black">
            {{ player.score.toLocaleString() }}
          </span>
        </div>
      </div>

      <div class="leaderboard-footer">
          <p>{{ t('leaderboard.footer') }}</p>
      </div>
    </div>
  </div>
</template>


<style scoped>
.leaderboard-card { margin-top: 2rem; padding: 2.5rem; background: #fff; }
.header-flex { display: flex; justify-content: space-between; align-items: center; border-bottom: 4px solid #000; padding-bottom: 1rem; margin-bottom: 1rem; }
.trophy-icon { font-size: 3rem; }
.leaderboard-desc { font-weight: 700; text-transform: uppercase; font-size: 0.8rem; color: #666; margin-bottom: 2rem; }

.leaderboard-table { border: 3px solid #000; background: #fff; box-shadow: 8px 8px 0 #000; }

.leader-row { 
    display: grid; 
    grid-template-columns: 60px 1fr 100px; 
    padding: 1rem; 
    border-bottom: 2px solid #000;
    align-items: center;
    font-weight: 700;
}

.leader-row:last-child { border-bottom: none; }
.header { background: #000; color: #fff; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.1em; }

/* Spalten Styling */
.rank-col { font-weight: 900; font-size: 1.1rem; }
.score-col { text-align: right; font-size: 1.2rem; }
.text-truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding-right: 10px; }

/* Spezial-Zustände */
.top-three { background: #fafafa; }
.is-me { background: var(--card-bg, #edc531) !important; }

.me-badge {
    font-size: 0.6rem;
    background: #000;
    color: #fff;
    padding: 2px 5px;
    margin-left: 8px;
    vertical-align: middle;
}

.font-black { font-weight: 900; }

.loading-inline { padding: 2rem; text-align: center; font-weight: 800; text-transform: uppercase; }

.leaderboard-footer {
    margin-top: 2rem;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #888;
    text-align: center;
}

@media (max-width: 400px) {
    .leader-row { grid-template-columns: 40px 1fr 80px; padding: 0.8rem 0.5rem; }
    .leaderboard-card { padding: 1rem; }
}
</style>