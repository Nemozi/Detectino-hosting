import { ref } from 'vue';
import { supabase } from '@/lib/supabaseClient.js';

// Globaler State
const totalScore = ref(0);
const scoreFeedback = ref(null);
const currentStreak = ref(0); // NEU: Zähler für die Serie
const streakFeedback = ref(null); // NEU: Für die Animation
const completedLevelIds = ref([]); 

export function useGameState() {

    const initGameState = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            let { data: profile } = await supabase
                .from('spielerprofile')
                .select('global_score')
                .eq('user_id', user.id)
                .maybeSingle(); 
            
            if (!profile) {
                await supabase.from('spielerprofile').insert({ 
                    user_id: user.id, global_score: 0, alter: 0, geschlecht: 'unknown',
                    internet_affinitaet: 0, erkennung_skill: 0
                });
                totalScore.value = 0;
            } else {
                totalScore.value = profile.global_score ?? 0;
            }

            const { data: levels } = await supabase.from('level_fortschritt').select('level_id').eq('user_id', user.id);
            if (levels) completedLevelIds.value = levels.map(l => l.level_id);
        }
    };
 const markLevelAsCompleted = (id) => {
        const numId = Number(id);
        if (!completedLevelIds.value.includes(numId)) {
            completedLevelIds.value.push(numId);
        }
    };
const handleScoreAction = async (isCorrect, levelId) => {
    // FIX: Wir zwingen levelId zu einer Zahl, um sicherzugehen
    const numericLevelId = Number(levelId);
    const isReplay = completedLevelIds.value.map(Number).includes(numericLevelId);

    let pointsChange = 0;
    const basePoints = 5; 

    if (isCorrect) {
        if (isReplay) {
            // Gelbe Animation, keine Punkte
            triggerFeedback(`Richtig!`, 'neutral');
        } else {
            // Grüne Animation + Punkte
            pointsChange = basePoints; 
            triggerFeedback(`+${pointsChange}`, 'positive');
        }
    } else {
        if (isReplay) {
            triggerFeedback(`Falsch`, 'neutral');
        } else {
            pointsChange = -5; 
            triggerFeedback(`${pointsChange}`, 'negative');
        }
    }

    // Nur Punkte speichern, wenn es KEIN Replay ist
    if (!isReplay && pointsChange !== 0) {
        totalScore.value += pointsChange;
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            await supabase
                .from('spielerprofile')
                .update({ global_score: totalScore.value })
                .eq('user_id', user.id);
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

    // NEU: Animation für die Serie
    const triggerStreakFeedback = (count) => {
        streakFeedback.value = { count, id: Date.now() };
        setTimeout(() => {
            if (streakFeedback.value && Date.now() - streakFeedback.value.id >= 1900) {
                streakFeedback.value = null;
            }
        }, 2000);
    };

    return {
        totalScore,
        scoreFeedback,
        currentStreak,
        streakFeedback, // In Navbar nutzen
        markLevelAsCompleted,
        initGameState, 
        handleScoreAction
    };
}