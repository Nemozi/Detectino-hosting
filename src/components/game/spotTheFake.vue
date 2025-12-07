<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js';

const props = defineProps({
    aiImage: [String, Object], // Kann jetzt String oder Objekt sein!
    realImages: Array,
    questionText: String,   
    successText: String     
});

const emit = defineEmits(['completed', 'mistake']);
const { t } = useTranslation(); 

const images = ref([]);
const resolved = ref(false);
const message = ref('');
const loading = ref(true);

onMounted(() => {
    // Flexibles Handling für AI Image Bucket
    let aiFilename = '';
    let aiBucket = 'Fake-Images'; // Standard

    if (typeof props.aiImage === 'string') {
        aiFilename = props.aiImage;
    } else {
        aiFilename = props.aiImage.src;
        aiBucket = props.aiImage.bucket || 'Fake-Images';
    }

    const aiObj = { src: aiFilename, type: 'ai', bucket: aiBucket, status: 'neutral' };
    
    const realList = props.realImages || [];
    const realObjs = realList.map(img => ({ 
        src: img, 
        type: 'real', 
        bucket: 'Real-Images', 
        status: 'neutral' 
    }));
    
    const combined = [aiObj, ...realObjs].sort(() => 0.5 - Math.random());
    
    images.value = combined.map(img => {
        const { data } = supabase.storage.from(img.bucket).getPublicUrl(img.src);
        return { ...img, url: data.publicUrl };
    });
    
    loading.value = false;
});

const selectImage = (img) => {
    if (resolved.value) return;
    
    if (img.type === 'real') {
        if (img.status === 'wrong') return;
        img.status = 'wrong';
        emit('mistake', img.src);
    } 
    else if (img.type === 'ai') {
        img.status = 'correct';
        resolved.value = true;
        message.value = props.successText || t('generic.correct');
    }
};
</script>

<template>
    <div class="neo-card">
        <h2 class="neo-title">{{ questionText || t('level1.step0.question') }}</h2>
        
        <div class="grid">
            <div 
                v-for="img in images" 
                :key="img.src"
                class="img-box"
                :class="{ 
                    'correct': img.status === 'correct',
                    'wrong': img.status === 'wrong',
                    'faded': resolved && img.status !== 'correct'
                }"
                @click="selectImage(img)"
            >
                <img :src="img.url" />
            </div>
        </div>

        <!-- JETZT GLOBAL GESTYLT -->
        <div v-if="resolved" class="neo-feedback">
            <p>{{ message }}</p>
            <button class="neo-btn" @click="$emit('completed', props.aiImage)">
                {{ t('generic.next') }}
            </button>
        </div>
    </div>
</template>

<style scoped>
/* Hier steht nur noch CSS, das wirklich spezifisch für DIESES Spiel ist */

/* Layout Grid */
.grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-top: 1rem;
}
@media (min-width: 600px) {
    .grid { grid-template-columns: 1fr 1fr; }
}

/* Bild Boxen */
.img-box {
    border: 2px solid #000;
    aspect-ratio: 1;
    cursor: pointer;
    background: #000;
    position: relative;
    -webkit-tap-highlight-color: transparent;
    transition: transform 0.1s;
}

@media (hover: hover) {
    .img-box:hover:not(.faded):not(.wrong):not(.correct) { transform: scale(1.02); }
}

.img-box img {
    width: 100%; height: 100%; object-fit: cover; display: block;
}

/* Status Markierungen (Spezifisch für dieses Spiel, daher lokal) */
.correct {
    border: 4px solid #fff;
    z-index: 2;
    transform: scale(1.02);
    box-shadow: 0 4px 15px rgba(0,0,0,0.5);
}
.correct::after {
    content: "KI"; position: absolute; top: 0; right: 0; background: #000; color: #fff; padding: 4px 8px; font-weight: bold; font-size: 0.8rem;
}

.wrong {
    border: 5px solid #ff3333;
    opacity: 0.9;
}
.wrong::after {
    content: "ECHT"; position: absolute; top: 0; right: 0; background: #ff3333; color: #fff; padding: 4px 8px; font-weight: bold; font-size: 0.8rem;
}

.faded { opacity: 0.3; pointer-events: none; }
</style>