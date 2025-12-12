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

// ⭐ Render proxy hatasını ÇÖZER (çok önemli)
app.set("trust proxy", 1);

app.use(cors());
app.use(express.json());

if (env.NODE_ENV === "production") job.start();

// ⭐ AI ENDPOINT
app.use("/api/ai", aiRoutes);

// ⭐ GET DICTIONARY LIMIT
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

// ⭐ GET SYMBOL
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

// ⭐ POST DICTIONARY
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

// ⭐ SERVER START
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on PORT ${PORT}`);
});
