export default {
    generic: {
        step: "Paso",
        next: "Siguiente",
        verify: "Comprobar",
        loading: "Cargando contenido...",
        finish: "Terminar nivel",
        understood: "Entendido",
        completeLevel: "Completar nivel",
        backToMap: "Volver a los niveles",
        image: "Imagen",
         correct: "¡Correcto!",
    wrong: "Incorrecto",
    nextRound: "Siguiente ronda"
    },
    navbar: {
        play: "Al juego",
        participate: "Participar",
        menu: "Menú",
        profile: "Mi Perfil",
        logout: "Cerrar sesión",
        streakSuffix: "º ¡RACHA!",
        info: "Info",
        leaderboard: "Clasificación",
        stats: "Estadísticas"
    },
    levels: {
        mainTitle: "Tu viaje",
        loading: "Cargando niveles...",
        level_1: "Quiz inicial",
        level_2: "Fondos",
        level_3: "Texturas de piel",
        level_4: "Color y saturación",
        level_5: "Expresiones",
        level_6: "Errores de imagen",
        level_7: "Quiz de etapa",
        level_8: "IAs modernas",
        level_9: "El final"
    },
    profile: {
        title: "Tu perfil",
        loading: "Cargando datos...",
        loggedAs: "Conectado como",
        emailLabel: "E-mail",
        fallbackName: "Detective",
        stats: {
            age: "Edad",
            internet: "Internet",
            skill: "Habilidad"
        },
        actions: {
            viewStats: "Ver estadísticas",
            logout: "Cerrar sesión"
        }
    },
    leaderboard: {
        title: "Top Detectives",
        description: "Los cazadores de IA más exitosos del estudio Detectino.",
        colRank: "#",
        colUser: "Usuario",
        colPoints: "Puntos",
        loading: "Buscando a los mejores...",
        meBadge: "TÚ",
        footer: "Tus puntos se actualizan tras completar cada nivel."
    },
    register: { // Mantengo el error "egister" por si es necesario para tu código
        title: "Participación y Perfil",
        errorGeneric: "Ha ocurrido un error. Por favor, inténtalo de nuevo.",
        aliasSection: "Tu Alias",
        usernameLabel: "Nombre de usuario (Opcional)",
        usernamePlaceholder: "Tu Alias",
        aboutSection: "Sobre ti",
        ageLabel: "Tu edad",
        genderLabel: "Género",
        genderOptions: {
            female: "Femenino",
            male: "Masculino",
            divers: "Diverso"
        },
        affinityLabel: "Afinidad con Internet",
        affinityLow: "Baja",
        affinityHigh: "Alta",
        skillLabel: "Conocimiento previo de IA",
        skillLow: "Bajo",
        skillHigh: "Experto",
        submitButton: "Empezar juego ahora",
        loading: "Cargando..."
    },
    welcome: {
        title: "Bienvenido a Detectino",
        intro: "Aprende a reconocer imágenes generadas por IA y prepárate contra la oleada de fakes.",
        button: "¡Vamos allá!"
    },
    explain: {
        title: "Cómo funciona",
        stepA: "Bienvenido a Detectino. Aquí aprenderás a identificar imágenes generadas por IA y a poner a prueba tus habilidades.",
        stepB: "En el siguiente paso se mostrarán tus niveles. Juega para desbloquear más contenido como '¿Real o IA?'.",
        stepC: "Echa un vistazo a la tabla de clasificación y compárate con otros. También encontrarás estadísticas de análisis en el menú.",
        stepD: "Detectino es un proyecto de investigación. Tus datos se recopilan de forma anónima. Encontrarás más información en 'Info'.",
        button: "¡Empezar!"
    },
    info: {
        title: "Sobre Detectino",
        description: "Detectino es un 'Serious Game' diseñado para enseñarte de forma didáctica a reconocer imágenes generadas por IA. El juego fue desarrollado por Nemo Ziener como parte de una tesis de grado. Todos los datos recopilados se procesan exclusivamente de forma anónima.",
        unsplashNote: "Esta aplicación utiliza la API de Unsplash, pero no está avalada ni certificada por Unsplash.",
        button: "¡Empezar!"
    },
    dashboard: {
        header: {
            title: "DATOS DE INVESTIGACIÓN",
            status: "DATOS EN VIVO",
            subtitle: "ANÁLISIS DE LAS CAPACIDADES DE DETECCIÓN DE IMÁGENES GENERADAS MEDIDAS POR DETECTINO"
        },
        kpis: {
            participants: "PARTICIPANTES",
            decisions: "TOTAL DE DECISIONES",
            accuracy: "PRECISIÓN GLOBAL",
            affinity: "AFINIDAD MEDIA"
        },
        tech: {
            title: "BRECHA TECNOLÓGICA",
            modern: "IA MODERNAS (NANO)",
            diff: "DIFERENCIA",
            loss: "PÉRDIDA DE PRECISIÓN EN MODELOS MODERNOS"
        },
        correlation: {
            title: "CORRELACIÓN DE AUTOESTIMACIÓN",
            self: "PERCEPCIÓN PROPIA (1-10)",
            reality: "REALIDAD (1-10)"
        },
        learning: {
            title: "CURVA DE APRENDIZAJE",
            analysis: "ANÁLISIS DE CLICS",
            fallback: "RESERVA DE PUNTUACIÓN"
        },
        demographics: {
            title: "DEMOGRAFÍA",
            age: "DISTRIBUCIÓN POR EDAD",
            gender: "RENDIMIENTO POR GÉNERO",
            yearsUnit: "Años"
        },
        funnel: {
            title: "EMBUDO DE RETENCIÓN",
            users: "USUARIOS",
            desc: "TASA DE FINALIZACIÓN POR NIVEL BASADA EN EL TOTAL DE PARTICIPANTES"
        }
    },
  level0: {
        loading: "Cargando el quiz inicial...",
        introTitle: "El Quiz de la Verdad",
        introText: "¿Real o generado? Pon a prueba tu instinto con 10 imágenes individuales. Esta es la primera medición de tus habilidades antes de comenzar el entrenamiento.",
        startBtn: "Empezar Quiz",
        questionText: "¿Qué imagen ha sido generada?",
        endTitle: "Evaluación finalizada",
        endText: "Has terminado el quiz inicial con éxito. Tu puntuación ha sido guardada y ahora puedes comenzar el entrenamiento en el mapa.",
    },
    level1: {
        title: "Nivel 2: Fondos",
        loading: "Sincronizando imágenes...",
        endTitle: "¡Nivel completado!",
        endText: "Los fondos ya no tienen secretos para ti.",
        introTitle: "El Quiz de la Verdad",
        introText: "¿Real o generado? Pon a prueba tu instinto con 10 imágenes individuales. Esta es la primera medición de tus habilidades.",
        startBtn: "Empezar Quiz",
        endTitle: "Análisis finalizado",
        endText: "Has terminado el quiz inicial. Tu puntuación ha sido guardada.",
        step0: {
            question: "¿Qué imagen ha sido generada?",
            success: "¡Correcto! Esa es la imagen generada."
        },
        step1: {
            title: "Análisis: Escala, proporción y consistencia",
            text: "Aquí vemos un ejemplo típico de fondos inconsistentes. El hombre parece real, pero la escala del laberinto no encaja con su tamaño. Además, el área detrás del laberinto muestra de repente una escala de paisaje completamente diferente."
        },
        step2: {
            question: "¿Están generadas estas imágenes?",
            options: {
                none: "Ambas son reales",
                both: "Ambas son generadas",
                left: "Nº 1",
                right: "Nº 2"
            },
            feedback: {
                success: "¡Perfecto! Ambas son generadas.",
                fail: "Ambas son generadas. Fíjate en el fondo distorsionado y en la piel del niño. En el caso del hombre, las gafas son muy llamativas y están demasiado desenfocadas para lo cerca que está de la pared."
            }
        },
        step3: {
            title: "Análisis de errores: Fondo dividido",
            text: "¡Casi! Fíjate aquí en el fondo: el objeto central (la persona) lo divide en dos. A la izquierda, el bosque está totalmente borroso; a la derecha, la estructura se ve completamente diferente. Un error de generación clásico."
        },
        step4: {
            title: "Análisis de errores: Texturas",
            text: "Mira la pared de cerca. Está demasiado desenfocada para lo cerca que está el hombre apoyado en ella. Este desenfoque no parece un efecto 'bokeh' real de una cámara, sino simplemente pastoso y borroso."
        },
        step5: {
            question: "¿En qué imagen el fondo indica que es una generación?",
            success: "¡Exacto! El hombre separa el fondo: a la izquierda una cabaña, a la derecha de repente un bosque. No encaja."
        },
        step6: {
            title: "¿Qué notas en el fondo?",
            subtitle: "Selecciona todos los términos que correspondan.",
            terms: {
                blurred: "Texturas borrosas",
                inconsistent: "Rasgos inconsistentes",
                unrealistic: "Representación poco realista",
                lighting: "Errores en la luz y las sombras"
            },
            feedback: "La solución es: ¡Todos se aplican! Estos tipos de errores suelen solaparse."
        },
        step7: {
            title: "Fin del Nivel",
            text: "Has aprendido a fijarte en el fondo: busca texturas borrosas, objetos inconsistentes a izquierda/derecha y sombras ilógicas. Estos errores suelen delatar la generación, aunque el rostro parezca perfecto."
        }
    },
    level2: {
        title: "Nivel 3: Texturas de la piel",
        loading: "Cargando detalles de la piel...",
        endTitle: "¡Nivel completado!",
        endText: "Has demostrado que tienes buen ojo para los detalles de la piel.",
        step0: {
            question: "¿Qué imagen ha sido generada?",
            success: "¡Correcto!"
        },
        step1: {
            question: "¿Qué es lo que más indica una generación aquí?",
            options: {
                skin: "Textura de la piel",
                nose: "Nariz",
                eyes: "Ojos",
                hair: "Pelo"
            },
            feedback: "¡Exacto! En las imágenes generadas, la piel suele parecer demasiado suave o 'cerosa'.",
            fail: "Fíjate en las texturas de la piel: si es demasiado lisa o brillante, suele parecer artificial."
        },
        step2: {
            title: "Análisis: La piel",
            text: "La piel real es mate y porosa. Los modelos de IA suelen representar la piel demasiado lisa, muy brillante o con una uniformidad poco natural. Esto suele ser una mejor señal de alerta que los errores obvios."
        },
        step3: {
            question: "¿Qué imágenes parecen generadas? (Selección múltiple)",
            success: "¡Muy bien! Reconoces el 'look plástico'.",
            fail: "Fíjate en las texturas de la piel: demasiado lisa o brillante suele parecer artificial."
        },
        step4: {
            question: "¿Qué destaca en esta imagen?",
            subtitle: "Selecciona todas las características que correspondan.",
            terms: {
                smooth: "Piel de figura de cera",
                wrinkles: "Arrugas artificiales",
                eyes: "Color de ojos",
                tattoos: "Tatuajes"
            },
            feedback: "Correcto. La piel es demasiado lisa para la edad y las arrugas fluyen de forma poco natural. Los ojos azules o los tatuajes faciales son raros, pero no necesariamente un indicador."
        },
        step5: {
            title: "Comparación: Arrugas",
            text: "Imagen 1 (IA): Las arrugas parecen 'pintadas' o desaparecen en lugares poco naturales. Derecha (Real): Las arrugas siguen la musculatura y tienen profundidad."
        },
        step6: {
            title: "Fin del Nivel",
            text: "Has aprendido a fijarte en las texturas de la piel. La 'piel de cera' y las arrugas poco naturales son fuertes indicadores de imágenes de IA."
        }
    },
    level3: {
        title: "Nivel 4: Colores y Saturación",
        loading: "Cargando análisis de color...",
        endTitle: "¡Nivel completado!",
        endText: "Ahora tienes buen ojo para la saturación artificial y los contrastes exagerados.",
        step0: {
            question: "¿Qué imagen ha sido generada?",
            success: "¡Correcto! La imagen de la izquierda es la generada."
        },
        step1: {
            question: "¿Por qué esta imagen parece falsa?",
            options: {
                colors: "Color y piel",
                bg: "Oreja",
                hat: "Accesorio en la cabeza",
                eyes: "Color de ojos"
            },
            feedback: "Correcto. Los colores hipersaturados como estos son un indicio; la piel 'brilla' de forma artificial."
        },
        step2: {
            question: "¿Qué afirmación es correcta?",
            options: {
                all: "Todas las imágenes generadas están hipersaturadas",
                indicator: "La hipersaturación es un indicador de generación",
                none: "La hipersaturación no significa nada"
            },
            feedback: "Exacto. No todas, pero muchas imágenes generadas tienen problemas con colores demasiado intensos, especialmente en los tonos de piel."
        },
        step3: {
            question: "¿Qué imagen tiene un error de color?",
            success: "¡Correcto! Un pelo turquesa en un niño pequeño es extremadamente improbable."
        },
        step4: {
            title: "Error de contexto",
            text: "A menudo, las imágenes generadas tienen errores de color que solo se notan por el contexto. Un niño con el pelo turquesa perfectamente teñido es muy raro en la realidad y, por tanto, una señal de generación."
        },
        step5: {
            title: "¿Qué notas aquí?",
            subtitle: "Selecciona todas las características que correspondan.",
            terms: {
                skin: "Piel hipersaturada",
                eyes: "Ojos irreales",
                makeup: "Error en el fondo",
                smooth: "Piel demasiado suave"
            },
            feedback: "Esta imagen es un ejemplo perfecto del aspecto 'sobreprocesado' de las imágenes generadas y de los colores distorsionados que no ocurren así en la realidad."
        },
        step6: {
            title: "Análisis:",
            text: "A la derecha ves un mapa. Allí se marcan de nuevo las zonas de error: especialmente en la cara, los colores y texturas son demasiado perfectos y suaves."
        },
        step7: {
            question: "¡Asigna los errores!",
            terms: {
                hair: "Pelo irreal",
                sat: "Hipersaturación",
                smooth: "Piel de plástico"
            },
            success: "¡Asignado perfectamente! Estás desarrollando un gran ojo para los detalles.",
            fail: "Fíjate en el color del pelo (rojo), la piel con demasiado contraste y el suave 'look plástico'."
        },
        step8: {
            title: "Fin del Nivel",
            text: "Los colores son un fuerte indicio. Busca piel 'brillante', colores de pelo ilógicos en su contexto y el aspecto general de 'filtro de Instagram' que muchos modelos de IA generan por defecto."
        }
    },
    level4: {
        title: "Nivel 5: Expresiones faciales",
        loading: "Preparando análisis de expresiones...",
        endTitle: "¡Nivel completado!",
        endText: "Ahora reconoces incluso errores sutiles en la mímica facial.",
        step0: {
            question: "¿Qué notas aquí?",
            options: {
                pose: "Postura poco natural",
                nothing: "Nada llamativo",
                expression: "Anatomía y mímica poco naturales",
                bg: "Fondo incorrecto"
            },
            feedback: "Correcto. La expresión, especialmente la zona de la boca, parece distorsionada.",
            fail: "Fíjate en la mímica y la postura: las expresiones faciales y posturas corporales poco naturales suelen ser señal de IA."
        },
        step1: {
            title: "Análisis: Mímica y Lengua",
            text: "Un error común de los modelos de IA son las expresiones faciales. En este ejemplo, la lengua sacada junto con su postura es anatómicamente extraña. Estos errores en la mímica son una fuerte señal de advertencia."
        },
        step2: {
            question: "¿Qué imagen ha sido generada?",
            success: "¡Bien visto! La imagen de la izquierda muestra artefactos típicos.",
            fail: "Fíjate en la piel, los colores y los rasgos faciales."
        },
        step3: {
            title: "Análisis: Detalles",
            text: "De nuevo una expresión facial llamativa; además, fíjate aquí en el pelo y los reflejos de luz. La piel parece demasiado suave (como aprendimos en el Nivel 2). También son llamativos las arrugas de la cara y los patrones de la ropa."
        },
        step4: {
            question: "¿Qué imagen ha sido generada?",
            success: "¡Correcto! Por lo general, fíjate en que los personajes en las imágenes generadas suelen mirar directamente a la cámara.",
            fail: "Fíjate en la mímica: expresiones faciales poco naturales o una persona alterada en un retrato perfecto suelen ser señales de que las imágenes son generadas."
        },
        step5: {
            title: "Fin del Nivel",
            text: "Los rostros son complejos. Busca miradas vacías, ojos asimétricos, dientes o lenguas que se fusionan y emociones que no encajan del todo con el resto de la cara."
        }
    },
    level5: {
        title: "Nivel 6: Reconocer errores de imagen",
        searching: "Buscando todos los errores...",
        unlocked: "¡La solución ha sido desbloqueada!",
        verify: "Finalizado",
        check_question: "¿Has encontrado todos los errores marcados?",
        endTitle: "¡Nivel completado!",
        options: { yes: "Sí, todos encontrados", no: "No todos" },
        disclaimer: "Las marcas se basan en encuestas de usuarios de estudios piloto y sirven de orientación. No siempre son perfectas.",
        step0: {
            title: "Errores de imagen y lógica",
            text: "Un buen método para reconocer imágenes generadas es buscar errores físicos o lógicos. La IA no 'entiende' el mundo, solo adivina píxeles. Esto suele llevar a errores que serían imposibles en la realidad."
        },
        step1: {
            question: "¿Qué imagen ha sido generada?",
            success: "¡Correcto! Esa imagen es el fake."
        },
        step2: {
            title: "Análisis: Detalles",
            text: "Fíjate en los botones de la chaqueta (irregulares), el pelo (se fusiona) y especialmente la lámpara del fondo, que físicamente es imposible que cuelgue en el primer plano."
        },
        search_task: "¡Busca los errores! Recuérdalos y haz clic en 'Solución'.",
        options: {
            yes: "Sí, todos encontrados",
            partly: "Algunos",
            no: "No, se me pasaron"
        },
        feedback: "La práctica hace al maestro. Fíjate en los detalles del fondo y en los bordes.",
        img11: "Fíjate en el fondo y en la ropa.",
        img12: "Mira atentamente las manos y el entorno.",
        img48: "Aquí algo no cuadra con la arquitectura.",
        img67: "Busca reflejos o sombras.",
        asymmetry: {
            title: "Errores de simetría",
            text: "Un clásico: gafas, joyas o ropa suelen ser asimétricos. Aquí, la montura de las gafas es completamente diferente a la izquierda y a la derecha."
        },
        finish: {
            title: "Fin del Nivel",
            text: "Ahora tienes buen ojo para los 'glitches'. Si algo no tiene sentido físico (lámparas flotantes, gafas a medias), es muy probable que sea IA."
        },
        step_text: {
            question: "¿Puedes encontrar el texto ilógico en la imagen?",
            title: "Escritura artificial",
            text: "¿Te has fijado? El texto del fondo es ilegible. No es solo por la distancia, sino porque las IA a menudo no pueden generar escritura real. En su lugar, crean formas que solo parecen letras (el llamado 'gibberish')."
        },
        step_fingers: {
            question: "Una imagen tiene problemas con la anatomía de las manos. ¿Cuál?",
            title: "Demasiados dedos",
            text: "Las manos son una de las mayores debilidades de las IA. A menudo, los dedos se fusionan entre sí o la IA simplemente genera seis o más dedos en una mano. También son comunes las curvaturas poco naturales."
        },
        step_legs: {
            question: "¿Reconoces el error en la parte inferior de la imagen?",
            title: "Piernas imposibles",
            text: "En las tomas de cuerpo completo, la IA a menudo pierde el control de las extremidades. Aquí, una pierna crece desde el cuerpo en un lugar anatómicamente imposible."
        }
    },
    etappenQuiz: {
        intro: {
            title: "Examen intermedio: ¿Qué sabes ya?",
            text: "Has aprendido mucho sobre fondos, piel, colores y anatomía. Ahora la cosa va en serio: 10 imágenes. Sin ayuda. Encuentra los fakes."
        },
        round: "Ronda",
        finish: {
            title: "Examen finalizado",
            text_perfect: "¡Increíble! Has desarrollado un ojo perfecto.",
            text_good: "¡Muy bien! Has reconocido casi todos.",
            text_ok: "No está mal, pero fíjate aún más en los detalles.",
            score: "Tu resultado:"
        }
    },
    level7: {
        loading: "Cargando quiz de etapa...",
        introTitle: "El Quiz de Etapa",
        introText: "¿Estás listo para el Quiz 2? Demuestra lo que has aprendido.",
        startBtn: "Empezar Quiz",
        roundLabel: "Ronda",
        questionText: "¿Real o generado?",
        endTitle: "Estado intermedio",
        endText: "Excelente. Has completado la segunda etapa del estudio. Tu progreso ha sido guardado.",
    },
    level8: {
        title: "Nivel 8: IAs modernas",
        loading: "Simulando entorno de Redes Sociales...",
        endTitle: "¡Nivel 8 completado!",
        step0: {
            title: "Generaciones modernas y contexto",
            text: "Los modelos modernos (aproximadamente desde el 26.11.2025) son técnicamente casi perfectos. La piel, la luz y las sombras apenas se distinguen de las fotos. Aquí lo único que suele ayudar es: El contexto."
        },
        step1: {
            question: "¿Qué resulta sospechoso en esta imagen?",
            options: {
                quality: "Mala calidad de imagen",
                scene: "Escenario improbable",
                filter: "Filtro demasiado fuerte"
            },
            feedback: "Correcto. Un selfie de una persona famosa en un contexto histórico o privado totalmente fuera de lugar es muy poco probable. El contexto es el delator.",
            fail: "¿Se ajusta la escena a la persona y a la época? Mira bien."
        },
        step2: {
            question: "¿Qué imagen es manipuladora?",
            success: "¡Correcto! Esta imagen es la típica foto 'clickbait' diseñada para despertar emociones fuertes. En Alemania se difundió una imagen muy parecida a finales de 2025 y se hizo viral.",
            fail: "Fíjate en las emociones: las imágenes clickbait buscan generar ira o compasión. Suelen estar generadas para ganar alcance rápidamente."
        },
        step3: {
            title: "Análisis de Redes Sociales",
            text: "Se mostrará una interfaz de Instagram simulada. Observa las cuentas con atención. Marca las cuentas que te parezcan falsas.\n\nConsejos para el análisis:\n1. ¿Cuándo se creó la cuenta? (Muchos bots de IA son muy recientes).\n2. ¿Solo publica imágenes? (Los vídeos son más difíciles de falsificar).\n3. ¿Venden productos los influencers a pesar de tener pocos seguidores?"
        },
        feed: {
            ad: "Anuncio",
            instruction: "Desliza por el feed. Haz clic en los nombres para revisar el perfil. Marca los perfiles que consideres falsos.",
            joined: "Miembro desde",
            business: "Cuenta comercial",
            report: "Reportar como falso",
            marked: "🚩 Marcado",
            success: "¡Excelente análisis! Has desenmascarado a los bots y las cuentas manipuladoras.",
            fail: "No del todo. Fíjate en la fecha de las primeras publicaciones y en la descripción del usuario. A menudo, las empresas crean cuentas de influencers solo para publicidad. Muchos perfiles falsos también difunden noticias falsas con imágenes emocionales generadas."
        },
        analysis: {
            title: "Análisis de los bots",
            text: "Reconocer bots significa revisar el contexto. 'Lara_Life', por ejemplo, ganó 280k seguidores en solo un mes, una señal clara de crecimiento artificial y de una cuenta bot."
        },
        finish: {
            title: "Conclusión",
            text: "¡Felicidades! Has terminado con éxito el Nivel 8. Ya estás listo para el quiz final."
        }
    },
    level9: {
        loading: "Preparando la gran final...",
        introTitle: "La Final",
        introText: "Solo nuestras mejores imágenes de IA. Esta es la prueba final de tus habilidades. ¿Estás listo?",
        startBtn: "Empezar ahora",
        roundLabel: "Ronda final",
        endTitle: "¡Estudio completado!",
        endText: "¡Excelente! Has terminado el entrenamiento y todas las pruebas. Tu contribución es extremadamente valiosa para nuestra investigación sobre la capacidad de detección de imágenes generadas por parte de los usuarios.",
        viewLeaderboard: "Ver tabla de clasificación"
    },
    spotTheFake: {
        deselect: "Deseleccionar",
        select: "Seleccionar esta imagen",
        wrongTitle: "No del todo...",
        wrongDefault: "Elige otra imagen e inténtalo de nuevo.",
        successDefault: "¡Correcto!",
        timeout: "¡TIEMPO AGOTADO!",
        photosBy: "Fotos de",
        onUnsplash: "en Unsplash",
        badges: {
            selected: "ELEGIDA",
            real: "REAL",
            ai: "IA"
        }
    },
    singleChoice: {
        lockedMessage: "Buscando errores en la imagen...",
        surveyFeedback: "¡Gracias por tu valoración!",
        wrongDefault: "No es del todo correcto."
    },
    realOrFake: {
        timeout: "¡TIEMPO AGOTADO!",
        real: "REAL",
        ai: "GENERADA",
        badges: {
            correct: "CORRECTO",
            wrong: "FALSO"
        },
        feedback: {
            correct: "¡Bien hecho!",
            wrong: "Lamentablemente incorrecto."
        },
        explanation: {
            is: "Esta imagen es ",
            ai: "generada por IA.",
            real: "una foto real."
        },
        credits: {
            by: "Foto de ",
            on: " en Unsplash"
        }
    },
    multiCheck: {
        defaultQuestion: "¿Cuáles de estas imágenes son generadas?",
        options: {
            none: "Ambas reales",
            both: "Ambas generadas",
            left: "La n.º 1 es generada",
            right: "La n.º 2 es generada"
        },
        feedback: {
            success: "¡Muy bien! Has valorado correctamente ambas imágenes.",
            fail: "No es del todo correcto. Revisa de nuevo los detalles de los fondos."
        }
    },
    imageMatching: {
        step1: "<strong>Paso 1:</strong> Elige un término.",
        step2: "<strong>Paso 2:</strong> Toca la imagen correspondiente.",
        finished: "Análisis completado",
        zoomHint: "Toca una imagen sin texto para ampliarla.",
        failDefault: "No es del todo correcto. Las asociaciones correctas están marcadas."
    },
    gridSelect: {
        loading: "Cargando set...",
        selectedBadge: "ELEGIDA",
        deselect: "Deseleccionar",
        select: "Marcar como IA",
        error: "¡Incorrecto! ¡Inténtalo de nuevo!",
        successDefault: "¡Correcto!",
        aiBadge: "IA"
    },
    conceptTagging: {
        errorDefault: "No es del todo correcto. Faltan características o son erróneas."
    },
    analysis: {
        altText: "Análisis de imagen"
    }
};