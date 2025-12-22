<script setup>
import { ref, onMounted, watch } from 'vue';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js';
import { useUnsplash } from '@/composables/useUnsplash.js'; // Deine Unsplash Logik

const props = defineProps({
    aiImage: [String, Object], 
    realImages: Array,          // Wenn leer -> Unsplash nutzen
    realCount: { type: Number, default: 3 }, // Anzahl für Unsplash
    topic: { type: String, default: 'portrait' }, // Suchbegriff für Unsplash
    questionText: String,   
    successText: String     
});

const emit = defineEmits(['completed', 'mistake']);
const { t } = useTranslation(); 
const { fetchRandomRealImages, triggerDownloadPing } = useUnsplash();

const images = ref([]);
const resolved = ref(false);
const message = ref('');
const loading = ref(true);
const activeCredits = ref([]); // Speichert Credits für Unsplash Bilder

const buildImages = async () => {
    if (!props.aiImage) return;
    loading.value = true;
    activeCredits.value = []; // Reset credits

    // 1. KI-Bild normalisieren (Supabase)
    let aiSrc = '';
    let aiBucket = 'Fake-Images';

    if (typeof props.aiImage === 'string') {
        aiSrc = props.aiImage;
    } else {
        aiSrc = props.aiImage.src;
        aiBucket = props.aiImage.bucket || 'Fake-Images';
    }

    // URL generieren für das KI Bild
    const { data: aiData } = supabase.storage.from(aiBucket).getPublicUrl(aiSrc);
    
    const aiObj = { 
        src: aiData.publicUrl, // Wir arbeiten ab jetzt nur noch mit fertigen URLs
        type: 'ai', 
        bucket: aiBucket, 
        status: 'neutral' 
    };

    let realObjs = [];

    // 2. Echte Bilder holen
    // FALL A: Spezifische Bilder wurden übergeben (z.B. Level 1-5)
    if (props.realImages && props.realImages.length > 0) {
        const rawRealImages = props.realImages.map(img => {
            if (typeof img === 'string') {
                return { src: img, bucket: 'Real-Images' };
            }
            return { src: img.src, bucket: img.bucket || 'Real-Images' };
        });

        // URLs generieren
        realObjs = rawRealImages.map(img => {
            const { data } = supabase.storage.from(img.bucket).getPublicUrl(img.src);
            return { 
                src: data.publicUrl, 
                type: 'real', 
                bucket: img.bucket, 
                status: 'neutral' 
            };
        });
    } 
    // FALL B: Keine Bilder übergeben -> Unsplash nutzen
    else {
        realObjs = await fetchRandomRealImages(props.realCount, props.topic);
        // Falls Unsplash fehlschlägt (leeres Array), könnte man hier Fallbacks laden
    }
    
    // 3. Mischen
    const combined = [aiObj, ...realObjs].sort(() => 0.5 - Math.random());
    images.value = combined;
    
    loading.value = false;
};

// Initial laden
onMounted(buildImages);

// Reagieren, falls sich die Props ändern
watch(() => props.realImages, buildImages, { deep: true });
watch(() => props.aiImage, buildImages);

const selectImage = (img) => {
    if (resolved.value) return;
    
    if (img.type === 'real') {
        if (img.status === 'wrong') return;
        img.status = 'wrong';
        emit('mistake', 'real_image_clicked');
    } 
    else if (img.type === 'ai') {
        img.status = 'correct';
        resolved.value = true;
        message.value = props.successText; // Text aus Props

        // Unsplash Statistik Ping senden (Pflicht!)
        images.value.forEach(item => {
            if (item.bucket === 'Unsplash' && item.credit) {
                triggerDownloadPing(item.credit.downloadLocation);
                activeCredits.value.push(item.credit);
            }
        });
    }
};
</script>

<template>
    <div class="neo-card">
        <h2 class="neo-title">{{ questionText }}</h2>
        
        <div v-if="loading" style="text-align: center; padding: 2rem;">
            <!-- Kleiner Lade-Indikator -->
            ...
        </div>

        <div v-else class="grid">
            <div 
                v-for="(img, idx) in images" 
                :key="idx"
                class="img-box"
                :class="{ 
                    'correct': img.status === 'correct',
                    'wrong': img.status === 'wrong',
                    'faded': resolved && img.status !== 'correct'
                }"
                @click="selectImage(img)"
            >
                <img :src="img.src" />
            </div>
        </div>

        <div v-if="resolved" class="neo-feedback">
            <p>{{ message }}</p>
            
            <!-- UNSPLASH CREDITS (Nur sichtbar wenn Unsplash genutzt wurde) -->
            <div v-if="activeCredits.length > 0" class="credits">
                <small>Fotos von Unsplash:</small>
                <div v-for="credit in activeCredits" :key="credit.link">
                    <a :href="credit.link + '?utm_source=YOUR_APP_NAME&utm_medium=referral'" target="_blank">
                        {{ credit.name }}
                    </a>
                </div>
            </div>

            <button class="neo-btn" @click="$emit('completed', props.aiImage)">
                {{ t('generic.next') }}
            </button>
        </div>
    </div>
</template>

<style scoped>
.grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-top: 1rem;
}

@media (min-width: 600px) {
    .grid { grid-template-columns: 1fr 1fr; }
}

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

/* Status Styles */
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

/* Credits Style für Unsplash */
.credits {
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px dashed #000;
    font-size: 0.75rem;
    color: #555;
}
.credits a { color: #000; text-decoration: underline; }
</style>