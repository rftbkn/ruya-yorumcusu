import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

dotenv.config();

const router = express.Router();

// API Key kontrolü
if (!process.env.OPENAI_API_KEY) {
    console.error("❌ OPENAI_API_KEY bulunamadı!");
    process.exit(1);
}

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Rate limiting - DDoS koruması
const dreamLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        success: false,
        message: "Çok fazla istek gönderdiniz. Lütfen 15 dakika sonra tekrar deneyin."
    }
});

// Input temizleme
function sanitizeInput(text) {
    if (!text) return "";
    return text.trim().replace(/[<>]/g, "").substring(0, 2000);
}

// 🔥 PROFESYONEL RÜYA YORUMCUSU PROMPT’U
function createAdvancedPrompt(dreamText) {
    return `
Aşağıdaki rüyayı analiz eden profesyonel bir rüya yorumcususun. 
Yorumların sezgisel, psikolojik, sembolik ve rehberlik niteliğinde olacak.
Rüyayı TEK BİR SEMBOLE göre değil; içindeki TÜM öğeleri birlikte analiz edeceksin.

Rüya metninde geçen öğeleri otomatik bul:
- kişiler (anne, baba, sevgili, çocuk, yabancı, ölmüş biri vb.)
- hayvanlar (aslan, köpek, yılan, kuş vb.)
- mekanlar (ev, sokak, orman, karanlık oda, deniz vb.)
- nesneler (anahtar, çanta, telefon, elbise, araba vb.)
- eylemler (koşmak, kaçmak, saldırmak, konuşmak, ağlamak vb.)
- duygular (korku, özlem, panik, huzur, şaşkınlık vb.)
- atmosfer sembolleri (ışık, gölge, renkler, hava durumu vb.)

❗ Rüyada olmayan hiçbir sembolü yorumlama.  
❗ Ne gördüyse onu analiz et.

---

RÜYA:
"${dreamText}"

---

YORUM FORMATIN:

✨ **Genel Enerji**
Rüyanın atmosferi, verdiği duygu ve temel teması.

💖 **Rüyanın Yorumu**
Olayların ve duyguların kişiye ne anlatmak istediğini açıklayan ana yorum.

🌙 **Sembollerin Analizi**
Rüyada geçen TÜM sembolleri sıra sıra yaz ve kısa ama net anlamlarını açıkla.
Ör:  
- Aslan → güç, özgüven, baskı  
- Baba → otorite, kök aile  
- Eski sevgili → geçmiş ilişkiler, duygusal bağ  
- Karanlık oda → bilinmezlik, içsel korkular  
(rüyada ne varsa O sembol yazılacak)

⚠️ **Dikkat Edilmesi Gerekenler**
Rüyanın işaret ettiği olası risk, uyarı veya çözülmemiş duygu.

🎯 **Kişiye Özel Tavsiye**
Somut ve uygulanabilir öneriler.

📊 **Gerçekleşme İhtimali**: __/100
Rüyanın sembolik olarak gerçek hayata yansıma ihtimali.

Cevap tamamen Türkçe ve kullanıcıya direkt hitap eden sıcak bir üslupta olsun.
Uzunluk 230–350 kelime arası olsun.
`;
}

// ----------------------------------------------------------------------
// 🧠 AI ENDPOINT
// ----------------------------------------------------------------------
router.post("/dream", dreamLimiter, async (req, res) => {
    try {
        const { dreamText } = req.body;

        if (!dreamText || typeof dreamText !== "string") {
            return res.status(400).json({
                success: false,
                message: "Lütfen geçerli bir rüya metni girin."
            });
        }

        const sanitized = sanitizeInput(dreamText);

        if (sanitized.length < 10) {
            return res.status(400).json({
                success: false,
                message: "Lütfen rüyanızı biraz daha detaylı anlatın (en az 10 karakter)."
            });
        }

        console.log("🔮 Rüya analizi başlıyor...");

        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: createAdvancedPrompt(sanitized)
                }
            ],
            temperature: 0.8,
            max_tokens: 550,
            presence_penalty: 0.4,
            frequency_penalty: 0.2,
        });

        const answer = completion.choices[0].message.content;

        console.log("✅ Rüya analizi tamamlandı!");

        return res.json({
            success: true,
            answer: answer.trim(),
            metadata: {
                timestamp: new Date().toISOString(),
                model: "gpt-4o-mini",
                tokens: completion.usage?.total_tokens || 0
            }
        });

    } catch (error) {
        console.error("🔴 AI ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Yapay zeka şu anda yanıt veremiyor."
        });
    }
});

// Sağlık kontrolü
router.get("/health", (req, res) => {
    res.json({
        status: "ok",
        service: "Dream AI Interpreter",
        timestamp: new Date().toISOString()
    });
});

export default router;
