import { pgTable, serial, text, varchar, jsonb } from "drizzle-orm/pg-core";

export const dictionary = pgTable("dictionary", {
    id: serial("id").primaryKey(),

    symbol: varchar("symbol", { length: 255 }).notNull(),
    meaning: varchar("meaning", { length: 255 }).notNull(),
    category: varchar("category", { length: 255 }).notNull(),
    emoji: varchar("emoji", { length: 20 }).notNull(),

    short_description: varchar("short_description", { length: 1000 }),

    description: text("description").notNull(),
    psychological_meaning: text("psychological_meaning"),
    islamic_meaning: text("islamic_meaning"),

    positive_effects: jsonb("positive_effects").default([]),
    negative_effects: jsonb("negative_effects").default([]),

    emotion_levels: jsonb("emotion_levels").default({
        fear: 0,
        intuition: 0,
        confusion: 0,
        power: 0,
    }),

    // YENİ EK ALANLAR ⬇⬇⬇

    daily_prediction: text("daily_prediction"),         // Bugün seni ne bekliyor?
    social_effects: jsonb("social_effects").default([]), // İnsan ilişkilerine etkisi
    emotional_effects: jsonb("emotional_effects").default([]), // Duygu değişimleri
    health_effects: jsonb("health_effects").default([]), // Sağlık işaretleri
    financial_signs: jsonb("financial_signs").default([]), // Maddi anlam işaretleri
    spiritual_comment: text("spiritual_comment"),        // Spiritüel / mistik yorum

    luck_score: varchar("luck_score", { length: 10 }),   // Şans oranı (ör: %65)
    realization_rate: varchar("realization_rate", { length: 10 }), // gerçekleşme ihtimali
});
