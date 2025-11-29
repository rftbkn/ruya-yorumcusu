import express from 'express';
import { env } from './config/env.js';
import { db } from './config/db.js';
import { dictionary } from "./db/schema.js";
import { ilike, eq } from "drizzle-orm";



const app = express();

const PORT = env.PORT || 5001;

app.use(express.json());


app.get("/api/dictionary/:symbol", async (req, res) => {
    try {
        const { symbol } = req.params;

        const result = await db
            .select()
            .from(dictionary)
            .where(ilike(dictionary.symbol, symbol));  // <-- DOĞRU kullanım

        if (result.length === 0) {
            return res.status(404).json({ success: false, message: "Not found" });
        }

        return res.status(200).json({
            success: true,
            data: result[0]
        });

    } catch (error) {
        console.error("GET /dictionary error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});

app.post("/api/dictionary", async (req, res) => {
    try {
        const { category, description, emoji, meaning, symbol } = req.body;

        if (!category || !description || !emoji || !meaning || !symbol) {
            return res.status(400).json({
                success: false,
                message: "Missing fields"
            });
        }

        const result = await db.insert(dictionary).values({
            category,
            description,
            emoji,
            meaning,
            symbol,
        });

        res.json({
            success: true,
            data: result
        });

    } catch (error) {
        console.log("POST /api/dictionary error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log('Server is running on PORT ' + PORT);
});