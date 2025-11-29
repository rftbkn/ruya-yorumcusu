import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const dictionary = pgTable("dictionary", {
    id: serial("id").primaryKey(),
    category: varchar("category", { length: 255 }).notNull(),
    description: text("description").notNull(),
    emoji: varchar("emoji", { length: 20 }).notNull(),
    meaning: varchar("meaning", { length: 255 }).notNull(),
    symbol: varchar("symbol", { length: 255 }).notNull(),
});
