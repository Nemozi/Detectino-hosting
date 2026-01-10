<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; 
import { supabase } from '@/lib/supabaseClient.js'; 
import { useTranslation } from '@/composables/useTranslation.js'; // NEU

const router = useRouter();
const { t } = useTranslation(); // NEU

onMounted(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) router.push('/levels');
});

const loading = ref(false);
const errorMessage = ref('');

const formData = reactive({
    username: '',
    alter: null,
    geschlecht: '',
    internet_affinitaet: 5, 
    erkennung_skill: 5
});

const startAnonymously = async () => {
    loading.value = true;
    errorMessage.value = '';
    try {
        const { data: authData, error: authError } = await supabase.auth.signInAnonymously();
        if (authError) throw authError;
        
        if (authData.user) {
            const finalUsername = formData.username.trim() !== '' 
                ? formData.username 
                : `User_${authData.user.id.substring(0, 5)}`;

            const { error: dbError } = await supabase
                .from('spielerprofile')
                .insert({
                    user_id: authData.user.id,
                    username: finalUsername,
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
        <div class="neo-card registration-card">
            <h1 class="neo-title">{{ t('register.title') }}</h1>
            
            <form @submit.prevent="startAnonymously">
                <div v-if="errorMessage" class="error-box">{{ errorMessage }}</div>

                <div class="section-divider">{{ t('register.aliasSection') }}</div>
                <div class="form-group">
                    <label for="username">{{ t('register.usernameLabel') }}</label>
                    <input 
                        type="text" 
                        id="username" 
                        class="brutal-input" 
                        v-model="formData.username" 
                        :placeholder="t('register.usernamePlaceholder')" 
                    />
                </div>

                <div class="section-divider">{{ t('register.aboutSection') }}</div>
                <div class="form-group">
                    <label for="alter">{{ t('register.ageLabel') }}</label>
                    <input type="number" id="alter" class="brutal-input" v-model.number="formData.alter" min="10" max="100" required />
                </div>

                <div class="form-group">
                    <label>{{ t('register.genderLabel') }}</label>
                    <div class="radio-group">
                        <label class="custom-radio">
                            <input type="radio" value="female" v-model="formData.geschlecht" required>
                            <span class="checkmark"></span> 
                            {{ t('register.gender_options.female') }}
                        </label>
                        <label class="custom-radio">
                            <input type="radio" value="male" v-model="formData.geschlecht">
                            <span class="checkmark"></span> 
                            {{ t('register.gender_options.male') }}
                        </label>
                        <label class="custom-radio">
                            <input type="radio" value="divers" v-model="formData.geschlecht">
                            <span class="checkmark"></span> 
                            {{ t('register.gender_options.divers') }}
                        </label>
                    </div>
                </div>

                <!-- SLIDER BEREICH -->
                <div class="form-group slider-group">
                    <div class="label-wrapper">
                        <label>{{ t('register.affinityLabel') }}</label>
                        <span class="value-badge">{{ formData.internet_affinitaet }} / 10</span>
                    </div>
                    <input type="range" v-model.number="formData.internet_affinitaet" min="0" max="10" step="1" />
                    <div class="slider-labels">
                        <span>{{ t('register.affinityLow') }}</span>
                        <span>{{ t('register.affinityHigh') }}</span>
                    </div>
                </div>

                <div class="form-group slider-group">
                    <div class="label-wrapper">
                        <label>{{ t('register.skillLabel') }}</label>
                        <span class="value-badge">{{ formData.erkennung_skill }} / 10</span>
                    </div>
                    <input type="range" v-model.number="formData.erkennung_skill" min="0" max="10" step="1" />
                    <div class="slider-labels">
                        <span>{{ t('register.skillLow') }}</span>
                        <span>{{ t('register.skillHigh') }}</span>
                    </div>
                </div>
                
                <button type="submit" class="neo-btn" :disabled="loading" style="margin-top: 2rem;">
                    {{ loading ? t('register.loading') : t('register.submitButton') }}
                </button>
            </form> 
        </div>
    </div>
</template>

<style scoped>
/* Dein CSS bleibt unverändert */
.registration-card { max-width: 40rem; margin: 2rem auto; padding: 2.5rem !important; }
.section-divider { font-size: 0.8rem; font-weight: 800; text-transform: uppercase; border-bottom: 2px solid #000; margin: 3rem 0 1.5rem 0; padding-bottom: 0.3rem; }
.form-group { margin-bottom: 2rem; }
.brutal-input { width: 100%; box-sizing: border-box; padding: 0.8rem 1rem; border: 2px solid #000; background: #f9f9f9; }
.radio-group { display: flex; gap: 1.5rem; flex-wrap: wrap; margin-top: 0.5rem; }
.custom-radio { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; font-weight: 700; text-transform: uppercase; font-size: 0.85rem; }
.custom-radio input { position: absolute; opacity: 0; }
.checkmark { height: 1.5rem; width: 1.5rem; background-color: #fff; border: 2px solid #000; }
.custom-radio input:checked ~ .checkmark { background-color: #000; }
.slider-group { margin-top: 2.5rem; }
.label-wrapper { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem; }
.value-badge { font-weight: 700; background: #000; color: var(--card-bg); padding: 0.1rem 0.5rem; }
.slider-labels { display: flex; justify-content: space-between; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; color: #444; }
.error-box { background: #ffcccc; border: 2px solid #ff0000; color: #990000; padding: 1rem; font-weight: bold; margin-bottom: 1.5rem; }
</style>