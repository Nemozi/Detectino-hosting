<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js';
import { useGameState } from '@/composables/useGameState.js'; 
console.log('conceptTagging component loaded');

const props = defineProps({
    images: Array,          
    bucket: { type: String, default: 'Fake-Images' }, 
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
const isUserCorrect = ref(false); 
const zoomedImage = ref(null);
const currentIndex = ref(0);
const transitionName = ref('');

// --- DATA PREP ---
const imageUrls = computed(() => {
    if (!props.images) return [];
    return props.images.map(img => {
        let src = typeof img === 'string' ? img : img.src;
        let b = (typeof img === 'object' && img.bucket) ? img.bucket : props.bucket;
        if (!src) return null;
        const { data } = supabase.storage.from(b).getPublicUrl(src);
        return data.publicUrl;
    }).filter(url => url !== null);
});

// --- NAVIGATION ---
const nextCard = () => {
    if (imageUrls.value.length <= 1) return;
    transitionName.value = 'slide-left';
    currentIndex.value = (currentIndex.value + 1) % imageUrls.value.length;
};
const prevCard = () => {
    if (imageUrls.value.length <= 1) return;
    transitionName.value = 'slide-right';
    currentIndex.value = (currentIndex.value - 1 + imageUrls.value.length) % imageUrls.value.length;
};

// --- ZOOM ---
const openZoom = (url) => { zoomedImage.value = url; history.pushState({ modal: true }, ''); };
const closeZoom = () => { if (zoomedImage.value) { zoomedImage.value = null; if (window.history.state?.modal) history.back(); } };
const handlePopState = () => { zoomedImage.value = null; };
onMounted(() => window.addEventListener('popstate', handlePopState));
onUnmounted(() => window.removeEventListener('popstate', handlePopState));

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
    // PRÜFUNG: Hat der Nutzer exakt die richtigen IDs gewählt?
    // 1. Anzahl muss gleich sein
    // 2. Jede ID in correctIds muss in selectedTermIds sein
    const matchCount = selectedTermIds.value.length === props.correctIds.length;
    const allFound = props.correctIds.every(id => selectedTermIds.value.includes(id));
    
    isUserCorrect.value = matchCount && allFound;
    resolved.value = true;

    // Nur Punkte vergeben, wenn ALLES stimmt
    handleScoreAction(isUserCorrect.value, props.levelId); 
};

const isCorrect = (id) => props.correctIds.includes(id);
</script>

<template>
    <div class="neo-card">
        <div class="neo-header">
            <h2 class="neo-title">{{ question }}</h2>
        </div>
        <p class="subtitle">{{ subtitle }}</p>

        <div v-if="imageUrls.length > 0">
            <div v-if="imageUrls.length > 1" style="text-align: center; margin-bottom: 0.5rem;">
                <span class="neo-pill white">Bild {{ currentIndex + 1 }} / {{ imageUrls.length }}</span>
            </div>

            <div class="stack-container">
                <Transition :name="transitionName" mode="out-in">
                    <div :key="currentIndex" class="stack-card" @click="openZoom(imageUrls[currentIndex])">
                        <img :src="imageUrls[currentIndex]" draggable="false" />
                        <div class="zoom-hint">🔍</div>
                    </div>
                </Transition>
            </div>

            <div v-if="imageUrls.length > 1" class="stack-controls">
                <button class="stack-nav-btn" @click="prevCard">←</button>
                <button class="stack-nav-btn" @click="nextCard">→</button>
            </div>
        </div>

        <div class="neo-grid-2" style="margin-top: 1.5rem;">
            <div 
                v-for="term in terms" 
                :key="term.id"
                class="neo-option"
                :class="{ 
                    'selected': selectedTermIds.includes(term.id),
                    'is-correct-final': resolved && isCorrect(term.id),
                    'is-wrong-final': resolved && selectedTermIds.includes(term.id) && !isCorrect(term.id)
                }"
                @click="toggleTerm(term.id)"
            >
                {{ term.text }}
            </div>
        </div>

        <button v-if="!resolved" class="neo-btn" style="margin-top: 2rem;" @click="resolve" :disabled="selectedTermIds.length === 0">
            {{ t('generic.verify') }}
        </button>
        
        <div v-if="resolved" class="neo-feedback">
            <p v-if="isUserCorrect" class="text-success">{{ feedbackText }}</p>
            <p v-else class="text-fail">Nicht ganz richtig. Einige Merkmale wurden übersehen oder waren falsch.</p>
            <button class="neo-btn" @click="$emit('completed')">{{ t('generic.next') }}</button>
        </div>

        <div v-if="zoomedImage" class="zoom-overlay" @click="closeZoom">
            <button class="zoom-close-btn" @click.stop="closeZoom">✕</button>
            <img :src="zoomedImage" class="zoom-content" />
        </div>
    </div>
</template>

<style scoped>
.subtitle { text-align: center; margin-bottom: 1rem; font-style: italic; font-weight: 700; font-size: 0.9rem; }
.zoom-hint { position: absolute; bottom: 10px; right: 10px; background: rgba(255,255,255,0.8); padding: 5px; border: 2px solid #000; pointer-events: none; }

/* Feedback Styles */
.is-correct-final { 
    border-color: #00aa00 !important; 
    background: #dfffd6 !important; 
    color: #005500 !important; 
    box-shadow: none !important;
}
.is-wrong-final { 
    border-color: #aa0000 !important; 
    opacity: 0.7; 
    text-decoration: line-through; 
    box-shadow: none !important;
}

/* Navigation Buttons (Tinder Style wie angefordert) */
.stack-controls {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
}

.stack-nav-btn {
    background: #fff;
    border: 2px solid #000;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    font-size: 1.2rem;
    font-weight: 900;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 3px 3px 0 #000;
    transition: transform 0.1s;
}

.stack-nav-btn:active {
    transform: translate(2px, 2px);
    box-shadow: 1px 1px 0 #000;
}
</style>