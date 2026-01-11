export default {
    generic: {
        correct: "Doğru!",
        wrong: "Yanlış",
        step: "Adım",
        next: "Devam",
        verify: "Kontrol Et",
        loading: "İçerik yükleniyor...",
        finish: "Seviyeyi Bitir",
        understood: "Anladım",
        completeLevel: "Seviyeyi Tamamla",
        backToMap: "Seviyelere Dön",
        image: "Görsel",
        nextRound: "Sonraki Tur",
    },
    didactic: {
        title: "Yapay Zeka Neden Hata Yapar?",
        intro: "Başlamadan önce, analiziniz için en önemli ilkeyi öğrenin:",
        point1_title: "Dünya Anlayışı Yoktur",
        point1_text: "Yapay zekalar istatistiksel hesap makineleridir. Bir 'el'in ne olduğunu veya 'fizik' kurallarını bilmezler.",
        point2_title: "Piksel Olasılığı",
        point2_text: "Sadece hangi piksellerin istatistiksel olarak yan yana gelebileceğini hesaplarlar.",
        point3_title: "Mantık Boşlukları",
        point3_text: "Dünyayı sadece yüzeysel desenler olarak tanıdıkları için mantık konusunda sıkça hata yaparlar (örneğin 6 parmak veya yanlış gölgeler).",
        button: "Anlaşıldı, Başla!"
    },
    navbar: {
        play: "Oyuna Git",
        participate: "Katıl",
        menu: "Menü",
        profile: "Profilim",
        logout: "Oturumu Kapat ve Bitir",
        streakSuffix: " seri!",
        info: "Bilgi",
        leaderboard: "Liderlik Tablosu",
        stats: "İstatistikler"
    },
    levels: {
        mainTitle: "Yolculuğun",
        loading: "İçerik yükleniyor...",
        level_1: "Test 1: Giriş Testi",
        level_2: "Öğrenme Modülü 1",
        level_3: "Öğrenme Modülü 2",
        level_4: "Öğrenme Modülü 3",
        level_5: "Öğrenme Modülü 4",
        level_6: "Öğrenme Modülü 5",
        level_7: "Test 2: Etap Testi",
        level_8: "Öğrenme Modülü 6",
        level_9: "Test 3: Final"
    },
    profile: {
        title: "Profilin",
        loading: "Veriler yükleniyor...",
        loggedAs: "Olarak giriş yapıldı",
        emailLabel: "E-posta",
        fallbackName: "Dedektif",
        stats: {
            age: "Yaş",
            internet: "İnternet",
            skill: "Yetenek"
        },
        actions: {
            viewStats: "İstatistikleri görüntüle",
            logout: "Çıkış yap"
        },
        gender_options: {   
            female: "Kadın",
            male: "Erkek",
            divers: "Diğer"
        }
    },
    leaderboard: {
        title: "En İyi Dedektifler",
        description: "Detectino çalışmasının en başarılı YZ avcıları.",
        colRank: "#",
        colUser: "Kullanıcı",
        colPoints: "Puan",
        loading: "En iyi avcılar aranıyor...",
        meBadge: "SEN",
        footer: "Puanların her seviye tamamlandığında güncellenir."
    },
    register: {
        title: "Katılım & Profil",
        errorGeneric: "Bir hata oluştu. Lütfen tekrar deneyin.",
        aliasSection: "Takma Adın",
        usernameLabel: "Kullanıcı Adı (İsteğe bağlı)",
        usernamePlaceholder: "Takma adın",
        aboutSection: "Senin Hakkında",
        ageLabel: "Yaşın",
        genderLabel: "Cinsiyet",
        genderOptions: {
            female: "Kadın",
            male: "Erkek",
            divers: "Diğer"
        },
        affinityLabel: "İnternet Yatkınlığı",
        affinityLow: "Düşük",
        affinityHigh: "Yüksek",
        skillLabel: "YZ Bilgi Seviyesi",
        skillLow: "Az",
        skillHigh: "Uzman",
        submitButton: "Oyunu Başlat",
        loading: "Yükleniyor..."
    },
    welcome: {
        title: "Detectino'ya Hoş Geldin",
        intro: "Yapay zeka tarafından oluşturulan görselleri tanımayı öğren ve sahte içerik seline karşı kendini donat.",
        button: "Hadi Başlayalım"
    },
    explain: {
        title: "Nasıl Çalışır?",
        stepA: "Detectino'ya hoş geldin. Burada 'YZ üretimi görselleri' tanımayı öğrenecek ve yeteneklerini test edeceksin.",
        stepB: "Bir sonraki adımda seviyelerin gösterilecek. Yeni içeriklerin kilidini açmak için oyna.",
        stepC: "Liderlik tablosuna göz atabilir ve diğer oyuncularla kendini kıyaslayabilirsin. Analiz istatistiklerini menüde bulabilirsin.",
        stepD: "Detectino bir araştırma projesidir. Verilerin anonim olarak toplanır. Daha fazla bilgiyi 'Bilgi' kısmında bulabilirsin.",
        button: "Hadi Başlayalım"
    },
    info: {
        title: "Detectino Hakkında",
        description: "Detectino, YZ üretimi görselleri tanımayı didaktik bir şekilde öğretmeyi amaçlayan bir 'Serious Game'dir (Ciddi Oyun). Oyun, Nemo Ziener'in bitirme tezi kapsamında geliştirilmiştir. Toplanan tüm veriler yalnızca anonim olarak işlenmektedir.",
        unsplashNote: "bu uygulama Unsplash API'sini kullanmaktadır ancak Unsplash tarafından desteklenmemekte veya onaylanmamaktadır. Üretilen görseller AIS-4SD veri setinden alınmıştır veya tarafımızca üretilmiştir.",
        button: "Başla"
    },
    dashboard: {
        header: {
          title: "SONUÇ ANALİZİ",
          subtitle: "YZ tanıma üzerine yapılan denek çalışmasının değerlendirmesi",
          status: "CANLI VERİ"
        },
        kpis: {
          participants: "Katılımcılar",
          decisions: "Kararlar",
          accuracy: "Doğruluk Oranı",
          skillGain: "Öğrenme Artışı"
        },
        borji: {
          title: "YZ Hata Türleri Kontrolü",
          anatomy: "Vücut & Detaylar",
          context: "Mantık & Bağlam",
          text: "Yazı & Karakterler",
          patterns: "Şekiller & Desenler",
          desc: "Tipik YZ hataları ilgili kategorilerde ne kadar iyi tanındı?"
        },
        tech: {
          title: "Teknoloji Karşılaştırması",
          standard: "Standart YZ",
          modern: "Modern YZ",
          diff: "Zorluk Farkı"
        },
        correlation: {
          self: "Öz değerlendirme",
          reality: "Gerçeklik",
          title: "Öz Değerlendirme vs. Sonuç",
          desc: "Tahmin ettiğin yetenek ile gerçek sonuç arasındaki karşılaştırma."
        },
        impact: {
          title: "Öğrenme İlerlemen",
          start: "Önce (Seviye 1)",
          end: "Sonra (Seviye 9)",
          desc: "Öğrenme modüllerinden önceki ve sonraki tanıma oranlarının karşılaştırması."
        },
        learning: {
          title: "Öğrenme Eğrisi",
          quiz: "Test Sonucu",
          tutorial: "Eğitim Tamamlama"
        },
        demographics: {
          title: "Gruplara Göre İstatistikler",
          ageTitle: "Yaşa Göre Başarı",
          genderTitle: "Cinsiyete Göre Başarı",
          years: "Yıl"
        },
        funnel: {
          title: "Oyun Akışı",
          user: "Kullanıcı"
        }
    },
    level0: {
        loading: "Giriş testi yükleniyor...",
        introTitle: "Gerçeklik Testi",
        introText: "Gerçek mi yapay mı? 10 görsel üzerinde içgüdülerini test et. Bu, eğitime başlamadan önceki ilk yetenek ölçümündür.",
        questionText: "Hangi görsel yapay zeka üretimidir?",
        startBtn: "Testi Başlat",
        endTitle: "Değerlendirme Tamamlandı",
        endText: "Giriş testini başarıyla tamamladın. Puanın kaydedildi ve artık haritadaki eğitimlere başlayabilirsin.",
    },
    level1: {
        title: "Seviye 2: Arka Planlar",
        loading: "Görseller senkronize ediliyor...",
        endTitle: "Seviye Tamamlandı!",
        endText: "Arka planlar artık senin için bir sır değil.",
        introTitle: "Gerçeklik Testi",
        introText: "Gerçek mi yapay mı? 10 görsel üzerinde içgüdülerini test et. Bu senin ilk yetenek ölçümündür.",
        startBtn: "Testi Başlat",
        step0: {
            question: "Hangi görsel yapay zeka üretimidir?",
            success: "Doğru! Bu görsel yapay zeka üretimidir."
        },
        step1: {
            title: "Analiz: Ölçek, Boyutlandırma & Tutarlılık",
            text: "Burada tipik bir hata görüyorsun: YZ detaylara odaklansa da bütünü gözden kaçırıyor. Adam gerçekçi görünebilir ama arkasındaki labirent çok küçük; boyut oranları birbirine uymuyor."
        },
        step2: {
            question: "Bu görseller yapay zeka üretimi mi?",
            options: {
                none: "İkisi de gerçek",
                both: "İkisi de yapay",
                left: "No. 1",
                right: "No. 2"
            },
            feedback: {
                success: "Mükemmel! İkisi de yapay zeka üretimi.",
                fail: "İkisi de yapay. Çocukta bozulmuş arka plana ve cildine dikkat et. Adamda ise gözlükler çok belirgin ve duvara bu kadar yakın durmasına rağmen çok bulanık."
            }
        },
        step3: {
            title: "Hata Analizi: Bölünmüş Arka Plan",
            text: "Yaklaştın! Arka plana dikkat et: Merkezdeki nesne (kişi) tarafından adeta 'ikiye bölünmüş'. Solda orman tamamen bulanık, sağda ise yapı tamamen farklı görünüyor. Klasik bir üretim hatası."
        },
        step4: {
            title: "Hata Analizi: Dokular",
            text: "Duvara dikkatlice bak. Adamın duvara olan yakınlığına kıyasla çok fazla bulanık. Bu bulanıklık gerçek bir kamera 'bokeh efekti' (alan derinliği) gibi değil, sadece çamurlu ve silik görünüyor."
        },
        step5: {
            question: "Hangi görselde arka plan bir yapay zeka üretimine işaret ediyor?",
            success: "Doğru! Adam arka planı ayırıyor: Solda bir kulübe, sağda aniden bir orman. Bunlar birbirine uymuyor."
        },
        step6: {
            title: "Arka planda ne dikkatini çekiyor?",
            subtitle: "Uygun olan tüm terimleri seç.",
            terms: {
                blurred: "Bulanık dokular",
                inconsistent: "Tutarsız özellikler",
                unrealistic: "Gerçekçi olmayan sunum",
                lighting: "Işık ve gölge hataları"
            },
            feedback: "Cevap: Hepsi doğru! Bu hata türleri genellikle birbiriyle örtüşür."
        },
        step7: {
            title: "Seviye Sonu",
            text: "Özetle: Arka planlar genellikle mantıksız geçişlerle YZ'yi ele verir. Bir kişinin solundaki ve sağındaki nesnelerin gerçekten birbirine ait olup olmadığına veya arka plandaki çizgilerin aniden kesilip kesilmediğine dikkat et."
        }
    },
    level2: {
        title: "Seviye 3: Cilt Dokuları",
        loading: "Cilt detayları yükleniyor...",
        endTitle: "Seviye Tamamlandı!",
        endText: "Cilt detayları konusunda keskin bir göze sahip olduğunu kanıtladın.",
        step0: {
            question: "Hangi görsel yapay zeka üretimidir?",
            success: "Doğru!"
        },
        step1: {
            question: "Burada en çok ne yapay zeka üretimine işaret ediyor?",
            options: {
                skin: "Cilt dokusu",
                nose: "Burun",
                eyes: "Gözler",
                hair: "Saçlar"
            },
            feedback: "Kesinlikle! Üretilen görsellerde cilt genellikle çok pürüzsüz veya 'balmumu gibi' görünür.",
            fail: "Cilt dokularına dikkat et: Fazla pürüzsüz veya parlak olması genellikle doğal değildir."
        },
        step2: {
            title: "Analiz: Cilt",
            text: "YZ modelleri genellikle abartmaya meyillidir. YZ gerçek cilt gözeneklerini veya ince tüyleri bilmediği için cilt genellikle 'ütülenmiş' veya balmumu gibi, adeta bir oyuncak bebek veya plastik gibi görünür. Bir yüz fazla mükemmel parlıyorsa bu ciddi bir uyarı işaretidir."
        },
        step3: {
            question: "Hangi görseller yapay zeka üretimi gibi duruyor? (Çoklu seçim)",
            success: "Çok iyi! 'Plastik görünümü' fark ediyorsun.",
            fail: "Cilt dokularına dikkat et: Fazla pürüzsüz veya parlak olması genellikle doğal değildir."
        },
        step4: {
            question: "bu görselde ne dikkat çekiyor?",
            subtitle: "Tüm geçerli özellikleri seç.",
            terms: {
                smooth: "Balmumu heykel cildi",
                wrinkles: "Doğal olmayan kırışıklıklar",
                eyes: "Göz rengi",
                tattoos: "Dövmeler"
            },
            feedback: "Doğru. Cilt yaşa göre çok pürüzsüz ve kırışıklıklar doğal olmayan bir şekilde ilerliyor. Mavi gözler veya yüzdeki dövmeler nadirdir ancak her zaman bir kanıt değildir."
        },
        step5: {
            title: "Karşılaştırma: Kırışıklıklar",
            text: "Görsel 1 (YZ): Kırışıklıklar 'çizilmiş' gibi duruyor veya doğal olmayan yerlerde kayboluyor. Gerçek görselde ise kırışıklıklar kas yapısını takip eder ve derinliğe sahiptir."
        },
        step6: {
            title: "Seviye Sonu",
            text: "Cilt dokularına dikkat etmeyi öğrendin. 'Balmumu cilt' ve doğal olmayan kırışıklıklar YZ görselleri için güçlü göstergelerdir."
        }
    },
    level3: {
        title: "Seviye 4: Renkler & Doygunluk",
        loading: "Renk analizi yükleniyor...",
        endTitle: "Seviye Tamamlandı!",
        endText: "Artık doğal olmayan doygunluk ve abartılı kontrastlar konusunda uzmansın.",
        step0: {
            question: "Hangi görsel yapay zeka üretimidir?",
            success: "Doğru! Soldaki görsel yapay zeka üretimidir."
        },
        step1: {
            question: "Bu görsel neden sahte görünüyor?",
            options: {
                colors: "Renk & Cilt",
                bg: "Ağız",
                hat: "Şapka/Başlık",
                eyes: "Göz rengi"
            },
            feedback: "Doğru. Bu kadar aşırı doygun renkler bir göstergedir, cilt doğal olmayan şekilde 'parlar'."
        },
        step2: {
            question: "Hangi ifade doğrudur?",
            options: {
                all: "Tüm yapay zeka görselleri aşırı doygun renklidir",
                indicator: "Aşırı doygunluk üretim için bir göstergedir",
                none: "Aşırı doygunluğun bir önemi yoktur"
            },
            feedback: "Kesinlikle. Hepsi olmasa da birçok üretilen görsel, özellikle cilt tonlarında aşırı yoğun renklerle ilgili sorunlar yaşar."
        },
        step3: {
            question: "Hangi görselde renk hatası var?",
            success: "Doğru! Bir küçük çocukta turkuaz saçlar gerçekte aşırı derecede düşük bir ihtimaldir."
        },
        step4: {
            title: "Bağlam Hatası",
            text: "Sıklıkla üretilen görsellerde ancak bağlam içinde fark edilen renk hataları olur. Mükemmel boyanmış turkuaz saçlı bir çocuk gerçek hayatta çok nadirdir ve bu nedenle bir üretim işaretidir."
        },
        step5: {
            title: "Burada ne dikkatini çekiyor?",
            subtitle: "Tüm uygun özellikleri seç.",
            terms: {
                skin: "Aşırı doygun cilt",
                eyes: "Gerçekçi olmayan gözler",
                makeup: "Arka plan hatası",
                smooth: "Fazla yumuşak cilt"
            },
            feedback: "Bu görsel, YZ üretimlerinin 'aşırı işlenmiş' (over-processed) görünümüne ve gerçek hayatta rastlanmayan yapay renklere mükemmel bir örnektir."
        },
        step6: {
            title: "Analiz:",
            text: "İkinci görselde bir harita görüyorsun. Orada hata alanları tekrar işaretlendi: Özellikle yüzde renkler ve dokular fazla mükemmel ve yumuşak."
        },
        step7: {
            question: "Hataları eşleştir!",
            terms: {
                hair: "Gerçekçi olmayan saç",
                sat: "Aşırı doygunluk",
                smooth: "Plastik cilt"
            },
            success: "Mükemmel eşleştirme! Detaylara karşı bir göz geliştiriyorsun.",
            fail: "Saç rengine (kırmızı), çok yüksek kontrastlı cilde ve yumuşak 'plastik görünümüne' dikkat et."
        },
        step8: {
            title: "Seviye Sonu",
            text: "Renkler güçlü bir kanıttır. 'Parlayan' ciltlere, bağlamla uymayan mantıksız saç renklerine ve birçok YZ modelinin standart olarak sunduğu genel 'Instagram filtresi görünümüne' dikkat et."
        }
    },
    level4: {
        title: "Seviye 5: Yüz İfadeleri",
        loading: "Mimik analizi hazırlanıyor...",
        endTitle: "Seviye Tamamlandı!",
        endText: "Artık mimiklerdeki ince hataları bile fark edebiliyorsun.",
        step0: {
            question: "Burada ne dikkatini çekiyor?",
            options: {
                pose: "Doğal olmayan duruş",
                nothing: "Dikkat çekici bir şey yok",
                expression: "Doğal olmayan anatomi ve mimikler",
                bg: "Yanlış arka plan"
            },
            feedback: "Doğru. İfade, özellikle ağız bölgesi bozulmuş görünüyor.",
            fail: "Mimik ve duruşa dikkat et: Doğal olmayan yüz ifadeleri ve vücut duruşları genellikle YZ işaretidir."
        },
        step1: {
            title: "Analiz: Mimikler & Dil",
            text: "YZ modellerinin sıkça yaptığı bir hata yüz ifadeleridir. Bu örnekte dışarı çıkmış dil, duruşuyla birlikte anatomik olarak dikkat çekicidir. Mimiklerdeki bu tür hatalar güçlü bir uyarı işaretidir."
        },
        step2: {
            question: "Hangi görsel yapay zeka üretimidir?", 
            success: "İyi yakaladın! Soldaki görsel tipik yapaylıklar gösteriyor.",
            fail: "Cilde, renklere ve yüz özelliklerine dikkat et."
        },
        step3: {
            title: "Analiz: Detaylar",
            text: "Yine dikkat çekici bir yüz ifadesi; ayrıca burada saçlara ve ışık yansımalarına dikkat et. Cilt fazla pürüzsüz (daha önce öğrendiğimiz gibi). Ayrıca yüzdeki kırışıklıklar ve kıyafetteki desenler dikkat çekicidir."
        },
        step4: {
            question: "Hangi görsel yapay zeka üretimidir?",
            success: "Doğru! Genel olarak yapay zeka üretimlerinde karakterlerin doğrudan kameraya baktığına dikkat et.",
            fail: "Mimiklere dikkat et: Doğal olmayan yüz ifadeleri veya mükemmel bir portrede aşırı tepki veren bir kişi genellikle görsellerin yapay zeka ile üretildiğinin işaretidir." 
        },
        step5: {
            title: "Seviye Sonu",
            text: "Yüzler aşırı derecede karmaşıktır. 'Boş bakışlara' veya bir şekilde çarpık görünen bir gülümsemeye dikkat et. YZ gerçek duyguları bilmediği için sadece bir yüz ifadesinin nasıl görünebileceğini tahmin eder ve bu sırada sık sık ağız kenarlarını veya göz çevresini bozar."
        }
    },
    level5: {
        title: "Seviye 6: Görsel Hatalarını Tanıma",
        searching: "Tüm görsel hatalarını ara...",
        unlocked: "Çözüm kilidi açıldı!",
        verify: "Tamamlandı",
        check_question: "İşaretlenmiş tüm hataları buldun mu?",
        endTitle: "Seviye Tamamlandı!",
        options: { yes: "Evet, hepsini buldum", no: "Hepsini değil" },
        disclaimer: "İşaretlemeler pilot çalışmalardaki kullanıcı anketlerine dayanmaktadır ve rehberlik amaçlıdır. Her zaman mükemmel olmayabilirler.",
        step0: {
            title: "Görsel Hataları & Mantık",
            text: "Yapay zeka dünyamızın fiziksel olarak nasıl çalıştığını anlamaz. Bu yüzden gerçek hayatta imkansız olacak hatalar oluşur: Nesneler birbirinin içine geçer, gözlükler asimetriktir veya gölgeler tamamen farklı yönlere düşer."
        },
        step1: {
            question: "Hangi görsel yapay zeka üretimidir?",
            success: "Doğru! Bu görsel sahtedir."
        },
        step2: {
            title: "Analiz: Detaylar",
            text: "Ceketin düğmelerine (düzensiz), saçlara (birbirine karışmış) ve özellikle arka planda fiziksel olarak imkansız bir şekilde önde duran lambaya dikkat et."
        },
        search_task: "Hataları bul! Onları aklında tut ve 'Çözüm'e tıkla.",
        feedback: "Pratik yapmak mükemmelleştirir. Arka plandaki ve kenarlardaki detaylara dikkat et.",
        img11: "Arka plana ve kıyafetlere dikkat et.",
        img12: "Ellere ve çevreye dikkatlice bak.",
        img48: "Burada mimariyle ilgili bir şeyler yanlış.",
        img67: "Yansımalara veya gölgelere dikkat et.",
        asymmetry: {
            title: "Simetri Hataları",
            text: "Klasik bir hata: Gözlükler, takılar veya kıyafetler genellikle asimetriktir. Burada gözlük çerçevesinin sol ve sağ tarafı tamamen farklıdır."
        },
        finish: {
            title: "Seviye Sonu",
            text: "Artık 'glitch'lere (teknik hatalar) karşı bir gözün var. Eğer bir şey fiziksel olarak mantıklı gelmiyorsa, büyük ihtimalle YZ üretimidir."
        },
        step_text: {
            question: "Yapay zeka üretimini bulabilir misin?",
            title: "Yapay Yazı",
            text: "Fark ettin mi? Arka plandaki yazı okunaksız. Bu sadece mesafeden dolayı değil, YZ'lerin genellikle gerçek yazılar üretememesinden kaynaklanır. Bunun yerine sadece harflere benzeyen şekiller üretirler."
        },
        step_fingers: {
            question: "Hangi görsel yapay zeka üretimidir?",
            title: "Fazla/Eksik Parmaklar",
            text: "Eller YZ'lerin en büyük zayıflıklarından biridir. Sıklıkla parmaklar birbirine karışır veya YZ bir elde altı veya daha fazla parmak üretir. Doğal olmayan bükülmeler de yaygındır. Ancak: Bu hatalar modern modellerde daha nadir görülmektedir."
        },
        step_legs: {
            question: "Görselin alt kısmındaki hatayı fark ettin mi?",
            title: "İmkansız Bacaklar",
            text: "Tüm vücut çekimlerinde YZ genellikle uzuvların yerini karıştırır. Burada bir bacak vücudun anatomik olarak imkansız bir yerinden çıkıyor. Ancak: Bu hatalar modern modellerde daha nadir görülmektedir."
        }
    },
    etappenQuiz: {
        intro: {
            title: "Ara Sınav: Neler öğrendin?",
            text: "Arka planlar, cilt, renkler ve anatomi hakkında çok şey öğrendin. Şimdi ciddileşiyoruz: 10 görsel. Yardım yok. Sahteleri bul."
        },
        round: "Tur",
        finish: {
            title: "Sınav Bitti",
            text_perfect: "İnanılmaz! Mükemmel bir göz geliştirmişsin.",
            text_good: "Çok iyi! Neredeyse hepsini tanıdın.",
            text_ok: "Kötü değil ama detaylara daha fazla dikkat et.",
            score: "Sonucun:"
        }
    },
    level7: { 
        loading: "Etap testi yükleniyor...",
        introTitle: "Etap Testi",
        introText: "Test 2 için hazır mısın? Neler öğrendiğini göster.",
        startBtn: "Testi Başlat",
        roundLabel: "Tur",
        questionText: "Gerçek mi yapay mı?",
        endTitle: "Ara Durum",
        endText: "Harika. Çalışmanın ikinci etabını tamamladın. İlerlemen kaydedildi.",
    },
    level8: { 
        title: "Seviye 8: Modern YZ'ler",
        loading: "Sosyal medya ortamı simüle ediliyor...",
        endTitle: "Seviye 8 Tamamlandı!",
        step0: {
            title: "Modern Üretimler & Bağlam",
            text: "Modern modeller (yaklaşık 26.11.2025'ten itibaren) teknik olarak neredeyse mükemmeldir. Cilt, ışık ve gölgeler fotoğraflardan neredeyse ayırt edilemez. Burada genellikle tek bir şey yardımcı olur: Bağlam."
        },
        step1: {
            question: "Bu görselde şüpheli olan ne?",
            options: {
                quality: "Düşük görsel kalitesi",
                scene: "Olası olmayan senaryo",
                filter: "Çok güçlü filtre"
            },
            feedback: "Doğru. Tanınmış bir kişinin tamamen uyumsuz bir tarihi veya özel bağlamda selfie çekmesi son derece düşük bir ihtimaldir. Bağlam ele veriyor.",
            fail: "Dikkatlice bak. Sahne kişiye ve zamana uyuyor mu?"
        },
        step2: {
            question: "Hangi görsel manipülatif?", 
            success: "Doğru! Bu görsel bizi kasten yanıltmak için oluşturuldu. Bu tür sahteler genellikle korku uyandırmak için yapay olarak oluşturulmuş tehlikeleri (dikenli teller veya polis gibi) kullanır. Duygusal görseller internette çok daha hızlı yayılır, dezenformasyonun amacı tam da budur.",
            fail: "Duygulara odaklan: Clickbait (tık tuzağı) görseller öfke veya acıma duygusu uyandırmayı amaçlar. Bu tür görseller genellikle hızlıca erişim sağlamak için üretilir."
        },
        step3: {
            title: "Sosyal Medya Analizi",
            text: "Sana simüle edilmiş bir Instagram arayüzü gösterilecek. Hesapları dikkatlice incele. Yapay içerik paylaşan üç hesabı seç.\n\nAnaliz için ipuçları:\n1. Hesap ne zaman oluşturuldu? (Birçok YZ botu yenidir).\n2. Sadece görsel mi paylaşıyor? (Videoları taklit etmek daha zordur).\n3. Fenomenler (Influencer) az takipçi sayısına rağmen ürün mü satıyor?"
        },
        feed: {
            ad: "Reklam",
            instruction: "Akışta kaydır. Profili kontrol etmek için isimlere tıkla. Yapay içerikli üç profili işaretle.",
            joined: "Katılım tarihi",
            business: "İşletme Hesabı",
            report: "Sahte olarak bildir",
            marked: "🚩 İşaretlendi",
            success: "Harika analiz! Botları ve manipülatif hesapları deşifre ettin.",
            fail: "Tam olarak değil. İlk paylaşımların tarihine ve kullanıcı açıklamasına bak. Şirketler genellikle sadece reklam için fenomen hesapları oluşturur. Birçok sahte profil ayrıca duygusal, üretilmiş görsellerle yanlış haber yayar."
        },
        analysis: {
            title: "Botların Analizi",
            text: "Botları tanımak bağlamı kontrol etmek demektir. Örneğin 'Lara_Life' sadece bir ayda 280 bin takipçi kazandı; bu, yapay büyümenin ve bir bot hesabının açık bir işaretidir."
        },
        finish: {
            title: "Bitiş",
            text: "Tebrikler! Seviye 8'i başarıyla bitirdin. Artık final testi için hazırsın."
        }
    },
    level9: {
        loading: "Final testi hazırlanıyor...",
        introTitle: "Final",
        introText: "Sadece en iyi YZ görsellerimiz kaldı. Bu, yeteneklerinin son testi. Hazır mısın?",
        startBtn: "Şimdi başla",
        roundLabel: "Final Turu",
        endTitle: "Çalışma Tamamlandı!",
        endText: "Harika! Eğitimi ve tüm testleri bitirdin. Katkın, kullanıcıların yapay zeka tarafından üretilen görselleri tanıma yetenekleri üzerine yaptığımız araştırma için son derece değerlidir.",
        viewLeaderboard: "Liderlik tablosunu gör"
    },
    spotTheFake: {
        deselect: "Seçimi Kaldır",
        select: "Bu görseli seç",
        wrongTitle: "Tam olarak değil...",
        wrongDefault: "Başka bir görsel seç ve tekrar dene.",
        successDefault: "Doğru tanındı!",
        timeout: "SÜRE DOLDU! YİNE DE CEVAP VEREBİLİRSİN.",
        photosBy: "Fotoğrafları çeken:",
        onUnsplash: "Unsplash üzerinden",
        badges: {
            selected: "SEÇİLDİ",
            real: "GERÇEK",
            ai: "YZ"
        }
    },
    singleChoice: {
        lockedMessage: "Görsel hatalarını ara...",
        surveyFeedback: "Değerlendirmen için teşekkürler!",
        wrongDefault: "Tam olarak doğru değil."
    },
    realOrFake: {
        timeout: "SÜRE DOLDU! YİNE DE CEVAP VEREBİLİRSİN.",
        real: "GERÇEK",
        ai: "YAPAY",
        badges: {
            correct: "DOĞRU",
            wrong: "YANLIŞ"
        },
        feedback: {
            correct: "Aferin!",
            wrong: "Maalesef yanlış."
        },
        explanation: {
            is: "Bu görsel ",
            ai: "Yapay zeka üretimidir.",
            real: "Gerçek bir fotoğraftır."
        },
        credits: {
            by: "Fotoğraf: ",
            on: ", Unsplash"
        }
    },
    multiCheck: {
        defaultQuestion: "Bu görsellerden hangileri yapay zeka üretimidir?",
        options: {
            none: "İkisi de gerçek",
            both: "İkisi de yapay",
            left: "No. 1 yapay",
            right: "No. 2 yapay"
        },
        feedback: {
            success: "Çok iyi! Her iki görseli de doğru tahmin ettin.",
            fail: "Tam olarak doğru değil. Arka planlardaki detaylara tekrar bak."
        }
    },
    imageMatching: {
        step1: "<strong>Adım 1:</strong> Bir terim seç.",
        step2: "<strong>Adım 2:</strong> Uygun görsele tıkla.",
        finished: "Analiz tamamlandı",
        zoomHint: "Büyütmek için yazısız bir görsele tıkla.",
        failDefault: "Maalesef tam doğru değil. Doğru eşleşmeler artık işaretlendi."
    },
    gridSelect: {
        loading: "Set yükleniyor...",
        selectedBadge: "SEÇİLDİ",
        deselect: "Seçimi Kaldır",
        select: "YZ olarak işaretle",
        error: "Yanlış! Tekrar dene!",
        successDefault: "Doğru tanındı!",
        aiBadge: "YZ"
    },
    conceptTagging: {
        errorDefault: "Tam olarak doğru değil. Bazı özellikler gözden kaçtı veya yanlıştı."
    },
    analysis: {
        altText: "Analiz Görseli"
    },
};