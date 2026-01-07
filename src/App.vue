<script setup>
import Navbar from './components/navbar.vue'
import { supabase } from '@/lib/supabaseClient.js'
import { useUnsplash } from '@/composables/useUnsplash'

const { runHarvest } = useUnsplash()

// 1. Massenernte bleibt erhalten
window.harvest = runHarvest

// 2. Spezial-Ernte für ein einzelnes Bild (ID: B61OZ1NgAUY)
window.saveSpecificImage = async () => {
  console.log("Speichere Marktplatz-Bild (B61OZ1NgAUY)...");
  
  const imageData = {
    image_id: 'B61OZ1NgAUY',
    // Dies ist die verifizierte Direkt-URL für das Bild B61OZ1NgAUY
    url: 'https://images.unsplash.com/photo-1558285516-7a873891823a?auto=format&fit=crop&w=1080&q=80',
    photographer_name: 'Sven Brandsma',
    photographer_link: 'https://unsplash.com/@svenbrandsma',
    download_location: 'https://api.unsplash.com/photos/B61OZ1NgAUY/download',
    collection_id: 'gjZvv_WF6VQ'
  };

  const { error } = await supabase
    .from('unsplash_buffer')
    .upsert([imageData], { onConflict: 'image_id' });

  if (error) console.error("Fehler:", error.message);
  else console.log("✅ Erfolg! Bild B61OZ1NgAUY ist jetzt in deiner DB gespeichert.");
};
</script>

<template>
  <navbar></navbar>
  <router-view></router-view> 
</template>