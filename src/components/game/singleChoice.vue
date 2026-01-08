<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js';
import { useGameState } from '@/composables/useGameState.js';

const props = defineProps({
    image: [String, Object, Array], 
    question: String,
    options: Array,         
    correctId: String,
    feedbackText: String,
    levelId: { type: Number, default: 1 },
    timeLimit: { type: Number, default: 20 },
    isSurvey: { type: Boolean, default: false } // NEU: Wenn true -> kein Timer, keine Punkte
});

const emit = defineEmits(['completed', 'mistake']);
const { t } = useTranslation();
const { handleScoreAction } = useGameState();

const imageUrls = computed(() => {
    if (!props.image) return [];
    const list = Array.isArray(props.image) ? props.image : [props.image];
    return list.map(item => {
        if (!item) return null;
        let src = typeof item === 'string' ? item : item.src;
        let bucket = typeof item === 'object' ? (item.bucket || 'Fake-Images') : 'Fake-Images';
        if (src.startsWith('http')) return src;
        const { data } = supabase.storage.from(bucket).getPublicUrl(src);
        return data.publicUrl;
    }).filter(url => url !== null);
});

const selectedId = ref(null);
const resolved = ref(false);
const isCorrect = ref(false);
const currentIndex = ref(0);
const transitionName = ref('');
const zoomedImage = ref(null);

const timeLeft = ref(props.timeLimit);
const timerInterval = ref(null);
const isTimeout = ref(false);

const startTimer = () => {
    if (props.isSurvey) return; // KEIN TIMER IM SURVEY MODUS
    stopTimer();
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

onMounted(() => {
    if (!props.isSurvey) startTimer();
    window.addEventListener('popstate', handlePopState);
});

onUnmounted(() => {
    stopTimer();
    window.removeEventListener('popstate', handlePopState);
});

const resolve = () => {
    stopTimer();
    resolved.value = true;
    
    if (props.isSurvey) {
        // Im Survey Modus gibt es kein richtig/falsch
        isCorrect.value = true;
        return;
    }

    isCorrect.value = selectedId.value === props.correctId;
    handleScoreAction(isCorrect.value, props.levelId);
    if (!isCorrect.value) emit('mistake');
};

const openZoom = (url) => { zoomedImage.value = url; history.pushState({modal:true}, ''); };
const closeZoom = () => { if (zoomedImage.value) history.back(); };
const handlePopState = () => { zoomedImage.value = null; };
const nextCard = () => { transitionName.value = 'slide-left'; currentIndex.value = (currentIndex.value + 1) % imageUrls.value.length; };
const prevCard = () => { transitionName.value = 'slide-right'; currentIndex.value = (currentIndex.value - 1 + imageUrls.value.length) % imageUrls.value.length; };
</script>

<template>
    <div class="neo-card" :class="{ 'shake-anim': isTimeout }">
        <div class="card-header">
            <h2 class="neo-title">{{ question }}</h2>
            <!-- Timer nur zeigen, wenn KEIN Survey -->
            <div v-if="!isSurvey" class="timer-badge" :class="{ 'critical': timeLeft <= 5 }">
                ⏳ {{ timeLeft }}s
            </div>
        </div>
        
        <div v-if="imageUrls.length > 0">
            <div class="stack-counter" v-if="imageUrls.length > 1">Bild {{ currentIndex + 1 }} / {{ imageUrls.length }}</div>
            <div class="stack-container">
                <Transition :name="transitionName" mode="out-in">
                    <div :key="currentIndex" class="stack-card" @click="openZoom(imageUrls[currentIndex])">
                        <img :src="imageUrls[currentIndex]" draggable="false" />
                        <div class="zoom-hint">🔍</div>
                    </div>
                </Transition>
            </div>
             <div class="stack-controls" v-if="imageUrls.length > 1">
                <button class="stack-nav-btn" @click="prevCard">←</button>
                <button class="stack-nav-btn" @click="nextCard">→</button>
            </div>
        </div>

        <div class="options-stack">
            <button v-for="opt in options" :key="opt.id" 
                class="option-btn" 
                :class="{ 
                    'selected': selectedId === opt.id, 
                    'correct': !isSurvey && resolved && opt.id === correctId, 
                    'wrong': !isSurvey && resolved && selectedId === opt.id && selectedId !== correctId 
                }" 
                @click="!resolved && (selectedId = opt.id)">
                {{ opt.text }}
            </button>
        </div>

        <button v-if="!resolved" class="neo-btn" @click="resolve" :disabled="!selectedId">{{ t('generic.next') }}</button>

        <div v-if="resolved" class="neo-feedback">
            <!-- Neutraler Text für Survey -->
            <p v-if="isSurvey" class="text-neutral">Danke für deine Einschätzung!</p>
            <p v-else-if="isCorrect" class="text-success">{{ feedbackText }}</p>
            <p v-else class="text-fail">Nicht ganz richtig.</p>
            <button class="neo-btn" @click="$emit('completed', selectedId)">{{ t('generic.next') }}</button>
        </div>
        
        <div v-if="zoomedImage" class="zoom-overlay" @click="closeZoom"><button class="zoom-close-btn">✕</button><img :src="zoomedImage" class="zoom-content" @click.stop /></div>
    </div>
</template>

<style scoped>
.card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem; }
.neo-title { margin: 0; font-size: 1.1rem; flex: 1; text-transform: uppercase; font-weight: 800; }
.timer-badge { background: #000; color: #fff; padding: 0.3rem 0.6rem; font-weight: 900; border: 2px solid #000; }

/* FIX FÜR BILD-POSITIONIERUNG */
.image-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.choice-stack-container {
    width: 100%;
    max-width: 320px; /* Begrenzt die Breite im Single-Choice Layout */
    aspect-ratio: 4/5;
    position: relative;
    margin: 0 auto;
}

.choice-stack-card {
    position: absolute;
    inset: 0;
    border: 3px solid #000;
    background: #000;
    cursor: zoom-in;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.choice-stack-card img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Füllt den Kasten komplett aus */
}

.zoom-hint {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background: rgba(255,255,255,0.9);
    border: 2px solid #000;
    padding: 5px;
    font-size: 1rem;
    z-index: 5;
}

/* Restliches Styling */
.options-stack { display: flex; flex-direction: column; gap: 0.5rem; margin: 1rem 0; width: 100%; }
.option-btn { background: #fff; border: 2px solid #000; padding: 0.8rem; text-align: left; cursor: pointer; font-weight: 800; text-transform: uppercase; }
.option-btn.selected { background: #000; color: #fff; }
.option-btn.correct { background: #00aa00; color: #fff; }
.option-btn.wrong { background: #ff3333; color: #fff; }
.text-neutral { color: #000; font-weight: 800; text-transform: uppercase; }
</style>