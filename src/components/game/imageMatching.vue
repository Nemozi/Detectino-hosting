<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js';
import { useGameState } from '@/composables/useGameState.js';

const props = defineProps(['items', 'terms', 'question', 'successText', 'levelId']);
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
});

// Zoom & History
const handlePopState = () => { zoomedImage.value = null; };
window.addEventListener('popstate', handlePopState);
onUnmounted(() => window.removeEventListener('popstate', handlePopState));
const openZoom = (url) => { zoomedImage.value = url; history.pushState({modal:true}, ''); };
const closeZoom = () => { if (zoomedImage.value) history.back(); };

const selectTerm = (termId) => { 
    if (resolved.value) return; 
    // Toggle: Wenn man den gleichen nochmal klickt, Auswahl aufheben
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
        activeTermId.value = null; // Nach Zuordnung Auswahl aufheben
    } else { 
        // Klick ohne aktiven Begriff -> Zoom
        openZoom(item.url); 
    } 
}; 

const getTermText = (termId) => { const term = props.terms.find(t => t.id === termId); return term ? term.text : ''; };
const checkSolution = () => { 
    resolved.value = true; 
    const allMatch = imageList.value.every(item => assignments.value[item.id] === item.correctTermId); 
    isCorrect.value = allMatch; 
    
    // Punktesystem
    handleScoreAction(allMatch, props.levelId || 1);
    
    if (!allMatch) emit('mistake', 'matching_error'); 
};
</script>

<template>
    <div class="neo-card">
        <h2 class="neo-title">{{ question }}</h2>
        
        <!-- VERBESSERTE ERKLÄRUNG -->
        <div class="instruction-box" :class="{ 'active-mode': activeTermId }">
            <span v-if="!activeTermId"> <strong>Schritt 1:</strong> Wähle einen Begriff oben aus.</span>
            <span v-else> <strong>Schritt 2:</strong> Tippe jetzt auf das passende Bild.</span>
        </div>

        <div class="terms-row">
            <button v-for="term in terms" :key="term.id" class="term-pill" :class="{ 'active': activeTermId === term.id }" @click="selectTerm(term.id)" :disabled="resolved">{{ term.text }}</button>
        </div>
        
        <div class="matching-grid">
            <div v-for="item in imageList" :key="item.id" class="match-card" @click="assignToImage(item)">
                <img :src="item.url" />
                
                <!-- Zoom Hinweis (nur sichtbar wenn KEIN Begriff ausgewählt ist) -->
                <div v-if="!activeTermId && !assignments[item.id]" class="zoom-hint">🔍</div>
                
                <div v-if="assignments[item.id]" class="assigned-label" :class="{ 'valid': resolved && assignments[item.id] === item.correctTermId, 'invalid': resolved && assignments[item.id] !== item.correctTermId }">
                    {{ getTermText(assignments[item.id]) }}
                    <!-- Kleines X zum Entfernen der Zuordnung (optional, aber user-freundlich) -->
                    <span v-if="!resolved" class="remove-x">✕</span>
                </div>
            </div>
        </div>

        <!-- Sekundärer Hinweis -->
        <p class="secondary-hint" v-if="!resolved">Tippe auf ein Bild ohne Auswahl, um es zu vergrößern.</p>

        <button v-if="!resolved" class="neo-btn" @click="checkSolution" :disabled="Object.keys(assignments).length < items.length">{{ t('generic.verify') }}</button>
        
        <div v-if="resolved" class="neo-feedback"><p v-if="isCorrect" class="text-success">{{ successText }}</p><p v-else class="text-fail">Leider falsch.</p><button class="neo-btn" @click="$emit('completed')">{{ t('generic.next') }}</button></div>
        <div v-if="zoomedImage" class="zoom-overlay" @click="closeZoom"><button class="zoom-close-btn">✕</button><img :src="zoomedImage" class="zoom-content" @click.stop /></div>
    </div>
</template>

<style scoped>
/* Neue Instruktions-Box */
.instruction-box {
    background: #f0f0f0;
    padding: 0.8rem;
    text-align: center;
    font-size: 0.95rem;
    border: 2px solid transparent;
    margin-bottom: 1rem;
    transition: all 0.3s;
}

/* Wenn ein Begriff ausgewählt ist, wird die Box gelb (Aufmerksamkeit) */
.instruction-box.active-mode {
    background: #fff;
    border-color: #000;
    box-shadow: 4px 4px 0 rgba(0,0,0,0.1);
    font-weight: bold;
    transform: scale(1.02);
}

.secondary-hint {
    text-align: center;
    font-size: 0.8rem;
    color: #666;
    margin-bottom: 1rem;
}

.terms-row { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-bottom: 1.5rem; }
.term-pill { background: #fff; border: 2px solid #000; padding: 0.5rem 1rem; cursor: pointer; font-weight: bold; transition: all 0.2s; }
.term-pill.active { background: #000; color: #fff; transform: translateY(-2px); box-shadow: 2px 2px 0 rgba(0,0,0,0.2); }

.matching-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; margin-bottom: 1rem; }
@media(min-width: 600px) { .matching-grid { grid-template-columns: repeat(3, 1fr); } }

.match-card { border: 2px solid #000; position: relative; aspect-ratio: 1; cursor: pointer; background: #eee; overflow: hidden; }
.match-card img { width: 100%; height: 100%; object-fit: cover; }

.assigned-label { 
    position: absolute; bottom: 0; left: 0; right: 0; 
    background: #edc531; border-top: 2px solid #000; 
    padding: 0.5rem; text-align: center; font-weight: bold; font-size: 0.9rem;
    display: flex; justify-content: center; align-items: center; gap: 5px;
}
.assigned-label.valid { background: #dfffd6; color: #005500; }
.assigned-label.invalid { background: #ffd6d6; color: #550000; }
.remove-x { font-size: 0.7rem; opacity: 0.6; }

.zoom-hint { position: absolute; top: 5px; right: 5px; background: rgba(255,255,255,0.8); padding: 4px; border-radius: 4px; font-size: 1rem; pointer-events: none; }
</style>