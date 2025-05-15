import {
  integer,
  pgEnum,
  pgSchema,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

const users = pgSchema("auth").table("users", {
  id: uuid().primaryKey(),
});

export const mbtis = pgEnum("mbti", [
  "istp",
  "intp",
  "isfp",
  "infp",
  "estp",
  "entp",
  "esfp",
  "enfp",
  "istj",
  "intj",
  "isfj",
  "infj",
  "estj",
  "entj",
  "esfj",
  "enfj",
]);

export const profiles = pgTable("profiles", {
  profile_id: uuid()
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  nickname: text().notNull(),
  age: integer().notNull(),
  mbti: mbtis().notNull(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow(),
});
