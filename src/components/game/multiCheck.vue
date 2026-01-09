<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
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
const isUserCorrect = ref(false);
const zoomedImage = ref(null);

// ÄNDERUNG: Saubere Keys ohne hartcodierte Fallbacks
const options = [ 
    { id: 'none', label: t('multiCheck.options.none') }, 
    { id: 'both', label: t('multiCheck.options.both') }, 
    { id: 'left', label: t('multiCheck.options.left') }, 
    { id: 'right', label: t('multiCheck.options.right') } 
];

const resolveUrl = (img) => {
    if (!img) return '';
    let src = typeof img === 'string' ? img : img.src;
    let bucket = (typeof img === 'object' && img.bucket) ? img.bucket : 'Fake-Images';
    if (!src) return '';
    if (src.startsWith('http')) return src;
    const { data } = supabase.storage.from(bucket).getPublicUrl(src);
    return data.publicUrl;
};

onMounted(() => {
    imgLeftUrl.value = resolveUrl(props.imageLeft);
    imgRightUrl.value = resolveUrl(props.imageRight);
    window.addEventListener('popstate', handlePopState);
});

onUnmounted(() => window.removeEventListener('popstate', handlePopState));

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

const checkAnswer = () => { 
    if (!selectedOption.value) return;
    isUserCorrect.value = selectedOption.value === props.correctOption;
    resolved.value = true; 
    handleScoreAction(isUserCorrect.value, props.levelId); 
};

const finish = () => { 
    let res = { image71Correct: false, image21Correct: false }; 
    if (selectedOption.value === 'both') { 
        res.image71Correct = true; res.image21Correct = true; 
    } else if (selectedOption.value === 'left') { 
        res.image71Correct = true; 
    } else if (selectedOption.value === 'right') { 
        res.image21Correct = true; 
    } 
    emit('completed', res); 
};
</script>

<template>
    <div class="neo-card">
        <div class="neo-header">
            <!-- ÄNDERUNG: Standard-Key für die Frage -->
            <h2 class="neo-title">{{ questionText || t('multiCheck.defaultQuestion') }}</h2>
        </div>
        
        <div class="neo-grid-2">
            <div class="neo-img-wrap" @click="openZoom(imgLeftUrl)">
                <img :src="imgLeftUrl" draggable="false" />
                <div class="zoom-hint">🔍</div>
            </div>
            <div class="neo-img-wrap" @click="openZoom(imgRightUrl)">
                <img :src="imgRightUrl" draggable="false" />
                <div class="zoom-hint">🔍</div>
            </div>
        </div>

        <div class="neo-options-list">
            <label v-for="opt in options" :key="opt.id" 
                   class="neo-option" 
                   :class="{ 
                       'selected': selectedOption === opt.id,
                       'correct-opt': resolved && opt.id === correctOption,
                       'wrong-opt': resolved && selectedOption === opt.id && opt.id !== correctOption
                   }">
                <input type="radio" :value="opt.id" v-model="selectedOption" :disabled="resolved"> 
                {{ opt.label }}
            </label>
        </div>

        <button v-if="!resolved" class="neo-btn" @click="checkAnswer" :disabled="!selectedOption">
            {{ t('generic.verify') }}
        </button>
        
        <div v-if="resolved" class="neo-feedback">
            <!-- ÄNDERUNG: Feedback-Keys -->
            <p v-if="isUserCorrect" class="text-success">{{ t('multiCheck.feedback.success') }}</p>
            <p v-else class="text-fail">{{ t('multiCheck.feedback.fail') }}</p>
            <button class="neo-btn" @click="finish">{{ t('generic.next') }}</button>
        </div>

        <div v-if="zoomedImage" class="zoom-overlay" @click="closeZoom">
            <button class="zoom-close-btn" @click.stop="closeZoom">✕</button>
            <img :src="zoomedImage" class="zoom-content" />
        </div>
    </div>
</template>

<style scoped>
.zoom-hint { 
    position: absolute; bottom: 10px; right: 10px; 
    background: rgba(255,255,255,0.8); padding: 5px; border: 2px solid #000;
}

/* Feedback-Farben für die Radio-Liste */
.correct-opt {
    background: #dfffd6 !important;
    border-color: #00aa00 !important;
    color: #005500 !important;
    box-shadow: none !important;
}

.wrong-opt {
    background: #ffd6d6 !important;
    border-color: #aa0000 !important;
    color: #550000 !important;
    text-decoration: line-through;
}
</style>