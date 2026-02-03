//НАСТЯ
// -------------------- ІМПОРТИ --------------------
import { pgTable, serial, text, integer, json, boolean, timestamp, pgEnum } from "drizzle-orm/pg-core"; 
// ✅ Основні функції для створення таблиць у PostgreSQL через Drizzle ORM
import { relations } from "drizzle-orm"; 
// ✅ Використовується для визначення зв’язків між таблицями
import { jsonb } from "drizzle-orm/pg-core"; 
// ✅ jsonb для зберігання об’єктів JSON у PostgreSQL

// -------------------- COUNTRIES --------------------
export const countries = pgTable("countries", {
  id: serial("id").primaryKey(), 
  // ✅ Унікальний ідентифікатор країни
  title: text("title").notNull(), 
  // ✅ Назва країни
  imageSrc: text("image_src").notNull(), 
  // ✅ Шлях до зображення країни
  translations: jsonb("translations").$type<Partial<Record<"ua" | "en" | "de", string>> | null>(), 
  // ✅ JSON для перекладів назви країни на різні мови
});

export const countriesRelations = relations(countries, ({ many }) => ({
  userProgress: many(userProgress), 
  // ✅ Кожна країна може мати багато записів прогресу користувачів
}));

// -------------------- FLASHCARDS --------------------
export const flashcards = pgTable("flashcards", {
  id: serial("id").primaryKey(), 
  // ✅ Унікальний ідентифікатор флеш-картки
  word: text("word").notNull(), 
  // ✅ Слово для запам'ятовування
  translations: json("translations").$type<{ ua: string; en: string; de: string }>(), 
  // ✅ Переклади слова
  audioSrc: text("audio_src").$type<string | null>(), 
  // ✅ Шлях до аудіо для слова
  order: integer("order").notNull(), 
  // ✅ Порядок відображення флеш-картки
});

export const flashcardsRelations = relations(flashcards, ({ }) => ({
  // ✅ Тут поки немає зв’язків, але можна підключити до уроків або тем
}));

// -------------------- USER PROGRESS --------------------
export const userProgress = pgTable("user_progress", {
  userId: text("user_id").primaryKey(), 
  // ✅ Ідентифікатор користувача
  userName: text("user_name").notNull().default("User"), 
  // ✅ Ім’я користувача за замовчуванням
  userImageSrc: text("user_image_src").notNull().default("/mascot.jpg"), 
  // ✅ Аватар користувача
  activeCountryId: integer("active_country_id").references(() => countries.id, { onDelete: "cascade" }), 
  // ✅ Активна країна користувача
  activeRegionId: integer("active_region_id").references(() => regions.id, { onDelete: "cascade" }), 
  // ✅ Активний регіон користувача
  hearts: integer("hearts").notNull().default(5), 
  // ✅ Кількість сердець користувача
  points: integer("points").notNull().default(0), 
  // ✅ Кількість балів користувача
  lang: text("language").notNull().default("ua"), 
  // ✅ Мова інтерфейсу
});

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  activeCountry: one(countries, { fields: [userProgress.activeCountryId], references: [countries.id] }), 
  // ✅ Зв’язок з активною країною
  activeRegion: one(regions, { fields: [userProgress.activeRegionId], references: [regions.id] }), 
  // ✅ Зв’язок з активним регіоном
}));

// -------------------- REGIONS --------------------
export const regions = pgTable("regions", {
  id: serial("id").primaryKey(), 
  // ✅ Ідентифікатор регіону
  title: text("title").notNull(), 
  // ✅ Назва регіону
  countryId: integer("country_id").references(() => countries.id, { onDelete: "cascade" }), 
  // ✅ До якої країни належить регіон
  imageSrc: text("image_src").notNull(), 
  // ✅ Зображення регіону
  translations: jsonb("translations").$type<Partial<Record<"ua" | "en" | "de", string>> | null>(), 
  // ✅ JSON з перекладами назви регіону
});

export const regionsRelations = relations(regions, ({ one, many }) => ({
  country: one(countries, { fields: [regions.countryId], references: [countries.id] }), 
  // ✅ Зв’язок з країною
  units: many(units), 
  // ✅ Регіон має багато юнітів
}));

// -------------------- UNITS --------------------
export const units = pgTable("units", {
  id: serial("id").primaryKey(), 
  // ✅ Ідентифікатор юніту
  title: text("title").notNull(), 
  // ✅ Назва юніту
  description: text("descroption").notNull(), 
  // ✅ Опис юніту (тут є маленька помилка в слові "descroption" → "description")
  regionId: integer("region_id").references(() => regions.id, { onDelete: "cascade" }).notNull(), 
  // ✅ До якого регіону належить юніт
  order: integer("order").notNull(), 
  // ✅ Порядок відображення
  translations: json("translations").$type<Record<string, { title: string; description: string }>>(), 
  // ✅ JSON з перекладом title та description
});

export const unitsRelations = relations(units, ({ one, many }) => ({
  course: one(regions, { fields: [units.regionId], references: [regions.id] }), 
  // ✅ Юніт належить регіону
  lessons: many(lessons), 
  // ✅ Юніт має багато уроків
}));

// -------------------- LESSONS --------------------
export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(), 
  // ✅ Ідентифікатор уроку
  title: text("title").notNull(), 
  // ✅ Назва уроку
  unitId: integer("unit_id").references(() => units.id, { onDelete: "cascade" }).notNull(), 
  // ✅ До якого юніту належить
  order: integer("order").notNull(), 
  // ✅ Порядок відображення уроку
  translations: json("translations").$type<Record<string, { title: string }>>(), 
  // ✅ JSON з перекладом назви уроку
});

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  unit: one(units, { fields: [lessons.unitId], references: [units.id] }), 
  // ✅ Зв’язок з юнітом
  challenges: many(challenges), 
  // ✅ Урок має багато завдань
}));

// -------------------- CHALLENGES --------------------
export const challengesEnum = pgEnum("type", ["SELECT", "ASSIST", "LISTEN", "WRITE", "COMPLETE"]); 
// ✅ Тип завдання

export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(), 
  // ✅ Ідентифікатор challenge
  lessonId: integer("lesson_id").references(() => lessons.id, { onDelete: "cascade" }).notNull(), 
  // ✅ До якого уроку належить
  type: challengesEnum("type").notNull(), 
  // ✅ Тип завдання
  question: text("question").notNull(), 
  // ✅ Питання
  questionTranslations: jsonb("question_translations").$type<Partial<Record<"ua" | "en" | "de", string>>>(), 
  // ✅ JSON з перекладами питання
  audioSrc: text("audioSrc").$type<string | null>(), 
  // ✅ Аудіо для питання
  order: integer("order").notNull(), 
  // ✅ Порядок відображення завдання
});

export const challengesRelations = relations(challenges, ({ one, many }) => ({
  lesson: one(lessons, { fields: [challenges.lessonId], references: [lessons.id] }), 
  // ✅ Зв’язок з уроком
  challengeOption: many(challengesOptions), 
  // ✅ Завдання може мати багато опцій
  challengeProgress: many(challengesProgress), 
  // ✅ Завдання може мати багато прогресів користувачів
}));

// -------------------- CHALLENGES OPTIONS --------------------
export const challengesOptions = pgTable("challenges_options", {
  id: serial("id").primaryKey(), 
  // ✅ Ідентифікатор опції
  challengeId: integer("challenge_id").references(() => challenges.id, { onDelete: "cascade" }).notNull(), 
  // ✅ До якого завдання належить
  text: text("text").notNull(), 
  // ✅ Текст відповіді
  correct: boolean("correct").notNull(), 
  // ✅ Чи правильна відповідь
  imageSrc: text("image_src"), 
  // ✅ Картинка (опційно)
  audioSrc: text("audio_src"), 
  // ✅ Аудіо (опційно)
});

export const challengesOptionRelations = relations(challengesOptions, ({ one }) => ({
  challenges: one(challenges, { fields: [challengesOptions.challengeId], references: [challenges.id] }), 
  // ✅ Зв’язок з challenge
}));

// -------------------- CHALLENGES PROGRESS --------------------
export const challengesProgress = pgTable("challenges_progress", {
  id: serial("id").primaryKey(), 
  // ✅ Ідентифікатор прогресу
  userId: text("user_id").notNull(), 
  // ✅ Користувач
  challengeId: integer("challenge_id").references(() => challenges.id, { onDelete: "cascade" }).notNull(), 
  // ✅ До якого завдання прогрес
  completed: boolean("completed").notNull().default(false), 
  // ✅ Чи виконано завдання
  isPractice: boolean("is_practice").notNull().default(false), 
  // ✅ Чи виконано у режимі practice
});

export const challengesProgressRelations = relations(challengesProgress, ({ one }) => ({
  challenges: one(challenges, { fields: [challengesProgress.challengeId], references: [challenges.id] }), 
  // ✅ Зв’язок з challenge
}));
