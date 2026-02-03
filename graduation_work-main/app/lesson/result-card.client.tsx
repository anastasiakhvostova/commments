//Маша

"use client"; // Вказує Next.js, що цей компонент буде працювати на клієнті (React Client Component)

import { ResultCard } from "./result-card"; // Імпорт основного компонента ResultCard
import { useLanguage } from "@/components/languageContext"; // Хук для отримання поточної мови
import { translations } from "@/components/translations"; // Файл з перекладами

// Тип пропсів для компонента ResultCardClient
// value: число балів або сердець
// variant: тип результату — "points" або "hearts"
type Props = {
  value: number;
  variant: "points" | "hearts";
};

// Функціональний компонент ResultCardClient
// Відповідальний за відображення результатів після уроку
export const ResultCardClient = ({ value, variant }: Props) => {
  // Отримуємо поточну мову з контексту
  const { lang } = useLanguage();

  // ✅ Звертаємось до перекладів конкретно для ResultCard у Quiz
  const t = translations[lang].quiz.resultCard;

  // Вибір правильної мітки залежно від варіанту
  const label = variant === "hearts" ? t.heartsLabel : t.pointsLabel;

  // Повертаємо компонент ResultCard із переданими пропсами
  return <ResultCard value={value} variant={variant} label={label} />;
};
