<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js';
import { useGameState } from '@/composables/useGameState.js';
console.log('gridSelect component loaded');

const props = defineProps({
    images: Array, 
    question: String, 
    successText: String, 
    levelId: { type: Number, default: 1 }
});

const emit = defineEmits(['completed']);
const { t } = useTranslation();
const { handleScoreAction } = useGameState();

const imageList = ref([]);
const currentIndex = ref(0);
const selectedIndices = ref([]);
const isSuccess = ref(false); 
const errorMessage = ref('');
const zoomedImage = ref(null);
const transitionName = ref('');
const correctImages = ref([]); 
const loading = ref(true);

// --- BILDER AUFLÖSEN ---
const prepareImages = () => {
    if (!props.images || props.images.length === 0) return;
    loading.value = true;
    
    imageList.value = props.images.map(img => {
        let finalUrl = '';
        const s = (img && typeof img.src === 'string') ? img.src : '';

        if (s.startsWith('http')) {
            finalUrl = s;
        } else if (s) {
            const bucketName = img.bucket || 'Real-Images';
            const { data } = supabase.storage.from(bucketName).getPublicUrl(s);
            finalUrl = data.publicUrl;
        }
        return { ...img, url: finalUrl };
    }).filter(img => img.url !== '');

    loading.value = false;
};

// --- ZOOM LOGIK (Identisch zu SpotTheFake) ---
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

// --- NAVIGATION (SWIPE) ---
const nextCard = () => {
    transitionName.value = 'slide-left';
    currentIndex.value = (currentIndex.value + 1) % imageList.value.length;
};
const prevCard = () => {
    transitionName.value = 'slide-right';
    currentIndex.value = (currentIndex.value - 1 + imageList.value.length) % imageList.value.length;
};

// Touch/Mouse Events für Swipe
let startX = 0;
const onTouchStart = (e) => startX = e.changedTouches[0].screenX;
const onTouchEnd = (e) => {
    const diff = startX - e.changedTouches[0].screenX;
    if (diff > 50) nextCard();
    else if (diff < -50) prevCard();
};

// --- SPIEL LOGIK ---
const toggleSelection = () => {
    if (isSuccess.value) return;
    const idx = currentIndex.value;
    if (selectedIndices.value.includes(idx)) {
        selectedIndices.value = selectedIndices.value.filter(i => i !== idx);
    } else {
        selectedIndices.value.push(idx);
    }
};

const checkSolution = () => {
    const actualAiIndices = imageList.value
        .map((img, idx) => img.type === 'ai' ? idx : -1)
        .filter(i => i !== -1);
    
    const selectedSorted = [...selectedIndices.value].sort();
    const aiSorted = [...actualAiIndices].sort();
    const correct = JSON.stringify(selectedSorted) === JSON.stringify(aiSorted);
    
    if (correct) {
        handleScoreAction(true, props.levelId);
        correctImages.value = imageList.value.filter(img => img.type === 'ai');
        isSuccess.value = true;
    } else {
        handleScoreAction(false, props.levelId);
        errorMessage.value = "Falsch! Versuch es nochmal!";
    }
};

onMounted(() => {
    prepareImages();
    window.addEventListener('popstate', handlePopState);
});

onUnmounted(() => {
    window.removeEventListener('popstate', handlePopState);
});

watch(() => props.images, prepareImages, { deep: true });
</script>

<template>
    <div class="neo-card">
        <!-- HEADER (Global) -->
        <div class="neo-header">
            <h2 class="neo-title">{{ question }}</h2>
        </div>
        
        <div v-if="loading" style="padding: 2rem; text-align:center;">Lade Set...</div>

        <div v-else>
            <!-- ANSICHT 1: DAS SPIEL -->
            <div v-if="!isSuccess">
                <!-- Globaler Counter -->
                <div class="stack-counter">Bild {{ currentIndex + 1 }} / {{ imageList.length }}</div>
                
                <!-- Globaler Stack-Container -->
                <div class="stack-container" @touchstart="onTouchStart" @touchend="onTouchEnd">
                    <Transition :name="transitionName" mode="out-in">
                        <div :key="currentIndex" class="stack-card" 
                             :class="{ 'is-selected': selectedIndices.includes(currentIndex) }"
                             @click="openZoom(imageList[currentIndex].url)">
                            
                            <img :src="imageList[currentIndex].url" draggable="false" />
                            
                            <!-- Globales Badge -->
                            <div v-if="selectedIndices.includes(currentIndex)" class="neo-badge top-right">GEWÄHLT</div>
                            <div class="zoom-hint">🔍</div>
                        </div>
                    </Transition>
                </div>

                <!-- NAVIGATION (Global) -->
                <div class="stack-controls">
                    <button class="stack-nav-btn" @click="prevCard">←</button>
                    <button class="stack-nav-btn" @click="nextCard">→</button>
                </div>

                <!-- Globaler Toggle-Button -->
                <div style="margin: 1.5rem 0;">
                    <button class="neo-btn-toggle" 
                            :class="{ 'active': selectedIndices.includes(currentIndex) }" 
                            @click="toggleSelection">
                        {{ selectedIndices.includes(currentIndex) ? 'Abwählen' : 'Als KI markieren' }}
                    </button>
                </div>

                <p v-if="errorMessage" class="text-fail" style="text-align:center; font-weight:900; text-transform:uppercase;">
                    {{ errorMessage }}
                </p>

                <!-- Globaler Action-Button -->
                <button class="neo-btn" @click="checkSolution" :disabled="selectedIndices.length === 0">
                    {{ t('generic.verify') }}
                </button>
            </div>

            <!-- ANSICHT 2: ERGEBNIS -->
            <div v-else class="neo-feedback">
                <p class="text-success" style="font-size:1.2rem; font-weight:900;">{{ successText || 'Richtig erkannt!' }}</p>
                
                <!-- Globales Grid für Ergebnisse -->
                <div class="neo-grid-2" style="margin: 1.5rem 0;">
                    <div v-for="img in correctImages" :key="img.url" class="neo-img-wrap" @click="openZoom(img.url)">
                        <img :src="img.url" />
                        <div class="neo-badge top-right" style="background:#00aa00">KI</div>
                    </div>
                </div>

                <button class="neo-btn" @click="$emit('completed')">Weiter</button>
            </div>
        </div>

        <!-- Globales Zoom-Overlay -->
        <div v-if="zoomedImage" class="zoom-overlay" @click="closeZoom">
            <button class="zoom-close-btn" @click.stop="closeZoom">✕</button>
            <img :src="zoomedImage" class="zoom-content" />
        </div>
    </div>
</template>

<style scoped>
/* Nur minimale Anpassungen, der Rest kommt aus base.css */
.stack-card.is-selected { 
    border-color: var(--card-bg, #edc531) !important; 
    box-shadow: inset 0 0 0 4px #000, 5px 5px 0 rgba(0,0,0,0.2); 
}
.zoom-hint { position: absolute; bottom: 10px; right: 10px; background: rgba(255,255,255,0.8); padding: 5px; border: 2px solid #000; pointer-events: none; }
</style>    