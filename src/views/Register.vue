    
<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; 
import { supabase } from '@/lib/supabaseClient.js'; 

const router = useRouter();

onMounted(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        router.push('/levels');
    }
});

const loading = ref(false);
const errorMessage = ref('');

const formData = reactive({
    email: '',
    password: '',
    username: '',
    alter: null,
    geschlecht: '',
    internet_affinitaet: 5, 
    erkennung_skill: 5
});

const registerUser = async () => {
    loading.value = true;
    try {
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
        });

        if (authError) throw authError;
        
        if (authData.user) {
            // FALLBACK LOGIK:
            // Wenn username leer ist, nimm den Teil vor dem @ der Email
            const finalUsername = formData.username.trim() !== '' 
                ? formData.username 
                : formData.email.split('@')[0];

            const { error: dbError } = await supabase
                .from('spielerprofile')
                .insert({
                    user_id: authData.user.id,
                    username: finalUsername, // Hier speichern wir den Namen
                    alter: formData.alter,
                    geschlecht: formData.geschlecht,
                    internet_affinitaet: formData.internet_affinitaet,
                    erkennung_skill: formData.erkennung_skill
                });

            if (dbError) throw dbError;
            router.push('/explain'); 
        }
    } catch (error) {
        errorMessage.value = error.message;
    } finally {
        loading.value = false;
    }
};
</script>

  

<template>
    <div class="content-wrapper">
        <div class="register-card">
            <h1>Registrierung & Profil</h1>
            
            <form @submit.prevent="registerUser" class="form-container">
                
                
                <div v-if="errorMessage" class="error-box">
                    {{ errorMessage }}
                </div>

                
                <div class="section-divider">Account Daten</div>
    
 
                <div class="form-group">
                    <label for="username">Username (Optional):</label>
                    <input 
                        type="text" 
                        id="username" 
                        class="brutal-input"
                        v-model="formData.username" 
                        placeholder="Leer lassen für E-Mail-Prefix"
                    />
                </div>
                <div class="form-group">
                    <label for="email">E-Mail Adresse:</label>
                    <input 
                        type="email" 
                        id="email" 
                        class="brutal-input"
                        v-model="formData.email" 
                        placeholder="name@beispiel.de"
                    />
                </div>

                <div class="form-group">
                    <label for="password">Passwort:</label>
                    <input 
                        type="password" 
                        id="password" 
                        class="brutal-input"
                        v-model="formData.password" 
                        placeholder="******"
                        minlength="6"
                        required
                    />
                </div>

                <!-- PROFIL DATEN -->
                <div class="section-divider">Über Dich</div>

                <div class="form-group">
                    <label for="alter">Dein Alter:</label>
                    <input 
                        type="number" 
                        id="alter" 
                        class="brutal-input"
                        v-model.number="formData.alter" 
                        min="10" 
                        max="100"
                        placeholder="z.B. 25"
                        required
                    />
                </div>

                <div class="form-group">
                    <label>Dein Geschlecht:</label>
                    <div class="radio-group">
                        <label class="custom-radio">
                            <input type="radio" value="female" v-model="formData.geschlecht" required>
                            <span class="checkmark"></span>
                            Weiblich
                        </label>

                        <label class="custom-radio">
                            <input type="radio" value="male" v-model="formData.geschlecht">
                            <span class="checkmark"></span>
                            Männlich
                        </label>

                        <label class="custom-radio">
                            <input type="radio" value="divers" v-model="formData.geschlecht">
                            <span class="checkmark"></span>
                            Divers/Andere
                        </label>
                    </div>
                </div>

                <div class="form-group slider-group">
                    <div class="label-wrapper">
                        <label for="internet_affinitaet">Internet-Affinität</label>
                        <span class="value-badge">{{ formData.internet_affinitaet }} / 10</span>
                    </div>
                    <input 
                        type="range" 
                        id="internet_affinitaet" 
                        v-model.number="formData.internet_affinitaet" 
                        min="0" 
                        max="10" 
                        step="1"
                    />
                    <div class="slider-labels">
                        <span>1 (Niedrig)</span>
                        <span>10 (Hoch)</span>
                    </div>
                </div>

                <div class="form-group slider-group">
                    <div class="label-wrapper">
                        <label for="erkennung_skill">KI-Bilder erkennen</label>
                        <span class="value-badge">{{ formData.erkennung_skill }} / 10</span>
                    </div>
                    <input 
                        type="range" 
                        id="erkennung_skill" 
                        v-model.number="formData.erkennung_skill" 
                        min="0" 
                        max="10" 
                        step="1"
                    />
                     <div class="slider-labels">
                        <span>0 (Schlecht)</span>
                        <span>10 (Perfekt)</span>
                    </div>
                </div>
                
                <button type="submit" class="primary-btn" :disabled="loading">
                    {{ loading ? 'Lädt...' : 'Registrieren & Starten' }}
                </button>
            </form> 
        </div>
    </div>
</template>

<style scoped>
/* Globale Variablen werden genutzt: --card-bg, --text-main, etc. */

.register-card {
    background: var(--card-bg, #edc531); 
    border: var(--border, 0.0625rem solid #1a1a1a);
    box-shadow: 0.375rem 0.375rem 0 rgba(0,0,0,1);
    padding: 2.5rem;
    width: 100%;
    max-width: 40rem;
    margin: 0 auto;
    display: flex; 
    flex-direction: column;
    gap: 1.5rem; 
}

h1 {
    font-size: clamp(1.2rem, 3vw, 1.5rem);
    font-weight: 700;
    margin: 0;
    text-transform: uppercase;
    text-align: center;
    border-bottom: 2px solid #000;
    padding-bottom: 1rem;
}

.section-divider {
    font-size: 0.8rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border-bottom: 1px dashed #000;
    margin: 1.5rem 0 1rem 0;
    padding-bottom: 0.2rem;
    color: #444;
}

.error-box {
    background: #ffcccc;
    border: 1px solid #ff0000;
    color: #990000;
    padding: 0.8rem;
    font-weight: bold;
    font-size: 0.9rem;
    border-radius: 0;
}

label {
    display: block;
    font-size: 0.9rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 0.6rem;
    color: var(--text-main, #000);
}

.form-group { margin-bottom: 1.5rem; }


.brutal-input {
    width: 100%;
    box-sizing: border-box;
    padding: 0.8rem 1rem;
    border: 0.0625rem solid #000;
    border-radius: 0;
    font-size: 1rem;
    background: #f9f9f9;
    color: #000;
    transition: all 0.2s;
}

.brutal-input:focus {
    outline: none;
    background: #fff;
    border: 0.125rem solid #000;
}

.radio-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.custom-radio {
    display: flex;
    align-items: center;
    position: relative;
    gap: 0.75rem;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    user-select: none;
}

.custom-radio input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

.checkmark {
    position: relative;
    flex-shrink: 0;
    height: 1.5rem;
    width: 1.5rem;
    background-color: #fff;
    border: 0.125rem solid var(--text-main, #000);
    border-radius: 0;
    transition: background-color 0.1s;
}

.custom-radio:hover input ~ .checkmark { background-color: #eee; }
.custom-radio input:checked ~ .checkmark { background-color: var(--text-main, #000); }

.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

.custom-radio input:checked ~ .checkmark:after { display: block; }

.custom-radio .checkmark:after {
    left: 0.4375rem;
    top: 0.1875rem;
    width: 0.375rem;
    height: 0.75rem;
    border: solid #fff;
    border-width: 0 0.1875rem 0.1875rem 0;
    transform: rotate(45deg);
}

/* --- Sliders (für chromium und firefox optimiert) --- */
.label-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.5rem;
}

.value-badge {
    font-weight: 700;
    font-size: 1rem;
    background: #000;
    color: var(--card-bg, #edc531);
    padding: 0.1rem 0.4rem;
    border-radius: 2px;
}

/* --- The Slider Input --- */
input[type=range] {
    -webkit-appearance: none;
    appearance: none; /* Standard */
    width: 100%;
    background: transparent;
    cursor: pointer;
    margin: 10px 0;
    height: 1.25rem; /* Set height to match thumb to prevent clipping in some browsers */
}

input[type=range]:focus {
    outline: none;
}

/* --- Track Styles (Chrome, Safari, Edge) --- */
input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 0.25rem;
    background: #000;
    border: none;
    border-radius: 0;
}

/* --- Track Styles (Firefox) --- */
input[type=range]::-moz-range-track {
    width: 100%;
    height: 0.25rem;
    background: #000;
    border: none;
    border-radius: 0;
}

/* --- Thumb Styles (Chrome, Safari, Edge) --- */
input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 1.25rem;
    width: 1.25rem;
    border-radius: 1rem;
    background: var(--card-bg, #edc531);
    border: 0.125rem solid #000;
    box-shadow: 1px 1px 0 rgba(0,0,0,0.5);
    cursor: pointer;
    /* Math: (track_height / 2) - (thumb_height / 2) */
    /* (0.125rem) - (0.625rem) = -0.5rem */
    margin-top: -0.5rem; 
}

/* --- Thumb Styles (Firefox) --- */
input[type=range]::-moz-range-thumb {
    height: 1.25rem;
    width: 1.25rem;
    border-radius: 1rem;
    background: var(--card-bg, #edc531);
    border: 0.125rem solid #000;
    box-shadow: 1px 1px 0 rgba(0,0,0,0.5);
    cursor: pointer;
    /* Firefox centers the thumb automatically, so NO margin-top needed here */
    box-sizing: border-box; /* Ensures border doesn't increase size */
}

/* --- Labels --- */
.slider-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    color: #444;
    margin-top: -4px;
}

@media (max-width: 600px) {
    .register-card { padding: 1.5rem 1rem; }
}
</style>