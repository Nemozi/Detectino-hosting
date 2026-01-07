<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js';
import { useGameState } from '@/composables/useGameState.js';

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
const isSuccess = ref(false); // Steuert die Ansicht (Swipe vs. Lösung)
const errorMessage = ref('');
const zoomedImage = ref(null);
const transitionName = ref('');
const correctImages = ref([]); // Speichert die Bilder für die End-Ansicht

// --- DATA PREP ---
onMounted(() => {
    imageList.value = props.images.map(img => {
        const { data } = supabase.storage.from(img.bucket).getPublicUrl(img.src);
        return { ...img, url: data.publicUrl };
    });
});

// --- NAVIGATION (SWIPE) ---
const nextCard = () => {
    errorMessage.value = ''; // Fehler ausblenden beim Blättern
    transitionName.value = 'slide-left';
    if (currentIndex.value < imageList.value.length - 1) currentIndex.value++;
    else currentIndex.value = 0;
};

const prevCard = () => {
    errorMessage.value = '';
    transitionName.value = 'slide-right';
    if (currentIndex.value > 0) currentIndex.value--;
    else currentIndex.value = imageList.value.length - 1;
};

// Touch/Mouse Events
let startX = 0, isDragging = false;
const onTouchStart = (e) => startX = e.changedTouches[0].screenX;
const onTouchEnd = (e) => { if (startX - e.changedTouches[0].screenX > 50) nextCard(); if (e.changedTouches[0].screenX - startX > 50) prevCard(); };
const onMouseDown = (e) => { startX = e.clientX; isDragging = true; };
const onMouseUp = (e) => { if (isDragging) { isDragging = false; if (startX - e.clientX > 50) nextCard(); if (e.clientX - startX > 50) prevCard(); } };
const onMouseLeave = () => { isDragging = false; };

// --- ZOOM ---
const openZoom = (url) => { zoomedImage.value = url; history.pushState({modal:true}, ''); };
const closeZoom = () => { if (zoomedImage.value) history.back(); };
const handlePopState = () => { zoomedImage.value = null; };
window.addEventListener('popstate', handlePopState);
onUnmounted(() => window.removeEventListener('popstate', handlePopState));

// --- LOGIK ---

const toggleSelection = () => {
    if (isSuccess.value) return;
    const idx = currentIndex.value;
    errorMessage.value = ''; // Reset Error beim Ändern der Auswahl
    
    if (selectedIndices.value.includes(idx)) {
        selectedIndices.value = selectedIndices.value.filter(i => i !== idx);
    } else {
        selectedIndices.value.push(idx);
    }
};

const checkSolution = () => {
    // 1. Indizes der echten KI-Bilder finden
    const actualAiIndices = imageList.value
        .map((img, idx) => img.type === 'ai' ? idx : -1)
        .filter(i => i !== -1);
    
    // 2. Arrays vergleichen
    const selectedSorted = [...selectedIndices.value].sort();
    const aiSorted = [...actualAiIndices].sort();
    const correct = JSON.stringify(selectedSorted) === JSON.stringify(aiSorted);
    
    if (correct) {
        // RICHTIG
        handleScoreAction(true, props.levelId);
        
        // Filtere die richtigen Bilder für die Anzeige heraus
        correctImages.value = imageList.value.filter(img => img.type === 'ai');
        
        // Schalte View um
        isSuccess.value = true;
    } else {
        // FALSCH
        handleScoreAction(false, props.levelId);
        errorMessage.value = "Falsch! -5 Punkte. Versuch es nochmal!";
    }
};
</script>

<template>
    <div class="neo-card">
        <h2 class="neo-title">{{ question }}</h2>
        
        <!-- ANSICHT 1: SWIPE (Solange noch nicht gelöst) -->
        <div v-if="!isSuccess && imageList.length > 0">
            <div class="stack-counter">Bild {{ currentIndex + 1 }} / {{ imageList.length }}</div>
            
            <div class="stack-container" 
                 @touchstart="onTouchStart" @touchend="onTouchEnd"
                 @mousedown="onMouseDown" @mouseup="onMouseUp" @mouseleave="onMouseLeave">
                
                <Transition :name="transitionName" mode="out-in">
                    <div :key="currentIndex" class="stack-card" 
                         :class="{ 'is-selected': selectedIndices.includes(currentIndex) }"
                         @click="openZoom(imageList[currentIndex].url)">
                        
                        <img :src="imageList[currentIndex].url" draggable="false" />
                        
                        <div v-if="selectedIndices.includes(currentIndex)" class="badge-select">AUSGEWÄHLT</div>
                        <div class="zoom-hint">🔍</div>
                    </div>
                </Transition>
            </div>

            <!-- Controls -->
            <div class="controls-area">
                <div class="nav-row">
                    <button class="stack-nav-btn" @click="prevCard">←</button>
                    <button class="stack-nav-btn" @click="nextCard">→‏</button>
                </div>
                
                <button 
                    class="select-btn" 
                    :class="{ 'active': selectedIndices.includes(currentIndex) }"
                    @click="toggleSelection"
                >
                    {{ selectedIndices.includes(currentIndex) ? 'Auswahl entfernen' : 'Als KI markieren' }}
                </button>
            </div>

            <!-- Error Message -->
            <div v-if="errorMessage" class="error-msg shake-anim">
                {{ errorMessage }}
            </div>

            <!-- Check Button -->
            <button class="neo-btn" style="margin-top:1rem;" @click="checkSolution" :disabled="selectedIndices.length === 0">
                {{ t('generic.verify') }}
            </button>
        </div>

        <!-- ANSICHT 2: LÖSUNG (Grid View, wenn richtig) -->
        <div v-else-if="isSuccess" class="success-view">
            <p class="text-success" style="font-weight:bold; font-size:1.1rem; margin-bottom:1rem;">
                {{ successText }}
            </p>

            <div class="result-grid">
                <div v-for="img in correctImages" :key="img.src" class="result-item" @click="openZoom(img.url)">
                    <img :src="img.url" />
                    <div class="zoom-hint">🔍</div>
                </div>
            </div>

            <button class="neo-btn" @click="$emit('completed')">
                {{ t('generic.next') }}
            </button>
        </div>

        <!-- ZOOM MODAL -->
        <div v-if="zoomedImage" class="zoom-overlay" @click="closeZoom">
            <button class="zoom-close-btn">✕</button>
            <img :src="zoomedImage" class="zoom-content" @click.stop />
        </div>
    </div>
</template>

<style scoped>
/* Controls */
.controls-area { display: flex; flex-direction: column; gap: 1rem; margin-top: 1rem; }
.nav-row { display: flex; justify-content: center; gap: 2rem; }
.select-btn { width: 100%; padding: 1rem; border: 2px solid #000; background: #fff; font-weight: bold; cursor: pointer; text-transform: uppercase; transition: all 0.1s; }
.select-btn.active { background: #000; color: #fff; transform: scale(1.02); }

/* Card Styles */
.stack-card.is-selected { border-color: #000; box-shadow: inset 0 0 0 6px #000; }
.badge-select { position: absolute; top: 10px; right: 10px; background: #000; color: #fff; padding: 5px 10px; font-weight: bold; }
.zoom-hint { position: absolute; bottom: 10px; right: 10px; background: rgba(255,255,255,0.8); padding: 5px; border-radius: 50%; pointer-events: none; }

/* Error Message */
.error-msg { color: #fff; background: #ff3333; padding: 0.5rem; text-align: center; font-weight: bold; margin-top: 1rem; border: 2px solid #000; }
.shake-anim { animation: shake 0.4s; }

/* Success Grid View */
.success-view { text-align: center; animation: fadeIn 0.5s; }
.result-grid { 
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    gap: 1rem; 
    margin-bottom: 1.5rem; 
}
.result-item { 
    border: 2px solid #00aa00; 
    position: relative; 
    aspect-ratio: 1; 
    cursor: zoom-in; 
}
.result-item img { width: 100%; height: 100%; object-fit: cover; display: block; }

@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>