<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js';
import { useGameState } from '@/composables/useGameState.js'; 

const props = defineProps({
    // images: Array von Strings ['A.jpg'] ODER Objekten [{src:'A.jpg', bucket:'...'}]
    images: Array,          
    bucket: { type: String, default: 'Fake-Images' }, // Standard-Fallback
    terms: Array,           
    correctIds: Array,      
    question: String,
    subtitle: String,
    feedbackText: String,
    levelId: { type: Number, default: 1 } 
});

const emit = defineEmits(['completed']);
const { t } = useTranslation();
const { handleScoreAction } = useGameState(); 

const selectedTermIds = ref([]);
const resolved = ref(false);
const zoomedImage = ref(null);
const currentIndex = ref(0);
const transitionName = ref('');

// --- DATA FIX: BUCKET LOGIK & DEBUGGING ---
const imageUrls = computed(() => {
    if (!props.images) return [];
    
    return props.images.map(img => {
        let src = '';
        let currentBucket = props.bucket; // Startet mit dem Default

        // 1. Prüfen: Ist es ein String oder ein Objekt?
        if (typeof img === 'string') {
            src = img;
        } else if (img && typeof img === 'object') {
            src = img.src;
            // Wenn das Objekt einen Bucket angibt, diesen nutzen!
            if (img.bucket) currentBucket = img.bucket; 
        }

        // Sicherheitscheck
        if (!src) return null;

        // 2. URL generieren
        const { data } = supabase.storage.from(currentBucket).getPublicUrl(src);
        

        return data.publicUrl;
    }).filter(url => url !== null);
});

// --- NAVIGATION ---
const nextCard = () => {
    transitionName.value = 'slide-left';
    if (currentIndex.value < imageUrls.value.length - 1) currentIndex.value++;
    else currentIndex.value = 0;
};

const prevCard = () => {
    transitionName.value = 'slide-right';
    if (currentIndex.value > 0) currentIndex.value--;
    else currentIndex.value = imageUrls.value.length - 1;
};

// --- TOUCH & MOUSE SWIPE ---
let startX = 0, isDragging = false;
const onTouchStart = (e) => { startX = e.changedTouches[0].screenX; };
const onTouchEnd = (e) => handleSwipe(e.changedTouches[0].screenX);
const onMouseDown = (e) => { startX = e.clientX; isDragging = true; };
const onMouseUp = (e) => { if (isDragging) { isDragging = false; handleSwipe(e.clientX); } };
const onMouseLeave = () => { isDragging = false; };

const handleSwipe = (endX) => {
    if (startX - endX > 50) nextCard();
    if (endX - startX > 50) prevCard();
};

// --- ZOOM ---
const handlePopState = () => { zoomedImage.value = null; };
onMounted(() => window.addEventListener('popstate', handlePopState));
onUnmounted(() => window.removeEventListener('popstate', handlePopState));

const openZoom = (url) => { zoomedImage.value = url; history.pushState({modal:true}, ''); };
const closeZoom = () => { if (zoomedImage.value) history.back(); };

// --- SPIEL LOGIK ---
const toggleTerm = (id) => {
    if (resolved.value) return;
    if (selectedTermIds.value.includes(id)) {
        selectedTermIds.value = selectedTermIds.value.filter(x => x !== id);
    } else {
        selectedTermIds.value.push(id);
    }
};

const resolve = () => {
    resolved.value = true;
    handleScoreAction(true, props.levelId); 
};

const isCorrect = (id) => props.correctIds.includes(id);
</script>

<template>
    <div class="neo-card">
        <h2 class="neo-title">{{ question }}</h2>
        <p class="subtitle">{{ subtitle }}</p>

        <!-- Counter nur wenn Bilder da sind -->
        <div v-if="imageUrls.length > 0" class="stack-counter">
            Bild {{ currentIndex + 1 }} von {{ imageUrls.length }}
        </div>

        <!-- STACK CONTAINER -->
        <div class="stack-container" 
             @touchstart="onTouchStart" @touchend="onTouchEnd"
             @mousedown="onMouseDown" @mouseup="onMouseUp" @mouseleave="onMouseLeave">
            
            <Transition :name="transitionName" mode="out-in">
                <!-- KLICK AUF DIV -> ZOOM -->
                <div v-if="imageUrls.length > 0" :key="currentIndex" class="stack-card" @click="openZoom(imageUrls[currentIndex])">
                    <img :src="imageUrls[currentIndex]" draggable="false" />
                    <div class="zoom-hint">🔍</div>
                </div>
                <div v-else style="padding:20px; text-align:center;">Bild nicht gefunden</div>
            </Transition>
        </div>

        <div class="stack-controls">
            <button class="stack-nav-btn" @click="prevCard">←</button>
            <button class="stack-nav-btn" @click="nextCard">→‏</button>
        </div>

        <!-- BEGRIFFE GRID -->
        <div class="terms-grid">
            <div 
                v-for="term in terms" 
                :key="term.id"
                class="term-btn"
                :class="{ 
                    'selected': selectedTermIds.includes(term.id),
                    'is-correct': resolved && isCorrect(term.id),
                    'is-wrong': resolved && selectedTermIds.includes(term.id) && !isCorrect(term.id)
                }"
                @click="toggleTerm(term.id)"
            >
                {{ term.text }}
                <span v-if="resolved && isCorrect(term.id)">✅</span>
            </div>
        </div>

        <button v-if="!resolved" class="neo-btn" style="margin-top: 1.5rem;" @click="resolve">
            {{ t('generic.verify') }}
        </button>
        
        <div v-if="resolved" class="neo-feedback">
            <p>{{ feedbackText }}</p>
            <button class="neo-btn" @click="$emit('completed')">{{ t('generic.next') }}</button>
        </div>

        <!-- ZOOM OVERLAY -->
        <div v-if="zoomedImage" class="zoom-overlay" @click="closeZoom">
            <button class="zoom-close-btn">✕</button>
            <img :src="zoomedImage" class="zoom-content" @click.stop />
        </div>
    </div>
</template>

<style scoped>
.subtitle { text-align: center; margin-bottom: 1rem; font-style: italic; }
.zoom-hint { position: absolute; bottom: 10px; right: 10px; background: rgba(255,255,255,0.8); padding: 5px; border-radius: 50%; pointer-events: none; }

.terms-grid { display: grid; grid-template-columns: 1fr; gap: 0.75rem; margin-top: 0.5rem; }
@media (min-width: 600px) { .terms-grid { grid-template-columns: 1fr 1fr; } }

.term-btn { background: #fff; border: 2px solid #000; padding: 1rem; cursor: pointer; display: flex; justify-content: space-between; align-items: center; user-select: none; }
.term-btn.selected { background: #000; color: #fff; }
.term-btn.is-correct { border-color: #00aa00; background: #dfffd6; color: #005500; }
.term-btn.is-wrong { border-color: #aa0000; opacity: 0.6; text-decoration: line-through; }
</style>