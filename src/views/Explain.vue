<script setup>
import { useRouter } from 'vue-router';
import { useTranslation } from '@/composables/useTranslation.js';

const router = useRouter();
const { t } = useTranslation();
</script>

<template>
    <div class="content-wrapper">
        <div class="explain-card">
            <h1>{{ t('explain.title') }}</h1>
            
            <div class="step-container">
                <div class="step">
                    <span class="step-number">A</span>
                    <p>{{ t('explain.stepA') }}</p>
                </div>
                
                <div class="step">
                    <span class="step-number">B</span>
                    <p>{{ t('explain.stepB') }}</p>
                </div>

                <div class="step">
                    <span class="step-number">C</span>
                    <p>{{ t('explain.stepC') }}</p>
                </div>

                <div class="step">
                    <span class="step-number">D</span>
                    <p>{{ t('explain.stepD') }}</p>
                </div>
            </div>

            <router-link to="/levels" class="primary-btn">
                {{ t('explain.button') }}
            </router-link>
        </div>
    </div>
</template>

<style scoped>
/* Dein CSS bleibt unverändert */
.explain-card { background: var(--card-bg, #edc531); border: var(--border, 0.0625rem solid #1a1a1a); box-shadow: 0.375rem 0.375rem 0 rgba(0,0,0,1); padding: 2.5rem; width: 100%; max-width: 40rem; margin: 0 auto; display: flex; flex-direction: column; gap: 2rem; }
h1 { font-size: clamp(1.5rem, 4vw, 2rem); font-weight: 800; margin: 0; text-transform: uppercase; text-align: center; border-bottom: 3px solid #000; padding-bottom: 1rem; line-height: 1.1; }
.step-container { display: flex; flex-direction: column; gap: 1.5rem; }
.step { display: flex; align-items: center; gap: 1rem; background: #fff; border: 1px solid #000; padding: 1rem; box-shadow: 4px 4px 0 rgba(0,0,0,0.1); }
.step-number { background: #000; color: #fff; width: 2rem; height: 2rem; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2rem; flex-shrink: 0; }
p { margin: 0; font-size: 1.1rem; line-height: 1.4; font-weight: 500; }
@media (max-width: 600px) { .explain-card { padding: 1.5rem; } .step { flex-direction: column; text-align: center; } }
</style>