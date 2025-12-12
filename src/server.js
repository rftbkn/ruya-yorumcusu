import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { db } from './config/db.js';
import { dictionary } from "./db/schema.js";
import { ilike } from "drizzle-orm";
import job from './config/cron.js';
import aiRoutes from "./routes/ai.js";   // ⭐ AI ROUTE

const app = express();
const PORT = env.PORT || 5001;

// ⭐ Render Proxy Hatası ÇÖZÜMÜ
app.set("trust proxy", 1);

// Middleware
app.use(cors());
app.use(express.json());

// ⭐ Cron yalnızca prod ortamında çalışsın
if (env.NODE_ENV === "production") job.start();

// --------------------------------------------------
// ⭐ Render Health Check için ana GET endpoint
// --------------------------------------------------
app.get("/", (req, res) => {
    res.send("Rüya Yorumcusu API Çalışıyor ✨");
});

// --------------------------------------------------
// ⭐ AI ENDPOINT (POST) + GET koruması
// --------------------------------------------------
app.use("/api/ai", aiRoutes);

app.get("/api/ai/dream", (req, res) => {
    res.status(400).json({
        success: false,
        message: "Bu endpoint yalnızca POST metodunu destekler."
    });
});

// --------------------------------------------------
// ⭐ SÖZLÜK ENDPOINTLERİ
// --------------------------------------------------

// LIMIT
app.get("/api/dictionary-limit/:limit", async (req, res) => {
    try {
        const { limit } = req.params;

        const result = await db
            .select()
            .from(dictionary)
            .limit(Number(limit));

        return res.json({ success: true, data: result });

    } catch (error) {
        console.error("GET /dictionary-limit error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});

// SYMBOL
app.get("/api/dictionary/:symbol", async (req, res) => {
    try {
        const { symbol } = req.params;

        const result = await db
            .select()
            .from(dictionary)
            .where(ilike(dictionary.symbol, symbol));

        if (result.length === 0)
            return res.status(404).json({ success: false, message: "Not found" });

        return res.json({ success: true, data: result[0] });

    } catch (error) {
        console.error("GET /dictionary error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});

// POST
app.post("/api/dictionary", async (req, res) => {
    try {
        const data = req.body;

        const result = await db.insert(dictionary).values({
            symbol: data.symbol,
            meaning: data.meaning,
            category: data.category,
            emoji: data.emoji,
            short_description: data.short_description,
            description: data.description,
            psychological_meaning: data.psychological_meaning,
            islamic_meaning: data.islamic_meaning,
            positive_effects: data.positive_effects,
            negative_effects: data.negative_effects,
            emotion_levels: data.emotion_levels,
        }).returning();

        return res.json({
            success: true,
            data: result[0]
        });

    } catch (error) {
        console.error("POST /dictionary error:", error);

        return res.status(500).json({
            success: false,
            message: "Insert error",
            error: error.message
        });
    }
});

// --------------------------------------------------
// ⭐ SERVER START
// --------------------------------------------------
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on PORT ${PORT}`);
});
