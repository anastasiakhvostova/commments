//Маша

"use client"; 
// Компонент виконується на клієнті (React), а не на сервері

// ----------------------
// Імпорти
// ----------------------
import { Check, Crown, Star } from "lucide-react"; 
// Іконки для позначення статусу уроку: завершено, останній урок, стандартний

import { CircularProgressbarWithChildren } from "react-circular-progressbar"; 
// Круговий прогресбар з можливістю вставки дітей

import "react-circular-progressbar/dist/styles.css"; 
// Стилі для прогресбару

import Link from "next/link"; 
// Для внутрішньої навігації між сторінками Next.js

import { cn } from "@/lib/utils"; 
// Утиліта для умовного поєднання класів

import { Button } from "@/components/ui/button"; 
// Компонент кнопки з UI бібліотеки проекту

import { useLanguage } from "@/components/languageContext"; 
// Хук для отримання поточної мови

import { translations } from "@/components/translations"; 
// Словник перекладів

// ----------------------
// Типи Props
// ----------------------
type Props = {
  id: number;            // ID уроку
  index: number;         // Порядковий номер уроку
  totalCount: number;    // Загальна кількість уроків
  locked?: boolean;      // Чи заблокований урок
  current?: boolean;     // Чи це поточний урок
  percentage: number;    // Відсоток завершення уроку
  completed: boolean;    // Чи урок завершено
};

// ----------------------
// Компонент LessonButton
// ----------------------
export const LessonButton = ({
  id,
  index,
  totalCount,
  locked,
  current,
  percentage,
  completed,
}: Props) => {
  const { lang } = useLanguage(); 
  // Поточна мова

  const t = translations[lang].lesson; 
  // Локалізовані тексти для уроку

  // ----------------------
  // Розрахунок позиціонування для циклічної лінії уроків
  // ----------------------
  const cycleLength = 8; 
  const cycleIndex = index % cycleLength; 
  // Щоб уроки повторювали шаблон відступів циклічно

  let indentationLevel;
  if (cycleIndex <= 2) {
    indentationLevel = cycleIndex;
  } else if (cycleIndex <= 4) {
    indentationLevel = 4 - cycleIndex;
  } else if (cycleIndex <= 6) {
    indentationLevel = 4 - cycleIndex;
  } else {
    indentationLevel = cycleIndex - 8;
  }

  const rightPosition = indentationLevel * 40; 
  // Горизонтальна позиція для "зигзагу" уроків

  // ----------------------
  // Додаткові стани уроку
  // ----------------------
  const isFirst = index === 0; 
  const isLast = index === totalCount - 1; 
  const isCompleted = completed; 

  const Icon = isCompleted ? Check : isLast ? Crown : Star; 
  // Вибір іконки: галочка, корона або стандартна

  const href = isCompleted ? `/lesson?lessonId=${id}` : "/lesson"; 
  // Лінк на урок. Якщо не завершено — веде на загальну сторінку уроків

  // ----------------------
  // JSX компонента
  // ----------------------
  return (
    <Link
      href={href} 
      aria-disabled={locked} 
      style={{ pointerEvents: locked ? "none" : "auto" }}
      // Заблоковані уроки не клікабельні
    >
      <div
        className="relative"
        style={{
          right: `${rightPosition}px`, // горизонтальне зміщення
          marginTop: isFirst && !isCompleted ? 60 : 24, 
          // додатковий відступ для першого уроку, якщо він не завершений
        }}
      >
        {current ? (
          // ----------------------
          // Поточний урок із анімацією "start"
          // ----------------------
          <div className="h-[102px] w-[102px] relative">
            <div className="absolute -top-6 left-2.5 px-3 py-2.5 border-2 font-bold uppercase text-orange-500 bg-white rounded-xl animate-bounce tracking-wide z-10">
              {t.start} 
              {/* Текст "Start" локалізований */}
              <div className="absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-x-1/2" />
              {/* Трикутник стрілки вниз */}
            </div>

            <CircularProgressbarWithChildren
              value={Number.isNaN(percentage) ? 0 : percentage} 
              // Значення прогресу (0 якщо NaN)
              styles={{
                path: { stroke: "#4ade80" }, 
                trail: { stroke: "#e5e7eb" },
              }}
            >
              <Button
                size="rounded"
                variant={locked ? "locked" : "secondary"}
                className="h-[70px] w-[70px] border-b-8"
              >
                <Icon
                  className={cn(
                    "h-10 w-10",
                    locked
                      ? "fill-neutral-400 text-neutral-400 stroke-neutral-400"
                      : "fill-primary-foreground text-primary-foreground",
                    isCompleted && "fill-none stroke-[4]"
                  )}
                />
              </Button>
            </CircularProgressbarWithChildren>
          </div>
        ) : (
          // ----------------------
          // Урок не поточний
          // ----------------------
          <Button
            size="rounded"
            variant={locked ? "locked" : "secondary"}
            className="h-[70px] w-[70px] border-b-8"
          >
            <Icon
              className={cn(
                "h-10 w-10",
                locked
                  ? "fill-neutral-400 text-neutral-400 stroke-neutral-400"
                  : "fill-primary-foreground text-primary-foreground",
                isCompleted && "fill-none stroke-[4]"
              )}
            />
          </Button>
        )}
      </div>
    </Link>
  );
};

