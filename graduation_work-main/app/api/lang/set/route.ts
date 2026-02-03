//Настя
import { auth } from "@clerk/nextjs/server"; // Авторизація користувача через Clerk
import { NextResponse } from "next/server"; // Next.js API відповіді
import db from "@/db/drizzle"; // Підключення до бази даних через Drizzle ORM
import { userProgress } from "@/db/schema"; // Схема таблиці userProgress
import { eq } from "drizzle-orm"; // Функція для умов у запитах

// ================= API Route: /api/lang/set =================
// Відповідальний: Backend Developer
// Призначення: встановити або оновити мову користувача
// -------------------------------------------------------------
export async function POST(req: Request) {
  try {
    // ================= Авторизація користувача =================
    // Відповідальний: Backend Developer
    const { userId } = await auth();

    if (!userId) {
      // Якщо користувач не авторизований — повертаємо 401
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // ================= Отримання даних з запиту =================
    // Відповідальний: Backend Developer
    const { lang } = await req.json();

    // ================= Валідація мови =================
    // Відповідальний: Backend Developer
    if (!["ua", "en", "de"].includes(lang)) {
      return NextResponse.json({ message: "Invalid language" }, { status: 400 });
    }

    // ================= Перевірка наявного прогресу користувача =================
    // Відповідальний: Backend Developer
    const existing = await db
      .select()
      .from(userProgress)
      .where(eq(userProgress.userId, userId))
      .limit(1);

    if (existing.length === 0) {
      // ================= Якщо запису немає — вставляємо новий =================
      // Відповідальний: Backend Developer
      await db.insert(userProgress).values({ userId, lang });
      console.log("➕ Inserted new user progress with lang:", lang);
    } else {
      // ================= Якщо запис існує — оновлюємо мову =================
      // Відповідальний: Backend Developer
      await db.update(userProgress).set({ lang }).where(eq(userProgress.userId, userId));
      console.log("🔄 Updated user progress lang to:", lang);
    }

    // Повертаємо нову/оновлену мову
    return NextResponse.json({ lang });
  } catch (err) {
    // Логування помилок та повернення 500
    console.error("❌ Error in /api/lang/set:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
