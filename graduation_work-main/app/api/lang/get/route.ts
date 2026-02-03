//Настя

import { auth } from "@clerk/nextjs/server"; // Авторизація користувача через Clerk
import { NextResponse } from "next/server"; // Next.js API відповіді
import db from "@/db/drizzle"; // Підключення до бази даних через Drizzle ORM
import { userProgress } from "@/db/schema"; // Схема таблиці userProgress
import { eq } from "drizzle-orm"; // Функція для умов у запитах

// ================= API Route: /api/lang/get =================
// Відповідальний: Backend Developer
// Призначення: отримати мову користувача з прогресу
// -------------------------------------------------------------
export async function GET() {
  try {
    // ================= Авторизація користувача =================
    // Відповідальний: Backend Developer
    const { userId } = await auth();

    if (!userId) {
      // Якщо користувач не авторизований, повертаємо 401
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // ================= Запит до бази =================
    // Відповідальний: Backend Developer
    const existing = await db
      .select()
      .from(userProgress)
      .where(eq(userProgress.userId, userId))
      .limit(1);

    // ================= Обробка результату =================
    // Якщо прогрес є, беремо мову, якщо ні — ставимо "ua" за замовчуванням
    const lang = existing[0]?.lang ?? "ua";

    // Повертаємо JSON з мовою користувача
    return NextResponse.json({ lang });
  } catch (err) {
    // Логування помилок та повернення 500
    console.error("❌ Error in /api/lang/get:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
