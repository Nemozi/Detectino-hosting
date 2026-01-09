<script setup>
import { computed } from 'vue';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js'; // HINZUGEFÜGT

const { t } = useTranslation(); // HINZUGEFÜGT
const props = defineProps(['image', 'title', 'text', 'buttonText']);
const emit = defineEmits(['next']);

const imageUrls = computed(() => {
    if (!props.image) return [];
    const list = Array.isArray(props.image) ? props.image : [props.image];
    
    return list.map(item => {
        if (!item) return null;
        let src = '';
        let bucket = 'Fake-Images';

        if (typeof item === 'string') {
            src = item;
        } else {
            src = item.src;
            if (item.bucket) bucket = item.bucket;
        }

        if (src.startsWith('http') || src.startsWith('blob:')) {
            return src;
        }

        const { data } = supabase.storage.from(bucket).getPublicUrl(src);
        return data.publicUrl;

    }).filter(url => url !== null);
});
</script>

<template>
    <div class="neo-card">
        <h2 class="neo-title">{{ title }}</h2>
        
        <div v-if="imageUrls.length > 0" class="images-container">
            <!-- ÄNDERUNG: Text in t() -->
            <img v-for="(url, idx) in imageUrls" :key="idx" :src="url" :alt="t('analysis.altText')" />
        </div>

        <div class="text-content">
            <p>{{ text }}</p>
        </div>
        <!-- ÄNDERUNG: Fallback-Text in t() -->
        <button class="neo-btn" @click="$emit('next')">{{ buttonText || t('generic.next') }}</button>
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