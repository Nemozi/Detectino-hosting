<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js';

// Jetzt völlig flexibel für jedes Level!
const props = defineProps({
    imageLeft: String,      // Name des linken Bildes
    imageRight: String,     // Name des rechten Bildes
    correctOption: String,  // 'both', 'none', 'left', 'right'
    questionText: String
});

const emit = defineEmits(['completed']);
const { t } = useTranslation();

const imgLeftUrl = ref('');
const imgRightUrl = ref('');
const selectedOption = ref(null);
const resolved = ref(false);

const options = [
    { id: 'none', label: t('level1.step2.options.none') },
    { id: 'both', label: t('level1.step2.options.both') },
    { id: 'left', label: t('level1.step2.options.left') },
    { id: 'right', label: t('level1.step2.options.right') }
];

onMounted(() => {
    imgLeftUrl.value = supabase.storage.from('Fake-Images').getPublicUrl(props.imageLeft).data.publicUrl;
    imgRightUrl.value = supabase.storage.from('Fake-Images').getPublicUrl(props.imageRight).data.publicUrl;
});

const checkAnswer = () => {
    resolved.value = true;
};


const finish = () => {
    let result = { image71Correct: false, image21Correct: false };

    if (selectedOption.value === 'both') {
        result.image71Correct = true;
        result.image21Correct = true;
    } else if (selectedOption.value === 'left') {
        result.image71Correct = true; // 71 erkannt
        result.image21Correct = false; // 21 verpasst
    } else if (selectedOption.value === 'right') {
        result.image71Correct = false; // 71 verpasst
        result.image21Correct = true; // 21 erkannt
    }


    emit('completed', result);
};
</script>

<template>
    <div class="neo-card">
        <h2 class="neo-title">{{ questionText || t('level1.step2.question') }}</h2>
        
        <!-- Bilder Grid -->
        <div class="compare-grid">
            <div class="img-wrap"><img :src="imgLeftUrl" /></div>
            <div class="img-wrap"><img :src="imgRightUrl" /></div>
        </div>

        <!-- Optionen -->
        <div class="options-list">
            <label v-for="opt in options" :key="opt.id" class="option-btn" :class="{ 'selected': selectedOption === opt.id }">
                <input type="radio" :value="opt.id" v-model="selectedOption" :disabled="resolved">
                {{ opt.label }}
            </label>
        </div>

        <button v-if="!resolved" class="neo-btn" @click="checkAnswer" :disabled="!selectedOption">
            {{ t('generic.verify') }}
        </button>
        
        <div v-if="resolved" class="feedback">
            <p v-if="selectedOption === props.correctOption" class="success">
                {{ t('level1.step2.feedback.success') }}
            </p>
            <p v-else class="fail">
                {{ t('level1.step2.feedback.fail') }}
            </p>
            <button class="neo-btn" @click="finish">{{ t('generic.next') }}</button>
        </div>
    </div>
</template>

<style scoped>

.compare-grid { display: grid; gap: 1rem; grid-template-columns: 1fr; }
@media(min-width: 600px) { .compare-grid { grid-template-columns: 1fr 1fr; } }
.img-wrap img { width: 100%; aspect-ratio: 1; object-fit: cover; border: 2px solid #000; }
.options-list { display: flex; flex-direction: column; gap: 0.5rem; margin-top: 1rem;}
.option-btn { border: 2px solid #000; padding: 1rem; background: #fff; cursor: pointer; }
.option-btn.selected { background: #000; color: #fff; }
</style>