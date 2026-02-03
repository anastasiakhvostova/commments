//Лера
import Link from "next/link"; 
// Next.js компонент для внутрішньої навігації без перезавантаження сторінки

import { Button } from "@/components/ui/button"; 
// Компонент кнопки з UI бібліотеки проекту

import { ArrowLeft } from "lucide-react"; 
// Іконка стрілки вліво з бібліотеки Lucide

// -----------------------
// Типи Props
// -----------------------
type Props = {
  title: string; 
  // Заголовок, який буде показаний у хедері
  countryId?: number; 
  // ID країни (опціонально, якщо потрібно повернення до регіону)
};

// -----------------------
// Компонент Header
// -----------------------
export const Header = ({ title, countryId }: Props) => {
  return (
    <div
      className="
        sticky top-0          // Залишається "липким" вгорі при скролі
        bg-orange-50         // Світло-помаранчевий фон
        pb-3                 // Відступ знизу
        lg:pt-[28px] lg:mt-[-28px] // Коригує відступи на великих екранах
        flex items-center justify-between // Флекс-контейнер, елементи по центру та рознесені
        border-b-2           // Нижня межа
        mb-5                 // Відступ знизу
        text-neutral-400     // Колір тексту для кнопки
        lg:z-50              // Встановлюємо порядок накладання на великих екранах
        rounded-xl           // Скруглення кутів
        px-4                 // Горизонтальні відступи
      "
    >
      {countryId ? (
        // Якщо переданий countryId → показуємо кнопку "назад"
        <Link href={`/regions/${countryId}`}>
          <Button variant="ghost" title="Повернутись до вибору регіону">
            <ArrowLeft className="h-5 w-5 stroke-2 text-neutral-400" />
            {/* Іконка стрілки вліво */}
          </Button>
        </Link>
      ) : (
        // Якщо countryId не переданий → порожній блок для вирівнювання
        <div className="w-10" /> 
      )}

      {/* Заголовок */}
      <h1 className="font-bold text-lg text-neutral-700">{title}</h1>

      {/* Порожній блок справа, щоб балансувати flex layout */}
      <div />
    </div>
  );
};
