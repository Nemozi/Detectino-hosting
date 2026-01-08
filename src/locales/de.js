export default {
    generic: {
        loading: "Lade Level Inhalte...",
        next: "Weiter",
        verify: "Auflösen",
        finish: "Level Beenden",
        understood: "Verstanden"
    },
    level1: {
        step0: {
            question: "Welches Bild ist KI?",
            success: "Korrekt! Das ist das KI-Bild."
        },
        step1: {
            title: "Analyse: Maßstab, Skalierung & Konsistenz",
            text: "Hier sehen wir ein typisches Beispiel für inkonsistente Hintergründe. Der Mann wirkt echt, aber der Maßstab des Labyrinths passt nicht zu seiner Größe. Zudem zeigt der Bereich hinter dem Labyrinth plötzlich eine völlig andere Landschaftsskalierung."
        },
        step2: {
            question: "Sind diese Bilder KI-generiert?",
            options: {
                none: "Beide sind echt",
                both: "Beide sind Ki-generiert",
                left: "Nr.1",
                right: "Nr.2"
            },
            feedback: {
                success: "Perfekt! Beide sind KI-generiert.",
                fail: "Nicht ganz richtig. Tatsächlich sind beide Bilder KI-generiert."
            }
        },
        step3: {
            title: "Fehleranalyse: Geteilter Hintergrund",
            text: "Das war knapp! Achte hier auf den Hintergrund: Er wird durch das Objekt im Zentrum (die Person) quasi 'zwei-geteilt'. Links ist der Wald total verwischt, rechts sieht die Struktur ganz anders aus. Ein klassischer KI-Fehler."
        },
        step4: {
            title: "Fehleranalyse: Texturen",
            text: "Schau dir die Mauer genau an. Sie ist viel zu unscharf dafür, wie nah der Mann an ihr lehnt. Diese Unschärfe sieht nicht wie ein echter 'Bokeh-Effekt' (Tiefenschärfe) einer Kamera aus, sondern einfach matschig und verwischt."
        },
        step5: {
            question: "Bei welchem Bild weist der Hintergrund auf KI-Generierung hin?",
            success: "Richtig! Der Mann trennt den Hintergrund: Links eine Hütte, rechts plötzlich Wald. Das passt nicht zusammen."
        },
        step6: {
            title: "Was fällt dir am Hintergrund auf?",
            subtitle: "Wähle alle passenden Begriffe aus.",
            terms: {
                blurred: "Verwischte Texturen",
                inconsistent: "Inkonsistente Merkmale",
                unrealistic: "Unrealistische Darstellung",
                lighting: "Komisches Licht/Schatten"
            },
            feedback: "Die Lösung ist: Alles trifft zu! Diese Fehlerarten überschneiden sich oft."
        },
        step7: {
            title: "Level Abschluss",
            text: "Du hast gelernt, auf den Hintergrund zu achten: Suche nach verwischten Texturen, inkonsistenten Objekten links/rechts und unlogischen Schatten. Diese Fehler verraten die KI oft, auch wenn das Gesicht perfekt aussieht."
        }
    }
    ,
     level2: {
        step0: {
            question: "Welches Bild ist KI?",
            success: "Richtig!"
        },
        step1: {
            question: "Was deutet hier am stärksten auf KI hin?",
            options: {
                skin: "Hauttextur",
                nose: "Nase",
                eyes: "Augen",
                hair: "Haare"
            },
            feedback: "Genau! Bei KI-generierten Bildern wirkt Haut oft zu glatt oder 'plastikartig'."
        },
        step2: {
            title: "Analyse: Die Haut",
            text: "Echte Haut ist matt und porös. KI-Modelle stellen Haut oft zu glatt, zu stark glänzend oder unnatürlich gleichmäßig dar. Dies ist oft ein besseres Warnsignal als offensichtliche Fehler."
        },
        step3: {
            question: "Welche Bilder wirken KI-generiert? (Mehrfachauswahl) Achte auf den 'Plastik-Look' der Haut.",
            success: "Sehr gut! Du erkennst den 'Plastik-Look'."
        },
        step4: {
            question: "Was fällt bei diesem Bild auf?",
            subtitle: "Wähle alle zutreffenden Merkmale.",
            terms: {
                smooth: "Wachsfiguren-Haut",
                wrinkles: "Unnatürliche Falten",
                eyes: "Augenfarbe",
                tattoos: "Tattoos"
            },
            feedback: "Richtig. Die Haut ist zu glatt für das Alter, und die Falten verlaufen unnatürlich. Blaue Augen oder Tattoos im Gesicht sind selten, aber nicht unbedingt ein Indikator. "
        },
        step5: {
            title: "Vergleich: Falten",
            text: "Bild 1 (KI): Die Falten wirken wie 'aufgemalt' oder verschwinden an unnatürlichen Stellen. Rechts (Echt): Falten folgen der Muskulatur und haben Tiefe."
        },
        step6: {
            title: "Level Abschluss",
            text: "Du hast gelernt, auf Hauttexturen zu achten. 'Wachsfiguren-Haut' und unnatürliche Falten sind starke Indikatoren für KI-Bilder."
        }
    },
     level3: {
        step0: {
            question: "Welches Bild ist KI?",
            success: "Richtig! Das linke Bild ist KI."
        },
        step1: {
            question: "Warum wirkt dieses Bild unecht?",
            options: {
                colors: "Farbe & Haut",
                bg: "Ohr",
                hat: "Kopfbedeckung",
                eyes: "Augenfarbe"
            },
            feedback: "Richtig. Übersättigte Farben wie solche sind ein Indiz, die Haut 'leuchtet' unnatürlich."
        },
        step2: {
            question: "Welche Aussage ist richtig?",
            options: {
                all: "Alle KI-Bilder sind übersättigt",
                indicator: "Übersättigung ist ein Indikator für KI",
                none: "Übersättigung sagt nichts aus"
            },
            feedback: "Genau. Nicht alle, aber viele KI-Bilder haben Probleme mit zu intensiven Farben, besonders bei Hauttönen."
        },
        step3: {
            question: "Welches Bild hat einen Farbfehler?",
            success: "Korrekt! Türkise Haare bei einem Kleinkind sind extrem unwahrscheinlich."
        },
        step4: {
            title: "Kontextfehler",
            text: "Häufig haben KI-Bilder Farbfehler, die erst im Kontext auffallen. Ein Kind mit perfekt gefärbten, türkisen Haaren ist in der Realität sehr selten und daher ein Zeichen für Generierung."
        },
        step5: {
            title: "Was fällt dir hier auf?",
            subtitle: "Wähle alle passenden Merkmale.",
            terms: {
                skin: "Übersättigte Haut",
                eyes: "Unrealistische Augen",
                makeup: "Starke Schminke",
                smooth: "Zu weiche Haut"
            },
            feedback: "Dieses Bild ist ein Paradebeispiel für den 'Over-Processed' Look von KI und die verfälschten Farben welche so in der Realität nicht vorkommen."
        },
        step6: {
            title: "Analyse:",
            text: "Rechts siehst du eine Karte. Dort sind die Fehlerbereiche nochmal markiert: Besonders im Gesicht sind die Farben und Texturen zu perfekt und weich."
        },
        step7: {
            question: "Ordne die Fehler zu!",
            terms: {
                hair: "Unrealistische Haare",
                sat: "Übersättigung",
                smooth: "Plastik-Haut"
            },
            success: "Perfekt zugeordnet! Du entwickelst einen Blick für die Details."
        },
        step8: {
            title: "Level Abschluss",
            text: "Farben sind ein starkes Indiz. Achte auf 'leuchtende' Haut, unlogische Haarfarben im Kontext und den allgemeinen 'Instagram-Filter-Look', den viele KI-Modelle standardmäßig erzeugen."
        }
    },
    level4: {
        step0: {
            question: "Was fällt dir hier auf?",
            options: {
                pose: "Unnatürliche Haltung",
                nothing: "Nichts Auffälliges",
                expression: "Unnatürliche Anatomie und Mimik",
                bg: "Falscher Hintergrund"
            },
            feedback: "Richtig. Der Ausdruck, besonders der Mundbereich, wirkt verzerrt."
        },
        step1: {
            title: "Analyse: Mimik & Zunge",
            text: "Ein häufiger Fehler von KI-Modellen sind Gesichtsausdrücke. Bei diesem Beispiel ist die ausgestreckte Zunge anatomisch auffällig. Solche 'Glitches' in der Mimik sind ein starkes Warnsignal."
        },
        step2: {
            question: "Welches Bild ist KI-generiert?", 
            success: "Gut erkannt! Das linke Bild zeigt typische KI-Artefakte."
        },
        step3: {
            title: "Analyse: Details",
            text: "Wieder ein Auffälliger Gesichtsausdruck, ausserdem achte hier auf die Haare und die Lichtreflexionen. Die Haut wirkt zu glatt (wie wir in Level 2 gelernt haben) und die Faltenwurf der Kleidung sowie die Körperhaltung wirken steif und unlogisch."
        },
        step4: {
            question: "Welches Bild ist KI?",
            success: "Korrekt! Hier ist wieder ein Bild, das Fehler im Gesichtsausdruck aufweist."
        },
        step5: {
            title: "Level Abschluss",
            text: "Gesichter sind komplex. Achte auf leere Blicke, asymmetrische Augen, verschmelzende Zähne oder Zungen und Emotionen, die nicht ganz zum Rest des Gesichts passen."
        }
    },
    level5: {
        step0: {
            title: "Bildfehler & Logik",
            text: "Die sicherste Methode, KI-Bilder zu erkennen, ist die Suche nach physikalischen oder logischen Fehlern. KI 'versteht' die Welt nicht, sie rät nur Pixel. Das führt oft zu Fehlern, die in der Realität unmöglich wären."
        },
        step1: {
            question: "Welches Bild ist Generiert?",
            success: "Richtig! Das Bild ist der Fake."
        },
        step2: {
            title: "Analyse: Details",
            text: "Achte auf die Knöpfe der Jacke (ungleichmäßig), die Haare (verschmelzen) und besonders die Lampe im Hintergrund, die physikalisch unmöglich im Vordergrund hängt."
        },
        // Loop Texte
        search_task: "Finde die Fehler! Merke sie dir und klicke auf 'Lösung'.",
        check_question: "Hast du die markierten Fehler gefunden?",
        options: {
            yes: "Ja, alle gefunden",
            partly: "Einige",
            no: "Nein, übersehen"
        },
        feedback: "Übung macht den Meister. Achte auf Details im Hintergrund und an Rändern.",
        
        // Spezifische Hinweise pro Bild
        img11: "Achte auf Hintergrund und Kleidung.",
        img12: "Schau dir die Hände und die Umgebung genau an.",
        img48: "Hier stimmt etwas mit der Architektur nicht.",
        img67: "Achte auf Spiegelungen oder Schatten.",
        
        asymmetry: {
            title: "Symmetrie-Fehler",
            text: "Ein Klassiker: Brillen, Schmuck oder Kleidung sind oft asymmetrisch. Hier (Bild 63) ist das Brillengestell links und rechts völlig unterschiedlich."
        },
        finish: {
            title: "Level Abschluss",
            text: "Du hast jetzt den Blick für 'Glitches'. Wenn etwas physikalisch keinen Sinn ergibt (schwebende Lampen, halbe Brillen), ist es mit hoher Wahrscheinlichkeit KI."
        }
    },
        etappenQuiz: {
        intro: {
            title: "Zwischenprüfung: Was kannst du schon?",
            text: "Du hast viel über Hintergründe, Haut, Farben und Anatomie gelernt. Jetzt wird es ernst: 10 Bilder. Keine Hilfestellung. Finde die Fakes."
        },
        round: "Runde",
        finish: {
            title: "Prüfung beendet",
            text_perfect: "Wahnsinn! Du hast ein perfektes Auge entwickelt.",
            text_good: "Sehr gut! Du hast fast alle erkannt.",
            text_ok: "Nicht schlecht, aber achte noch mehr auf die Details.",
            score: "Dein Ergebnis:"
        }
    },
    level7: { // (bzw. level8 je nach deiner Zählung, hier als "Moderne KI" bezeichnet)
        step0: {
            title: "Moderne KIs & Kontext",
            text: "Moderne Modelle (wie das fiktive 'Gemini Banana Pro', released 26.11.2025) sind technisch fast perfekt. Haut, Licht und Schatten sind kaum noch von Fotos zu unterscheiden. Hier hilft nur noch: Der Kontext."
        },
        step1: {
            question: "Was ist an diesem Bild verdächtig?", // Vin Diesel an der Zapfsäule
            options: {
                quality: "Schlechte Bildqualität",
                scene: "Unwahrscheinliches Szenario",
                lighting: "Falsches Licht",
                filter: "Zu starker Filter"
            },
            feedback: "Richtig. Ein Selfie von Vin Diesel an einer heruntergekommenen Zapfsäule mit einem Fremden? Höchst unwahrscheinlich. Der Kontext (Promi + Banalität) ist der Verräter."
        },
        step2: {
            question: "Welches Bild ist manipulativ?", // Banane vs Weihnachtsmarkt
            success: "Genau. Das Bild zielt nur auf eine starke emotionale Reaktion ab. Solche 'Clickbait'-Bilder sind oft generiert."
        },
        step3: {
            title: "Social Media Analyse",
            text: "Du bekommst eine nachgebaute Instagram Oberfläche angezeigt. Schau dir die Accounts genau an. Wähle die accounts aus welche dir als Fake auffallen. Als Tip ;) Schau auf den Account! \n1. Wann wurde der Account erstellt? (Viele KI-Bots sind neu).\n2. Postet er NUR Bilder? (Videos sind schwerer zu faken).\n3. Verkaufen die Influencer Produkte trotz relativ geringer follower Zahl?"
        },
        feed: {
            task: "Finde die Fake-Accounts!",
            instruction: "Scrolle durch den Feed. Klicke auf die Namen, um das Profil zu prüfen. Markiere die Fake-Profile.",
            btn_check: "Überprüfen",
            success: "Super analysiert!",
            fail: "Nicht ganz. Schau auf das Datum der ersten Posts und die Bio. Oft erstellen Unternehmen Influencer Accounts, um Produkte zu bewerben. Viele fake-Nutzer verbreiten Falschmeldung, oft mit emotionalen Bildern um Reaktionen und Reichweite zu generieren.",
            analysis_influencer: "Die Influencerin 'Aisha' existiert erst seit Dezember 2025 (nach dem Release des neuen KI-Modells), postet nur Bilder, hat aber schon Brand Deals. Ein klassischer KI-Influencer.",
            analysis_news: "Der News-Account nutzt hoch-emotionale, generierte Bilder ohne Quellenangabe, um Wut oder Mitleid zu erzeugen."
        }
    },
};