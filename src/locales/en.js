export default {
    generic: {
        step: "Step",
        next: "Next",
        verify: "Verify",
        loading: "Loading content...",
        finish: "Finish Level",
        understood: "Understood",
        completeLevel: "Complete Level",
        backToMap: "Back to Levels",
        image: "Image",
         correct: "Correct!",
    wrong: "Wrong",
    nextRound: "Next Round"
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
        level_1: "Entry Quiz",
        level_2: "Backgrounds",
        level_3: "Skin Textures",
        level_4: "Colors & Saturation",
        level_5: "Facial Expressions",
        level_6: "Image Errors",
        level_7: "Milestone Quiz",
        level_8: "Modern AIs",
        level_9: "The Finale"
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
        }
    },
    leaderboard: {
        title: "Top Detectives",
        description: "The most successful AI hunters of the Detectino study.",
        colRank: "#",
        colUser: "User",
        colPoints: "Points",
        loading: "Searching for the best hunters...",
        meBadge: "YOU",
        footer: "Your points are updated after each level completion."
    },
    register: { // Übernahme deines Tippfehlers "egister" falls technisch notwendig, sonst "register"
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
            divers: "Other / Diverse"
        },
        affinityLabel: "Internet Savviness",
        affinityLow: "Low",
        affinityHigh: "High",
        skillLabel: "Prior AI Knowledge",
        skillLow: "Beginner",
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
        stepB: "In the next step, your levels will be shown. Play to unlock further content like 'Real or AI?'.",
        stepC: "Feel free to check out the leaderboard and compare yourself with others. You can also find evaluation statistics in the menu.",
        stepD: "Detectino is a research project. Your data is collected anonymously. More info can be found under 'Info'.",
        button: "Let's go"
    },
    info: {
        title: "About Detectino",
        description: "Detectino is a serious game designed to teach you how to recognize AI-generated images didactically. The game was developed as part of a bachelor's thesis by Nemo Ziener. All collected data will be processed exclusively in an anonymous form.",
        unsplashNote: "This app uses the Unsplash API but is not endorsed or certified by Unsplash.",
        button: "Let's go"
    },
    dashboard: {
        header: {
            title: "RESEARCH DATA",
            status: "LIVE DATA",
            subtitle: "ANALYSIS OF IMAGE GENERATION RECOGNITION SKILLS MEASURED BY DETECTINO"
        },
        kpis: {
            participants: "PARTICIPANTS",
            decisions: "TOTAL DECISIONS",
            accuracy: "GLOBAL ACCURACY",
            affinity: "AVG. AFFINITY"
        },
        tech: {
            title: "TECHNOLOGY GAP",
            modern: "MODERN AIS (NANO)",
            diff: "DIFFERENCE",
            loss: "PRECISION LOSS IN MODERN MODELS"
        },
        correlation: {
            title: "ESTIMATION CORRELATION",
            self: "SELF-IMAGE (1-10)",
            reality: "REALITY (1-10)"
        },
        learning: {
            title: "LEARNING CURVE",
            analysis: "CLICK ANALYSIS",
            fallback: "SCORE FALLBACK"
        },
        demographics: {
            title: "DEMOGRAPHICS",
            age: "AGE DISTRIBUTION",
            gender: "GENDER PERFORMANCE",
            yearsUnit: "Yrs."
        },
        funnel: {
            title: "RETENTION FUNNEL",
            users: "USERS",
            desc: "COMPLETION RATE PER LEVEL BASED ON TOTAL PARTICIPANTS"
        }
    },
level0: {
        loading: "Loading entry quiz...",
        introTitle: "The Truth Quiz",
        introText: "Real or generated? Test your instinct on 10 individual images. This is the first measurement of your skills before you start training.",
        startBtn: "Start Quiz",
        endTitle: "Evaluation completed",
        endText: "You have successfully finished the entry quiz. Your score has been saved and you can now start training on the map.",
    },
    level1: {
        title: "Level 2: Backgrounds",
        loading: "Syncing images...",
        endTitle: "Level Completed!",
        endText: "Backgrounds are no longer a secret to you.",
        introTitle: "The Truth Quiz",
        introText: "Real or generated? Test your instinct on 10 individual images. This is the first measurement of your skills.",
        startBtn: "Start Quiz",
        endTitle: "Evaluation Finished",
        endText: "You have finished the initial quiz. Your score has been saved.",
        step0: {
            question: "Which image is generated?",
            success: "Correct! That is the generated image."
        },
        step1: {
            title: "Analysis: Scale, Scaling & Consistency",
            text: "Here we see a typical example of inconsistent backgrounds. The man looks real, but the scale of the labyrinth doesn't match his size. Furthermore, the area behind the labyrinth suddenly shows a completely different landscape scale."
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
                fail: "Both are generated. Look at the distorted background and the skin of the boy. With the man, the glasses are very noticeable, and for how close he stands to the wall, it is way too blurry."
            }
        },
        step3: {
            title: "Error Analysis: Split Background",
            text: "That was close! Pay attention to the background here: it is essentially 'split in two' by the central object (the person). On the left, the forest is completely blurred, while on the right, the structure looks entirely different. A classic generation error."
        },
        step4: {
            title: "Error Analysis: Textures",
            text: "Look closely at the wall. It's much too blurry for how close the man is leaning against it. This blur doesn't look like a real 'bokeh effect' (depth of field) of a camera, but simply muddy and smeared."
        },
        step5: {
            question: "In which image does the background indicate generation?",
            success: "Right! The man separates the background: a hut on the left, suddenly forest on the right. That doesn't fit together."
        },
        step6: {
            title: "What do you notice about the background?",
            subtitle: "Select all applicable terms.",
            terms: {
                blurred: "Blurred textures",
                inconsistent: "Inconsistent features",
                unrealistic: "Unrealistic representation",
                lighting: "Errors in light & shadow representation"
            },
            feedback: "The solution is: All apply! These types of errors often overlap."
        },
        step7: {
            title: "Level Conclusion",
            text: "You've learned to pay attention to the background: look for blurred textures, inconsistent objects on the left/right, and illogical shadows. These errors often reveal the generation, even if the face looks perfect."
        }
    },
    level2: {
        title: "Level 3: Skin Textures",
        loading: "Loading skin details...",
        endTitle: "Level Completed!",
        endText: "You've proven you have an eye for skin details.",
        step0: {
            question: "Which image is generated?",
            success: "Right!"
        },
        step1: {
            question: "What points most strongly to a generation here?",
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
            title: "Analysis: The Skin",
            text: "Real skin is matte and porous. AI models often represent skin as too smooth, too shiny, or unnaturally uniform. This is often a better warning sign than obvious errors."
        },
        step3: {
            question: "Which images look generated? (Multiple selection)",
            success: "Very good! You recognize the 'plastic look'.",
            fail: "Pay attention to skin textures: too smooth or shiny often looks unnatural."
        },
        step4: {
            question: "What stands out in this image?",
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
            text: "Image 1 (AI): The wrinkles look 'painted on' or disappear in unnatural places. Right (Real): Wrinkles follow the musculature and have depth."
        },
        step6: {
            title: "Level Conclusion",
            text: "You've learned to pay attention to skin textures. 'Wax-figure skin' and unnatural wrinkles are strong indicators for AI images."
        }
    },
    level3: {
        title: "Level 4: Colors & Saturation",
        loading: "Loading color analysis...",
        endTitle: "Level Completed!",
        endText: "You now have an eye for unnatural saturation and exaggerated contrasts.",
        step0: {
            question: "Which image is generated?",
            success: "Right! The left image is generated."
        },
        step1: {
            question: "Why does this image look fake?",
            options: {
                colors: "Color & skin",
                bg: "Ear",
                hat: "Headwear",
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
            feedback: "Exactly. Not all, but many generated images have problems with overly intense colors, especially with skin tones."
        },
        step3: {
            question: "Which image has a color error?",
            success: "Correct! Turquoise hair on a toddler is extremely unlikely."
        },
        step4: {
            title: "Context Error",
            text: "Generated images often have color errors that only stand out in context. A child with perfectly dyed turquoise hair is very rare in reality and therefore a sign of generation."
        },
        step5: {
            title: "What do you notice here?",
            subtitle: "Select all applicable features.",
            terms: {
                skin: "Oversaturated skin",
                eyes: "Unrealistic eyes",
                makeup: "Background error",
                smooth: "Too soft skin"
            },
            feedback: "This image is a prime example of the 'over-processed' look of generated images and the distorted colors that do not occur like this in reality."
        },
        step6: {
            title: "Analysis:",
            text: "On the right, you see a map. There, the error areas are marked again: Especially in the face, the colors and textures are too perfect and soft."
        },
        step7: {
            question: "Assign the errors!",
            terms: {
                hair: "Unrealistic hair",
                sat: "Oversaturation",
                smooth: "Plastic skin"
            },
            success: "Perfectly assigned! You are developing an eye for the details.",
            fail: "Pay attention to the hair color (red), way too high-contrast skin, and the soft 'plastic look'."
        },
        step8: {
            title: "Level Conclusion",
            text: "Colors are a strong indicator. Look for 'glowing' skin, illogical hair colors in context, and the general 'Instagram filter look' that many AI models generate by default."
        }
    },
    level4: {
        title: "Level 5: Facial Expressions",
        loading: "Preparing facial expression analysis...",
        endTitle: "Level Completed!",
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
            fail: "Pay attention to the expression and posture: unnatural facial expressions and body postures are often a sign of AI."
        },
        step1: {
            title: "Analysis: Expressions & Tongue",
            text: "A common mistake of AI models is facial expressions. In this example, the stuck-out tongue combined with its posture is anatomically striking. Such errors in mimicry are a strong warning signal."
        },
        step2: {
            question: "Which image is generated?",
            success: "Well spotted! The left image shows typical artifacts.",
            fail: "Pay attention to the skin, colors, and facial features."
        },
        step3: {
            title: "Analysis: Details",
            text: "Another striking facial expression; also pay attention to the hair and light reflections here. The skin looks too smooth (as we learned in Level 2). Furthermore, the wrinkles in the face and the patterns on the clothes are suspicious."
        },
        step4: {
            question: "Which image is generated?",
            success: "Correct! Generally, notice that characters in generated images often look directly into the camera.",
            fail: "Pay attention to the expressions: unnatural facial expressions or an agitated person in a perfect portrait are often a sign that the images are generated."
        },
        step5: {
            title: "Level Conclusion",
            text: "Faces are complex. Look for empty gazes, asymmetrical eyes, merging teeth or tongues, and emotions that don't quite match the rest of the face."
        }
    },
    level5: {
        title: "Level 6: Recognizing Image Errors",
        searching: "Searching for all image errors...",
        unlocked: "The solution is unlocked!",
        verify: "Completed",
        check_question: "Did you find all marked errors?",
        endTitle: "Level Completed!",
        options: { yes: "Yes, found all", no: "Not all" },
        disclaimer: "The markings are based on user surveys from pilot studies and serve as a guide. They are not always perfect.",
        step0: {
            title: "Image Errors & Logic",
            text: "A good method for recognizing generated images is to look for physical or logical errors. AI doesn't 'understand' the world; it only guesses pixels. This often leads to errors that would be impossible in reality."
        },
        step1: {
            question: "Which image is generated?",
            success: "Correct! This image is the fake."
        },
        step2: {
            title: "Analysis: Details",
            text: "Pay attention to the buttons on the jacket (uneven), the hair (merging), and especially the lamp in the background, which physically impossibly hangs in the foreground."
        },
        search_task: "Find the errors! Remember them and click on 'Solution'.",
        options: {
            yes: "Yes, found all",
            partly: "Some",
            no: "No, missed them"
        },
        feedback: "Practice makes perfect. Pay attention to details in the background and at the edges.",
        img11: "Watch the background and the clothing.",
        img12: "Look closely at the hands and the environment.",
        img48: "Something is wrong with the architecture here.",
        img67: "Pay attention to reflections or shadows.",
        asymmetry: {
            title: "Symmetry Errors",
            text: "A classic: glasses, jewelry, or clothing are often asymmetrical. Here (Image 63), the glasses frame is completely different on the left and right."
        },
        finish: {
            title: "Level Conclusion",
            text: "You now have an eye for 'glitches'. If something makes no physical sense (floating lamps, half glasses), it is very likely AI."
        }
    },
    etappenQuiz: {
        intro: {
            title: "Midterm Exam: What have you learned?",
            text: "You've learned a lot about backgrounds, skin, colors, and anatomy. Now it gets serious: 10 images. No help. Find the fakes."
        },
        round: "Round",
        finish: {
            title: "Exam Finished",
            text_perfect: "Amazing! You've developed a perfect eye.",
            text_good: "Very good! You recognized almost all of them.",
            text_ok: "Not bad, but pay even more attention to details.",
            score: "Your result:"
        }
    },
    level7: {
        loading: "Stage quiz loading...",
        introTitle: "The Stage Quiz",
        introText: "Are you ready for Quiz 2? Show what you've learned.",
        startBtn: "Start Quiz",
        roundLabel: "Round",
        questionText: "Real or generated?",
        endTitle: "Intermediate Result",
        endText: "Excellent. You have completed the second stage of the study. Your progress has been saved.",
    },
    level8: {
        title: "Level 8: Modern AIs",
        loading: "Simulating social media environment...",
        endTitle: "Level 8 Completed!",
        step0: {
            title: "Modern Generations & Context",
            text: "Modern models (from roughly Nov 26, 2025) are technically almost perfect. Skin, light, and shadow are barely distinguishable from photos. Here, often only one thing helps: the context."
        },
        step1: {
            question: "What is suspicious about this image?",
            options: {
                quality: "Poor image quality",
                scene: "Unlikely scenario",
                filter: "Filter too strong"
            },
            feedback: "Correct. A selfie of a famous person in a completely inappropriate historical or private context is highly unlikely. The context is the dead giveaway.",
            fail: "Look closely. Does the scene fit the person and the time?"
        },
        step2: {
            question: "Which image is manipulative?",
            success: "Right! This image is a typical 'clickbait' photo designed to evoke strong emotions. In Germany, a very similar image was spread in late 2025 and went viral.",
            fail: "Look at the emotions: clickbait images are meant to generate anger or pity. Such images are often generated to quickly gain reach."
        },
        step3: {
            title: "Social Media Analysis",
            text: "You will see a simulated Instagram interface. Look closely at the accounts. Select the accounts that strike you as fake.\n\nTips for analysis:\n1. When was the account created? (Many AI bots are very new).\n2. Does it only post images? (Videos are harder to fake).\n3. Are influencers selling products despite low follower counts?"
        },
        feed: {
            ad: "Sponsored",
            instruction: "Scroll through the feed. Click on the names to check the profile. Mark the profiles you believe are fake.",
            joined: "Joined since",
            business: "Business Account",
            report: "Report as fake",
            marked: "🚩 Marked",
            success: "Great analysis! You've exposed the bots and manipulative accounts.",
            fail: "Not quite. Look at the date of the first posts and the user description. Often companies create influencer accounts just for advertising. Many fake profiles also spread misinformation using emotional, generated images."
        },
        analysis: {
            title: "Bot Analysis",
            text: "Recognizing bots means checking the context. 'Lara_Life', for example, gained 280k followers in just one month—a clear sign of artificial growth and a bot account."
        },
        finish: {
            title: "Conclusion",
            text: "Congratulations! You have successfully completed Level 8. You are now ready for the final quiz."
        }
    },
    level9: {
        loading: "Preparing the finale...",
        introTitle: "The Finale",
        introText: "Only our best AI images remain. This is the final test of your skills. Are you ready?",
        startBtn: "Start now",
        roundLabel: "Final Round",
        endTitle: "Study Completed!",
        endText: "Outstanding! You have finished the training and all tests. Your contribution is extremely valuable for our research on user recognition skills regarding generated images.",
        viewLeaderboard: "View Leaderboard"
    },
     spotTheFake: {
        deselect: "Deselect",
        select: "Select this image",
        wrongTitle: "Not quite...",
        wrongDefault: "Choose another image and try again.",
        successDefault: "Correctly identified!",
        timeout: "TIME EXPIRED!",
        photosBy: "Photos by",
        onUnsplash: "on Unsplash",
        badges: {
            selected: "SELECTED",
            real: "REAL",
            ai: "AI"
        }
    },
    singleChoice: {
        lockedMessage: "Look for image errors...",
        surveyFeedback: "Thank you for your assessment!",
        wrongDefault: "Not quite right."
    },
    realOrFake: {
        timeout: "TIME EXPIRED!",
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
        },
        credits: {
            by: "Photo by ",
            on: " on Unsplash"
        }
    },
    multiCheck: {
        defaultQuestion: "Which of these images are generated?",
        options: {
            none: "Both real",
            both: "Both generated",
            left: "No. 1 is generated",
            right: "No. 2 is generated"
        },
        feedback: {
            success: "Very good! You assessed both images correctly.",
            fail: "Not quite right. Take another look at the background details."
        }
    },
    imageMatching: {
        step1: "<strong>Step 1:</strong> Select a term.",
        step2: "<strong>Step 2:</strong> Tap the matching image.",
        finished: "Analysis complete",
        zoomHint: "Tap an image without text to zoom.",
        failDefault: "Not quite right. The correct matches are now marked."
    },
    gridSelect: {
        loading: "Loading set...",
        selectedBadge: "SELECTED",
        deselect: "Deselect",
        select: "Mark as AI",
        error: "Wrong! Try again!",
        successDefault: "Correctly identified!",
        aiBadge: "AI"
    },
    conceptTagging: {
        errorDefault: "Not quite right. Some features were overlooked or incorrect."
    },
    analysis: {
        altText: "Image analysis"
    }
};