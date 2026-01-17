import { ref } from 'vue';
import { supabase } from '@/lib/supabaseClient';

export function useUnsplash() {
  const loading = ref(false);

  // 1. SPIELER FUNKTION (Zufall aus deiner DB)
  const fetchRandomRealImages = async (count = 10) => {
    try {
      const { data, error } = await supabase.rpc('get_random_unsplash', { n: count });
      if (error) throw error;
      return data.map(img => ({
        src: img.url,
        type: 'real',
        bucket: 'Unsplash',
        credit: {
          name: img.photographer_name,
          link: img.photographer_link,
          downloadLocation: img.download_location
        }
      }));
    } catch (err) {
      console.error("DB Fehler:", err.message);
      return [];
    }
  };

  // 2. POWER-ERNTE (Für dich in der Konsole)
  const runHarvest = async (maxRequests = 10) => {
    console.log(`🚀 Ernte gestartet...`);
    for (let i = 1; i <= maxRequests; i++) {
      try {
        const { data: rawData, error: proxyError } = await supabase.functions.invoke('unsplash-proxy', {
          body: { count: 30, orientation: 'portrait', collections: 'gjZvv_WF6VQ' }
        });
        if (proxyError) break;
        const toInsert = rawData.map(img => ({
            image_id: img.id, 
            url: img.urls.regular,
            photographer_name: img.user.name,
            photographer_link: img.user.links.html,
            download_location: img.links.download_location,
            collection_id: 'gjZvv_WF6VQ'
        }));
        await supabase.from('unsplash_buffer').upsert(toInsert, { onConflict: 'image_id' });
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (err) { break; }
    }
    console.log("🏁 Ernte beendet.");
  };

  // 3. DOWNLOAD-PING (Reaktiviert )
 const triggerDownloadPing = async (downloadLocation) => {
    if (!downloadLocation) return;
    
    try {
      await supabase.functions.invoke('unsplash-proxy', {
        body: { 
          action: 'track_download', 
          download_url: downloadLocation 
        }
      });
    } catch (err) {
      console.warn("Unsplash Tracking fehlgeschlagen:", err.message);
    }
  };

  return { fetchRandomRealImages, runHarvest, triggerDownloadPing, loading };
}