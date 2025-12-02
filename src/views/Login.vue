<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/lib/supabaseClient.js'; 

const router = useRouter();
const email = ref('');
const password = ref('');
const loading = ref(false);
const errorMessage = ref('');

const handleLogin = async () => {
    loading.value = true;
    errorMessage.value = '';

    try {
        const { error } = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value,
        });

        if (error) throw error;

        // Erfolgreich eingeloggt -> Weiterleitung zur Erklärung
        router.push('/explain'); 

    } catch (error) {
        // Einfache Fehlerbehandlung
        if (error.message.includes('Invalid login credentials')) {
            errorMessage.value = 'Falsche E-Mail oder Passwort.';
        } else {
            errorMessage.value = error.message;
        }
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="content-wrapper">
        <div class="login-card">
            <h1>Login</h1>
            
            <form @submit.prevent="handleLogin" class="form-container">
                
                <!-- Fehlermeldung -->
                <div v-if="errorMessage" class="error-box">
                    {{ errorMessage }}
                </div>

                <div class="form-group">
                    <label for="email">E-Mail Adresse:</label>
                    <input 
                        type="email" 
                        id="email" 
                        class="brutal-input"
                        v-model="email" 
                        placeholder="name@beispiel.de"
                        required
                    />
                </div>

                <div class="form-group">
                    <label for="password">Passwort:</label>
                    <input 
                        type="password" 
                        id="password" 
                        class="brutal-input"
                        v-model="password" 
                        placeholder="******"
                        required
                    />
                </div>
                
                <button type="submit" class="primary-btn" :disabled="loading">
                    {{ loading ? 'Laden...' : 'Einloggen' }}
                </button>

                <!-- Link zur Registrierung -->
                <div class="footer-link">
                    Noch kein Konto? 
                    <router-link to="/">Hier registrieren</router-link>
                </div>
            </form> 
        </div>
    </div>
</template>

<style scoped>
/* Identisches Styling wie bei RegisterCard */

.content-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 2rem 1rem;
}

.login-card {
    background: var(--card-bg, #edc531);
    border: var(--border, 0.0625rem solid #1a1a1a);
    box-shadow: 0.375rem 0.375rem 0 rgba(0,0,0,1);
    padding: 2.5rem;
    width: 100%;
    max-width: 30rem; /* Etwas schmaler als das Register-Form */
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

h1 {
    font-size: clamp(1.5rem, 4vw, 2rem);
    font-weight: 800;
    margin: 0;
    text-transform: uppercase;
    text-align: center;
    border-bottom: 3px solid #000;
    padding-bottom: 1rem;
}

.error-box {
    background: #ffcccc;
    border: 2px solid #ff0000;
    color: #990000;
    padding: 0.8rem;
    font-weight: bold;
    font-size: 0.9rem;
    text-align: center;
}

label {
    display: block;
    font-size: 0.9rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 0.6rem;
    color: #000;
}

.form-group {
    margin-bottom: 1.5rem;
}

.brutal-input {
    width: 100%;
    box-sizing: border-box;
    padding: 1rem;
    border: 2px solid #000;
    border-radius: 0;
    font-family: inherit;
    font-size: 1rem;
    background: #fff;
    color: #000;
    transition: all 0.2s;
}

.brutal-input:focus {
    outline: none;
    background: #f0f0f0;
    box-shadow: 4px 4px 0 rgba(0,0,0,0.2);
}

.primary-btn {
    width: 100%;
    padding: 1.125rem;
    background: #000;
    color: #fff;
    border: none;
    font-size: 1.1rem;
    text-transform: uppercase;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.1s, box-shadow 0.1s;
    margin-top: 0.5rem;
}

.primary-btn:hover:not(:disabled) {
    background: #222;
    transform: translate(-2px, -2px);
    box-shadow: 4px 4px 0 rgba(0,0,0,0.2);
}

.primary-btn:active {
    transform: translate(0, 0);
    box-shadow: none;
}

.primary-btn:disabled {
    background: #555;
    cursor: not-allowed;
}

.footer-link {
    margin-top: 1.5rem;
    text-align: center;
    font-size: 0.9rem;
    font-weight: 600;
}

.footer-link a {
    color: #000;
    text-decoration: underline;
    text-decoration-thickness: 2px;
}

.footer-link a:hover {
    background: #000;
    color: #fff;
    text-decoration: none;
}
</style>