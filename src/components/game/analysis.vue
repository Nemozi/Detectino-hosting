<script setup>
import { computed } from 'vue';
import { supabase } from '@/lib/supabaseClient.js';

// image kann sein: 
// 1. undefined/null (Nur Text)
// 2. String: 'Bild.jpg'
// 3. Array: ['A.jpg', {src: 'B.jpg'}]
const props = defineProps(['image', 'title', 'text', 'buttonText']);
const emit = defineEmits(['next']);

const imageUrls = computed(() => {
    // 1. Sicherheits-Check: Wenn gar kein Bild da ist, leeres Array zurückgeben
    if (!props.image) return [];

    // 2. In Array umwandeln
    const list = Array.isArray(props.image) ? props.image : [props.image];
    
    return list.map(item => {
        // 3. Sicherheits-Check: Ist das Item im Array gültig?
        if (!item) return null;

        let filename, bucket;

        if (typeof item === 'string') {
            filename = item;
            bucket = 'Fake-Images'; 
        } else {
            // Wenn item ein Objekt ist, prüfen wir, ob src existiert
            if (!item.src) return null;
            filename = item.src;
            bucket = item.bucket || 'Fake-Images';
        }

        const { data } = supabase.storage.from(bucket).getPublicUrl(filename);
        return data.publicUrl;
    }).filter(url => url !== null); // 4. Ungültige/Leere Ergebnisse entfernen
});
</script>

<template>
    <div class="neo-card">
        <h2 class="neo-title">{{ title }}</h2>
        
        <!-- Bilder nur anzeigen, wenn welche da sind -->
        <div v-if="imageUrls.length > 0" class="images-container">
            <img v-for="url in imageUrls" :key="url" :src="url" alt="Analyse Bild" />
        </div>

        <div class="text-content">
            <p>{{ text }}</p>
        </div>
        <button class="neo-btn" @click="$emit('next')">{{ buttonText || 'Weiter' }}</button>
    </div>
</template>

<style scoped>
.images-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1.5rem 0;
    align-items: center;
}

@media (min-width: 600px) {
    .images-container {
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
    }
}

img {
    width: 100%;
    height: auto;
    max-height: 350px;
    border: 2px solid #000;
    object-fit: contain;
}

@media (min-width: 600px) {
    img {
        width: auto;
        max-width: 45%;
    }
}

.text-content p {
    font-size: 1rem;
    line-height: 1.6;
    font-weight: 500;
    color: #333;
}
</style>