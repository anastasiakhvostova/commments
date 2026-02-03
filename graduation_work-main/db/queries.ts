//НАСТЯ

// -------------------- Імпорти --------------------
import { cache } from "react"; 
// ✅ Використовується для кешування асинхронних функцій. Тобто якщо викликати функцію з тими ж параметрами, результат буде взятий з пам’яті без нового запиту

import { eq } from "drizzle-orm"; 
// ✅ Функція для формування WHERE умов у запитах до бази. eq(column, value) → "column = value"

import { auth } from "@clerk/nextjs/server"; 
// ✅ Отримуємо інформацію про поточного користувача (userId, email) на сервері через Clerk

import db from "./drizzle"; 
// ✅ Підключення до бази даних через Drizzle ORM

import {
  userProgress,
  countries,
  regions,
  units,
  lessons,
  challenges,
  challengesProgress,
} from "./schema"; 
// ✅ Імпортуємо схеми таблиць, щоб Drizzle знав, з якими таблицями працювати

// -------------------- КРАЇНИ --------------------
export const getCountries = cache(async () => {
  const data = await db.query.countries.findMany(); 
  // ✅ Запит до таблиці countries, повертає всі країни
  return data; 
  // ✅ Повертає масив об’єктів
});

export const getCountryById = cache(async (countryId: number) => {
  const data = await db.query.countries.findFirst({
    where: eq(countries.id, countryId)
    // ✅ WHERE id = countryId
  });
  return data; 
  // ✅ Повертає одну країну або null
});

// -------------------- ПРОГРЕС КОРИСТУВАЧА --------------------
export const getUserProgress = async () => {
  const { userId } = await auth(); 
  // ✅ Отримуємо userId поточного користувача
  if (!userId) return null; 
  // ✅ Якщо не авторизований, повертаємо null

  return db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId), 
    // ✅ Фільтруємо прогрес користувача по userId
    with: {
      activeCountry: true, 
      activeRegion: true, 
      // ✅ Підтягуємо зв’язані таблиці activeCountry і activeRegion
    },
  });
};

// -------------------- ЮНІТИ --------------------
export const getUnits = async () => {
  const { userId } = await auth(); 
  // ✅ Отримуємо userId
  const user = await getUserProgress(); 
  // ✅ Отримуємо прогрес користувача
  if (!userId || !user?.activeRegionId) return []; 
  // ✅ Якщо користувач не авторизований або у нього немає активного регіону, повертаємо порожній масив

  const unitsInRegion = await db.query.units.findMany({
    where: eq(units.regionId, user.activeRegionId), 
    // ✅ Беремо всі юніти активного регіону
    orderBy: (u, { asc }) => [asc(u.order)], 
    // ✅ Сортуємо по полю order
    with: {
      lessons: {
        orderBy: (l, { asc }) => [asc(l.order)], 
        with: {
          challenges: {
            orderBy: (c, { asc }) => [asc(c.order)], 
            with: {
              challengeProgress: {
                where: eq(challengesProgress.userId, userId), 
                // ✅ Підтягуємо прогрес кожного challenge для користувача
              },
            },
          },
        },
      },
    },
  });

  return unitsInRegion.map((unit) => {
    const lessonsWithStatus = unit.lessons.map((lesson) => {
      const completed = lesson.challenges.every((ch) =>
        ch.challengeProgress?.some((p) => p.completed && !p.isPractice)
      );
      // ✅ Якщо всі завдання уроку виконані (і не в режимі practice) → completed
      return { ...lesson, completed };
    });

    const firstIncompleteIndex = lessonsWithStatus.findIndex(l => !l.completed);
    // ✅ Знаходимо індекс першого непройденого уроку
    const lessonsFinal = lessonsWithStatus.map((lesson, index) => ({
      ...lesson,
      active: firstIncompleteIndex === -1 ? false : index === firstIncompleteIndex,
      // ✅ Встановлюємо active для першого непройденого уроку
    }));

    return { ...unit, lessons: lessonsFinal };
  });
};

// -------------------- РЕГІОНИ --------------------
export const getRegionsByCountryId = cache(async (countryId: number) => {
  return (
    (await db.query.regions.findMany({
      where: eq(regions.countryId, countryId), 
      // ✅ Вибираємо регіони певної країни
      with: {
        units: {
          orderBy: (units, { asc }) => [asc(units.order)], 
          with: { lessons: { orderBy: (lessons, { asc }) => [asc(lessons.order)] } }, 
          // ✅ Підтягуємо уроки всередині юнітів з сортуванням
        },
      },
    })) ?? [] 
    // ✅ Якщо нічого не знайдено, повертаємо порожній масив
  );
});

// -------------------- ПРОГРЕС РЕГІОНУ --------------------
export const getRegionProgress = cache(async () => {
  const { userId } = await auth(); 
  // ✅ Отримуємо userId
  const user = await getUserProgress(); 
  // ✅ Отримуємо прогрес користувача
  if (!userId || !user?.activeRegionId) return null; 
  // ✅ Якщо користувач не авторизований або регіон не вибраний

  const unitsInRegion = await db.query.units.findMany({
    where: eq(units.regionId, user.activeRegionId), 
    orderBy: (units, { asc }) => [asc(units.order)], 
    // ✅ Беремо всі юніти регіону, сортуємо по order
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          challenges: {
            with: { challengeProgress: { where: eq(challengesProgress.userId, userId) } },
            // ✅ Підтягуємо прогрес по кожному завданню
          },
        },
      },
    },
  });

  const firstUncompletedLesson = unitsInRegion
    .flatMap((u) => u.lessons)
    .find((lesson) =>
      !lesson.challenges.every((ch) => 
        ch.challengeProgress?.some(p => p.completed && !p.isPractice)
      )
    );
    // ✅ Знаходимо перший урок, який ще не пройдено

  return { activeLesson: firstUncompletedLesson, activeLessonId: firstUncompletedLesson?.id };
  // ✅ Повертаємо активний урок
});

// -------------------- ПРОЦЕНТ УРОКУ --------------------
export const getLessonPercantage = cache(async () => {
  const regionProgress = await getRegionProgress(); 
  // ✅ Отримуємо активний урок

  if (!regionProgress?.activeLessonId) return 0; 
  // ✅ Якщо урок не знайдено → 0%

  const lesson = await getLesson(regionProgress.activeLessonId); 
  // ✅ Отримуємо урок з challenges

  if (!lesson || lesson.challenges.length === 0) return 0; 
  // ✅ Якщо немає завдань → 0%

  const completedChallenges = lesson.challenges.filter((ch) => ch.completed); 
  // ✅ Фільтруємо пройдені завдання
  const percentage = Math.round(
    (completedChallenges.length / lesson.challenges.length) * 100
  ); 
  // ✅ Вираховуємо відсоток виконання

  return percentage; 
  // ✅ Повертаємо %
});

// -------------------- МОВА КОРИСТУВАЧА --------------------
export const getUserLanguage = cache(async () => {
  const user = await getUserProgress(); 
  // ✅ Отримуємо прогрес користувача
  return (user?.lang as "ua" | "en" | "de") || "ua"; 
  // ✅ Якщо не вказано мову → ua
});

// -------------------- ОКРЕМИЙ УРОК --------------------
export const getLesson = cache(async (id?: number) => {
  const { userId } = await auth(); 
  if (!userId) return null; 

  const regionProgress = await getRegionProgress(); 
  const lessonId = id || regionProgress?.activeLessonId; 
  // ✅ Якщо id не передано, беремо активний урок
  if (!lessonId) return null; 

  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId),
    with: {
      challenges: {
        orderBy: (challenges, { asc }) => [asc(challenges.order)],
        with: {
          challengeOption: true,
          challengeProgress: { where: eq(challengesProgress.userId, userId) },
        },
      },
    },
  });
  if (!data || !data.challenges) return null;

  const normalizedChallenges = data.challenges.map((challenge) => ({
    ...challenge,
    completed: challenge.challengeProgress?.some((p) => p.completed) ?? false,
    // ✅ Додаємо completed true/false для кожного challenge
  }));

  const lessonCompleted = normalizedChallenges.every((ch) => ch.completed);
  // ✅ Перевіряємо, чи всі завдання пройдено

  return { ...data, challenges: normalizedChallenges, completed: lessonCompleted };
});

// -------------------- ТОП 10 КОРИСТУВАЧІВ --------------------
export const getTopTenUsers = cache(async () => {
  const { userId } = await auth();
  if (!userId) return []; 

  const data = await db.query.userProgress.findMany({
    orderBy: (userProgress, { desc }) => [desc(userProgress.points)],
    // ✅ Сортуємо за балами по спадання
    limit: 10, 
    // ✅ Беремо тільки топ 10
    columns: {
      userId: true,
      userName: true,
      userImageSrc: true,
      points: true,
    },
  });
  return data; 
  // ✅ Повертаємо масив топ-10 користувачів
});
