<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js';
import { useUnsplash } from '@/composables/useUnsplash.js';
import { useGameState } from '@/composables/useGameState.js'; 

const props = defineProps({
    aiImage: [String, Object], 
    realImages: Array,
    realCount: { type: Number, default: 3 }, 
    questionText: String,   
    successText: String,
    feedbackText: String, 
    timeLimit: { type: Number, default: 40 },
    levelId: { type: Number, default: 1 } 
});

const emit = defineEmits(['completed', 'mistake']);
const { t } = useTranslation(); 
const { triggerDownloadPing } = useUnsplash();
const { handleScoreAction } = useGameState(); 

const images = ref([]);
const currentIndex = ref(0);
const selectedIndex = ref(null);
const resolved = ref(false); 
const showWrongHint = ref(false); 
const loading = ref(true);
const activeCredits = ref([]); 
const zoomedImage = ref(null);
const transitionName = ref('');
const hasScored = ref(false); 

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
    if (!hasScored.value) {
        handleScoreAction(false, props.levelId);
        hasScored.value = true;
    }
};

const buildImages = async () => {
    if (!props.aiImage) return;
    loading.value = true;
    hasScored.value = false; 
    showWrongHint.value = false;
    activeCredits.value = [];
    images.value = [];
    selectedIndex.value = null;
    resolved.value = false;
    stopTimer(); 

    try {
        let aiSrc = typeof props.aiImage === 'string' ? props.aiImage : props.aiImage.src;
        let aiBucket = (typeof props.aiImage === 'object' && props.aiImage.bucket) ? props.aiImage.bucket : 'Fake-Images';
        const { data: aiData } = supabase.storage.from(aiBucket).getPublicUrl(aiSrc);
        const aiObj = { src: aiData.publicUrl, type: 'ai', bucket: aiBucket, status: 'neutral', name: aiSrc };

        let realObjs = [];
        if (props.realImages && props.realImages.length > 0) {
            realObjs = props.realImages.map(img => {
                let src = typeof img === 'string' ? img : img.src;
                let credit = typeof img === 'object' ? img.credit : null;
                let bName = (typeof img === 'object' && img.bucket) ? img.bucket : 'Real-Images';
                if (src.startsWith('http')) return { src, type: 'real', bucket: 'Unsplash', status: 'neutral', credit };
                const { data } = supabase.storage.from(bName).getPublicUrl(src);
                return { src: data.publicUrl, type: 'real', bucket: bName, status: 'neutral', name: src, credit };
            });
        } else {
            realObjs = await fetchRandomRealImages(props.realCount);
        }
        
        images.value = [aiObj, ...realObjs].sort(() => 0.5 - Math.random());
    } catch (e) { 
        console.error("Build images failed", e); 
    } finally { 
        loading.value = false; 
        startTimer(); 
    }
};

onMounted(() => { buildImages(); });
onUnmounted(() => stopTimer());
watch(() => props.aiImage, buildImages);

const submitAnswer = async () => {
    if (selectedIndex.value === null || resolved.value) return;
    const selectedImg = images.value[selectedIndex.value];
    const isCorrect = selectedImg.type === 'ai';

    supabase.auth.getUser().then(({ data: { user } }) => {
        if (user) {
            supabase.from('spiel_aktivitaeten').insert({
                user_id: user.id, level_id: props.levelId,
                image_name: selectedImg.name || 'db_unsplash',
                is_correct: isCorrect, task_type: 'spot_the_fake_choice'
            });
        }
    });

    if (isCorrect) {
        stopTimer();
        selectedImg.status = 'correct';
        resolved.value = true;
        showWrongHint.value = false;
        if (!hasScored.value) { handleScoreAction(true, props.levelId); hasScored.value = true; }
        activeCredits.value = [];
        images.value.forEach(item => {
            if (item.type === 'real' && item.credit) {
                triggerDownloadPing(item.credit.downloadLocation);
                if (!activeCredits.value.find(c => c.name === item.credit.name)) activeCredits.value.push(item.credit);
            }
        });
    } else {
        selectedImg.status = 'wrong';
        showWrongHint.value = true;
        if (!hasScored.value) { handleScoreAction(false, props.levelId); hasScored.value = true; }
        emit('mistake');
        selectedIndex.value = null; 
    }
};
</script>

<template>
    <div class="neo-card relative-container">
        <div class="neo-header">
            <h2 class="neo-title">{{ questionText }}</h2>
            <div v-if="timeLimit > 0 && !resolved" class="neo-pill" :class="{ 'critical': timeLeft <= 5 }">⏳ {{ timeLeft }}s</div>
        </div>
        
        <div v-if="loading" style="padding: 3rem; text-align:center;">{{ t('generic.loading') }}</div>

        <div v-else>
            <div style="text-align: center; margin-bottom: 1rem;">
                <span class="neo-pill white">{{ t('generic.image') }} {{ currentIndex + 1 }} / {{ images.length }}</span>
            </div>
            
            <div class="stack-container">
                <Transition :name="transitionName" mode="out-in">
                    <div :key="currentIndex" class="stack-card" 
                         :class="{ 'is-selected': selectedIndex === currentIndex, 'is-wrong': images[currentIndex].status === 'wrong', 'is-correct': images[currentIndex].status === 'correct' }"
                         @click="zoomedImage = images[currentIndex].src">
                        <img :src="images[currentIndex].src" draggable="false" />
                        <div v-if="selectedIndex === currentIndex && !resolved" class="neo-badge top-right">{{ t('spotTheFake.badges.selected') }}</div>
                        <div v-if="images[currentIndex].status === 'wrong'" class="neo-badge center wrong">{{ t('spotTheFake.badges.real') }}</div>
                        <div v-if="images[currentIndex].status === 'correct'" class="neo-badge center correct">{{ t('spotTheFake.badges.ai') }}</div>
                        <div class="zoom-hint">🔍</div>
                    </div>
                </Transition>
            </div>

            <div class="stack-controls">
                <button class="stack-nav-btn" @click="transitionName='slide-right'; currentIndex = (currentIndex - 1 + images.length) % images.length">←</button>
                <button class="stack-nav-btn" @click="transitionName='slide-left'; currentIndex = (currentIndex + 1) % images.length">→</button>
            </div>

            <!-- INTERAKTION SBEREICH (NOCH NICHT GELÖST) -->
            <div v-if="!resolved" style="margin-top: 1.5rem; display: flex; flex-direction: column; gap: 1rem;">
                <button class="neo-btn-toggle" :class="{ 'active': selectedIndex === currentIndex }" @click="selectedIndex = (selectedIndex === currentIndex ? null : currentIndex)">
                    {{ selectedIndex === currentIndex ? t('spotTheFake.deselect') : t('spotTheFake.select') }}
                </button>

                <div v-if="showWrongHint || isTimeout" class="neo-feedback">
                    <template v-if="showWrongHint">
                        <p class="text-fail" style="font-weight: 800; text-transform: uppercase;">{{ t('spotTheFake.wrongTitle') }}</p>
                        <p v-if="feedbackText" style="font-weight: 600; font-size: 0.95rem; margin-bottom: 1rem;">{{ feedbackText }}</p>
                        <p v-else style="font-weight: 600; font-size: 0.95rem; margin-bottom: 1rem;">{{ t('spotTheFake.wrongDefault') }}</p>
                    </template>
                    <div v-if="isTimeout" class="timeout-msg" style="color:red; font-weight:900; margin-bottom: 1rem; text-align: center;">{{ t('spotTheFake.timeout') }}</div>
                    <button class="neo-btn" :disabled="selectedIndex === null" @click="submitAnswer">{{ t('generic.verify') }}</button>
                </div>
                <button v-else class="neo-btn" :disabled="selectedIndex === null" @click="submitAnswer">{{ t('generic.verify') }}</button>
            </div>

            <!-- ERFOLGS-FEEDBACK -->
            <div v-if="resolved" class="neo-feedback">
                <p class="text-success" style="font-weight: 800; text-transform: uppercase;">{{ successText || t('spotTheFake.successDefault') }}</p>
                <p v-if="feedbackText" style="font-weight: 600; margin-top: 0.5rem; line-height: 1.4; margin-bottom: 1rem;">{{ feedbackText }}</p>
                <div v-if="activeCredits.length > 0" class="neo-info-box" style="text-align: left; margin-bottom: 1rem;">
                    <small>{{ t('spotTheFake.photosBy') }} <span v-for="(author, idx) in activeCredits" :key="author.name">
                        <a :href="author.link + '?utm_source=Detectino&utm_medium=referral'" target="_blank">{{ author.name }}</a>
                        <span v-if="idx < activeCredits.length - 1">, </span>
                    </span> {{ t('spotTheFake.onUnsplash') }}</small>
                </div>
                <button class="neo-btn" @click="$emit('completed')">{{ t('generic.nextRound') }}</button>
            </div>
        </div>

        <div v-if="zoomedImage" class="zoom-overlay" @click="zoomedImage = null">
            <button class="zoom-close-btn" @click.stop="zoomedImage = null">✕</button>
            <img :src="zoomedImage" class="zoom-content" />
        </div>
    </div>
</template>
<style scoped>
.stack-controls { display: flex; justify-content: center; gap: 2rem; margin-top: 1rem; }
.stack-nav-btn { background: #fff; border: 2px solid #000; width: 45px; height: 45px; border-radius: 50%; font-weight: 900; cursor: pointer; box-shadow: 3px 3px 0 #000; }
.zoom-hint { position: absolute; bottom: 10px; right: 10px; background: rgba(255,255,255,0.8); padding: 5px; border: 2px solid #000; pointer-events: none; }
.stack-card.is-selected { border-color: var(--card-bg, #edc531) !important; box-shadow: inset 0 0 0 4px #000, 5px 5px 0 rgba(0,0,0,0.2); }
.stack-card.is-correct { border-color: #00aa00 !important; }
.stack-card.is-wrong { border-color: #ff3333 !important; }
</style>