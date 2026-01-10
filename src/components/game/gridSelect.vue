<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js';
import { useGameState } from '@/composables/useGameState.js';

const props = defineProps({
    images: Array, 
    question: String, 
    successText: String, 
    levelId: { type: Number, default: 1 }
});

const emit = defineEmits(['completed']);
const { t } = useTranslation();
const { logActivity, handleScoreAction } = useGameState();

const imageList = ref([]);
const currentIndex = ref(0);
const selectedIndices = ref([]);
const isSuccess = ref(false); 
const errorMessage = ref('');
const zoomedImage = ref(null);
const transitionName = ref('');
const correctImages = ref([]); 
const loading = ref(true);

const prepareImages = () => {
    if (!props.images || props.images.length === 0) return;
    loading.value = true;
    
    imageList.value = props.images.map(img => {
        let finalUrl = '';
        const s = (img && typeof img.src === 'string') ? img.src : '';

        if (s.startsWith('http')) {
            finalUrl = s;
        } else if (s) {
            const bucketName = img.bucket || 'Real-Images';
            const { data } = supabase.storage.from(bucketName).getPublicUrl(s);
            finalUrl = data.publicUrl;
        }
        return { ...img, url: finalUrl };
    }).filter(img => img.url !== '');

    loading.value = false;
};

const openZoom = (url) => {
    if (!url) return;
    zoomedImage.value = url;
    window.history.pushState({ modal: true }, '');
};

const closeZoom = () => {
    if (zoomedImage.value) {
        zoomedImage.value = null;
        if (window.history.state?.modal) window.history.back();
    }
};

const handlePopState = () => { zoomedImage.value = null; };

const nextCard = () => {
    transitionName.value = 'slide-left';
    currentIndex.value = (currentIndex.value + 1) % imageList.value.length;
};
const prevCard = () => {
    transitionName.value = 'slide-right';
    currentIndex.value = (currentIndex.value - 1 + imageList.value.length) % imageList.value.length;
};

let startX = 0;
const onTouchStart = (e) => startX = e.changedTouches[0].screenX;
const onTouchEnd = (e) => {
    const diff = startX - e.changedTouches[0].screenX;
    if (diff > 50) nextCard();
    else if (diff < -50) prevCard();
};

const toggleSelection = () => {
    if (isSuccess.value) return;
    const idx = currentIndex.value;
    if (selectedIndices.value.includes(idx)) {
        selectedIndices.value = selectedIndices.value.filter(i => i !== idx);
    } else {
        selectedIndices.value.push(idx);
    }
};

const checkSolution = () => {
    const actualAiIndices = imageList.value
        .map((img, idx) => img.type === 'ai' ? idx : -1)
        .filter(i => i !== -1);
    
    const selectedSorted = [...selectedIndices.value].sort();
    const aiSorted = [...actualAiIndices].sort();
    const correct = JSON.stringify(selectedSorted) === JSON.stringify(aiSorted);
    logActivity({
        levelId: props.levelId,
        taskType: 'grid_select',
        imageName: 'grid_batch',
        isCorrect: correct,
        interactionType: `SelectedIndices: ${selectedIndices.value.join(', ')}`
    });
    if (correct) {
        handleScoreAction(true, props.levelId);
        correctImages.value = imageList.value.filter(img => img.type === 'ai');
        isSuccess.value = true;
        errorMessage.value = '';
    } else {
        handleScoreAction(false, props.levelId);
        errorMessage.value = t('gridSelect.error');
    }
};

onMounted(() => {
    prepareImages();
    window.addEventListener('popstate', handlePopState);
});

onUnmounted(() => {
    window.removeEventListener('popstate', handlePopState);
});

watch(() => props.images, prepareImages, { deep: true });
</script>

<template>
    <div class="neo-card">
        <div class="neo-header">
            <h2 class="neo-title">{{ question }}</h2>
        </div>
        
        <!-- ÄNDERUNG: Übersetztes Loading -->
        <div v-if="loading" style="padding: 2rem; text-align:center;">{{ t('gridSelect.loading') }}</div>

        <div v-else>
            <div v-if="!isSuccess">
                <!-- ÄNDERUNG: Übersetztes Bild-Label -->
                <div class="stack-counter">{{ t('generic.image') }} {{ currentIndex + 1 }} / {{ imageList.length }}</div>
                
                <div class="stack-container" @touchstart="onTouchStart" @touchend="onTouchEnd">
                    <Transition :name="transitionName" mode="out-in">
                        <div :key="currentIndex" class="stack-card" 
                             :class="{ 'is-selected': selectedIndices.includes(currentIndex) }"
                             @click="openZoom(imageList[currentIndex].url)">
                            
                            <img :src="imageList[currentIndex].url" draggable="false" />
                            
                            <!-- ÄNDERUNG: Übersetztes Badge -->
                            <div v-if="selectedIndices.includes(currentIndex)" class="neo-badge top-right">{{ t('gridSelect.selectedBadge') }}</div>
                            <div class="zoom-hint">🔍</div>
                        </div>
                    </Transition>
                </div>

                <div class="stack-controls">
                    <button class="stack-nav-btn" @click="prevCard">←</button>
                    <button class="stack-nav-btn" @click="nextCard">→</button>
                </div>

                <!-- ÄNDERUNG: Übersetzte Toggle Buttons -->
                <div style="margin: 1.5rem 0;">
                    <button class="neo-btn-toggle" 
                            :class="{ 'active': selectedIndices.includes(currentIndex) }" 
                            @click="toggleSelection">
                        {{ selectedIndices.includes(currentIndex) ? t('gridSelect.deselect') : t('gridSelect.select') }}
                    </button>
                </div>

                <p v-if="errorMessage" class="text-fail" style="text-align:center; font-weight:900; text-transform:uppercase;">
                    {{ errorMessage }}
                </p>

                <button class="neo-btn" @click="checkSolution" :disabled="selectedIndices.length === 0">
                    {{ t('generic.verify') }}
                </button>
            </div>

            <div v-else class="neo-feedback">
                <!-- ÄNDERUNG: Übersetzter Erfolgstext -->
                <p class="text-success" style="font-size:1.2rem; font-weight:900;">{{ successText || t('gridSelect.successDefault') }}</p>
                
                <div class="neo-grid-2" style="margin: 1.5rem 0;">
                    <div v-for="img in correctImages" :key="img.url" class="neo-img-wrap" @click="openZoom(img.url)">
                        <img :src="img.url" />
                        <!-- ÄNDERUNG: KI Badge -->
                        <div class="neo-badge top-right" style="background:#00aa00">{{ t('gridSelect.aiBadge') }}</div>
                    </div>
                </div>

                <button class="neo-btn" @click="$emit('completed')">{{ t('generic.next') }}</button>
            </div>
        </div>

        <div v-if="zoomedImage" class="zoom-overlay" @click="closeZoom">
            <button class="zoom-close-btn" @click.stop="closeZoom">✕</button>
            <img :src="zoomedImage" class="zoom-content" />
        </div>
    </div>
</template>

<style scoped>
/* Nur minimale Anpassungen, der Rest kommt aus base.css */
.stack-card.is-selected { 
    border-color: var(--card-bg, #edc531) !important; 
    box-shadow: inset 0 0 0 4px #000, 5px 5px 0 rgba(0,0,0,0.2); 
}
.zoom-hint { position: absolute; bottom: 10px; right: 10px; background: rgba(255,255,255,0.8); padding: 5px; border: 2px solid #000; pointer-events: none; }
</style>    