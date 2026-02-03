//Маша
// ----------------------
// Імпорти
// ----------------------
import { lessons, units } from "@/db/schema"; // схеми таблиць lessons та units з бази даних
import { UnitBanner } from "./unit-banner"; // компонент банера юніта
import { LessonButton } from "./lesson-button"; // кнопка для уроку

// ----------------------
// Типи Props
// ----------------------
type Props = {
  id: number; // id юніта
  order: number; // порядок юніта
  title: string; // назва юніта
  description: string; // опис юніта
  lessons: (typeof lessons.$inferSelect & { completed: boolean })[]; 
  // масив уроків з додатковим полем completed
  activeLesson: (typeof lessons.$inferSelect & {
    unit?: typeof units.$inferSelect;
  }) | undefined; 
  // поточний активний урок (може бути undefined)
  activeLessonPercentage: number; // прогрес поточного уроку у відсотках
};

// ----------------------
// Компонент Unit
// ----------------------
export const Unit = ({
  id,
  order,
  title,
  description,
  lessons,
  activeLesson,
  activeLessonPercentage,
}: Props) => {
  return (
    <>
      {/* Банер юніта */}
      <UnitBanner title={title} description={description} />

      {/* Контейнер для уроків */}
      <div className="flex items-center flex-col relative">
        {/* Перебираємо всі уроки юніта */}
        {lessons.map((lesson, index) => {
          // Перевіряємо, чи цей урок є поточним
          const isCurrent = lesson.id === activeLesson?.id;

          // Локдимо урок, якщо він ще не завершений і не поточний
          const isLocked = !lesson.completed && !isCurrent;

          // Обчислюємо відсоток прогресу для уроку
          const percentage = isCurrent
            ? activeLessonPercentage // для поточного уроку
            : lesson.completed
            ? 100 // якщо урок завершений
            : 0; // якщо урок ще не завершений

          // Повертаємо компонент кнопки уроку
          return (
            <LessonButton
              key={lesson.id} // унікальний ключ для списку
              id={lesson.id} // id уроку
              index={index} // порядковий номер уроку у списку
              totalCount={lessons.length} // загальна кількість уроків
              current={isCurrent} // чи це поточний урок
              locked={isLocked} // чи урок заблокований
              completed={lesson.completed} // чи урок завершений
              percentage={percentage} // прогрес уроку у %
            />
          );
        })}
      </div>
    </>
  );
};
