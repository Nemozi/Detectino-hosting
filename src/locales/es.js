export default {
    generic: {
        correct: "¡Correcto!",
        wrong: "Incorrecto",
        step: "Paso",
        next: "Siguiente",
        verify: "Comprobar",
        loading: "Cargando contenido...",
        finish: "Terminar nivel",
        understood: "Entendido",
        completeLevel: "Completar nivel",
        backToMap: "Volver a los niveles",
        image: "Imagen",
        nextRound: "Siguiente ronda",
    },
    didactic: {
        title: "¿Por qué comete errores la IA?",
        intro: "Antes de empezar, aprende el principio más importante para tu análisis:",
        point1_title: "Sin comprensión del mundo",
        point1_text: "Las IA son calculadoras estadísticas, no artistas. No saben qué es una 'mano' o la 'física'.",
        point2_title: "Probabilidad de píxeles",
        point2_text: "Solo calculan qué píxeles podrían encajar estadísticamente uno al lado del otro.",
        point3_title: "Lagunas lógicas",
        point3_text: "Como solo conocen el mundo como patrones planos, a menudo fallan en la lógica (ej. 6 dedos o sombras erróneas).",
        button: "¡Entendido, empezar!"
    },
    navbar: {
        play: "Jugar",
        participate: "Participar",
        menu: "Menú",
        profile: "Mi perfil",
        logout: "Cerrar sesión y salir",
        streakSuffix: " días de RACHA!",
        info: "Información",
        leaderboard: "Clasificación",
        stats: "Estadísticas"
    },
levels: {
        mainTitle: "Tu viaje",
        loading: "Cargando niveles...",
        level_1: "Quiz 1: Cuestionario de entrada",
        level_2: "Unidad de aprendizaje: Fondos",
        level_3: "Unidad de aprendizaje: Texturas de piel",
        level_4: "Unidad de aprendizaje: Colores y saturación",
        level_5: "Unidad de aprendizaje: Expresiones faciales y postura",
        level_6: "Unidad de aprendizaje: Reconocer errores de imagen",
        level_7: "Quiz 2: Cuestionario de etapa",
        level_8: "Unidad de aprendizaje: Modelos modernos y contexto",
        level_9: "Quiz 3: El final"
    },
    profile: {
        title: "Tu perfil",
        loading: "Cargando datos...",
        loggedAs: "Conectado como",
        emailLabel: "Correo electrónico",
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
        loading: "Buscando a los mejores cazadores...",
        meBadge: "TÚ",
        footer: "Tus puntos se actualizan después de completar cada nivel."
    },
    register: {
        title: "Participación y Perfil",
        errorGeneric: "Ha ocurrido un error. Por favor, inténtalo de nuevo.",
        aliasSection: "Tu alias",
        usernameLabel: "Nombre de usuario (Opcional)",
        usernamePlaceholder: "Tu alias",
        aboutSection: "Sobre ti",
        ageLabel: "Tu edad",
        genderLabel: "Género",
        genderOptions: {
            female: "Femenino",
            male: "Masculino",
            divers: "Diverso"
        },
        affinityLabel: "Afinidad con internet",
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
        intro: "Aprende a reconocer imágenes generadas por IA y prepárate contra la avalancha de fakes.",
        button: "¡Vamos allá!"
    },
    explain: {
        title: "Cómo funciona",
        stepA: "Bienvenido a Detectino. Aquí aprenderás a reconocer imágenes generadas por IA y a poner a prueba tus habilidades.",
        stepB: "En el siguiente paso verás tus niveles. Juega para desbloquear más contenido como '¿Real o IA?'.",
        stepC: "Echa un vistazo a la clasificación y compárate con otros. También encontrarás estadísticas de evaluación en el menú.",
        stepD: "Detectino es un proyecto de investigación. Tus datos se recogen de forma anónima. Más info en 'Información'.",
        button: "¡Vamos allá!"
    },
    info: {
        title: "Sobre Detectino",
        description: "Detectino es un Serious Game diseñado para enseñarte a reconocer imágenes generadas por IA de forma didáctica. El juego fue desarrollado por Nemo Ziener como parte de su tesis de licenciatura. Todos los datos recogidos se procesan de forma exclusivamente anónima.",
        unsplashNote: "Esta aplicación utiliza la API de Unsplash, pero no está avalada ni certificada por Unsplash. Las imágenes generadas proceden del conjunto de datos AIS-4SD o han sido generadas por nosotros mismos.",
        button: "¡Vamos allá!"
    },
 dashboard: {
    loading: "CARGANDO DATOS...",
    header: {
      title: "ANÁLISIS DE RESULTADOS | DETECTINO",
      status: "DATOS EN VIVO",
      subtitle: "Evaluación científica del estudio de participantes"
    },
    kpis: {
      participants: "PARTICIPANTES (N)",
      phase1: "FASE 1 (Q1 ➞ Q2)",
      phase2: "FASE 2 (Q2 ➞ Q3)",
      precision: "PRECISIÓN Ø"
    },
    sections: {
      modelComparison: "Efecto de aprendizaje: Comparación de modelos",
      quizTimeline: "Cronología de cuestionarios (Ø)",
      learningCurve: "Curva de aprendizaje en todos los niveles",
      retentionFunnel: "Embudo de retención"
    },
    charts: {
      standard: "Estándar",
      nano: "Nano",
      quizResult: "Resultado del cuestionario",
      learningUnit: "Unidad de aprendizaje",
      graduates: "Graduados"
    }
},
    level0: {
        loading: "Cargando cuestionario de entrada...",
        introTitle: "Level 1: Cuestionario de entrada",
        introText: "¿Real o generado? Pon a prueba tu instinto con 10 imágenes individuales. Esta es la primera medición de tus habilidades antes de empezar el entrenamiento.",
        questionText: "¿Qué imagen ha sido generada?",
        startBtn: "Empezar cuestionario",
        endTitle: "Evaluación completada",
        endText: "Has terminado con éxito el cuestionario de entrada. Tu puntuación ha sido guardada y ahora puedes empezar el entrenamiento en el mapa.",
    },
    level1: {
        title: "Level 2",
        loading: "Sincronizando imágenes...",
        endTitle: "¡Nivel completado!",
        endText: "Los fondos ya no tienen secretos para ti.",
        introTitle: "El cuestionario de la verdad",
        introText: "¿Real o generado? Pon a prueba tu instinto con 10 imágenes individuales. Esta es la primera medición de tus habilidades.",
        startBtn: "Empezar cuestionario",
        step0: {
            question: "¿Qué imagen ha sido generada?",
            success: "¡Correcto! Esa es la imagen generada."
        },
        step1: {
            title: "Análisis: Escala, proporción y consistencia",
            text: "Aquí ves un error típico: la IA presta atención a los detalles, pero pierde de vista el conjunto. El hombre puede parecer real, pero el laberinto detrás de él es demasiado pequeño; las proporciones simplemente no encajan."
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
                fail: "Ambas son generadas. Fíjate en el fondo distorsionado del niño y en su piel. En el hombre, las gafas son muy llamativas y el fondo está demasiado desenfocado para lo cerca que está de la pared."
            }
        },
        step3: {
            title: "Análisis de errores: Fondo dividido",
            text: "¡Casi! Fíjate en el fondo: está prácticamente 'dividido en dos' por el objeto central (la persona). A la izquierda el bosque está totalmente borroso, a la derecha la estructura parece completamente distinta. Un error clásico de generación."
        },
        step4: {
            title: "Análisis de errores: Texturas",
            text: "Mira la pared con atención. Está demasiado borrosa para lo cerca que está el hombre apoyado en ella. Este desenfoque no parece un efecto 'bokeh' real (profundidad de campo) de una cámara, sino simplemente pastoso y emborronado."
        },
        step5: {
            question: "¿En qué imagen el fondo indica que es una generación?",
            success: "¡Correcto! El hombre separa el fondo: a la izquierda una cabaña, a la derecha de repente un bosque. No encaja."
        },
        step6: {
            title: "¿Qué te llama la atención del fondo?",
            subtitle: "Selecciona todos los términos que correspondan.",
            terms: {
                blurred: "Texturas borrosas",
                inconsistent: "Rasgos inconsistentes",
                unrealistic: "Representación poco realista",
                lighting: "Errores en la luz y las sombras"
            },
            feedback: "La solución es: ¡Todo es correcto! Estos tipos de errores suelen solaparse."
        },
        step7: {
            title: "Fin del nivel",
            text: "En resumen: los fondos suelen delatar a la IA mediante transiciones ilógicas. Fíjate si los objetos a izquierda y derecha de una persona realmente pertenecen al mismo conjunto o si las líneas del fondo se cortan de repente."
        }
    },
    level2: {
        title: "Level 3",
        loading: "Cargando detalles de la piel...",
        endTitle: "¡Nivel completado!",
        endText: "Has demostrado que tienes buen ojo para los detalles de la piel.",
        step0: {
            question: "¿Qué imagen ha sido generada?",
            success: "¡Correcto!"
        },
        step1: {
            question: "¿Qué es lo que más indica aquí una generación?",
            options: {
                skin: "Textura de la piel",
                nose: "Nariz",
                eyes: "Ojos",
                hair: "Pelo"
            },
            feedback: "¡Exacto! En las imágenes generadas, la piel suele parecer demasiado lisa o 'cerosa'.",
            fail: "Fíjate en las texturas de la piel: demasiado lisa o brillante suele parecer poco natural."
        },
        step2: {
            title: "Análisis: La piel",
            text: "Los modelos de IA suelen tender a la exageración. Como la IA no conoce los poros reales ni el vello fino, la piel suele parecer 'planchada' o cerosa, casi como una muñeca o de plástico. Si una cara brilla demasiado perfectamente, es una señal de alarma clara."
        },
        step3: {
            question: "¿Qué imágenes parecen generadas? (Selección múltiple)",
            success: "¡Muy bien! Reconoces el 'aspecto de plástico'.",
            fail: "Fíjate en las texturas de la piel: demasiado lisa o brillante suele parecer poco natural."
        },
        step4: {
            question: "¿Qué destaca en esta imagen?",
            subtitle: "Selecciona todas las características que correspondan.",
            terms: {
                smooth: "Piel de figura de cera",
                wrinkles: "Arrugas poco naturales",
                eyes: "Color de ojos",
                tattoos: "Tatuajes"
            },
            feedback: "Correcto. La piel es demasiado lisa para la edad y las arrugas fluyen de forma poco natural. Los ojos azules o los tatuajes en la cara son raros, pero no necesariamente un indicador."
        },
        step5: {
            title: "Comparación: Arrugas",
            text: "Imagen 1 (IA): Las arrugas parecen 'pintadas' o desaparecen en lugares poco naturales. En la real, las arrugas siguen la musculatura y tienen profundidad."
        },
        step6: {
            title: "Fin del nivel",
            text: "Has aprendido a fijarte en las texturas de la piel. La 'piel de cera' y las arrugas irreales son fuertes indicadores de imágenes de IA."
        }
    },
    level3: {
        title: "Level 4",
        loading: "Cargando análisis de color...",
        endTitle: "¡Nivel completado!",
        endText: "Ahora tienes buen ojo para la saturación poco natural y los contrastes exagerados.",
        step0: {
            question: "¿Qué imagen ha sido generada?",
            success: "¡Correcto! La imagen de la izquierda es la generada."
        },
        step1: {
            question: "¿Por qué esta imagen parece falsa?",
            options: {
                colors: "Color y piel",
                bg: "Boca",
                hat: "Sombrero",
                eyes: "Color de ojos"
            },
            feedback: "Correcto. Los colores hipersaturados como estos son un indicio; la piel 'brilla' de forma poco natural."
        },
        step2: {
            question: "¿Qué afirmación es correcta?",
            options: {
                all: "Todas las imágenes generadas están saturadas",
                indicator: "La sobresaturación es un indicador de generación",
                none: "La sobresaturación no significa nada"
            },
            feedback: "Exacto. No todas, pero muchas imágenes generadas tienen problemas con colores demasiado intensos, especialmente en los tonos de piel."
        },
        step3: {
            question: "¿Qué imagen tiene un error de color?",
            success: "¡Correcto! El pelo turquesa en un niño pequeño es extremadamente improbable."
        },
        step4: {
            title: "Error de contexto",
            text: "A menudo, las imágenes generadas tienen errores de color que solo se notan en el contexto. Un niño con el pelo turquesa perfectamente teñido es muy raro en la realidad y, por tanto, un signo de generación."
        },
        step5: {
            title: "¿Qué notas aquí?",
            subtitle: "Selecciona todos los rasgos que correspondan.",
            terms: {
                skin: "Piel sobresaturada",
                eyes: "Ojos irreales",
                makeup: "Error de fondo",
                smooth: "Piel demasiado suave"
            },
            feedback: "Esta imagen es un ejemplo perfecto del aspecto 'sobreprocesado' de las imágenes generadas y los colores distorsionados que no se dan en la realidad."
        },
        step6: {
            title: "Análisis:",
            text: "En la segunda imagen ves un mapa. Allí están marcadas de nuevo las zonas de error: especialmente en la cara, los colores y las texturas son demasiado perfectos y suaves."
        },
        step7: {
            question: "¡Asigna los errores!",
            terms: {
                hair: "Pelo irreal",
                sat: "Sobresaturación",
                smooth: "Piel de plástico"
            },
            success: "¡Asignado perfectamente! Estás desarrollando un ojo para los detalles.",
            fail: "Fíjate en el color del pelo (rojo), la piel con demasiado contraste y el aspecto suave de 'plástico'."
        },
        step8: {
            title: "Fin del nivel",
            text: "Los colores son un fuerte indicio. Busca pieles que 'brillan', colores de pelo ilógicos en el contexto y el aspecto general de 'filtro de Instagram' que muchos modelos de IA crean por defecto."
        }
    },
    level4: {
        title: "Level 5",
        loading: "Preparando análisis de mímica...",
        endTitle: "¡Nivel completado!",
        endText: "Ahora reconoces incluso errores sutiles en la mímica.",
        step0: {
            question: "¿Qué notas aquí?",
            options: {
                pose: "Postura poco natural",
                nothing: "Nada llamativo",
                expression: "Anatomía y mímica poco naturales",
                bg: "Fondo incorrecto"
            },
            feedback: "Correcto. La expresión, especialmente la zona de la boca, parece distorsionada.",
            fail: "Fíjate en la mímica y la postura: las expresiones faciales y las posturas corporales poco naturales suelen ser un signo de IA."
        },
        step1: {
            title: "Análisis: Mímica y lengua",
            text: "Un error común de los modelos de IA son las expresiones faciales. En este ejemplo, la lengua fuera junto con su postura es anatómicamente llamativa. Estos errores en la mímica son una fuerte señal de advertencia."
        },
        step2: {
            question: "¿Qué imagen ha sido generada?",
            success: "¡Bien reconocido! La imagen de la izquierda muestra artefactos típicos.",
            fail: "Fíjate en la piel, los colores y los rasgos faciales."
        },
        step3: {
            title: "Análisis: Detalles",
            text: "Otra expresión facial llamativa, además fíjate aquí en el pelo y los reflejos de luz. La piel parece demasiado lisa. Además, las arrugas en la cara y los patrones en la ropa son sospechosos."
        },
        step4: {
            question: "¿Qué imagen ha sido generada?",
            success: "¡Correcto! En general, fíjate en que los personajes de las imágenes generadas suelen mirar directamente a la cámara.",
            fail: "Fíjate en la mímica: expresiones poco naturales o una persona excitada en un retrato perfecto suelen ser señales de que las imágenes son generadas."
        },
        step5: {
            title: "Fin del nivel",
            text: "Las caras son extremadamente complejas. Busca la 'mirada vacía' o una sonrisa que parezca algo distorsionada. Como la IA no conoce sentimientos reales, solo adivina cómo podría ser una expresión facial, distorsionando a menudo las comisuras de los labios o la zona de los ojos."
        }
    },
    level5: {
        title: "Level 6",
        searching: "Buscando todos los errores de imagen...",
        unlocked: "¡La solución ha sido desbloqueada!",
        verify: "Completado",
        check_question: "¿Has encontrado todos los errores marcados?",
        endTitle: "¡Nivel completado!",
        options: { yes: "Sí, todos encontrados", no: "No todos" },
        disclaimer: "Las marcas se basan en encuestas de usuarios de estudios piloto y sirven de orientación. No siempre son perfectas.",
        step0: {
            title: "Errores de imagen y lógica",
            text: "La IA no entiende cómo funciona físicamente nuestro mundo. Por eso ocurren errores que serían imposibles en la realidad: objetos que se fusionan, gafas asimétricas o sombras que caen en direcciones completamente distintas."
        },
        step1: {
            question: "¿Qué imagen ha sido generada?",
            success: "¡Correcto! La imagen es el fake."
        },
        step2: {
            title: "Análisis: Detalles",
            text: "Fíjate en los botones de la chaqueta (irregulares), el pelo (se fusiona) y especialmente la lámpara del fondo, que cuelga físicamente imposible en el primer plano."
        },
        search_task: "¡Encuentra los errores! Recuérdalos y haz clic en 'Solución'.",
        feedback: "La práctica hace al maestro. Presta atención a los detalles en el fondo y en los bordes.",
        asymmetry: {
            title: "Error de simetría",
            text: "Un clásico: las gafas, las joyas o la ropa suelen ser asimétricas. Aquí, la montura de las gafas es completamente distinta a la izquierda y a la derecha."
        },
        finish: {
            title: "Fin del nivel",
            text: "Ahora tienes buen ojo para los 'glitches'. Si algo no tiene sentido físico (lámparas flotantes, medias gafas), es muy probable que sea IA."
        },
        step_text: {
            question: "¿Encuentras la imagen generada?",
            title: "Escritura artificial",
            text: "¿Te has fijado? El texto del fondo es ilegible. Esto no se debe solo a la distancia, sino a que las IA a menudo no pueden generar escritura real. En su lugar, crean formas que solo parecen letras (llamado 'Gibberish')."
        },
        step_fingers: {
            question: "Una imagen tiene problemas con la anatomía de las manos. ¿Cuál?",
            title: "Demasiados dedos",
            text: "Las manos son una de las mayores debilidades de las IA. A menudo los dedos se fusionan, o la IA genera simplemente seis o más dedos en una mano. También son comunes las dobleces poco naturales. Sin embargo: estos errores son menos frecuentes en los modelos modernos."
        },
        step_legs: {
            question: "¿Reconoces el error en la parte inferior de la imagen?",
            title: "Piernas imposibles",
            text: "En las tomas de cuerpo entero, la IA suele perder la cuenta de las extremidades. Aquí nace una pierna en un lugar anatómicamente imposible. Sin embargo: estos errores son menos frecuentes en los modelos modernos."
        }
    },
    level7: {
        loading: "Cargando cuestionario de etapa...",
        introTitle: "Level 7: Cuestionario de etapa",
        introText: "¿Estás listo para el segundo cuestionario? Demuestra lo que has aprendido.",
        startBtn: "Empezar cuestionario",
        roundLabel: "Ronda",
        questionText: "¿Real o generado?",
        endTitle: "Resultado provisional",
        endText: "Excelente. Has completado la segunda etapa del estudio. Tu progreso ha sido guardado.",
    },
    level8: {
        title: "Level 8",
        loading: "Simulando entorno de redes sociales...",
        endTitle: "¡Level 8 completado!",
        step0: {
            title: "Generaciones modernas y contexto",
            text: "Los modelos modernos son técnicamente casi perfectos. La piel, la luz y las sombras apenas se distinguen de las fotos. Aquí a menudo solo ayuda una cosa: el contexto."
        },
        step1: {
            question: "¿Qué resulta sospechoso en esta imagen?",
            options: {
                quality: "Mala calidad de imagen",
                scene: "Escenario improbable",
                filter: "Filtro demasiado fuerte"
            },
            feedback: "Correcto. Un selfie de una persona famosa en un contexto histórico o privado totalmente inapropiado es muy poco probable. El contexto es el delator.",
            fail: "¿Has mirado bien? ¿Encaja la escena con la persona y la época?"
        },
        step2: {
            question: "¿Qué imagen es manipuladora?",
            success: "¡Correcto! Esta imagen fue creada para engañarnos deliberadamente. Estos fakes suelen utilizar peligros creados artificialmente (como alambre de espino o policía) para provocar miedo. Las imágenes emocionales se propagan mucho más rápido por la red, ese es exactamente el objetivo de la desinformación.",
            fail: "Fíjate en las emociones: las imágenes clickbait buscan generar ira o compasión. Suelen estar generadas para ganar alcance rápidamente."
        },
        feed: {
            ad: "Anuncio",
            instruction: "Navega por el feed. Haz clic en los nombres para comprobar el perfil. Marca los tres perfiles con publicaciones generadas.",
            joined: "Miembro desde",
            business: "Cuenta comercial",
            report: "Denunciar como falso",
            marked: "🚩 Marcado",
            success: "¡Análisis excelente! Has desenmascarado a los bots y las cuentas manipuladoras.",
            fail: "No del todo. Fíjate en la fecha de las primeras publicaciones y en la descripción del usuario. Muchas empresas crean cuentas de influencers solo para publicidad. Además, muchos perfiles falsos difunden noticias falsas con imágenes emocionales generadas."
        },
        analysis: {
            title: "Análisis de los bots",
            text: "Reconocer bots significa comprobar el contexto. 'Lara_Life', por ejemplo, ha ganado 280.000 seguidores en solo un mes, una señal clara de crecimiento artificial y de una cuenta bot."
        },
        finish: {
            title: "Conclusión",
            text: "¡Felicidades! Has terminado con éxito el Level 8. Ya estás listo para el cuestionario final."
        }
    },
    level9: {
        loading: "Preparando el final...",
        introTitle: "Level 9",
        introText: "Solo quedan nuestras mejores imágenes de IA. Esta es la prueba final de tus habilidades. ¿Estás listo?",
        startBtn: "Empezar ahora",
        roundLabel: "Ronda final",
        endTitle: "¡Estudio completado!",
        endText: "¡Excelente! Has terminado el entrenamiento y todas las pruebas. Tu contribución es extremadamente valiosa para nuestra investigación sobre la capacidad de los usuarios para reconocer imágenes generadas.",
        viewLeaderboard: "Ver clasificación"
    },
    spotTheFake: {
        deselect: "Deseleccionar",
        select: "Elegir esta imagen",
        wrongTitle: "No del todo...",
        wrongDefault: "Elige otra imagen e inténtalo de nuevo.",
        successDefault: "¡Reconocido correctamente!",
        timeout: "¡TIEMPO AGOTADO!",
        photosBy: "Fotos de",
        onUnsplash: "en Unsplash",
        badges: {
            selected: "ELEGIDO",
            real: "REAL",
            ai: "IA"
        }
    },
    singleChoice: {
        lockedMessage: "Buscando errores de imagen...",
        surveyFeedback: "¡Gracias por tu valoración!",
        wrongDefault: "No es del todo correcto."
    },
    realOrFake: {
        timeout: "¡TIEMPO AGOTADO!",
        real: "REAL",
        ai: "GENERADO",
        badges: {
            correct: "CORRECTO",
            wrong: "INCORRECTO"
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
            left: "La nº 1 es generada",
            right: "La nº 2 es generada"
        },
        feedback: {
            success: "¡Muy bien! Has valorado ambas imágenes correctamente.",
            fail: "No es del todo correcto. Vuelve a mirar los detalles de los fondos."
        }
    },
    imageMatching: {
        step1: "<strong>Paso 1:</strong> Elige un término.",
        step2: "<strong>Paso 2:</strong> Toca la imagen correspondiente.",
        finished: "Análisis completado",
        zoomHint: "Toca una imagen sin texto para ampliarla.",
        failDefault: "Lamentablemente no es del todo correcto. Las asignaciones correctas están marcadas ahora."
    },
    gridSelect: {
        loading: "Cargando set...",
        selectedBadge: "ELEGIDO",
        deselect: "Deseleccionar",
        select: "Marcar como IA",
        error: "¡Incorrecto! ¡Inténtalo de nuevo!",
        successDefault: "¡Reconocido correctamente!",
        aiBadge: "IA"
    },
    conceptTagging: {
        errorDefault: "No es del todo correcto. Algunos rasgos se han pasado por alto o eran incorrectos."
    },
    analysis: {
        altText: "Imagen de análisis"
    },
};