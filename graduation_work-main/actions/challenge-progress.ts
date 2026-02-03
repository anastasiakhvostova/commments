//Настя

"use server" // Цей файл виконується на сервері (Next.js 13+)

// Імпортуємо функцію для оновлення кешованих сторінок після зміни даних
import { revalidatePath } from "next/cache"

// Імпортуємо функцію для отримання прогресу користувача з бази
import { getUserProgress } from "@/db/queries"

// Імпортуємо метод автентифікації користувача через Clerk
import { auth } from "@clerk/nextjs/server"

// Підключаємо базу даних через Drizzle ORM
import db from "@/db/drizzle"

// Хелпери для умов WHERE в Drizzle ORM
import { eq, and } from "drizzle-orm"

// Імпортуємо схеми таблиць з бази
import { challenges, challengesProgress, userProgress } from "@/db/schema"

// Основна функція, яка вставляє або оновлює прогрес челенджу
export const upsertChallengeProgress = async (challengeId: number) => {
  // Отримуємо userId залогіненого користувача
  const { userId } = await auth()

  // Якщо користувач не залогінений — помилка
  if (!userId) {
    throw new Error("Unauthorized")
  }

  // Отримуємо прогрес користувача (points, hearts)
  const currentUserProgress = await getUserProgress()

  // Якщо прогрес користувача не знайдено — помилка
  if (!currentUserProgress) {
    throw new Error("Прогрес користувача не знайдено")
  }

  // Шукаємо челендж по ID в таблиці challenges
  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  })

  // Якщо челендж не знайдено — помилка
  if (!challenge) {
    throw new Error("Челендж не знайдено")
  }

  // Зберігаємо lessonId, щоб потім оновити кеш конкретного уроку
  const lessonId = challenge.lessonId

  // Перевіряємо, чи користувач вже проходив цей челендж
  const existingChallengeProgress = await db.query.challengesProgress.findFirst({
    where: and(
      eq(challengesProgress.userId, userId),
      eq(challengesProgress.challengeId, challengeId)
    ),
  })

  // true, якщо це повторне проходження (практика)
  const isPractice = !!existingChallengeProgress

  // ⛔ Якщо це перше проходження і немає сердець — блокуємо
  if (!isPractice && currentUserProgress.hearts === 0) {
    return { error: "серця" }
  }

  // 🔁 ПРАКТИКА (челендж уже є в challengesProgress)
  if (isPractice) {
    // Оновлюємо completed = true, щоб відзначити завершення
    await db
      .update(challengesProgress)
      .set({ completed: true })
      .where(eq(challengesProgress.id, existingChallengeProgress.id))

    // ❗ ЖОДНИХ змін до points / hearts на практиці

    // Оновлюємо кешовані сторінки
    revalidatePath("/learn")
    revalidatePath(`/lesson/${lessonId}`)
    revalidatePath("/quests")
    revalidatePath("/leaderboard")

    // Повертаємо інформацію клієнту, що це практика
    return { practice: true }
  }

  // 🟢 ПЕРШЕ ПРОХОДЖЕННЯ
  // Вставляємо новий запис в challengesProgress
  await db.insert(challengesProgress).values({
    challengeId,
    userId,
    completed: true,
  })

  // Додаємо 10 очок користувачу
  await db
    .update(userProgress)
    .set({
      points: currentUserProgress.points + 10,
    })
    .where(eq(userProgress.userId, userId))

  // Оновлюємо кешовані сторінки після першого проходження
  revalidatePath("/learn")
  revalidatePath(`/lesson/${lessonId}`)
  revalidatePath("/quests")
  revalidatePath("/leaderboard")

  // Повертаємо результат успішного першого проходження
  return { success: true }
}
