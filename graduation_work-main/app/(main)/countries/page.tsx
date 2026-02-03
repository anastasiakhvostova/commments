//Лера

import { getCountries, getUserProgress } from "@/db/queries";
// Імпортуємо серверні функції для отримання списку країн і прогресу користувача

import { List } from "./list";
// Імпорт компонента, який рендерить всі картки країн

import Link from "next/link";
// Для переходу між сторінками без перезавантаження

import { ArrowLeft } from "lucide-react";
// Іконка стрілки вліво

import { Button } from "@/components/ui/button";
// UI-компонент кнопки з бібліотеки

import CountriesHeader from "./countries-header";
// Імпорт заголовка сторінки (назва + кнопка назад)

const CountriesPage = async () => { 
// Функціональний асинхронний компонент сторінки (Next.js 13+ server component)
  
  const countriesData = getCountries(); 
  // Викликаємо функцію для отримання країн (Promise)

  const userProgressData = getUserProgress(); 
  // Викликаємо функцію для отримання прогресу користувача (Promise)

  const [countries, userProgress] = await Promise.all([
    countriesData,
    userProgressData,
  ]); 
  // Одночасно чекаємо на обидва запити, щоб прискорити виконання

  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      {/* Контейнер сторінки:
          - h-full → висота на всю доступну область
          - max-w-[912px] → максимальна ширина контейнера
          - px-3 → горизонтальні паддінги
          - mx-auto → центрування по горизонталі
      */}

      <CountriesHeader />
      {/* Рендер заголовку з кнопкою "назад" та заголовком сторінки */}

      <List
        countries={countries}
        // Передаємо масив країн для відображення
        activeCountryId={userProgress?.activeCountryId ?? null} 
        // Передаємо активну країну, якщо вона є у прогресі
        lang={userProgress?.lang ?? "ua"} 
        // Поточна мова інтерфейсу (за замовчуванням українська)
      />
      {/* Рендеримо сітку карток з країнами */}
    </div>
  );
};

export default CountriesPage; 
// Експортуємо компонент сторінки, щоб Next.js міг його використовувати

