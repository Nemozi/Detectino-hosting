<script setup>
import { ref, onMounted, computed } from 'vue';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js';

const props = defineProps({
    // Akzeptiert jetzt: String, Objekt ODER Array von beidem
    image: [String, Object, Array], 
    question: String,
    options: Array,         
    correctId: String,
    feedbackText: String
});

const emit = defineEmits(['completed', 'mistake']);
const { t } = useTranslation();

// Wir nutzen computed wie in analysis.vue für maximale Flexibilität
const imageUrls = computed(() => {
    if (!props.image) return [];

    // Alles in ein Array zwingen
    const list = Array.isArray(props.image) ? props.image : [props.image];

    return list.map(item => {
        if (!item) return null;

        let filename = '';
        let bucket = 'Fake-Images';

        if (typeof item === 'string') {
            filename = item;
        } else {
            filename = item.src;
            bucket = item.bucket || 'Fake-Images';
        }

        if (!filename) return null;

        const { data } = supabase.storage.from(bucket).getPublicUrl(filename);
        return data.publicUrl;
    }).filter(url => url !== null);
});

const selectedId = ref(null);
const resolved = ref(false);
const isCorrect = ref(false);

const resolve = () => {
    resolved.value = true;
    isCorrect.value = selectedId.value === props.correctId;
    
    // Bei "Ja/Nein" Fragen ist oft beides okay, aber für die Logik:
    if (!isCorrect.value) {
        emit('mistake', 'single_choice_wrong');
    }
};
</script>

<template>
    <div class="neo-card">
        <h2 class="neo-title">{{ question }}</h2>
        
        <!-- Bilder Container (angepasst für mehrere Bilder) -->
        <div v-if="imageUrls.length > 0" class="images-wrapper">
            <img v-for="(url, idx) in imageUrls" :key="idx" :src="url" alt="Quiz Image" />
        </div>

        <div class="options-stack">
            <button 
                v-for="opt in options" 
                :key="opt.id"
                class="option-btn"
                :class="{ 
                    'selected': selectedId === opt.id,
                    'correct': resolved && opt.id === correctId,
                    'wrong': resolved && selectedId === opt.id && selectedId !== correctId
                }"
                @click="!resolved && (selectedId = opt.id)"
            >
                {{ opt.text }}
            </button>
        </div>

        <button v-if="!resolved" class="neo-btn" @click="resolve" :disabled="!selectedId">
            {{ t('generic.verify') }}
        </button>

        <div v-if="resolved" class="neo-feedback">
            <!-- Feedback Text anzeigen -->
            <p v-if="isCorrect" class="text-success">{{ feedbackText }}</p>
            <p v-else class="text-fail">Nicht ganz. Die richtige Antwort ist markiert.</p>
            <button class="neo-btn" @click="$emit('completed')">{{ t('generic.next') }}</button>
        </div>
    </div>
</template>

<style scoped>
/* Container für 1 oder mehrere Bilder */
.images-wrapper { 
    display: flex; 
    flex-direction: column; 
    gap: 1rem; 
    margin-bottom: 1.5rem; 
    align-items: center; 
}

@media (min-width: 600px) {
    .images-wrapper {
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
    }
}

.images-wrapper img { 
    width: 100%; 
    height: auto; 
    max-height: 250px; 
    border: 2px solid #000; 
    object-fit: contain; 
}

@media (min-width: 600px) {
    .images-wrapper img {
        width: auto;
        max-width: 45%; /* Damit 2 nebeneinander passen */
    }
}

.options-stack { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem; }
.option-btn {
    background: #fff; border: 2px solid #000; padding: 1rem; text-align: left; cursor: pointer; font-weight: bold; transition: all 0.1s;
}
.option-btn:hover { background: #eee; }
.option-btn.selected { background: #000; color: #fff; transform: translate(2px, 2px); }
.option-btn.correct { background: #dfffd6; border-color: #00aa00; color: #005500; }
.option-btn.wrong { background: #ffd6d6; border-color: #aa0000; color: #550000; }
</style>