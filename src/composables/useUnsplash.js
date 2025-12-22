import { ref } from 'vue';

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export function useUnsplash() {
    const error = ref(null);
    const loading = ref(false);

    // Funktion um X zufällige Bilder zu holen
    // query: z.B. 'portrait', 'face', 'people'
    const fetchRandomRealImages = async (count = 1, query = 'human face') => {
        loading.value = true;
        error.value = null;
        
        try {
            // Wir holen quadratische Bilder (squarish), das passt besser zu deinem Layout
            const response = await fetch(
                `https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&count=${count}&query=${query}&orientation=squarish`
            );

            if (!response.ok) throw new Error('Unsplash Limit erreicht oder Fehler');

            const data = await response.json();
            
            // Unsplash API gibt manchmal ein Objekt (bei count=1) oder Array zurück
            const results = Array.isArray(data) ? data : [data];

            // Wir mappen das auf dein Format + Credits (WICHTIG bei Unsplash!)
            return results.map(img => ({
                src: img.urls.regular, // oder img.urls.small für Performance
                type: 'real',
                bucket: 'Unsplash', // Markierung damit wir wissen, woher es kommt
                status: 'neutral',
                // Unsplash verlangt Attribution
                credit: {
                    name: img.user.name,
                    link: img.user.links.html,
                    downloadLocation: img.links.download_location // Für Statistik-Ping (Pflicht)
                }
            }));

        } catch (err) {
            console.error("Unsplash Fehler:", err);
            error.value = err.message;
            return []; // Leeres Array zurückgeben, damit Fallback greift
        } finally {
            loading.value = false;
        }
    };

    // Unsplash verlangt, dass wir einen Ping senden, wenn ein Bild "benutzt" (heruntergeladen) wird
    const triggerDownloadPing = async (downloadLocation) => {
        if (!downloadLocation) return;
        try {
            await fetch(`${downloadLocation}&client_id=${ACCESS_KEY}`);
        } catch (e) {
            // Fehler hier können wir ignorieren
        }
    };

    return { fetchRandomRealImages, triggerDownloadPing, loading, error };
}