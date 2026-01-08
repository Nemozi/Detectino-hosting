<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js';
import { useGameState } from '@/composables/useGameState.js';

const props = defineProps([
    'items', 
    'terms', 
    'question', 
    'successText', 
    'failFeedbackText', // NEU: Prop für den Fehler-Text
    'levelId'
]);

const emit = defineEmits(['completed', 'mistake']);
const { t } = useTranslation();
const { handleScoreAction } = useGameState();

const imageList = ref([]);
const activeTermId = ref(null);
const assignments = ref({});
const resolved = ref(false);
const isCorrect = ref(false);
const zoomedImage = ref(null);

onMounted(() => {
    imageList.value = props.items.map(item => {
        const { data } = supabase.storage.from(item.bucket || 'Fake-Images').getPublicUrl(item.src);
        return { ...item, url: data.publicUrl };
    });
    window.addEventListener('popstate', handlePopState);
});

onUnmounted(() => {
    window.removeEventListener('popstate', handlePopState);
});

// --- ZOOM LOGIK ---
const handlePopState = () => { zoomedImage.value = null; };
const openZoom = (url) => { 
    if(!url) return;
    zoomedImage.value = url; 
    history.pushState({modal:true}, ''); 
};
const closeZoom = () => { 
    if (zoomedImage.value) {
        zoomedImage.value = null;
        if (window.history.state?.modal) history.back();
    }
};

// --- SPIEL LOGIK ---
const selectTerm = (termId) => { 
    if (resolved.value) return; 
    if (activeTermId.value === termId) {
        activeTermId.value = null;
    } else {
        activeTermId.value = termId; 
    }
};

const assignToImage = (item) => { 
    if (resolved.value) return; 
    if (activeTermId.value) { 
        assignments.value[item.id] = activeTermId.value; 
        activeTermId.value = null; 
    } else { 
        openZoom(item.url); 
    } 
}; 

const getTermText = (termId) => { 
    const term = props.terms.find(t => t.id === termId); 
    return term ? term.text : ''; 
};

const checkSolution = () => { 
    resolved.value = true; 
    const allMatch = imageList.value.every(item => assignments.value[item.id] === item.correctTermId); 
    isCorrect.value = allMatch; 
    
    handleScoreAction(allMatch, props.levelId || 1);
    if (!allMatch) emit('mistake', 'matching_error'); 
};
</script>

<template>
    <div class="neo-card">
        <h2 class="neo-title">{{ question }}</h2>
        
        <div class="instruction-box" :class="{ 'active-mode': activeTermId && !resolved }">
            <span v-if="!activeTermId && !resolved"> <strong>Schritt 1:</strong> Wähle einen Begriff aus.</span>
            <span v-else-if="!resolved"> <strong>Schritt 2:</strong> Tippe auf das passende Bild.</span>
            <span v-else>Analyse abgeschlossen</span>
        </div>

        <div class="terms-row">
            <button v-for="term in terms" 
                :key="term.id" 
                class="term-pill" 
                :class="{ 'active': activeTermId === term.id }" 
                @click="selectTerm(term.id)" 
                :disabled="resolved"
            >
                {{ term.text }}
            </button>
        </div>
        
        <div class="matching-grid">
            <div v-for="item in imageList" :key="item.id" class="match-card" @click="assignToImage(item)">
                <img :src="item.url" draggable="false" />
                
                <div v-if="!activeTermId && !assignments[item.id]" class="zoom-hint">🔍</div>
                
                <div v-if="assignments[item.id]" 
                     class="assigned-label" 
                     :class="{ 
                        'valid': resolved && assignments[item.id] === item.correctTermId, 
                        'invalid': resolved && assignments[item.id] !== item.correctTermId 
                     }"
                >
                    {{ getTermText(assignments[item.id]) }}
                    <span v-if="!resolved" class="remove-x">✕</span>
                </div>
            </div>
        </div>

        <p class="secondary-hint" v-if="!resolved">Tippe auf ein Bild ohne Text, um es zu vergrößern.</p>

        <button v-if="!resolved" 
                class="neo-btn" 
                @click="checkSolution" 
                :disabled="Object.keys(assignments).length < items.length"
        >
            {{ t('generic.verify') }}
        </button>
        
        <div v-if="resolved" class="neo-feedback">
            <p v-if="isCorrect" class="text-success">{{ successText }}</p>
            <!-- REPARIERTES FEEDBACK BEI FEHLER -->
            <p v-else class="text-fail">
                {{ failFeedbackText || 'Leider nicht ganz richtig. Die korrekten Zuordnungen sind jetzt markiert.' }}
            </p>
            <button class="neo-btn" @click="$emit('completed')">{{ t('generic.next') }}</button>
        </div>

        <!-- ZOOM OVERLAY (Klick auf Bild schließt jetzt ebenfalls) -->
        <div v-if="zoomedImage" class="zoom-overlay" @click="closeZoom">
            <button class="zoom-close-btn" @click.stop="closeZoom">✕</button>
            <img :src="zoomedImage" class="zoom-content" />
        </div>
    </div>
</template>

<style scoped>
.instruction-box {
    background: #f0f0f0;
    padding: 0.8rem;
    text-align: center;
    font-size: 0.9rem;
    border: 2px solid #000;
    margin-bottom: 1rem;
    text-transform: uppercase;
    font-weight: 800;
}

.instruction-box.active-mode {
    background: var(--card-bg, #edc531);
    box-shadow: 4px 4px 0 #000;
}

.secondary-hint { text-align: center; font-size: 0.75rem; font-weight: bold; color: #444; margin-bottom: 1rem; text-transform: uppercase; }

.terms-row { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-bottom: 1.5rem; }
.term-pill { background: #fff; border: 2px solid #000; padding: 0.6rem 1rem; cursor: pointer; font-weight: 800; text-transform: uppercase; transition: all 0.1s; }
.term-pill.active { background: #000; color: #fff; transform: translate(-2px, -2px); box-shadow: 4px 4px 0 #000; }

.matching-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; margin-bottom: 1rem; }
@media(min-width: 600px) { .matching-grid { grid-template-columns: repeat(3, 1fr); } }

.match-card { border: 3px solid #000; position: relative; aspect-ratio: 1; cursor: pointer; background: #000; overflow: hidden; }
.match-card img { width: 100%; height: 100%; object-fit: cover; }

.assigned-label { 
    position: absolute; bottom: 0; left: 0; right: 0; 
    background: var(--card-bg); border-top: 3px solid #000; 
    padding: 0.5rem; text-align: center; font-weight: 900; font-size: 0.8rem;
    text-transform: uppercase;
}
.assigned-label.valid { background: #00aa00; color: #fff; }
.assigned-label.invalid { background: #ff3333; color: #fff; text-decoration: line-through; }
.remove-x { margin-left: 10px; font-size: 0.7rem; }

.zoom-hint { position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.9); border: 2px solid #000; padding: 5px; pointer-events: none; }
</style>