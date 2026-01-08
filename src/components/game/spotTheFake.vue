<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js';
import { useUnsplash } from '@/composables/useUnsplash.js';
import { useGameState } from '@/composables/useGameState.js'; 

const props = defineProps({
    aiImage: [String, Object], 
    realImages: Array, // Spezifische Bilder von der Level-Seite
    realCount: { type: Number, default: 3 }, 
    topic: { type: String, default: 'portrait' }, 
    collectionId: { type: String, default: null }, 
    questionText: String,   
    successText: String,
    timeLimit: { type: Number, default: 20 },
    levelId: { type: Number, default: 1 } 
});

const emit = defineEmits(['completed', 'mistake']);
const { t } = useTranslation(); 
const { fetchRandomRealImages, triggerDownloadPing } = useUnsplash();
const { handleScoreAction } = useGameState(); 

const images = ref([]);
const currentIndex = ref(0);
const selectedIndex = ref(null);
const resolved = ref(false);
const message = ref('');
const loading = ref(true);
const activeCredits = ref([]); 
const zoomedImage = ref(null);
const transitionName = ref('');

const timeLeft = ref(props.timeLimit);
const timerInterval = ref(null);
const isTimeout = ref(false);

const startTimer = () => {
    stopTimer(); 
    timeLeft.value = props.timeLimit;
    isTimeout.value = false;
    timerInterval.value = setInterval(() => {
        if (timeLeft.value > 0) timeLeft.value--;
        else handleTimeout();
    }, 1000);
};

const stopTimer = () => { if (timerInterval.value) clearInterval(timerInterval.value); };

const handleTimeout = () => {
    stopTimer();
    isTimeout.value = true;
    handleScoreAction(false, props.levelId);
    message.value = "Zeit abgelaufen!";
};

onUnmounted(() => stopTimer());

const buildImages = async () => {
    if (!props.aiImage) return;
    loading.value = true;
    activeCredits.value = [];
    selectedIndex.value = null;
    resolved.value = false;
    currentIndex.value = 0;
    stopTimer(); 

    // 1. AI Image Pfad auflösen
    let aiSrc = typeof props.aiImage === 'string' ? props.aiImage : props.aiImage.src;
    let aiBucket = typeof props.aiImage === 'object' ? (props.aiImage.bucket || 'Fake-Images') : 'Fake-Images';
    const { data: aiData } = supabase.storage.from(aiBucket).getPublicUrl(aiSrc);
    const aiObj = { src: aiData.publicUrl, type: 'ai', bucket: aiBucket, status: 'neutral', name: aiSrc };

    // 2. Real Images verarbeiten
    let realObjs = [];

    // Fall A: Spezifische Bilder wurden übergeben
    if (props.realImages && props.realImages.length > 0) {
         realObjs = props.realImages.map(img => {
            let src = typeof img === 'string' ? img : img.src;
            let credit = typeof img === 'object' ? img.credit : null;
            // Bestimme den Bucket (Standard 'Real-Images' oder aus dem Objekt)
            let bName = (typeof img === 'object' && img.bucket) ? img.bucket : 'Real-Images';
            
            if (src.startsWith('http')) {
                return { src, type: 'real', bucket: 'Unsplash', status: 'neutral', credit };
            }
            const { data } = supabase.storage.from(bName).getPublicUrl(src);
            return { src: data.publicUrl, type: 'real', bucket: bName, status: 'neutral', name: src };
        });
    } 
    // Fall B (Standard): Lade zufällige Unsplash-Bilder aus deiner Datenbank
    else {
        realObjs = await fetchRandomRealImages(props.realCount);
    }
    
    images.value = [aiObj, ...realObjs].sort(() => 0.5 - Math.random());
    loading.value = false;
    startTimer();
};

onMounted(buildImages);
watch(() => props.aiImage, buildImages); 

const nextCard = () => { transitionName.value = 'slide-left'; currentIndex.value = (currentIndex.value + 1) % images.value.length; };
const prevCard = () => { transitionName.value = 'slide-right'; currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length; };

const selectCurrentCard = () => {
    if (resolved.value) return;
    selectedIndex.value = (selectedIndex.value === currentIndex.value) ? null : currentIndex.value;
};

const submitAnswer = async () => {
    if (selectedIndex.value === null) return;
    stopTimer(); 
    const selectedImg = images.value[selectedIndex.value];

    // Wissenschaftliches Logging
    await supabase.from('spiel_aktivitaeten').insert({
        level_id: props.levelId,
        image_name: selectedImg.name || 'unsplash_img',
        is_correct: selectedImg.type === 'ai'
    });

    if (selectedImg.type === 'real') {
        selectedImg.status = 'wrong';
        handleScoreAction(false, props.levelId);
        emit('mistake');
        selectedIndex.value = null;
    } 
    else if (selectedImg.type === 'ai') {
        selectedImg.status = 'correct';
        resolved.value = true;
        handleScoreAction(true, props.levelId);
        
        const successMsg = t('generic.correct');
        message.value = props.successText || (successMsg === 'generic.correct' ? 'Richtig erkannt!' : successMsg);
        
        // Credits sammeln
        activeCredits.value = [];
        images.value.forEach(item => {
            if (item.bucket === 'Unsplash' && item.credit) {
                triggerDownloadPing(item.credit.downloadLocation);
                if (!activeCredits.value.find(c => c.name === item.credit.name)) activeCredits.value.push(item.credit);
            }
        });
    }
};

const openZoom = (url) => { zoomedImage.value = url; history.pushState({modal:true}, ''); };
const closeZoom = () => { if(zoomedImage.value) history.back(); };
</script>

<template>
    <div class="neo-card relative-container" :class="{ 'shake-anim': isTimeout }">
        
        <div class="neo-header">
            <h2 class="neo-title">{{ questionText }}</h2>
            <div class="neo-pill" :class="{ 'critical': timeLeft <= 5 }">⏳ {{ timeLeft }}s</div>
        </div>
        
        <div v-if="loading" style="padding: 3rem; text-align:center;">Lade Bilder...</div>

        <div v-else>
            <div style="text-align: center; margin-bottom: 1rem;">
                <span class="neo-pill white">Bild {{ currentIndex + 1 }} / {{ images.length }}</span>
            </div>
            
            <div class="stack-container">
                <Transition :name="transitionName" mode="out-in">
                    <div :key="currentIndex" class="stack-card" 
                         :class="{ 'is-selected': selectedIndex === currentIndex, 'is-wrong': images[currentIndex].status === 'wrong', 'is-correct': images[currentIndex].status === 'correct' }"
                         @click="openZoom(images[currentIndex].src)">
                        <img :src="images[currentIndex].src" draggable="false" />
                        <div v-if="selectedIndex === currentIndex" class="neo-badge top-right">GEWÄHLT</div>
                        <div v-if="images[currentIndex].status === 'wrong'" class="neo-badge center wrong">ECHT</div>
                        <div v-if="images[currentIndex].status === 'correct'" class="neo-badge center correct">KI</div>
                    </div>
                </Transition>
            </div>

            <div class="controls-area">
                <div class="nav-row">
                    <button class="stack-nav-btn" @click="prevCard">←</button>
                    <button class="stack-nav-btn" @click="nextCard">→</button>
                </div>
                
                <button v-if="!resolved" 
                        class="neo-btn-toggle" 
                        :class="{ 'active': selectedIndex === currentIndex }" 
                        @click="selectCurrentCard">
                    {{ selectedIndex === currentIndex ? 'Abwählen' : 'Dieses Bild wählen' }}
                </button>
            </div>

            <button v-if="!resolved" class="neo-btn" style="margin-top:1rem;" :disabled="selectedIndex === null" @click="submitAnswer">
                Prüfen
            </button>

            <div v-if="resolved" class="neo-feedback">
                <p>{{ message }}</p>
                
                <div v-if="activeCredits.length > 0" class="neo-info-box">
                    <small>Fotos von <span v-for="(author, idx) in activeCredits" :key="author.name">
                        <a :href="author.link + '?utm_source=Detectino&utm_medium=referral'" target="_blank">{{ author.name }}</a>
                        <span v-if="idx < activeCredits.length - 1">, </span>
                    </span> auf Unsplash</small>
                </div>

                <button class="neo-btn" @click="$emit('completed')">Weiter</button>
            </div>
        </div>

        <div v-if="zoomedImage" class="zoom-overlay" @click="closeZoom">
            <button class="zoom-close-btn">✕</button>
            <img :src="zoomedImage" class="zoom-content" @click.stop />
        </div>
    </div>
</template>

<style scoped>
.relative-container { position: relative; width: 100%; }
.controls-area { margin: 1.5rem 0; display: flex; flex-direction: column; gap: 1.2rem; }
.nav-row { display: flex; justify-content: center; gap: 3rem; margin-bottom: 0.5rem; }
.stack-card { position: absolute; width: calc(100% - 20px); height: calc(100% - 20px); left: 10px; top: 10px; box-sizing: border-box; display: flex; justify-content: center; align-items: center; background: #000; border: 4px solid #000; transition: transform 0.1s; }
.stack-card img { width: 100%; height: 100%; object-fit: cover; pointer-events: none; }
.stack-card.is-selected { border-color: var(--card-bg, #edc531) !important; box-shadow: inset 0 0 0 4px #000, 5px 5px 0 rgba(0,0,0,0.2); }
.stack-card.is-wrong { border-color: #ff3333 !important; }
.stack-card.is-correct { border-color: #00aa00 !important; }
@keyframes pulse { 50% { transform: scale(1.1); } }
</style>