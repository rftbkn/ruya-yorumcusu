import express from 'express';
import { env } from './config/env.js';
import { db } from './config/db.js';
import { dictionary } from "./db/schema.js";


const app = express();

const PORT = env.PORT || 5001;

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.status(200).json({ success: true });
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