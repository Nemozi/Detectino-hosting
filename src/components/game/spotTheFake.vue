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
    feedbackText: String, // Der Hinweis-Text für Fehler
    timeLimit: { type: Number, default: 20 },
    levelId: { type: Number, default: 1 } 
});

const emit = defineEmits(['completed', 'mistake']);
const { t } = useTranslation(); 
const { fetchRandomRealImages, triggerDownloadPing } = useUnsplash();
const { handleScoreAction } = useGameState(); 

const images = ref([]);
const currentIndex = ref(0);
const selectedIndex = ref(null);
const resolved = ref(false);
const isUserCorrect = ref(false); 
const loading = ref(true);
const activeCredits = ref([]); 
const zoomedImage = ref(null);
const transitionName = ref('');

// --- TIMER ---
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

// --- NAVIGATION ---
const nextCard = () => { transitionName.value = 'slide-left'; currentIndex.value = (currentIndex.value + 1) % images.value.length; };
const prevCard = () => { transitionName.value = 'slide-right'; currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length; };

// --- ZOOM ---
const openZoom = (url) => { zoomedImage.value = url; window.history.pushState({ modal: true }, ''); };
const closeZoom = () => { zoomedImage.value = null; if (window.history.state?.modal) window.history.back(); };

// --- BILDER LOGIK ---
const buildImages = async () => {
    if (!props.aiImage) return;
    loading.value = true;
    images.value = [];
    selectedIndex.value = null;
    resolved.value = false;

    try {
        let aiSrc = typeof props.aiImage === 'string' ? props.aiImage : props.aiImage.src;
        let aiBucket = typeof props.aiImage === 'object' ? (props.aiImage.bucket || 'Fake-Images') : 'Fake-Images';
        const { data: aiData } = supabase.storage.from(aiBucket).getPublicUrl(aiSrc);
        const aiObj = { src: aiData.publicUrl, type: 'ai', status: 'neutral', name: aiSrc };

        let realObjs = [];
        if (props.realImages && props.realImages.length > 0) {
            realObjs = props.realImages.map(img => {
                let src = typeof img === 'string' ? img : img.src;
                let credit = typeof img === 'object' ? img.credit : null;
                if (src.startsWith('http')) return { src, type: 'real', bucket: 'Unsplash', status: 'neutral', credit };
                const { data } = supabase.storage.from('Real-Images').getPublicUrl(src);
                return { src: data.publicUrl, type: 'real', bucket: 'Real-Images', status: 'neutral', name: src };
            });
        } else {
            realObjs = await fetchRandomRealImages(props.realCount);
        }
        images.value = [aiObj, ...realObjs].sort(() => 0.5 - Math.random());
    } catch (e) { console.error(e); } 
    finally { loading.value = false; startTimer(); }
};

onMounted(() => { buildImages(); window.addEventListener('popstate', () => zoomedImage.value = null); });
onUnmounted(() => stopTimer());
watch(() => props.aiImage, buildImages);

const submitAnswer = () => {
    if (selectedIndex.value === null || resolved.value) return;
    stopTimer();
    const selectedImg = images.value[selectedIndex.value];
    
    if (selectedImg.type === 'ai') {
        isUserCorrect.value = true;
        resolved.value = true;
        handleScoreAction(true, props.levelId);
        
        // Unsplash Pings
        activeCredits.value = [];
        images.value.forEach(item => {
            if (item.type === 'real' && item.credit) {
                triggerDownloadPing(item.credit.downloadLocation);
                activeCredits.value.push(item.credit);
            }
        });
    } else {
        isUserCorrect.value = false;
        resolved.value = true; // Wir "resolven", um das Feedback-Feld zu zeigen
        handleScoreAction(false, props.levelId);
        emit('mistake');
    }
};

const tryAgain = () => {
    resolved.value = false;
    isUserCorrect.value = false;
    selectedIndex.value = null;
    startTimer();
};
</script>

<template>
    <div class="neo-card">
        <!-- HEADER -->
        <div class="neo-header">
            <h2 class="neo-title">{{ questionText || 'Welches Bild ist generiert?' }}</h2>
            <div v-if="timeLeft > 0 && !resolved" class="neo-pill" :class="{ 'critical': timeLeft <= 5 }">⏳ {{ timeLeft }}s</div>
        </div>

        <div v-if="loading" style="padding: 3rem; text-align:center;">
            <div class="loader-spinner"></div>
            <p>Bilder werden geladen...</p>
        </div>

        <div v-else>
            <!-- STACK NAVIGATION -->
            <div style="text-align: center; margin-bottom: 0.5rem;">
                <span class="neo-pill white">Bild {{ currentIndex + 1 }} / {{ images.length }}</span>
            </div>

            <div class="stack-container">
                <Transition :name="transitionName" mode="out-in">
                    <div :key="currentIndex" class="stack-card" 
                         :class="{ 'is-selected': selectedIndex === currentIndex, 'is-correct': resolved && images[currentIndex].type === 'ai', 'is-wrong': resolved && selectedIndex === currentIndex && images[currentIndex].type === 'real' }"
                         @click="openZoom(images[currentIndex].src)">
                        <img :src="images[currentIndex].src" draggable="false" />
                        <div v-if="selectedIndex === currentIndex && !resolved" class="neo-badge top-right">GEWÄHLT</div>
                        <div class="zoom-hint">🔍</div>
                    </div>
                </Transition>
            </div>

            <div class="stack-controls">
                <button class="stack-nav-btn" @click="prevCard">←</button>
                <button class="stack-nav-btn" @click="nextCard">→</button>
            </div>

            <!-- AKTIONEN -->
            <div style="margin-top: 1.5rem; display: flex; flex-direction: column; align-items: center; gap: 1rem;">
                <button v-if="!resolved" class="neo-btn-toggle" 
                    :class="{ 'active': selectedIndex === currentIndex }" 
                    @click="selectedIndex = (selectedIndex === currentIndex ? null : currentIndex)">
                    {{ selectedIndex === currentIndex ? 'ABWÄHLEN' : 'DIESES BILD WÄHLEN' }}
                </button>

                <button v-if="!resolved" class="neo-btn" :disabled="selectedIndex === null" @click="submitAnswer">
                    {{ t('generic.verify') }}
                </button>
            </div>

            <!-- FEEDBACK (IM STYLE VON CONCEPT TAGGING) -->
            <div v-if="resolved" class="neo-feedback">
                <template v-if="isUserCorrect">
                    <p class="text-success" style="font-weight: 800; text-transform: uppercase;">{{ successText || 'Richtig erkannt!' }}</p>
                    
                    <div v-if="activeCredits.length > 0" class="neo-info-box" style="margin-top:1rem">
                        <small>Fotos von <span v-for="(author, idx) in activeCredits" :key="idx">
                            <a :href="author.link" target="_blank">{{ author.name }}</a><span v-if="idx < activeCredits.length - 1">, </span>
                        </span> auf Unsplash</small>
                    </div>
                    
                    <button class="neo-btn" @click="$emit('completed')" style="margin-top:1rem">Weiter</button>
                </template>

                <template v-else>
                    <p class="text-fail" style="font-weight: 800; text-transform: uppercase;">Leider falsch</p>
                    <p style="font-weight: 600; margin-top: 0.5rem;">{{ feedbackText }}</p>
                    <button class="neo-btn" @click="tryAgain" style="margin-top:1rem">Nochmal versuchen</button>
                </template>
            </div>
        </div>

        <!-- ZOOM OVERLAY -->
        <div v-if="zoomedImage" class="zoom-overlay" @click="closeZoom">
            <button class="zoom-close-btn" @click.stop="closeZoom">✕</button>
            <img :src="zoomedImage" class="zoom-content" />
        </div>
    </div>
</template>

<style scoped>
/* Navigation Buttons (Tinder Style wie in Concept Tagging) */
.stack-controls { display: flex; justify-content: center; gap: 2rem; margin-top: 1rem; margin-bottom: 0.5rem; }
.stack-nav-btn {
    background: #fff; border: 2px solid #000; width: 45px; height: 45px; border-radius: 50%;
    font-size: 1.2rem; font-weight: 900; cursor: pointer; display: flex; align-items: center; justify-content: center;
    box-shadow: 3px 3px 0 #000; transition: transform 0.1s;
}
.stack-nav-btn:active { transform: translate(2px, 2px); box-shadow: 1px 1px 0 #000; }

.zoom-hint { position: absolute; bottom: 10px; right: 10px; background: rgba(255,255,255,0.8); padding: 5px; border: 2px solid #000; pointer-events: none; }
.stack-card.is-selected { border-color: var(--card-bg, #edc531) !important; box-shadow: inset 0 0 0 4px #000, 5px 5px 0 rgba(0,0,0,0.2); }
.stack-card.is-correct { border-color: #00aa00 !important; }
.stack-card.is-wrong { border-color: #ff3333 !important; }

/* Feedback Styles */
.neo-feedback {
    margin-top: 2rem; padding: 1.5rem; border: 3px solid #000; background: #f9f9f9; text-align: center;
}
</style>