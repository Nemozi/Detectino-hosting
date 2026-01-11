export default {
    generic: {
        correct: "Correct !",
        wrong: "Faux",
        step: "Étape",
        next: "Suivant",
        verify: "Vérifier",
        loading: "Chargement du contenu...",
        finish: "Terminer le niveau",
        understood: "Compris",
        completeLevel: "Terminer le niveau",
        backToMap: "Retour aux niveaux",
        image: "Image",
        nextRound: "Tour suivant",
    },
    didactic: {
        title: "Pourquoi l'IA fait-elle des erreurs ?",
        intro: "Avant de commencer, apprenez le principe le plus important pour votre analyse :",
        point1_title: "Pas de compréhension du monde",
        point1_text: "Les IA sont des calculateurs statistiques, pas des artistes. Elles ne savent pas ce qu'est une 'main' ou la 'physique'.",
        point2_title: "Probabilité des pixels",
        point2_text: "Elles calculent uniquement quels pixels pourraient statistiquement s'adapter les uns aux autres.",
        point3_title: "Failles logiques",
        point3_text: "Comme elles ne connaissent le monde que sous forme de modèles plats, elles échouent souvent sur la logique (ex : 6 doigts ou ombres erronées).",
        button: "C'est compris, on commence !"
    },
    navbar: {
        play: "Jouer",
        participate: "Participer",
        menu: "Menu",
        profile: "Mon profil",
        logout: "Se déconnecter",
        streakSuffix: " jours de SÉRIE !",
        info: "Info",
        leaderboard: "Classement",
        stats: "Statistiques"
    },
levels: {
        mainTitle: "Votre voyage",
        loading: "Chargement des niveaux...",
        level_1: "Quiz 1 : Quiz d'entrée",
        level_2: "Unité d'apprentissage 1",
        level_3: "Unité d'apprentissage 2",
        level_4: "Unité d'apprentissage 3",
        level_5: "Unité d'apprentissage 4",
        level_6: "Unité d'apprentissage 5",
        level_7: "Quiz 2 : Quiz d'étape",
        level_8: "Unité d'apprentissage 6",
        level_9: "Quiz 3 : La finale"
    },
    profile: {
        title: "Votre profil",
        loading: "Chargement des données...",
        loggedAs: "Connecté en tant que",
        emailLabel: "E-mail",
        fallbackName: "Détective",
        stats: {
            age: "Âge",
            internet: "Internet",
            skill: "Compétence"
        },
        actions: {
            viewStats: "Voir les statistiques",
            logout: "Se déconnecter"
        }
    },
    leaderboard: {
        title: "Top Détectives",
        description: "Les chasseurs d'IA les plus performants de l'étude Detectino.",
        colRank: "#",
        colUser: "Utilisateur",
        colPoints: "Points",
        loading: "Recherche des meilleurs chasseurs...",
        meBadge: "VOUS",
        footer: "Vos points sont mis à jour après chaque niveau terminé."
    },
    register: {
        title: "Participation & Profil",
        errorGeneric: "Une erreur est survenue. Veuillez réessayer.",
        aliasSection: "Votre pseudo",
        usernameLabel: "Nom d'utilisateur (Optionnel)",
        usernamePlaceholder: "Votre pseudo",
        aboutSection: "À propos de vous",
        ageLabel: "Votre âge",
        genderLabel: "Genre",
        genderOptions: {
            female: "Femme",
            male: "Homme",
            divers: "Divers"
        },
        affinityLabel: "Affinité avec Internet",
        affinityLow: "Faible",
        affinityHigh: "Élevée",
        skillLabel: "Connaissances IA préalables",
        skillLow: "Débutant",
        skillHigh: "Expert",
        submitButton: "Lancer le jeu",
        loading: "Chargement..."
    },
    welcome: {
        title: "Bienvenue sur Detectino",
        intro: "Apprenez à reconnaître les images générées par IA et armez-vous contre le flux de fakes.",
        button: "C'est parti"
    },
    explain: {
        title: "Comment ça marche",
        stepA: "Bienvenue sur Detectino. Ici, vous apprendrez à identifier les images générées par IA et à tester vos compétences.",
        stepB: "À l'étape suivante, vos niveaux s'afficheront. Jouez pour débloquer plus de contenu comme 'Réel ou IA ?'.",
        stepC: "N'hésitez pas à consulter le classement. Vous trouverez également des statistiques d'évaluation dans le menu.",
        stepD: "Detectino est un projet de recherche. Vos données sont collectées anonymement. Plus d'infos sous 'Info'.",
        button: "C'est parti"
    },
    info: {
        title: "À propos de Detectino",
        description: "Detectino est un Serious Game conçu pour vous apprendre à reconnaître les images générées par IA de manière didactique. Le jeu a été développé dans le cadre d'un mémoire de licence par Nemo Ziener. Toutes les données collectées sont traitées de manière anonyme.",
        unsplashNote: "Cette application utilise l'API Unsplash, mais n'est pas soutenue ou certifiée par Unsplash. Les images générées proviennent du dataset AIS-4SD ou sont auto-générées.",
        button: "C'est parti"
    },
dashboard: {
    loading: "CHARGEMENT DES DONNÉES...",
    header: {
      title: "ANALYSE DES RÉSULTATS | DETECTINO",
      status: "DONNÉES EN DIRECT",
      subtitle: "Évaluation scientifique de l'étude des participants"
    },
    kpis: {
      participants: "PARTICIPANTS (N)",
      phase1: "PHASE 1 (Q1 ➞ Q2)",
      phase2: "PHASE 2 (Q2 ➞ Q3)",
      precision: "PRÉCISION Ø"
    },
    sections: {
      modelComparison: "Effet d'apprentissage : Comparaison des modèles",
      quizTimeline: "Chronologie des quiz (Ø)",
      learningCurve: "Courbe d'apprentissage sur tous les niveaux",
      retentionFunnel: "Tunnel de rétention"
    },
    charts: {
      standard: "Standard",
      nano: "Nano",
      quizResult: "Résultat du quiz",
      learningUnit: "Unité d'apprentissage",
      graduates: "Diplômés"
    }
},
    level0: {
        loading: "Chargement du quiz d'entrée...",
        introTitle: "Level 1 : Quiz d'entrée",
        introText: "Réel ou généré ? Testez votre instinct sur 10 images. C'est la première mesure de vos compétences avant de commencer l'entraînement.",
        questionText: "Quelle image est générée ?",
        startBtn: "Démarrer le quiz",
        endTitle: "Évaluation terminée",
        endText: "Vous avez terminé le quiz d'entrée. Votre score a été enregistré et vous pouvez maintenant commencer l'entraînement sur la carte.",
    },
    level1: {
        title: "Level 2",
        loading: "Synchronisation des images...",
        endTitle: "Niveau terminé !",
        endText: "Les arrière-plans n'ont plus de secrets pour vous.",
        introTitle: "Le Quiz de la Vérité",
        introText: "Réel ou généré ? Testez votre instinct sur 10 images. C'est une mesure de vos capacités.",
        startBtn: "Démarrer le quiz",
        step0: {
            question: "Quelle image est générée ?",
            success: "Correct ! C'est l'image générée."
        },
        step1: {
            title: "Analyse : Échelle, Taille & Cohérence",
            text: "Voici une erreur typique : l'IA soigne les détails mais perd de vue l'ensemble. L'homme semble réel, mais le labyrinthe derrière lui est bien trop petit — les proportions ne collent pas."
        },
        step2: {
            question: "Ces images sont-elles générées ?",
            options: {
                none: "Les deux sont réelles",
                both: "Les deux sont générées",
                left: "N°1",
                right: "N°2"
            },
            feedback: {
                success: "Parfait ! Les deux sont générées.",
                fail: "Les deux sont générées. Notez l'arrière-plan déformé de l'enfant. Pour l'homme, les lunettes sont frappantes et le fond est trop flou par rapport à sa proximité avec le mur."
            }
        },
        step3: {
            title: "Analyse d'erreur : Arrière-plan divisé",
            text: "C'était juste ! Observez l'arrière-plan : il est comme 'coupé en deux' par l'objet central (la personne). À gauche, la forêt est totalement floue, à droite, la structure est différente. Une erreur de génération classique."
        },
        step4: {
            title: "Analyse d'erreur : Textures",
            text: "Regardez bien le mur. Il est trop flou pour la proximité de l'homme. Ce flou ne ressemble pas à un véritable effet 'bokeh' d'appareil photo, mais semble juste baveux et boueux."
        },
        step5: {
            question: "Sur quelle image l'arrière-plan indique-t-il une génération ?",
            success: "Bravo ! L'homme sépare le décor : une cabane à gauche, soudain une forêt à droite. Ça ne colle pas."
        },
        step6: {
            title: "Que remarquez-vous sur l'arrière-plan ?",
            subtitle: "Sélectionnez tous les termes appropriés.",
            terms: {
                blurred: "Textures baveuses",
                inconsistent: "Éléments incohérents",
                unrealistic: "Représentation irréelle",
                lighting: "Erreurs de lumière et d'ombre"
            },
            feedback: "La réponse est : Tout est vrai ! Ces types d'erreurs se chevauchent souvent."
        },
        step7: {
            title: "Fin du niveau",
            text: "En résumé : les arrière-plans trahissent souvent l'IA par des transitions illogiques. Vérifiez si les objets à gauche et à droite d'une personne appartiennent bien au même décor."
        }
    },
    level2: {
        title: "Level 3",
        loading: "Chargement des détails de peau...",
        endTitle: "Niveau terminé !",
        endText: "Vous avez prouvé que vous avez l'œil pour les détails de la peau.",
        step0: {
            question: "Quelle image est générée ?",
            success: "Correct !"
        },
        step1: {
            question: "Qu'est-ce qui indique le plus une génération ici ?",
            options: {
                skin: "Texture de la peau",
                nose: "Nez",
                eyes: "Yeux",
                hair: "Cheveux"
            },
            feedback: "Exactement ! Sur les images générées, la peau semble souvent trop lisse ou 'cireuse'.",
            fail: "Observez les textures : une peau trop lisse ou brillante semble souvent artificielle."
        },
        step2: {
            title: "Analyse : La peau",
            text: "Les modèles d'IA ont tendance à exagérer. Comme l'IA ne connaît pas les pores ou les poils fins, la peau semble souvent 'lissée' ou cireuse, presque comme une poupée en plastique. Un visage qui brille trop parfaitement est un signal d'alarme."
        },
        step3: {
            question: "Quelles images semblent générées ? (Choix multiple)",
            success: "Très bien ! Vous reconnaissez le 'look plastique'.",
            fail: "Observez la peau : un aspect trop lisse ou brillant est souvent le signe d'une IA."
        },
        step4: {
            question: "Qu'est-ce qui frappe sur cette image ?",
            subtitle: "Cochez tous les traits pertinents.",
            terms: {
                smooth: "Peau de statue de cire",
                wrinkles: "Rides peu naturelles",
                eyes: "Couleur des yeux",
                tattoos: "Tatouages"
            },
            feedback: "Correct. La peau est trop lisse pour l'âge, et les rides suivent un tracé illogique. Les yeux bleus ou tatouages faciaux sont rares mais pas forcément un indicateur absolu."
        },
        step5: {
            title: "Comparaison : Rides",
            text: "Image 1 (IA) : Les rides semblent 'peintes' ou disparaissent brutalement. Sur la vraie photo, les rides suivent la musculature et ont de la profondeur."
        },
        step6: {
            title: "Fin du niveau",
            text: "Vous avez appris à observer les textures. La 'peau de cire' et les rides illogiques sont des marqueurs forts des images IA."
        }
    },
    level3: {
        title: "Level 4",
        loading: "Chargement de l'analyse des couleurs...",
        endTitle: "Niveau terminé !",
        endText: "Vous avez maintenant l'œil pour la saturation artificielle et les contrastes exagérés.",
        step0: {
            question: "Quelle image est générée ?",
            success: "Correct ! L'image de gauche est générée."
        },
        step1: {
            question: "Pourquoi cette image semble-t-elle fausse ?",
            options: {
                colors: "Couleur & Peau",
                bg: "Bouche",
                hat: "Chapeau",
                eyes: "Yeux"
            },
            feedback: "Correct. Des couleurs sursaturées comme celles-ci sont un indice, la peau 'brille' de façon irréelle."
        },
        step2: {
            question: "Quelle affirmation est vraie ?",
            options: {
                all: "Toutes les images IA sont sursaturées",
                indicator: "La sursaturation est un indicateur de génération",
                none: "La saturation ne veut rien dire"
            },
            feedback: "Exactement. Pas toutes, mais beaucoup d'images générées ont des problèmes de couleurs trop intenses, surtout pour les teints."
        },
        step3: {
            question: "Quelle image a une erreur de couleur ?",
            success: "Correct ! Des cheveux turquoise sur un bambin sont extrêmement improbables."
        },
        step4: {
            title: "Erreur de contexte",
            text: "Souvent, les images IA ont des erreurs de couleur qui ne choquent que par le contexte. Un enfant avec des cheveux parfaitement teints en turquoise est rare dans la réalité, c'est donc un signe de génération."
        },
        step5: {
            title: "Que remarquez-vous ici ?",
            subtitle: "Choisissez tous les traits correspondants.",
            terms: {
                skin: "Peau sursaturée",
                eyes: "Yeux irréels",
                makeup: "Erreur d'arrière-plan",
                smooth: "Peau trop lisse"
            },
            feedback: "Cette image est un exemple parfait du look 'sur-traité' des images IA et des couleurs déformées."
        },
        step6: {
            title: "Analyse :",
            text: "Sur la deuxième image, vous voyez une carte. Les zones d'erreurs sont marquées : surtout sur le visage, les couleurs et textures sont trop parfaites."
        },
        step7: {
            question: "Attribuez les erreurs !",
            terms: {
                hair: "Cheveux irréels",
                sat: "Sursaturation",
                smooth: "Peau plastique"
            },
            success: "Parfaitement attribué !",
            fail: "Observez la couleur des cheveux, la peau trop contrastée et l'aspect 'plastique' lisse."
        },
        step8: {
            title: "Fin du niveau",
            text: "Les couleurs sont un indice fort. Cherchez la peau 'fluo', les couleurs de cheveux illogiques et ce look 'filtre Instagram' par défaut de l'IA."
        }
    },
    level4: {
        title: "Level 5",
        loading: "Préparation de l'analyse de la mimique...",
        endTitle: "Niveau terminé !",
        endText: "Vous reconnaissez maintenant même les erreurs subtiles de mimique.",
        step0: {
            question: "Que remarquez-vous ici ?",
            options: {
                pose: "Posture non naturelle",
                nothing: "Rien de spécial",
                expression: "Anatomie et mimique irréelles",
                bg: "Mauvais arrière-plan"
            },
            feedback: "Correct. L'expression, surtout autour de la bouche, semble déformée.",
            fail: "Observez la mimique et la pose : des expressions et postures bizarres sont souvent le signe d'une IA."
        },
        step1: {
            title: "Analyse : Mimique & Langue",
            text: "Les expressions faciales sont une erreur courante. Ici, la langue tirée avec cette posture est anatomiquement suspecte. De telles erreurs sont un signal d'alarme fort."
        },
        step2: {
            question: "Quelle image est générée ?",
            success: "Bien vu ! L'image de gauche montre des artefacts typiques.",
            fail: "Observez la peau, les couleurs et les traits du visage."
        },
        step3: {
            title: "Analyse : Détails",
            text: "Encore une expression suspecte, regardez aussi les cheveux et les reflets. La peau est trop lisse. Les motifs sur les vêtements sont également bizarres."
        },
        step4: {
            question: "Quelle image est générée ?",
            success: "Correct ! Notez que les personnages IA regardent souvent l'objectif de façon très fixe.",
            fail: "Une personne très agitée dans un portrait au rendu parfait est souvent le signe d'une image générée."
        },
        step5: {
            title: "Fin du niveau",
            text: "Les visages sont complexes. Cherchez le 'regard vide' ou un sourire qui semble forcé ou déformé. L'IA ne ressent rien, elle devine juste à quoi ressemble une émotion."
        }
    },
    level5: {
        title: "Level 6",
        searching: "Recherche de toutes les erreurs d'image...",
        unlocked: "La solution est débloquée !",
        verify: "Terminé",
        check_question: "Avez-vous trouvé toutes les erreurs marquées ?",
        endTitle: "Niveau terminé !",
        options: { yes: "Oui, tout trouvé", no: "Pas tout" },
        disclaimer: "Les marquages sont basés sur des études pilotes. Ils ne sont pas toujours parfaits.",
        step0: {
            title: "Erreurs d'image & Logique",
            text: "L'IA ne comprend pas la physique. C'est pourquoi des objets fusionnent, des lunettes sont asymétriques ou des ombres tombent dans des directions opposées."
        },
        step1: {
            question: "Quelle image est générée ?",
            success: "Correct ! C'est le fake."
        },
        step2: {
            title: "Analyse : Détails",
            text: "Regardez les boutons de la veste (irréguliers), les cheveux qui fusionnent et la lampe en arrière-plan qui semble flotter devant."
        },
        search_task: "Trouvez les erreurs ! Mémorisez-les et cliquez sur 'Solution'.",
        asymmetry: {
            title: "Erreurs de symétrie",
            text: "Un classique : lunettes ou bijoux asymétriques. Ici, la monture est différente à gauche et à droite."
        },
        finish: {
            title: "Fin du niveau",
            text: "Vous avez maintenant l'œil pour les 'glitches'. Si quelque chose est physiquement impossible, c'est probablement de l'IA."
        },
        step_text: {
            question: "Trouvez-vous l'image générée ?",
            title: "Écriture artificielle",
            text: "Le texte en fond est illisible. L'IA ne sait pas écrire, elle crée des formes qui ressemblent à des lettres (le 'Gibberish')."
        },
        step_fingers: {
            question: "Une image a des problèmes d'anatomie des mains. Laquelle ?",
            title: "Trop de doigts",
            text: "Les mains sont la faiblesse de l'IA. Doigts fusionnés ou en trop (6 ou plus). Notez que c'est de plus en plus rare sur les modèles récents."
        },
        step_legs: {
            question: "Voyez-vous l'erreur sur le bas de l'image ?",
            title: "Jambes impossibles",
            text: "Sur les plans larges, l'IA s'emmêle les pinceaux. Ici, une jambe sort d'un endroit impossible."
        }
    },
    level7: {
        loading: "Chargement du quiz d'étape...",
        introTitle: "Level 7 : Quiz d'étape",
        introText: "Prêt pour le Quiz 2 ? Montrez ce que vous avez appris.",
        startBtn: "Démarrer le quiz",
        roundLabel: "Tour",
        questionText: "Réel ou généré ?",
        endTitle: "Bilan d'étape",
        endText: "Excellent. Vous avez terminé la deuxième étape. Votre progression est enregistrée.",
    },
    level8: {
        title: "Level 8",
        loading: "Simulation des réseaux sociaux...",
        endTitle: "Level 8 terminé !",
        step0: {
            title: "Générations modernes & Contexte",
            text: "Les modèles récents sont presque parfaits techniquement. Ici, seul le contexte aide : est-ce que cette scène est crédible ?"
        },
        step1: {
            question: "Qu'est-ce qui est suspect ici ?",
            options: {
                quality: "Mauvaise qualité",
                scene: "Scénario improbable",
                filter: "Filtre trop fort"
            },
            feedback: "Correct. Un selfie d'une célébrité dans un contexte historique ou privé improbable est souvent un fake. Le contexte est le traître.",
            fail: "Regardez bien. La scène correspond-elle à la personne et à l'époque ?"
        },
        step2: {
            question: "Quelle image est manipulatrice ?",
            success: "Correct ! Ces fakes utilisent des dangers artificiels pour provoquer la peur. Les images émotionnelles circulent plus vite, c'est le but de la désinformation.",
            fail: "Le clickbait cherche à générer colère ou pitié. Ces images sont souvent générées pour faire le buzz."
        },
        feed: {
            ad: "Sponsorisé",
            instruction: "Scrollez le flux. Cliquez sur les noms pour voir les profils. Marquez les trois profils avec des posts générés.",
            joined: "Inscrit depuis",
            business: "Compte pro",
            report: "Signaler comme fake",
            marked: "🚩 Marqué",
            success: "Bien analysé ! Vous avez démasqué les bots.",
            fail: "Pas tout à fait. Regardez la date des premiers posts et la description."
        },
        analysis: {
            title: "Analyse des bots",
            text: "Reconnaître un bot, c'est vérifier le contexte. 'Lara_Life' a gagné 280k abonnés en un mois, signe d'une croissance artificielle."
        },
        finish: {
            title: "Clôture",
            text: "Félicitations ! Vous avez fini le Level 8. Vous êtes prêt pour le quiz final."
        }
    },
    level9: {
        loading: "Préparation du final...",
        introTitle: "Level 9",
        introText: "Voici nos meilleures images IA. C'est le test final. Êtes-vous prêt ?",
        startBtn: "Démarrer",
        roundLabel: "Tour final",
        endTitle: "Étude terminée !",
        endText: "Excellent ! Vous avez fini l'entraînement et les tests. Votre contribution est précieuse pour notre recherche.",
        viewLeaderboard: "Voir le classement"
    },
    spotTheFake: {
        deselect: "Désélectionner",
        select: "Choisir cette image",
        wrongTitle: "Pas tout à fait...",
        wrongDefault: "Essayez une autre image.",
        successDefault: "Bien vu !",
        timeout: "TEMPS ÉCOULÉ !",
        photosBy: "Photos de",
        onUnsplash: "sur Unsplash",
        badges: {
            selected: "CHOISI",
            real: "RÉEL",
            ai: "IA"
        }
    },
    singleChoice: {
        lockedMessage: "Cherchez les erreurs...",
        surveyFeedback: "Merci pour votre évaluation !",
        wrongDefault: "Pas tout à fait correct."
    },
    realOrFake: {
        timeout: "TEMPS ÉCOULÉ !",
        real: "RÉEL",
        ai: "GÉNÉRÉ",
        badges: {
            correct: "CORRECT",
            wrong: "FAUX"
        },
        feedback: {
            correct: "Bien joué !",
            wrong: "Hélas, non."
        },
        explanation: {
            is: "Cette image est ",
            ai: "générée par IA.",
            real: "une vraie photo."
        },
        credits: {
            by: "Photo de ",
            on: " sur Unsplash"
        }
    },
    multiCheck: {
        defaultQuestion: "Quelles images sont générées ?",
        options: {
            none: "Deux réelles",
            both: "Deux générées",
            left: "N°1 est générée",
            right: "N°2 est générée"
        },
        feedback: {
            success: "Très bien !",
            fail: "Regardez mieux les détails de fond."
        }
    },
    imageMatching: {
        step1: "<strong>Étape 1 :</strong> Choisissez un terme.",
        step2: "<strong>Étape 2 :</strong> Appuyez sur l'image correspondante.",
        finished: "Analyse terminée",
        zoomHint: "Appuyez sur une image pour l'agrandir.",
        failDefault: "Pas tout à fait correct. Les bonnes réponses sont affichées."
    },
    gridSelect: {
        loading: "Chargement...",
        selectedBadge: "CHOISI",
        deselect: "Désélectionner",
        select: "Marquer comme IA",
        error: "Faux ! Réessayez.",
        successDefault: "Correct !",
        aiBadge: "IA"
    },
    conceptTagging: {
        errorDefault: "Certains traits ont été oubliés ou sont faux."
    },
    analysis: {
        altText: "Image d'analyse"
    },
};