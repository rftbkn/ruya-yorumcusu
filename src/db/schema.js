import {
    pgTable,
    serial,
    text,
    varchar,
    jsonb,
    integer,
    date,
    boolean,
    timestamp
} from "drizzle-orm/pg-core";

/* -------------------------------------------------
   📘 DICTIONARY TABLOSU (MEVCUT – DOKUNULMADI)
------------------------------------------------- */
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

    daily_prediction: text("daily_prediction"),
    social_effects: jsonb("social_effects").default([]),
    emotional_effects: jsonb("emotional_effects").default([]),
    health_effects: jsonb("health_effects").default([]),
    financial_signs: jsonb("financial_signs").default([]),
    spiritual_comment: text("spiritual_comment"),

    luck_score: varchar("luck_score", { length: 10 }),
    realization_rate: varchar("realization_rate", { length: 10 }),
});


/* -------------------------------------------------
   🔐 GÜNLÜK KULLANIM TABLOSU
   ❌ ÜCRETSİZ RÜYA YOK
   ✅ 1 reklam = 1 rüya
   📊 Günlük ve toplam rüya sayısı takibi
------------------------------------------------- */
export const dreamUsage = pgTable("dream_usage", {
    userKey: varchar("user_key", { length: 255 }).primaryKey(),

    dailyCount: integer("daily_count")
        .notNull()
        .default(0),

    lastDate: date("last_date").notNull(),

    totalDreams: integer("total_dreams")
        .notNull()
        .default(0),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});


/* -------------------------------------------------
   🎟️ REKLAM TOKEN TABLOSU
   ✅ 1 reklam = 1 rüya
   🗑️ Kullanıldığında otomatik DELETE
   ⏰ 24 saat sonra otomatik temizlik
------------------------------------------------- */
export const adTokens = pgTable("ad_tokens", {
    token: varchar("token", { length: 255 }).primaryKey(),

    userKey: varchar("user_key", { length: 255 }).notNull(),

    used: boolean("used")
        .notNull()
        .default(false),

    createdAt: timestamp("created_at").defaultNow(),
});
