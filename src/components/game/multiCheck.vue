<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js';
import { useGameState } from '@/composables/useGameState.js';

const props = defineProps({ 
    imageLeft: [String, Object], 
    imageRight: [String, Object], 
    correctOption: String, 
    questionText: String, 
    levelId: { type: Number, default: 1 } 
});

const emit = defineEmits(['completed']);
const { t } = useTranslation();
const { handleScoreAction } = useGameState();

const imgLeftUrl = ref(''); 
const imgRightUrl = ref(''); 
const selectedOption = ref(null); 
const resolved = ref(false); 
const zoomedImage = ref(null);

const options = [ 
    { id: 'none', label: t('level1.step2.options.none') || 'Beide echt' }, 
    { id: 'both', label: t('level1.step2.options.both') || 'Beide fake' }, 
    { id: 'left', label: t('level1.step2.options.left') || 'Links' }, 
    { id: 'right', label: t('level1.step2.options.right') || 'Rechts' } 
];

// --- HILFSFUNKTION: URLS ROBUST AUFLÖSEN ---
const resolveUrl = (img) => {
    if (!img) return '';
    let src = typeof img === 'string' ? img : img.src;
    let bucket = (typeof img === 'object' && img.bucket) ? img.bucket : 'Fake-Images';

    if (!src) return '';
    if (src.startsWith('http')) return src; // Unsplash Links direkt nutzen

    const { data } = supabase.storage.from(bucket).getPublicUrl(src);
    return data.publicUrl;
};

onMounted(() => {
    imgLeftUrl.value = resolveUrl(props.imageLeft);
    imgRightUrl.value = resolveUrl(props.imageRight);
    window.addEventListener('popstate', handlePopState);
});

onUnmounted(() => {
    window.removeEventListener('popstate', handlePopState);
});

// --- ZOOM LOGIK (Identisch mit spotTheFake) ---
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

const handlePopState = () => { zoomedImage.value = null; };

// --- SPIEL LOGIK ---
const checkAnswer = () => { 
    resolved.value = true; 
    const isCorrect = selectedOption.value === props.correctOption;
    handleScoreAction(isCorrect, props.levelId); 
};

const finish = () => { 
    let res = { image71Correct: false, image21Correct: false }; 
    if (selectedOption.value === 'both') { res.image71Correct = true; res.image21Correct = true; } 
    else if (selectedOption.value === 'left') { res.image71Correct = true; } 
    else if (selectedOption.value === 'right') { res.image21Correct = true; } 
    emit('completed', res); 
};
</script>

<template>
    <div class="neo-card">
        <h2 class="neo-title">{{ questionText || t('level1.step2.question') }}</h2>
        
        <!-- Nutzt globales Grid und Image-Wrap aus base.css -->
        <div class="neo-grid-2">
            <div class="neo-img-wrap" @click="openZoom(imgLeftUrl)">
                <img :src="imgLeftUrl" draggable="false" />
                <div class="zoom-hint-icon">🔍</div>
            </div>
            <div class="neo-img-wrap" @click="openZoom(imgRightUrl)">
                <img :src="imgRightUrl" draggable="false" />
                <div class="zoom-hint-icon">🔍</div>
            </div>
        </div>

        <!-- Nutzt globale Options-Liste aus base.css -->
        <div class="neo-options-list">
            <label v-for="opt in options" :key="opt.id" 
                   class="neo-option" :class="{ 'selected': selectedOption === opt.id }">
                <input type="radio" :value="opt.id" v-model="selectedOption" :disabled="resolved"> 
                {{ opt.label }}
            </label>
        </div>

        <button v-if="!resolved" class="neo-btn" @click="checkAnswer" :disabled="!selectedOption">
            {{ t('generic.verify') }}
        </button>
        
        <div v-if="resolved" class="neo-feedback">
            <p :class="selectedOption === props.correctOption ? 'text-success' : 'text-fail'">
                {{ selectedOption === props.correctOption ? t('level1.step2.feedback.success') : t('level1.step2.feedback.fail') }}
            </p>
            <button class="neo-btn" @click="finish">{{ t('generic.next') }}</button>
        </div>

        <!-- Globales Zoom-Overlay -->
        <div v-if="zoomedImage" class="zoom-overlay" @click="closeZoom">
            <button class="zoom-close-btn" @click.stop="closeZoom">✕</button>
            <img :src="zoomedImage" class="zoom-content" />
        </div>
    </div>
</template>

<style scoped>
/* Nur noch minimale Korrekturen nötig, Rest ist global */
.zoom-hint-icon { 
    position: absolute; 
    bottom: 10px; 
    right: 10px; 
    background: rgba(255,255,255,0.8); 
    padding: 5px; 
    border: 2px solid #000;
    pointer-events: none; 
}

.neo-img-wrap {
    cursor: zoom-in;
    transition: transform 0.1s;
}

.neo-img-wrap:hover {
    transform: scale(1.02);
}
</style>