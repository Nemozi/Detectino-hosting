import { ref } from 'vue';
import de from '@/locales/de.js';
import en from '@/locales/en.js';
import es from '@/locales/es.js';
import fr from '@/locales/fr.js';
import gr from '@/locales/gr.js';
import rs from '@/locales/rs.js';
import zh from '@/locales/zh.js';
import it from '@/locales/it.js';

// Die Variable muss AUSSERHALB der Funktion stehen
const locale = ref('de'); 
const messages = { de, en, es, fr, gr, rs, zh, it };

export function useTranslation() {
    
    // Die Übersetzungsfunktion
    const t = (path) => {
        const keys = path.split('.');
        // Nutze hier die Variable 'locale', die oben definiert wurde
        let val = messages[locale.value]; 
        
        for (const key of keys) {
            if (val && val[key]) {
                val = val[key];
            } else {
                return path; // Fallback
            }
        }
        return val;
    };

    const setLocale = (newLocale) => {
        if (messages[newLocale]) {
            locale.value = newLocale;
            localStorage.setItem('user-locale', newLocale);
        }
    };

    const detectLanguage = () => {
        const saved = localStorage.getItem('user-locale');
        if (saved && messages[saved]) {
            locale.value = saved;
            return;
        }
        // Browser-Sprache erkennen (z.B. "en-US" -> "en")
        const browserLang = navigator.language.split('-')[0];
        if (messages[browserLang]) {
            locale.value = browserLang;
        } else {
            locale.value = 'de'; // Standard-Fallback
        }
    };

    return { 
        t, 
        locale, // Jetzt wird die korrekte Ref exportiert
        setLocale, 
        detectLanguage 
    };
}