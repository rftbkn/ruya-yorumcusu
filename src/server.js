import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { db } from './config/db.js';
import { dictionary } from "./db/schema.js";
import { ilike } from "drizzle-orm";
import job from './config/cron.js';

const app = express();
const PORT = env.PORT || 5001;

// CORS AÇ (MOBİLDEN ERİŞİM İÇİN ŞART)
app.use(cors());
app.use(express.json());

if (env.NODE_ENV === "production") job.start();

// 🔥 LIMITLI SÖZLÜK ROTA (BUNU MOBİL KULLANIYOR)
app.get("/api/dictionary-limit/:limit", async (req, res) => {
    try {
        const { limit } = req.params;

        const result = await db
            .select()
            .from(dictionary)
            .limit(Number(limit));

        return res.json({
            success: true,
            data: result
        });

    } catch (error) {
        console.error("GET /dictionary-limit error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});

// TEK RÜYA GETİRME
app.get("/api/dictionary/:symbol", async (req, res) => {
    try {
        const { symbol } = req.params;

        const result = await db
            .select()
            .from(dictionary)
            .where(ilike(dictionary.symbol, symbol));

        if (result.length === 0) {
            return res.status(404).json({ success: false, message: "Not found" });
        }

        return res.json({
            success: true,
            data: result[0]
        });

    } catch (error) {
        console.error("GET /dictionary error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});

// 🔥 TÜM CİHAZLARA AÇIK ŞEKİLDE SERVER BAŞLAT
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on PORT ${PORT}`);
});
