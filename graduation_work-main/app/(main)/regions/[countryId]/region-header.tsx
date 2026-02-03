//Лера

"use client";
// ⬆️ Вказує Next.js, що це CLIENT COMPONENT
// Тут використовується хук useLanguage(), який працює тільки на клієнті

// ---------------------- Імпорти ----------------------
import Link from "next/link";
// ⬅️ Компонент Next.js для клієнтської навігації між сторінками

import { ArrowLeft } from "lucide-react";
// ⬅️ SVG-іконка стрілки "назад"

import { Button } from "@/components/ui/button";
// ⬅️ Уніфікована кнопка з UI-системи проєкту

import { useLanguage } from "@/components/languageContext";
// ⬅️ Кастомний React Context
// Дозволяє отримати поточну мову інтерфейсу користувача

import { translations } from "@/components/translations";
// ⬅️ Обʼєкт з усіма перекладами (ua / en / de)

// ---------------------- Компонент ----------------------
const RegionHeader = () => {
  // ⬅️ Функціональний React-компонент без props

  const { lang } = useLanguage();
  // ⬅️ Отримуємо поточну мову інтерфейсу з контексту

  return (
    <div className="mt-4 mb-6 flex items-center gap-3">
      {/* Контейнер заголовка сторінки */}

      <Link href="/countries">
        {/* Посилання для повернення до вибору країни */}

        <Button
          variant="ghost"
          title="Повернутись до вибору країни"
          // ⬅️ Текст підказки при наведенні

          className="flex items-center gap-2 text-black p-0 h-auto"
          // flex + items-center → вирівнюємо іконку
          // p-0 → прибираємо стандартні відступи кнопки
          // h-auto → висота під контент
        >
          <ArrowLeft className="h-5 w-5 stroke-2 text-neutral-400" />
          {/* Іконка стрілки "назад" */}
        </Button>
      </Link>

      <h1 className="text-2xl font-bold text-neutral-700">
        {translations[lang].chooseDialectRegion}
        {/* Локалізований заголовок:
            - береться з translations
            - залежить від поточної мови */}
      </h1>
    </div>
  );
};

export default RegionHeader;
// ⬅️ Експорт компонента
