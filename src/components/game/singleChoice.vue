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
    failFeedbackText: String,
    levelId: { type: Number, default: 1 },
    timeLimit: { type: Number, default: 20 },
    isSurvey: { type: Boolean, default: false },
    isLocked: { type: Boolean, default: false } 
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
    if (props.isSurvey || props.timeLimit === 0) return;
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
    if (!props.isSurvey && props.timeLimit > 0) startTimer();
    window.addEventListener('popstate', handlePopState);
});

onUnmounted(() => {
    stopTimer();
    window.removeEventListener('popstate', handlePopState);
});

const openZoom = (url) => { zoomedImage.value = url; history.pushState({modal:true}, ''); };
const closeZoom = () => { if (zoomedImage.value) { zoomedImage.value = null; if (window.history.state?.modal) history.back(); } };
const handlePopState = () => { zoomedImage.value = null; };

const nextCard = () => { transitionName.value = 'slide-left'; currentIndex.value = (currentIndex.value + 1) % imageUrls.value.length; };
const prevCard = () => { transitionName.value = 'slide-right'; currentIndex.value = (currentIndex.value - 1 + imageUrls.value.length) % imageUrls.value.length; };

const resolve = () => {
    stopTimer();
    resolved.value = true;
    if (props.isSurvey) { isCorrect.value = true; return; }
    isCorrect.value = selectedId.value === props.correctId;
    handleScoreAction(isCorrect.value, props.levelId);
    if (!isCorrect.value) emit('mistake');
};
</script>

<template>
    <div class="neo-card" :class="{ 'shake-anim': isTimeout }">
        <div class="card-header">
            <h2 class="neo-title">{{ question }}</h2>
            <div v-if="!isSurvey && timeLimit > 0" class="timer-badge" :class="{ 'critical': timeLeft <= 5 }">
                ⏳ {{ timeLeft }}s
            </div>
        </div>
        
        <div v-if="imageUrls.length > 0" class="image-section">
            <div class="stack-counter" v-if="imageUrls.length > 1">
                {{ t('generic.image') }} {{ currentIndex + 1 }} / {{ imageUrls.length }}
            </div>
            <div class="choice-stack-container">
                <Transition :name="transitionName" mode="out-in">
                    <div :key="currentIndex" class="choice-stack-card" @click="openZoom(imageUrls[currentIndex])">
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
                    'is-selected': selectedId === opt.id, 
                    'is-correct': !isSurvey && resolved && opt.id === correctId, 
                    'is-wrong': !isSurvey && resolved && selectedId === opt.id && selectedId !== correctId,
                    'is-locked': isLocked || (resolved && selectedId !== opt.id)
                }" 
                @click="!resolved && !isLocked && (selectedId = opt.id)">
                {{ opt.text }}
            </button>
        </div>

        <button v-if="!resolved" 
                class="neo-btn" 
                @click="resolve" 
                :disabled="!selectedId || isLocked">
            <!-- ÄNDERUNG: Übersetzung für Locked-Zustand -->
            <span v-if="isLocked"> {{ t('singleChoice.lockedMessage') }}</span>
            <span v-else>{{ t('generic.verify') }}</span>
        </button>
        
        <div v-if="resolved" class="neo-feedback">
            <!-- ÄNDERUNGEN: Übersetzungen für Feedback -->
            <p v-if="isSurvey" class="text-neutral">{{ t('singleChoice.surveyFeedback') }}</p>
            <p v-else-if="isCorrect" class="text-success">{{ feedbackText }}</p>
            <p v-else class="text-fail">{{ failFeedbackText || t('singleChoice.wrongDefault') }}</p>
            <button class="neo-btn" @click="$emit('completed', selectedId)">{{ t('generic.next') }}</button>
        </div>
        
        <div v-if="zoomedImage" class="zoom-overlay" @click="closeZoom">
            <button class="zoom-close-btn" @click.stop="closeZoom">✕</button>
            <img :src="zoomedImage" class="zoom-content" />
        </div>
    </div>
</template>

<style scoped>
.card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem; }
.neo-title { margin: 0; font-size: 1.1rem; flex: 1; text-transform: uppercase; font-weight: 800; }
.timer-badge { background: #000; color: #fff; padding: 0.3rem 0.6rem; font-weight: 900; border: 2px solid #000; }

.image-section { display: flex; flex-direction: column; align-items: center; width: 100%; }
.choice-stack-container { width: 100%; max-width: 320px; aspect-ratio: 4/5; position: relative; margin: 0 auto; }
.choice-stack-card { position: absolute; inset: 0; border: 3px solid #000; background: #000; cursor: zoom-in; display: flex; justify-content: center; align-items: center; overflow: hidden; }
.choice-stack-card img { width: 100%; height: 100%; object-fit: cover; }

.stack-controls { display: flex; justify-content: center; gap: 2.5rem; margin-top: 1.2rem; margin-bottom: 0.5rem; }
.stack-nav-btn { background: #fff; border: 2px solid #000; width: 48px; height: 48px; border-radius: 50%; font-size: 1.3rem; font-weight: 900; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 4px 4px 0 #000; transition: transform 0.1s; }
.stack-nav-btn:active { transform: translate(2px, 2px); box-shadow: 1px 1px 0 #000; }

.zoom-hint { position: absolute; bottom: 10px; right: 10px; background: rgba(255,255,255,0.9); border: 2px solid #000; padding: 5px; font-size: 1rem; z-index: 5; }

/* OPTION BUTTONS STYLING */
.options-stack { display: flex; flex-direction: column; gap: 0.6rem; margin: 1rem 0; width: 100%; }
.option-btn { background: #fff; border: 2px solid #000; padding: 0.8rem; text-align: left; cursor: pointer; font-weight: 800; text-transform: uppercase; transition: all 0.2s; }

.option-btn.is-selected { background: #000; color: #fff; }

/* REPARIERTE FEEDBACK-FARBEN */
.option-btn.is-correct { 
    background: #00aa00 !important; 
    color: #fff !important; 
    border-color: #000 !important;
    opacity: 1 !important;
}

.option-btn.is-wrong { 
    background: #ff3333 !important; 
    color: #fff !important; 
    text-decoration: line-through;
}

.option-btn.is-locked { cursor: not-allowed; opacity: 0.5; }

.text-neutral { color: #000; font-weight: 800; text-transform: uppercase; text-align: center; }
</style>