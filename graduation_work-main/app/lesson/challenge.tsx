//Маша

"use client"

import { challengesOptions, challenges } from "@/db/schema" // Структури БД для типів
import { cn } from "@/lib/utils" // Утиліта для умовного додавання класів
import { Card } from "./card" // Компонент для відображення окремої карти
import { WriteChallenge, WriteChallengeRef } from "./write-challenge" // Компонент для "пишучих" завдань
import { useState, useRef } from "react" // React хуки

// ================= Типи Props =================
// Відповідальний: Frontend Developer
type Props = {
  options: typeof challengesOptions.$inferSelect[] // Варіанти відповіді
  onSelect: (id: number) => void // Обробник вибору варіанту
  status: "correct" | "wrong" | "none" // Статус відповіді
  selectedOption?: number // Поточно вибраний варіант
  disabled?: boolean // Чи можна взаємодіяти
  type: typeof challenges.$inferSelect["type"] // Тип виклику (WRITE, ASSIST, тощо)
}

// ================= Компонент Challenge =================
// Відповідальний: Frontend Developer
// Призначення: Відображає завдання, яке може бути вибірковим (Card) або текстовим (WriteChallenge)
export const Challenge = ({
  options,
  onSelect,
  status,
  selectedOption,
  disabled,
  type
}: Props) => {
  const writeRef = useRef<WriteChallengeRef>(null) // Реф для WriteChallenge

  // ================= Рендер WRITE завдання =================
  // Якщо тип WRITE — віддаємо WriteChallenge
  if (type === "WRITE") {
    return (
      <WriteChallenge
        ref={writeRef} // реф для доступу до внутрішніх методів WriteChallenge
        disabled={status !== "none"} // блокуємо, якщо відповідь уже надана
      />
    )
  }

  // ================= Клас для сітки =================
  // Відповідальний: Frontend Developer
  const gridClass = cn(
    "grid gap-2",
    type === "ASSIST" 
      ? "grid-cols-1" // для ASSIST варіанти вертикально
      : "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]" // для стандартних — адаптивна сітка
  )

  // ================= Рендер Card завдань =================
  // Відповідальний: Frontend Developer
  return (
    <div className={gridClass}>
      {options.map((option, i) => (
        <Card
          key={option.id} // ключ для React
          id={option.id}
          text={option.text} // текст карти
          imageSrc={option.imageSrc} // зображення карти
          shortcut={`${i + 1}`} // клавіша-шорткат
          selected={selectedOption === option.id} // виділення вибраного
          onClick={() => onSelect(option.id)} // обробка кліку
          status={status} // статус відповіді
          audioSrc={option.audioSrc} // аудіо, якщо є
          disabled={disabled} // блокування взаємодії
          type={type} // тип карти (ASSIST, STANDARD)
        />
      ))}
    </div>
  )
}

// ================= Експорт типу WriteChallengeRef =================
// Відповідальний: Frontend Developer
export type { WriteChallengeRef }
