//Настя

"use server"; // Цей файл виконується на сервері (Next.js 13+)

// ----------------------
// Імпорти
// ----------------------
import { auth, currentUser } from "@clerk/nextjs/server"; // автентифікація користувача через Clerk
import { revalidatePath } from "next/cache"; // для оновлення кешованих сторінок після зміни даних
import { redirect } from "next/navigation"; // для перенаправлення користувача
import { and, eq } from "drizzle-orm"; // хелпери для умов WHERE в Drizzle ORM
import db from "@/db/drizzle"; // підключення бази даних через Drizzle ORM
import { userProgress, challengesProgress, challenges, regions } from "@/db/schema"; // схеми таблиць
import { getCountryById, getUserProgress } from "@/db/queries"; // власні запити
import { POINTS_TO_REFILL } from "@/constant"; // константа для відновлення сердець

// ----------------------
// Типи для повернення
// ----------------------
export type ReduceHeartsResult =
  | { error: "practice" | "серця" } // помилка: практика або відсутні серця
  | undefined; // або undefined, якщо серце успішно знято

// ----------------------
// Функція: вибір країни (перший екран)
// ----------------------
export const upsertUserProgress = async (countryId: number): Promise<void> => {
  const { userId } = await auth(); // отримуємо userId
  const user = await currentUser(); // отримуємо об’єкт користувача

  if (!userId || !user) throw new Error("Не авторизований"); // перевірка авторизації

  const country = await getCountryById(countryId); // отримуємо країну по ID
  if (!country) throw new Error("Країна не знайдена"); // перевірка існування країни

  const existingProgress = await getUserProgress(); // отримуємо прогрес користувача

  if (existingProgress) {
    // ✅ Якщо прогрес є → оновлюємо країну, зберігаючи регіон
    await db
      .update(userProgress)
      .set({
        activeCountryId: countryId, // нова країна
        activeRegionId: existingProgress.activeRegionId, // зберігаємо поточний регіон
        userName: user.firstName || "User", // ім’я користувача
        userImageSrc: user.imageUrl || "/mascot.png", // аватар користувача
      })
      .where(eq(userProgress.userId, userId));
  } else {
    // ✅ Якщо прогресу немає → вставляємо новий запис
    await db.insert(userProgress).values({
      userId,
      activeCountryId: countryId,
      activeRegionId: null,
      userName: user.firstName || "User",
      userImageSrc: user.imageUrl || "/mascot.png",
    });
  }

  // Оновлюємо кешовані сторінки після зміни
  revalidatePath("/countries");
  revalidatePath(`/regions/${countryId}`);

  // Перенаправляємо користувача на сторінку регіонів
  redirect(`/regions/${countryId}`);
};

// ----------------------
// Функція: вибір регіону
// ----------------------
export const upsertUserProgressRegion = async (regionId: number): Promise<void> => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) throw new Error("Не авторизований"); // перевірка авторизації

  const region = await db.query.regions.findFirst({
    where: eq(regions.id, regionId), // отримуємо регіон по ID
  });
  if (!region) throw new Error("Регіон не знайдено"); // перевірка існування регіону

  const existingProgress = await getUserProgress(); // отримуємо прогрес користувача

  if (existingProgress) {
    // ✅ Оновлюємо регіон та країну, зберігаючи ім’я/аватар
    await db
      .update(userProgress)
      .set({
        activeRegionId: regionId,
        activeCountryId: region.countryId, // країна прив’язана до регіону
        userName: user.firstName || "User",
        userImageSrc: user.imageUrl || "/mascot.png",
      })
      .where(eq(userProgress.userId, userId));
  } else {
    // ✅ Якщо прогресу немає → вставляємо новий запис
    await db.insert(userProgress).values({
      userId,
      activeRegionId: regionId,
      activeCountryId: region.countryId,
      userName: user.firstName || "User",
      userImageSrc: user.imageUrl || "/mascot.png",
    });
  }

  // Оновлюємо кешовані сторінки після зміни
  revalidatePath("/learn");
};

// ----------------------
// Функція: зменшення сердець при помилці (Quiz)
// ----------------------
export const reduceHearts = async (
  challengeId: number,
  lessonId: number
): Promise<ReduceHeartsResult> => {
  const { userId } = await auth();
  if (!userId) throw new Error("Не авторизований"); // перевірка авторизації

  const currentProgress = await getUserProgress(); // отримуємо прогрес користувача
  if (!currentProgress) throw new Error("Прогрес користувача не знайдено"); 

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId), // отримуємо челендж по ID
  });
  if (!challenge) throw new Error("Challenge not found"); 

  const existingChallengeProgress = await db.query.challengesProgress.findFirst({
    where: and(
      eq(challengesProgress.userId, userId),
      eq(challengesProgress.challengeId, challengeId)
    ),
  });

  // якщо челендж уже був пройдений → практика, серця не знімаємо
  if (existingChallengeProgress) {
    return { error: "practice" };
  }

  // якщо сердець немає → повертаємо помилку для модалки
  if (currentProgress.hearts === 0) {
    return { error: "серця" };
  }

  // 🔹 Зменшуємо серце на 1
  await db
    .update(userProgress)
    .set({ hearts: Math.max(currentProgress.hearts - 1, 0) }) // не можна нижче 0
    .where(eq(userProgress.userId, userId));

  // Оновлюємо кешовані сторінки після зміни
  revalidatePath("/shop");
  revalidatePath("/quests");
  revalidatePath("/learn");
  revalidatePath("/leaderboard");
  revalidatePath(`/lesson/${lessonId}`);

  // нічого не повертаємо → undefined
  return;
};

// ----------------------
// Функція: відновлення сердець за поінти
// ----------------------
export const refillHearts = async (): Promise<void> => {
  const currentProgress = await getUserProgress();
  if (!currentProgress) throw new Error("User progress not found"); // перевірка

  // Перевірка: чи достатньо поінтів для відновлення
  if (currentProgress.points < POINTS_TO_REFILL) {
    throw new Error("Not enough points");
  }

  // Відновлюємо серця та знімаємо поінти
  await db
    .update(userProgress)
    .set({
      hearts: 5, // повне відновлення
      points: currentProgress.points - POINTS_TO_REFILL,
    })
    .where(eq(userProgress.userId, currentProgress.userId));

  // Оновлюємо кешовані сторінки після відновлення сердець
  revalidatePath("/shop");
  revalidatePath("/quests");
  revalidatePath("/learn");
  revalidatePath("/leaderboard");
};
