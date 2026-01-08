<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js';
import { useUnsplash } from '@/composables/useUnsplash.js';
import { useGameState } from '@/composables/useGameState.js'; 

const props = defineProps({
    imageData: Object, 
    questionText: { type: String, default: "Echt oder KI?" },
    levelId: { type: Number, default: 1 },
    timeLimit: { type: Number, default: 20 }
});

const emit = defineEmits(['completed', 'mistake']);
const { t } = useTranslation(); 
const { triggerDownloadPing } = useUnsplash();
const { handleScoreAction } = useGameState(); 

const resolved = ref(false);
const selectedType = ref(null); 
const isCorrect = ref(false);
const loading = ref(true);
const activeCredits = ref([]); 
const zoomedImage = ref(null);
const fullImageUrl = ref('');

const timeLeft = ref(props.timeLimit);
const timerInterval = ref(null);
const isTimeout = ref(false);

const startTimer = () => {
    stopTimer(); 
    if (props.timeLimit === 0) return;
    timeLeft.value = props.timeLimit;
    isTimeout.value = false;
    timerInterval.value = setInterval(() => {
        if (timeLeft.value > 0) timeLeft.value--;
        else handleTimeout();
    }, 1000);
};

const stopTimer = () => { if (timerInterval.value) clearInterval(timerInterval.value); };

const handleTimeout = () => {
    stopTimer();
    isTimeout.value = true;
    handleScoreAction(false, props.levelId);
};

const openZoom = (url) => {
    if (!url) return;
    zoomedImage.value = url;
    window.history.pushState({ modal: true }, '');
};

const closeZoom = () => {
    if (zoomedImage.value) {
        zoomedImage.value = null;
        if (window.history.state?.modal) window.history.back();
    }
};

const handlePopState = () => { zoomedImage.value = null; };

const loadImage = () => {
    if (!props.imageData) return;
    loading.value = true;
    resolved.value = false;
    selectedType.value = null;
    activeCredits.value = [];
    
    if (props.imageData.isAi) {
        const { data } = supabase.storage.from(props.imageData.bucket).getPublicUrl(props.imageData.src);
        fullImageUrl.value = data.publicUrl;
    } else {
        fullImageUrl.value = props.imageData.src;
    }
    
    loading.value = false;
    startTimer();
};

onMounted(() => {
    loadImage();
    window.addEventListener('popstate', handlePopState);
});

onUnmounted(() => {
    stopTimer();
    window.removeEventListener('popstate', handlePopState);
});

watch(() => props.imageData, loadImage);

const submitAnswer = async () => {
    if (!selectedType.value || resolved.value) return;
    stopTimer();
    
    const actuallyAi = props.imageData.isAi;
    isCorrect.value = (selectedType.value === 'ai' && actuallyAi) || (selectedType.value === 'real' && !actuallyAi);
    resolved.value = true;

    // Daten an DB senden
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        supabase.from('spiel_aktivitaeten').insert({
            user_id: user.id,
            level_id: props.levelId,
            task_type: `binary_${props.imageData.source || 'standard'}`,
            image_name: props.imageData.name,
            is_correct: isCorrect.value,
            interaction_type: selectedType.value
        });
    }

    handleScoreAction(isCorrect.value, props.levelId);
    
    // Unsplash Credits laden
    if (!props.imageData.isAi && props.imageData.credit) {
        activeCredits.value = [props.imageData.credit];
        triggerDownloadPing(props.imageData.credit.downloadLocation);
    }

    if (!isCorrect.value) emit('mistake');
};
</script>

<template>
    <div class="neo-card relative-container" :class="{ 'shake-anim': isTimeout }">
        <div class="neo-header">
            <h2 class="neo-title">{{ questionText }}</h2>
            <div v-if="timeLimit > 0" class="neo-pill" :class="{ 'critical': timeLeft <= 5 }">⏳ {{ timeLeft }}s</div>
        </div>

        <div v-if="loading" style="text-align:center; padding: 2rem;">Lade Bild...</div>

        <div v-else>
            <div class="stack-container">
                <div class="stack-card" :class="{'is-correct': resolved && isCorrect, 'is-wrong': resolved && !isCorrect}" @click="openZoom(fullImageUrl)">
                    <img :src="fullImageUrl" draggable="false" />
                    <div class="neo-badge center correct" v-if="resolved && isCorrect">RICHTIG</div>
                    <div class="neo-badge center wrong" v-if="resolved && !isCorrect">FALSCH</div>
                    <div class="zoom-hint">🔍</div>
                </div>
            </div>

            <div v-if="isTimeout && !resolved" class="timeout-msg">Zeit abgelaufen! (-5 Punkte)</div>

            <div class="neo-grid-2">
                <button class="neo-btn-toggle" :class="{ 'active': selectedType === 'real' }" :disabled="resolved" @click="selectedType = 'real'">ECHT</button>
                <button class="neo-btn-toggle" :class="{ 'active': selectedType === 'ai' }" :disabled="resolved" @click="selectedType = 'ai'">GENERIERT</button>
            </div>

            <button v-if="!resolved" class="neo-btn" style="margin-top:1rem" :disabled="!selectedType" @click="submitAnswer">PRÜFEN</button>

            <div v-if="resolved" class="neo-feedback">
                <p :class="isCorrect ? 'text-success' : 'text-fail'" style="font-weight: 800; text-transform: uppercase;">
                    {{ isCorrect ? 'Gut gemacht!' : 'Leider falsch.' }}
                </p>
                <p style="font-weight: 600; margin-bottom: 1rem;">
                    Dieses Bild ist {{ imageData.isAi ? 'KI-generiert.' : 'ein echtes Foto.' }}
                </p>

                <!-- QUELLENANGABE (WIE BEI SPOT THE FAKE) -->
                <div v-if="activeCredits.length > 0" class="neo-info-box">
                    <small>Foto von 
                        <a :href="activeCredits[0].link + '?utm_source=Detectino&utm_medium=referral'" target="_blank">
                            {{ activeCredits[0].name }}
                        </a> auf Unsplash
                    </small>
                </div>

                <button class="neo-btn" @click="$emit('completed')">Nächste Runde</button>
            </div>
        </div>

        <div v-if="zoomedImage" class="zoom-overlay" @click="closeZoom">
            <button class="zoom-close-btn" @click.stop="closeZoom">✕</button>
            <img :src="zoomedImage" class="zoom-content" />
        </div>
    </div>
</template>

<style scoped>
.relative-container { position: relative; width: 100%; }
.zoom-hint { position: absolute; bottom: 10px; right: 10px; background: rgba(255,255,255,0.8); padding: 5px; border: 2px solid #000; pointer-events: none; }
.timeout-msg { color: #ff3333; font-weight: 900; text-align: center; text-transform: uppercase; margin-top: 0.5rem; animation: blink 0.5s infinite; }
@keyframes blink { 50% { opacity: 0.5; } }
@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
.shake-anim { animation: shake 0.4s; }
</style>