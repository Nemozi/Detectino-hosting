import { ref } from 'vue';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js'; // NEU: Import für Übersetzungen

// Globaler State
const totalScore = ref(0);
const scoreFeedback = ref(null);
const currentStreak = ref(0); 
const streakFeedback = ref(null); 
const completedLevelIds = ref([]); 

export function useGameState() {
    const { t } = useTranslation(); 

const initGameState = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
        // 1. Profil nur LADEN, niemals erstellen
        const { data: profile } = await supabase
            .from('spielerprofile')
            .select('global_score')
            .eq('user_id', user.id)
            .maybeSingle(); 
        
        if (profile) {
            totalScore.value = profile.global_score ?? 0;
        } else {
            totalScore.value = 0;
        }

        const { data: levels } = await supabase
            .from('level_fortschritt')
            .select('level_id')
            .eq('user_id', user.id);
            
        if (levels) {
            completedLevelIds.value = levels.map(l => Number(l.level_id));
        }
    } else {
        totalScore.value = 0;
        completedLevelIds.value = [];
    }
};

    const markLevelAsCompleted = (id) => {
        const numId = Number(id);
        if (!completedLevelIds.value.includes(numId)) {
            completedLevelIds.value.push(numId);
        }
    };

    const handleScoreAction = async (isCorrect, levelId) => {
        const numericLevelId = Number(levelId);

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;


        const { data: progress } = await supabase
            .from('level_fortschritt')
            .select('id')
            .eq('user_id', user.id)
            .eq('level_id', numericLevelId)
            .maybeSingle();

        const isReplay = !!progress; 

        let pointsChange = 0;
        const basePoints = 5; 

        if (isCorrect) {
            currentStreak.value++;

            if (currentStreak.value >= 3) {
                triggerStreakFeedback(currentStreak.value);
            }

            if (isReplay) {
                triggerFeedback(t('generic.correct'), 'neutral');
            } else {
                pointsChange = basePoints; 
                triggerFeedback(`+${pointsChange}`, 'positive');
            }
        } else {
            currentStreak.value = 0;

            if (isReplay) {
                triggerFeedback(t('generic.wrong'), 'neutral');
            } else {
                pointsChange = -5; 
                triggerFeedback(`${pointsChange}`, 'negative');
            }
        }

        // 3. Globalen Score nur ändern, wenn es KEIN Replay ist
        if (!isReplay && pointsChange !== 0) {
            totalScore.value += pointsChange;

            try {
                await supabase
                    .from('spielerprofile')
                    .update({ global_score: totalScore.value })
                    .eq('user_id', user.id);
            } catch (e) {
                console.error("Fehler beim Speichern des globalen Scores:", e);
            }
        }
    };

    const triggerFeedback = (text, type) => {
        scoreFeedback.value = { text, type, id: Date.now() };
        setTimeout(() => {
            if (scoreFeedback.value && Date.now() - scoreFeedback.value.id >= 1400) {
                scoreFeedback.value = null;
            }
        }, 1500);
    };

    const triggerStreakFeedback = (count) => {
        streakFeedback.value = { count, id: Date.now() };
        setTimeout(() => {
            if (streakFeedback.value && Date.now() - streakFeedback.value.id >= 1900) {
                streakFeedback.value = null;
            }
        }, 2000);
    };
      const logActivity = async ({ levelId, taskType, imageName, isCorrect, interactionType, stepId = null }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase.from('spiel_aktivitaeten').insert({
        user_id: user.id,
        level_id: levelId,
        step_id: stepId,
        task_type: taskType,
        image_name: imageName,
        is_correct: isCorrect,
        interaction_type: String(interactionType)
      });

      if (error) console.error("Logging Error:", error);
    } catch (e) {
      console.error("Fehler beim Logging:", e);
    }
  };
    return {
        totalScore,
        scoreFeedback,
        currentStreak,
        streakFeedback,
        markLevelAsCompleted,
        initGameState, 
        logActivity,
        handleScoreAction
    };
}