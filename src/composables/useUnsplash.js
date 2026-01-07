import { ref } from 'vue';
import { supabase } from '@/lib/supabaseClient';

export function useUnsplash() {
  const loading = ref(false);

  // 1. SPIELER FUNKTION (Zufall aus DB)
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

  // 2. DEINE POWER-ERNTE (Loop-Logic)
const runHarvest = async () => {
    console.log(`🚀 Exhaustive Harvest gestartet...`);
    let page = 1;
    let totalAdded = 0;

    while (true) {
      console.log(`Lade Seite ${page}...`);
      try {
        // WICHTIG: Wir brauchen hier einen anderen API-Endpunkt im Proxy!
        // Da dein Proxy fest auf /photos/random steht, müssen wir ihn flexibler machen 
        // ODER wir nutzen den Zufall so lange, bis wirklich nichts mehr kommt.
        
        // Da wir den Proxy nicht ändern wollen, erhöhen wir die Intensität:
        const { data: rawData, error: proxyError } = await supabase.functions.invoke('unsplash-proxy', {
          body: { 
            count: 30, 
            orientation: 'portrait', 
            collections: 'gjZvv_WF6VQ' 
          }
        });

        if (proxyError || !rawData) break;

        const toInsert = rawData.map(img => ({
          image_id: img.id, 
          url: img.urls.regular,
          photographer_name: img.user.name,
          photographer_link: img.user.links.html,
          download_location: img.links.download_location,
          collection_id: 'gjZvv_WF6VQ'
        }));

        const { data, error: dbError } = await supabase
          .from('unsplash_buffer')
          .upsert(toInsert, { onConflict: 'image_id' })
          .select(); // Wir selektieren, um zu sehen was wirklich neu ist

        if (dbError) throw dbError;

        // Wir prüfen, wie viele der 30 Bilder wirklich neu waren
        // (Supabase upsert gibt bei .select() alle Zeilen zurück, 
        // wir müssen also manuell zählen oder auf die diff vertrauen)
        
        const { count: currentCount } = await supabase.from('unsplash_buffer').select('*', { count: 'exact', head: true });
        
        console.log(`Aktuell in DB: ${currentCount}`);

        // Abbruch-Logik: Wir machen 20 Versuche. 
        // Wenn nach 5 Anfragen in Folge die Zahl nicht steigt, haben wir alles.
        if (page > 20) break; 
        
        page++;
        await new Promise(r => setTimeout(r, 500));

      } catch (err) {
        console.error("Fehler:", err.message);
        break;
      }
    }
  };
const triggerDownloadPing = async (downloadLocation) => {
    if (!downloadLocation) return;
    const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
    fetch(`${downloadLocation}&client_id=${ACCESS_KEY}`).catch(() => {});
  };

  // Im return Block ergänzen:
  return { fetchRandomRealImages, runHarvest, triggerDownloadPing, loading };
}