import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

import { db } from "../config/db.js";
import { adTokens, dreamUsage } from "../db/schema.js";
import { eq, and, lt, gte } from "drizzle-orm";
import crypto from "crypto";

dotenv.config();
const router = express.Router();

// ---- ENV
if (!process.env.OPENAI_API_KEY) {
    console.error("❌ OPENAI_API_KEY buluanamadı!");
    process.exit(1);
}

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ---- LIMIT SETTINGS
const FREE_DAILY_LIMIT = 0;      // ❌ ÜCRETSİZ RÜYA YOK - İLK RÜYA DAHİL HER RÜYA İÇİN REKLAM GEREKLİ
const REWARDED_PER_AD = 1;       // 1 reklam = 1 rüya
const MAX_ADS_PER_DAY = 50;      // günlük maksimum 50 reklam (spam önleme)
const MAX_DAILY_DREAMS = 4;      // 🔒 GÜNLÜK MAKSİMUM 4 RÜYA LİMİTİ
const TOKEN_TTL_HOURS = 24;      // token 24 saat sonra otomatik silinir

// ---- Rate limiting (DDoS)
const dreamLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: { success: false, message: "Çok fazla istek. 15 dk sonra deneyin." },
});

function sanitizeInput(text) {
    if (!text) return "";
    return text.trim().replace(/[<>]/g, "").substring(0, 2000);
}

function todayDateStringTR() {
    // Türkiye saati (UTC+3) için tarih
    const now = new Date();
    const turkeyTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Istanbul' }));

    const y = turkeyTime.getFullYear();
    const m = String(turkeyTime.getMonth() + 1).padStart(2, "0");
    const d = String(turkeyTime.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

function hashUserKey(rawKey) {
    // SHA-256 ile hash'le (güvenlik için)
    return crypto.createHash('sha256').update(rawKey).digest('hex');
}

function getUserKey(req) {
    // Client'tan gelen userKey'i al
    const fromBody = req.body?.userKey;

    if (fromBody && typeof fromBody === "string" && fromBody.length > 3) {
        // ✅ Cihaz ID'sini hash'le
        return hashUserKey(fromBody);
    }

    // Fallback: IP adresi (hash'li)
    const ip =
        (req.headers["x-forwarded-for"]?.toString().split(",")[0] || "").trim() ||
        req.socket?.remoteAddress ||
        "unknown";

    return hashUserKey(`ip:${ip}`);
}

// PROMPT
function createAdvancedPrompt(dreamText) {
    return `
Aşağıdaki rüyayı analiz eden profesyonel bir rüya yorumcususun. 
Yorumların sezgisel, psikolojik, sembolik ve rehberlik niteliğinde olacak.
Rüyayı TEK BİR SEMBOLE göre değil; içindeki TÜM öğeleri birlikte analiz edeceksin.

❗ Rüyada olmayan hiçbir sembolü yorumlama.  
❗ Ne gördüyse onu analiz et.

RÜYA:
"${dreamText}"

YORUM FORMATIN:
💖 **Rüyanın Yorumu**
✨ **Genel Enerji**
🌙 **Sembollerin Analizi**
⚠️ **Dikkat Edilmesi Gerekenler**
🎯 **Kişiye Özel Tavsiye**

Cevap tamamen Türkçe olsun.
Uzunluk 230–350 kelime arası olsun.
`;
}

// ---- USAGE HELPERS
async function getOrCreateUsage(userKey) {
    const today = todayDateStringTR();

    const rows = await db
        .select()
        .from(dreamUsage)
        .where(eq(dreamUsage.userKey, userKey));

    const row = rows[0];

    if (!row) {
        // ilk kez
        await db.insert(dreamUsage).values({
            userKey,
            dailyCount: 0,
            lastDate: today,
            totalDreams: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return { userKey, dailyCount: 0, lastDate: today, totalDreams: 0 };
    }

    // gün değiştiyse ESKİ KAYDI SİL, yeni kayıt oluştur
    if (row.lastDate !== today) {
        const oldTotalDreams = row.totalDreams ?? 0; // Toplam rüya sayısını sakla

        await db
            .delete(dreamUsage)
            .where(eq(dreamUsage.userKey, userKey));

        await db.insert(dreamUsage).values({
            userKey,
            dailyCount: 0,
            lastDate: today,
            totalDreams: oldTotalDreams, // Toplam sayıyı koru
            createdAt: row.createdAt || new Date(),
            updatedAt: new Date(),
        });

        return { userKey, dailyCount: 0, lastDate: today, totalDreams: oldTotalDreams };
    }

    return row;
}

async function getAvailableTokens(userKey) {
    const rows = await db
        .select()
        .from(adTokens)
        .where(and(eq(adTokens.userKey, userKey), eq(adTokens.used, false)));

    return rows.length;
}

async function consumeOneToken(userKey) {
    const rows = await db
        .select()
        .from(adTokens)
        .where(and(eq(adTokens.userKey, userKey), eq(adTokens.used, false)))
        .limit(1);

    const tokenRow = rows[0];
    if (!tokenRow) return null;

    // Token'ı SİL (UPDATE yerine) - veritabanı şişmesini önler
    await db
        .delete(adTokens)
        .where(eq(adTokens.token, tokenRow.token));

    return tokenRow.token;
}

// ---- OTOMATIK TEMİZLİK: Eski kullanılmamış token'ları sil
async function cleanupOldTokens() {
    try {
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

        await db
            .delete(adTokens)
            .where(and(
                eq(adTokens.used, false),
                lt(adTokens.createdAt, oneDayAgo)
            ));

        console.log(`🧹 Eski token'lar temizlendi (24 saat+)`);
    } catch (error) {
        console.error("Token cleanup hatası:", error);
    }
}

// Her saat başı cleanup çalıştır
setInterval(cleanupOldTokens, 60 * 60 * 1000);
// İlk başlangıçta da çalıştır
cleanupOldTokens();

// --------------------------------------------------
// ✅ CHECK: kullanıcı durumunu döndür
// --------------------------------------------------
router.post("/check", async (req, res) => {
    try {
        const userKey = getUserKey(req);
        const usage = await getOrCreateUsage(userKey);
        const tokens = await getAvailableTokens(userKey);

        const freeLeft = Math.max(0, FREE_DAILY_LIMIT - (usage.dailyCount ?? 0));

        return res.json({
            success: true,
            userKey,
            freeLeft,
            tokens,
            canCallGpt: freeLeft > 0 || tokens > 0,
        });
    } catch (e) {
        console.error("CHECK ERROR:", e);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});

// --------------------------------------------------
// ✅ REWARD: reklam izlenince token üret (insert)
// --------------------------------------------------
router.post("/reward", async (req, res) => {
    try {
        const userKey = getUserKey(req);

        // Bugün kaç reklam izlendi kontrol et (spam önleme)
        const today = todayDateStringTR();
        const todayStart = new Date(today + "T00:00:00");

        const todayTokensCount = await db
            .select()
            .from(adTokens)
            .where(and(
                eq(adTokens.userKey, userKey),
                gte(adTokens.createdAt, todayStart)
            ));

        if (todayTokensCount.length >= MAX_ADS_PER_DAY) {
            return res.status(429).json({
                success: false,
                message: `Günlük reklam limitine ulaştınız (${MAX_ADS_PER_DAY} reklam/gün).`,
            });
        }

        // 1 reklam = 1 token
        const created = [];

        for (let i = 0; i < REWARDED_PER_AD; i++) {
            const token = crypto.randomBytes(16).toString("hex");
            created.push(token);

            await db.insert(adTokens).values({
                token,
                userKey,
                used: false,
            });
        }

        return res.json({
            success: true,
            userKey,
            created: created.length,
        });
    } catch (e) {
        console.error("REWARD ERROR:", e);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});

// --------------------------------------------------
// ✅ DREAM: 1 ücretsiz, sonrası token şart
// --------------------------------------------------
router.post("/dream", dreamLimiter, async (req, res) => {
    try {
        const { dreamText } = req.body;
        const userKey = getUserKey(req);

        if (!dreamText || typeof dreamText !== "string") {
            return res.status(400).json({ success: false, message: "Geçerli rüya metni girin." });
        }

        const sanitized = sanitizeInput(dreamText);
        if (sanitized.length < 10) {
            return res.status(400).json({ success: false, message: "En az 10 karakter yaz." });
        }

        const usage = await getOrCreateUsage(userKey);
        const dailyCount = usage.dailyCount ?? 0;

        // 🔒 GÜNLÜK 4 RÜYA LİMİT KONTROLÜ
        if (dailyCount >= MAX_DAILY_DREAMS) {
            return res.status(429).json({
                success: false,
                code: "DAILY_LIMIT_REACHED",
                message: "Günlük rüya yorumlama hakkınız doldu. Yarın tekrar deneyin!",
                dailyCount: dailyCount,
                maxDaily: MAX_DAILY_DREAMS,
            });
        }

        // ❌ ÜCRETSİZ HAK YOK - İLK RÜYA DAHİL HER RÜYA İÇİN TOKEN GEREKLİ
        const usedToken = await consumeOneToken(userKey);
        if (!usedToken) {
            return res.status(402).json({
                success: false,
                code: "AD_REQUIRED",
                message: "Rüya yorumu için reklam izlemelisin.",
            });
        }

        // ✅ Token kullanıldı, günlük sayacı artır
        await db
            .update(dreamUsage)
            .set({
                dailyCount: dailyCount + 1,
                totalDreams: (usage.totalDreams ?? 0) + 1,
                updatedAt: new Date()
            })
            .where(eq(dreamUsage.userKey, userKey));

        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: createAdvancedPrompt(sanitized) }],
            temperature: 0.8,
            max_tokens: 550,
            presence_penalty: 0.4,
            frequency_penalty: 0.2,
        });

        const answer = completion.choices?.[0]?.message?.content ?? "";

        return res.json({
            success: true,
            answer: answer.trim(),
            gating: {
                userKey,
                usedToken: Boolean(usedToken),
            },
            metadata: {
                timestamp: new Date().toISOString(),
                model: "gpt-4o-mini",
                tokens: completion.usage?.total_tokens || 0,
            },
        });
    } catch (e) {
        console.error("DREAM ERROR:", e);
        return res.status(500).json({ success: false, message: "AI şu anda yanıt veremiyor." });
    }
});

router.get("/health", (req, res) => {
    res.json({ status: "ok", service: "Dream AI Interpreter", timestamp: new Date().toISOString() });
});

export default router;
