<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

</script>

<template>
    <div class="content-wrapper">
        <div class="explain-card">
            <h1>Wie es funktioniert</h1>
            
            <div class="step-container">
                <div class="step">
                    <span class="step-number">A</span>
                    <p>Wilkommen bei Detectino, hier lernst du "KI-generierte Bilder" zu erkennen und deine Erkennungsfähigkeiten zu testen.</p>
                </div>
                
                <div class="step">
                    <span class="step-number">B</span>
                    <p>Im nächsten Schritt bekommst du deine Level gezeigt, spiele um weitere alle freizuschalten "Echt oder KI?""</p>
                </div>

                <div class="step">
                    <span class="step-number">C</span>
                    <p>Schau dir gerne das Leaderboard an und vergleiche dich mit anderen Spielern. Die Statistiken zur auswertung des gesamten Spiels findest du ebenfalls im Menü</p>
                </div>
            </div>

            <div class="step">
                <span class="step-number">D</span>
                <p>Detectino ist ein Forschungsprojekt. Deine Daten werden anonym gesammelt. Mehr Infos findest du unter Info.</p>
            </div>

            <router-link to="/levels" class="primary-btn">
                Los geht's
            </router-link>
        </div>
    </div>
</template>

<style scoped>
/* Nutzt deine globalen Variablen */

.explain-card {
    background: var(--card-bg, #edc531);
    border: var(--border, 0.0625rem solid #1a1a1a);
    box-shadow: 0.375rem 0.375rem 0 rgba(0,0,0,1);
    padding: 2.5rem;
    width: 100%;
    max-width: 40rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

h1 {
    font-size: clamp(1.5rem, 4vw, 2rem);
    font-weight: 800;
    margin: 0;
    text-transform: uppercase;
    text-align: center;
    border-bottom: 3px solid #000;
    padding-bottom: 1rem;
    line-height: 1.1;
}

.step-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.step {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: #fff;
    border: 1px solid #000;
    padding: 1rem;
    box-shadow: 4px 4px 0 rgba(0,0,0,0.1);
}

.step-number {
    background: #000;
    color: #fff;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
    flex-shrink: 0;
}

p {
    margin: 0;
    font-size: 1.1rem;
    line-height: 1.4;
    font-weight: 500;
}

.info-box {
    display: flex;
    gap: 1rem;
    background: #f2efe5;
    border: 1px dashed #000;
    padding: 1rem;
    align-items: center;
}

.icon {
    font-size: 1.5rem;
}



@media (max-width: 600px) {
    .explain-card { padding: 1.5rem; }
    .step { flex-direction: column; text-align: center; }
}
</style>