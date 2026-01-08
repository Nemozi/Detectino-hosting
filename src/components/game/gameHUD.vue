<script setup>
import { onMounted } from 'vue';
import { useGameState } from '@/composables/useGameState.js';

const { totalScore, streak, scoreFeedback, initScore } = useGameState();

onMounted(() => {
    initScore();
});
</script>

<template>
    <div class="hud-sticky-wrapper">
        <div class="hud-bar">
            <!-- PUNKTE -->
            <div class="score-section">
                <span class="label">SCORE</span>
                <span class="value">{{ totalScore }}</span>
            </div>
            
            <!-- STREAK (Nur sichtbar wenn > 1) -->
            <div class="streak-section" v-if="streak > 1">
                <span class="fire">🔥</span>
                <span class="streak-val">{{ streak }}</span>
            </div>
        </div>

        <!-- Fliegende Punkte Animation (schwebt über allem) -->
        <div v-if="scoreFeedback" 
             class="score-float" 
             :class="scoreFeedback.type === 'positive' ? 'score-positive' : 'score-negative'">
            {{ scoreFeedback.text }}
        </div>
    </div>
</template>

<style scoped>
/* Der Wrapper klebt oben am Bildschirm */
.hud-sticky-wrapper {
    position: sticky;
    top: 0;
    z-index: 900; /* Unter dem Zoom-Overlay, aber über dem Content */
    width: 100%;
    pointer-events: none; /* Klicks gehen durch leere Bereiche durch */
    display: flex;
    justify-content: center;
    padding-top: 10px;
}

/* Die eigentliche Leiste */
.hud-bar {
    pointer-events: auto;
    background: #fff;
    border: 2px solid #000;
    box-shadow: 4px 4px 0 rgba(0,0,0,0.2);
    padding: 0.5rem 1.5rem;
    display: flex;
    gap: 2rem;
    align-items: center;
    justify-content: center;
    min-width: 200px;
}

.score-section { 
    font-size: 1.2rem; 
    font-weight: 900; 
    display: flex; 
    align-items: center;
    gap: 0.5rem; 
}

.label {
    font-size: 0.7rem;
    color: #666;
    letter-spacing: 1px;
}

.streak-section { 
    font-size: 1.2rem; 
    font-weight: 900; 
    color: #ff6600; 
    display: flex; 
    align-items: center;
    gap: 0.2rem; 
    animation: bounce 0.5s;
}

@keyframes bounce {
    0% { transform: scale(1); }
    50% { transform: scale(1.3); }
    100% { transform: scale(1); }
}

/* Die fliegende Zahl (nutzt styles aus base.css wenn vorhanden, sonst hier:) */
.score-float {
    position: absolute;
    top: 150px; /* Etwas tiefer als die Bar */
    left: 50%;
    transform: translateX(-50%);
    font-size: 3rem;
    font-weight: 900;
    text-shadow: 2px 2px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff; /* Weisser Rand für Lesbarkeit */
    z-index: 999;
    animation: floatUp 1.2s forwards;
    white-space: nowrap;
}

.score-positive { color: #00aa00; }
.score-negative { color: #ff3333; }

@keyframes floatUp {
    0% { opacity: 0; transform: translate(-50%, 0) scale(0.5); }
    20% { opacity: 1; transform: translate(-50%, -20px) scale(1.2); }
    100% { opacity: 0; transform: translate(-50%, -80px) scale(1); }
}
</style>