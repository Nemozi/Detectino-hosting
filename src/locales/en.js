export default {
    generic: {
        correct: "Correct!",
        wrong: "Wrong",
        step: "Step",
        next: "Next",
        verify: "Check",
        loading: "Loading content...",
        finish: "Finish Level",
        understood: "Understood",
        completeLevel: "Complete Level",
        backToMap: "Back to Levels",
        image: "Image",
        nextRound: "Next Round",
    },
    didactic: {
        title: " Why does AI make mistakes?",
        intro: "Before you start, learn the most important principle for your analysis:",
        point1_title: "No Understanding of the World",
        point1_text: "AIs are statistical calculators. They don't know what a 'hand' or 'physics' is.",
        point2_title: "Pixel Probability",
        point2_text: "They only calculate which pixels might statistically fit next to each other.",
        point3_title: "Logic Gaps",
        point3_text: "Since they only know the world as flat patterns, they often fail at logic (e.g., 6 fingers or wrong shadows).",
        button: "All right, Start!"
    },
    navbar: {
        play: "To Game",
        participate: "Participate",
        menu: "Menu",
        profile: "My Profile",
        logout: "Logout & Exit",
        streakSuffix: " STREAK!",
        info: "Info",
        leaderboard: "Leaderboard",
        stats: "Statistics"
    },
levels: {
        mainTitle: "Your Journey",
        loading: "Loading levels...",
        level_1: "Quiz 1: Entry Quiz",
        level_2: "Learning 1",
        level_3: "Learning 2",
        level_4: "Learning 3",
        level_5: "Learning 4",
        level_6: "Learning 5",
        level_7: "Quiz 2: Stage Quiz",
        level_8: "Learning 6",
        level_9: "Quiz 3: The Finale"
    },
    profile: {
        title: "Your Profile",
        loading: "Loading data...",
        loggedAs: "Logged in as",
        emailLabel: "Email",
        fallbackName: "Detective",
        stats: {
            age: "Age",
            internet: "Internet",
            skill: "Skill"
        },
        actions: {
            viewStats: "View Statistics",
            logout: "Logout"
        },
        gender_options: {
            female: "Female",
            male: "Male",
            divers: "Other"
        }
    },
    leaderboard: {
        title: "Top Detectives",
        description: "The most successful AI hunters in the Detectino study.",
        colRank: "#",
        colUser: "User",
        colPoints: "Points",
        loading: "Searching for the best hunters...",
        meBadge: "YOU",
        footer: "Your points are updated after completing each level."
    },
    register: {
        title: "Participation & Profile",
        errorGeneric: "An error occurred. Please try again.",
        aliasSection: "Your Alias",
        usernameLabel: "Username (Optional)",
        usernamePlaceholder: "Your Alias",
        aboutSection: "About You",
        ageLabel: "Your Age",
        genderLabel: "Gender",
        genderOptions: {
            female: "Female",
            male: "Male",
            divers: "Other"
        },
        affinityLabel: "Internet Affinity",
        affinityLow: "Low",
        affinityHigh: "High",
        skillLabel: "Initial AI Knowledge",
        skillLow: "Low",
        skillHigh: "Expert",
        submitButton: "Start Game Now",
        loading: "Loading..."
    },
    welcome: {
        title: "Welcome to Detectino",
        intro: "Learn to recognize AI-generated images and arm yourself against the flood of fakes.",
        button: "Let's go"
    },
    explain: {
        title: "How it works",
        stepA: "Welcome to Detectino. Here you will learn how to recognize AI-generated images and test your skills.",
        stepB: "In the next step, your levels will be shown. Play to unlock more content like 'Real or AI?'.",
        stepC: "Feel free to check out the leaderboard and compare yourself with others. Evaluation statistics can also be found in the menu.",
        stepD: "Detectino is a research project. Your data is collected anonymously. Find more info under 'Info'.",
        button: "Let's go"
    },
    info: {
        title: "About Detectino",
        description: "Detectino is a serious game designed to teach you how to recognize AI-generated images. The game was developed as part of a bachelor's thesis. All collected data will only be processed anonymously.",
        unsplashNote: "This app uses the Unsplash API but is not supported or certified by Unsplash. The generated images come from the AIS-4SD dataset or are self-generated.",
        button: "Let's go"
    },
dashboard: {
    loading: "LOADING DATA...",
    header: {
      title: "RESULT ANALYSIS | DETECTINO",
      status: "LIVE DATA",
      subtitle: "Scientific evaluation of the study participants"
    },
    kpis: {
      participants: "PARTICIPANTS (N)",
      phase1: "PHASE 1 (Q1 ➞ Q2)",
      phase2: "PHASE 2 (Q2 ➞ Q3)",
      precision: "AVG. PRECISION"
    },
    sections: {
      modelComparison: "Learning Effect: Model Comparison",
      quizTimeline: "Quiz Timeline (Ø)",
      learningCurve: "Learning Curve across all levels",
      retentionFunnel: "Retention Funnel"
    },
    charts: {
      standard: "Standard",
      nano: "Nano",
      quizResult: "Quiz Result",
      learningUnit: "Learning Unit",
      graduates: "Graduates"
    }
},
    level0: {
        loading: "Loading Entry Quiz...",
        introTitle: "Level 1: Entry Quiz",
        introText: "Real or generated? Test your instinct on 10 single images. This is the first measurement of your skills before you start the training.",
        questionText: "Which image is generated?",
        startBtn: "Start Quiz",
        endTitle: "Evaluation complete",
        endText: "You have successfully finished the entry quiz. Your score has been saved and you can now start training on the map.",
    },
    level1: {
        title: "Level 2",
        loading: "Synchronizing images...",
        endTitle: "Level completed!",
        endText: "Backgrounds are no longer a secret to you.",
        introTitle: "The Truth Quiz",
        introText: "Real or generated? Test your instinct on 10 images.",
        startBtn: "Start Quiz",
        step0: {
            question: "Which image is generated?",
            success: "Correct! That is the generated image."
        },
        step1: {
            title: "Analysis: Scale, Scaling & Consistency",
            text: "Here you see a typical error: The AI pays attention to details but loses sight of the big picture. The man may look real, but the labyrinth behind him is much too small – the proportions simply don't fit."
        },
        step2: {
            question: "Are these images generated?",
            options: {
                none: "Both are real",
                both: "Both are generated",
                left: "No. 1",
                right: "No. 2"
            },
            feedback: {
                success: "Perfect! Both are generated.",
                fail: "Both are generated. Notice the distorted background and skin on the boy. For the man, the glasses are very noticeable and the background is too blurry for how close he is to the wall."
            }
        },
        step3: {
            title: "Error Analysis: Split Background",
            text: "That was close! Watch the background here: it is basically 'split' by the object in the center (the person). On the left, the forest is totally blurred; on the right, the structure looks completely different. A classic generation error."
        },
        step4: {
            title: "Error Analysis: Textures",
            text: "Look closely at the wall. It is much too blurry for how close the man is leaning against it. This blur doesn't look like a real 'bokeh' effect but simply muddy and smeared."
        },
        step5: {
            question: "In which image does the background indicate generation?",
            success: "Correct! The man splits the background: a hut on the left, suddenly forest on the right. It doesn't fit together."
        },
        step6: {
            title: "What do you notice about the background?",
            subtitle: "Select all matching terms.",
            terms: {
                blurred: "Blurred textures",
                inconsistent: "Inconsistent features",
                unrealistic: "Unrealistic representation",
                lighting: "Errors in light & shadow representation"
            },
            feedback: "The solution is: All apply! These types of errors often overlap."
        },
        step7: {
            title: "Level Completion",
            text: "In summary: Backgrounds often betray the AI through illogical transitions. Pay attention to whether objects on the left and right of a person truly belong together or if lines in the background suddenly break off."
        }
    },
    level2: {
        title: "Level 3",
        loading: "Loading skin details...",
        endTitle: "Level completed!",
        endText: "You have proven you have an eye for skin details.",
        step0: {
            question: "Which image is generated?",
            success: "Correct!"
        },
        step1: {
            question: "What points most strongly to generation here?",
            options: {
                skin: "Skin texture",
                nose: "Nose",
                eyes: "Eyes",
                hair: "Hair"
            },
            feedback: "Exactly! In generated images, skin often looks too smooth or 'waxy'.",
            fail: "Pay attention to skin textures: too smooth or shiny often looks unnatural."
        },
        step2: {
            title: "Analysis: Skin",
            text: "AI models often tend to exaggerate. Because the AI doesn't know real pores or fine hairs, the skin often looks 'ironed out' or waxy, almost like a doll or made of plastic. If a face shines too perfectly, it's a clear warning signal."
        },
        step3: {
            question: "Which images look generated? (Multiple choice)",
            success: "Very good! You recognize the 'plastic look'.",
            fail: "Pay attention to skin textures: too smooth or shiny often looks unnatural."
        },
        step4: {
            question: "What do you notice about this image?",
            subtitle: "Select all applicable features.",
            terms: {
                smooth: "Wax-figure skin",
                wrinkles: "Unnatural wrinkles",
                eyes: "Eye color",
                tattoos: "Tattoos"
            },
            feedback: "Correct. The skin is too smooth for the age, and the wrinkles run unnaturally. Blue eyes or facial tattoos are rare, but not necessarily an indicator."
        },
        step5: {
            title: "Comparison: Wrinkles",
            text: "Image 1 (AI): The wrinkles look 'painted on' or disappear in unnatural places. In the real one, wrinkles follow the muscles and have depth."
        },
        step6: {
            title: "Level Completion",
            text: "You have learned to pay attention to skin textures. 'Wax-figure skin' and unnatural wrinkles are strong indicators for AI images."
        }
    },
    level3: {
        title: "Level 4",
        loading: "Loading color analysis...",
        endTitle: "Level completed!",
        endText: "You now have an eye for unnatural saturation and exaggerated contrasts.",
        step0: {
            question: "Which image is generated?",
            success: "Correct! The left image is generated."
        },
        step1: {
            question: "Why does this image look fake?",
            options: {
                colors: "Color & Skin",
                bg: "Mouth",
                hat: "Headgear",
                eyes: "Eye color"
            },
            feedback: "Correct. Oversaturated colors like these are an indicator; the skin 'glows' unnaturally."
        },
        step2: {
            question: "Which statement is correct?",
            options: {
                all: "All generated images are oversaturated",
                indicator: "Oversaturation is an indicator for generation",
                none: "Oversaturation means nothing"
            },
            feedback: "Exactly. Not all, but many generated images have problems with overly intense colors, especially in skin tones."
        },
        step3: {
            question: "Which image has a color error?",
            success: "Correct! Turquoise hair on a toddler is extremely unlikely."
        },
        step4: {
            title: "Context Error",
            text: "Generated images often have color errors that only stand out in context. A child with perfectly dyed turquoise hair is very rare in reality and thus a sign of generation."
        },
        step5: {
            title: "What do you notice here?",
            subtitle: "Select all matching features.",
            terms: {
                skin: "Oversaturated skin",
                eyes: "Unrealistic eyes",
                makeup: "Background error",
                smooth: "Too soft skin"
            },
            feedback: "This image is a prime example of the 'over-processed' look of generated images and distorted colors that don't occur in reality."
        },
        step6: {
            title: "Analysis:",
            text: "In the second image you see a map. There, error areas are marked: especially in the face, colors and textures are too perfect and soft."
        },
        step7: {
            question: "Assign the errors!",
            terms: {
                hair: "Unrealistic hair",
                sat: "Oversaturation",
                smooth: "Plastic skin"
            },
            success: "Perfectly assigned! You are developing an eye for details.",
            fail: "Notice the hair color (red), overly high-contrast skin, and the soft 'plastic look'."
        },
        step8: {
            title: "Level Completion",
            text: "Colors are a strong indicator. Watch for 'glowing' skin, illogical hair colors in context, and the general 'Instagram filter look' that many AI models generate by default."
        }
    },
    level4: {
        title: "Level 5",
        loading: "Preparing facial expression analysis...",
        endTitle: "Level completed!",
        endText: "You now even recognize subtle errors in facial expressions.",
        step0: {
            question: "What do you notice here?",
            options: {
                pose: "Unnatural posture",
                nothing: "Nothing unusual",
                expression: "Unnatural anatomy and expressions",
                bg: "Wrong background"
            },
            feedback: "Correct. The expression, especially the mouth area, looks distorted.",
            fail: "Notice the expression and posture: unnatural facial expressions and body poses are often a sign of AI."
        },
        step1: {
            title: "Analysis: Expressions & Tongue",
            text: "A common mistake of AI models is facial expressions. In this example, the sticking-out tongue combined with her posture is anatomically suspicious. Such errors in expressions are a strong warning signal."
        },
        step2: {
            question: "Which image is generated?",
            success: "Well recognized! The left image shows typical artifacts.",
            fail: "Watch the skin, colors, and facial features."
        },
        step3: {
            title: "Analysis: Details",
            text: "Another suspicious expression; also watch the hair and light reflections. The skin looks too smooth (as we already learned). Also, the wrinkles and patterns on clothing are suspicious."
        },
        step4: {
            question: "Which image is generated?",
            success: "Correct! Generally, characters in generated images often look directly into the camera.",
            fail: "Watch the expression: unnatural expressions or an excited person in a perfect portrait are often signs that images are generated."
        },
        step5: {
            title: "Level Completion",
            text: "Faces are extremely complex. Watch for the 'blank stare' or a smile that seems distorted. Since the AI knows no real feelings, it only guesses how an expression might look, often distorting corners of the mouth or eye areas."
        }
    },
    level5: {
        title: "Level 6",
        searching: "Searching for all image errors...",
        unlocked: "Solution unlocked!",
        verify: "Completed",
        check_question: "Did you find all marked errors?",
        endTitle: "Level completed!",
        options: { yes: "Yes, found all", no: "Not all" },
        disclaimer: "Markings are based on user surveys from pilot studies and serve as guidance. They are not always perfect.",
        step0: {
            title: "Image Errors & Logic",
            text: "AI doesn't understand how our world works physically. That's why errors happen that would be impossible in reality: objects merging, glasses being asymmetrical, or shadows falling in completely different directions."
        },
        step1: {
            question: "Which image is generated?",
            success: "Correct! This image is the fake."
        },
        step2: {
            title: "Analysis: Details",
            text: "Note the buttons on the jacket (uneven), the hair (merging), and especially the lamp in the background hanging physically impossible in the foreground."
        },
        search_task: "Find the errors! Remember them and click on 'Solution'.",
        feedback: "Practice makes perfect. Pay attention to details in the background and at edges.",
        asymmetry: {
            title: "Symmetry Errors",
            text: "A classic: glasses, jewelry, or clothing are often asymmetrical. Here, the glasses frame is completely different on the left and right."
        },
        finish: {
            title: "Level Completion",
            text: "You now have an eye for 'glitches'. If something physically makes no sense, it is very likely AI."
        },
        step_text: {
            question: "Can you find the generated image?",
            title: "Artificial Script",
            text: "Did you notice? The text in the background is illegible. This isn't just distance; AIs often can't generate real script. Instead, they create shapes that only look like letters."
        },
        step_fingers: {
            question: "Which image is generated?",
            title: "Not enough Fingers",
            text: "Hands are one of the biggest weaknesses of AI. Often fingers merge, or the AI simply generates six or more fingers. Also, unnatural bends are common. However: such errors are rarer in modern models."
        },
        step_legs: {
            question: "Do you recognize the error in the lower part of the image?",
            title: "Impossible Legs",
            text: "In full-body shots, the AI often loses track of limbs. Here a leg grows from an anatomically impossible spot. However: such errors are rarer in modern models."
        }
    },
    level7: {
        loading: "Stage Quiz loading...",
        introTitle: "Level 7: Stage Quiz",
        introText: "Are you ready for Quiz 2? Show what you've learned.",
        startBtn: "Start Quiz",
        roundLabel: "Round",
        questionText: "Real or generated?",
        endTitle: "Interim Result",
        endText: "Excellent. You have completed the second stage of the study. Your progress has been saved.",
    },
    level8: {
        title: "Level 8",
        loading: "Simulating social media environment...",
        endTitle: "Level 8 completed!",
        step0: {
            title: "Modern Generations & Context",
            text: "Modern models are technically almost perfect. Skin, light, and shadow are hardly distinguishable from photos. Here, often only one thing helps: Context."
        },
        step1: {
            question: "What is suspicious about this image?",
            options: {
                quality: "Poor image quality",
                scene: "Unlikely scenario",
                filter: "Too strong filter"
            },
            feedback: "Correct. A selfie of a famous person in a completely inappropriate historical or private context is highly unlikely. Context is the traitor.",
            fail: "Look closely. Does the scene fit the person and the time?"
        },
        step2: {
            question: "Which image is manipulative?",
            success: "Correct! This image was created to intentionally deceive us. Such fakes often use artificially created dangers (like barbed wire or police) to trigger fear. Emotional images spread much faster online; that's exactly the goal of disinformation.",
            fail: "Look at the emotions: Clickbait images are meant to generate anger or pity. Such images are often generated to quickly gain reach."
        },
        feed: {
            ad: "Ad",
            instruction: "Scroll through the feed. Click on names to check profiles. Mark the three profiles with generated posts.",
            joined: "Joined since",
            business: "Business Account",
            report: "Report as fake",
            marked: "🚩 Marked",
            success: "Superbly analyzed! You exposed the bots and manipulative accounts.",
            fail: "Not quite. Look at the date of first posts and user description. Companies often create influencer accounts just for ads. Many fake profiles also spread false reports with emotional, generated images."
        },
        analysis: {
            title: "Analysis of Bots",
            text: "Recognizing bots means checking context. 'Lara_Life' for example gained 280k followers in just one month, a clear sign of artificial growth and a bot account."
        },
        finish: {
            title: "Completion",
            text: "Congratulations! You successfully finished Level 8. You are now ready for the final quiz."
        }
    },
    level9: {
        loading: "Preparing the finale...",
        introTitle: "You will be shown 4 images; choose which one is generated.",
        introText: "Only our best AI images left. This is the final test of your skills. Are you ready?",
        startBtn: "Start now",
        roundLabel: "Final Round",
        endTitle: "Study completed!",
        endText: "Excellent! You finished the training and all tests. Your contribution is extremely valuable for our research on recognition skills of generated images.",
        viewLeaderboard: "View Leaderboard"
    },
    spotTheFake: {
        deselect: "Deselect",
        select: "Select this image",
        wrongTitle: "Not quite...",
        wrongDefault: "Choose another image and try again.",
        successDefault: "Correctly recognized!",
        timeout: "TIME UP!",
        photosBy: "Photos by",
        onUnsplash: "on Unsplash",
        badges: {
            selected: "SELECTED",
            real: "REAL",
            ai: "AI"
        }
    },
    realOrFake: {
        timeout: "TIME UP!",
        real: "REAL",
        ai: "GENERATED",
        badges: {
            correct: "CORRECT",
            wrong: "WRONG"
        },
        feedback: {
            correct: "Well done!",
            wrong: "Unfortunately wrong."
        },
        explanation: {
            is: "This image is ",
            ai: "AI-generated.",
            real: "a real photo."
        }
    },
    multiCheck: {
        defaultQuestion: "Which of these images are generated?",
        options: {
            none: "Both real",
            both: "Both generated",
            left: "No. 1 is generated",
            right: "No. 2 is generated"
        }
    }
};