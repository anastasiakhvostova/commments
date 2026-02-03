//НАстя

import { NextResponse } from "next/server"; // Next.js API відповіді
import nodemailer from "nodemailer"; // Бібліотека для відправки email

// ================= API Route: /api/feedback =================
// Відповідальний: Backend Developer
// Призначення: отримати повідомлення від користувача та відправити його на пошту
// -------------------------------------------------------------
export async function POST(req: Request) {
  // Отримуємо JSON з запиту
  const { message } = await req.json();

  // ================= Налаштування транспорту =================
  // Відповідальний: Backend Developer
  // Використовуємо Gmail та змінні середовища для безпечного зберігання логіну/паролю
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.FEEDBACK_EMAIL,          // Email для відправки
      pass: process.env.FEEDBACK_EMAIL_PASSWORD, // Пароль або app password
    },
  });

  // ================= Відправка листа =================
  // Відповідальний: Backend Developer
  await transporter.sendMail({
    from: `"Dialecto" <${process.env.FEEDBACK_EMAIL}>`, // Від кого
    to: process.env.FEEDBACK_EMAIL,                     // Кому (зворотний зв'язок відправляється на той же email)
    subject: "Dialecto — зворотний зв’язок",           // Тема листа
    text: message,                                     // Текст листа з повідомлення користувача
  });

  // Повертаємо JSON відповідь
  return NextResponse.json({ success: true });
}
