//Маша

"use client"; 
// Виконується на клієнті, можна використовувати React хук і стан

// ----------------------
// Імпорти
// ----------------------
import { redirect } from "next/navigation"; 
// Для перенаправлення користувача, якщо не пройшов guard

import { StickyWrapper } from "@/components/sticky-wrapper"; 
// Компонент, який робить фіксовану колонку зліва (hearts, quests, feedback)

import { FeedWrapper } from "@/components/feed-wrapper"; 
// Основний контент (праворуч)

import { Header } from "./header"; 
// Заголовок уроку з кнопкою "назад"

import { UserProgress } from "@/components/user-progress"; 
// Відображає hearts, points та активний курс

import {
  getUserProgress,
  getUnits,
  getLessonPercantage,
  getRegionProgress,
} from "@/db/queries"; 
// Асинхронні запити до бази даних

import { Unit } from "./unit"; 
// Компонент для відображення окремого блока unit (пакет уроків)

import { Quests } from "@/components/quests"; 
// Компонент для квестів

import { RegionImage } from "@/components/current_region_image"; 
// Картинка активного регіону

import { Feedback } from "@/components/Feedback"; 
// Форма зворотного зв'язку

// ----------------------
// Компонент LearnPage
// ----------------------
const LearnPage = async () => {
  // ----------------------
  // Отримуємо дані з бази паралельно
  // ----------------------
  const userProgressData = getUserProgress(); 
  const unitsData = getUnits(); 
  const regionProgressData = getRegionProgress(); 
  const lessonPercentageData = getLessonPercantage(); 

  const [userProgress, units, regionProgress, lessonPercentage] =
    await Promise.all([
      userProgressData,
      unitsData,
      regionProgressData,
      lessonPercentageData,
    ]);
  // await Promise.all() для одночасного очікування всіх запитів

  // ----------------------
  // 🔐 Базові захисні guard-и
  // ----------------------
  if (!userProgress || !userProgress.activeRegion) {
    redirect("/countries"); 
    // Якщо прогрес користувача відсутній або регіон не вибрано — перекидаємо на вибір країни
  }

  if (!regionProgress) {
    redirect("/countries"); 
    // Якщо прогрес по регіону не знайдено — перекидаємо на країни
  }

  if (!userProgress.activeRegion.countryId) {
    redirect("/countries"); 
    // Перевірка на наявність countryId (звужує тип)
  }

  // ----------------------
  // Поточна мова користувача
  // ----------------------
  const lang = userProgress.lang as "ua" | "en" | "de"; 

  // Назва регіону з перекладом
  const regionTitle =
    userProgress.activeRegion.translations?.[lang] ??
    userProgress.activeRegion.title; 
  // Якщо переклад відсутній — показуємо default title

  // ----------------------
  // JSX компонента
  // ----------------------
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      {/* ---------------------- */}
      {/* Сторона Sticky (ліворуч) */}
      {/* ---------------------- */}
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeRegion}
          hearts={userProgress.hearts}
          points={userProgress.points}
        />
        <Quests points={userProgress.points} />
        <RegionImage activeRegionId={userProgress.activeRegion.id} />
        <Feedback />
      </StickyWrapper>

      {/* ---------------------- */}
      {/* Основна колонка праворуч */}
      {/* ---------------------- */}
      <FeedWrapper>
        <Header
          title={regionTitle} 
          countryId={userProgress.activeRegion.countryId} 
        />

        {/* Перебір юнітів */}
        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id} 
              order={unit.order} 
              title={unit.title} 
              description={unit.description} 
              lessons={unit.lessons} 
              activeLesson={regionProgress.activeLesson} 
              activeLessonPercentage={lessonPercentage} 
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
