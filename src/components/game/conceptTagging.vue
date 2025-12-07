<script setup>
import { ref, computed } from 'vue';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js';

// Generic Props
const props = defineProps({
    images: Array,          // ['Name.jpg', ...]
    bucket: { type: String, default: 'Fake-Images' },
    terms: Array,           // [{id: 't1', text: '...'}, ...]
    correctIds: Array,      // ['t1', 't2'] -> Welche sind richtig?
    question: String,
    subtitle: String,
    feedbackText: String
});

const emit = defineEmits(['completed']);
const { t } = useTranslation();

// Lokaler State für Auswahl
const selectedTermIds = ref([]);
const resolved = ref(false);

const imageUrls = computed(() => {
    return props.images.map(img => 
        supabase.storage.from(props.bucket).getPublicUrl(img).data.publicUrl
    );
});

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
    // Wir zeigen keine "Falschen" an, sondern highlighten die Richtigen
};

const isCorrect = (id) => props.correctIds.includes(id);
</script>

<template>
    <div class="neo-card">
        <h2 class="neo-title">{{ question }}</h2>
        <p class="subtitle">{{ subtitle }}</p>

        <div class="gallery">
            <img v-for="url in imageUrls" :key="url" :src="url" />
        </div>

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

        <button v-if="!resolved" class="neo-btn" @click="resolve">
            {{ t('generic.verify') }}
        </button>
        
        <div v-if="resolved" class="neo-feedback">
            <p>{{ feedbackText }}</p>
            <button class="neo-btn" @click="$emit('completed')">{{ t('generic.next') }}</button>
        </div>
    </div>
</template>

<style scoped>
/* Gallery CSS von Level 1 übernehmen/anpassen */
.subtitle { text-align: center; margin-bottom: 1rem; font-style: italic; }
.gallery { display: flex; gap: 0.75rem; margin-bottom: 1.5rem; overflow-x: auto; scroll-snap-type: x mandatory; }
.gallery img { flex: 0 0 80%; width: 80%; height: 400px; object-fit: cover; border: 2px solid #000; scroll-snap-align: center; }
@media (min-width: 600px) { .gallery img { flex: 1; width: auto; } }

.terms-grid { display: grid; grid-template-columns: 1fr; gap: 0.75rem; }
@media (min-width: 600px) { .terms-grid { grid-template-columns: 1fr 1fr; } }

.term-btn {
    background: #fff; border: 2px solid #000; padding: 1rem; cursor: pointer; display: flex; justify-content: space-between; align-items: center;
}
.term-btn.selected { background: #000; color: #fff; }

/* Auflösung */
.term-btn.is-correct { border-color: #00aa00; background: #dfffd6; color: #005500; }
.term-btn.is-wrong { border-color: #aa0000; opacity: 0.6; text-decoration: line-through; }
</style>