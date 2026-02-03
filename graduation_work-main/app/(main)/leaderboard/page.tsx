//Маша

import { FeedWrapper } from "@/components/feed-wrapper"; 
// Контейнер для основного контенту сторінки (правий блок)

import { StickyWrapper } from "@/components/sticky-wrapper"; 
// Контейнер для "липкого" бокового меню (лівий блок, залишається видимим при скролі)

import { UserProgress } from "@/components/user-progress"; 
// Компонент, який показує прогрес користувача: серця, поінти, активний курс

import { getTopTenUsers, getUserProgress } from "@/db/queries"; 
// Функції для отримання топ-10 користувачів та прогресу поточного користувача

import { Feedback } from "@/components/Feedback"; 
// Форма для відгуків користувача

import { Quests } from "@/components/quests"; 
// Компонент квестів (завдань користувача)

import { LeaderboardClient } from "./LeaderboardClient"; 
// Клієнтський компонент рейтингу користувачів

// -----------------------
// Основна сторінка лідерборду
// -----------------------
const LeaderboardPage = async () => {
  // Виконуємо серверний запит для отримання даних
  const [userProgress, leaderboard] = await Promise.all([
    getUserProgress(), // прогрес поточного користувача
    getTopTenUsers(),  // топ-10 користувачів для лідерборду
  ]);

  const hasProgress = !!userProgress?.activeRegion; 
  // true, якщо користувач розпочав навчання

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      {/* 
        flex-row-reverse → контент і бокове меню поміняні місцями
        gap-[48px] → відстань між блоками
        px-6 → горизонтальні відступи
      */}

      <StickyWrapper>
        {/* Лівий "липкий" блок */}
        {userProgress && (
          <>
            <UserProgress
              activeCourse={userProgress.activeRegion} 
              hearts={userProgress.hearts} 
              points={userProgress.points} 
            />
            {/* Відображає прогрес користувача */}

            <Quests points={userProgress.points} />
            {/* Відображає квести користувача */}
          </>
        )}
        <Feedback />
        {/* Форма відгуків */}
      </StickyWrapper>

      <FeedWrapper>
        {/* Правий основний блок */}
        <LeaderboardClient
          leaderboard={leaderboard} 
          hasProgress={hasProgress} 
          // Передаємо список користувачів та чи користувач має прогрес
        />
      </FeedWrapper>
    </div>
  );
};

export default LeaderboardPage; 
// Експортуємо компонент як сторінку Next.js
