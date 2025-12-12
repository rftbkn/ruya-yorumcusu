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
        // ⬇⬇⬇ JSON dosyasının DOĞRU yolu ⬇⬇⬇
        const filePath = path.join(__dirname, "../../dreams/dreams.json");

        console.log("📌 JSON yolu:", filePath);

        const raw = fs.readFileSync(filePath, "utf8");
        const data = JSON.parse(raw);

        console.log(`📦 Toplam yükleniyor: ${data.length} kayıt`);

        let count = 1;

        for (const row of data) {
            await db.insert(dictionary).values(row);
            console.log(`✅ (${count}/${data.length}) Eklendi: ${row.symbol}`);
            count++;
        }

        console.log("🎉 Tüm veriler başarıyla yüklendi!");
    } catch (err) {
        console.error("❌ Seed Hatası:", err);
    }
}

seed();
