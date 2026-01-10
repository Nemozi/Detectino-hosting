export default {
    generic: {
        correct: "正确！",
        wrong: "错误",
        step: "步骤",
        next: "下一步",
        verify: "检查",
        loading: "正在加载内容...",
        finish: "结束关卡",
        understood: "明白了",
        completeLevel: "完成关卡",
        backToMap: "返回关卡列表",
        image: "图片",
        nextRound: "下一轮",
    },
    didactic: {
        title: " 为什么 AI 会犯错？",
        intro: "在开始之前，请记住以下分析的核心原则：",
        point1_title: "缺乏对世界的理解",
        point1_text: "AI 是统计计算器，而不是艺术家。它们并不真正理解什么是“手”或“物理定律”。",
        point2_title: "像素概率",
        point2_text: "它们只是根据统计学计算哪些像素最有可能出现在另一个像素旁边。",
        point3_title: "逻辑漏洞",
        point3_text: "因为它们只将世界视为平面模式，所以经常在逻辑上失败（例如：6 根手指或错误的阴影）。",
        button: "明白了，开始！"
    },
    navbar: {
        play: "开始游戏",
        participate: "参与",
        menu: "菜单",
        profile: "个人资料",
        logout: "注销并退出",
        streakSuffix: " 天连续成就！",
        info: "信息",
        leaderboard: "排行榜",
        stats: "统计数据"
    },
levels: {
        mainTitle: "你的旅程",
        loading: "正在加载关卡...",
        level_1: "测验 1: 入门测验",
        level_2: "学习单元 1",
        level_3: "学习单元 2",
        level_4: "学习单元 3",
        level_5: "学习单元 4",
        level_6: "学习单元 5",
        level_7: "测验 2: 阶段测验",
        level_8: "学习单元 6",
        level_9: "测验 3: 终极决赛"
    },
    profile: {
        title: "个人资料",
        loading: "正在加载数据...",
        loggedAs: "当前登录身份：",
        emailLabel: "电子邮件",
        fallbackName: "侦探",
        stats: {
            age: "年龄",
            internet: "网络经验",
            skill: "技能等级"
        },
        actions: {
            viewStats: "查看统计数据",
            logout: "注销"
        }
    },
    leaderboard: {
        title: "顶级侦探",
        description: "Detectino 研究中最成功的 AI 猎人。",
        colRank: "#",
        colUser: "用户",
        colPoints: "积分",
        loading: "正在寻找最强猎人...",
        meBadge: "你",
        footer: "积分会在每个关卡完成后更新。"
    },
    register: {
        title: "参与者信息",
        errorGeneric: "发生错误，请重试。",
        aliasSection: "你的昵称",
        usernameLabel: "用户名（可选）",
        usernamePlaceholder: "输入昵称",
        aboutSection: "个人信息",
        ageLabel: "年龄",
        genderLabel: "性别",
        genderOptions: {
            female: "女",
            male: "男",
            divers: "多元/其他"
        },
        affinityLabel: "互联网亲和力",
        affinityLow: "低",
        affinityHigh: "高",
        skillLabel: "现有的 AI 知识",
        skillLow: "初学者",
        skillHigh: "专家",
        submitButton: "现在开始游戏",
        loading: "加载中..."
    },
    welcome: {
        title: "欢迎来到 Detectino",
        intro: "学习如何识别 AI 生成的图片，武装自己以应对虚假信息的浪潮。",
        button: "出发"
    },
    explain: {
        title: "运行方式",
        stepA: "欢迎来到 Detectino。在这里，你将学习如何识别 AI 生成的图像并测试你的能力。",
        stepB: "在下一步中，你将看到各个关卡。通过游戏解锁更多内容，如“真实还是 AI？”。",
        stepC: "欢迎查看排行榜并与其他玩家比较。你也可以在菜单中找到详细的数据分析。",
        stepD: "Detectino 是一个研究项目。你的数据将以匿名方式收集。更多信息请见“信息”栏。",
        button: "出发"
    },
    info: {
        title: "关于 Detectino",
        description: "Detectino 是一款严肃游戏（Serious Game），旨在通过教学方式引导你识别 AI 生成的图像。本项目由 Nemo Ziener 作为其学士论文的一部分开发。所有收集的数据仅用于匿名处理分析。",
        unsplashNote: "本应用使用 Unsplash API，但未经 Unsplash 支持或认证。生成的图像来自 AIS-4SD 数据集，或者是自行生成的。",
        button: "出发"
    },
    dashboard: {
        header: {
            title: "研究数据",
            status: "实时数据",
            subtitle: "通过 Detectino 测量的生成图像识别能力分析"
        },
        kpis: {
            participants: "参与者人数",
            decisions: "总决策数",
            accuracy: "全局准确率",
            affinity: "平均网络经验"
        },
        tech: {
            title: "技术差距",
            modern: "现代 AI (NANO)",
            diff: "差异",
            loss: "现代模型的准确率损失"
        },
        correlation: {
            title: "评估相关性",
            self: "自我评价 (1-10)",
            reality: "真实能力 (1-10)"
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
            desc: "基于总参与者的各关卡完成率"
        }
    },
    level0: {
        loading: "正在加载入门测验...",
        introTitle: "Level 1: 入门测验",
        introText: "真实的还是生成的？通过 10 张单张图片测试你的直觉。这是你在开始训练前对自己能力的初次评估。",
        questionText: "哪张图片是生成的？",
        startBtn: "开始测验",
        endTitle: "评估完成",
        endText: "你已成功完成入门测验。你的分数已保存，现在你可以开始地图上的训练了。",
    },
    level1: {
        title: "Level 2",
        loading: "正在同步图片...",
        endTitle: "关卡完成！",
        endText: "背景对你来说不再是秘密。",
        introTitle: "真相测验",
        introText: "真实的还是生成的？通过 10 张单张图片测试你的直觉。",
        startBtn: "开始测验",
        step0: {
            question: "哪张图片是生成的？",
            success: "正确！这是生成的图片。"
        },
        step1: {
            title: "分析：比例、缩放与一致性",
            text: "这里有一个典型的错误：AI 虽然注重细节，但忽略了大局。画面中的男人可能看起来很真实，但他身后的迷宫太小了——比例完全不对。"
        },
        step2: {
            question: "这些图片是生成的吗？",
            options: {
                none: "两张都是真实的",
                both: "两张 attitude 是生成的",
                left: "1号图片",
                right: "2号图片"
            },
            feedback: {
                success: "太棒了！两张都是生成的。",
                fail: "两张都是生成的。注意那个男孩背景的扭曲和皮肤。那个戴眼镜的男人，眼镜非常可疑，且相对于他离墙的距离，背景显得过于模糊。"
            }
        },
        step3: {
            title: "错误分析：分割的背景",
            text: "好险！注意这里的背景：它被中心的物体（人）“一分为二”了。左边的森林完全模糊，右边的结构看起来却截然不同。这是一个典型的生成错误。"
        },
        step4: {
            title: "错误分析：纹理",
            text: "仔细看那面墙。相对于男人靠得那么近，墙面显得过于模糊。这种模糊感不像相机的真实“背景虚化（Bokeh）”效果，而显得泥泞且模糊不清。"
        },
        step5: {
            question: "哪张图片的背景暗示了它是生成的？",
            success: "正确！人物切断了背景：左边是小屋，右边突然变成了森林。这不合逻辑。"
        },
        step6: {
            title: "你在背景中发现了什么？",
            subtitle: "选择所有合适的描述。",
            terms: {
                blurred: "模糊的纹理",
                inconsistent: "不一致的特征",
                unrealistic: "不真实的呈现",
                lighting: "光影表现错误"
            },
            feedback: "答案是：以上全部！这些类型的错误通常会重叠出现。"
        },
        step7: {
            title: "关卡总结",
            text: "总结：背景常通过不合逻辑的过渡出卖 AI。注意观察人物左右两侧的物体是否真正属于同一个场景，或者背景线条是否突然中断。"
        }
    },
    level2: {
        title: "Level 3",
        loading: "正在加载皮肤细节...",
        endTitle: "关卡完成！",
        endText: "你证明了你对皮肤细节有敏锐的洞察力。",
        step0: {
            question: "哪张图片是生成的？",
            success: "正确！"
        },
        step1: {
            question: "这里哪一点最能说明图片是生成的？",
            options: {
                skin: "皮肤纹理",
                nose: "鼻子",
                eyes: "眼睛",
                hair: "头发"
            },
            feedback: "没错！在生成的图片中，皮肤通常看起来太光滑或有“蜡感”。",
            fail: "注意皮肤纹理：过于光滑或反光通常显得不自然。"
        },
        step2: {
            title: "分析：皮肤",
            text: "AI 模型通常倾向于夸张。因为 AI 不了解真实的毛孔或细小的汗毛，皮肤往往看起来像被“烫平”了或者像蜡一样，几乎像洋娃娃或塑料制成的。如果一张脸闪烁着过于完美的光泽，那就是明显的警告信号。"
        },
        step3: {
            question: "哪些图片看起来是生成的？（多选）",
            success: "非常好！你识破了这种“塑料感”。",
            fail: "注意皮肤纹理：太光滑或反光往往是不自然的。"
        },
        step4: {
            question: "这张图片有什么奇怪的地方？",
            subtitle: "选择所有适用的特征。",
            terms: {
                smooth: "蜡像般的皮肤",
                wrinkles: "不自然的皱纹",
                eyes: "眼睛颜色",
                tattoos: "纹身"
            },
            feedback: "正确。对于这个年龄来说，皮肤太光滑了，且皱纹的走势很不自然。"
        },
        step5: {
            title: "对比：皱纹",
            text: "图片 1 (AI)：皱纹看起来像“画上去的”，或者在不自然的地方消失。真实的皱纹会遵循肌肉结构并具有深度。"
        },
        step6: {
            title: "关卡总结",
            text: "你已经学会了观察皮肤纹理。“蜡像脸”和不自然的皱纹是 AI 生成图像的重要指标。"
        }
    },
    level3: {
        title: "Level 4",
        loading: "正在加载色彩分析...",
        endTitle: "关卡完成！",
        endText: "你现在对不自然的饱和度和夸张的对比度有了敏锐的眼光。",
        step0: {
            question: "哪张图片是生成的？",
            success: "正确！左边的图片是生成的。"
        },
        step1: {
            question: "为什么这张图片看起来很假？",
            options: {
                colors: "颜色与皮肤",
                bg: "嘴巴",
                hat: "头饰",
                eyes: "眼睛颜色"
            },
            feedback: "正确。像这样过度饱和的颜色是一个迹象，皮肤“发光”得不自然。"
        },
        step2: {
            question: "哪种说法是正确的？",
            options: {
                all: "所有生成的图片都是过度饱和的",
                indicator: "过度饱和是生成的指标之一",
                none: "饱和度没有任何说明意义"
            },
            feedback: "没错。虽然不是全部，但许多生成的图片在颜色强度上存在问题，尤其是皮肤色调。"
        },
        step3: {
            question: "哪张图片有颜色错误？",
            success: "正确！蹒跚学步的孩子拥有完美的青绿色头发极不寻常。"
        },
        step4: {
            title: "语境错误",
            text: "生成的图片通常会有颜色错误，这只有在特定语境下才会引起注意。现实中极少有孩子染着完美的青绿色头发，因此这是生成的迹象。"
        },
        step5: {
            title: "你在这里发现了什么？",
            subtitle: "选择所有匹配的特征。",
            terms: {
                skin: "过度饱和的皮肤",
                eyes: "不真实的眼睛",
                makeup: "背景错误",
                smooth: "过分柔化的皮肤"
            },
            feedback: "这张图是生成图像典型“过度加工”外观的绝佳案例，颜色扭曲在现实中是不存在的。"
        },
        step6: {
            title: "分析：",
            text: "在第二张图中你可以看到一张热力图。错误区域被标记了出来：尤其是面部，颜色和纹理过于完美且柔和。"
        },
        step7: {
            question: "匹配错误类型！",
            terms: {
                hair: "不真实的头发",
                sat: "过度饱和",
                smooth: "塑料感皮肤"
            },
            success: "完美匹配！你开始关注细节了。",
            fail: "注意发色（红色）、对比度过高的皮肤以及柔和的“塑料感”。"
        },
        step8: {
            title: "关卡总结",
            text: "颜色是一个强有力的指标。注意“发光”的皮肤、不合常理的发色，以及许多 AI 模型默认生成的“Instagram 滤镜感”。"
        }
    },
    level4: {
        title: "Level 5",
        loading: "正在准备表情分析...",
        endTitle: "关卡完成！",
        endText: "你现在甚至能发现表情中细微的错误。",
        step0: {
            question: "你在这里发现了什么？",
            options: {
                pose: "不自然的姿势",
                nothing: "没什么特别的",
                expression: "不自然的解剖结构与表情",
                bg: "背景错误"
            },
            feedback: "正确。表情，尤其是嘴部区域，看起来很扭曲。",
            fail: "注意表情和姿势：不自然的表情和身体姿态通常是 AI 的标志。"
        },
        step1: {
            title: "分析：表情与舌头",
            text: "AI 模型经常在面部表情上出错。在这个例子中，吐出的舌头结合她的姿势在解剖学上很可疑。这种表情错误是强烈的警告信号。"
        },
        step2: {
            question: "哪张图片是生成的？",
            success: "识别得好！左边的图显示了典型的瑕疵。",
            fail: "注意皮肤、颜色和面部特征。"
        },
        step3: {
            title: "分析：细节",
            text: "又是奇怪的表情，此外注意头发和光影反射。皮肤看起来太光滑了（正如我们在 Level 3 学到的）。此外，面部皱纹和衣服图案也很可疑。"
        },
        step4: {
            question: "哪张图片是生成的？",
            success: "正确！通常要注意，生成图片中的角色往往会直接盯着镜头看。",
            fail: "注意表情：不自然的表情或者在完美肖像中出现极其亢奋的人，通常是生成的迹象。"
        },
        step5: {
            title: "关卡总结",
            text: "面部极其复杂。注意“空洞的眼神”或看起来有些扭曲的微笑。因为 AI 没有真实的情感，它只是猜测表情应该是什么样子，往往会弄歪嘴角或眼周区域。"
        }
    },
    level5: {
        title: "Level 6",
        searching: "正在寻找所有图像错误...",
        unlocked: "答案已解锁！",
        verify: "已完成",
        check_question: "你找到所有标记的错误了吗？",
        endTitle: "关卡完成！",
        options: { yes: "是的，全找到了", no: "没找全" },
        disclaimer: "标记基于试点研究的用户调查，仅供参考。它们并不总是完美的。",
        step0: {
            title: "图像错误与逻辑",
            text: "AI 不理解我们的世界是如何物理运作的。因此会出现现实中不可能发生的错误：物体互相融合、眼镜不对称、或者阴影投向完全不同的方向。"
        },
        step1: {
            question: "哪张图片是生成的？",
            success: "正确！这张图片是伪造的。"
        },
        step2: {
            title: "分析：细节",
            text: "注意夹克的纽扣（不均匀）、头发（融合），尤其是背景中的灯，它物理上不可能挂在前景中。"
        },
        search_task: "寻找错误！记住它们，然后点击“查看答案”。",
        asymmetry: {
            title: "对称性错误",
            text: "经典错误：眼镜、首饰或衣服经常是不对称的。这里眼镜架左右完全不同。"
        },
        finish: {
            title: "关卡总结",
            text: "你现在对“破绽（Glitches）”有了感觉。如果某件事在物理上不合逻辑（悬浮的灯、半副眼镜），那极有可能是 AI。"
        },
        step_text: {
            question: "你能找到生成的图片吗？",
            title: "人造字体",
            text: "你注意到了吗？背景上的文字无法辨认。这不仅是因为距离，而是因为 AI 往往无法生成真实的字体。它们生成的形状只是看起来像字母（即所谓的“乱码 Gibberish”）。"
        },
        step_fingers: {
            question: "有一张图片的手部解剖有问题。是哪张？",
            title: "手指过多",
            text: "手部是 AI 最大的弱点之一。手指经常融合在一起，或者 AI 干脆生成了 6 根甚至更多手指。不自然的弯曲也很常见。不过：这种错误在现代模型中已相对少见。"
        },
        step_legs: {
            question: "你能看出图片下方的错误吗？",
            title: "不可能的腿",
            text: "在全身照中，AI 经常搞不清肢体。这里的一条腿从解剖学上不可能的位置长了出来。不过：这种错误在现代模型中已相对少见。"
        }
    },
    level7: {
        loading: "正在加载阶段测验...",
        introTitle: "Level 7: 阶段测验",
        introText: "你准备好迎接测验 2 了吗？展示你学到的东西。",
        startBtn: "开始测验",
        roundLabel: "回合",
        questionText: "真实的还是生成的？",
        endTitle: "阶段性结果",
        endText: "太棒了。你已经完成了研究的第二阶段。你的进度已保存。",
    },
    level8: {
        title: "Level 8",
        loading: "正在模拟社交媒体环境...",
        endTitle: "Level 8 已完成！",
        step0: {
            title: "现代生成技术与语境",
            text: "现代模型在技术上几乎完美。皮肤、光影几乎与照片无异。这时，通常只有一件东西能帮到你：语境。"
        },
        step1: {
            question: "这张图片有什么可疑之处？",
            options: {
                quality: "画质差",
                scene: "极不可能发生的场景",
                filter: "滤镜太重"
            },
            feedback: "正确。一个名人出现在完全不合时宜的历史或私密语境下的自拍是极不可能的。语境是唯一的破绽。",
            fail: "仔细看，这个场景符合这个人物和时代吗？"
        },
        step2: {
            question: "哪张图片具有误导性？",
            success: "正确！这张图片是为了故意欺骗我们而创建的。这类假图常利用人造的危险（如铁丝网或警察）来引发恐惧。情绪化的图片在网上传播得更快，这正是虚假信息的目标。",
            fail: "看情绪：诱导性图片（Clickbait）旨在引发愤怒或同情。这类图片通常是生成的，为了快速获取流量。"
        },
        feed: {
            ad: "广告",
            instruction: "浏览信息流。点击名字查看个人资料。标记出三个发布生成内容的账号。",
            joined: "加入时间：",
            business: "商业账号",
            report: "举报为假内容",
            marked: "🚩 已标记",
            success: "分析得太棒了！你揭穿了机器人和误导性账号。",
            fail: "不完全正确。看看第一条帖子的发布日期和用户描述。许多公司创建网红账号只是为了广告。许多虚假资料还会通过情绪化的生成图像传播假消息。"
        },
        analysis: {
            title: "机器人账号分析",
            text: "识别机器人意味着检查语境。例如 'Lara_Life' 在短短一个月内获得了 28 万粉丝，这是人工刷量和机器人账号的明显迹象。"
        },
        finish: {
            title: "总结",
            text: "恭喜！你成功完成了 Level 8。你现在可以进入最终测验了。"
        }
    },
    level9: {
        loading: "正在准备最终决赛...",
        introTitle: "Level 9",
        introText: "只剩下我们最精选的 AI 图像了。这是对你能力的最终测试。准备好了吗？",
        startBtn: "现在开始",
        roundLabel: "决赛回合",
        endTitle: "研究已完成！",
        endText: "出色！你已经完成了训练和所有测试。你的贡献对我们关于用户识别生成图像能力的研究极其宝贵。",
        viewLeaderboard: "查看排行榜"
    },
    spotTheFake: {
        deselect: "取消选择",
        select: "选择此图",
        wrongTitle: "不完全正确...",
        wrongDefault: "选择另一张图并重试。",
        successDefault: "识别正确！",
        timeout: "时间到！",
        photosBy: "摄影师：",
        onUnsplash: "来源于 Unsplash",
        badges: {
            selected: "已选",
            real: "真实",
            ai: "AI"
        }
    },
    singleChoice: {
        lockedMessage: "寻找图像错误...",
        surveyFeedback: "感谢你的评价！",
        wrongDefault: "不完全正确。"
    },
    realOrFake: {
        timeout: "时间到！",
        real: "真实",
        ai: "生成的",
        badges: {
            correct: "正确",
            wrong: "错误"
        },
        feedback: {
            correct: "做得好！",
            wrong: "很遗憾，答错了。"
        },
        explanation: {
            is: "这张图片是 ",
            ai: "AI 生成的。",
            real: "真实的摄影图片。"
        },
        credits: {
            by: "摄影师：",
            on: " 来源于 Unsplash"
        }
    },
    multiCheck: {
        defaultQuestion: "以下哪些图片是生成的？",
        options: {
            none: "两张都真实",
            both: "两张都生成",
            left: "1号是生成的",
            right: "2号是生成的"
        },
        feedback: {
            success: "非常好！你正确评估了两张图片。",
            fail: "不完全正确。再仔细观察背景中的细节。"
        }
    },
    imageMatching: {
        step1: "<strong>步骤 1：</strong> 选择一个术语。",
        step2: "<strong>步骤 2：</strong> 点击匹配的图片。",
        finished: "分析完成",
        zoomHint: "点击不带文字的图片可放大查看。",
        failDefault: "很遗憾，不完全正确。正确的对应关系现已标记。"
    },
    gridSelect: {
        loading: "正在加载...",
        selectedBadge: "已选",
        deselect: "取消选择",
        select: "标记为 AI",
        error: "错误！再试一次！",
        successDefault: "识别正确！",
        aiBadge: "AI"
    },
    conceptTagging: {
        errorDefault: "不完全正确。一些特征被忽略或选错了。"
    },
    analysis: {
        altText: "分析图片"
    },
};