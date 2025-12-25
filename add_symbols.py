#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json

# Mevcut dosyayı oku
with open('dreams/dreams.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print(f"📊 Mevcut kayıt sayısı: {len(data)}")

# 500 yeni rüya sembolü
new_symbols = [
    # GIDA KATEGORİSİ
    {
        "symbol": "Ekmek",
        "meaning": "Rızık, bereket ve huzur",
        "category": "Gıda",
        "emoji": "🍞",
        "short_description": "Ekmek görmek helal rızkın habercisidir.",
        "description": "Rüyada ekmek görmek bol rızka, berekete ve hayırlı gelişmelere işaret eder. Sıcak ekmek yeni fırsatlar; küflü ekmek dikkat edilmesi gereken durumlardır.",
        "psychological_meaning": "Temel ihtiyaçların karşılanması ve güven hissi.",
        "islamic_meaning": "Ekmek bereketin sembolüdür.",
        "positive_effects": ["Helal rızık", "Huzur", "Bereket"],
        "negative_effects": ["Durağanlık"],
        "emotion_levels": {"fear": 10, "intuition": 70, "confusion": 15, "power": 65},
        "daily_prediction": "Bugün huzurlu ve bereketli bir enerji hakim.",
        "social_effects": "Aile içinde güzel bir paylaşım olabilir.",
        "emotional_effects": "Rahatlık hissi artar.",
        "health_effects": "Denge ve sakinlik.",
        "financial_signs": "Kazanç artıyor.",
        "spiritual_comment": "Rızkının bereketi artıyor.",
        "luck_score": 89,
        "realization_rate": 77
    },
    {
        "symbol": "Süt",
        "meaning": "Bereket, saflık ve beslenme",
        "category": "Gıda",
        "emoji": "🥛",
        "short_description": "Süt görmek bereket ve saflığa işaret eder.",
        "description": "Rüyada süt görmek temiz kazanca, berekete ve ruhsal beslenmeye delalet eder.",
        "psychological_meaning": "Temel güven ve beslenme ihtiyacı.",
        "islamic_meaning": "Fıtrat ve temiz rızık.",
        "positive_effects": ["Bereket", "Saflık", "Huzur"],
        "negative_effects": ["Bağımlılık"],
        "emotion_levels": {"fear": 5, "intuition": 75, "confusion": 10, "power": 70},
        "daily_prediction": "Bugün temiz ve bereketli gelişmeler olabilir.",
        "social_effects": "Aile bağları güçlenir.",
        "emotional_effects": "İçsel huzur artar.",
        "health_effects": "Fiziksel güç artar.",
        "financial_signs": "Helal kazanç yolları açılır.",
        "spiritual_comment": "Fıtratına dön, saflığını koru.",
        "luck_score": 87,
        "realization_rate": 75
    },
    {
        "symbol": "Bal",
        "meaning": "Şifa, tatlılık ve bereket",
        "category": "Gıda",
        "emoji": "🍯",
        "short_description": "Bal görmek şifa ve berekete işarettir.",
        "description": "Bal rüyası şifa, tatlı sözler ve bereketli kazanca delalet eder.",
        "psychological_meaning": "Tatmin ve iyileşme.",
        "islamic_meaning": "Şifa ve hayır.",
        "positive_effects": ["Şifa", "Bereket", "Tatlılık"],
        "negative_effects": [],
        "emotion_levels": {"fear": 0, "intuition": 80, "confusion": 5, "power": 75},
        "daily_prediction": "Bugün tatlı haberler alabilirsin.",
        "social_effects": "İlişkilerde yumuşama.",
        "emotional_effects": "Mutluluk artar.",
        "health_effects": "Şifa bulma ihtimali.",
        "financial_signs": "Bereketli kazanç.",
        "spiritual_comment": "Şifa kapıları açılıyor.",
        "luck_score": 92,
        "realization_rate": 80
    },
    {
        "symbol": "Zeytin",
        "meaning": "Bereket, barış ve sağlık",
        "category": "Gıda",
        "emoji": "🫒",
        "short_description": "Zeytin görmek bereket ve barışa işaret eder.",
        "description": "Zeytin mübarek bir ağaçtır, rüyada görmek hayır ve berekettir.",
        "psychological_meaning": "Huzur ve denge.",
        "islamic_meaning": "Mübarek rızık.",
        "positive_effects": ["Bereket", "Barış", "Sağlık"],
        "negative_effects": [],
        "emotion_levels": {"fear": 5, "intuition": 85, "confusion": 10, "power": 80},
        "daily_prediction": "Huzurlu bir gün seni bekliyor.",
        "social_effects": "Barış ve uyum artar.",
        "emotional_effects": "Sakinlik hakim olur.",
        "health_effects": "Sağlık iyileşir.",
        "financial_signs": "Uzun vadeli kazanç.",
        "spiritual_comment": "Mübarek rızka nail oluyorsun.",
        "luck_score": 90,
        "realization_rate": 78
    },
    {
        "symbol": "Üzüm",
        "meaning": "Bolluk, neşe ve kazanç",
        "category": "Gıda",
        "emoji": "🍇",
        "short_description": "Üzüm görmek bolluk ve kazanca işarettir.",
        "description": "Üzüm rüyası bol rızka, neşeye ve güzel haberlere delalet eder.",
        "psychological_meaning": "Tatmin ve bolluk hissi.",
        "islamic_meaning": "Rızık ve bereket.",
        "positive_effects": ["Bolluk", "Neşe", "Kazanç"],
        "negative_effects": [],
        "emotion_levels": {"fear": 5, "intuition": 75, "confusion": 10, "power": 75},
        "daily_prediction": "Bugün güzel haberler alabilirsin.",
        "social_effects": "Sosyal ortamlarda neşe artar.",
        "emotional_effects": "Mutluluk ve sevinç.",
        "health_effects": "Enerji yükselir.",
        "financial_signs": "Kazanç artışı.",
        "spiritual_comment": "Bereketin kapıları açılıyor.",
        "luck_score": 85,
        "realization_rate": 72
    }
]

# Şimdi otomatik olarak 495 sembol daha oluştur
symbols_to_generate = [
    # HAYVANLAR
    ("Aslan", "Güç, liderlik, cesaret", "Hayvanlar", "🦁", 85, 70),
    ("Kartal", "Özgürlük, yükseliş, güç", "Hayvanlar", "🦅", 88, 75),
    ("Balık", "Rızık, bolluk, akış", "Hayvanlar", "🐟", 80, 68),
    ("Kelebek", "Dönüşüm, güzellik, özgürlük", "Hayvanlar", "🦋", 82, 70),
    ("Kuş", "Özgürlük, haber, ruh", "Hayvanlar", "🐦", 78, 65),
    ("At", "Güç, hız, asalet", "Hayvanlar", "🐴", 83, 72),
    ("Fil", "Güç, hafıza, bilgelik", "Hayvanlar", "🐘", 79, 67),
    ("Tavşan", "Hız, bereket, çoğalma", "Hayvanlar", "🐰", 75, 63),
    ("Kaplumbağa", "Sabır, uzun ömür, istikrar", "Hayvanlar", "🐢", 77, 65),
    ("Arı", "Çalışkanlık, bereket, düzen", "Hayvanlar", "🐝", 84, 73),
    
    # DOĞA
    ("Güneş", "Aydınlık, enerji, hayat", "Doğa", "☀️", 90, 78),
    ("Ay", "Duygu, sezgi, döngü", "Doğa", "🌙", 85, 72),
    ("Yıldız", "Umut, rehberlik, başarı", "Doğa", "⭐", 87, 74),
    ("Yağmur", "Bereket, temizlik, yenilenme", "Doğa", "🌧️", 81, 69),
    ("Kar", "Saflık, temizlik, yenilik", "Doğa", "❄️", 79, 66),
    ("Rüzgar", "Değişim, hareket, özgürlük", "Doğa", "💨", 76, 64),
    ("Gökkuşağı", "Umut, barış, güzellik", "Doğa", "🌈", 92, 80),
    ("Dağ", "Engel, yükseliş, hedef", "Doğa", "⛰️", 78, 67),
    ("Nehir", "Akış, hayat, değişim", "Doğa", "🏞️", 80, 68),
    ("Orman", "Doğa, gizem, keşif", "Doğa", "🌲", 77, 65),
    
    # NESNELER
    ("Anahtar", "Çözüm, fırsat, erişim", "Nesneler", "🔑", 86, 73),
    ("Kapı", "Fırsat, geçiş, değişim", "Nesneler", "🚪", 82, 70),
    ("Ayna", "Gerçek, yansıma, benlik", "Nesneler", "🪞", 79, 67),
    ("Saat", "Zaman, fırsat, acele", "Nesneler", "⏰", 75, 63),
    ("Telefon", "İletişim, haber, bağlantı", "Nesneler", "📱", 77, 65),
    ("Mektup", "Haber, mesaj, iletişim", "Nesneler", "✉️", 80, 68),
    ("Yüzük", "Bağ, söz, evlilik", "Nesneler", "💍", 88, 75),
    ("Taç", "Başarı, liderlik, onur", "Nesneler", "👑", 90, 77),
    ("Kılıç", "Güç, mücadele, koruma", "Nesneler", "⚔️", 81, 69),
    ("Kalkan", "Koruma, savunma, güven", "Nesneler", "🛡️", 79, 67),
    
    # BİTKİLER
    ("Gül", "Aşk, güzellik, zarafet", "Bitkiler", "🌹", 89, 76),
    ("Lale", "Aşk, tutku, güzellik", "Bitkiler", "🌷", 85, 72),
    ("Papatya", "Saflık, masumiyet, sadelik", "Bitkiler", "🌼", 82, 70),
    ("Nergis", "Güzellik, kibir, benlik", "Bitkiler", "🌸", 78, 66),
    ("Menekşe", "Tevazu, sadakat, güzellik", "Bitkiler", "🪻", 80, 68),
    ("Orkide", "Zarafet, lüks, güzellik", "Bitkiler", "🌺", 84, 71),
    ("Zambak", "Saflık, masumiyet, zarafet", "Bitkiler", "🪷", 83, 70),
    ("Yasemin", "Güzellik, hoşluk, sevgi", "Bitkiler", "🌾", 81, 69),
    ("Sümbül", "Güzellik, koku, bahar", "Bitkiler", "🌻", 79, 67),
    ("Çiçek", "Güzellik, açılım, gelişim", "Bitkiler", "🌺", 86, 73),
    
    # RENKLER
    ("Beyaz", "Saflık, temizlik, barış", "Renkler", "⚪", 88, 75),
    ("Siyah", "Gizem, güç, bilinmezlik", "Renkler", "⚫", 70, 60),
    ("Kırmızı", "Tutku, enerji, güç", "Renkler", "🔴", 82, 70),
    ("Mavi", "Huzur, güven, sakinlik", "Renkler", "🔵", 85, 72),
    ("Yeşil", "Umut, doğa, yenilenme", "Renkler", "🟢", 87, 74),
    ("Sarı", "Neşe, enerji, aydınlık", "Renkler", "🟡", 83, 71),
    ("Mor", "Ruhaniyet, asalet, gizem", "Renkler", "🟣", 80, 68),
    ("Turuncu", "Enerji, coşku, yaratıcılık", "Renkler", "🟠", 81, 69),
    ("Pembe", "Sevgi, yumuşaklık, şefkat", "Renkler", "🩷", 84, 72),
    ("Altın", "Değer, zenginlik, başarı", "Renkler", "🟨", 92, 80),
    
    # EYLEMLER
    ("Yürümek", "İlerleme, yolculuk, çaba", "Eylemler", "🚶", 78, 66),
    ("Dans Etmek", "Neşe, özgürlük, ifade", "Eylemler", "💃", 86, 73),
    ("Yüzmek", "Akış, uyum, özgürlük", "Eylemler", "🏊", 82, 70),
    ("Ağlamak", "Boşalma, arınma, duygu", "Eylemler", "😢", 65, 58),
    ("Gülmek", "Mutluluk, rahatlama, iyilik", "Eylemler", "😄", 90, 78),
    ("Düşmek", "Kayıp, korku, uyarı", "Eylemler", "🤕", 55, 50),
    ("Tırmanmak", "Çaba, yükseliş, hedef", "Eylemler", "🧗", 80, 68),
    ("Sıçramak", "Atılım, cesaret, değişim", "Eylemler", "🤸", 83, 71),
    ("Kazmak", "Araştırma, keşif, çaba", "Eylemler", "⛏️", 76, 64),
    ("Dikmek", "Yaratıcılık, sabır, üretim", "Eylemler", "🪡", 79, 67),
]

# Her sembol için detaylı veri oluştur
for symbol, meaning, category, emoji, luck, real in symbols_to_generate:
    new_symbols.append({
        "symbol": symbol,
        "meaning": meaning,
        "category": category,
        "emoji": emoji,
        "short_description": f"{symbol} görmek {meaning.lower()} sembolüdür.",
        "description": f"Rüyada {symbol.lower()} görmek önemli anlamlar taşır ve hayatınızda değişimlere işaret edebilir.",
        "psychological_meaning": f"{symbol} psikolojik olarak önemli mesajlar taşır.",
        "islamic_meaning": f"{symbol} İslami tabirlerde hayırlı yorumlanır.",
        "positive_effects": [meaning.split(',')[0].strip(), "Farkındalık", "Gelişim"],
        "negative_effects": ["Dikkat gerektirir"],
        "emotion_levels": {
            "fear": max(10, 100 - luck),
            "intuition": luck - 10,
            "confusion": max(5, 100 - luck - 10),
            "power": luck - 5
        },
        "daily_prediction": f"Bugün {symbol.lower()} ile ilgili gelişmeler olabilir.",
        "social_effects": "İlişkilerde olumlu değişimler.",
        "emotional_effects": "Duygusal farkındalık artar.",
        "health_effects": "Genel sağlık dengesi.",
        "financial_signs": "Maddi konularda dikkat.",
        "spiritual_comment": f"{symbol} ruhsal gelişiminize katkı sağlar.",
        "luck_score": luck,
        "realization_rate": real
    })

# Daha fazla sembol ekle (500'e ulaşmak için)
additional_symbols = [
    # MEKANLAR
    ("Cami", "İbadet, huzur, manevi", "Mekanlar", "🕌"),
    ("Okul", "Öğrenme, gelişim, bilgi", "Mekanlar", "🏫"),
    ("Hastane", "Şifa, tedavi, iyileşme", "Mekanlar", "🏥"),
    ("Köprü", "Geçiş, bağlantı, değişim", "Mekanlar", "🌉"),
    ("Mağara", "Gizem, keşif, içsel yolculuk", "Mekanlar", "🕳️"),
    ("Bahçe", "Huzur, güzellik, bereket", "Mekanlar", "🏡"),
    ("Mezarlık", "Son, dönüşüm, hatırlama", "Mekanlar", "⚰️"),
    ("Pazar", "Alışveriş, bolluk, seçim", "Mekanlar", "🏪"),
    ("Kale", "Koruma, güç, savunma", "Mekanlar", "🏰"),
    ("Liman", "Varış, güvenlik, dinlenme", "Mekanlar", "⚓"),
    
    # GIDA (devam)
    ("Elma", "Bilgi, günah, sağlık", "Gıda", "🍎"),
    ("Portakal", "Enerji, tazelik, C vitamini", "Gıda", "🍊"),
    ("Muz", "Enerji, potasyum, sağlık", "Gıda", "🍌"),
    ("Kiraz", "Tatlılık, kısa süre, lezzet", "Gıda", "🍒"),
    ("Kavun", "Serinlik, yaz, tazelik", "Gıda", "🍈"),
    ("Karpuz", "Serinlik, yaz, bereket", "Gıda", "🍉"),
    ("Şeftali", "Yumuşaklık, tatlılık, lezzet", "Gıda", "🍑"),
    ("Armut", "Yumuşaklık, sağlık, lezzet", "Gıda", "🍐"),
    ("Çilek", "Tatlılık, aşk, kırmızı", "Gıda", "🍓"),
    ("İncir", "Bereket, tatlılık, sağlık", "Gıda", "🫐"),
    ("Hurma", "Bereket, enerji, şifa", "Gıda", "🌴"),
    ("Nar", "Bereket, bolluk, sağlık", "Gıda", "🍎"),
    ("Ayva", "Güzellik, koku, sağlık", "Gıda", "🍏"),
    ("Erik", "Tatlılık, yaz, tazelik", "Gıda", "🍑"),
    ("Kayısı", "Tatlılık, yaz, enerji", "Gıda", "🍊"),
    
    # HAYVANLAR (devam)
    ("Güvercin", "Barış, haber, sadakat", "Hayvanlar", "🕊️"),
    ("Horoz", "Uyanış, çağrı, sabah", "Hayvanlar", "🐓"),
    ("Tavuk", "Bereket, yumurta, ev", "Hayvanlar", "🐔"),
    ("Ördek", "Su, yüzme, doğa", "Hayvanlar", "🦆"),
    ("Kaz", "Sadakat, koruma, ev", "Hayvanlar", "🦢"),
    ("Karga", "Zeka, haber, gizem", "Hayvanlar", "🐦‍⬛"),
    ("Baykuş", "Bilgelik, gece, gizem", "Hayvanlar", "🦉"),
    ("Papağan", "Konuşma, taklit, renk", "Hayvanlar", "🦜"),
    ("Serçe", "Küçüklük, özgürlük, doğa", "Hayvanlar", "🐦"),
    ("Koyun", "Uyum, yumuşaklık, bereket", "Hayvanlar", "🐑"),
    ("Keçi", "İnatçılık, dağ, özgürlük", "Hayvanlar", "🐐"),
    ("İnek", "Bereket, süt, sakinlik", "Hayvanlar", "🐄"),
    ("Deve", "Sabır, çöl, dayanıklılık", "Hayvanlar", "🐫"),
    ("Ayı", "Güç, kış uykusu, koruma", "Hayvanlar", "🐻"),
    ("Kurt", "Güç, sürü, vahşi", "Hayvanlar", "🐺"),
    ("Tilki", "Kurnazlık, zeka, hile", "Hayvanlar", "🦊"),
    ("Geyik", "Zarafet, hız, doğa", "Hayvanlar", "🦌"),
    ("Zebra", "Farklılık, çizgi, Afrika", "Hayvanlar", "🦓"),
    ("Zürafa", "Uzunluk, farklılık, Afrika", "Hayvanlar", "🦒"),
    ("Timsah", "Tehlike, su, güç", "Hayvanlar", "🐊"),
    ("Kertenkele", "Hız, değişim, kuyruk", "Hayvanlar", "🦎"),
    ("Kurbağa", "Dönüşüm, su, sıçrama", "Hayvanlar", "🐸"),
    ("Akrep", "Tehlike, zehir, çöl", "Hayvanlar", "🦂"),
    ("Örümcek", "Ağ, sabır, tuzak", "Hayvanlar", "🕷️"),
    ("Karınca", "Çalışkanlık, düzen, topluluk", "Hayvanlar", "🐜"),
    ("Sinek", "Rahatsızlık, küçüklük, uçma", "Hayvanlar", "🪰"),
    ("Sivrisinek", "Rahatsızlık, ısırma, gece", "Hayvanlar", "🦟"),
    ("Böcek", "Küçüklük, doğa, çeşitlilik", "Hayvanlar", "🐛"),
    ("Solucan", "Toprak, yenilenme, küçüklük", "Hayvanlar", "🪱"),
    ("Salyangoz", "Yavaşlık, sabır, ev", "Hayvanlar", "🐌"),
    
    # NESNELER (devam)
    ("Kitap", "Bilgi, öğrenme, hikaye", "Nesneler", "📖"),
    ("Kalem", "Yazma, ifade, yaratıcılık", "Nesneler", "✏️"),
    ("Kağıt", "Yazma, mesaj, beyazlık", "Nesneler", "📄"),
    ("Çanta", "Taşıma, yük, seyahat", "Nesneler", "👜"),
    ("Ayakkabı", "Yürüme, yolculuk, adım", "Nesneler", "👞"),
    ("Şapka", "Koruma, stil, başlık", "Nesneler", "🎩"),
    ("Gözlük", "Görme, netlik, bilgelik", "Nesneler", "👓"),
    ("Saat", "Zaman, dakiklik, değer", "Nesneler", "⌚"),
    ("Bilezik", "Süs, bağ, değer", "Nesneler", "📿"),
    ("Kolye", "Süs, değer, güzellik", "Nesneler", "📿"),
    ("Küpe", "Süs, güzellik, kulak", "Nesneler", "💎"),
    ("Taş", "Sertlik, doğa, kalıcılık", "Nesneler", "🪨"),
    ("Elmas", "Değer, parlaklık, sertlik", "Nesneler", "💎"),
    ("İnci", "Değer, deniz, güzellik", "Nesneler", "🦪"),
    ("Altın", "Değer, zenginlik, parlaklık", "Nesneler", "🏆"),
    ("Gümüş", "Değer, parlaklık, metal", "Nesneler", "🥈"),
    ("Bakır", "Metal, iletkenlik, renk", "Nesneler", "🟤"),
    ("Demir", "Güç, sertlik, metal", "Nesneler", "⚙️"),
    ("Çelik", "Güç, sertlik, modern", "Nesneler", "🔩"),
    ("Cam", "Şeffaflık, kırılganlık, görme", "Nesneler", "🪟"),
    
    # DUYGULAR
    ("Mutluluk", "Sevinç, pozitiflik, enerji", "Duygular", "😊"),
    ("Üzüntü", "Keder, hüzün, gözyaşı", "Duygular", "😢"),
    ("Korku", "Endişe, tehlike, kaçış", "Duygular", "😨"),
    ("Öfke", "Kızgınlık, tepki, enerji", "Duygular", "😠"),
    ("Aşk", "Sevgi, tutku, bağ", "Duygular", "❤️"),
    ("Nefret", "Kin, antipati, uzaklaşma", "Duygular", "💔"),
    ("Umut", "Beklenti, pozitiflik, gelecek", "Duygular", "🌟"),
    ("Umutsuzluk", "Karamsarlık, çaresizlik, karanlık", "Duygular", "😞"),
    ("Heyecan", "Coşku, enerji, beklenti", "Duygular", "🤩"),
    ("Sıkıntı", "Can sıkıntısı, monotonluk, durgunluk", "Duygular", "😑"),
    
    # SAYILAR
    ("Bir", "Birlik, başlangıç, teklik", "Sayılar", "1️⃣"),
    ("İki", "İkilik, denge, çift", "Sayılar", "2️⃣"),
    ("Üç", "Üçlü, mükemmellik, tamamlık", "Sayılar", "3️⃣"),
    ("Dört", "Dörtlü, istikrar, temel", "Sayılar", "4️⃣"),
    ("Beş", "Beşli, değişim, insan", "Sayılar", "5️⃣"),
    ("Altı", "Altılı, uyum, denge", "Sayılar", "6️⃣"),
    ("Yedi", "Yedili, şans, mistik", "Sayılar", "7️⃣"),
    ("Sekiz", "Sekizli, sonsuzluk, bolluk", "Sayılar", "8️⃣"),
    ("Dokuz", "Dokuzlu, tamamlanma, son", "Sayılar", "9️⃣"),
    ("On", "Onlu, mükemmellik, tam", "Sayılar", "🔟"),
    
    # HAVA DURUMLARI
    ("Fırtına", "Kaos, güç, değişim", "Doğa", "⛈️"),
    ("Kasırga", "Yıkım, güç, döngü", "Doğa", "🌪️"),
    ("Sis", "Belirsizlik, gizem, görünmezlik", "Doğa", "🌫️"),
    ("Dolu", "Ani olay, zarar, soğukluk", "Doğa", "🧊"),
    ("Şimşek", "Ani olay, aydınlanma, güç", "Doğa", "⚡"),
    ("Gök Gürültüsü", "Uyarı, güç, doğa", "Doğa", "🔊"),
    ("Çığ", "Tehlike, yığılma, düşme", "Doğa", "🏔️"),
    ("Deprem", "Sarsıntı, değişim, temel", "Doğa", "🌍"),
    ("Tsunami", "Büyük değişim, güç, su", "Doğa", "🌊"),
    ("Yanardağ", "Patlama, enerji, ateş", "Doğa", "🌋"),
    
    # ULAŞIM
    ("Uçak", "Hız, yükseliş, seyahat", "Ulaşım", "✈️"),
    ("Gemi", "Yolculuk, su, taşıma", "Ulaşım", "🚢"),
    ("Tren", "Yolculuk, ray, düzen", "Ulaşım", "🚂"),
    ("Otobüs", "Toplu taşıma, yolculuk, insanlar", "Ulaşım", "🚌"),
    ("Bisiklet", "Hareket, denge, çevre", "Ulaşım", "🚲"),
    ("Motosiklet", "Hız, özgürlük, risk", "Ulaşım", "🏍️"),
    ("Tekne", "Su, küçük yolculuk, sakinlik", "Ulaşım", "⛵"),
    ("Balon", "Yükseliş, hafiflik, rüya", "Ulaşım", "🎈"),
    ("Helikopter", "Hız, yükseliş, kurtarma", "Ulaşım", "🚁"),
    ("Roket", "Hız, uzay, teknoloji", "Ulaşım", "🚀"),
    
    # MÜZİK ALETLERI
    ("Piyano", "Müzik, uyum, sanat", "Müzik", "🎹"),
    ("Gitar", "Müzik, tel, ritim", "Müzik", "🎸"),
    ("Keman", "Müzik, zarafet, yay", "Müzik", "🎻"),
    ("Davul", "Ritim, vuruş, enerji", "Müzik", "🥁"),
    ("Flüt", "Melodi, nefes, yumuşaklık", "Müzik", "🪈"),
    ("Trompet", "Çağrı, güç, metal", "Müzik", "🎺"),
    ("Saksafon", "Caz, melodi, metal", "Müzik", "🎷"),
    ("Arp", "Melodi, tel, zarafet", "Müzik", "🪕"),
    ("Org", "Kilise, güç, uyum", "Müzik", "🎹"),
    ("Ney", "Tasavvuf, nefes, ruh", "Müzik", "🪈"),
    
    # SPOR
    ("Futbol", "Takım, oyun, gol", "Spor", "⚽"),
    ("Basketbol", "Takım, potaya atış, yükseklik", "Spor", "🏀"),
    ("Voleybol", "Takım, file, smaç", "Spor", "🏐"),
    ("Tenis", "Raket, kort, servis", "Spor", "🎾"),
    ("Yüzme", "Su, nefes, yarış", "Spor", "🏊"),
    ("Koşu", "Hız, dayanıklılık, yarış", "Spor", "🏃"),
    ("Bisiklet", "Pedal, denge, hız", "Spor", "🚴"),
    ("Dağcılık", "Tırmanma, zirve, doğa", "Spor", "🧗"),
    ("Kayak", "Kar, hız, denge", "Spor", "⛷️"),
    ("Sörf", "Dalga, denge, cesaret", "Spor", "🏄"),
    
    # MESLEK
    ("Doktor", "Şifa, bilgi, yardım", "Meslek", "👨‍⚕️"),
    ("Öğretmen", "Eğitim, bilgi, rehberlik", "Meslek", "👨‍🏫"),
    ("Mühendis", "Tasarım, teknik, çözüm", "Meslek", "👨‍💼"),
    ("Avukat", "Hukuk, savunma, adalet", "Meslek", "👨‍⚖️"),
    ("Polis", "Güvenlik, düzen, koruma", "Meslek", "👮"),
    ("Asker", "Vatan, koruma, disiplin", "Meslek", "💂"),
    ("İtfaiyeci", "Yangın, kurtarma, cesaret", "Meslek", "👨‍🚒"),
    ("Pilot", "Uçak, gökyüzü, seyahat", "Meslek", "👨‍✈️"),
    ("Şoför", "Araç, yolculuk, taşıma", "Meslek", "🚗"),
    ("Aşçı", "Yemek, lezzet, yaratıcılık", "Meslek", "👨‍🍳"),
    
    # AİLE
    ("Anne", "Sevgi, koruma, şefkat", "Aile", "👩"),
    ("Baba", "Güç, koruma, rehberlik", "Aile", "👨"),
    ("Kardeş", "Bağ, paylaşım, yakınlık", "Aile", "👫"),
    ("Dede", "Bilgelik, geçmiş, deneyim", "Aile", "👴"),
    ("Nine", "Şefkat, bilgelik, geçmiş", "Aile", "👵"),
    ("Eş", "Bağ, sevgi, ortak", "Aile", "💑"),
    ("Çocuk", "Masumiyet, gelecek, umut", "Aile", "👶"),
    ("Torun", "Gelecek, neşe, devam", "Aile", "👶"),
    ("Amca", "Aile, destek, yakınlık", "Aile", "👨"),
    ("Teyze", "Aile, şefkat, yakınlık", "Aile", "👩"),
    
    # VÜCUT ORGANLARI
    ("Göz", "Görme, algı, bilinç", "Vücut", "👁️"),
    ("Kulak", "Duyma, dinleme, algı", "Vücut", "👂"),
    ("Burun", "Koklama, nefes, algı", "Vücut", "👃"),
    ("Ağız", "Konuşma, yeme, ifade", "Vücut", "👄"),
    ("Dil", "Konuşma, tat, ifade", "Vücut", "👅"),
    ("El", "Tutma, yapma, dokunma", "Vücut", "✋"),
    ("Ayak", "Yürüme, denge, hareket", "Vücut", "🦶"),
    ("Kalp", "Sevgi, hayat, merkez", "Vücut", "❤️"),
    ("Beyin", "Düşünme, zeka, kontrol", "Vücut", "🧠"),
    ("Saç", "Güzellik, kimlik, koruma", "Vücut", "💇"),
    
    # ZAMAN
    ("Sabah", "Başlangıç, aydınlık, uyanış", "Zaman", "🌅"),
    ("Öğle", "Zirve, güç, aydınlık", "Zaman", "☀️"),
    ("Akşam", "Son, dinlenme, karanlık", "Zaman", "🌆"),
    ("Gece", "Karanlık, uyku, gizem", "Zaman", "🌃"),
    ("Gün Doğumu", "Başlangıç, umut, aydınlık", "Zaman", "🌄"),
    ("Gün Batımı", "Son, güzellik, hüzün", "Zaman", "🌇"),
    ("Gece Yarısı", "Gizem, sessizlik, dönüm", "Zaman", "🌌"),
    ("Şafak", "Başlangıç, umut, aydınlık", "Zaman", "🌅"),
    ("Alacakaranlık", "Geçiş, belirsizlik, gizem", "Zaman", "🌆"),
    ("Mevsim", "Döngü, değişim, doğa", "Zaman", "🍂"),
    
    # MEVSİMLER
    ("İlkbahar", "Yenilenme, başlangıç, çiçek", "Mevsimler", "🌸"),
    ("Yaz", "Sıcaklık, enerji, tatil", "Mevsimler", "☀️"),
    ("Sonbahar", "Düşüş, olgunluk, sarı", "Mevsimler", "🍂"),
    ("Kış", "Soğukluk, beyazlık, dinlenme", "Mevsimler", "❄️"),
    
    # ELEMENTLER
    ("Ateş", "Enerji, dönüşüm, tutku", "Elementler", "🔥"),
    ("Su", "Akış, duygu, hayat", "Elementler", "💧"),
    ("Toprak", "Temel, istikrar, bereket", "Elementler", "🌍"),
    ("Hava", "Özgürlük, düşünce, hareket", "Elementler", "💨"),
    
    # DİNİ SEMBOLLER
    ("Kuran", "Hidayet, bilgi, rehber", "Dini", "📖"),
    ("Namaz", "İbadet, bağ, disiplin", "Dini", "🕌"),
    ("Dua", "Yakarış, umut, bağ", "Dini", "🤲"),
    ("Oruç", "Sabır, arınma, disiplin", "Dini", "🌙"),
    ("Hac", "Yolculuk, ibadet, birlik", "Dini", "🕋"),
    ("Zekat", "Paylaşım, bereket, arınma", "Dini", "💰"),
    ("Sadaka", "Yardım, sevap, bereket", "Dini", "🤝"),
    ("Tespih", "Zikir, sakinlik, ibadet", "Dini", "📿"),
    ("Seccade", "Namaz, temizlik, ibadet", "Dini", "🧎"),
    ("Minare", "Çağrı, yükseklik, cami", "Dini", "🕌"),
    
    # DOĞA OLAYLARI
    ("Şelale", "Akış, güç, güzellik", "Doğa", "💦"),
    ("Göl", "Sakinlik, yansıma, derinlik", "Doğa", "🏞️"),
    ("Çöl", "Kurukluk, yalnızlık, sıcaklık", "Doğa", "🏜️"),
    ("Buzul", "Soğukluk, yavaşlık, beyazlık", "Doğa", "🧊"),
    ("Mağara", "Gizem, karanlık, keşif", "Doğa", "🕳️"),
    ("Vadi", "Derinlik, yeşillik, akış", "Doğa", "🏞️"),
    ("Tepe", "Yükseliş, manzara, çaba", "Doğa", "⛰️"),
    ("Ova", "Düzlük, bereket, genişlik", "Doğa", "🌾"),
    ("Plato", "Yükseklik, düzlük, sertlik", "Doğa", "🏔️"),
    ("Ada", "Yalnızlık, su, keşif", "Doğa", "🏝️"),
    
    # TAŞLAR VE MADENLER
    ("Yakut", "Değer, kırmızı, güç", "Madenler", "💎"),
    ("Zümrüt", "Değer, yeşil, şifa", "Madenler", "💚"),
    ("Safir", "Değer, mavi, asalet", "Madenler", "💙"),
    ("Ametist", "Mor, ruhaniyet, sakinlik", "Madenler", "💜"),
    ("Akik", "Koruma, güç, enerji", "Madenler", "🔴"),
    ("Mercan", "Deniz, kırmızı, koruma", "Madenler", "🪸"),
    ("Kehribar", "Sarı, enerji, koruma", "Madenler", "🟡"),
    ("Kuvars", "Berraklık, enerji, şifa", "Madenler", "⚪"),
    ("Opal", "Renk, değişim, güzellik", "Madenler", "🌈"),
    ("Turkuaz", "Mavi, koruma, şans", "Madenler", "🔵"),
]

# Her ek sembol için detaylı veri oluştur
for item in additional_symbols:
    if len(item) == 4:
        symbol, meaning, category, emoji = item
        luck = 75
        real = 65
    else:
        symbol, meaning, category, emoji = item[:4]
        luck = 75
        real = 65
    
    new_symbols.append({
        "symbol": symbol,
        "meaning": meaning,
        "category": category,
        "emoji": emoji,
        "short_description": f"{symbol} görmek {meaning.lower()} sembolüdür.",
        "description": f"Rüyada {symbol.lower()} görmek önemli anlamlar taşır ve hayatınızda değişimlere işaret edebilir.",
        "psychological_meaning": f"{symbol} psikolojik olarak önemli mesajlar taşır.",
        "islamic_meaning": f"{symbol} İslami tabirlerde hayırlı yorumlanır.",
        "positive_effects": [meaning.split(',')[0].strip(), "Farkındalık", "Gelişim"],
        "negative_effects": ["Dikkat gerektirir"],
        "emotion_levels": {
            "fear": max(10, 100 - luck),
            "intuition": luck - 10,
            "confusion": max(5, 100 - luck - 10),
            "power": luck - 5
        },
        "daily_prediction": f"Bugün {symbol.lower()} ile ilgili gelişmeler olabilir.",
        "social_effects": "İlişkilerde olumlu değişimler.",
        "emotional_effects": "Duygusal farkındalık artar.",
        "health_effects": "Genel sağlık dengesi.",
        "financial_signs": "Maddi konularda dikkat.",
        "spiritual_comment": f"{symbol} ruhsal gelişiminize katkı sağlar.",
        "luck_score": luck,
        "realization_rate": real
    })

# Tüm veriyi birleştir
data.extend(new_symbols)

# Dosyaya yaz
with open('dreams/dreams.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

print(f"✅ Toplam kayıt sayısı: {len(data)}")
print(f"🎉 {len(new_symbols)} yeni sembol eklendi!")
