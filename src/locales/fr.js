export default {
    generic: {
        step: "Étape",
        next: "Suivant",
        verify: "Vérifier",
        loading: "Chargement des contenus...",
        finish: "Terminer le niveau",
        understood: "Compris",
        completeLevel: "Terminer le niveau",
        backToMap: "Retour aux niveaux",
        image: "Image",
        correct: "Correct !",
    wrong: "Faux",
    nextRound: "Tour suivant"
    },
    navbar: {
        play: "Jouer",
        participate: "Participer",
        menu: "Menu",
        profile: "Mon profil",
        logout: "Déconnexion",
        streakSuffix: "e SÉRIE !",
        info: "Info",
        leaderboard: "Classement",
        stats: "Statistiques"
    },
    levels: {
        mainTitle: "Votre voyage",
        loading: "Chargement des niveaux...",
        level_1: "Quiz d'entrée",
        level_2: "Arrière-plans",
        level_3: "Textures de peau",
        level_4: "Couleur & Saturation",
        level_5: "Expressions",
        level_6: "Erreurs d'image",
        level_7: "Quiz d'étape",
        level_8: "IA modernes",
        level_9: "La finale"
    },
    profile: {
        title: "Votre profil",
        loading: "Chargement...",
        loggedAs: "Connecté en tant que",
        emailLabel: "E-mail",
        fallbackName: "Détective",
        stats: {
            age: "Âge",
            internet: "Internet",
            skill: "Compétence"
        },
        actions: {
            viewStats: "Voir les stats",
            logout: "Déconnexion"
        }
    },
    leaderboard: {
        title: "Top Détectives",
        description: "Les meilleurs chasseurs d'IA de l'étude Detectino.",
        colRank: "#",
        colUser: "Utilisateur",
        colPoints: "Points",
        loading: "Recherche des meilleurs...",
        meBadge: "VOUS",
        footer: "Vos points sont mis à jour après chaque niveau."
    },
    register: { // Conservation de la faute de frappe "egister" si elle est nécessaire au code
        title: "Participation & Profil",
        errorGeneric: "Une erreur est survenue. Veuillez réessayer.",
        aliasSection: "Votre alias",
        usernameLabel: "Nom d'utilisateur (Optionnel)",
        usernamePlaceholder: "Votre alias",
        aboutSection: "À propos de vous",
        ageLabel: "Votre âge",
        genderLabel: "Sexe",
        genderOptions: {
            female: "Femme",
            male: "Homme",
            divers: "Divers"
        },
        affinityLabel: "Aisance avec Internet",
        affinityLow: "Faible",
        affinityHigh: "Élevée",
        skillLabel: "Connaissances préalables en IA",
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
        stepB: "À l'étape suivante, vos niveaux s'afficheront. Jouez pour débloquer d'autres contenus comme 'Réel ou IA ?'.",
        stepC: "N'hésitez pas à consulter le classement et à vous comparer aux autres. Vous trouverez également des statistiques d'analyse dans le menu.",
        stepD: "Detectino est un projet de recherche. Vos données sont collectées de manière anonyme. Plus d'infos sous 'Info'.",
        button: "C'est parti"
    },
    info: {
        title: "À propos de Detectino",
        description: "Detectino est un Serious Game conçu pour vous apprendre de manière didactique à reconnaître les images générées par IA. Le jeu a été développé par Nemo Ziener dans le cadre d'une thèse de licence. Toutes les données collectées sont traitées exclusivement de manière anonyme.",
        unsplashNote: "Cette application utilise l'API Unsplash mais n'est pas soutenue ou certifiée par Unsplash.",
        button: "C'est parti"
    },
    dashboard: {
        header: {
            title: "DONNÉES DE RECHERCHE",
            status: "DONNÉES EN DIRECT",
            subtitle: "ANALYSE DES CAPACITÉS DE DÉTECTION D'IMAGES GÉNÉRÉES MESURÉES PAR DETECTINO"
        },
        kpis: {
            participants: "PARTICIPANTS",
            decisions: "TOTAL DÉCISIONS",
            accuracy: "PRÉCISION GLOBALE",
            affinity: "AISANCE MOYENNE"
        },
        tech: {
            title: "TECHNOLOGY-GAP",
            modern: "IA MODERNES (NANO)",
            diff: "DIFFÉRENCE",
            loss: "PERTE DE PRÉCISION SUR LES MODÈLES MODERNES"
        },
        correlation: {
            title: "CORRÉLATION D'AUTO-ÉVALUATION",
            self: "AUTO-PERCEPTION (1-10)",
            reality: "RÉALITÉ (1-10)"
        },
        learning: {
            title: "COURBE D'APPRENTISSAGE",
            analysis: "ANALYSE DES CLICS",
            fallback: "SCORE-FALLBACK"
        },
        demographics: {
            title: "DÉMOGRAPHIE",
            age: "RÉPARTITION PAR ÂGE",
            gender: "PERFORMANCE PAR SEXE",
            yearsUnit: "ans"
        },
        funnel: {
            title: "ENTONNOIR DE RÉTENTION",
            users: "UTILISATEURS",
            desc: "TAUX DE RÉUSSITE PAR NIVEAU BASÉ SUR LE TOTAL DES PARTICIPANTS"
        }
    },
level0: {
        loading: "Chargement du quiz d'entrée...",
        introTitle: "Le Quiz de la Vérité",
        questionText: "Quelle image est générée ?",
        introText: "Réel ou généré ? Testez votre instinct sur 10 images isolées. C'est la première mesure de vos capacités avant de commencer l'entraînement.",
        startBtn: "Lancer le quiz",
        endTitle: "Évaluation terminée",
        endText: "Vous avez terminé le quiz d'entrée avec succès. Votre score a été enregistré et vous pouvez maintenant commencer l'entraînement sur la carte.",
    },
    level1: {
        title: "Niveau 2 : Arrière-plans",
        loading: "Synchronisation des images...",
        endTitle: "Niveau terminé !",
        endText: "Les arrière-plans n'ont plus de secret pour vous.",
        introTitle: "Le quiz de la vérité",
        introText: "Réel ou généré ? Testez votre instinct sur 10 images isolées. C'est la première mesure de vos capacités.",
        startBtn: "Lancer le quiz",
        endTitle: "Analyse terminée",
        endText: "Vous avez terminé le quiz initial. Votre score a été enregistré.",
        step0: {
            question: "Quelle image est générée ?",
            success: "Correct ! C'est l'image générée."
        },
        step1: {
            title: "Analyse : Échelle, taille & cohérence",
            text: "Voici un exemple typique d'arrière-plan incohérent. L'homme semble réel, mais l'échelle du labyrinthe ne correspond pas à sa taille. De plus, la zone derrière le labyrinthe présente soudainement une échelle de paysage totalement différente."
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
                fail: "Les deux sont générées. Notez l'arrière-plan déformé et la peau du garçon. Pour l'homme, les lunettes sont très frappantes et trop floues par rapport à sa proximité avec le mur."
            }
        },
        step3: {
            title: "Analyse d'erreur : Arrière-plan divisé",
            text: "C'était juste ! Regardez l'arrière-plan : il est comme 'coupé en deux' par l'objet central (la personne). À gauche, la forêt est totalement floue, à droite la structure est totalement différente. Une erreur de génération classique."
        },
        step4: {
            title: "Analyse d'erreur : Textures",
            text: "Regardez le mur de près. Il est beaucoup trop flou pour la proximité de l'homme. Ce flou ne ressemble pas à un véritable effet 'bokeh' (profondeur de champ) d'un appareil photo, mais paraît juste baveux et indistinct."
        },
        step5: {
            question: "Sur quelle image l'arrière-plan indique-t-il une génération ?",
            success: "Exact ! L'homme sépare l'arrière-plan : une cabane à gauche, soudainement une forêt à droite. Cela ne colle pas."
        },
        step6: {
            title: "Que remarquez-vous sur l'arrière-plan ?",
            subtitle: "Sélectionnez tous les termes appropriés.",
            terms: {
                blurred: "Textures floues",
                inconsistent: "Éléments incohérents",
                unrealistic: "Représentation irréaliste",
                lighting: "Erreurs de lumière et d'ombre"
            },
            feedback: "La réponse est : Tout est vrai ! Ces types d'erreurs se chevauchent souvent."
        },
        step7: {
            title: "Fin du niveau",
            text: "Vous avez appris à surveiller l'arrière-plan : cherchez des textures floues, des objets incohérents gauche/droite et des ombres illogiques. Ces erreurs trahissent souvent la génération, même si le visage semble parfait."
        }
    },
    level2: {
        title: "Niveau 3 : Textures de peau",
        loading: "Chargement des détails de la peau...",
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
            feedback: "Exactement ! Sur les images générées, la peau paraît souvent trop lisse ou 'cireuse'.",
            fail: "Faites attention aux textures de peau : un aspect trop lisse ou brillant semble souvent artificiel."
        },
        step2: {
            title: "Analyse : La peau",
            text: "La peau réelle est mate et poreuse. Les modèles d'IA représentent souvent la peau de manière trop lisse, trop brillante ou trop uniformément parfaite. C'est souvent un meilleur signal d'alerte que des erreurs grossières."
        },
        step3: {
            question: "Quelles images semblent générées ? (Choix multiple)",
            success: "Très bien ! Vous reconnaissez l'aspect plastique.",
            fail: "Faites attention aux textures de peau : un aspect trop lisse ou brillant semble souvent artificiel."
        },
        step4: {
            question: "Que remarquez-vous sur cette image ?",
            subtitle: "Choisissez toutes les caractéristiques pertinentes.",
            terms: {
                smooth: "Peau de statue de cire",
                wrinkles: "Rides non naturelles",
                eyes: "Couleur des yeux",
                tattoos: "Tatouages"
            },
            feedback: "Correct. La peau est trop lisse pour l'âge et les rides suivent un tracé anormal. Les yeux bleus ou les tatouages faciaux sont rares, mais pas forcément un indicateur."
        },
        step5: {
            title: "Comparaison : Les rides",
            text: "Image 1 (IA) : Les rides semblent 'peintes' ou disparaissent à des endroits illogiques. Image 2 (Réel) : Les rides suivent la musculature et ont de la profondeur."
        },
        step6: {
            title: "Fin du niveau",
            text: "Vous avez appris à observer les textures de peau. La 'peau de cire' et les rides non naturelles sont de forts indicateurs d'images IA."
        }
    },
    level3: {
        title: "Niveau 4 : Couleurs & Saturation",
        loading: "Analyse des couleurs en cours...",
        endTitle: "Niveau terminé !",
        endText: "Vous avez maintenant l'œil pour la saturation artificielle et les contrastes exagérés.",
        step0: {
            question: "Quelle image est générée ?",
            success: "Correct ! L'image de gauche est générée."
        },
        step1: {
            question: "Pourquoi cette image semble-t-elle fausse ?",
            options: {
                colors: "Couleur & peau",
                bg: "Oreille",
                hat: "Couvre-chef",
                eyes: "Couleur des yeux"
            },
            feedback: "Correct. Les couleurs sursaturées comme celles-ci sont un indice, la peau 'brille' de manière surnaturelle."
        },
        step2: {
            question: "Quelle affirmation est correcte ?",
            options: {
                all: "Toutes les images générées sont sursaturées",
                indicator: "La sursaturation est un indicateur de génération",
                none: "La sursaturation ne veut rien dire"
            },
            feedback: "Exactement. Pas toutes, mais beaucoup d'images générées ont des problèmes de couleurs trop intenses, surtout pour les teints de peau."
        },
        step3: {
            question: "Quelle image présente une erreur de couleur ?",
            success: "Correct ! Des cheveux turquoise sur un bambin sont extrêmement improbables."
        },
        step4: {
            title: "Erreur de contexte",
            text: "Souvent, les images générées ont des erreurs de couleur qui ne frappent qu'en fonction du contexte. Un enfant avec des cheveux turquoise parfaitement teints est très rare en réalité, c'est donc un signe de génération."
        },
        step5: {
            title: "Que remarquez-vous ici ?",
            subtitle: "Sélectionnez tous les éléments correspondants.",
            terms: {
                skin: "Peau sursaturée",
                eyes: "Yeux irréalistes",
                makeup: "Erreur d'arrière-plan",
                smooth: "Peau trop douce"
            },
            feedback: "Cette image est un exemple parfait du look 'over-processed' des images générées et des couleurs faussées qui n'existent pas ainsi dans la réalité."
        },
        step6: {
            title: "Analyse :",
            text: "Dans la deuxième image, vous voyez une carte. Les zones d'erreur y sont à nouveau marquées : surtout sur le visage, les couleurs et les textures sont trop parfaites et lisses."
        },
        step7: {
            question: "Associez les erreurs !",
            terms: {
                hair: "Cheveux irréalistes",
                sat: "Sursaturation",
                smooth: "Peau en plastique"
            },
            success: "Association parfaite ! Vous développez un regard pour les détails.",
            fail: "Regardez la couleur des cheveux (rouge), la peau beaucoup trop contrastée et l'aspect 'plastique' lisse."
        },
        step8: {
            title: "Fin du niveau",
            text: "Les couleurs sont un indice puissant. Cherchez la peau 'luisante', les couleurs de cheveux illogiques dans le contexte et le look général 'filtre Instagram' que de nombreux modèles IA produisent par défaut."
        }
    },
    level4: {
        title: "Niveau 5 : Expressions faciales",
        loading: "Préparation de l'analyse de la mimique...",
        endTitle: "Niveau terminé !",
        endText: "Vous reconnaissez maintenant même les erreurs subtiles de mimique.",
        step0: {
            question: "Que remarquez-vous ici ?",
            options: {
                pose: "Posture non naturelle",
                nothing: "Rien de spécial",
                expression: "Anatomie et mimique non naturelles",
                bg: "Mauvais arrière-plan"
            },
            feedback: "Correct. L'expression, surtout au niveau de la bouche, semble déformée.",
            fail: "Faites attention à la mimique et à la posture : des expressions faciales et des positions corporelles non naturelles sont souvent un signe d'IA."
        },
        step1: {
            title: "Analyse : Mimique & Langue",
            text: "Les expressions faciales sont une erreur fréquente des modèles IA. Dans cet exemple, la langue tirée ainsi que sa position sont anatomiquement suspectes. De telles erreurs de mimique sont un signal d'alerte fort."
        },
        step2: {
            question: "Quelle image est générée ?",
            success: "Bien vu ! L'image de gauche montre des artefacts typiques.",
            fail: "Regardez la peau, les couleurs et les traits du visage."
        },
        step3: {
            title: "Analyse : Détails",
            text: "Encore une expression faciale frappante, notez aussi les cheveux et les reflets de lumière. La peau semble trop lisse (comme appris au Niveau 2). De plus, les rides et les motifs sur les vêtements sont suspects."
        },
        step4: {
            question: "Quelle image est générée ?",
            success: "Correct ! Notez qu'en général, les personnages sur les images générées regardent souvent directement la caméra.",
            fail: "Regardez la mimique : des expressions non naturelles ou une personne agitée dans un portrait parfait sont souvent des signes d'images générées."
        },
        step5: {
            title: "Fin du niveau",
            text: "Les visages sont complexes. Cherchez les regards vides, les yeux asymétriques, les dents ou langues qui fusionnent et les émotions qui ne collent pas tout à fait au reste du visage."
        }
    },
    level5: {
        title: "Niveau 6 : Identifier les erreurs d'image",
        searching: "Recherche de toutes les erreurs...",
        unlocked: "La solution est débloquée !",
        verify: "Terminé",
        check_question: "Avez-vous trouvé toutes les erreurs marquées ?",
        endTitle: "Niveau terminé !",
        options: { yes: "Oui, toutes trouvées", no: "Pas toutes" },
        disclaimer: "Les marquages sont basés sur des sondages d'utilisateurs lors d'études pilotes et servent d'orientation. Ils ne sont pas toujours parfaits.",
        step0: {
            title: "Erreurs d'image & Logique",
            text: "Une bonne méthode pour reconnaître les images générées est de chercher des erreurs physiques ou logiques. L'IA ne 'comprend' pas le monde, elle ne fait que deviner des pixels. Cela conduit souvent à des erreurs impossibles dans la réalité."
        },
        step1: {
            question: "Quelle image est générée ?",
            success: "Correct ! Cette image est le fake."
        },
        step2: {
            title: "Analyse : Détails",
            text: "Regardez les boutons de la veste (irréguliers), les cheveux (fusionnent) et surtout la lampe à l'arrière-plan qui pend physiquement de manière impossible au premier plan."
        },
        search_task: "Trouvez les erreurs ! Mémorisez-les et cliquez sur 'Solution'.",
        options: {
            yes: "Oui, toutes trouvées",
            partly: "Certaines",
            no: "Non, je les ai manquées"
        },
        feedback: "C'est en forgeant qu'on devient forgeron. Faites attention aux détails à l'arrière-plan et sur les bords.",
        img11: "Regardez l'arrière-plan et les vêtements.",
        img12: "Observez bien les mains et l'environnement.",
        img48: "Il y a un problème avec l'architecture ici.",
        img67: "Cherchez des reflets ou des ombres.",
        asymmetry: {
            title: "Erreurs de symétrie",
            text: "Un classique : les lunettes, bijoux ou vêtements sont souvent asymétriques. Ici, la monture des lunettes est totalement différente à gauche et à droite."
        },
        finish: {
            title: "Fin du niveau",
            text: "Vous avez maintenant l'œil pour les 'glitches'. Si quelque chose n'a aucun sens physique (lampes flottantes, demi-lunettes), c'est très probablement de l'IA."
        },
        step_text: {
            question: "Pouvez-vous trouver le texte illogique dans l'image ?",
            title: "Écriture artificielle",
            text: "L'avez-vous remarqué ? Le texte à l'arrière-plan est illisible. Ce n'est pas seulement dû à la distance, mais au fait que les IA ont souvent du mal à générer une écriture réelle. Elles créent des formes qui ressemblent seulement à des lettres (ce qu'on appelle du 'gibberish')."
        },
        step_fingers: {
            question: "Une image présente des problèmes d'anatomie des mains. Laquelle ?",
            title: "Trop de doigts",
            text: "Les mains sont l'une des plus grandes faiblesses des modèles d'IA. Souvent, les doigts fusionnent ou l'IA génère simplement six doigts ou plus sur une main. Des courbures non naturelles sont également fréquentes."
        },
        step_legs: {
            question: "Reconnaissez-vous l'erreur dans la partie inférieure de l'image ?",
            title: "Jambes impossibles",
            text: "Dans les plans en pied, l'IA perd souvent le fil des membres. Ici, une jambe pousse sur le corps à un endroit anatomiquement impossible."
        }
    },
    etappenQuiz: {
        intro: {
            title: "Examen intermédiaire : Que savez-vous déjà ?",
            text: "Vous avez beaucoup appris sur les arrière-plans, la peau, les couleurs et l'anatomie. C'est le moment sérieux : 10 images. Aucune aide. Trouvez les fakes."
        },
        round: "Round",
        finish: {
            title: "Examen terminé",
            text_perfect: "Incroyable ! Vous avez développé un œil parfait.",
            text_good: "Très bien ! Vous les avez presque toutes reconnues.",
            text_ok: "Pas mal, mais faites encore plus attention aux détails.",
            score: "Votre résultat :"
        }
    },
    level7: {
        loading: "Chargement du quiz d'étape...",
        introTitle: "Le quiz d'étape",
        introText: "Prêt pour le quiz n°2 ? Montrez ce que vous avez appris.",
        startBtn: "Lancer le quiz",
        roundLabel: "Round",
        questionText: "Réel ou généré ?",
        endTitle: "Résultat intermédiaire",
        endText: "Excellent. Vous avez terminé la deuxième étape de l'étude. Votre progression a été enregistrée.",
    },
    level8: {
        title: "Niveau 8 : Les IA modernes",
        loading: "Simulation d'un environnement de réseaux sociaux...",
        endTitle: "Niveau 8 terminé !",
        step0: {
            title: "Générations modernes & Contexte",
            text: "Les modèles modernes (environ depuis fin 2025) sont techniquement presque parfaits. La peau, la lumière et les ombres sont quasi indiscernables des photos. Ici, seul le contexte aide souvent."
        },
        step1: {
            question: "Qu'est-ce qui est suspect sur cette image ?",
            options: {
                quality: "Mauvaise qualité d'image",
                scene: "Scénario improbable",
                filter: "Filtre trop puissant"
            },
            feedback: "Correct. Un selfie d'une personne célèbre dans un contexte historique ou privé totalement inapproprié est hautement improbable. Le contexte est le traître.",
            fail: "Regardez bien. La scène correspond-elle à la personne et à l'époque ?"
        },
        step2: {
            question: "Quelle image est manipulative ?",
            success: "Correct ! Cette image est une photo 'clickbait' typique destinée à susciter de fortes émotions. En Allemagne, fin 2025, une image très similaire est devenue virale.",
            fail: "Regardez les émotions : les images clickbait visent à générer de la colère ou de la pitié. De telles images sont souvent générées pour obtenir rapidement de la portée."
        },
        step3: {
            title: "Analyse des réseaux sociaux",
            text: "Une interface Instagram simulée va s'afficher. Regardez bien les comptes. Sélectionnez ceux qui vous semblent faux.\n\nConseils d'analyse :\n1. Quand le compte a-t-il été créé ? (Beaucoup de bots IA sont très récents).\n2. Ne poste-t-il que des images ? (Les vidéos sont plus dures à truquer).\n3. Des influenceurs vendent-ils des produits malgré un faible nombre d'abonnés ?"
        },
        feed: {
            ad: "Sponsorisé",
            instruction: "Faites défiler le flux. Cliquez sur les noms pour vérifier le profil. Marquez les profils que vous pensez être faux.",
            joined: "Membre depuis",
            business: "Compte professionnel",
            report: "Signaler comme faux",
            marked: "🚩 Marqué",
            success: "Superbe analyse ! Vous avez démasqué les bots et les comptes manipulateurs.",
            fail: "Pas tout à fait. Regardez la date des premiers posts et la description. Souvent, des entreprises créent des comptes d'influenceurs juste pour la pub. De nombreux faux profils diffusent aussi des infox avec des images générées émotionnelles."
        },
        analysis: {
            title: "Analyse des bots",
            text: "Reconnaître des bots signifie vérifier le contexte. 'Lara_Life' a par exemple gagné 280k abonnés en un mois, un signe clair de croissance artificielle et d'un compte bot."
        },
        finish: {
            title: "Conclusion",
            text: "Félicitations ! Vous avez terminé le niveau 8 avec succès. Vous êtes maintenant prêt pour le quiz final."
        }
    },
    level9: {
        loading: "Préparation de la finale...",
        introTitle: "La finale",
        introText: "Seulement nos meilleures images IA. C'est le test final de vos capacités. Êtes-vous prêt ?",
        startBtn: "Démarrer maintenant",
        roundLabel: "Round final",
        endTitle: "Étude terminée !",
        endText: "Excellent ! Vous avez terminé l'entraînement et tous les tests. Votre contribution est extrêmement précieuse pour notre recherche sur les capacités de détection des images générées par les utilisateurs.",
        viewLeaderboard: "Voir le classement"
    },
    spotTheFake: {
        deselect: "Désélectionner",
        select: "Choisir cette image",
        wrongTitle: "Pas tout à fait...",
        wrongDefault: "Choisissez une autre image et réessayez.",
        successDefault: "Correctement identifié !",
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
        lockedMessage: "Cherchez les erreurs d'image...",
        surveyFeedback: "Merci pour votre évaluation !",
        wrongDefault: "Pas tout à fait correct."
    },
    realOrFake: {
        timeout: "TEMPS ÉCOULÉ !",
        real: "RÉEL",
        ai: "GÉNÉRÉE",
        badges: {
            correct: "CORRECT",
            wrong: "FAUX"
        },
        feedback: {
            correct: "Bien joué !",
            wrong: "Malheureusement faux."
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
        defaultQuestion: "Laquelle de ces images est générée ?",
        options: {
            none: "Deux réelles",
            both: "Deux générées",
            left: "N° 1 est générée",
            right: "N° 2 est générée"
        },
        feedback: {
            success: "Très bien ! Vous avez correctement évalué les deux images.",
            fail: "Pas tout à fait correct. Regardez à nouveau les détails dans l'arrière-plan."
        }
    },
    imageMatching: {
        step1: "<strong>Étape 1 :</strong> Choisissez un terme.",
        step2: "<strong>Étape 2 :</strong> Appuyez sur l'image correspondante.",
        finished: "Analyse terminée",
        zoomHint: "Appuyez sur une image sans texte pour l'agrandir.",
        failDefault: "Pas tout à fait correct. Les correspondances correctes sont maintenant marquées."
    },
    gridSelect: {
        loading: "Chargement...",
        selectedBadge: "CHOISI",
        deselect: "Désélectionner",
        select: "Marquer comme IA",
        error: "Faux ! Réessayez !",
        successDefault: "Correctement identifié !",
        aiBadge: "IA"
    },
    conceptTagging: {
        errorDefault: "Pas tout à fait correct. Certains traits ont été oubliés ou sont erronés."
    },
    analysis: {
        altText: "Analyse de l'image"
    }
};