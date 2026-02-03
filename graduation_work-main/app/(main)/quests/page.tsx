//Маша
// ========================
// Це сторінка квестів користувача
// ========================

import { FeedWrapper } from "@/components/feed-wrapper"; // Основна область контенту
import { StickyWrapper } from "@/components/sticky-wrapper"; // Фіксована бокова панель
import { UserProgress } from "@/components/user-progress"; // Прогрес користувача: серця, поінти
import { getUserProgress } from "@/db/queries"; // Функція для отримання прогресу користувача
import { Feedback } from "@/components/Feedback"; // Форма зворотного зв’язку
import { QuestsList } from "./QuestsList"; // Список квестів

// ========================
// Асинхронна сторінка QuestsPage
// ========================
const QuestsPage = async () => {
  // Отримуємо прогрес користувача з бази
  const userProgress = await getUserProgress();

  // Перевірка: чи є у користувача активний регіон
  const hasProgress = !!userProgress?.activeRegion;

  return (
    // Основний контейнер: флекс, дві колонки
    <div className="flex flex-row-reverse gap-[48px] px-6">

      {/* ------------------ */}
      {/* Бокова панель */}
      {/* ------------------ */}
      <StickyWrapper>
        {userProgress && (
          <UserProgress
            activeCourse={userProgress.activeRegion} // Активний курс/регіон
            hearts={userProgress.hearts} // Кількість сердець
            points={userProgress.points} // Кількість поінтів
          />
        )}
        <Feedback /> {/* Форма для зворотного зв’язку */}
      </StickyWrapper>

      {/* ------------------ */}
      {/* Основна область контенту */}
      {/* ------------------ */}
      <FeedWrapper>
        <QuestsList
          points={userProgress?.points ?? 0} // Передаємо поінти користувача
          hasProgress={hasProgress} // Чи є прогрес для блокування/розблокування контенту
        />
      </FeedWrapper>
    </div>
  );
};

// ========================
// Експорт сторінки за замовчуванням
// ========================
export default QuestsPage;
