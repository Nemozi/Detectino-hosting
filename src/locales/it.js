export default {
    generic: {
        step: "Passo",
        next: "Avanti",
        verify: "Verifica",
        loading: "Caricamento contenuti...",
        finish: "Termina Livello",
        understood: "Capito",
        completeLevel: "Completa livello",
        backToMap: "Torna ai livelli",
        image: "Immagine",
        correct: "Corretto!",
        wrong: "Sbagliato",
        nextRound: "Round successivo"

    },
     navbar: {
        play: "Gioca",
        participate: "Partecipa",
        menu: "Menu",
        profile: "Il mio profilo",
        logout: "Esci",
        streakSuffix: "° STREAK!",
        info: "Info",
        leaderboard: "Classifica",
        stats: "Statistiche"
    },
    levels: {
        mainTitle: "Il tuo viaggio",
        loading: "Caricamento livelli...",
        level_1: "Quiz iniziale",
        level_2: "Sfondi",
        level_3: "Texture pelle",
        level_4: "Colori e saturazione",
        level_5: "Espressioni",
        level_6: "Errori immagine",
        level_7: "Quiz di tappa",
        level_8: "IA moderne",
        level_9: "La finale"
    },
    profile: {
        title: "Il tuo profilo",
        loading: "Caricamento...",
        loggedAs: "Connesso come",
        emailLabel: "E-mail",
        fallbackName: "Detective",
        stats: {
            age: "Età",
            internet: "Internet",
            skill: "Abilità"
        },
        actions: {
            viewStats: "Vedi statistiche",
            logout: "Esci"
        }
    },
    leaderboard: {
        title: "Top Detective",
        description: "I cacciatori di IA di maggior successo dello studio Detectino.",
        colRank: "#",
        colUser: "Utente",
        colPoints: "Punti",
        loading: "Ricerca dei migliori...",
        meBadge: "TU",
        footer: "I tuoi punti vengono aggiornati dopo ogni livello."
    },
    register: { // Mantengo l'errore "egister" come richiesto per coerenza con il codice
        title: "Partecipazione e Profilo",
        errorGeneric: "Si è verificato un errore. Per favore riprova.",
        aliasSection: "Il tuo Alias",
        usernameLabel: "Username (Opzionale)",
        usernamePlaceholder: "Il tuo alias",
        aboutSection: "Su di te",
        ageLabel: "La tua età",
        genderLabel: "Genere",
        genderOptions: {
            female: "Femmina",
            male: "Maschio",
            divers: "Altro / Divers"
        },
        affinityLabel: "Affinità con Internet",
        affinityLow: "Bassa",
        affinityHigh: "Alta",
        skillLabel: "Conoscenza IA pregressa",
        skillLow: "Scarsa",
        skillHigh: "Esperto",
        submitButton: "Inizia il gioco ora",
        loading: "Caricamento..."
    },
    welcome: {
        title: "Benvenuti su Detectino",
        intro: "Impara a riconoscere le immagini generate dall'IA e a difenderti dall'ondata di fake.",
        button: "Iniziamo"
    },
    explain: {
        title: "Come funziona",
        stepA: "Benvenuti su Detectino. Qui imparerai a riconoscere le immagini generate dall'IA e a testare le tue abilità.",
        stepB: "Nel prossimo passaggio ti verranno mostrati i livelli. Gioca per sbloccare altri contenuti come 'Reale o IA?'.",
        stepC: "Dai un'occhiata alla classifica e confrontati con gli altri. Nel menu troverai anche le statistiche di valutazione.",
        stepD: "Detectino è un progetto di ricerca. I tuoi dati vengono raccolti in modo anonimo. Trovi più info sotto 'Info'.",
        button: "Iniziamo"
    },
    info: {
        title: "Su Detectino",
        description: "Detectino è un Serious Game progettato per insegnarti didatticamente a riconoscere le immagini generate dall'IA. Il gioco è stato sviluppato da Nemo Ziener nell'ambito di una tesi di laurea. Tutti i dati raccolti vengono elaborati esclusivamente in forma anonima.",
        unsplashNote: "Questa app utilizza l'API di Unsplash ma non è supportata o certificata da Unsplash.",
        button: "Iniziamo"
    },
    dashboard: {
        header: {
            title: "DATI DI RICERCA",
            status: "DATI LIVE",
            subtitle: "ANALISI DELLE CAPACITÀ DI RICONOSCIMENTO DI IMMAGINI GENERATE MISURATE DA DETECTINO"
        },
        kpis: {
            participants: "PARTECIPANTI",
            decisions: "DECISIONI TOTALI",
            accuracy: "PRECISIONE GLOBALE",
            affinity: "AFFINITÀ MEDIA"
        },
        tech: {
            title: "GAP TECNOLOGICO",
            modern: "IA MODERNE (NANO)",
            diff: "DIFFERENZA",
            loss: "PERDITA DI PRECISIONE NEI MODELLI MODERNI"
        },
        correlation: {
            title: "CORRELAZIONE AUTOVALUTAZIONE",
            self: "PERCEZIONE DI SÉ (1-10)",
            reality: "REALTÀ (1-10)"
        },
        learning: {
            title: "CURVA DI APPRENDIMENTO",
            analysis: "ANALISI DEI CLIC",
            fallback: "SCORE FALLBACK"
        },
        demographics: {
            title: "DEMOGRAFIA",
            age: "DISTRIBUZIONE ETÀ",
            gender: "PERFORMANCE PER GENERE",
            yearsUnit: "anni"
        },
        funnel: {
            title: "RETENTION FUNNEL",
            users: "UTENTI",
            desc: "TASSO DI COMPLETAMENTO PER LIVELLO BASATO SUI PARTECIPANTI TOTALI"
        }
    },
  level0: {
        loading: "Caricamento quiz iniziale...",
        introTitle: "Il Quiz della Verità",
         questionText: "Quale immagine è generata?",
        introText: "Reale o generato? Metti alla prova il tuo istinto con 10 immagini singole. Questa è la prima misurazione delle tue capacità prima di iniziare l'addestramento.",
        startBtn: "Inizia Quiz",
        endTitle: "Valutazione completata",
        endText: "Hai terminato con successo il quiz iniziale. Il tuo punteggio è stato salvato e ora puoi iniziare l'addestramento sulla mappa.",
    },
    level1: {
        title: "Livello 2: Sfondi",
        loading: "Sincronizzazione immagini...",
        endTitle: "Livello completato!",
        endText: "Gli sfondi non sono più un segreto per te.",
        introTitle: "Il Quiz della Verità",
        introText: "Reale o generato? Metti alla prova il tuo istinto con 10 immagini singole. Questa è la prima misurazione delle tue capacità.",
        startBtn: "Inizia Quiz",
        endTitle: "Valutazione completata",
        endText: "Hai terminato il quiz iniziale. Il tuo punteggio è stato salvato.",
        step0: {
            question: "Quale immagine è generata?",
            success: "Corretto! Questa è l'immagine generata."
        },
        step1: {
            title: "Analisi: Scala, proporzioni e coerenza",
            text: "Qui vediamo un tipico esempio di sfondi incoerenti. L'uomo sembra reale, ma la scala del labirinto non corrisponde alla sua grandezza. Inoltre, l'area dietro il labirinto mostra improvvisamente una scala del paesaggio completamente diversa."
        },
        step2: {
            question: "Queste immagini sono generate?",
            options: {
                none: "Entrambe reali",
                both: "Entrambe generate",
                left: "N.1",
                right: "N.2"
            },
            feedback: {
                success: "Perfetto! Sono entrambe generate.",
                fail: "Entrambe sono generate. Nota lo sfondo distorto e la pelle del ragazzo. Per quanto riguarda l'uomo, gli occhiali sono molto appariscenti e troppo sfocati rispetto alla sua vicinanza al muro."
            }
        },
        step3: {
            title: "Analisi errori: Sfondo diviso",
            text: "C'eri quasi! Fai attenzione allo sfondo: l'oggetto al centro (la persona) lo divide quasi in due. A sinistra il bosco è totalmente sfocato, a destra la struttura appare completamente diversa. Un classico errore di generazione."
        },
        step4: {
            title: "Analisi errori: Texture",
            text: "Guarda attentamente il muro. È troppo sfocato per quanto l'uomo vi sia appoggiato vicino. Questa sfocatura non sembra un vero 'effetto bokeh' (profondità di campo) di una fotocamera, ma appare solo fangosa e confusa."
        },
        step5: {
            question: "In quale immagine lo sfondo indica una generazione?",
            success: "Giusto! L'uomo separa lo sfondo: a sinistra una capanna, a destra improvvisamente un bosco. Non sono coerenti."
        },
        step6: {
            title: "Cosa noti nello sfondo?",
            subtitle: "Seleziona tutti i termini corretti.",
            terms: {
                blurred: "Texture confuse",
                inconsistent: "Caratteristiche incoerenti",
                unrealistic: "Rappresentazione irrealistica",
                lighting: "Errori di luci e ombre"
            },
            feedback: "La soluzione è: Tutti i punti sono corretti! Questi tipi di errore spesso si sovrappongono."
        },
        step7: {
            title: "Conclusione livello",
            text: "Hai imparato a fare attenzione allo sfondo: cerca texture confuse, oggetti incoerenti tra sinistra/destra e ombre illogiche. Questi errori rivelano spesso la generazione, anche se il viso sembra perfetto."
        }
    },
    level2: {
        title: "Livello 3: Texture della pelle",
        loading: "Caricamento dettagli pelle...",
        endTitle: "Livello completato!",
        endText: "Hai dimostrato di avere occhio per i dettagli della pelle.",
        step0: {
            question: "Quale immagine è generata?",
            success: "Giusto!"
        },
        step1: {
            question: "Cosa indica maggiormente una generazione qui?",
            options: {
                skin: "Texture della pelle",
                nose: "Naso",
                eyes: "Occhi",
                hair: "Capelli"
            },
            feedback: "Esatto! Nelle immagini generate la pelle appare spesso troppo liscia o 'cerosa'.",
            fail: "Fai attenzione alla texture della pelle: troppo liscia o lucida appare spesso innaturale."
        },
        step2: {
            title: "Analisi: La pelle",
            text: "La pelle reale è opaca e porosa. I modelli IA spesso rappresentano la pelle in modo troppo liscio, eccessivamente lucido o con una uniformità innaturale. Questo è spesso un segnale d'allarme migliore rispetto agli errori evidenti."
        },
        step3: {
            question: "Quali immagini sembrano generate? (Selezione multipla)",
            success: "Molto bene! Riconosci il 'look plastico'.",
            fail: "Fai attenzione alla texture della pelle: troppo liscia o lucida appare spesso innaturale."
        },
        step4: {
            question: "Cosa noti in questa immagine?",
            subtitle: "Scegli tutte le caratteristiche applicabili.",
            terms: {
                smooth: "Pelle da statua di cera",
                wrinkles: "Rughe innaturali",
                eyes: "Colore degli occhi",
                tattoos: "Tatuaggi"
            },
            feedback: "Giusto. La pelle è troppo liscia per l'età e le rughe hanno un andamento innaturale. Gli occhi azzurri o i tatuaggi sul viso sono rari, ma non necessariamente un indicatore."
        },
        step5: {
            title: "Confronto: Rughe",
            text: "Immagine 1 (IA): Le rughe sembrano 'dipinte' o scompaiono in punti innaturali. A destra (Reale): Le rughe seguono la muscolatura e hanno profondità."
        },
        step6: {
            title: "Conclusione livello",
            text: "Hai imparato a osservare le texture della pelle. La 'pelle di cera' e le rughe innaturali sono forti indicatori di immagini IA."
        }
    },
    level3: {
        title: "Livello 4: Colori e Saturazione",
        loading: "Caricamento analisi colore...",
        endTitle: "Livello completato!",
        endText: "Ora hai occhio per la saturazione innaturale e i contrasti esagerati.",
        step0: {
            question: "Quale immagine è generata?",
            success: "Giusto! L'immagine a sinistra è generata."
        },
        step1: {
            question: "Perché questa immagine sembra finta?",
            options: {
                colors: "Colore e pelle",
                bg: "Orecchio",
                hat: "Copricapo",
                eyes: "Colore occhi"
            },
            feedback: "Giusto. Colori ipersaturi come questi sono un indizio, la pelle 'brilla' in modo innaturale."
        },
        step2: {
            question: "Quale affermazione è corretta?",
            options: {
                all: "Tutte le immagini generate sono ipersature",
                indicator: "L'ipersaturazione è un indicatore di generazione",
                none: "L'ipersaturazione non significa nulla"
            },
            feedback: "Esatto. Non tutte, ma molte immagini generate hanno problemi con colori troppo intensi, specialmente nei toni della pelle."
        },
        step3: {
            question: "Quale immagine ha un errore di colore?",
            success: "Corretto! Capelli turchesi in un bambino piccolo sono estremamente improbabili."
        },
        step4: {
            title: "Errore di contesto",
            text: "Spesso le immagini generate presentano errori di colore che si notano solo nel contesto. Un bambino con capelli turchesi perfettamente tinti è rarissimo nella realtà e quindi segno di generazione."
        },
        step5: {
            title: "Cosa noti qui?",
            subtitle: "Seleziona tutte le caratteristiche corrispondenti.",
            terms: {
                skin: "Pelle ipersatura",
                eyes: "Occhi irrealistici",
                makeup: "Errore di sfondo",
                smooth: "Pelle troppo morbida"
            },
            feedback: "Questa immagine è un esempio perfetto del look 'over-processed' delle immagini generate e dei colori alterati che non esistono così nella realtà."
        },
        step6: {
            title: "Analisi:",
            text: "A destra vedi una mappa. Lì le aree di errore sono marcate di nuovo: specialmente sul viso, i colori e le texture sono troppo perfetti e morbidi."
        },
        step7: {
            question: "Assegna gli errori!",
            terms: {
                hair: "Capelli irrealistici",
                sat: "Ipersaturazione",
                smooth: "Pelle di plastica"
            },
            success: "Assegnati perfettamente! Stai sviluppando un ottimo occhio per i dettagli.",
            fail: "Fai attenzione al colore dei capelli (rosso), alla pelle con troppo contrasto e al look morbido 'di plastica'."
        },
        step8: {
            title: "Conclusione livello",
            text: "I colori sono un forte indizio. Cerca la pelle 'luccicante', colori di capelli illogici nel contesto e il look generale 'filtro Instagram' che molti modelli IA creano di default."
        }
    },
    level4: {
        title: "Livello 5: Espressioni facciali",
        loading: "Preparazione analisi mimica...",
        endTitle: "Livello completato!",
        endText: "Ora riconosci anche i minimi errori nella mimica facciale.",
        step0: {
            question: "Cosa noti qui?",
            options: {
                pose: "Posa innaturale",
                nothing: "Niente di insolito",
                expression: "Anatomia e mimica innaturali",
                bg: "Sfondo sbagliato"
            },
            feedback: "Giusto. L'espressione, specialmente nella zona della bocca, appare distorta.",
            fail: "Fai attenzione alla mimica e alla posa: espressioni facciali e posture corporee innaturali sono spesso segno di IA."
        },
        step1: {
            title: "Analisi: Mimica e Lingua",
            text: "Un errore frequente dei modelli IA riguarda le espressioni facciali. In questo esempio, la lingua fuori unita alla postura è anatomicamente sospetta. Tali errori nella mimica sono un forte segnale d'allarme."
        },
        step2: {
            question: "Quale immagine è generata?",
            success: "Ben notato! L'immagine a sinistra mostra artefatti tipici.",
            fail: "Fai attenzione alla pelle, ai colori e alle caratteristiche del viso."
        },
        step3: {
            title: "Analisi: Dettagli",
            text: "Ancora un'espressione facciale insolita; inoltre fai attenzione ai capelli e ai riflessi di luce. La pelle appare troppo liscia (come imparato nel Livello 2). Anche le rughe sul viso e i motivi sui vestiti sono sospetti."
        },
        step4: {
            question: "Quale immagine è generata?",
            success: "Corretto! In generale, nota che i personaggi nelle immagini generate spesso guardano direttamente in camera.",
            fail: "Fai attenzione alla mimica: espressioni facciali innaturali o una persona agitata in un ritratto perfetto sono spesso segni che le immagini sono generate."
        },
        step5: {
            title: "Conclusione livello",
            text: "I volti sono complessi. Cerca sguardi vuoti, occhi asimmetrici, denti o lingue che si fondono ed emozioni che non corrispondono del tutto al resto del viso."
        }
    },
    level5: {
        title: "Livello 6: Riconoscere errori dell'immagine",
        searching: "Ricerca di tutti gli errori...",
        unlocked: "La soluzione è sbloccata!",
        verify: "Completato",
        check_question: "Hai trovato tutti gli errori marcati?",
        endTitle: "Livello completato!",
        options: { yes: "Sì, tutti trovati", no: "Non tutti" },
        disclaimer: "Le marcature si basano su sondaggi tra gli utenti di studi pilota e servono come orientamento. Non sono sempre perfette.",
        step0: {
            title: "Errori immagine e logica",
            text: "Un buon metodo per riconoscere le immagini generate è cercare errori fisici o logici. L'IA non 'capisce' il mondo, indovina solo i pixel. Questo porta spesso a errori impossibili nella realtà."
        },
        step1: {
            question: "Quale immagine è generata?",
            success: "Giusto! Questa immagine è il fake."
        },
        step2: {
            title: "Analisi: Dettagli",
            text: "Fai attenzione ai bottoni della giacca (irregolari), ai capelli (si fondono) e specialmente alla lampada sullo sfondo, che pende fisicamente in modo impossibile in primo piano."
        },
        search_task: "Trova gli errori! Ricordali e clicca su 'Soluzione'.",
        options: {
            yes: "Sì, tutti trovati",
            partly: "Alcuni",
            no: "No, mi sono sfuggiti"
        },
        feedback: "La pratica rende perfetti. Fai attenzione ai dettagli sullo sfondo e sui bordi.",
        img11: "Controlla lo sfondo e i vestiti.",
        img12: "Guarda attentamente le mani e l'ambiente.",
        img48: "C'è qualcosa che non va nell'architettura qui.",
        img67: "Cerca riflessi o ombre.",
        asymmetry: {
            title: "Errori di simmetria",
            text: "Un classico: occhiali, gioielli o vestiti sono spesso asimmetrici. Qui (Immagine 63), la montatura degli occhiali è completamente diversa a sinistra e a destra."
        },
        finish: {
            title: "Conclusione livello",
            text: "Ora hai occhio per i 'glitch'. Se qualcosa non ha senso fisico (lampade fluttuanti, mezzi occhiali), con alta probabilità è IA."
        },
        step_text: {
            question: "Riesci a trovare il testo illogico nell'immagine?",
            title: "Scrittura artificiale",
            text: "Ci hai fatto caso? Il testo sullo sfondo è illeggibile. Non è solo per la distanza, ma perché le IA spesso non riescono a generare una vera scrittura. Creano invece forme che sembrano solo lettere (il cosiddetto 'gibberish')."
        },
        step_fingers: {
            question: "Un'immagine ha problemi con l'anatomia delle mani. Quale?",
            title: "Troppe dita",
            text: "Le mani sono uno dei punti deboli principali delle IA. Spesso le dita si fondono tra loro, o l'IA genera semplicemente sei o più dita su una mano. Anche le curvature innaturali sono frequenti."
        },
        step_legs: {
            question: "Riconosci l'errore nella parte inferiore dell'immagine?",
            title: "Gambe impossibili",
            text: "Nelle inquadrature a figura intera, l'IA spesso perde il controllo degli arti. Qui, una gamba cresce dal corpo in una posizione anatomicamente impossibile."
        }
    },
    etappenQuiz: {
        intro: {
            title: "Esame intermedio: Cosa sai già?",
            text: "Hai imparato molto su sfondi, pelle, colori e anatomia. Ora si fa sul serio: 10 immagini. Nessun aiuto. Trova i fake."
        },
        round: "Round",
        finish: {
            title: "Esame terminato",
            text_perfect: "Incredibile! Hai sviluppato un occhio perfetto.",
            text_good: "Molto bene! Li hai riconosciuti quasi tutti.",
            text_ok: "Non male, ma fai ancora più attenzione ai dettagli.",
            score: "Il tuo risultato:"
        }
    },
    level7: {
        loading: "Caricamento quiz di tappa...",
        introTitle: "Il Quiz di tappa",
        introText: "Sei pronto per il Quiz 2? Dimostra cosa hai imparato.",
        startBtn: "Inizia Quiz",
        roundLabel: "Round",
        questionText: "Reale o generato?",
        endTitle: "Risultato intermedio",
        endText: "Eccellente. Hai completato la seconda tappa dello studio. Il tuo progresso è stato salvato.",
    },
    level8: {
        title: "Livello 8: IA moderne",
        loading: "Simulazione ambiente Social Media...",
        endTitle: "Livello 8 completato!",
        step0: {
            title: "Generazioni moderne e contesto",
            text: "I modelli moderni (circa dal 26.11.2025) sono tecnicamente quasi perfetti. Pelle, luce e ombre sono quasi indistinguibili dalle foto. Qui spesso aiuta solo una cosa: il contesto."
        },
        step1: {
            question: "Cosa c'è di sospetto in questa immagine?",
            options: {
                quality: "Scarsa qualità immagine",
                scene: "Scenario improbabile",
                filter: "Filtro troppo forte"
            },
            feedback: "Giusto. Un selfie di una persona famosa in un contesto storico o privato totalmente inappropriato è altamente improbabile. Il contesto è il traditore.",
            fail: "Guarda bene. La scena si adatta alla persona e all'epoca?"
        },
        step2: {
            question: "Quale immagine è manipolatoria?",
            success: "Giusto! Questa immagine è una tipica foto 'clickbait', pensata per suscitare forti emozioni. In Germania, a fine 2025, un'immagine molto simile è stata diffusa ed è diventata virale.",
            fail: "Guarda le emozioni: le immagini clickbait mirano a generare rabbia o pietà. Tali immagini sono spesso generate per ottenere rapidamente visibilità."
        },
        step3: {
            title: "Analisi Social Media",
            text: "Ti verrà mostrata un'interfaccia Instagram simulata. Guarda attentamente gli account. Seleziona gli account che ti sembrano fake.\n\nSuggerimenti per l'analisi:\n1. Quando è stato creato l'account? (Molti bot IA sono molto recenti).\n2. Pubblica solo immagini? (I video sono più difficili da falsificare).\n3. Gli influencer vendono prodotti nonostante il basso numero di follower?"
        },
        feed: {
            ad: "Sponsorizzato",
            instruction: "Scorri il feed. Clicca sui nomi per controllare il profilo. Contrassegna i profili che ritieni fake.",
            joined: "Iscritto dal",
            business: "Account aziendale",
            report: "Segnala come fake",
            marked: "🚩 Contrassegnato",
            success: "Ottima analisi! Hai smascherato i bot e gli account manipolatori.",
            fail: "Non del tutto. Guarda la data dei primi post e la descrizione utente. Spesso le aziende creano account influencer solo per pubblicità. Molti profili fake diffondono inoltre notizie false con immagini generate cariche di emotività."
        },
        analysis: {
            title: "Analisi dei bot",
            text: "Riconoscere i bot significa controllare il contesto. 'Lara_Life', ad esempio, ha guadagnato 280k follower in un solo mese, un segno chiaro di crescita artificiale e di un account bot."
        },
        finish: {
            title: "Conclusione",
            text: "Congratulazioni! Hai terminato con successo il Livello 8. Ora sei pronto per il quiz finale."
        }
    },
    level9: {
        loading: "Preparazione finale...",
        introTitle: "La Finale",
        introText: "Sono rimaste solo le nostre migliori immagini IA. Questo è il test finale delle tue capacità. Sei pronto?",
        startBtn: "Inizia ora",
        roundLabel: "Round finale",
        endTitle: "Studio completato!",
        endText: "Eccellente! Hai terminato l'addestramento e tutti i test. Il tuo contributo è estremamente prezioso per la nostra ricerca sulle capacità di riconoscimento delle immagini generate da parte degli utenti.",
        viewLeaderboard: "Vedi classifica"
    },
    spotTheFake: {
        deselect: "Deseleziona",
        select: "Seleziona questa immagine",
        wrongTitle: "Non proprio...",
        wrongDefault: "Scegli un'altra immagine e riprova.",
        successDefault: "Riconosciuto correttamente!",
        timeout: "TEMPO SCADUTO!",
        photosBy: "Foto di",
        onUnsplash: "su Unsplash",
        badges: {
            selected: "SCELTO",
            real: "REALE",
            ai: "IA"
        }
    },
    singleChoice: {
        lockedMessage: "Cerca errori nell'immagine...",
        surveyFeedback: "Grazie per la tua valutazione!",
        wrongDefault: "Non è del tutto corretto."
    },
    realOrFake: {
        timeout: "TEMPO SCADUTO!",
        real: "REALE",
        ai: "GENERATA",
        badges: {
            correct: "GIUSTO",
            wrong: "SBAGLIATO"
        },
        feedback: {
            correct: "Ben fatto!",
            wrong: "Purtroppo sbagliato."
        },
        explanation: {
            is: "Questa immagine è ",
            ai: "generata dall'IA.",
            real: "una foto reale."
        },
        credits: {
            by: "Foto di ",
            on: " su Unsplash"
        }
    },
    multiCheck: {
        defaultQuestion: "Quali di queste immagini sono generate?",
        options: {
            none: "Entrambe reali",
            both: "Entrambe generate",
            left: "La n. 1 è generata",
            right: "La n. 2 è generata"
        },
        feedback: {
            success: "Molto bene! Hai valutato correttamente entrambe le immagini.",
            fail: "Non è del tutto corretto. Guarda di nuovo i dettagli negli sfondi."
        }
    },
    imageMatching: {
        step1: "<strong>Passaggio 1:</strong> Scegli un termine.",
        step2: "<strong>Passaggio 2:</strong> Tocca l'immagine corrispondente.",
        finished: "Analisi completata",
        zoomHint: "Tocca un'immagine senza testo per ingrandirla.",
        failDefault: "Purtroppo non è del tutto corretto. Le associazioni corrette sono ora contrassegnate."
    },
    gridSelect: {
        loading: "Caricamento...",
        selectedBadge: "SCELTO",
        deselect: "Deseleziona",
        select: "Contrassegna come IA",
        error: "Sbagliato! Riprova!",
        successDefault: "Riconosciuto correttamente!",
        aiBadge: "IA"
    },
    conceptTagging: {
        errorDefault: "Non è del tutto corretto. Alcune caratteristiche sono state trascurate o erano errate."
    },
    analysis: {
        altText: "Analisi immagine"
    }
};