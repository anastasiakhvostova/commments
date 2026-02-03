//Лера

"use client" 
// Цей компонент виконується в браузері (React-хук useTransition).

import { countries, userProgress } from "@/db/schema"
// Імпорт типів таблиць з бази для TypeScript

import { Card } from "./card"
// Імпорт компонента картки

import { useRouter } from "next/navigation"
// Хук для навігації між сторінками

import { useTransition } from "react"
// Хук для створення "неблокуючих" переходів (low-priority updates)

type Props = {
  countries: typeof countries.$inferSelect[] // масив об'єктів країн
  activeCountryId: typeof userProgress.$inferSelect.activeCountryId // id активної країни
  lang: string // поточна мова
}

export const List = ({ countries, activeCountryId, lang }: Props) => {
  const router = useRouter() // навігація
  const [pending, startTransition] = useTransition() 
  // pending = true під час переходу, startTransition = функція для low-priority оновлення

  const onClick = (id: number) => {
    if (pending) return // блокуємо повторні кліки під час переходу
    router.push(`/regions/${id}`) // переходимо на сторінку регіону
  }

  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {/* grid layout */}
      {countries.map((country) => {
        const title =
          country.translations?.[lang as keyof typeof country.translations] ??
          country.title
        // вибираємо переклад назви країни, якщо є, інакше стандартне title

        return (
          <Card
            key={country.id} // унікальний ключ для React
            id={country.id} 
            title={title}
            imageSrc={country.imageSrc} 
            onClick={onClick} 
            disabled={pending} // блокуємо під час переходу
            active={country.id === activeCountryId} // виділяємо активну картку
          />
        )
      })}
    </div>
  )
}

