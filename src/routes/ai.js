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
    windowMs: 15 * 60 * 1000, // 15 dakika
    max: 10, // Her IP'den maksimum 10 istek
    message: {
        success: false,
        message: "Çok fazla istek gönderdiniz. Lütfen 15 dakika sonra tekrar deneyin."
    }
});

// Input temizleme ve validasyon
function sanitizeInput(text) {
    if (!text) return "";

    return text
        .trim()
        .replace(/[<>]/g, "")
        .substring(0, 2000);
}

// KISALTILMIŞ PROMPT - Daha Kısa Cevaplar
// KISALTILMIŞ PROMPT - Daha Kısa Cevaplar
function createAdvancedPrompt(dreamText) {
    return `
Sen 'Rüya Yorumcusu' adlı mobil uygulamada çalışan profesyonel bir rüya analisti ve sezgisel bir yorumcusun. 
Üslubun falcıların samimi, akıcı ve içten tarzıyla; sezgisel yorumcuların ruhsal ve derin yaklaşımını birleştirir.

Cevapların:
- kişiye konuşuyormuş gibi olsun (“Rüyan bana şunu hissettirdi…” gibi)
- sıcak, sezgisel, mistik ama gerçekçi
- sembolleri manevi, kültürel ve geleneksel açıdan yorumla
- akıcı, hikâye anlatır gibi yaz
- her rüya için tamamen özgün yorum üret
- **Kesinlikle “Kısa Yorum” başlığı üretme**

Cevap formatın şu şekilde olsun:

✨ **Genel Enerji ve Yorum**  
Rüyanın atmosferini, verdiği hissi ve temel enerjisini anlat.

💖 **Rüyanın Yorumu**  
(Eski “Duygusal Etki” bölümünün yeni adı)  
Rüyanın kişiye ne anlatmak istediğini, hangi içsel mesajı taşıdığını ve duygusal etkisini açıkla.

🌙 **Manevi / Geleneksel Sembollerin Anlamı**  
Rüyadaki sembollerin kültürel, sezgisel ve ruhsal anlamlarını ifade et.

⚠️ **Dikkat Edilmesi Gerekenler**  
Rüyanın sezgisel olarak işaret ettiği olası riskler ve farkında olunması gereken noktalar.

🎯 **Kişiye Özel Tavsiye**  
Kişiye yol gösteren, uygulanabilir, samimi öneriler sun.

📊 **Gerçekleşme İhtimali**: __/100  
Rüyanın gerçek hayatla ilişkisini dengeli bir şekilde değerlendir.

Kurallar:
- Aynı kalıpları tekrar etme  
- Kesin hüküm verme  
- Kullanıcıyı destekleyen, motive eden bir ton kullan  
- Cevap tamamen Türkçe ve 350–550 kelime arası olsun

    `;
}
// Ana endpoint
router.post("/dream", dreamLimiter, async (req, res) => {
    try {
        const { dreamText } = req.body;

        // Validasyon
        if (!dreamText || typeof dreamText !== 'string') {
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

        if (sanitized.length > 2000) {
            return res.status(400).json({
                success: false,
                message: "Rüya metni çok uzun. Lütfen 2000 karakterin altında tutun."
            });
        }

        console.log("🔮 Rüya analizi başlatılıyor...");

        // OpenAI API çağrısı
        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "Sen kısa, öz ve etkili analiz yapan profesyonel bir rüya yorumcususun. Her analiz MAKSIMUM 500 kelime olmalı. Gereksiz detaylara girmeden, doğrudan ve net açıklamalar yaparsın."
                },
                {
                    role: "user",
                    content: createAdvancedPrompt(sanitized)
                },
            ],
            temperature: 0.7,
            max_tokens: 800, // Daha kısa cevaplar için azaltıldı
            presence_penalty: 0.6,
            frequency_penalty: 0.3,
        });

        const answer = completion.choices[0].message.content;

        console.log("✅ Rüya analizi tamamlandı!");

        // Başarılı yanıt
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

        // OpenAI spesifik hatalar
        if (error.code === 'insufficient_quota') {
            return res.status(503).json({
                success: false,
                message: "Servis şu anda yoğun. Lütfen birkaç dakika sonra tekrar deneyin."
            });
        }

        if (error.code === 'rate_limit_exceeded') {
            return res.status(429).json({
                success: false,
                message: "Çok fazla istek alındı. Lütfen biraz bekleyin."
            });
        }

        if (error.code === 'model_not_found') {
            return res.status(500).json({
                success: false,
                message: "AI modeli bulunamadı. Lütfen sistem yöneticisine bildirin."
            });
        }

        // Genel hata
        return res.status(500).json({
            success: false,
            message: "Yapay zeka şu anda yanıt veremiyor. Lütfen daha sonra tekrar deneyin.",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Health check endpoint
router.get("/health", (req, res) => {
    res.json({
        status: "ok",
        service: "Dream AI Interpreter",
        timestamp: new Date().toISOString()
    });
});

export default router;
