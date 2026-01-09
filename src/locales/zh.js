export default {
    generic: {
        step: "步骤",
        next: "下一步",
        verify: "验证",
        loading: "内容加载中...",
        finish: "结束关卡",
        understood: "明白了",
        completeLevel: "完成关卡",
        backToMap: "返回关卡列表",
        image: "图片",
        correct: "正确！",
    wrong: "错误",
    nextRound: "下一轮"
    },
    navbar: {
        play: "开始游戏",
        participate: "参与",
        menu: "菜单",
        profile: "个人中心",
        logout: "退出登录",
        streakSuffix: " 连胜！",
        info: "信息",
        leaderboard: "排行榜",
        stats: "统计数据"
    },
    levels: {
        mainTitle: "你的旅程",
        loading: "加载关卡中...",
        level_1: "入门测验",
        level_2: "背景分析",
        level_3: "皮肤纹理",
        level_4: "色彩与饱和度",
        level_5: "面部表情",
        level_6: "图像错误",
        level_7: "阶段测验",
        level_8: "现代AI",
        level_9: "最终决赛"
    },
    profile: {
        title: "个人资料",
        loading: "数据加载中...",
        loggedAs: "已登录为",
        emailLabel: "电子邮件",
        fallbackName: "侦探",
        stats: {
            age: "年龄",
            internet: "互联网指数",
            skill: "技能等级"
        },
        actions: {
            viewStats: "查看统计",
            logout: "退出"
        }
    },
    leaderboard: {
        title: "顶级侦探",
        description: "Detectino 研究中最成功的 AI 猎人。",
        colRank: "#",
        colUser: "用户",
        colPoints: "积分",
        loading: "寻找顶尖猎人...",
        meBadge: "你",
        footer: "积分将在每个关卡完成后更新。"
    },
    register: {
        title: "参与 & 个人资料",
        errorGeneric: "出错了。请稍后再试。",
        aliasSection: "你的别名",
        usernameLabel: "用户名（可选）",
        usernamePlaceholder: "你的别名",
        aboutSection: "关于你",
        ageLabel: "你的年龄",
        genderLabel: "性别",
        genderOptions: {
            female: "女性",
            male: "男性",
            divers: "多元性别"
        },
        affinityLabel: "互联网亲和力",
        affinityLow: "低",
        affinityHigh: "高",
        skillLabel: "预先拥有的AI知识",
        skillLow: "较少",
        skillHigh: "专家",
        submitButton: "立即开始游戏",
        loading: "加载中..."
    },
    welcome: {
        title: "欢迎来到 Detectino",
        intro: "学习如何识别AI生成的图像，武装自己以应对虚假信息的洪水。",
        button: "开始吧"
    },
    explain: {
        title: "如何操作",
        stepA: "欢迎来到 Detectino。在这里，你将学习识别AI生成的图像并测试你的能力。",
        stepB: "在下一步中，你将看到关卡。通过游戏解锁更多内容，如“真实还是AI？”。",
        stepC: "欢迎查看排行榜并与其他玩家对比。你也可以在菜单中找到评估统计数据。",
        stepD: "Detectino 是一个研究项目。你的数据将匿名收集。更多信息请见“关于”。",
        button: "开始吧"
    },
    info: {
        title: "关于 Detectino",
        description: "Detectino 是一款严肃游戏 (Serious Game)，旨在通过教学方式教会你识别AI生成的图像。该游戏是由 Nemo Ziener 在其学士学位论文框架下开发的。所有收集的数据将仅以匿名形式进行进一步处理。",
        unsplashNote: "本应用使用 Unsplash API，但未获得 Unsplash 的支持或认证。",
        button: "开始吧"
    },
    dashboard: {
        header: {
            title: "研究数据",
            status: "实时数据",
            subtitle: "通过 DETECTINO 衡量的用户生成图像识别能力分析"
        },
        kpis: {
            participants: "参与者",
            decisions: "总决策数",
            accuracy: "全球准确率",
            affinity: "平均亲和力值"
        },
        tech: {
            title: "技术差距",
            modern: "现代AI (NANO)",
            diff: "差异",
            loss: "现代模型的识别精度损失"
        },
        correlation: {
            title: "评估相关性",
            self: "自我认知 (1-10)",
            reality: "真实情况 (1-10)"
        },
        learning: {
            title: "学习曲线",
            analysis: "点击分析",
            fallback: "分数回退"
        },
        demographics: {
            title: "人口统计",
            age: "年龄分布",
            gender: "性别表现",
            yearsUnit: "岁"
        },
        funnel: {
            title: "留存漏斗",
            users: "用户",
            desc: "基于总参与者的每关卡完成率"
        }
    },
level0: {
        loading: "正在加载入门测验...",
        introTitle: "真相测验",
        questionText: "哪张图片是生成的？",
        introText: "真实还是生成？通过 10 张单图测试你的直觉。这是你在开始训练前对能力的第一次评估。",
        startBtn: "开始测验",
        endTitle: "评估完成",
        endText: "你已成功完成入门测验。你的得分已保存，现在可以开始地图上的训练了。",
    },
    level1: {
        title: "第2关：背景",
        loading: "图片同步中...",
        endTitle: "关卡完成！",
        endText: "背景对你来说不再是秘密了。",
        introTitle: "真相测验",
        introText: "真实还是生成？通过10张单图测试你的直觉。这是对你能力的第一次评估。",
        startBtn: "开始测验",
        endTitle: "评估完成",
        endText: "你已完成入门测验。你的得分已保存。",
        step0: {
            question: "哪张图片是生成的？",
            success: "正确！这是生成的图片。"
        },
        step1: {
            title: "分析：比例、缩放与一致性",
            text: "这里我们看到一个典型的背景不一致的例子。男人看起来很真实，但迷宫的比例与他的体型不符。此外，迷宫后方的区域突然显示出完全不同的景观比例。"
        },
        step2: {
            question: "这些图片是生成的吗？",
            options: {
                none: "都是真实的",
                both: "都是生成的",
                left: "1号",
                right: "2号"
            },
            feedback: {
                success: "太棒了！两张都是生成的。",
                fail: "两张都是生成的。请注意男孩背后扭曲的背景和他的皮肤。至于那个男人，眼镜非常显眼，而且考虑到他离墙那么近，背景太模糊了。"
            }
        },
        step3: {
            title: "错误分析：分割的背景",
            text: "好险！注意这里的背景：它几乎被中心的物体（人）“一分为二”。左边的森林完全模糊，右边的结构看起来完全不同。这是典型的生成错误。"
        },
        step4: {
            title: "错误分析：纹理",
            text: "仔细观察墙壁。对于男人靠得那么近的情况来说，墙壁太模糊了。这种模糊看起来不像是相机的真实“散景效果”（景深），而是单纯的浑浊和模糊。"
        },
        step5: {
            question: "哪张图片的背景指向它是生成的？",
            success: "正确！男人分割了背景：左边是小屋，右边突然变成了森林。这不合逻辑。"
        },
        step6: {
            title: "你注意到背景有什么异常？",
            subtitle: "选择所有合适的词项。",
            terms: {
                blurred: "模糊的纹理",
                inconsistent: "不一致的特征",
                unrealistic: "不真实的呈现",
                lighting: "光影呈现错误"
            },
            feedback: "答案是：以上全部！这些类型的错误经常重叠。"
        },
        step7: {
            title: "关卡总结",
            text: "你已经学会了观察背景：寻找模糊的纹理、左右不一致的物体和不合逻辑的阴影。即使脸部看起来很完美，这些错误也经常暴露生成痕迹。"
        }
    },
    level2: {
        title: "第3关：皮肤纹理",
        loading: "皮肤细节加载中...",
        endTitle: "关卡完成！",
        endText: "你已经证明了你对皮肤细节有敏锐的洞察力。",
        step0: {
            question: "哪张图片是生成的？",
            success: "正确！"
        },
        step1: {
            question: "这里什么最强烈地预示着它是生成的？",
            options: {
                skin: "皮肤纹理",
                nose: "鼻子",
                eyes: "眼睛",
                hair: "头发"
            },
            feedback: "没错！在生成图像中，皮肤通常看起来太光滑或有“蜡质感”。",
            fail: "注意皮肤纹理：太光滑或太闪亮通常看起来不自然。"
        },
        step2: {
            title: "分析：皮肤",
            text: "真实的皮肤是哑光且有孔隙的。AI模型通常将皮肤表现得太光滑、太闪亮或不自然地均匀。这通常比明显的错误是更好的预警信号。"
        },
        step3: {
            question: "哪些图片看起来是生成的？（多选）",
            success: "非常好！你识破了这种“塑料感”。",
            fail: "注意皮肤纹理：太光滑或太闪亮通常看起来不自然。"
        },
        step4: {
            question: "这张图片有什么异常？",
            subtitle: "选择所有适用的特征。",
            terms: {
                smooth: "蜡像般的皮肤",
                wrinkles: "不自然的皱纹",
                eyes: "眼睛颜色",
                tattoos: "纹身"
            },
            feedback: "正确。对于这个年龄段来说皮肤太滑了，皱纹的走向也不自然。蓝眼睛或面部纹身虽然少见，但不一定是识别指标。"
        },
        step5: {
            title: "对比：皱纹",
            text: "图1 (AI)：皱纹看起来像“画上去的”，或者在不自然的地方消失。右图 (真实)：皱纹遵循肌肉组织并具有深度。"
        },
        step6: {
            title: "关卡总结",
            text: "你学会了观察皮肤纹理。“蜡像皮”和不自然的皱纹是AI图像的强力指标。"
        }
    },
    level3: {
        title: "第4关：色彩与饱和度",
        loading: "色彩分析加载中...",
        endTitle: "关卡完成！",
        endText: "你现在对不自然的饱和度和夸张的对比度有了敏锐的眼光。",
        step0: {
            question: "哪张图片是生成的？",
            success: "正确！左边的图片是生成的。"
        },
        step1: {
            question: "为什么这张图片看起来不真实？",
            options: {
                colors: "色彩与皮肤",
                bg: "耳朵",
                hat: "头部装饰",
                eyes: "眼睛颜色"
            },
            feedback: "正确。像这样过度饱和的颜色是一个征兆，皮肤发出不自然的光。 ",
        },
        step2: {
            question: "哪个说法是正确的？",
            options: {
                all: "所有生成图像都是过度饱和的",
                indicator: "过度饱和是生成的指标之一",
                none: "过度饱和说明不了任何问题"
            },
            feedback: "没错。虽然不是全部，但很多生成图像在颜色过于强烈方面存在问题，尤其是肤色。",
        },
        step3: {
            question: "哪张图片有色彩错误？",
            success: "正确！幼儿拥有完美的青绿色头发极不寻常。",
        },
        step4: {
            title: "语境错误",
            text: "生成图像通常会出现只有在特定语境下才会注意到的色彩错误。现实中一个孩子拥有完美染成的青绿色头发非常罕见，因此是生成的迹象。",
        },
        step5: {
            title: "你在这里注意到了什么？",
            subtitle: "选择所有匹配的特征。",
            terms: {
                skin: "过度饱和的皮肤",
                eyes: "不真实的眼睛",
                makeup: "背景错误",
                smooth: "过分柔化的皮肤"
            },
            feedback: "这张图片是生成图像“过度处理”外观的典范，其色彩失真在现实中是不会发生的。",
        },
        step6: {
            title: "分析：",
            text: "右边你可以看到一张标注图。错误区域被再次标记：特别是在面部，颜色和纹理太完美、太柔和了。",
        },
        step7: {
            question: "匹配错误类型！",
            terms: {
                hair: "不真实的头发",
                sat: "过度饱和",
                smooth: "塑料皮"
            },
            success: "匹配完美！你正在培养观察细节的能力。",
            fail: "注意发色（红色）、对比度过高的皮肤和柔和的“塑料感”。",
        },
        step8: {
            title: "关卡总结",
            text: "色彩是一个强力指标。注意“发光”的皮肤、语境下不合逻辑的发色，以及许多AI模型默认生成的通用“Instagram滤镜感”。",
        }
    },
    level4: {
        title: "第5关：面部表情",
        loading: "面部表情分析准备中...",
        endTitle: "关卡完成！",
        endText: "你现在甚至能发现表情中微妙的错误。",
        step0: {
            question: "你在这里注意到了什么？",
            options: {
                pose: "不自然的姿势",
                nothing: "没什么特别的",
                expression: "不自然的解剖结构和表情",
                bg: "背景错误"
            },
            feedback: "正确。表情，尤其是嘴巴区域，看起来很扭曲。",
            fail: "注意表情和姿势：不自然的面部表情和身体姿态通常是AI的迹象。"
        },
        step1: {
            title: "分析：表情与舌头",
            text: "AI模型的一个常见错误是面部表情。在这个例子中，伸出的舌头结合其位置在解剖学上很奇怪。这种表情上的错误是强烈的警示信号。"
        },
        step2: {
            question: "哪张图片是生成的？",
            success: "识别得好！左边的图片显示了典型的伪影（Artifacts）。",
            fail: "注意皮肤、色彩和面部特征。"
        },
        step3: {
            title: "分析：细节",
            text: "又是怪异的面部表情，此外请注意头发和光线反射。皮肤看起来太滑（正如我们在第3关学到的）。此外，面部皱纹和衣服上的图案也很可疑。"
        },
        step4: {
            question: "哪张图片是生成的？",
            success: "正确！通常要注意，生成图像中的人物经常直视镜头。",
            fail: "注意表情：不自然的面部表情，或者在完美的肖像照中出现一个激动的人，通常是生成的迹象。"
        },
        step5: {
            title: "关卡总结",
            text: "面部很复杂。注意空洞的眼神、不对称的眼睛、融合的牙齿或舌头，以及与面部其他部分不完全匹配的情绪。"
        }
    },
    level5: {
        title: "第6关：识别图像错误",
        searching: "搜索所有图像错误...",
        unlocked: "答案已解锁！",
        verify: "已完成",
        check_question: "你找到所有标记的错误了吗？",
        endTitle: "关卡完成！",
        options: { yes: "是的，全找到了", no: "没找全" },
        disclaimer: "标记基于试点研究的用户调查，仅供参考，并非总是完美无缺。",
        step0: {
            title: "图像错误与逻辑",
            text: "识别生成图像的一个好方法是寻找物理或逻辑错误。AI并不“理解”世界，它只是在猜测像素。这经常导致现实中不可能发生的错误。"
        },
        step1: {
            question: "哪张图片是生成的？",
            success: "正确！这张图是假的。"
        },
        step2: {
            title: "分析：细节",
            text: "注意夹克的纽扣（不均匀）、头发（融合），特别是背景中的灯，它物理上不可能悬挂在前景中。"
        },
        search_task: "找出错误！记住它们并点击“查看答案”。",
        options: {
            yes: "是的，全找到了",
            partly: "找到了一些",
            no: "不，漏掉了"
        },
        feedback: "熟能生巧。注意背景和边缘的细节。",
        img11: "注意背景和衣服。",
        img12: "仔细看手和周围环境。",
        img48: "这里的建筑有点问题。",
        img67: "注意反射或阴影。",
        asymmetry: {
            title: "对称错误",
            text: "经典案例：眼镜、首饰或衣服经常是不对称的。这里（图63）眼镜架左右完全不同。"
        },
        finish: {
            title: "关卡总结",
            text: "你现在对“故障（Glitches）”有了感觉。如果某样东西在物理上不合逻辑（悬浮的灯、半副眼镜），它极有可能是AI生成的。"
        }
    },
    etappenQuiz: {
        intro: {
            title: "阶段测验：你已经学会了什么？",
            text: "你已经学了很多关于背景、皮肤、色彩和解剖结构的知识。现在来真的了：10张图片。没有提示。找出假图。"
        },
        round: "回合",
        finish: {
            title: "测验结束",
            text_perfect: "太不可思议了！你已经练就了火眼金睛。",
            text_good: "非常好！你几乎识别出了所有图片。",
            text_ok: "不错，但还要更注意细节。",
            score: "你的得分："
        }
    },
    level7: {
        loading: "阶段测验加载中...",
        introTitle: "阶段测验",
        introText: "准备好迎接测验2了吗？展示你所学到的东西。",
        startBtn: "开始测验",
        roundLabel: "回合",
        questionText: "真实还是生成？",
        endTitle: "阶段成果",
        endText: "卓越。你已完成研究的第二阶段。你的进度已保存。",
    },
    level8: {
        title: "第8关：现代AI",
        loading: "社交媒体环境模拟中...",
        endTitle: "第8关完成！",
        step0: {
            title: "现代生成与语境",
            text: "现代模型（约2025年11月26日之后）在技术上几近完美。皮肤、光影几乎无法与照片区分。此时通常只有一种方法有效：语境（Context）。"
        },
        step1: {
            question: "这张图片有什么可疑之处？",
            options: {
                quality: "画质差",
                scene: "不太可能的场景",
                filter: "滤镜太重"
            },
            feedback: "正确。知名人士出现在完全不合时宜的历史或私人场景中的自拍照极不可能。语境是告密者。",
            fail: "仔细看。场景与人物和时间匹配吗？"
        },
        step2: {
            question: "哪张图片具有误导性？",
            success: "正确！这张图片是典型的“标题党”照片，旨在激发强烈的情绪。在德国，2025年底有一张非常相似的照片流传并引起了病毒式传播。",
            fail: "看情绪：标题党图片旨在产生愤怒或同情。此类图片通常是生成的，以便快速获得点击量。"
        },
        step3: {
            title: "社交媒体分析",
            text: "你会看到一个模拟的 Instagram 界面。仔细查看这些账号。选出你认为是假冒的账号。\n\n分析建议：\n1. 账号何时创建的？（很多AI机器人账号很新）。\n2. 它只发图片吗？（视频更难造假）。\n3. 粉丝数很少的“网红”却在卖产品？"
        },
        feed: {
            ad: "广告",
            instruction: "滚动浏览动态。点击姓名查看个人资料。标记你认为是假的个人资料。",
            joined: "加入时间",
            business: "商业账号",
            report: "举报为造假",
            marked: "🚩 已标记",
            success: "分析得太棒了！你识破了机器人和操纵性账号。",
            fail: "不完全对。看第一条帖子的日期和用户描述。通常公司创建网红账号只是为了广告。许多虚假资料还会通过带有情感色彩的生成图像传播假消息。"
        },
        analysis: {
            title: "机器人账号分析",
            text: "识破机器人意味着检查语境。例如 'Lara_Life' 在短短一个月内获得了28万粉丝，这是人工增长和机器人账号的明显迹象。"
        },
        finish: {
            title: "总结",
            text: "恭喜！你成功结束了第8关。你现在已经准备好迎接最终测验了。"
        }
    },
    level9: {
        loading: "决赛准备中...",
        introTitle: "决赛",
        introText: "只剩下我们最好的AI图像了。这是对你能力的最终测试。你准备好了吗？",
        startBtn: "立即开始",
        roundLabel: "最终回合",
        endTitle: "研究已完成！",
        endText: "优秀！你已完成所有训练和测试。你的贡献对于我们研究用户识别生成图像的能力极其宝贵。",
        viewLeaderboard: "查看排行榜"
    },
    spotTheFake: {
        deselect: "取消选择",
        select: "选择此图片",
        wrongTitle: "不完全对...",
        wrongDefault: "请选择另一张图片并重试。",
        successDefault: "识别正确！",
        timeout: "时间到！",
        photosBy: "摄影师：",
        onUnsplash: "发布于 Unsplash",
        badges: {
            selected: "已选",
            real: "真实",
            ai: "AI"
        }
    },
    singleChoice: {
        lockedMessage: "正在寻找图像错误...",
        surveyFeedback: "感谢您的评估！",
        wrongDefault: "不完全正确。"
    },
    realOrFake: {
        timeout: "时间到！",
        real: "真实",
        ai: "生成",
        badges: {
            correct: "正确",
            wrong: "错误"
        },
        feedback: {
            correct: "做得好！",
            wrong: "很遗憾，答错了。"
        },
        explanation: {
            is: "这张图片是",
            ai: "AI 生成的。",
            real: "真实的照片。"
        },
        credits: {
            by: "摄影师：",
            on: " 发布于 Unsplash"
        }
    },
    multiCheck: {
        defaultQuestion: "哪些图片是生成的？",
        options: {
            none: "都是真实的",
            both: "都是生成的",
            left: "1 号是生成的",
            right: "2 号是生成的"
        },
        feedback: {
            success: "非常好！你对两张图片的评估都正确。",
            fail: "不完全正确。再仔细观察一下背景细节。"
        }
    },
    imageMatching: {
        step1: "<strong>第 1 步：</strong>选择一个术语。",
        step2: "<strong>第 2 步：</strong>点击匹配的图片。",
        finished: "分析完成",
        zoomHint: "点击无文字图片以放大显示。",
        failDefault: "不完全正确。正确的对应关系已标出。"
    },
    gridSelect: {
        loading: "加载中...",
        selectedBadge: "已选",
        deselect: "取消选择",
        select: "标记为 AI",
        error: "错误！请重试！",
        successDefault: "识别正确！",
        aiBadge: "AI"
    },
    conceptTagging: {
        errorDefault: "不完全正确。忽略了一些特征或标记有误。"
    },
    analysis: {
        altText: "图像分析"
    }
};