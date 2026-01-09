<script setup>
import { ref, computed, onMounted } from 'vue';
import { supabase } from '@/lib/supabaseClient.js';
import { useTranslation } from '@/composables/useTranslation.js';
import { useUnsplash } from '@/composables/useUnsplash.js';
import { useGameState } from '@/composables/useGameState.js';

const props = defineProps({
    accounts: Array,
    levelId: Number
});

const emit = defineEmits(['completed', 'mistake']);
const { t } = useTranslation();
const { triggerDownloadPing } = useUnsplash();
const { handleScoreAction } = useGameState();

const currentView = ref('feed'); 
const activeProfileId = ref(null);
const selectedAccountIds = ref([]);
const resolved = ref(false);
const isSuccess = ref(false);
const zoomedImage = ref(null);
const activeCredits = ref([]);
const userId = ref(null);

onMounted(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) userId.value = user.id;
});

const getImgUrl = (obj) => {
    if (!obj) return '';
    return typeof obj === 'string' ? obj : obj.src;
};

const feedPosts = computed(() => {
    let allPosts = [];
    if (!props.accounts) return [];
    props.accounts.forEach(acc => {
        acc.posts.slice(0, 2).forEach(postObj => {
            allPosts.push({ ...acc, postImage: postObj });
        });
    });
    return allPosts.sort(() => 0.5 - Math.random());
});

const activeProfile = computed(() => props.accounts.find(a => a.id === activeProfileId.value));

const checkResult = async () => {
    const fakeIds = props.accounts.filter(a => a.isFake).map(a => a.id).sort();
    const userIds = [...selectedAccountIds.value].sort();
    const correct = JSON.stringify(fakeIds) === JSON.stringify(userIds);
    
    isSuccess.value = correct;
    resolved.value = true;

    // 1. Scoring (Global Game State)
    handleScoreAction(correct, props.levelId);

    // 2. Logging an DB
    if (userId.value) {
        await supabase.from('spiel_aktivitaeten').insert({
            user_id: userId.value,
            level_id: props.levelId,
            task_type: 'social_feed_check',
            is_correct: correct,
            image_name: 'social_feed_total',
            interaction_type: `Marked: ${userIds.join(', ')}`
        });
    }

    // 3. Credits & Pings
    const creditsMap = new Map();
    props.accounts.forEach(acc => {
        acc.posts.forEach(item => {
            if (item && item.credit) {
                creditsMap.set(item.credit.name, item.credit);
                triggerDownloadPing(item.credit.downloadLocation);
            }
        });
    });
    activeCredits.value = Array.from(creditsMap.values());
    
    if (!correct) emit('mistake');
};
</script>

<template>
    <div class="feed-wrapper">
        <div class="neo-card phone-container">
            <div class="phone-frame">
                <!-- HEADER -->
                <div class="app-header">
                    <button v-if="currentView === 'profile'" @click="currentView = 'feed'" class="nav-btn">←</button>
                    <div v-else style="width: 24px;"></div> 
                    <span class="app-name">InstaFake</span>
                    <div style="width: 24px;"></div> 
                </div>

                <!-- VIEW: FEED -->
                <div v-show="currentView === 'feed'" class="scroll-area">
                    <div class="feed-end feed-instructions"><p>{{ t('level8.feed.instruction') }}</p></div>
                    <div v-for="(post, idx) in feedPosts" :key="idx" class="post">
                        <div class="post-header" @click="activeProfileId = post.id; currentView = 'profile'">
                            <div class="avatar-circle-small" :style="{ background: post.avatarColor }"></div>
                            <span class="username">{{ post.name }}</span>
                            <span v-if="post.hasAds" class="ad-tag">{{ t('level8.feed.ad') }}</span>
                        </div>
                        <div class="image-square" @click="zoomedImage = getImgUrl(post.postImage)">
                            <img :src="getImgUrl(post.postImage)" />
                        </div>
                        <div class="post-actions"><span>❤️</span> <span>💬</span></div>
                        <div class="post-caption">
                            <strong>{{ post.name }}</strong> <span class="caption-text">{{ post.bio.substring(0, 30) }}...</span>
                        </div>
                    </div>
                    <div class="feed-end feed-instructions"><p>{{ t('level8.feed.instruction') }}</p></div>
                </div>

                <!-- VIEW: PROFILE -->
                <div v-if="currentView === 'profile' && activeProfile" class="scroll-area">
                    <div class="profile-header">
                        <div class="avatar-circle-large" :style="{ background: activeProfile.avatarColor }"></div>
                        <div class="stats">
                            <div class="stat-box"><strong>{{ activeProfile.posts.length }}</strong><small>Posts</small></div>
                            <div class="stat-box"><strong>{{ activeProfile.followers }}</strong><small>Follower</small></div>
                        </div>
                    </div>
                    <div class="bio-section">
                        <h3>{{ activeProfile.name }}</h3>
                        <p>{{ activeProfile.bio }}</p>
                        <div class="profile-meta-clues">
                            <span>📅 {{ t('level8.feed.joined') }} {{ activeProfile.joined }}</span>
                            <span v-if="activeProfile.hasAds" class="ad-warning">💎 {{ t('level8.feed.business') }}</span>
                        </div>
                    </div>
                    <button class="mark-btn" :class="{ 'is-selected': selectedAccountIds.includes(activeProfile.id) }" @click="!resolved && (selectedAccountIds.includes(activeProfile.id) ? selectedAccountIds = selectedAccountIds.filter(x => x !== activeProfile.id) : selectedAccountIds.push(activeProfile.id))">
                        {{ selectedAccountIds.includes(activeProfile.id) ? t('level8.feed.marked') : t('level8.feed.report') }}
                    </button>
                </div>

                <!-- ZOOM -->
                <div v-if="zoomedImage" class="zoom-overlay" @click="zoomedImage = null">
                    <div class="zoom-content"><img :src="zoomedImage" /></div>
                </div>
            </div>

            <div class="game-footer">
                <button v-if="!resolved" class="neo-btn" @click="checkResult" :disabled="selectedAccountIds.length === 0">
                    {{ t('generic.verify') }} ({{ selectedAccountIds.length }})
                </button>
                <div v-if="resolved" class="neo-feedback">
                    <p :class="isSuccess ? 'text-success' : 'text-fail'">
                        {{ isSuccess ? t('level8.feed.success') : t('level8.feed.fail') }}
                    </p>
                    <button class="neo-btn" @click="$emit('completed')">{{ t('generic.next') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.feed-wrapper { display: flex; justify-content: center; width: 100%; margin: 1rem 0; }
.phone-container { width: 100%; max-width: 400px; padding: 0; overflow: hidden; background: #fff; border: 3px solid #000; }
.phone-frame { height: 550px; display: flex; flex-direction: column; position: relative; background: #fafafa; }

.app-header { height: 50px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; padding: 0 15px; background: #fff; }
.app-name { font-family: 'Brush Script MT', cursive; font-size: 1.5rem; }
.nav-btn { background: none; border: none; font-size: 1.5rem; cursor: pointer; }

.scroll-area { flex: 1; overflow-y: auto; scrollbar-width: none; }
.scroll-area::-webkit-scrollbar { display: none; }

/* FARB AVATARE */
.avatar-circle-small { width: 32px; height: 32px; border-radius: 50%; border: 2px solid #000; flex-shrink: 0; }
.avatar-circle-large { width: 75px; height: 75px; border-radius: 50%; border: 3px solid #000; flex-shrink: 0; }

.post { border-bottom: 1px solid #eee; margin-bottom: 15px; background: #fff; }
.post-header { padding: 10px; display: flex; align-items: center; gap: 10px; cursor: pointer; }
.username { font-weight: 800; font-size: 0.9rem; }
.ad-tag { margin-left: auto; font-size: 0.6rem; background: #edc531; border: 1px solid #000; padding: 2px 4px; font-weight: bold; }

.image-square { width: 100%; aspect-ratio: 1; background: #eee; }
.image-square img { width: 100%; height: 100%; object-fit: cover; }
.post-actions { padding: 10px; font-size: 1.2rem; display: flex; gap: 15px; }
.post-caption { padding: 0 10px 15px; font-size: 0.85rem; }

.profile-header { padding: 20px 15px; display: flex; align-items: center; gap: 20px; }
.stats { display: flex; flex: 1; justify-content: space-around; text-align: center; }
.stat-box { display: flex; flex-direction: column; font-size: 0.8rem; }
.bio-section { padding: 0 15px 15px; }
.profile-meta-clues { margin-top: 10px; display: flex; flex-direction: column; gap: 4px; font-size: 0.75rem; font-weight: bold; color: #666; }
.ad-warning { color: #ff4757; }

.mark-btn { width: 90%; margin: 0 auto 15px; display: block; padding: 10px; border: 2px solid #000; background: #fff; font-weight: 900; cursor: pointer; text-transform: uppercase; }
.mark-btn.is-selected { background: #ff4444; color: #fff; }

.profile-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; }
.grid-item img { width: 100%; aspect-ratio: 1; object-fit: cover; }

.zoom-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.9); z-index: 100; display: flex; align-items: center; justify-content: center; }
.zoom-content img { max-width: 90%; border: 2px solid #fff; }
.game-footer { padding: 1rem; border-top: 3px solid #000; background: #fff; }
.unsplash-credits { margin: 10px 0; padding: 8px; background: #f9f9f9; border: 1px solid #000; text-align: left; }
.feed-end { margin: 10px ; font-size: 0.85rem; color: #fd0000; }

</style>