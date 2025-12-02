<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const startGame = () => {
    // Hier würdest du zum eigentlichen Spiel/Canvas weiterleiten
    // z.B. router.push('/game');
    console.log("Spiel gestartet");
};
</script>

<template>
    <div class="content-wrapper">
        <div class="explain-card">
            <h1>Wie es funktioniert</h1>
            
            <div class="step-container">
                <div class="step">
                    <span class="step-number">1</span>
                    <p>Du bekommst gleich verschiedene Bilder angezeigt.</p>
                </div>
                
                <div class="step">
                    <span class="step-number">2</span>
                    <p>Deine Aufgabe ist es zu entscheiden: <strong>Echt oder KI?</strong></p>
                </div>

                <div class="step">
                    <span class="step-number">3</span>
                    <p>Nutze den Schieberegler, um deine Sicherheit anzugeben.</p>
                </div>
            </div>

            <div class="info-box">
                <span class="icon">ℹ️</span>
                <p>Die Daten werden anonym für ein Forschungsprojekt gesammelt.</p>
            </div>

            <button @click="startGame" class="primary-btn">
                Verstanden, Los geht's!
            </button>
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

.primary-btn {
    width: 100%;
    padding: 1.25rem;
    background: #000;
    color: #fff;
    border: none;
    font-size: 1.1rem;
    text-transform: uppercase;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.1s, box-shadow 0.1s;
    letter-spacing: 0.05em;
}

.primary-btn:hover {
    background: #222;
    transform: translate(-2px, -2px);
    box-shadow: 4px 4px 0 rgba(0,0,0,0.2);
}

.primary-btn:active {
    transform: translate(0, 0);
    box-shadow: none;
}

@media (max-width: 600px) {
    .explain-card { padding: 1.5rem; }
    .step { flex-direction: column; text-align: center; }
}
</style>