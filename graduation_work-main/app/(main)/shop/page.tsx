//Маша

import { FeedWrapper } from "@/components/feed-wrapper";
/*
  FeedWrapper
  — основна центральна колонка сторінки
  — тут відображається головний контент (ShopList)
*/

import { StickyWrapper } from "@/components/sticky-wrapper";
/*
  StickyWrapper
  — бічна панель, яка "прилипає" при скролі
  — містить прогрес користувача, квести, відгук
*/

import { UserProgress } from "@/components/user-progress";
/*
  UserProgress
  — компонент, який показує:
    • активний регіон
    • кількість сердець
    • кількість балів
*/

import { getUserProgress } from "@/db/queries";
/*
  getUserProgress
  — серверний запит до бази даних
  — отримує прогрес поточного користувача
*/

import { Feedback } from "@/components/Feedback";
/*
  Feedback
  — форма для надсилання відгуку
*/

import { Quests } from "@/components/quests";
/*
  Quests
  — компонент із квестами (гейміфікація)
*/

import { ShopList } from "./ShopList";
/*
  ShopList
  — основний контент сторінки магазину
  — тут реалізована покупка сердець за бали
*/


/* =====================================================
   SERVER COMPONENT — сторінка магазину
   ===================================================== */

const ShopPage = async () => {

  /* -----------------------------------------------
     Отримуємо прогрес користувача з БД
     ----------------------------------------------- */
  const userProgress = await getUserProgress();

  /* -----------------------------------------------
     Перевіряємо, чи користувач уже почав навчання
     (чи вибраний регіон)
     ----------------------------------------------- */
  const hasProgress = !!userProgress?.activeRegion;

  /* -----------------------------------------------
     Рендер сторінки
     ----------------------------------------------- */
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      {/* ===== ЛІВА / БІЧНА ПАНЕЛЬ ===== */}
      <StickyWrapper>

        {/* Показуємо прогрес тільки якщо користувач існує */}
        {userProgress && (
          <>
            <UserProgress
              activeCourse={userProgress.activeRegion}
              hearts={userProgress.hearts}
              points={userProgress.points}
            />

            {/* Квести залежать від кількості балів */}
            <Quests points={userProgress.points} />
          </>
        )}

        {/* Форма відгуку доступна завжди */}
        <Feedback />
      </StickyWrapper>

      {/* ===== ОСНОВНИЙ КОНТЕНТ ===== */}
      <FeedWrapper>
        <ShopList
          points={userProgress?.points ?? 0}
          hearts={userProgress?.hearts ?? 0}
          hasProgress={hasProgress}
        />
        {/* 
          Передаємо в ShopList:
          • points — скільки балів у користувача
          • hearts — скільки сердець
          • hasProgress — чи дозволено користуватись магазином
        */}
      </FeedWrapper>
    </div>
  );
};

export default ShopPage;
