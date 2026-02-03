import { pgTable, serial, text, integer, json, boolean, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// -------------------- COUNTRIES --------------------
export const countries = pgTable("countries", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageSrc: text("image_src").notNull(),
  translations: jsonb("translations").$type<
    Partial<Record<"ua" | "en" | "de", string>> | null
  >(),
});

export const countriesRelations = relations(countries, ({ many }) => ({
  userProgress: many(userProgress),
}));

export const flashcards = pgTable("flashcards", {
  id: serial("id").primaryKey(),
  word: text("word").notNull(),
  translations: json("translations").$type<{
    ua: string;
    en: string;
    de: string;
  }>(),
  audioSrc: text("audio_src").$type<string | null>(),
  order: integer("order").notNull(),
});

export const flashcardsRelations = relations(flashcards, ({ }) => ({
  // поки що без зв’язків, але можна прив’язати до уроків або тем
}));

// -------------------- USER PROGRESS --------------------
export const userProgress = pgTable("user_progress", {
  userId: text("user_id").primaryKey(),
  userName: text("user_name").notNull().default("User"),
  userImageSrc: text("user_image_src").notNull().default("/mascot.jpg"),
  activeCountryId: integer("active_country_id").references(() => countries.id, { onDelete: "cascade" }),
  activeRegionId: integer("active_region_id").references(() => regions.id, { onDelete: "cascade" }),
  hearts: integer("hearts").notNull().default(5),
  points: integer("points").notNull().default(0),
  lang: text("language").notNull().default("ua"),
});

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  activeCountry: one(countries, {
    fields: [userProgress.activeCountryId],
    references: [countries.id],
  }),
  activeRegion: one(regions, {
    fields: [userProgress.activeRegionId],
    references: [regions.id],
  }),
}));

import { jsonb } from "drizzle-orm/pg-core";

export const regions = pgTable("regions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  countryId: integer("country_id").references(() => countries.id, { onDelete: "cascade" }),
  imageSrc: text("image_src").notNull(),
  translations: jsonb("translations").$type<
    Partial<Record<"ua" | "en" | "de", string>> | null
  >(),

});

export const regionsRelations = relations(regions, ({ one, many }) => ({
  country: one(countries, { fields: [regions.countryId], references: [countries.id] }),
  units: many(units),
}));

// -------------------- UNITS --------------------
export const units = pgTable("units", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("descroption").notNull(),
  regionId: integer("region_id").references(() => regions.id, { onDelete: "cascade" }).notNull(),
  order: integer("order").notNull(),
  translations: json("translations").$type<Record<string, { title: string; description: string }>>(),
});

export const unitsRelations = relations(units, ({ one, many }) => ({
  course: one(regions, { fields: [units.regionId], references: [regions.id] }),
  lessons: many(lessons),
}));

// -------------------- LESSONS --------------------
export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  unitId: integer("unit_id").references(() => units.id, { onDelete: "cascade" }).notNull(),
  order: integer("order").notNull(),
  translations: json("translations").$type<Record<string, { title: string }>>(),
});

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  unit: one(units, { fields: [lessons.unitId], references: [units.id] }),
  challenges: many(challenges),
}));

// -------------------- CHALLENGES --------------------
export const challengesEnum = pgEnum("type", ["SELECT", "ASSIST", "LISTEN", "WRITE", "COMPLETE"]);

export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id")
    .references(() => lessons.id, { onDelete: "cascade" })
    .notNull(),
  type: challengesEnum("type").notNull(),
  question: text("question").notNull(),
  questionTranslations: jsonb("question_translations").$type<
    Partial<Record<"ua" | "en" | "de", string>>
  >(),
  audioSrc: text("audioSrc").$type<string | null>(),
  order: integer("order").notNull(),
});


export const challengesRelations = relations(challenges, ({ one, many }) => ({
  lesson: one(lessons, { fields: [challenges.lessonId], references: [lessons.id] }),
  challengeOption: many(challengesOptions),
  challengeProgress: many(challengesProgress),
}));

export const challengesOptions = pgTable("challenges_options", {
  id: serial("id").primaryKey(),
  challengeId: integer("challenge_id").references(() => challenges.id, { onDelete: "cascade" }).notNull(),
  text: text("text").notNull(),
  correct: boolean("correct").notNull(),
  imageSrc: text("image_src"),
  audioSrc: text("audio_src"),
});

export const challengesOptionRelations = relations(challengesOptions, ({ one }) => ({
  challenges: one(challenges, { fields: [challengesOptions.challengeId], references: [challenges.id] }),
}));

export const challengesProgress = pgTable("challenges_progress", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  challengeId: integer("challenge_id").references(() => challenges.id, { onDelete: "cascade" }).notNull(),
  completed: boolean("completed").notNull().default(false),
  isPractice: boolean("is_practice").notNull().default(false), // ❗ нове поле
});


export const challengesProgressRelations = relations(challengesProgress, ({ one }) => ({
  challenges: one(challenges, { fields: [challengesProgress.challengeId], references: [challenges.id] }),
}));
