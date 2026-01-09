<script setup>
import { useTranslation } from '@/composables/useTranslation.js';
const { t } = useTranslation();
</script>

<template>
    <div class="content-wrapper">
        <div class="welcomeCard">
            <h1>{{ t('info.title') }}</h1>
            <p>{{ t('info.description') }}</p>
            <p style="font-size: 0.9rem; opacity: 0.8; font-style: italic;">{{ t('info.unsplashNote') }}</p>
            <router-link to="/" class="register-btn">
                {{ t('info.button') }}
            </router-link>
        </div>
    </div>
</template>

<style scoped>
/* Dein CSS (scoped hinzugefügt um welcomeCard nicht global zu stören) */
.welcomeCard { background-color: var(--card-bg); width: 100%; max-width: min(30rem, 80vw); padding: 2.5rem 3rem; display: flex; flex-direction: column; gap: 1.5rem; border: 1px solid #000; box-shadow: 0.375rem 0.375rem 0 rgba(0,0,0,1); }
.welcomeCard h1 { font-size: clamp(1.5rem, 4vw, 2.2rem); font-weight: 900; margin: 0; text-transform: uppercase; }
.welcomeCard p { font-size: 1.2rem; line-height: 1.5; font-weight: 600; }
.register-btn { background-color: #000; color: #fff; border: none; font-size: 1rem; font-weight: 800; cursor: pointer; padding: 1rem; text-align: center; text-decoration: none; text-transform: uppercase; }
.register-btn:hover { background-color: #fff; color: #000; box-shadow: 0.25rem 0.25rem 0 rgba(0,0,0,.2); transform: translate(-2px, -2px); }
@media (max-width: 600px) { .welcomeCard { padding: 1.5rem; } .welcomeCard p { font-size: 1.1rem; } }
</style>