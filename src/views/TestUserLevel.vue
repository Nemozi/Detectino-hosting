<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '@/lib/supabaseClient.js';
import { useRouter } from 'vue-router';

// KONFIGURATION
const TOTAL_ROUNDS = 10; 
const REAL_COUNT = 3; // Anzahl der echten Bilder pro Spiel
const AI_COUNT = TOTAL_ROUNDS - REAL_COUNT; // Rest sind KI-Bilder (7)

// 1. Pool: Deine schweren KI-Bilder
const AI_IMAGE_POOL = [
    'Image_0027.jpg', 'Image_0018.jpg', 'Image_0041.jpg', 'Image_0021.jpg', 'Image_0002.jpg',
    'Image_0024.jpg', 'Image_0005.jpg', 'Image_0081.jpg', 'Image_0003.jpg', 'Image_0100.jpg',
    'Image_0029.jpg', 'Image_0094.jpg', 'Image_0004.jpg', 'Image_0070.jpg', 'Image_0063.jpg',
    'Image_0097.jpg', 'Image_0084.jpg', 'Image_0074.jpg', 'Image_0001.jpg', 'Image_0089.jpg',
    'Image_0059.jpg', 'Image_0062.jpg', 'Image_0006.jpg', 'Image_0110.jpg', 'Image_0079.jpg',
    'Image_0050.jpg', 'Image_0019.jpg', 'Image_0035.jpg', 'Image_0008.jpg', 'Image_0020.jpg',
    'Image_0010.jpg', 'Image_0049.jpg', 'Image_0054.jpg', 'Image_0036.jpg', 'Image_0060.jpg',
    'Image_0013.jpg', 'Image_0033.jpg', 'Image_0028.jpg', 'Image_0057.jpg'
];

// 2. Pool: Echte Bilder (Image_0001.jpg bis Image_0024.jpg) generieren
const REAL_IMAGE_POOL = Array.from({ length: 24 }, (_, i) => {
    const num = String(i + 1).padStart(4, '0');
    return `Image_${num}.jpg`;
});

const router = useRouter();
const currentIndex = ref(0);
const score = ref(0);
const gameOver = ref(false);
const loading = ref(true);
const saving = ref(false);

// Game State
const currentImageUrl = ref('');
// Speichert Objekte: { filename: string, bucket: string, type: 'real' | 'ai' }
const gameImages = ref([]); 

// Hilfsfunktion zum Mischen eines Arrays (Fisher-Yates)
const shuffleArray = (array) => {
    return array.sort(() => 0.5 - Math.random());
};

const prepareGame = () => {
    // 1. Zufällige Auswahl der KI-Bilder
    const shuffledAI = shuffleArray([...AI_IMAGE_POOL]).slice(0, AI_COUNT);
    const aiObjects = shuffledAI.map(img => ({
        filename: img,
        bucket: 'Fake-Images',
        type: 'ai'
    }));

    // 2. Zufällige Auswahl der echten Bilder
    const shuffledReal = shuffleArray([...REAL_IMAGE_POOL]).slice(0, REAL_COUNT);
    const realObjects = shuffledReal.map(img => ({
        filename: img,
        bucket: 'Real-Images',
        type: 'real'
    }));

    // 3. Zusammenfügen und nochmal mischen, damit die Reihenfolge zufällig ist
    const combined = [...aiObjects, ...realObjects];
    gameImages.value = shuffleArray(combined);

    loadImage();
};

const loadImage = () => {
    loading.value = true;
    
    // Das aktuelle Bild-Objekt holen
    const currentImgObj = gameImages.value[currentIndex.value];
    
    // URL basierend auf dem RICHTIGEN Bucket generieren
    const { data } = supabase.storage
        .from(currentImgObj.bucket) // 'Fake-Images' oder 'Real-Images'
        .getPublicUrl(currentImgObj.filename);
        
    currentImageUrl.value = data.publicUrl;
    
    const img = new Image();
    img.src = data.publicUrl;
    img.onload = () => { loading.value = false; };
};

const handleGuess = (guess) => {
    if (loading.value || saving.value) return;

    // Das aktuelle Bild-Objekt holen um die richtige Antwort zu kennen
    const currentImgObj = gameImages.value[currentIndex.value];
    const correctAnswer = currentImgObj.type; // 'real' oder 'ai'
    
    if (guess === correctAnswer) {
        score.value++;
    }
    
    nextImage();
};

const nextImage = () => {
    if (currentIndex.value < TOTAL_ROUNDS - 1) {
        currentIndex.value++;
        loadImage();
    } else {
        finishGame();
    }
};

const finishGame = async () => {
    saving.value = true;
    try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
            // Skill Score speichern
            await supabase
                .from('spielerprofile')
                .update({ echter_skill_score: score.value })
                .eq('user_id', user.id);

            // Level 0 als erledigt markieren
            const { data: existing } = await supabase
                .from('level_fortschritt')
                .select('*')
                .eq('user_id', user.id)
                .eq('level_id', 1)
                .single();

            if (!existing) {
                await supabase.from('level_fortschritt').insert({
                    user_id: user.id,
                    level_id: 1, 
                    score: score.value
                });
            } else {
                if (score.value > existing.score) {
                    await supabase
                        .from('level_fortschritt')
                        .update({ score: score.value })
                        .eq('id', existing.id);
                }
            }
        }
    } catch (error) {
        console.error("Fehler beim Speichern:", error);
    } finally {
        saving.value = false;
        gameOver.value = true;
    }
};

const backToMap = () => {
    router.push('/levels');
};

onMounted(() => {
    prepareGame();
});
</script>

<template>
    <div class="content-wrapper">
        <div class="game-card">
            
            <!-- RESULTS VIEW -->
            <div v-if="gameOver" class="results-container">
                <h1>Dein Ergebnis</h1>
                <div class="score-display">
                    <span class="score-big">{{ score }}</span>
                    <span class="score-total">/ {{ TOTAL_ROUNDS }}</span>
                </div>
                
                <p v-if="score === TOTAL_ROUNDS">Perfekt! Du erkennst Realität und Fakes.</p>
                <p v-else-if="score >= TOTAL_ROUNDS / 2">Nicht schlecht, aber Vorsicht ist geboten.</p>
                <p v-else>Das war schwierig. Die Grenzen verschwimmen.</p>
                
                <button @click="backToMap" class="primary-btn">
                    Zur Übersicht
                </button>
            </div>

            <!-- GAME LOOP VIEW -->
            <div v-else class="game-loop">
                <div class="game-header">
                    <span class="progress-badge">Bild {{ currentIndex + 1 }} von {{ TOTAL_ROUNDS }}</span>
                </div>

                <div class="image-frame">
                    <div v-if="saving" class="loader">Werte aus...</div>
                    <div v-else-if="loading" class="loader">Lade nächstes Bild...</div>
                    
                    <img v-show="!loading && !saving" :src="currentImageUrl" alt="Rate mal" />
                </div>

                <div class="controls" :class="{ disabled: loading || saving }">
                    <!-- Hier wird 'real' oder 'ai' übergeben, was jetzt dynamisch geprüft wird -->
                    <button @click="handleGuess('real')" class="primary-btn real-btn">
                        Echtes Foto
                    </button>
                    <button @click="handleGuess('ai')" class="primary-btn ai-btn">
                        KI Generiert
                    </button>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
/* Unverändertes Styling */
.game-card {
    background: var(--card-bg, #edc531);
    border: 0.0625rem solid #1a1a1a;
    box-shadow: 0.375rem 0.375rem 0 rgba(0,0,0,1);
    padding: 2rem;
    width: 100%;
    max-width: 45rem;
    display: flex;
    flex-direction: column;
}

.game-header {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
    font-weight: 700;
    text-transform: uppercase;
}

.progress-badge {
    background: #000;
    color: #fff;
    padding: 0.25rem 0.5rem;
}

.image-frame {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    background: #000;
    border: 2px solid #000;
    margin-bottom: 1.5rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

.image-frame img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.loader {
    color: #fff;
    font-family: monospace;
    font-size: 1.2rem;
}

.controls {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}
.controls.disabled { pointer-events: none; opacity: 0.5; }

.choice-btn {
    padding: 1.5rem;
    border: 2px solid #000;
    font-size: 1.1rem;
    font-weight: 700;
    text-transform: uppercase;
    cursor: pointer;
    background: #fff;
    transition: transform 0.1s, box-shadow 0.1s;
}

.choice-btn:hover {
    transform: translate(-2px, -2px);
    box-shadow: 4px 4px 0 rgba(0,0,0,1);
}
.choice-btn:active { transform: translate(0,0); box-shadow: none; }

.real-btn { background: #00b091; }
.ai-btn { background: #c05749; }



.results-container { text-align: center; }
.score-display { margin: 2rem 0; }
.score-big { font-size: 5rem; font-weight: 900; display: block; line-height: 1; }
.score-total { font-size: 1.5rem; color: #444; font-weight: 700; }



@media (max-width: 600px) {
    .game-card { padding: 1rem; }
    .controls { grid-template-columns: 1fr; }
}
</style>