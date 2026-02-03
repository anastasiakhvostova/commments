import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../db/schema";
// import { sql } from "drizzle-orm";
import { flashcards } from "../db/schema";


const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function main() {
  try {
    console.log("Seeding database...");

    await db.delete(schema.challengesProgress);
    await db.delete(schema.challengesOptions);
    await db.delete(schema.challenges);
    await db.delete(schema.lessons);
    await db.delete(schema.units);
    await db.delete(schema.regions);
    await db.delete(schema.userProgress);
    await db.delete(schema.countries);

    await db.insert(schema.countries).values([
    {
      id: 1,
      title: "Україна",
      imageSrc: "/ukraine.png",
      translations: {
        ua: "Україна",
        en: "Ukraine",
        de: "Ukraine",
      },
    },
    {
      id: 2,
      title: "Німеччина",
      imageSrc: "/germany.png",
      translations: {
        ua: "Німеччина",
        en: "Germany",
        de: "Deutschland",
      },
    },
    {
      id: 3,
      title: "Англія",
      imageSrc: "/britain.png",
      translations: {
        ua: "Англія",
        en: "England",
        de: "England",
      },
    },
  ]);
    const words = [
    {
      audio: "/audio/7/Бульба.mp3",
      word: "Бульба",
      translations: { ua: "картопля", en: "potato", de: "Kartoffel" },
    },
    {
      audio: "/audio/7/Лєс.mp3",
      word: "Лєс",
      translations: { ua: "ліс", en: "forest", de: "Wald" },
    },
    {
      audio: "/audio/7/Гуторити.mp3",
      word: "Гуторити",
      translations: { ua: "розмовляти", en: "to talk", de: "sprechen" },
    },
    {
      audio: "/audio/7/Куфер.mp3",
      word: "Куфер",
      translations: { ua: "валіза, скриня", en: "trunk, chest", de: "Koffer, Truhe" },
    },
    {
      audio: "/audio/7/Припічок.mp3",
      word: "Припічок",
      translations: { ua: "місце біля печі", en: "place near the stove", de: "Platz neben dem Herd" },
    },
    {
      audio: "/audio/7/Клюмба.mp3",
      word: "Клюмба",
      translations: { ua: "квітник", en: "flowerbed", de: "Blumenbeet" },
    },
    {
      audio: "/audio/7/Порєдок.mp3",
      word: "Порєдок",
      translations: { ua: "порядок", en: "order", de: "Ordnung" },
    },
    {
      audio: "/audio/7/Лєснік.mp3",
      word: "Лєснік",
      translations: { ua: "лісник", en: "forester", de: "Förster" },
    },
    {
      audio: "/audio/7/Прип’ятник.mp3",
      word: "Прип’ятник",
      translations: { ua: "камінь-пам’ятник", en: "memorial stone", de: "Gedenkstein" },
    },
    {
      audio: "/audio/7/Клямка.mp3",
      word: "Клямка",
      translations: { ua: "дверна ручка", en: "door handle", de: "Türgriff" },
    },
    {
      audio: "/audio/7/Шчьо.mp3",
      word: "Шчьо",
      translations: { ua: "що", en: "what", de: "was" },
    },
    {
      audio: "/audio/7/Хвіртка.mp3",
      word: "Хвіртка",
      translations: { ua: "брама, ворота", en: "gate, doorway", de: "Tor, Pforte" },
    },
    {
      audio: "/audio/7/Погрєб.mp3",
      word: "Погрєб",
      translations: { ua: "льох", en: "cellar", de: "Keller" },
    },
    {
      audio: "/audio/7/Калачі.mp3",
      word: "Калачі",
      translations: { ua: "хлібці з білого тіста", en: "white bread rolls", de: "Weißbrotbrötchen" },
    },
    {
      audio: "/audio/7/Шопка.mp3",
      word: "Шопка",
      translations: { ua: "невеликий сарай", en: "small shed", de: "kleiner Schuppen" },
    },
    {
      audio: "/audio/7/Посьолок.mp3",
      word: "Посьолок",
      translations: { ua: "селище", en: "settlement", de: "Siedlung" },
    },
    {
      audio: "/audio/7/Дєдьо.mp3",
      word: "Дєдьо",
      translations: { ua: "дядько", en: "uncle", de: "Onkel" },
    },
  ];

  // Функція для рандомного перемішування
  function shuffleArray<T>(array: T[]): T[] {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

  async function main() {
    const shuffled = shuffleArray(words);

    await db.insert(flashcards).values(
      shuffled.map((w, index) => ({
        word: w.word,
        translations: w.translations,
        audioSrc: w.audio,
        order: index + 1,
      }))
    );

    console.log("Flashcards seeded ✅");
  }

    await db.insert(schema.regions).values([
  {
    id: 7,
    title: "Північне наріччя",
    countryId: 1,
    imageSrc: "/ukraine.png",
    translations: {
      ua: "Північне наріччя",
      en: "Northern Dialect",
      de: "Nördlicher Dialekt",
    },
  },
  {
    id: 8,
    title: "Південно-західне наріччя",
    countryId: 1,
    imageSrc: "/ukraine.png",
    translations: {
      ua: "Південно-західне наріччя",
      en: "Southwestern Dialect",
      de: "Südwestlicher Dialekt",
    },
  },
  {
    id: 9,
    title: "Південно-східне наріччя",
    countryId: 1,
    imageSrc: "/ukraine.png",
    translations: {
      ua: "Південно-східне наріччя",
      en: "Southeastern Dialect",
      de: "Südöstlicher Dialekt",
    },
  },
  {
    id: 10,
    title: "Нижньонімецькі діалекти",
    countryId: 2,
    imageSrc: "/germany.png",
    translations: {
      ua: "Нижньонімецькі діалекти",
      en: "Low German Dialects",
      de: "Niederdeutsche Dialekte",
    },
  },
  {
    id: 11,
    title: "Середньонімецькі діалекти",
    countryId: 2,
    imageSrc: "/germany.png",
    translations: {
      ua: "Середньонімецькі діалекти",
      en: "Central German Dialects",
      de: "Mitteldeutsche Dialekte",
    },
  },
  {
    id: 12,
    title: "Верхньонімецькі діалекти",
    countryId: 2,
    imageSrc: "/germany.png",
    translations: {
      ua: "Верхньонімецькі діалекти",
      en: "Upper German Dialects",
      de: "Oberdeutsche Dialekte",
    },
  },
  {
    id: 13,
    title: "Кокні",
    countryId: 3,
    imageSrc: "/britain.png",
    translations: {
      ua: "Кокні",
      en: "Cockney",
      de: "Cockney",
    },
  },
  {
    id: 14,
    title: "Скауз",
    countryId: 3,
    imageSrc: "/britain.png",
    translations: {
      ua: "Скауз",
      en: "Scouse",
      de: "Scouse",
    },
  },
  {
    id: 15,
    title: "Джорди",
    countryId: 3,
    imageSrc: "/britain.png",
    translations: {
      ua: "Джорди",
      en: "Geordie",
      de: "Geordie",
    },
  },
  {
    id: 16,
    title: "Йоркшир",
    countryId: 3,
    imageSrc: "/britain.png",
    translations: {
      ua: "Йоркшир",
      en: "Yorkshire",
      de: "Yorkshire",
    },
  },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        regionId: 7,
        title: "Додаток",
        description: "Перед тим, як практикуватися, радимо прочитати навчальні матеріали",
        order: 1,
      },
    ]);

    await db.insert(schema.lessons).values([
      { id: 1, unitId: 1, order: 1, title: "Слова про людей" },
      { id: 2, unitId: 1, order: 2, title: "Природа і село" },
      { id: 3, unitId: 1, order: 3, title: "Хата і побут" },
      { id: 4, unitId: 1, order: 4, title: "Їжа і напої" },
      { id: 5, unitId: 1, order: 5, title: "Дієслова та дії" },
    ]);


    const northChallenges: typeof schema.challenges.$inferInsert[] = [];
    const northOptions: typeof schema.challengesOptions.$inferInsert[] = [];
    let idCounter = 100;

      const addChallenge = (
      lessonId: number,
      type: "SELECT" | "ASSIST" | "LISTEN" | "WRITE",
      question: {
        ua: string
        en: string
        de: string
      },
      answers: { text: string; correct: boolean; imageSrc?: string }[],
      audioSrc?: string
    ) => {
      const chId = idCounter++;

      northChallenges.push({
        id: chId,
        lessonId,
        type,
        order: chId,
        question: question.ua, // fallback
        questionTranslations: question,
        audioSrc: audioSrc || null,
      });

      answers.forEach((ans) => {
        northOptions.push({
          id: idCounter++,
          challengeId: chId,
          text: ans.text,
          correct: ans.correct,
          imageSrc: ans.imageSrc || null,
        });
      });
    };


 
   addChallenge(
  1,
  "SELECT",
  {
    ua: "Що з цього означає «картопля»?",
    en: "Which of these means “potato”?",
    de: "Welche dieser Optionen bedeutet „Kartoffel“?",
  },
  [
    { text: "лєс", correct: false, imageSrc: "/les.png" },
    { text: "бульба", correct: true, imageSrc: "/bulba.png" },
    { text: "калач", correct: false, imageSrc: "/kalach.png" },
  ]
);


addChallenge(
  1,
  "ASSIST",
  {
    ua: "Що з цього означає «розмовляти»?",
    en: "Which of these means “to talk”?",
    de: "Welche dieser Optionen bedeutet „sprechen“?",
  },
  [
    { text: "гуторити", correct: true },
    { text: "клюмба", correct: false },
    { text: "дєдьо", correct: false },
  ]
);

addChallenge(
  1,
  "LISTEN",
  {
    ua: "Послухайте й оберіть. Що означає слово?",
    en: "Listen and choose. What does the word mean?",
    de: "Hören Sie zu und wählen Sie. Was bedeutet das Wort?",
  },
  [
    { text: "яблуко", correct: false },
    { text: "картопля", correct: true },
    { text: "капуста", correct: false },
  ],
  "/audio/7/Бульба.mp3"
);

addChallenge(
  1,
  "LISTEN",
  {
    ua: "Послухайте й оберіть. Що означає слово?",
    en: "Listen and choose. What does the word mean?",
    de: "Hören Sie zu und wählen Sie. Was bedeutet das Wort?",
  },
  [
    { text: "ліс", correct: true },
    { text: "поле", correct: false },
    { text: "будинок", correct: false },
  ],
  "/audio/7/Лєс.mp3"
);
addChallenge(
  1,
  "WRITE",
  {
    ua: "Ми з дєдом довго … біля печі",
    en: "Grandpa and I talked for a long time by the stove",
    de: "Opa und ich haben lange am Ofen gesprochen",
  },
  [{ text: "гуторили", correct: true }]
);
// ===== LESSON 2 =====

addChallenge(
  2,
  "SELECT",
  {
    ua: "Що з цього означає «чемодан»?",
    en: "Which of these means “suitcase”?",
    de: "Welche dieser Optionen bedeutet „Koffer“?",
  },
  [
    { text: "калачі", correct: false, imageSrc: "/kalachi.png" },
    { text: "клюмба", correct: false, imageSrc: "/klumba.png" },
    { text: "куфер", correct: true, imageSrc: "/kufer.png" },
  ]
);

addChallenge(
  2,
  "ASSIST",
  {
    ua: "Що з цього означає «квітник»?",
    en: "Which of these means “flower bed”?",
    de: "Welche dieser Optionen bedeutet „Blumenbeet“?",
  },
  [
    { text: "порєдок", correct: false },
    { text: "клюмба", correct: true },
    { text: "погрєб", correct: false },
  ]
);

addChallenge(
  2,
  "LISTEN",
  {
    ua: "Послухайте й оберіть. Що означає слово?",
    en: "Listen and choose. What does the word mean?",
    de: "Hören Sie zu und wählen Sie. Was bedeutet das Wort?",
  },
  [
    { text: "ящик", correct: false },
    { text: "шафа", correct: false },
    { text: "чемодан", correct: true },
  ],
  "/audio/7/Куфер.mp3"
);

addChallenge(
  2,
  "LISTEN",
  {
    ua: "Послухайте й оберіть. Що означає слово?",
    en: "Listen and choose. What does the word mean?",
    de: "Hören Sie zu und wählen Sie. Was bedeutet das Wort?",
  },
  [
    { text: "квітник", correct: true },
    { text: "сарай", correct: false },
    { text: "хата", correct: false },
  ],
  "/audio/7/Клюмба.mp3"
);

addChallenge(
  2,
  "WRITE",
  {
    ua: "Він поклав речі в ….",
    en: "He put his things into the …",
    de: "Er legte seine Sachen in den …",
  },
  [{ text: "куфер", correct: true }]
);

// ===== LESSON 3 =====

addChallenge(
  3,
  "SELECT",
  {
    ua: "Що з цього означає «льох»?",
    en: "Which of these means “cellar”?",
    de: "Welche dieser Optionen bedeutet „Keller“?",
  },
  [
    { text: "шопка", correct: false, imageSrc: "/shopka.png" },
    { text: "погрєб", correct: true, imageSrc: "/погрєб.png" },
    { text: "хвіртка", correct: false, imageSrc: "/hvirtka.png" },
  ]
);

addChallenge(
  3,
  "ASSIST",
  {
    ua: "Що з цього означає «дверна ручка»?",
    en: "Which of these means “door handle”?",
    de: "Welche dieser Optionen bedeutet „Türgriff“?",
  },
  [
    { text: "клямка", correct: true },
    { text: "порєдок", correct: false },
    { text: "калачі", correct: false },
  ]
);

addChallenge(
  3,
  "LISTEN",
  {
    ua: "Послухайте й оберіть. Що означає слово?",
    en: "Listen and choose. What does the word mean?",
    de: "Hören Sie zu und wählen Sie. Was bedeutet das Wort?",
  },
  [
    { text: "сходи", correct: false },
    { text: "дверна ручка", correct: true },
    { text: "лопата", correct: false },
  ],
  "/audio/7/Клямка.mp3"
);

addChallenge(
  3,
  "LISTEN",
  {
    ua: "Послухайте й оберіть. Що означає слово?",
    en: "Listen and choose. What does the word mean?",
    de: "Hören Sie zu und wählen Sie. Was bedeutet das Wort?",
  },
  [
    { text: "кухня", correct: false },
    { text: "сарай", correct: true },
    { text: "кімната", correct: false },
  ],
  "/audio/7/Шопка.mp3"
);

addChallenge(
  3,
  "WRITE",
  {
    ua: "Мама поставила банки в ….",
    en: "Mom put the jars into the …",
    de: "Mama stellte die Gläser in den …",
  },
  [{ text: "погрєб", correct: true }]
);

// ===== LESSON 4 =====

addChallenge(
  4,
  "SELECT",
  {
    ua: "Що з цього означає «ворота»?",
    en: "Which of these means “gate”?",
    de: "Welche dieser Optionen bedeutet „Tor“?",
  },
  [
    { text: "хвіртка", correct: true, imageSrc: "/hvirtka.png" },
    { text: "хата", correct: false, imageSrc: "/hata.png" },
    { text: "погрєб", correct: false, imageSrc: "/погрєб.png" },
  ]
);

addChallenge(
  4,
  "ASSIST",
  {
    ua: "Що з цього означає «селище»?",
    en: "Which of these means “settlement”?",
    de: "Welche dieser Optionen bedeutet „Siedlung“?",
  },
  [
    { text: "посьолок", correct: true },
    { text: "поляна", correct: false },
    { text: "двір", correct: false },
  ]
);

addChallenge(
  4,
  "LISTEN",
  {
    ua: "Послухайте й оберіть. Що означає слово?",
    en: "Listen and choose. What does the word mean?",
    de: "Hören Sie zu und wählen Sie. Was bedeutet das Wort?",
  },
  [
    { text: "район", correct: false },
    { text: "поле", correct: false },
    { text: "селище", correct: true },
  ],
  "/audio/7/Посьолок.mp3"
);

addChallenge(
  4,
  "LISTEN",
  {
    ua: "Послухайте й оберіть. Що означає слово?",
    en: "Listen and choose. What does the word mean?",
    de: "Hören Sie zu und wählen Sie. Was bedeutet das Wort?",
  },
  [
    { text: "син", correct: false },
    { text: "хлопець", correct: false },
    { text: "дядько", correct: true },
  ],
  "/audio/7/Дєдьо.mp3"
);

addChallenge(
  4,
  "WRITE",
  {
    ua: "Зайди через ….",
    en: "Enter through the …",
    de: "Geh durch das …",
  },
  [{ text: "хвіртку", correct: true }]
);

// ===== LESSON 5 =====

addChallenge(
  5,
  "SELECT",
  {
    ua: "Що з цього означає «місце біля печі»?",
    en: "Which of these means “a place near the stove”?",
    de: "Welche dieser Optionen bedeutet „Platz am Ofen“?",
  },
  [
    { text: "припічок", correct: true, imageSrc: "/kamin.png" },
    { text: "куфер", correct: false, imageSrc: "/kufer.png" },
    { text: "хата", correct: false, imageSrc: "/hata.png" },
  ]
);

addChallenge(
  5,
  "ASSIST",
  {
    ua: "Що з цього означає «пам’ятник»?",
    en: "Which of these means “monument”?",
    de: "Welche dieser Optionen bedeutet „Denkmal“?",
  },
  [
    { text: "припічок", correct: false },
    { text: "порєдок", correct: false },
    { text: "прип’ятник", correct: true },
  ]
);

addChallenge(
  5,
  "LISTEN",
  {
    ua: "Послухайте й оберіть. Що означає слово?",
    en: "Listen and choose. What does the word mean?",
    de: "Hören Sie zu und wählen Sie. Was bedeutet das Wort?",
  },
  [
    { text: "камінь-пам’ятник", correct: true },
    { text: "глечик", correct: false },
    { text: "дерево", correct: false },
  ],
  "/audio/7/Припятник.mp3"
);

addChallenge(
  5,
  "LISTEN",
  {
    ua: "Послухайте й оберіть. Що означає слово?",
    en: "Listen and choose. What does the word mean?",
    de: "Hören Sie zu und wählen Sie. Was bedeutet das Wort?",
  },
  [
    { text: "шум", correct: false },
    { text: "порядок", correct: true },
    { text: "безлад", correct: false },
  ],
  "/audio/7/Порєдок.mp3"
);

addChallenge(
  5,
  "WRITE",
  {
    ua: "Діти сиділи на теплому ….",
    en: "The children were sitting on the warm …",
    de: "Die Kinder saßen auf dem warmen …",
  },
  [{ text: "припічку", correct: true }]
);

      await db.insert(schema.units).values([
    {
      id: 2,
      regionId: 8,
      title: "Додаток",
      description: "Перед тим, як практикуватися, радимо прочитати навчальні матеріали",
      order: 1,
      
    },
  ]);

await db.insert(schema.lessons).values([
  { id: 6, unitId: 2, order: 1, title: "Слова про людей" },
  { id: 7, unitId: 2, order: 2, title: "Природа і село" },
  { id: 8, unitId: 2, order: 3, title: "Хата і побут" },
  { id: 9, unitId: 2, order: 4, title: "Їжа і напої" },
  { id: 10, unitId: 2, order: 5, title: "Дії" },
]);
// ---------- SOUTH-WEST DIALECT ----------
const swChallenges: typeof schema.challenges.$inferInsert[] = [];
const swOptions: typeof schema.challengesOptions.$inferInsert[] = [];
let swIdCounter = 200;

const addSWChallenge = (
  lessonId: number,
  type: "SELECT" | "ASSIST" | "LISTEN" | "WRITE",
  question: { ua: string; en: string; de: string },
  answers: { text: string; correct: boolean; audioSrc?: string; imageSrc?: string }[],
  audioSrc?: string
) => {
  const chId = swIdCounter++;

  swChallenges.push({
    id: chId,
    lessonId,
    type,
    order: chId,
    question: question.ua,
    questionTranslations: question,
    audioSrc: audioSrc || null,
  });

  answers.forEach((ans) => {
    swOptions.push({
      id: swIdCounter++,
      challengeId: chId,
      text: ans.text,
      correct: ans.correct,
      audioSrc: ans.audioSrc || null,
      imageSrc: ans.imageSrc || null,
    });
  });
};

 // ---------- LESSON 6 ----------
addSWChallenge(
  6,
  "SELECT",
  { ua: "Що з цього означає «хазяїн»?", en: "Which of these means “host / owner”?", de: "Welche Option bedeutet „Hausherr“?" },
  [
    { text: "ґазда", correct: true, imageSrc: "/gazda.png" },
    { text: "леґінь", correct: false, imageSrc: "/legin.png" },
    { text: "пляц", correct: false, imageSrc: "/plats.png" },
  ]
);

addSWChallenge(
  6,
  "ASSIST",
  { ua: "Що з цього означає «гарний»?", en: "Which of these means “beautiful”?", de: "Welche Option bedeutet „schön“?" },
  [
    { text: "файний", correct: true },
    { text: "бляшняр", correct: false },
    { text: "кептар", correct: false },
  ]
);

addSWChallenge(
  6,
  "LISTEN",
  { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören Sie zu und wählen Sie. Was bedeutet das Wort?" },
  [
    { text: "господар", correct: true },
    { text: "робітник", correct: false },
    { text: "сусід", correct: false },
  ],
  "/audio/8/газда.mp3"
);

addSWChallenge(
  6,
  "LISTEN",
  { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören Sie zu und wählen Sie. Was bedeutet das Wort?" },
  [
    { text: "старий", correct: false },
    { text: "гарний", correct: true },
    { text: "веселий", correct: false },
  ],
  "/audio/8/файний.mp3"
);

addSWChallenge(
  6,
  "WRITE",
  { ua: "Той … має велику хату.", en: "That … has a big house.", de: "Dieser … hat ein großes Haus." },
  [{ text: "ґазда", correct: true }]
);

// ---------- LESSON 7 ----------
addSWChallenge(
  7,
  "SELECT",
  { ua: "Що з цього означає «підлога»?", en: "Which of these means “floor”?", de: "Welche Option bedeutet „Boden“?" },
  [
    { text: "плєцак", correct: false, imageSrc: "/pletsek.png" },
    { text: "леванда", correct: true, imageSrc: "/levanda.png" },
    { text: "пляц", correct: false, imageSrc: "/plats.png" },
  ]
);

addSWChallenge(
  7,
  "ASSIST",
  { ua: "Що з цього означає «рюкзак»?", en: "Which of these means “backpack”?", de: "Welche Option bedeutet „Rucksack“?" },
  [
    { text: "ліжник", correct: false },
    { text: "кептар", correct: false },
    { text: "плєцак", correct: true },
  ]
);

addSWChallenge(
  7,
  "LISTEN",
  { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören Sie zu und wählen Sie. Was bedeutet das Wort?" },
  [
    { text: "шапка", correct: false },
    { text: "светр", correct: false },
    { text: "короткий кожух", correct: true },
  ],
  "/audio/8/Кужіль.mp3"
);

addSWChallenge(
  7,
  "LISTEN",
  { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören Sie zu und wählen Sie. Was bedeutet das Wort?" },
  [
    { text: "шум", correct: false },
    { text: "порядок", correct: true },
    { text: "безлад", correct: false },
  ],
  "/audio/8/Порєдок.mp3"
);

addSWChallenge(
  7,
  "WRITE",
  { ua: "Постав відро на ….", en: "Put the bucket on ….", de: "Stellen Sie den Eimer auf …." },
  [{ text: "леванду", correct: true }]
);

// ---------- LESSON 8 ----------
addSWChallenge(
  8,
  "SELECT",
  { ua: "Що з цього означає «рушниця»?", en: "Which of these means “gun”?", de: "Welche Option bedeutet „Gewehr“?" },
  [
    { text: "гвер", correct: true, imageSrc: "/rushnyca.png" },
    { text: "пляц", correct: false, imageSrc: "/plats.png" },
    { text: "кептар", correct: false, imageSrc: "/keptar.png" },
  ]
);

addSWChallenge(
  8,
  "ASSIST",
  { ua: "Що з цього означає «ділянка землі»?", en: "Which of these means “land plot”?", de: "Welche Option bedeutet „Grundstück“?" },
  [
    { text: "файний", correct: false },
    { text: "пляц", correct: true },
    { text: "бляшняр", correct: false },
  ]
);

addSWChallenge(
  8,
  "LISTEN",
  { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören Sie zu und wählen Sie. Was bedeutet das Wort?" },
  [
    { text: "меч", correct: false },
    { text: "коса", correct: false },
    { text: "рушниця", correct: true },
  ],
  "/audio/8/Гвер.mp3"
);

addSWChallenge(
  8,
  "LISTEN",
  { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören Sie zu und wählen Sie. Was bedeutet das Wort?" },
  [
    { text: "майстер, що працює з бляхою", correct: true },
    { text: "кухар", correct: false },
    { text: "тесля", correct: false },
  ],
  "/audio/8/Бляшнар.mp3"
);

addSWChallenge(
  8,
  "WRITE",
  { ua: "На … ростуть яблуні.", en: "Apple trees grow on ….", de: "Auf … wachsen Apfelbäume." },
  [{ text: "пляці", correct: true }]
);

// ---------- LESSON 9 ----------
addSWChallenge(
  9,
  "SELECT",
  { ua: "Що з цього означає «солодка страва»?", en: "Which of these means “sweet dish”?", de: "Welche Option bedeutet „süße Speise“?" },
  [
    { text: "ліжник", correct: false, imageSrc: "/lizhnyk.png" },
    { text: "ґринджоли", correct: false, imageSrc: "/images/borshch.png" },
    { text: "ліґуміна", correct: true, imageSrc: "/images/syr.png" },
  ]
);

addSWChallenge(
  9,
  "ASSIST",
  { ua: "Що з цього означає «санчата»?", en: "Which of these means “sled”?", de: "Welche Option bedeutet „Schlitten“?" },
  [
    { text: "ґринджоли", correct: true },
    { text: "кептар", correct: false },
    { text: "ґазда", correct: false },
  ]
);

addSWChallenge(
  9,
  "LISTEN",
  { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören Sie zu und wählen Sie. Was bedeutet das Wort?" },
  [
    { text: "Cтрава з м’яса", correct: false },
    { text: "десерт", correct: true },
    { text: "суп", correct: false },
  ],
  "/audio/8/ліґуміна.mp3"
);

addSWChallenge(
  9,
  "LISTEN",
  { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören Sie zu und wählen Sie. Was bedeutet das Wort?" },
  [
    { text: "майстер, що працює з бляхою", correct: false },
    { text: "увага", correct: true },
    { text: "тесля", correct: false },
  ],
  "/audio/8/Позір.mp3"
);

addSWChallenge(
  9,
  "WRITE",
  { ua: "Діти каталися на ….", en: "Children were riding on ….", de: "Kinder fuhren auf …." },
  [{ text: "ґринджолах", correct: true }]
);

// ---------- LESSON 10 ----------
addSWChallenge(
  10,
  "SELECT",
  { ua: "Що з цього означає «прядиво, волокно»?", en: "Which of these means “fiber / yarn”?", de: "Welche Option bedeutet „Faser / Garn“?" },
  [
    { text: "гвер", correct: false, imageSrc: "/ryshnyca.png" },
    { text: "кептар", correct: false, imageSrc: "/keptar.png" },
    { text: "кужіль", correct: true, imageSrc: "/kuzhil.png" },
  ]
);

addSWChallenge(
  10,
  "SELECT",
  { ua: "Що з цього означає «увага»?", en: "Which of these means “attention”?", de: "Welche Option bedeutet „Aufmerksamkeit“?" },
  [
    { text: "файний", correct: false },
    { text: "позір", correct: true },
    { text: "пляц", correct: false },
  ]
);

addSWChallenge(
  10,
  "LISTEN",
  { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören Sie zu und wählen Sie. Was bedeutet das Wort?" },
  [
    { text: "стежка", correct: false },
    { text: "покривало", correct: false },
    { text: "прядиво", correct: true },
  ],
  "/audio/8/Кужіль.mp3"
);

addSWChallenge(
  10,
  "LISTEN",
  { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören Sie zu und wählen Sie. Was bedeutet das Wort?" },
  [
    { text: "ворота", correct: false },
    { text: "хвіртка", correct: true },
    { text: "двері", correct: false },
  ],
  "/audio/8/фіртка.mp3"
);

addSWChallenge(
  10,
  "WRITE",
  { ua: "Зверни …. під час розмови!", en: "Pay … during conversation!", de: "Achte … während des Gesprächs!" },
  [{ text: "позір", correct: true }]
);

await db.insert(schema.units).values([
  {
    id: 3,
    regionId: 9,
    title: "Додаток",
    description: "Перед тим, як практикуватися, радимо прочитати навчальні матеріали",
    order: 1,
  },
]);

// await db.insert(schema.lessons).values([
//   { id: 11, unitId: 3, order: 1, title: "Основні речення (частина 1)" },
//   { id: 12, unitId: 3, order: 2, title: "Основні речення (частина 2)" },
//    { id: 13, unitId: 3, order: 3, title: "Сімʼя та дім" },
//   { id: 14, unitId: 3, order: 4, title: "Їжа та речі" },
//   { id: 15, unitId: 3, order: 5, title: "Дії та рух" },
// ]);

await db.insert(schema.lessons).values([
  { id: 11, unitId: 3, order: 1, title: "Основні речення (частина 1)" },
  { id: 12, unitId: 3, order: 2, title: "Основні речення (частина 2)" },
   { id: 13, unitId: 3, order: 3, title: "Сімʼя та дім" },
  { id: 14, unitId: 3, order: 4, title: "Їжа та речі" },
  { id: 15, unitId: 3, order: 5, title: "Дії та рух" },
]);

const easternChallenges: typeof schema.challenges.$inferInsert[] = [];
const easternOptions: typeof schema.challengesOptions.$inferInsert[] = [];
let easternId = 300;

const addEastern = (
  lessonId: number,
  type: "SELECT" | "ASSIST" | "LISTEN" | "WRITE",
  question: { ua: string; en?: string; de?: string },
  answers: { text: string; correct: boolean; audioSrc?: string; imageSrc?: string }[],
  audioSrc?: string
) => {
  const chId = easternId++;
  easternChallenges.push({
    id: chId,
    lessonId,
    type,
    order: chId,
    question: question.ua, // fallback to Ukrainian
    questionTranslations: question,
    audioSrc: audioSrc || null
  });

  answers.forEach((a) => {
    easternOptions.push({
      id: easternId++,
      challengeId: chId,
      text: a.text,
      correct: a.correct,
      audioSrc: a.audioSrc || null,
      imageSrc: a.imageSrc || null
    });
  });
};


// ---------- LESSON 11 ----------
addEastern(
  11,
  "SELECT",
  { ua: "Що з цього означає «кукурудза»?", en: "Which of these means “corn”?", de: "Welche Option bedeutet „Mais“?" },
  [
    { text: "толока", correct: false, imageSrc: "/toloka.png" },
    { text: "поребрик", correct: false, imageSrc: "/perebryk.png" },
    { text: "пшонка", correct: true, imageSrc: "/pshonka.png" },
  ]
);

addEastern(
  11,
  "ASSIST",
  { ua: "Що з цього означає «віз для сіна»?", en: "Which of these means “hay cart”?", de: "Welche Option bedeutet „Heuwagen“?" },
  [
    { text: "поребрик", correct: false },
    { text: "мажара", correct: true },
    { text: "кібитка", correct: false },
  ]
);

addEastern(
  11,
  "LISTEN",
  { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören Sie zu und wählen Sie. Was bedeutet das Wort?" },
  [
    { text: "овес", correct: false },
    { text: "пшениця", correct: false },
    { text: "кукурудза", correct: true },
  ],
  "/audio/9/Пшонка.mp3"
);

addEastern(
  11,
  "LISTEN",
  { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören Sie zu und wählen Sie. Was bedeutet das Wort?" },
  [
    { text: "колиска", correct: false },
    { text: "райдуга", correct: false },
    { text: "двері", correct: true },
  ],
  "/audio/9/Билиця.mp3"
);

addEastern(
  11,
  "WRITE",
  { ua: "Селяни везли сіно на ….", en: "Villagers carried hay on ….", de: "Die Dorfbewohner transportierten Heu auf …." },
  [{ text: "мажарі", correct: true }]
);

// ---------- LESSON 12 ----------
addEastern(
  12,
  "SELECT",
  { ua: "Що з цього означає «бордюр»?", en: "Which of these means “curb”?", de: "Welche Option bedeutet „Bordstein“?" },
  [
    { text: "поребрик", correct: true, imageSrc: "/perebryk.png" },
    { text: "кібитка", correct: false, imageSrc: "/кібитка.png" },
    { text: "ненька", correct: false, imageSrc: "/nenika.png" },
  ]
);

addEastern(
  12,
  "ASSIST",
  { ua: "Що з цього означає «колиска»?", en: "Which of these means “cradle”?", de: "Welche Option bedeutet „Wiege“?" },
  [
    { text: "шаньга", correct: false },
    { text: "ненька", correct: true },
    { text: "билиця", correct: false },
  ]
);

addEastern(
  12,
  "LISTEN",
  { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören Sie zu und wählen Sie. Was bedeutet das Wort?" },
  [
    { text: "міст", correct: false },
    { text: "бордюр", correct: true },
    { text: "тин", correct: false },
  ],
  "/audio/9/Поребрик.mp3"
);

addEastern(
  12,
  "LISTEN",
  { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören Sie zu und wählen Sie. Was bedeutet das Wort?" },
  [
    { text: "подушка", correct: false },
    { text: "пелюшка", correct: false },
    { text: "колиска", correct: true },
  ],
  "/audio/9/Ненька.mp3"
);

addEastern(
  12,
  "WRITE",
  { ua: "Мама поклала дитину в ….", en: "Mom placed the baby in ….", de: "Die Mutter legte das Kind in …." },
  [{ text: "неньку", correct: true }]
);

// ---------- LESSON 13 ----------
addEastern(
  13,
  "SELECT",
  { ua: "Що з цього означає «блискавка»?", en: "Which of these means “lightning”?", de: "Welche Option bedeutet „Blitz“?" },
  [
    { text: "змійка", correct: true, imageSrc: "/zmiyka.png" },
    { text: "веселуха", correct: false, imageSrc: "/veseluha.png" },
    { text: "билиця", correct: false, imageSrc: "/bilka.png" },
  ]
);

addEastern(
  13,
  "ASSIST",
  { ua: "Що з цього означає «райдуга»?", en: "Which of these means “rainbow”?", de: "Welche Option bedeutet „Regenbogen“?" },
  [
    { text: "поребрик", correct: false },
    { text: "ненька", correct: false },
    { text: "веселуха", correct: true },
  ]
);

addEastern(
  13,
  "LISTEN",
  { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören Sie zu und wählen Sie. Was bedeutet das Wort?" },
  [
    { text: "блискавка", correct: true },
    { text: "змія", correct: false },
    { text: "хвиля", correct: false },
  ],
  "/audio/9/Змійка.mp3"
);

addEastern(
  13,
  "LISTEN",
  { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören Sie zu und wählen Sie. Was bedeutet das Wort?" },
  [
    { text: "казка", correct: false },
    { text: "білка", correct: true },
    { text: "пташка", correct: false },
  ],
  "/audio/9/Билиця.mp3"
);

addEastern(
  13,
  "WRITE",
  { ua: "Після дощу з’явилася ….", en: "After the rain appeared ….", de: "Nach dem Regen erschien …." },
  [{ text: "веселуха", correct: true }]
);

// ---------- LESSON 14 ----------
addEastern(
  14,
  "SELECT",
  { ua: "Що з цього означає «будь-яке збіжжя»?", en: "Which of these means “any grain”?", de: "Welche Option bedeutet „jedes Getreide“?" },
  [
    { text: "пшінка", correct: false, imageSrc: "/pshonka.png" },
    { text: "жито", correct: true },
    { text: "байрак", correct: false },
  ]
);

addEastern(
  14,
  "ASSIST",
  { ua: "Що з цього означає «яр, балка»?", en: "Which of these means “ravine”?", de: "Welche Option bedeutet „Talmulde“?" },
  [
    { text: "байрак", correct: true },
    { text: "кібитка", correct: false },
    { text: "поребрик", correct: false },
  ]
);

addEastern(
  14,
  "WRITE",
  { ua: "Внизу під селом був глибокий ….", en: "At the bottom of the village was a deep ….", de: "Am unteren Ende des Dorfes war ein tiefer …." },
  [{ text: "байрак", correct: true }]
);

// ---------- LESSON 15 ----------
addEastern(
  15,
  "SELECT",
  { ua: "Що з цього означає «світло, райдуга»?", en: "Which of these means “light, rainbow”?", de: "Welche Option bedeutet „Licht, Regenbogen“?" },
  [
    { text: "билиця", correct: false, imageSrc: "/bilka.png" },
    { text: "веселуха", correct: true, imageSrc: "/veseluha.png" },
    { text: "поребрик", correct: false, imageSrc: "/perebryk.png" },
  ]
);

addEastern(
  15,
  "ASSIST",
  { ua: "Що з цього означає «баклажани»?", en: "Which of these means “eggplants”?", de: "Welche Option bedeutet „Auberginen“?" },
  [
    { text: "пшонка", correct: false },
    { text: "синеньки", correct: true },
    { text: "шаньга", correct: false },
  ]
);

addEastern(
  15,
  "LISTEN",
  { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören Sie zu und wählen Sie. Was bedeutet das Wort?" },
  [
    { text: "житловий будинок", correct: true },
    { text: "круглий пиріг", correct: false },
    { text: "баклажани", correct: false },
  ],
  "/audio/9/Хата.mp3"
);

addEastern(
  15,
  "LISTEN",
  { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören Sie zu und wählen Sie. Was bedeutet das Wort?" },
  [
    { text: "казка", correct: false },
    { text: "білка", correct: false },
    { text: "баклажани", correct: true },
  ],
  "/audio/9/Синеньки.mp3"
);

addEastern(
  15,
  "WRITE",
  { ua: "На городі дозріли ….", en: "… ripened in the garden.", de: "… reiften im Garten." },
  [{ text: "синеньки", correct: true }]
);

await db.insert(schema.units).values([
  {
    id: 4,
    regionId: 10,
    title: "Додаток",
    description: "Перед тим, як практикуватися, радимо прочитати навчальні матеріали",
    order: 1,
  },
]);

await db.insert(schema.lessons).values([
  { id: 16, unitId: 4, order: 1, title: "Основні речення (частина 1)" },
  { id: 17, unitId: 4, order: 2, title: "Основні речення (частина 2)" },
   { id: 18, unitId: 4, order: 3, title: "Сімʼя та дім" },
  { id: 19, unitId: 4, order: 4, title: "Їжа та речі" },
  { id: 20, unitId: 4, order: 5, title: "Дії та рух" },
]);

const plattChallenges: typeof schema.challenges.$inferInsert[] = [];
const plattOptions: typeof schema.challengesOptions.$inferInsert[] = [];
let plattId = 400;

const addPlatt = (
  lessonId: number,
  type: "SELECT" | "ASSIST" | "LISTEN" | "WRITE",
  question: { ua: string; en?: string; de?: string },
  answers: { text: string; correct: boolean; audioSrc?: string; imageSrc?: string }[],
  audioSrc?: string
) => {
  const chId = plattId++;
  plattChallenges.push({
    id: chId,
    lessonId,
    type,
    order: chId,
    question: question.ua, // fallback to Ukrainian
    questionTranslations: question,
    audioSrc: audioSrc || null
  });

  answers.forEach((a) => {
    plattOptions.push({
      id: plattId++,
      challengeId: chId,
      text: a.text,
      correct: a.correct,
      audioSrc: a.audioSrc || null,
      imageSrc: a.imageSrc || null
    });
  });
};
addPlatt(16, "SELECT", { ua: "Що означає слово 'ik'?", en: "What does 'ik' mean?", de: "Was bedeutet 'ik'?" }, [
  { text: "ти", correct: false, imageSrc: "/ти.png" },
  { text: "я", correct: true, imageSrc: "/я_дівчина.png" },
  { text: "він", correct: false, imageSrc: "/він_хлопець.png" },
]);

addPlatt(16, "ASSIST", { ua: "Як перекладається 'maken' стандартною німецькою?", en: "How is 'maken' translated into standard German?", de: "Wie wird 'maken' auf Hochdeutsch übersetzt?" }, [
  { text: "singen", correct: false },
  { text: "tun", correct: false },
  { text: "machen", correct: true },
]);

addPlatt(16, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "він", correct: false },
  { text: "ти", correct: false },
  { text: "я", correct: true },
], "/audio/10/ik.mp3");

addPlatt(16, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "йти", correct: false },
  { text: "робити", correct: true },
  { text: "співати", correct: false },
], "/audio/10/maken.mp3");

addPlatt(16, "WRITE", { ua: "Ik heww dat nich …", en: "I did not understand …", de: "Ich habe das nicht verstanden …" }, [
  { text: "verstahn", correct: true },
]);

// ================= УРОК 17 =================
addPlatt(17, "SELECT", { ua: "Що означає слово 'Bröödt'?", en: "What does 'Bröödt' mean?", de: "Was bedeutet 'Bröödt'?" }, [
  { text: "хліб", correct: true, imageSrc: "/хліб.png" },
  { text: "вода", correct: false, imageSrc: "/вода.png" },
  { text: "дім", correct: false, imageSrc: "/дім_Це мій дім_Я вдома.png" },
]);

addPlatt(17, "ASSIST", { ua: "Що означає привітання 'Moin!'", en: "What does the greeting 'Moin!' mean?", de: "Was bedeutet die Begrüßung 'Moin!'?" }, [
  { text: "Прощавай", correct: false },
  { text: "Доброго ранку", correct: true },
  { text: "Як справи", correct: false },
]);

addPlatt(17, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "батько", correct: true },
  { text: "друг", correct: false },
  { text: "учитель", correct: false },
], "/audio/10/Vadder.mp3");

addPlatt(17, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "батьки", correct: false },
  { text: "діти", correct: true },
  { text: "друзі", correct: false },
], "/audio/10/Kinner.mp3");

addPlatt(17, "WRITE", { ua: "Dat is een …", en: "That is a …", de: "Das ist ein …" }, [
  { text: "bröödt", correct: true },
]);

// ================= УРОК 18 =================
addPlatt(18, "SELECT", { ua: "Що означає 'Vadder' у Plattdeutsch?", en: "What does 'Vadder' mean in Plattdeutsch?", de: "Was bedeutet 'Vadder' im Plattdeutsch?" }, [
  { text: "Дідусь", correct: false, imageSrc: "/дідусь.png" },
  { text: "Батько", correct: true, imageSrc: "/батько.png" },
  { text: "Друг", correct: false, imageSrc: "/діти_друг.png" },
]);

addPlatt(18, "ASSIST", { ua: "У якому варіанті слово відповідає стандартному 'Kind'?", en: "Which variant matches the standard German 'Kind'?", de: "Welche Variante entspricht dem Hochdeutschen 'Kind'?" }, [
  { text: "Keind", correct: false },
  { text: "Kinner", correct: true },
  { text: "Ken", correct: false },
]);

addPlatt(18, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "робота", correct: false },
  { text: "дім", correct: true },
  { text: "друг", correct: false },
], "/audio/10/Huus.mp3");

addPlatt(18, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "час", correct: true },
  { text: "діти", correct: false },
  { text: "друзі", correct: false },
], "/audio/10/Tied.mp3");

addPlatt(18, "WRITE", { ua: "Wo is dien …?", en: "Where is your …?", de: "Wo ist dein …?" }, [
  { text: "vadder", correct: true },
]);

// ================= УРОК 19 =================
addPlatt(19, "SELECT", { ua: "Що означає фраза 'Dat is mien Huus'?", en: "What does the phrase 'Dat is mien Huus' mean?", de: "Was bedeutet der Satz 'Dat is mien Huus'?" }, [
  { text: "Це мій дім", correct: true, imageSrc: "/дім_Це мій дім_Я вдома.png" },
  { text: "Там моя школа", correct: false, imageSrc: "/Там моя школа_школа.png" },
  { text: "Де твій дім?", correct: false, imageSrc: "/діти_друг.png" },
]);

addPlatt(19, "ASSIST", { ua: "Що означає фраза 'Ik heww keen Tied'?", en: "What does the phrase 'Ik heww keen Tied' mean?", de: "Was bedeutet der Satz 'Ik heww keen Tied'?" }, [
  { text: "У мене є час", correct: false },
  { text: "У мене немає часу", correct: true },
  { text: "Ти маєш час", correct: false },
]);

addPlatt(19, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "магазин", correct: false },
  { text: "церква", correct: false },
  { text: "школа", correct: true },
], "/audio/10/Schoul.mp3");

addPlatt(19, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "розуміти", correct: true },
  { text: "говорити", correct: false },
  { text: "йти", correct: false },
], "/audio/10/verstahn.mp3");

addPlatt(19, "WRITE", { ua: "Ik heww keen …", en: "I have no …", de: "Ich habe keine …" }, [
  { text: "tied", correct: true },
]);

// ================= УРОК 20 =================
addPlatt(20, "SELECT", { ua: "Що означає речення 'Ik heww dat nich verstahn'?", en: "What does the sentence 'Ik heww dat nich verstahn' mean?", de: "Was bedeutet der Satz 'Ik heww dat nich verstahn'?" }, [
  { text: "Я не зрозумів це", correct: true },
  { text: "Я маю час", correct: false },
  { text: "Це мій дім", correct: false },
]);

addPlatt(20, "ASSIST", { ua: "Як Plattdeutsch вплинув на стандартну німецьку мову?", en: "How did Plattdeutsch influence standard German?", de: "Wie hat Plattdeutsch das Hochdeutsche beeinflusst?" }, [
  { text: "Він є її основою", correct: false },
  { text: "Його фонетика збереглася у північних регіонах", correct: true },
  { text: "Він виник у Швейцарії", correct: false },
]);

addPlatt(20, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "вино", correct: false },
  { text: "молоко", correct: false },
  { text: "хліб", correct: true },
], "/audio/10/Broodt  Brood.mp3");

addPlatt(20, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "доброго ранку", correct: true },
  { text: "спокійної ночі", correct: false },
  { text: "прощавай", correct: false },
], "/audio/10/moin!.mp3");

addPlatt(20, "WRITE", { ua: "Se sünd to de …", en: "They are going to the …", de: "Sie gehen zu der …" }, [
  { text: "schoul", correct: true },
]);

await db.insert(schema.units).values([
  {
    id: 5,
    regionId: 11,
    title: "Додаток",
    description: "Перед тим, як практикуватися, радимо прочитати навчальні матеріали",
    order: 1,
  },
]);

await db.insert(schema.lessons).values([
  { id: 21, unitId: 5, order: 1, title: "Основні речення (частина 1)" },
  { id: 22, unitId: 5, order: 2, title: "Основні речення (частина 2)" },
   { id: 23, unitId: 5, order: 3, title: "Сімʼя та дім" },
  { id: 24, unitId: 5, order: 4, title: "Їжа та речі" },
  { id: 25, unitId: 5, order: 5, title: "Дії та рух" }
]);

const middleChallenges: typeof schema.challenges.$inferInsert[] = [];
const middleOptions: typeof schema.challengesOptions.$inferInsert[] = [];
let middleId = 500;

const addMiddlet = (
  lessonId: number,
  type: "SELECT" | "ASSIST" | "LISTEN" | "WRITE",
  question: { ua: string; en: string; de: string },
  answers: { text: string; correct: boolean; audioSrc?: string; imageSrc?: string }[],
  audioSrc?: string
) => {
  const chId = middleId++;
  middleChallenges.push({
    id: chId,
    lessonId,
    type,
    order: chId,
    question: question.ua,
    questionTranslations: question,
    audioSrc: audioSrc || null
  });

  answers.forEach((a) => {
    middleOptions.push({
      id: middleId++,
      challengeId: chId,
      text: a.text,
      correct: a.correct,
      audioSrc: a.audioSrc || null,
      imageSrc: a.imageSrc || null
    });
  });
};


// ================= УРОК 21 =================
addMiddlet(21, "SELECT", { ua: "Який з наведених діалектів належить до Mitteldeutsch?", en: "Which of the following dialects belongs to Mitteldeutsch?", de: "Welcher der folgenden Dialekte gehört zu Mitteldeutsch?" }, [
  { text: "Швабський", correct: false },
  { text: "Баварський", correct: false },
  { text: "Гессенський", correct: true },
]);

addMiddlet(21, "ASSIST", { ua: "Що типово для Mitteldeutsch на фонетичному рівні?", en: "What is typical for Mitteldeutsch at the phonetic level?", de: "Was ist typisch für Mitteldeutsch auf Lautebene?" }, [
  { text: "Вимова з “pf”", correct: false },
  { text: "Збалансована, проміжна фонетика", correct: true },
  { text: "Чергування t → z", correct: false },
]);

addMiddlet(21, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "я", correct: false },
  { text: "ти", correct: true },
  { text: "він", correct: false },
], "/audio/11/isch.mp3");

addMiddlet(21, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "час", correct: true },
  { text: "школа", correct: false },
  { text: "друг", correct: false },
], "/audio/11/zeit.mp3");

addMiddlet(21, "WRITE", { ua: "Isch hab ken …", en: "I don't have …", de: "Ich habe keine …" }, [
  { text: "zeit", correct: true },
]);

// ================= УРОК 22 =================
addMiddlet(22, "SELECT", { ua: "Що означає 'Mädsche' у гессенському варіанті?", en: "What does 'Mädsche' mean in the Hessian variant?", de: "Was bedeutet 'Mädsche' im hessischen Dialekt?" }, [
  { text: "Хлопець", correct: false, imageSrc: "/він_хлопець.png" },
  { text: "Дівчина", correct: true, imageSrc: "/я_дівчина.png" },
  { text: "Мама", correct: false, imageSrc: "/мати.png" },
]);

addMiddlet(22, "ASSIST", { ua: "Який з цих діалектів може вживати 'wie' замість 'als'?", en: "Which of these dialects can use 'wie' instead of 'als'?", de: "Welcher dieser Dialekte kann 'wie' statt 'als' verwenden?" }, [
  { text: "Гессенський", correct: true },
  { text: "Швабський", correct: false },
  { text: "Баварський", correct: false },
]);

addMiddlet(22, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "дівчина", correct: true },
  { text: "мати", correct: false },
  { text: "вчителька", correct: false },
], "/audio/11/madsche.mp3");

addMiddlet(22, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "як", correct: true },
  { text: "коли", correct: false },
  { text: "бо", correct: false },
], "/audio/11/Wie gehts.mp3");

addMiddlet(22, "WRITE", { ua: "Des is mei …", en: "This is my …", de: "Das ist mein …" }, [
  { text: "mädsche", correct: true },
]);

// ================= УРОК 23 =================
addMiddlet(23, "SELECT", { ua: "Що означає фраза 'Isch hab ken Zeit'?", en: "What does the phrase 'Isch hab ken Zeit' mean?", de: "Was bedeutet der Satz 'Isch hab ken Zeit'?" }, [
  { text: "У мене є час", correct: false, imageSrc: "/У мене є час_час_швидко.png" },
  { text: "У мене немає часу", correct: true, imageSrc: "/У мене немає часу.png" },
  { text: "Ти маєш час?", correct: false, imageSrc: "/Ти маєш час (1).png" },
]);

addMiddlet(23, "ASSIST", { ua: "Яка особливість у слові 'isch' (замість ich)?", en: "What is special about the word 'isch' (instead of ich)?", de: "Was ist besonders am Wort 'isch' (statt ich)?" }, [
  { text: "Південний варіант", correct: false },
  { text: "Типова заміна 'ch' на 'sch'", correct: true },
  { text: "Архаїзм", correct: false },
]);

addMiddlet(23, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "я", correct: true },
  { text: "він", correct: false },
  { text: "ти", correct: false },
], "/audio/11/Isch.mp3");

addMiddlet(23, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "великий", correct: false },
  { text: "жоден / ніякий", correct: true },
  { text: "малий", correct: false },
], "/audio/11/ken.mp3");

addMiddlet(23, "WRITE", { ua: "Isch hab ken …", en: "I don't have …", de: "Ich habe keine …" }, [
  { text: "zeit", correct: true },
]);

// ================= УРОК 24 =================
addMiddlet(24, "SELECT", { ua: "Що означає “Schaffe” у контексті «beim Daimler schaffe»?", en: "What does “Schaffe” mean in the context «beim Daimler schaffe»?", de: "Was bedeutet “Schaffe” im Kontext «beim Daimler schaffe»?" }, [
  { text: "Їсти", correct: false, imageSrc: "/їсти.png" },
  { text: "Працювати", correct: true, imageSrc: "/працювати_бути_sein.png" },
  { text: "Співати", correct: false, imageSrc: "/singen_співати.png" },
]);

addMiddlet(24, "ASSIST", { ua: "Яке слово у Mitteldeutsch є заміною до 'ein bisschen'?", en: "Which word in Mitteldeutsch replaces 'ein bisschen'?", de: "Welches Wort im Mitteldeutsch ersetzt 'ein bisschen'?" }, [
  { text: "a bissle", correct: false },
  { text: "a weng", correct: false },
  { text: "e wänschje", correct: true },
]);

addMiddlet(24, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "їсти", correct: false },
  { text: "працювати", correct: true },
  { text: "спати", correct: false },
], "/audio/11/schaffe.mp3");

addMiddlet(24, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "багато", correct: false },
  { text: "трохи", correct: true },
  { text: "швидко", correct: false },
], "/audio/11/wenisch.mp3");

addMiddlet(24, "WRITE", { ua: "Ich muss viel …", en: "I must … a lot", de: "Ich muss viel …" }, [
  { text: "schaffe", correct: true },
]);

// ================= УРОК 25 =================
addMiddlet(25, "SELECT", { ua: "Що означає “Gude!”?", en: "What does “Gude!” mean?", de: "Was bedeutet “Gude!”?" }, [
  { text: "Прощання", correct: false, imageSrc: "/Прощавай-побачимось.png" },
  { text: "Дякую", correct: false, imageSrc: "/дякую.png" },
  { text: "Привітання", correct: true, imageSrc: "/Привітання_мати_haben.png" },
]);

addMiddlet(25, "ASSIST", { ua: "Яке з цих тверджень вірне щодо Mitteldeutsch?", en: "Which of these statements is true about Mitteldeutsch?", de: "Welche dieser Aussagen ist wahr über Mitteldeutsch?" }, [
  { text: "Має найменше діалектів", correct: false },
  { text: "Лежить між північчю і півднем", correct: true },
  { text: "Використовується лише в Австрії", correct: false },
]);

addMiddlet(25, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "повільно", correct: false },
  { text: "виглядати", correct: true },
  { text: "втомлений", correct: false },
], "/audio/11/aussehn.mp3");

addMiddlet(25, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "втомлений", correct: false },
  { text: "спраглий", correct: false },
  { text: "голодний", correct: true },
], "/audio/11/hungrisch.mp3");

addMiddlet(25, "WRITE", { ua: "…! Wie geht’s?", en: "…! How are you?", de: "…! Wie geht’s?" }, [
  { text: "Gude", correct: true },
]);

await db.insert(schema.units).values([
  {
    id: 6,
    regionId: 12,
    title: "Додаток",
    description: "Перед тим, як практикуватися, радимо прочитати навчальні матеріали",
    order: 1,
  },
]);

await db.insert(schema.lessons).values([
  { id: 26, unitId: 6, order: 1, title: "Основні речення (частина 1)" },
  { id: 27, unitId: 6, order: 2, title: "Основні речення (частина 2)" },
   { id: 28, unitId: 6, order: 3, title: "Сімʼя та дім" },
  { id: 29, unitId: 6, order: 4, title: "Їжа та речі" },
  { id: 30, unitId: 6, order: 5, title: "Дії та рух" }
]);


const oberChallenges: typeof schema.challenges.$inferInsert[] = [];
const oberOptions: typeof schema.challengesOptions.$inferInsert[] = [];
let oberId = 600;

const addOber = (
  lessonId: number,
  type: "SELECT" | "ASSIST" | "LISTEN" | "WRITE",
  question: { ua: string; en: string; de: string },
  answers: { text: string; correct: boolean; audioSrc?: string; imageSrc?: string }[],
  audioSrc?: string
) => {
  const chId = oberId++;
  oberChallenges.push({
    id: chId,
    lessonId,
    type,
    order: chId,
    question: question.ua,
    questionTranslations: question,
    audioSrc: audioSrc || null
  });

  answers.forEach((a) => {
    oberOptions.push({
      id: oberId++,
      challengeId: chId,
      text: a.text,
      correct: a.correct,
      audioSrc: a.audioSrc || null,
      imageSrc: a.imageSrc || null
    });
  });
};

// ================= УРОК 26 =================
addOber(26, "SELECT", { ua: "Що означає “Griaß di!” у баварському діалекті?", en: "What does “Griaß di!” mean in Bavarian dialect?", de: "Was bedeutet “Griaß di!” im bairischen Dialekt?" }, [
  { text: "Дякую", correct: false, imageSrc: "/дякую.png"},
  { text: "Любов", correct: false, imageSrc: "/любов.png" },
  { text: "Привіт", correct: true, imageSrc: "/Як справи_привіт.png" },
]);

addOber(26, "ASSIST", { ua: "Як буде 'картопля' у баварському варіанті?", en: "How do you say 'potato' in Bavarian?", de: "Wie sagt man 'Kartoffel' im Bairischen?" }, [
  { text: "Kartoffel", correct: false },
  { text: "Erdbirn", correct: false },
  { text: "Erdäpfel", correct: true },
]);

addOber(26, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "до побачення", correct: false },
  { text: "привіт", correct: true },
  { text: "дякую", correct: false },
], "/audio/12/Griab di.mp3");

addOber(26, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "огірок", correct: false },
  { text: "яблуко", correct: false },
  { text: "картопля", correct: true },
], "/audio/12/Erdapfel.mp3");

addOber(26, "WRITE", { ua: "… di! Wie geht’s?", en: "… di! How are you?", de: "… di! Wie geht’s?" }, [
  { text: "Griaß", correct: true },
]);

// ================= УРОК 27 =================
addOber(27, "SELECT", { ua: "Що означає 'Gwand' у баварському діалекті?", en: "What does 'Gwand' mean in Bavarian dialect?", de: "Was bedeutet 'Gwand' im bairischen Dialekt?" }, [
  { text: "Їжа", correct: false, imageSrc: "/їжа.png" },
  { text: "Одяг", correct: true, imageSrc: "/одяг.png" },
  { text: "Гроші", correct: false, imageSrc: "/гроші.png" },
]);

addOber(27, "ASSIST", { ua: "Яке з цих дієслів частіше вживається в Perfekt, а не в Präteritum у південних діалектах?", en: "Which verb is more commonly used in Perfekt than Präteritum in southern dialects?", de: "Welches Verb wird im Süden häufiger im Perfekt als im Präteritum verwendet?" }, [
  { text: "haben", correct: false },
  { text: "sagen", correct: true },
  { text: "sein", correct: false },
]);

addOber(27, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "Їжа", correct: false },
  { text: "Гроші", correct: false },
  { text: "Одяг ", correct: true },
], "/audio/12/Gwand.mp3");

addOber(27, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "школа", correct: true },
  { text: "церква", correct: false },
  { text: "дім / будиночок", correct: false },
], "/audio/12/Schui.mp3");

addOber(27, "WRITE", { ua: "Des is mei …", en: "This is my …", de: "Das ist mein …" }, [
  { text: "Gwand", correct: true },
]);

// ================= УРОК 28 =================
addOber(28, "SELECT", { ua: "Фраза “i hob koa Zeit” перекладається як", en: "The phrase “i hob koa Zeit” translates as", de: "Der Satz “i hob koa Zeit” bedeutet" }, [
  { text: "У тебе є час", correct: false },
  { text: "Я не маю часу", correct: true },
  { text: "Я хочу час", correct: false },
]);

addOber(28, "ASSIST", { ua: "Яке з цих слів є швабським варіантом “дівчина”?", en: "Which of these words is the Swabian variant for 'girl'?", de: "Welches dieser Wörter ist die schwäbische Variante für 'Mädchen'?" }, [
  { text: "Mädel", correct: false },
  { text: "Mädele", correct: true },
  { text: "Möd", correct: false },
]);

addOber(28, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "допомагати", correct: false },
  { text: "надворі", correct: false },
  { text: "немає", correct: true },
], "/audio/12/koa.mp3");

addOber(28, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "дівчина", correct: true },
  { text: "мати", correct: false },
  { text: "хлопець", correct: false },
], "/audio/12/Madel  Madele.mp3");

addOber(28, "WRITE", { ua: "I hob koa …", en: "I don't have …", de: "Ich habe keine …" }, [
  { text: "zeit", correct: true },
]);

// ================= УРОК 29 =================
addOber(29, "SELECT", { ua: "Що означає “Bua” в баварському діалекті?", en: "What does “Bua” mean in Bavarian dialect?", de: "Was bedeutet “Bua” im bairischen Dialekt?" }, [
  { text: "Пес", correct: false, imageSrc: "/собака.png" },
  { text: "Хлопець", correct: true, imageSrc: "/він_хлопець.png" },
  { text: "Вино", correct: false, imageSrc: "/вино.png" },
]);

addOber(29, "ASSIST", { ua: "Яка фонетична зміна притаманна Oberdeutsch?", en: "Which phonetic change is characteristic for Oberdeutsch?", de: "Welche Lautänderung ist typisch für Oberdeutsch?" }, [
  { text: "t → z", correct: true },
  { text: "ch → k", correct: false },
  { text: "r → ø", correct: false },
]);

addOber(29, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "дідусь", correct: false },
  { text: "хлопець", correct: true },
  { text: "друг", correct: false },
], "/audio/12/Bua.mp3");

addOber(29, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "зараз", correct: true },
  { text: "скоро", correct: false },
  { text: "немає", correct: false },
], "/audio/12/jetzt.mp3");

addOber(29, "WRITE", { ua: "Da … spielt draußen", en: "The … is playing outside", de: "Da … spielt draußen" }, [
  { text: "bua", correct: true },
]);

// ================= УРОК 30 =================
addOber(30, "SELECT", { ua: "'Da Voda is im Haus' — переклади", en: "'Da Voda is im Haus' — translate", de: "'Da Voda is im Haus' — Übersetzen" }, [
  { text: "Батько пішов", correct: false },
  { text: "Батько в домі", correct: true },
  { text: "Дім новий", correct: false },
]);

addOber(30, "ASSIST", { ua: "Який з варіантів є прикладом вокалізації r у баварській мові?", en: "Which example shows r-vocalization in Bavarian?", de: "Welches Beispiel zeigt die R-Vokalisierung im Bairischen?" }, [
  { text: "Vater → Vatter", correct: false },
  { text: "Vater → Foda", correct: true },
  { text: "Vater → Vadder", correct: false },
]);

addOber(30, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "вчитель", correct: false },
  { text: "дідусь", correct: false },
  { text: "батько", correct: true },
], "/audio/12/Voda.mp3");

addOber(30, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "мати", correct: true },
  { text: "батько", correct: false },
  { text: "хлопець", correct: false },
], "/audio/12/Muada.mp3");

addOber(30, "WRITE", { ua: "Da … is im Haus", en: "The … is in the house", de: "Da … is im Haus" }, [
  { text: "voda", correct: true },
]);


// await db.insert(schema.lessons).values([
//   { id: 31, unitId: 3, order: 1, title: "Основні речення (частина 1)" },
//   { id: 32, unitId: 3, order: 2, title: "Основні речення (частина 2)" },
//    { id: 33, unitId: 3, order: 3, title: "Сімʼя та дім" },
//   { id: 34, unitId: 3, order: 4, title: "Їжа та речі" },
//   { id: 35, unitId: 3, order: 5, title: "Дії та рух" },
// ]);

await db.insert(schema.units).values([
  {
    id: 7,
    regionId: 13,
    title: "Додаток",
    description: "Перед тим, як практикуватися, радимо прочитати навчальні матеріали",
    order: 1,
  },
]);

await db.insert(schema.lessons).values([
  { id: 31, unitId: 7, order: 1, title: "Основні речення (частина 1)" },
  { id: 32, unitId: 7, order: 2, title: "Основні речення (частина 2)" },
   { id: 33, unitId: 7, order: 3, title: "Сімʼя та дім" },
  { id: 34, unitId: 7, order: 4, title: "Їжа та речі" },
  { id: 35, unitId: 7, order: 5, title: "Дії та рух" }
]);
const cockneyChallenges: typeof schema.challenges.$inferInsert[] = [];
const cockneyOptions: typeof schema.challengesOptions.$inferInsert[] = [];
let cockneyId = 700;

const addCockney = (
  lessonId: number,
  type: "SELECT" | "ASSIST" | "LISTEN" | "WRITE",
  question: { ua: string; en: string; de: string },
  answers: { text: string; correct: boolean; audioSrc?: string; imageSrc?: string }[],
  audioSrc?: string 
) => {
  const chId = cockneyId++;
  cockneyChallenges.push({
    id: chId,
    lessonId,
    type,
    order: chId,
    question: question.ua,
    questionTranslations: question,
    audioSrc: audioSrc || null
  });

  answers.forEach((a) => {
    cockneyOptions.push({
      id: cockneyId++,
      challengeId: chId,
      text: a.text,
      correct: a.correct,
      audioSrc: a.audioSrc || null,
      imageSrc: a.imageSrc || null
    });
  });
};

// ================= УРОК 31 =================
addCockney(31, "SELECT", { ua: "Що з цього означає «гроші»?", en: "Which of these means 'money'?", de: "Welche dieser Bedeutungen heißt 'Geld'?" }, [
  { text: "china plate", correct: false},
  { text: "bees and honey", correct: true},
  { text: "apples and pears", correct: false },
]);

addCockney(31, "ASSIST", { ua: "Що з цього означає «голова»?", en: "Which of these means 'head'?", de: "Welche dieser Bedeutungen heißt 'Kopf'?" }, [
  { text: "loaf of bread", correct: true, imageSrc: "/1.1.png" },
  { text: "dog and bone", correct: false, imageSrc: "/1.2.png" },
  { text: "bottle and stopper", correct: false, imageSrc: "/3.2.png" },
]);

addCockney(31, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "друг", correct: false },
  { text: "дружина", correct: false },
  { text: "гроші", correct: true },
], "/audio/13/loaf_of_bread.mp3");

addCockney(31, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "мати", correct: true },
  { text: "батько", correct: false },
  { text: "хлопець", correct: false },
], "/audio/13/bees_and_honey.mp3");

addCockney(31, "WRITE", { ua: "I don’t have any … to buy you this", en: "I don’t have any … to buy you this", de: "Ich habe kein …, um dir das zu kaufen" }, [
  { text: "bees and honey", correct: true },
]);

// ================= УРОК 32 =================
addCockney(32, "SELECT", { ua: "Що з цього означає «друг»?", en: "Which of these means 'friend'?", de: "Welche dieser Bedeutungen heißt 'Freund'?" }, [
  { text: "loaf of bread", correct: false },
  { text: "bees and honey", correct: false },
  { text: "china plate", correct: true },
]);

addCockney(32, "ASSIST", { ua: "Що з цього означає «сходи»?", en: "Which of these means 'stairs'?", de: "Welche dieser Bedeutungen heißt 'Treppen'?" }, [
  { text: "loaf of bread", correct: false, imageSrc: "/1.1.png" },
  { text: "bees and honey", correct: false, imageSrc: "/1.2.png" },
  { text: "china plate", correct: true, imageSrc: "/2.1.png" },
]);

addCockney(32, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "друг", correct: true },
  { text: "сходи", correct: false },
  { text: "украсти", correct: false },
], "/audio/13/china_plate.mp3");

addCockney(32, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "сходи", correct: true },
  { text: "чай", correct: false },
  { text: "гроші", correct: false },
], "/audio/13/apples_and_pears.mp3");

addCockney(32, "WRITE", { ua: "Go up the … and you’ll see the bathroom", en: "Go up the … and you’ll see the bathroom", de: "Gehe die … hinauf und du siehst das Badezimmer" }, [
  { text: "apples and pears", correct: true },
]);

// ================= УРОК 33 =================
addCockney(33, "SELECT", { ua: "Що з цього означає «волосся»?", en: "Which of these means 'hair'?", de: "Welche dieser Bedeutungen heißt 'Haar'?" }, [
  { text: "barnet (fair)", correct: true, imageSrc: "/3.1.png" },
  { text: "trouble and strife", correct: false, imageSrc: "/4.2.png"},
  { text: "china plate", correct: false, imageSrc: "/2.1.png" },
]);

addCockney(33, "ASSIST", { ua: "Що з цього означає «поліцейський»?", en: "Which of these means 'policeman'?", de: "Welche dieser Bedeutungen heißt 'Polizist'?" }, [
  { text: "rosie lee", correct: false },
  { text: "butcher’s hook", correct: false },
  { text: "bottle and stopper", correct: true },
]);

addCockney(33, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "голова", correct: false },
  { text: "подив/погляд", correct: true },
  { text: "украсти", correct: false },
], "/audio/13/barnet.mp3");

addCockney(33, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "поліцейський", correct: true },
  { text: "дружина", correct: false },
  { text: "сходи", correct: false },
], "/audio/13/bottle_and_stopper.mp3");

addCockney(33, "WRITE", { ua: "Watch out, the … is about!", en: "Watch out, the … is about!", de: "Achtung, die … ist unterwegs!" }, [
  { text: "bottle and stopper", correct: true },
]);

// ================= УРОК 34 =================
addCockney(34, "SELECT", { ua: "Що з цього означає «украсти»?", en: "Which of these means 'to steal'?", de: "Welche dieser Bedeutungen heißt 'stehlen'?" }, [
  { text: "loaf of bread", correct: false, imageSrc: "/1.1.png" },
  { text: "half-inch", correct: true, imageSrc: "/4.1.png"  },
  { text: "bees and honey", correct: false, imageSrc: "/1.2.png"  },
]);

addCockney(34, "ASSIST", { ua: "Що з цього означає «дружина»?", en: "Which of these means 'wife'?", de: "Welche dieser Bedeutungen heißt 'Ehefrau'?" }, [
  { text: "rosie lee", correct: false },
  { text: "china plate", correct: false },
  { text: "trouble and strife", correct: true },
]);

addCockney(34, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "голова", correct: false },
  { text: "подив/погляд", correct: false },
  { text: "дружина", correct: true },
], "/audio/13/trouble_and_strife.mp3");

addCockney(34, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "поліцейський", correct: false },
  { text: "дружина", correct: false },
  { text: "украсти", correct: true },
], "/audio/13/half-ich.mp3");

addCockney(34, "WRITE", { ua: "My … is waiting for me at home", en: "My … is waiting for me at home", de: "Meine … wartet zu Hause auf mich" }, [
  { text: "trouble and strife", correct: true },
]);

// ================= УРОК 35 =================
addCockney(35, "SELECT", { ua: "Що з цього означає «подив/погляд»?", en: "Which of these means 'look'?", de: "Welche dieser Bedeutungen heißt 'Blick'?" }, [
  { text: "butcher’s hook", correct: true, imageSrc: "/5.1.png"  },
  { text: "china plate", correct: false, imageSrc: "/2.1.png" },
  { text: "apples and pears", correct: false, imageSrc: "/2.2.png" },
]);

addCockney(35, "ASSIST", { ua: "Що з цього означає «чай»?", en: "Which of these means 'tea'?", de: "Welche dieser Bedeutungen heißt 'Tee'?" }, [
  { text: "bees and honey", correct: false },
  { text: "rosie lee", correct: true },
  { text: "half-inch", correct: false },
]);

addCockney(35, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "голова", correct: false },
  { text: "подив/погляд", correct: true },
  { text: "дружина", correct: false },
], "/audio/13/butchers_hook.mp3");

addCockney(35, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "друг", correct: false },
  { text: "голова", correct: false },
  { text: "чай", correct: true },
], "/audio/13/rossie_lee.mp3");

addCockney(35, "WRITE", { ua: "Fancy a cup of …?", en: "Fancy a cup of …?", de: "Lust auf eine Tasse …?" }, [
  { text: "rosie lee", correct: true },
]);

await db.insert(schema.units).values([
  {
    id: 8,
    regionId: 14,
    title: "Додаток",
    description: "Перед тим, як практикуватися, радимо прочитати навчальні матеріали",
    order: 1,
  },
]);

await db.insert(schema.lessons).values([
  { id: 36, unitId: 8, order: 1, title: "Основні речення (частина 1)" },
  { id: 37, unitId: 8, order: 2, title: "Основні речення (частина 2)" },
   { id: 38, unitId: 8, order: 3, title: "Сімʼя та дім" },
  { id: 39, unitId: 8, order: 4, title: "Їжа та речі" },
  { id: 40, unitId: 8, order: 5, title: "Дії та рух" }
]);
const scouseChallenges: typeof schema.challenges.$inferInsert[] = [];
const scouseOptions: typeof schema.challengesOptions.$inferInsert[] = [];
let scouseId = 800;

const addScouse = (
  lessonId: number,
  type: "SELECT" | "ASSIST" | "LISTEN" | "WRITE",
  question: { ua: string; en: string; de: string },
  answers: { text: string; correct: boolean; audioSrc?: string; imageSrc?: string }[],
  audioSrc?: string 
) => {
  const chId = scouseId++;
  scouseChallenges.push({
    id: chId,
    lessonId,
    type,
    order: chId,
    question: question.ua,
    questionTranslations: question,
    audioSrc: audioSrc || null
  });

  answers.forEach((a) => {
    scouseOptions.push({
      id: scouseId++,
      challengeId: chId,
      text: a.text,
      correct: a.correct,
      audioSrc: a.audioSrc || null,
      imageSrc: a.imageSrc || null
    });
  });
};

// ================= УРОК 36 =================
addScouse(36, "SELECT", { ua: "Що з цього означає «їжа»?", en: "Which of these means 'food'?", de: "Welche dieser Bedeutungen heißt 'Essen'?" }, [
  { text: "scran", correct: true, imageSrc: "/scouse/1.1.png" },
  { text: "kecks", correct: false, imageSrc: "/scouse/1.2.png" },
  { text: "boss", correct: false, imageSrc: "/scouse/1.1.png" },
]);

addScouse(36, "ASSIST", { ua: "Що з цього означає «штани»?", en: "Which of these means 'trousers'?", de: "Welche dieser Bedeutungen heißt 'Hose'?" }, [
  { text: "scran", correct: false },
  { text: "kecks", correct: true },
  { text: "jarg", correct: false },
]);

addScouse(36, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "їжа", correct: true },
  { text: "гарний/чудовий", correct: false },
  { text: "фальшивий/підробка", correct: false },
], "/audio/14/scran.mp3");

addScouse(36, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "штани", correct: true },
  { text: "голова", correct: false },
  { text: "друг/товариш", correct: false },
], "/audio/14/kecks.mp3");

addScouse(36, "WRITE", { ua: "I’m starving, let’s grab some … before we go out", en: "I’m starving, let’s grab some … before we go out", de: "Ich verhungere, lass uns etwas … holen, bevor wir rausgehen" }, [
  { text: "scran", correct: true },
]);

// ================= УРОК 37 =================
addScouse(37, "SELECT", { ua: "Що з цього означає «не місцевий/чужак»?", en: "Which of these means 'outsider'?", de: "Welche dieser Bedeutungen heißt 'Außenseiter'?" }, [
  { text: "wool", correct: true, imageSrc: "/scouse/2.1.png"},
  { text: "jarg", correct: false, imageSrc: "/scouse/2.2.png" },
  { text: "la/lad", correct: false, imageSrc: "/scouse/3.2.png" },
]);

addScouse(37, "ASSIST", { ua: "Що з цього означає «фальшивий/підробка»?", en: "Which of these means 'fake'?", de: "Welche dieser Bedeutungen heißt 'falsch / gefälscht'?" }, [
  { text: "boss", correct: false },
  { text: "jarg", correct: true },
  { text: "div", correct: false },
]);

addScouse(37, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "не місцевий/чужак", correct: true },
  { text: "дитина", correct: false },
  { text: "алкогольний напій", correct: false },
], "/audio/14/wool.mp3");

addScouse(37, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "дурень", correct: false },
  { text: "фальшивий/підробка", correct: true },
  { text: "голова", correct: false },
], "/audio/14/jarg.mp3");

addScouse(37, "WRITE", { ua: "That … just moved here last week, he doesn’t know the city.", en: "That … just moved here last week, he doesn’t know the city.", de: "Dieser … ist letzte Woche hierher gezogen, er kennt die Stadt nicht." }, [
  { text: "wool", correct: true },
]);

// ================= УРОК 38 =================
addScouse(38, "SELECT", { ua: "Що з цього означає «голова»?", en: "Which of these means 'head'?", de: "Welche dieser Bedeutungen heißt 'Kopf'?" }, [
  { text: "lid", correct: true, imageSrc: "/scouse/3.1.png" },
  { text: "bevvy", correct: false, imageSrc: "/scouse/5.1.png" },
  { text: "div", correct: false, imageSrc: "/scouse/4.1.png" },
]);

addScouse(38, "ASSIST", { ua: "Що з цього означає «друг/товариш»?", en: "Which of these means 'friend'?", de: "Welche dieser Bedeutungen heißt 'Freund'?" }, [
  { text: "la/lad", correct: true },
  { text: "liddo/little one", correct: false },
  { text: "boss", correct: false },
]);

addScouse(38, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "друг/товариш", correct: true },
  { text: "дитина", correct: false },
  { text: "штани", correct: false },
], "/audio/14/la.mp3");

addScouse(38, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "їжа", correct: false },
  { text: "гарний/чудовий", correct: false },
  { text: "голова", correct: true },
], "/audio/14/lid.mp3");

addScouse(38, "WRITE", { ua: "Me and my … are going to watch the football", en: "Me and my … are going to watch the football", de: "Ich und mein … werden Fußball schauen" }, [
  { text: "la/lad", correct: true },
  { text: "lad", correct: true },
  { text: "la", correct: true },
]);

// ================= УРОК 39 =================
addScouse(39, "SELECT", { ua: "Що з цього означає «дурень»?", en: "Which of these means 'fool'?", de: "Welche dieser Bedeutungen heißt 'Dummkopf'?" }, [
  { text: "kecks", correct: false, imageSrc: "/scouse/1.2.png" },
  { text: "div", correct: true, imageSrc: "/scouse/4.1.png" },
  { text: "boss", correct: false, imageSrc: "/scouse/5.2.png" },
]);

addScouse(39, "ASSIST", { ua: "Що з цього означає «дитина»?", en: "Which of these means 'child'?", de: "Welche dieser Bedeutungen heißt 'Kind'?" }, [
  { text: "liddo/little one", correct: true },
  { text: "la/lad", correct: false },
  { text: "scran", correct: false },
]);

addScouse(39, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "друг/товариш", correct: false },
  { text: "дурень", correct: true },
  { text: "фальшивий/підробка", correct: false },
], "/audio/14/div.mp3");

addScouse(39, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "не місцевий/чужак", correct: false },
  { text: "дитина", correct: true },
  { text: "друг/товариш", correct: false },
], "/audio/14/liddo.mp3");

addScouse(39, "WRITE", { ua: "Come on, …, time for bed", en: "Come on, …, time for bed", de: "Komm schon, …, Zeit fürs Bett" }, [
  { text: "liddo/little one", correct: true },
  { text: "liddo", correct: true },
  { text: "little one", correct: true },
]);

// ================= УРОК 40 =================
addScouse(40, "SELECT", { ua: "Що з цього означає «алкогольний напій»?", en: "Which of these means 'alcoholic drink'?", de: "Welche dieser Bedeutungen heißt 'alkoholisches Getränk'?" }, [
  { text: "scran", correct: false, imageSrc: "/scouse/1.1.png" },
  { text: "bevvy", correct: true, imageSrc: "/scouse/5.1.png" },
  { text: "wool", correct: false, imageSrc: "/scouse/2.1.png" },
]);

addScouse(40, "ASSIST", { ua: "Що з цього означає «гарний/чудовий»?", en: "Which of these means 'great'?", de: "Welche dieser Bedeutungen heißt 'toll / großartig'?" }, [
  { text: "div", correct: false },
  { text: "boss", correct: true },
  { text: "jarg", correct: false },
]);

addScouse(40, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "не місцевий/чужак", correct: false },
  { text: "дитина", correct: true },
  { text: "друг/товариш", correct: false },
], "/audio/14/liddo.mp3");

addScouse(40, "WRITE", { ua: "That match was …, la!", en: "That match was …, la!", de: "Dieses Spiel war …, la!" }, [
  { text: "boss", correct: true },
]);

await db.insert(schema.units).values([
  {
    id: 9,
    regionId: 15,
    title: "Додаток",
    description: "Перед тим, як практикуватися, радимо прочитати навчальні матеріали",
    order: 1,
  },
]);

await db.insert(schema.lessons).values([
  { id: 41, unitId: 9, order: 1, title: "Основні речення (частина 1)" },
  { id: 42, unitId: 9, order: 2, title: "Основні речення (частина 2)" },
   { id: 43, unitId: 9, order: 3, title: "Сімʼя та дім" },
  { id: 44, unitId: 9, order: 4, title: "Їжа та речі" },
  { id: 45, unitId: 9, order: 5, title: "Дії та рух" }
]);

const geordieChallenges: typeof schema.challenges.$inferInsert[] = [];
const geordieOptions: typeof schema.challengesOptions.$inferInsert[] = [];
let geordieId = 900;

const addGeordie = (
  lessonId: number,
  type: "SELECT" | "ASSIST" | "LISTEN" | "WRITE",
  question: { ua: string; en: string; de: string },
  answers: { text: string; correct: boolean; audioSrc?: string; imageSrc?: string }[],
  audioSrc?: string 
) => {
  const chId = geordieId++;
  geordieChallenges.push({
    id: chId,
    lessonId,
    type,
    order: chId,
    question: question.ua,
    questionTranslations: question,
    audioSrc: audioSrc || null
  });

  answers.forEach((a) => {
    geordieOptions.push({
      id: geordieId++,
      challengeId: chId,
      text: a.text,
      correct: a.correct,
      audioSrc: a.audioSrc || null,
      imageSrc: a.imageSrc || null
    });
  });
};

// ================= УРОК 41 =================
addGeordie(41, "SELECT", { ua: "Що з цього означає «хліб»?", en: "Which of these means 'bread'?", de: "Welche dieser Bedeutungen heißt 'Brot'?" }, [
  { text: "toon", correct: false, imageSrc: "/geordie/3.1.png" },
  { text: "breed", correct: true, imageSrc: "/geordie/1.1.png" },
  { text: "spuggy", correct: false, imageSrc: "/geordie/5.2.png"},
]);

addGeordie(41, "ASSIST", { ua: "Що з цього означає «друг»?", en: "Which of these means 'friend'?", de: "Welche dieser Bedeutungen heißt 'Freund'?" }, [
  { text: "marra", correct: true },
  { text: "gadgie", correct: false },
  { text: "nappa", correct: false },
]);

addGeordie(41, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "горобець", correct: false },
  { text: "хліб", correct: true },
  { text: "бруд", correct: false },
], "/audio/15/breed.mp3");

addGeordie(41, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "чоловік", correct: false },
  { text: "светр", correct: false },
  { text: "друг", correct: true },
], "/audio/15/marra.mp3");

addGeordie(41, "WRITE", { ua: "He’s my … from school", en: "He’s my … from school", de: "Er ist mein … von der Schule" }, [
  { text: "marra", correct: true },
]);

// ================= УРОК 42 =================
addGeordie(42, "SELECT", { ua: "Що з цього означає «голова»?", en: "Which of these means 'head'?", de: "Welche dieser Bedeutungen heißt 'Kopf'?" }, [
  { text: "nappa", correct: true, imageSrc: "/geordie/2.2.png" },
  { text: "toon", correct: false, imageSrc: "/geordie/3.1.png" },
  { text: "clart", correct: false, imageSrc: "/geordie/3.2.png" },
]);

addGeordie(42, "ASSIST", { ua: "Що з цього означає «дитина»?", en: "Which of these means 'child'?", de: "Welche dieser Bedeutungen heißt 'Kind'?" }, [
  { text: "gadgie", correct: false },
  { text: "bairn", correct: true },
  { text: "radgie", correct: false },
]);

addGeordie(42, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "дитина", correct: true },
  { text: "хліб", correct: false },
  { text: "бруд", correct: false },
], "/audio/15/bairn.mp3");

addGeordie(42, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "чоловік", correct: false },
  { text: "голова", correct: true },
  { text: "друг", correct: false },
], "/audio/15/nappa.mp3");

addGeordie(42, "WRITE", { ua: "Use your … and think before you speak!", en: "Use your … and think before you speak!", de: "Benutz deinen … und denk nach, bevor du sprichst!" }, [
  { text: "nappa", correct: true },
]);

// ================= УРОК 43 =================
addGeordie(43, "SELECT", { ua: "Що з цього означає «бруд»?", en: "Which of these means 'mud'?", de: "Welche dieser Bedeutungen heißt 'Schmutz'?" }, [
  { text: "gadgie", correct: false, imageSrc: "/geordie/4.1.png" },
  { text: "clart", correct: true, imageSrc: "/geordie/3.2.png" },
  { text: "radgie", correct: false, imageSrc: "/geordie/5.1.png" },
]);

addGeordie(43, "ASSIST", { ua: "Що з цього означає «місто (особливо Ньюкасл)»?", en: "Which of these means 'city (esp. Newcastle)'?", de: "Welche dieser Bedeutungen heißt 'Stadt (bes. Newcastle)'?" }, [
  { text: "toon", correct: true },
  { text: "clart", correct: false },
  { text: "gansey", correct: false },
]);

addGeordie(43, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "місто", correct: true },
  { text: "хліб", correct: false },
  { text: "сердитий", correct: false },
], "/audio/15/toon.mp3");

addGeordie(43, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "светр", correct: false },
  { text: "бруд", correct: true },
  { text: "дитина", correct: false },
], "/audio/15/clart.mp3");

addGeordie(43, "WRITE", { ua: "You’ve got … all over your boots", en: "You’ve got … all over your boots", de: "Du hast … überall auf deinen Stiefeln" }, [
  { text: "clart", correct: true },
]);

// ================= УРОК 44 =================
addGeordie(44, "SELECT", { ua: "Що з цього означає «чоловік»?", en: "Which of these means 'man'?", de: "Welche dieser Bedeutungen heißt 'Mann'?" }, [
  { text: "gadgie", correct: true, imageSrc: "/geordie/4.1.png" },
  { text: "nappa", correct: false, imageSrc: "/geordie/2.2.png" },
  { text: "spuggy", correct: false, imageSrc: "/geordie/5.2.png" },
]);

addGeordie(44, "ASSIST", { ua: "Що з цього означає «светр»?", en: "Which of these means 'sweater'?", de: "Welche dieser Bedeutungen heißt 'Pullover'?" }, [
  { text: "toon", correct: false },
  { text: "gansey", correct: true },
  { text: "bairn", correct: false },
]);

addGeordie(44, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "дитина", correct: false },
  { text: "чоловік", correct: true },
  { text: "горобець", correct: false },
], "/audio/15/gadgie.mp3");

addGeordie(44, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "друг", correct: false },
  { text: "светр", correct: true },
  { text: "чоловік", correct: false },
], "/audio/15/gansey.mp3");

addGeordie(44, "WRITE", { ua: "He’s wearing his new … today", en: "He’s wearing his new … today", de: "Er trägt heute seinen neuen …" }, [
  { text: "gansey", correct: true },
]);

// ================= УРОК 45 =================
addGeordie(45, "SELECT", { ua: "Що з цього означає «сердитий»?", en: "Which of these means 'angry'?", de: "Welche dieser Bedeutungen heißt 'wütend'?" }, [
  { text: "radgie", correct: true, imageSrc: "/geordie/3.2.png" },
  { text: "spuggy", correct: false, imageSrc: "/geordie/5.2.png" },
  { text: "toon", correct: false, imageSrc: "/geordie/3.1.png" },
]);

addGeordie(45, "ASSIST", { ua: "Що з цього означає «горобець»?", en: "Which of these means 'sparrow'?", de: "Welche dieser Bedeutungen heißt 'Spatz'?" }, [
  { text: "spuggy", correct: true },
  { text: "bairn", correct: false },
  { text: "gadgie", correct: false },
]);

addGeordie(45, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "сердитий", correct: true },
  { text: "хліб", correct: false },
  { text: "дитина", correct: false },
], "/audio/15/radgie.mp3");

addGeordie(45, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "друг", correct: false },
  { text: "горобець", correct: true },
  { text: "голова", correct: false },
], "/audio/15/spuggy.mp3");

addGeordie(45, "WRITE", { ua: "He gets a bit … when his team loses", en: "He gets a bit … when his team loses", de: "Er wird etwas …, wenn sein Team verliert" }, [
  { text: "radgie", correct: true },
]);
await db.insert(schema.units).values([
  {
    id: 10,
    regionId: 16,
    title: "Додаток",
    description: "Перед тим, як практикуватися, радимо прочитати навчальні матеріали",
    order: 1,
  },
]);

await db.insert(schema.lessons).values([
  { id: 46, unitId: 10, order: 1, title: "Основні речення (частина 1)" },
  { id: 47, unitId: 10, order: 2, title: "Основні речення (частина 2)" },
   { id: 48, unitId: 10, order: 3, title: "Сімʼя та дім" },
  { id: 49, unitId: 10, order: 4, title: "Їжа та речі" },
  { id: 50, unitId: 10, order: 5, title: "Дії та рух" }
]);

const yorkChallenges: typeof schema.challenges.$inferInsert[] = [];
const yorkOptions: typeof schema.challengesOptions.$inferInsert[] = [];
let yorkId = 1000;

const addYork = (
  lessonId: number,
  type: "SELECT" | "ASSIST" | "LISTEN" | "WRITE",
  question: { ua: string; en: string; de: string },
  answers: { text: string; correct: boolean; audioSrc?: string; imageSrc?: string }[],
  audioSrc?: string 
) => {
  const chId = yorkId++;
  yorkChallenges.push({
    id: chId,
    lessonId,
    type,
    order: chId,
    question: question.ua,
    questionTranslations: question,
    audioSrc: audioSrc || null
  });

  answers.forEach((a) => {
    yorkOptions.push({
      id: yorkId++,
      challengeId: chId,
      text: a.text,
      correct: a.correct,
      audioSrc: a.audioSrc || null,
      imageSrc: a.imageSrc || null
    });
  });
};

// ================= УРОК 46 =================
addYork(46, "SELECT", { ua: "Що з цього означає «осел»?", en: "Which of these means 'donkey'?", de: "Welche dieser Bedeutungen heißt 'der Esel'?" }, [
  { text: "cuddy", correct: true, imageSrc: "/york/1.1.png" },
  { text: "croft", correct: false, imageSrc: "/york/3.2.png" },
  { text: "pannier", correct: false, imageSrc: "/york/1.2.png" },
]);

addYork(46, "ASSIST", { ua: "Що з цього означає «кошик»?", en: "Which of these means 'basket'?", de: "Welche dieser Bedeutungen heißt 'Korb'?" }, [
  { text: "pannier", correct: true },
  { text: "garth", correct: false },
  { text: "kist", correct: false },
]);

addYork(46, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "кінь", correct: true },
  { text: "овечка", correct: false },
  { text: "сад/двір", correct: false },
], "/audio/16/cuddy.mp3");

addYork(46, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "коробка/скриня", correct: false },
  { text: "стайня", correct: false },
  { text: "кошик", correct: true },
], "/audio/16/Pannier.mp3");

addYork(46, "WRITE", { ua: "Put the apples in the … before you carry them.", en: "Put the apples in the … before you carry them.", de: "Lege die Äpfel in den … bevor du sie trägst." }, [
  { text: "pannier", correct: true },
]);

// ================= УРОК 47 =================
addYork(47, "SELECT", { ua: "Що з цього означає «сад/двір»?", en: "Which of these means 'garden/yard'?", de: "Welche dieser Bedeutungen heißt 'Garten/Hof'?" }, [
  { text: "garth", correct: true, imageSrc: "/york/2.1.png" },
  { text: "ginnel", correct: false, imageSrc: "/york/4.2.png" },
  { text: "beck", correct: false, imageSrc: "/york/3.1.png"},
]);

addYork(47, "ASSIST", { ua: "Що з цього означає «коробка/скриня»?", en: "Which of these means 'chest/box'?", de: "Welche dieser Bedeutungen heißt 'Kiste/Truhe'?" }, [
  { text: "kist", correct: true },
  { text: "croft", correct: false },
  { text: "staithe", correct: false },
]);

addYork(47, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "коробка/скриня", correct: true },
  { text: "стайня", correct: false },
  { text: "вузький прохід/провулок", correct: false },
], "/audio/16/kist.mp3");

addYork(47, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "сад/двір", correct: false },
  { text: "місто", correct: true },
  { text: "невелика ферма/земельна ділянка", correct: false },
], "/audio/16/Garth.mp3");

addYork(47, "WRITE", { ua: "Fetch that … from the loft", en: "Fetch that … from the loft", de: "Hol das … aus dem Speicher" }, [
  { text: "kist", correct: true },
]);

// ================= УРОК 48 =================
addYork(48, "SELECT", { ua: "Що з цього означає «невеликий потік/струмок»?", en: "Which of these means 'small stream'?", de: "Welche dieser Bedeutungen heißt 'kleiner Bach'?" }, [
  { text: "staithe", correct: false, imageSrc: "/york/4.1.png" },
  { text: "neddy", correct: false, imageSrc: "/york/5.2.png" },
  { text: "beck", correct: true, imageSrc: "/york/3.1.png" },
]);

addYork(48, "ASSIST", { ua: "Що з цього означає «невелика ферма/земельна ділянка»?", en: "Which of these means 'small farm/plot'?", de: "Welche dieser Bedeutungen heißt 'kleiner Bauernhof/Grundstück'?" }, [
  { text: "croft", correct: true },
  { text: "cuddy", correct: false },
  { text: "garth", correct: false },
]);

addYork(48, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "стайня", correct: false },
  { text: "місто", correct: false },
  { text: "невеликий потік/струмок", correct: true },
], "/audio/16/Beck.mp3");

addYork(48, "WRITE", { ua: "The … runs behind the cottages", en: "The … runs behind the cottages", de: "Der … fließt hinter den Häusern entlang" }, [
  { text: "beck", correct: true },
]);

// ================= УРОК 49 =================
addYork(49, "SELECT", { ua: "Що з цього означає «гавань/причал»?", en: "Which of these means 'harbor/quay'?", de: "Welche dieser Bedeutungen heißt 'Hafen/Anleger'?" }, [
  { text: "staithe", correct: true, imageSrc: "/york/4.1.png" },
  { text: "ginnel", correct: false, imageSrc: "/york/4.2.png" },
  { text: "cuddy", correct: false, imageSrc: "/york/1.1.png" },
]);

addYork(49, "ASSIST", { ua: "Що з цього означає «вузький прохід/провулок»?", en: "Which of these means 'narrow alley/passage'?", de: "Welche dieser Bedeutungen heißt 'enge Gasse/Durchgang'?" }, [
  { text: "ginnel", correct: true },
  { text: "pannier", correct: false },
  { text: "croft", correct: false },
]);

addYork(49, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "вузький прохід/провулок", correct: true },
], "/audio/16/Ginnel.mp3");

addYork(49, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "гавань/причал", correct: true },
], "/audio/16/Staithe.mp3");

addYork(49, "WRITE", { ua: "She went down the … behind the shop", en: "She went down the … behind the shop", de: "Sie ging den … hinter dem Laden entlang" }, [
  { text: "ginnel", correct: true },
]);

// ================= УРОК 50 =================
addYork(50, "SELECT", { ua: "Що з цього означає «вівця»?", en: "Which of these means 'sheep'?", de: "Welche dieser Bedeutungen heißt 'Schaf'?" }, [
  { text: "yow", correct: true, imageSrc: "/york/5.1.png" },
  { text: "cuddy", correct: false, imageSrc: "/york/1.1.png" },
  { text: "beck", correct: false, imageSrc: "/york/3.1.png" },
]);

addYork(50, "ASSIST", { ua: "Що з цього означає «кінь»?", en: "Which of these means 'horse'?", de: "Welche dieser Bedeutungen heißt 'Pferd'?" }, [
  { text: "neddy", correct: true },
  { text: "croft", correct: false },
  { text: "pannier", correct: false },
]);

addYork(50, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "вівця", correct: true },
  { text: "кошик", correct: false },
  { text: "кінь", correct: false },
], "/audio/16/Yow.mp3");

addYork(50, "LISTEN", { ua: "Послухайте й оберіть. Що означає слово", en: "Listen and choose. What does the word mean?", de: "Hören und wählen. Was bedeutet das Wort?" }, [
  { text: "кінь", correct: true },
  { text: "невеликий потік/струмок", correct: false },
  { text: "вузький прохід/провулок", correct: false },
], "/audio/16/Neddy.mp3");

addYork(50, "WRITE", { ua: "The … were grazing peacefully in the field", en: "The … were grazing peacefully in the field", de: "Die … weideten friedlich auf dem Feld" }, [
  { text: "yow", correct: true },
]);

  
   await db.insert(schema.challenges).values(easternChallenges);
    await db.insert(schema.challengesOptions).values(easternOptions);
   await db.insert(schema.challenges).values(yorkChallenges);
    await db.insert(schema.challengesOptions).values(yorkOptions);
   await db.insert(schema.challenges).values(geordieChallenges);
    await db.insert(schema.challengesOptions).values(geordieOptions);
    await db.insert(schema.challenges).values(scouseChallenges);
    await db.insert(schema.challengesOptions).values(scouseOptions);
    await db.insert(schema.challenges).values(cockneyChallenges);
    await db.insert(schema.challengesOptions).values(cockneyOptions);
     await db.insert(schema.challenges).values(oberChallenges);
    await db.insert(schema.challengesOptions).values(oberOptions);

    await db.insert(schema.challenges).values(plattChallenges);
    await db.insert(schema.challengesOptions).values(plattOptions);
    await db.insert(schema.challenges).values(middleChallenges);
    await db.insert(schema.challengesOptions).values(middleOptions);

    await db.insert(schema.challenges).values(northChallenges);
    await db.insert(schema.challengesOptions).values(northOptions);
    await db.insert(schema.challenges).values(swChallenges);
    await db.insert(schema.challengesOptions).values(swOptions);

    console.log("✅ Seeding finished successfully!");
  } catch (error) {
    console.error(error);
    throw new Error("❌ Failed to seed the database");
  }
}

main();




