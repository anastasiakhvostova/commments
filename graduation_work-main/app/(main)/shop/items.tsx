//Настя

"use client";
/* =====================================================
   CLIENT COMPONENT
   Працює в браузері, використовує React hooks
   ===================================================== */

import { refillHearts } from "@/actions/user-progress";
/* Server Action:
   відповідає за поповнення сердець користувача
   (бекенд + БД логіка) */

import { Button } from "@/components/ui/button";
/* UI-кнопка (уніфікований дизайн проєкту) */

import { POINTS_TO_REFILL } from "@/constant";
/* Константа:
   скільки балів потрібно, щоб поповнити серця */

import Image from "next/image";
/* Оптимізований компонент зображень Next.js */

import { useTransition } from "react";
/* React hook:
   дозволяє виконувати асинхронні дії
   без блокування UI */

import { toast } from "sonner";
/* Toast-повідомлення про помилки */

import { useLanguage } from "@/components/languageContext";
import { translations } from "@/components/translations";
/* Локалізація інтерфейсу */


/* =====================================================
   ТИП PROPS
   ===================================================== */

type Props = {
  hearts: number; // Поточна кількість сердець користувача
  points: number; // Поточна кількість балів користувача
};


/* =====================================================
   КОМПОНЕНТ Items
   (магазин / бонуси)
   ===================================================== */

export const Items = ({
  hearts,
  points,
}: Props) => {

  /* -----------------------------------------------
     useTransition
     pending — true, коли виконується server action
     ----------------------------------------------- */
  const [pending, startTransition] = useTransition();

  /* -----------------------------------------------
     Отримуємо поточну мову інтерфейсу
     ----------------------------------------------- */
  const { lang } = useLanguage();


  /* =================================================
     ОБРОБНИК ПОПОВНЕННЯ СЕРДЕЦЬ
     ================================================= */
  const onRefillHearts = () => {

    // ❌ Захист від неправильних дій
    if (
      pending ||               // якщо запит уже виконується
      hearts === 5 ||           // якщо серця вже повні
      points < POINTS_TO_REFILL // якщо не вистачає балів
    ) return;

    // ✅ Запускаємо server action без блокування UI
    startTransition(() => {
      refillHearts()
        .catch(() => toast.error("Something went wrong"));
    });
  };


  /* =================================================
     RENDER
     ================================================= */
  return (
    <ul className="w-full">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">

        {/* -------- Іконка серця -------- */}
        <Image
          src="/heart.png"
          alt="Heart"
          width={60}
          height={60}
        />

        {/* -------- Текст -------- */}
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            {translations[lang].boostHearts}
          </p>
        </div>

        {/* -------- Кнопка -------- */}
        <Button
          onClick={onRefillHearts}
          disabled={
            pending ||
            hearts === 5 ||
            points < POINTS_TO_REFILL
          }
        >
          {/* Якщо серця повні — показуємо текст */}
          {hearts === 5 ? (
            translations[lang].fullHearts
          ) : (
            /* Інакше — показуємо ціну */
            <div className="flex items-center">
              <Image
                src="/points.png"
                alt="Points"
                height={20}
                width={20}
              />
              <p>{POINTS_TO_REFILL}</p>
            </div>
          )}
        </Button>

      </div>
    </ul>
  );
};
