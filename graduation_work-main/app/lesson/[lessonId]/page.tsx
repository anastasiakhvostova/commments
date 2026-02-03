//НАСТЯ І МАША
import { getLesson, getUserProgress } from "@/db/queries"; // Функції для отримання уроку та прогресу користувача
import { Quiz } from "../quiz"; // Компонент Quiz для рендеру завдань
import { redirect } from "next/navigation"; // Next.js redirect для перенаправлення користувача

type LessonPageProps = {
  searchParams?: {
    lessonId?: string; // Опційний параметр lessonId з query (?lessonId=3)
  };
};

// ================= Сторінка уроку =================
// Відповідальний: Frontend Developer
// Призначення: відображення уроку та виклику Quiz
// --------------------------------------------------
const LessonPage = async ({ searchParams }: LessonPageProps) => {
  // ================= Отримання lessonId з query =================
  // Відповідальний: Frontend Developer
  const explicitLessonId = searchParams?.lessonId
    ? Number(searchParams.lessonId)
    : undefined;

  // ================= Паралельне завантаження уроку та прогресу =================
  // Відповідальний: Frontend Developer / Backend Developer (getLesson, getUserProgress)
  const lessonPromise = getLesson(explicitLessonId); // Беремо конкретний урок, якщо передано
  const progressPromise = getUserProgress(); // Беремо прогрес користувача

  const [lesson, userProgress] = await Promise.all([
    lessonPromise,
    progressPromise,
  ]);

  // ================= Перевірка прогресу користувача =================
  // Відповідальний: Frontend Developer
  if (!userProgress) {
    // Якщо користувач не має прогресу, перенаправляємо на /learn
    redirect("/learn");
  }

  // ================= Якщо урок не знайдено =================
  // Відповідальний: Frontend Developer
  if (!lesson) {
    // Рендеримо пустий Quiz, щоб додаток не падав
    return (
      <Quiz
        initialLessonId={0}
        initialLessonChallenges={[]}
        initialHearts={userProgress.hearts}
        initialPercentage={100} // Вважаємо урок завершеним на 100%
      />
    );
  }

  // ================= Обчислення прогресу уроку =================
  // Відповідальний: Frontend Developer
  const completed = lesson.challenges.filter((c) => c.completed).length;
  const total = lesson.challenges.length || 1; // Захист від ділення на нуль
  const initialPercentage = (completed / total) * 100; // Відсоток виконаних завдань

  // ================= Рендер Quiz =================
  // Відповідальний: Frontend Developer
  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
    />
  );
};

export default LessonPage;
