<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js';

// items: [{ id: 'img1', src: '...', bucket: '...', correctTermId: 't1' }, ...]
// terms: [{ id: 't1', text: '...' }, ...]
const props = defineProps(['items', 'terms', 'question', 'successText']);
const emit = defineEmits(['completed', 'mistake']);
const { t } = useTranslation();

const imageList = ref([]);
const activeTermId = ref(null); // Welcher Begriff ist gerade ausgewählt?
const assignments = ref({}); // { imgId: termId }
const resolved = ref(false);
const isCorrect = ref(false);

onMounted(() => {
    // Bilder laden
    imageList.value = props.items.map(item => {
        const { data } = supabase.storage.from(item.bucket || 'Fake-Images').getPublicUrl(item.src);
        return { ...item, url: data.publicUrl };
    });
});

const selectTerm = (termId) => {
    if (resolved.value) return;
    activeTermId.value = termId;
};

const assignToImage = (item) => {
    if (resolved.value || !activeTermId.value) return;
    // Zuordnung speichern
    assignments.value[item.id] = activeTermId.value;
    activeTermId.value = null; // Auswahl aufheben
};

const getTermText = (termId) => {
    const term = props.terms.find(t => t.id === termId);
    return term ? term.text : '';
};

const checkSolution = () => {
    resolved.value = true;
    // Prüfen ob alle Zuordnungen stimmen
    const allMatch = imageList.value.every(item => {
        return assignments.value[item.id] === item.correctTermId;
    });
    
    isCorrect.value = allMatch;
    if (!allMatch) emit('mistake', 'matching_error');
};
</script>

<template>
    <div class="neo-card">
        <h2 class="neo-title">{{ question }}</h2>
        <p class="hint">1. Begriff wählen -> 2. Passendes Bild antippen</p>

        <!-- Begriffs-Leiste -->
        <div class="terms-row">
            <button 
                v-for="term in terms" 
                :key="term.id"
                class="term-pill"
                :class="{ 'active': activeTermId === term.id }"
                @click="selectTerm(term.id)"
                :disabled="resolved"
            >
                {{ term.text }}
            </button>
        </div>

        <!-- Bilder Grid -->
        <div class="matching-grid">
            <div 
                v-for="item in imageList" 
                :key="item.id"
                class="match-card"
                @click="assignToImage(item)"
            >
                <img :src="item.url" />
                
                <!-- Label Overlay -->
                <div v-if="assignments[item.id]" class="assigned-label" :class="{
                    'valid': resolved && assignments[item.id] === item.correctTermId,
                    'invalid': resolved && assignments[item.id] !== item.correctTermId
                }">
                    {{ getTermText(assignments[item.id]) }}
                </div>
            </div>
        </div>

        <button v-if="!resolved" class="neo-btn" @click="checkSolution" :disabled="Object.keys(assignments).length < items.length">
            {{ t('generic.verify') }}
        </button>

        <div v-if="resolved" class="neo-feedback">
            <p v-if="isCorrect" class="text-success">{{ successText }}</p>
            <p v-else class="text-fail">Leider nicht ganz richtig. Schau dir die Lösung an.</p>
            <button class="neo-btn" @click="$emit('completed')">{{ t('generic.next') }}</button>
        </div>
    </div>
</template>

<style scoped>
.hint { text-align: center; font-size: 0.9rem; margin-bottom: 1rem; }
.terms-row { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-bottom: 1.5rem; }
.term-pill {
    background: #fff; border: 2px solid #000; padding: 0.5rem 1rem; cursor: pointer; font-weight: bold; transition: all 0.2s;
}
.term-pill.active { background: #000; color: #fff; transform: scale(1.1); }

.matching-grid { display: grid; grid-template-columns: 1fr; gap: 1rem; margin-bottom: 1.5rem; }
@media(min-width: 600px) { .matching-grid { grid-template-columns: repeat(3, 1fr); } }

.match-card {
    border: 2px solid #000; position: relative; aspect-ratio: 1; cursor: pointer; background: #eee;
}
.match-card img { width: 100%; height: 100%; object-fit: cover; }

.assigned-label {
    position: absolute; bottom: 0; left: 0; right: 0;
    background: #edc531; border-top: 2px solid #000;
    padding: 0.5rem; text-align: center; font-weight: bold; font-size: 0.9rem;
}
.assigned-label.valid { background: #dfffd6; color: #005500; }
.assigned-label.invalid { background: #ffd6d6; color: #550000; }
</style>