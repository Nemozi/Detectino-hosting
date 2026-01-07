<script setup>
</script>

<template>
    <div class="content-wrapper">
        <div class="welcomeCard">
            <h1>Über Detectino</h1>
            <p>Dedectino ist ein Serios game welches dir das erkennen von Ki-generierten Bildern didaktisch beibringen soll. Entwickelt wurde das Spiel im Rahmen einer Bachelorarbeit von Nemo Ziener. Alle gesammelten Daten werden ausschliesslich anonym weiterverarbeitet.</p>
            <p>This app uses the Unsplash API but is not endorsed or certified by Unsplash</p>
            <router-link to="/" class="register-btn">
                Los gehts
            </router-link>
            
        </div>
    </div>
    
</template>

<style>
.welcomeCard {
    background-color: var(--card-bg);
    width: 100%;
    max-width: min(30rem, 80vw); 
    height: auto; 
    min-height: 250px; 
    padding: 2.5rem 3rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    display: flex; 
    flex-direction: column;
    gap: 1.5rem; 
    border: 1px solid #000000;
    box-shadow: 0.375rem 0.375rem 0 rgba(0,0,0,1);
    font-size: clamp(1.2rem, 3vw, 1.8rem);
}
.welcomeCard p {
    font-size: 1.5rem;
    line-height: 1.6;
    color: var(--text-primary);
}
.register-btn{
    background-color: black; 
    color: white;
    border: none;
    font-size: 1em;
    cursor: pointer;
    padding: 0.5em 1em;
    box-shadow: 1rem;
    text-align: center;
    text-decoration: none;
}
.register-btn:hover{
     background-color: white;
    transform: translate(0.125rem, 0.125rem);
    box-shadow: 0.25rem 0.25rem 0 rgba(0,0,0,.2);
    color: black;
}
@media (max-width: 600px) {
    
    .welcomeCard {
        padding: 1.5rem 1.5rem; 
        
        font-size: 1.4rem; 
    }

    .welcomeCard p {
        font-size: 1.2rem;
    }

    .welcomeCard h1 {
        font-size: 2rem; 
    }
}   
</style>