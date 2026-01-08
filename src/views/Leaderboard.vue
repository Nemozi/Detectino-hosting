<template>
  <div class="level-container">
    <div class="neo-card" style="margin-top: 2rem;">
      <h1 class="neo-title">Top Detectives</h1>
      
      <div class="leaderboard-table">
        <div class="leader-row header">
          <span>Rang</span>
          <span>User</span>
          <span>Gesamt-Score</span>
        </div>
        
        <div v-for="(player, index) in leaders" :key="index" 
             class="leader-row" :class="{ 'is-me': player.isMe }">
          <span class="rank">#{{ index + 1 }}</span>
          <span class="user-id">{{ player.userId.substring(0,8) }}...</span>
          <span class="score">{{ player.totalScore }} Pkt.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '@/lib/supabaseClient.js';

const leaders = ref([]);

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  // Wir holen den Score UND den Usernamen über einen Join
const { data } = await supabase
    .from('level_fortschritt')
    .select(`
      score,
      user_id,
      spielerprofile:user_id ( username )
    `);

if (data) {
    const grouped = data.reduce((acc, curr) => {
      const uid = curr.user_id;
      // Wir nehmen einfach den gespeicherten Usernamen (der ja nun immer existiert)
      const name = curr.spielerprofile?.username || 'Unbekannt';
      
      if (!acc[uid]) {
        acc[uid] = { name: name, totalScore: 0, isMe: user?.id === uid };
      }
      acc[uid].totalScore += curr.score;
      return acc;
    }, {});

    leaders.value = Object.values(grouped)
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, 10);
  }
});
</script>

<style scoped>
.leaderboard-table { border: 2px solid #000; background: #fff; }
.leader-row { display: grid; grid-template-columns: 60px 1fr 120px; padding: 0.8rem; border-bottom: 2px solid #000; }
.leader-row:last-child { border-bottom: none; }
.header { background: #000; color: #fff; font-weight: bold; text-transform: uppercase; }
.rank { font-weight: 900; }
.score { font-weight: 900; text-align: right; }
.is-me { background: #edc531 !important; }
</style>