import { ref, computed } from 'vue';
import de from '@/locales/de.js';
import en from '@/locales/de.js'; // Du müsstest die en.js analog zu de.js erstellen

const currentLang = ref('de');
const messages = { de, en };

export function useTranslation() {
  
  // Automatische Erkennung beim Start
  const detectLanguage = () => {
    const browserLang = navigator.language.split('-')[0]; // 'de-DE' -> 'de'
    if (messages[browserLang]) {
      currentLang.value = browserLang;
    } else {
      currentLang.value = 'en'; // Fallback
    }
  };

  // Die t-Funktion holt den Text (z.B. t('level1.step0.question'))
  const t = (path) => {
    const keys = path.split('.');
    let result = messages[currentLang.value];
    for (const key of keys) {
      if (result && result[key]) {
        result = result[key];
      } else {
        return path; // Fallback falls Key fehlt
      }
    }
    return result;
  };

  return { t, currentLang, detectLanguage };
}