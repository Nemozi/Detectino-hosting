<script setup>
import { useTranslation } from '@/composables/useTranslation.js';
const { t } = useTranslation();
</script>

<template>
    <div class="content-wrapper">
        <!-- Hauptkarte mit deiner globalen Klasse -->
        <div class="neo-card info-card">
            <h1 class="neo-title">{{ t('info.title') }}</h1>
            
            <p class="main-description">{{ t('info.description') }}</p>

            <!-- Didaktik-Bereich -->
            <div class="didactic-container">
                <h2 class="didactic-sub-title">{{ t('didactic.title') }}</h2>
                <p class="didactic-intro">{{ t('didactic.intro') }}</p>
                
                <div class="points-list">
                    <div class="point-item">
                        <span class="point-label">1. {{ t('didactic.point1_title') }}</span>
                        <p>{{ t('didactic.point1_text') }}</p>
                    </div>
                    <div class="point-item">
                        <span class="point-label">2. {{ t('didactic.point2_title') }}</span>
                        <p>{{ t('didactic.point2_text') }}</p>
                    </div>
                    <div class="point-item">
                        <span class="point-label">3. {{ t('didactic.point3_title') }}</span>
                        <p>{{ t('didactic.point3_text') }}</p>
                    </div>
                </div>
            </div>

            <!-- Credit-Bereich mit deiner globalen neo-info-box Klasse -->
            <div class="neo-info-box credit-box">
                <p class="unsplash-note">{{ t('info.unsplashNote') }}</p>
                <div class="link-grid">
                    <a href="https://github.com/Nemozi/Detectino-Images" target="_blank" rel="noopener noreferrer">
                        Self generated Images: GitHub
                    </a> 
                    <a href="https://zenodo.org/records/15131117" target="_blank" rel="noopener noreferrer">
                        ASD-4SD Dataset: Zenodo
                    </a>
                </div>
            </div>

            <!-- Dein globaler Button -->
            <router-link to="/" class="neo-btn">
                {{ t('info.button') }}
            </router-link>
        </div>
    </div>
</template>

<style scoped>
/* Spezifische Layout-Anpassungen, die nicht im globalen CSS sind */
.info-card {
    max-width: min(42rem, 95vw);
}

.main-description {
    font-size: 1.1rem;
    font-weight: 600;
    line-height: 1.4;
    margin: 0;
}

/* Didaktik Styling */
.didactic-container {
    background: rgba(255, 255, 255, 0.5); /* Leicht transparentes Weiß auf dem Gelb */
    padding: 1.2rem;
    border: 2px solid var(--border-color);
}

.didactic-sub-title {
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
    font-weight: 900;
    text-transform: uppercase;
}

.didactic-intro {
    font-size: 0.95rem;
    font-weight: 700;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 0.5rem;
}

.points-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.point-item {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
}

.point-label {
    font-weight: 900;
    text-transform: uppercase;
    font-size: 0.85rem;
    color: #000;
}

.point-item p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.3;
    font-weight: 500;
}

/* Credits & Links */
.credit-box {
    margin-top: 0; /* Box-Shadow Abstand wird durch Flex-Gap geregelt */
}

.unsplash-note {
    font-style: italic;
    font-weight: 600;
    margin-bottom: 0.75rem;
    display: block;
}

.link-grid {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.link-grid a {
    word-break: break-all;
}

@media (max-width: 600px) {
    .info-card {
        padding: 1rem;
        gap: 1rem;
    }
}
</style>