//маша

// ================= LessonPage.tsx =================
// Відповідальний: Frontend Developer
// Призначення: Сторінка уроку — отримує дані уроку та прогрес користувача, 
// рендерить компонент Quiz з початковими значеннями

import { getLesson, getUserProgress } from "@/db/queries"; // Функції для отримання уроку та прогресу користувача
import { Quiz } from "./quiz"; // Компонент Quiz
import { redirect } from "next/navigation"; // Для редіректу, якщо користувач не має прогресу

// ================= Типи Props =================
// Відповідальний: Frontend Developer
type LessonPageProps = {
  searchParams: Promise<{
    lessonId?: string; // lessonId передається через query параметри
  }>;
};

// ================= Компонент LessonPage =================
// Відповідальний: Frontend Developer
export default async function LessonPage(props: LessonPageProps) {
  // Очікуємо searchParams (наприклад, ?lessonId=3)
  const search = await props.searchParams;

  // Пробуємо взяти конкретний lessonId з query, якщо його нема — undefined
  const explicitLessonId = search?.lessonId
    ? Number(search.lessonId)
    : undefined;

  // Отримуємо урок та прогрес користувача паралельно
  const lessonPromise = getLesson(explicitLessonId);
  const progressPromise = getUserProgress();

  const [lesson, userProgress] = await Promise.all([
    lessonPromise,
    progressPromise,
  ]);

  // Якщо прогресу користувача нема → редірект на /learn
  if (!userProgress) redirect("/learn");

  // Якщо урок не знайдено — рендеримо порожній Quiz, щоб не падало
  if (!lesson) {
    return (
      <Quiz
        initialLessonId={0} // Немає конкретного уроку
        initialLessonChallenges={[]} // Порожній масив завдань
        initialHearts={userProgress.hearts} // Кількість сердець користувача
        initialPercentage={100} // Відсоток прогресу
      />
    );
  }

  // Обчислюємо початковий відсоток виконання уроку
  const completed = lesson.challenges.filter((c) => c.completed).length;
  const total = lesson.challenges.length || 1; // Уникаємо ділення на 0
  const initialPercentage = (completed / total) * 100;

  // Рендеримо Quiz з реальними даними уроку
  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
    />
  );
}
