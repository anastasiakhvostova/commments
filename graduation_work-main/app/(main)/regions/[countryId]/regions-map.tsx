//Лера

"use client";
// ⬆️ Вказує Next.js, що це CLIENT COMPONENT
// Потрібно, бо тут використовуються React-хуки (useRouter, useTransition, useLanguage)

// ---------------------- ІМПОРТИ ----------------------
import { useRouter } from "next/navigation";
// ⬅️ Хук Next.js для клієнтської навігації (router.push)

import { useTransition } from "react";
// ⬅️ React-хук для керування асинхронними переходами без блокування UI

import { toast } from "sonner";
// ⬅️ Бібліотека для toast-повідомлень (помилки, успіх)

import { upsertUserProgressRegion } from "@/actions/user-progress";
// ⬅️ Server Action: зберігає або оновлює активний регіон користувача

import { DIALECT_MAPS } from "../map-config";
// ⬅️ Конфігурація карт:
// SVG-шляхи регіонів, viewBox, розміри, картинки

import { translations } from "@/components/translations";
// ⬅️ Усі тексти інтерфейсу для різних мов

import { useLanguage } from "@/components/languageContext";
// ⬅️ Контекст мови користувача

// ---------------------- ТИПИ ----------------------
type Props = {
  countryId: number;              // ID країни
  activeRegionId: number | null;  // Поточний активний регіон користувача
};

// ---------------------- КОМПОНЕНТ ----------------------
export const DialectMap = ({ countryId, activeRegionId }: Props) => {
  // Отримуємо конфігурацію карти для конкретної країни
  const config = DIALECT_MAPS[countryId];

  const router = useRouter();
  // ⬅️ Для переходу на сторінку /learn

  const [pending, startTransition] = useTransition();
  // ⬅️ pending — чи виконується асинхронна дія
  // ⬅️ startTransition — запускає non-blocking async дію

  const { lang } = useLanguage();
  // ⬅️ Поточна мова інтерфейсу

  // Якщо для цієї країни немає карти — нічого не рендеримо
  if (!config) return null;

  // Деструктуризація конфігурації карти
  const { viewBox, imageSrc, imageWidth, imageHeight } = config;

  // ---------------------- АДАПТИВНА ШИРИНА КАРТИ ----------------------
  const containerMaxWidth =
    countryId === 2
      ? "max-w-[600px]"
      : countryId === 3
      ? "max-w-[700px]"
      : "max-w-[900px]";
  // ⬅️ Різні країни мають різні пропорції карт

  // ---------------------- ТОВЩИНА ОБВОДКИ ПРИ HOVER ----------------------
  const hoverStrokeWidthClass =
    countryId === 2
      ? "hover:stroke-[2]"
      : countryId === 3
      ? "hover:stroke-[2]"
      : "hover:stroke-[30]";
  // ⬅️ Для великих карт потрібна більша обводка

  // ---------------------- ОБРОБНИК КЛІКУ ПО РЕГІОНУ ----------------------
  const handleClick = (id: number) => {
    if (pending) return;
    // ⬅️ Захист від подвійного кліку

    // Якщо регіон уже активний — просто переходимо до навчання
    if (id === activeRegionId) {
      router.push("/learn");
      return;
    }

    // Інакше — оновлюємо прогрес користувача
    startTransition(async () => {
      try {
        await upsertUserProgressRegion(id);
        // ⬅️ Зберігаємо новий активний регіон

        router.push("/learn");
        // ⬅️ Переходимо до навчання
      } catch {
        toast.error("Something went wrong");
        // ⬅️ Повідомлення про помилку
      }
    });
  };

  // ---------------------- JSX ----------------------
  return (
    <div className="w-full flex justify-center mt-6">
      <div className={`relative w-full ${containerMaxWidth}`}>

        {/* SVG-КАРТА */}
        <svg
          viewBox={viewBox}
          className="w-full h-auto rounded-xl"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Фонова картинка */}
          <image
            href={imageSrc}
            x="0"
            y="0"
            width={imageWidth ?? 9105}
            height={imageHeight ?? 5890}
            preserveAspectRatio="xMidYMid meet"
          />

          {/* КЛІКАБЕЛЬНІ РЕГІОНИ */}
          {config.regions.map((region) => (
            <path
              key={region.id}
              d={region.d} // SVG-шлях регіону
              onClick={() => handleClick(region.id)}
              fill="transparent"
              stroke="transparent"
              className={`
                cursor-pointer
                transition
                hover:fill-black/10
                hover:stroke-white/70
                ${hoverStrokeWidthClass}
              `}
            >
              <title>{region.name}</title>
              {/* Назва регіону при наведенні */}
            </path>
          ))}
        </svg>

        {/* ---------------------- ЛЕГЕНДА (UA) ---------------------- */}
        {countryId === 1 && (
          <div className="absolute left-6 bottom-6 rounded-2xl bg-white/95 backdrop-blur px-6 py-4 shadow-md border">
            <p className="text-xs font-semibold mb-2">
              {translations[lang].colorLegendTitle}
            </p>

            <div className="flex flex-col gap-1.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ff6b6b]" />
                <span>{translations[lang].dialects.ua.red}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#ffd75a]" />
                <span>{translations[lang].dialects.ua.yellow}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#7ab9ff]" />
                <span>{translations[lang].dialects.ua.blue}</span>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------- ЛЕГЕНДА (DE) ---------------------- */}
        {countryId === 2 && (
          <div className="absolute left-0 top-1/2 -translate-x-[85%] -translate-y-1/2 rounded-xl bg-white/95 px-6 py-4 shadow-md border max-w-[320px]">
            <p className="text-sm font-semibold mb-3">
              {translations[lang].colorLegendTitle}
            </p>

            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-center gap-3">
                <span className="h-4 w-4 rounded-full bg-[#7ab9ff]" />
                <span>{translations[lang].dialects.de.blue}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="h-4 w-4 rounded-full bg-[#ffd75a]" />
                <span>{translations[lang].dialects.de.yellow}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="h-4 w-4 rounded-full bg-[#ffa94d]" />
                <span>{translations[lang].dialects.de.orange}</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
