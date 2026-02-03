//Настя
// Підключаємо базу даних через Drizzle ORM
import db from "@/db/drizzle";

// Імпортуємо схему таблиці flashcards
import { flashcards } from "@/db/schema";

// Асинхронна функція, яка повертає всі flashcards
export const getFlashcards = async () => {
  // Виконуємо запит до таблиці flashcards
  return db.query.flashcards.findMany({
    // Сортуємо результати за полем "order"
    orderBy: (fc) => fc.order,
  });
};
