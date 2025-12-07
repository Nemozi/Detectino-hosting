<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js';

// images: Array von { src: 'Name.jpg', type: 'ai'/'real', bucket: '...' }
const props = defineProps(['images', 'question', 'successText']);
const emit = defineEmits(['completed']);
const { t } = useTranslation();

const imageList = ref([]);
const selectedIndices = ref([]);
const resolved = ref(false);
const allCorrect = ref(false);

onMounted(() => {
    // URLs laden
    imageList.value = props.images.map(img => {
        const { data } = supabase.storage.from(img.bucket).getPublicUrl(img.src);
        return { ...img, url: data.publicUrl };
    });
});

const toggleSelect = (index) => {
    if (resolved.value) return;
    if (selectedIndices.value.includes(index)) {
        selectedIndices.value = selectedIndices.value.filter(i => i !== index);
    } else {
        selectedIndices.value.push(index);
    }
};

const resolve = () => {
    resolved.value = true;
    
    // Prüfen: Wurden ALLE 'ai' Bilder gewählt und KEIN 'real' Bild?
    const aiIndices = imageList.value
        .map((img, idx) => img.type === 'ai' ? idx : -1)
        .filter(i => i !== -1);
        
    // Arrays vergleichen (Sortierung wichtig)
    const selectedSorted = [...selectedIndices.value].sort();
    const aiSorted = [...aiIndices].sort();
    
    // Sind Arrays identisch?
    allCorrect.value = JSON.stringify(selectedSorted) === JSON.stringify(aiSorted);
};
</script>

<template>
    <div class="neo-card">
        <h2 class="neo-title">{{ question }}</h2>
        <p class="hint">Tippe alle KI-Bilder an.</p>
        
        <div class="grid">
            <div 
                v-for="(img, idx) in imageList" 
                :key="img.src"
                class="img-box"
                :class="{ 
                    'selected': selectedIndices.includes(idx),
                    'is-ai': resolved && img.type === 'ai',
                    'is-real': resolved && img.type === 'real'
                }"
                @click="toggleSelect(idx)"
            >
                <img :src="img.url" />
                <div class="check-badge" v-if="selectedIndices.includes(idx)">✓</div>
            </div>
        </div>

        <button v-if="!resolved" class="neo-btn" @click="resolve" :disabled="selectedIndices.length === 0">
            {{ t('generic.verify') }}
        </button>

        <div v-if="resolved" class="neo-feedback">
            <p v-if="allCorrect" class="text-success">{{ successText }}</p>
            <p v-else class="text-fail">Nicht ganz. Achte auf die markierten KI-Bilder.</p>
            <button class="neo-btn" @click="$emit('completed')">{{ t('generic.next') }}</button>
        </div>
    </div>
</template>

<style scoped>
.hint { text-align: center; margin-bottom: 1rem; font-style: italic; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
.img-box { position: relative; border: 2px solid #000; aspect-ratio: 1; cursor: pointer; }
.img-box img { width: 100%; height: 100%; object-fit: cover; display: block; }
/* Selection State */
.img-box.selected { border-color: #000; transform: scale(0.95); box-shadow: inset 0 0 0 4px #000; }
.check-badge { position: absolute; top: 5px; right: 5px; background: #000; color: #fff; width: 25px; height: 25px; display: flex; align-items: center; justify-content: center; font-weight: bold; border-radius: 50%; }
/* Resolved State */
.img-box.is-ai::after { content: "KI"; position: absolute; bottom: 0; left: 0; background: #000; color: #fff; padding: 2px 6px; font-weight: bold; font-size: 0.8rem; }
.img-box.is-real { opacity: 0.4; }
</style>