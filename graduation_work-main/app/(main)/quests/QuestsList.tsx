//Маша

"use client";
// ⚡️ Цей компонент виконується на клієнті (React) у Next.js.
// Це важливо, бо використовуються useState, useEffect та інші клієнтські хуки.

import Image from "next/image";
// Next.js компонент для оптимізованих зображень.
// Підвантажує картинки лише коли вони в видимій області, автоматично оптимізує формат.

import Link from "next/link";
// Компонент для внутрішніх переходів між сторінками Next.js без перезавантаження.

import { useEffect, useState } from "react";
// React хук useState – для стану компоненту (наприклад, відкриття модалки)
// React хук useEffect – для виконання побічних ефектів після рендера.

import { cn } from "@/lib/utils";
// Хелпер для умовного складання класів CSS.
// Наприклад: cn("base", isActive && "active") → "base active" якщо isActive = true.

import { Progress } from "@/components/ui/progress";
// Компонент для відображення прогрес-барів (шкала прогресу квестів).

import { quests } from "@/constant";
// Масив констант квестів, наприклад:
// quests = [{ key: "quest1", value: 50 }, { key: "quest2", value: 100 }, ...]
// "value" – скільки поінтів потрібно для виконання квесту.

import { useLanguage } from "@/components/languageContext";
// Хук, який повертає об’єкт з поточною мовою користувача: { lang: "ua" | "en" | "de" }.

import { translations } from "@/components/translations";
// Об’єкт з перекладом текстів для всіх мов.
// translations.ua.questsTitle → назва квестів українською
// translations.en.questsTitle → англійською і т.д.

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
// Компоненти модального вікна:
// Dialog – обгортка
// DialogContent – контент всередині
// DialogHeader – шапка
// DialogTitle – заголовок
// DialogDescription – текст опису

/* ================= Типи Props ================= */
type Props = {
  points: number; // поточні поінти користувача
  hasProgress: boolean; // чи користувач розпочав прогрес у навчанні (активний курс/регіон)
};

/* ================= Основний компонент ================= */
export const QuestsList = ({ points, hasProgress }: Props) => {
  const { lang } = useLanguage();
  // отримуємо поточну мову користувача

  const t = translations[lang];
  // беремо перекладені тексти для цієї мови
  // Наприклад t.questsTitle, t.questsDescription, t.goToCountries і т.д.

  const [open, setOpen] = useState(false);
  // стан модального вікна:
  // open = true → модалка відкрито
  // open = false → модалка закрито

  /* ===== Побічний ефект: відкриваємо модалку якщо немає прогресу ===== */
  useEffect(() => {
    if (!hasProgress) {
      setOpen(true); 
      // відкриваємо діалогове вікно, якщо користувач ще не почав прогрес
    }
  }, [hasProgress]);
  // useEffect відстежує зміни hasProgress і запускає цю логіку

  return (
    <>
      {/* ===== МОДАЛЬНЕ ВІКНО: Немає прогресу ===== */}
      <Dialog open={open} onOpenChange={setOpen}>
        {/* open – чи відкрито модалку, onOpenChange – хендлер при закритті */}
        <DialogContent className="max-w-sm">
          {/* контент вікна з обмеженням ширини */}
          <DialogHeader>
            <DialogTitle className="text-center">
              {t.leaderboardNoProgressTitle}
              {/* Заголовок: "Щоб побачити квести, розпочніть курс" */}
            </DialogTitle>

            <DialogDescription className="text-center mt-2">
              {t.leaderboardNoProgressText}
              {/* Текст: пояснює, що без прогресу квести недоступні */}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 flex justify-center">
            {/* Кнопка переходу до вибору країни */}
            <Link
              href="/countries"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              {t.goToCountries}
            </Link>
          </div>
        </DialogContent>
      </Dialog>

      {/* ===== СЕКЦІЯ КВЕСТІВ ===== */}
      <div
        className={cn(
          "w-full flex-col items-center transition-all",
          !hasProgress && "grayscale opacity-50 pointer-events-none"
          // Якщо немає прогресу:
          // - робимо компонент сіруватим (grayscale)
          // - зменшуємо прозорість (opacity-50)
          // - робимо неклікабельним (pointer-events-none)
        )}
      >
        {/* Іконка Квестів */}
        <Image
          src="/quests.png"
          alt="Quests"
          width={90}
          height={90}
          className="mx-auto"
        />

        {/* Заголовок секції */}
        <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
          {t.questsTitle}
        </h1>

        {/* Опис секції */}
        <p className="text-muted-foreground text-center text-lg mb-6">
          {t.questsDescription}
        </p>

        {/* Список квестів */}
        <ul className="w-full">
          {quests.map((quest) => {
            // обчислюємо прогрес у відсотках:
            const progress = Math.min(
              (points / quest.value) * 100,
              100
            );
            // прогрес = points користувача / points потрібні для квесту
            // Math.min щоб не перевищувати 100%

            return (
              <div
                key={quest.key}
                className="flex items-center w-full p-4 gap-x-4 border-t-2"
                // flex layout: іконка + назва + прогресбар
                // border-t-2 → відокремлюємо квести між собою
              >
                {/* Іконка поінтів */}
                <Image
                  src="/points.png"
                  alt="Points"
                  width={60}
                  height={60}
                />

                {/* Назва квесту та прогресбар */}
                <div className="flex flex-col gap-y-2 w-full">
                  <p className="text-neutral-700 text-xl font-bold">
                    {t.quests[quest.key]}
                    {/* Назва квесту українською/англійською/німецькою */}
                  </p>

                  <Progress value={progress} className="h-3" />
                  {/* Шкала прогресу */}
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
