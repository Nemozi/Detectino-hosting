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
    topic: { type: String, default: 'portrait' }, 
    collectionId: { type: String, default: null }, 
    questionText: String,   
    successText: String,
    timeLimit: { type: Number, default: 20 },
    levelId: { type: Number, default: 1 } 
});

const emit = defineEmits(['completed', 'mistake']);
const { t } = useTranslation(); 
const { fetchRandomRealImages, triggerDownloadPing } = useUnsplash();
const { handleScoreAction, scoreFeedback } = useGameState(); 

const images = ref([]);
const currentIndex = ref(0);
const selectedIndex = ref(null);
const resolved = ref(false);
const message = ref('');
const loading = ref(true);
const activeCredits = ref([]); 
const zoomedImage = ref(null);
const transitionName = ref('');

// --- TIMER STATE ---
const timeLeft = ref(props.timeLimit);
const timerInterval = ref(null);
const isTimeout = ref(false);

const startTimer = () => {
    stopTimer(); 
    if (props.timeLimit === 0) return;
    timeLeft.value = props.timeLimit;
    isTimeout.value = false;
    timerInterval.value = setInterval(() => {
        if (timeLeft.value > 0) {
            timeLeft.value--;
        } else {
            handleTimeout();
        }
    }, 1000);
};

const stopTimer = () => { if (timerInterval.value) clearInterval(timerInterval.value); };

const handleTimeout = () => {
    stopTimer();
    isTimeout.value = true;
    // PUNKTEABZUG TRIGGERN
    handleScoreAction(false, props.levelId);
    message.value = "Zeit abgelaufen! Wähle jetzt ein Bild.";
};

// --- ZOOM LOGIK ---
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

// --- BILDER LOGIK ---
const buildImages = async () => {
    if (!props.aiImage) return;
    loading.value = true;
    activeCredits.value = [];
    selectedIndex.value = null;
    resolved.value = false;
    currentIndex.value = 0;
    stopTimer(); 

    try {
        let aiSrc = typeof props.aiImage === 'string' ? props.aiImage : props.aiImage.src;
        let aiBucket = typeof props.aiImage === 'object' ? (props.aiImage.bucket || 'Fake-Images') : 'Fake-Images';
        const { data: aiData } = supabase.storage.from(aiBucket).getPublicUrl(aiSrc);
        const aiObj = { src: aiData.publicUrl, type: 'ai', bucket: aiBucket, status: 'neutral', name: aiSrc };

        let realObjs = [];
        if (props.realImages && props.realImages.length > 0) {
             realObjs = props.realImages.map(img => {
                let src = typeof img === 'string' ? img : img.src;
                let credit = typeof img === 'object' ? img.credit : null;
                let bName = (img && typeof img === 'object' && img.bucket) ? img.bucket : 'Real-Images';
                
                if (src.startsWith('http')) return { src, type: 'real', bucket: 'Unsplash', status: 'neutral', credit };
                const { data } = supabase.storage.from(bName).getPublicUrl(src);
                return { src: data.publicUrl, type: 'real', bucket: bName, status: 'neutral', name: src };
            }).filter(Boolean);
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

onMounted(async () => {
    await buildImages();
    window.addEventListener('popstate', handlePopState);
});

onUnmounted(() => {
    stopTimer();
    window.removeEventListener('popstate', handlePopState);
});

watch(() => props.aiImage, (newVal, oldVal) => {
    const n = typeof newVal === 'string' ? newVal : newVal?.src;
    const o = typeof oldVal === 'string' ? oldVal : oldVal?.src;
    if (n !== o) buildImages();
}, { deep: true });

const nextCard = () => { transitionName.value = 'slide-left'; currentIndex.value = (currentIndex.value + 1) % images.value.length; };
const prevCard = () => { transitionName.value = 'slide-right'; currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length; };

const submitAnswer = () => {
    if (selectedIndex.value === null) return;
    stopTimer(); 
    const selectedImg = images.value[selectedIndex.value];

    // Logging im Hintergrund
    supabase.from('spiel_aktivitaeten').insert({
        level_id: props.levelId,
        image_name: selectedImg.name || 'db_unsplash',
        is_correct: selectedImg.type === 'ai'
    });

    if (selectedImg.type === 'real') {
        selectedImg.status = 'wrong';
        handleScoreAction(false, props.levelId);
        emit('mistake');
        selectedIndex.value = null;
    } 
    else if (selectedImg.type === 'ai') {
        selectedImg.status = 'correct';
        resolved.value = true;
        handleScoreAction(true, props.levelId);
        const successMsg = t('generic.correct');
        message.value = props.successText || (successMsg === 'generic.correct' ? 'Richtig erkannt!' : successMsg);
        
        activeCredits.value = [];
        images.value.forEach(item => {
            if (item.bucket === 'Unsplash' && item.credit) {
                triggerDownloadPing(item.credit.downloadLocation);
                if (!activeCredits.value.find(c => c.name === item.credit.name)) activeCredits.value.push(item.credit);
            }
        });
    }
};
</script>

<template>
    <div class="neo-card relative-container" :class="{ 'shake-anim': isTimeout }">
        
        <!-- HEADER -->
        <div class="neo-header">
            <h2 class="neo-title">{{ questionText }}</h2>
            <div v-if="timeLimit > 0" class="neo-pill" :class="{ 'critical': timeLeft <= 5 }">⏳ {{ timeLeft }}s</div>
        </div>
        
        <div v-if="loading" style="padding: 3rem; text-align:center;">
            <div class="loader-spinner"></div>
            <p>Bilder werden geladen...</p>
        </div>

        <div v-else>
            <div style="text-align: center; margin-bottom: 1rem;">
                <span class="neo-pill white">Bild {{ currentIndex + 1 }} / {{ images.length }}</span>
            </div>
            
            <div class="stack-container">
                <Transition :name="transitionName" mode="out-in">
                    <div :key="currentIndex" class="stack-card" 
                         :class="{ 'is-selected': selectedIndex === currentIndex, 'is-wrong': images[currentIndex].status === 'wrong', 'is-correct': images[currentIndex].status === 'correct' }"
                         @click="openZoom(images[currentIndex].src)">
                        <img :src="images[currentIndex].src" draggable="false" />
                        <div v-if="selectedIndex === currentIndex" class="neo-badge top-right">GEWÄHLT</div>
                        <div v-if="images[currentIndex].status === 'wrong'" class="neo-badge center wrong">ECHT</div>
                        <div v-if="images[currentIndex].status === 'correct'" class="neo-badge center correct">KI</div>
                        <div class="zoom-hint">🔍</div>
                    </div>
                </Transition>
            </div>

            <div v-if="isTimeout && !resolved" class="timeout-msg">Zeit abgelaufen! (-5 Punkte)</div>

            <div class="controls-area">
                <div class="nav-row">
                    <button class="stack-nav-btn" @click="prevCard">←</button>
                    <button class="stack-nav-btn" @click="nextCard">→</button>
                </div>
                <button v-if="!resolved" class="neo-btn-toggle" :class="{ 'active': selectedIndex === currentIndex }" @click="selectedIndex = (selectedIndex === currentIndex ? null : currentIndex)">
                    {{ selectedIndex === currentIndex ? 'Abwählen' : 'Dieses Bild wählen' }}
                </button>
            </div>

            <button v-if="!resolved" class="neo-btn" style="margin-top:1rem;" :disabled="selectedIndex === null" @click="submitAnswer">Prüfen</button>

            <div v-if="resolved" class="neo-feedback">
                <p>{{ message }}</p>
                <div v-if="activeCredits.length > 0" class="neo-info-box">
                    <small>Fotos von <span v-for="(author, idx) in activeCredits" :key="idx">
                        <a :href="author.link + '?utm_source=Detectino&utm_medium=referral'" target="_blank">{{ author.name }}</a>
                        <span v-if="idx < activeCredits.length - 1">, </span>
                    </span> auf Unsplash</small>
                </div>
                <button class="neo-btn" @click="$emit('completed')">Weiter</button>
            </div>
        </div>

        <!-- ZOOM MODAL -->
        <div v-if="zoomedImage" class="zoom-overlay" @click="closeZoom">
            <button class="zoom-close-btn" @click.stop="closeZoom">✕</button>
            <img :src="zoomedImage" class="zoom-content" />
        </div>
    </div>
</template>

<style scoped>
.relative-container { position: relative; width: 100%; }
.controls-area { margin: 1.5rem 0; display: flex; flex-direction: column; gap: 1.2rem; }
.nav-row { display: flex; justify-content: center; gap: 3rem; margin-bottom: 0.5rem; }
.stack-card { position: absolute; width: calc(100% - 20px); height: calc(100% - 20px); left: 10px; top: 10px; box-sizing: border-box; display: flex; justify-content: center; align-items: center; background: #000; border: 4px solid #000; transition: transform 0.1s; }
.stack-card img { width: 100%; height: 100%; object-fit: cover; pointer-events: none; }
.stack-card.is-selected { border-color: var(--card-bg, #edc531) !important; box-shadow: inset 0 0 0 4px #000, 5px 5px 0 rgba(0,0,0,0.2); }
.stack-card.is-wrong { border-color: #ff3333 !important; }
.stack-card.is-correct { border-color: #00aa00 !important; }
.zoom-hint { position: absolute; bottom: 10px; right: 10px; background: rgba(255,255,255,0.8); padding: 5px; border-radius: 5px; pointer-events: none; }

.timeout-msg { color: #ff3333; font-weight: 900; text-align: center; text-transform: uppercase; margin-top: 0.5rem; animation: blink 0.5s infinite; }
@keyframes blink { 50% { opacity: 0.5; } }
@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
.shake-anim { animation: shake 0.4s; }
</style>