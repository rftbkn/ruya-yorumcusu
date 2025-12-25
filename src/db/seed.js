import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { db } from "../config/db.js";
import { dictionary } from "./schema.js";

// __dirname ESM için
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seed() {
    try {
        // JSON dosyasının yolu
        const filePath = path.join(__dirname, "../../dreams/dreams.json");

        console.log("📌 JSON yolu:", filePath);

        const raw = fs.readFileSync(filePath, "utf8");
        const data = JSON.parse(raw);

        console.log(`📦 Toplam yükleniyor: ${data.length} kayıt`);

        // 🚀 BATCH INSERT: Tüm veriyi tek seferde ekle (çok daha hızlı!)
        const BATCH_SIZE = 100; // Her seferde 100 kayıt ekle

        for (let i = 0; i < data.length; i += BATCH_SIZE) {
            const batch = data.slice(i, i + BATCH_SIZE);
            await db.insert(dictionary).values(batch);
            console.log(`✅ ${i + batch.length}/${data.length} kayıt eklendi`);
        }

        console.log("🎉 Tüm veriler başarıyla yüklendi!");
    } catch (err) {
        console.error("❌ Seed Hatası:", err);
    }
}

seed();
