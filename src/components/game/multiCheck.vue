<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js';
import { useGameState } from '@/composables/useGameState.js';

const props = defineProps({ 
    imageLeft: String, 
    imageRight: String, 
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
    { id: 'none', label: t('level1.step2.options.none') }, 
    { id: 'both', label: t('level1.step2.options.both') }, 
    { id: 'left', label: t('level1.step2.options.left') }, 
    { id: 'right', label: t('level1.step2.options.right') } 
];

onMounted(() => {
    // Bilder laden
    if (props.imageLeft) imgLeftUrl.value = supabase.storage.from('Fake-Images').getPublicUrl(props.imageLeft).data.publicUrl;
    if (props.imageRight) imgRightUrl.value = supabase.storage.from('Fake-Images').getPublicUrl(props.imageRight).data.publicUrl;
});

// Zoom & History
const handlePopState = () => { zoomedImage.value = null; };
window.addEventListener('popstate', handlePopState);
onUnmounted(() => window.removeEventListener('popstate', handlePopState));
const openZoom = (url) => { zoomedImage.value = url; history.pushState({modal:true}, ''); };
const closeZoom = () => { if (zoomedImage.value) history.back(); };

const checkAnswer = () => { 
    resolved.value = true; 
    // Punktesystem
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
        
        <!-- Nutzt globale Grid-Klasse -->
        <div class="neo-grid-2">
            <div class="neo-img-wrap" @click="openZoom(imgLeftUrl)">
                <img :src="imgLeftUrl" />
                <div class="zoom-icon">🔍</div>
            </div>
            <div class="neo-img-wrap" @click="openZoom(imgRightUrl)">
                <img :src="imgRightUrl" />
                <div class="zoom-icon">🔍</div>
            </div>
        </div>

        <!-- Nutzt globale Options-Klasse -->
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
            <button class="zoom-close-btn">✕</button>
            <img :src="zoomedImage" class="zoom-content" @click.stop />
        </div>
    </div>
</template>

<style scoped>
/* Hier muss fast nichts mehr stehen! */
.zoom-icon { 
    position: absolute; bottom: 10px; right: 10px; 
    background: rgba(255,255,255,0.8); padding: 5px; border-radius: 4px; 
}
</style>