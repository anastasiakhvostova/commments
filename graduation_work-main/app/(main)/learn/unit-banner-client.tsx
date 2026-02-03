//Маша
"use client"; 
// Виконується на клієнті, можна використовувати React hooks і стан

// ----------------------
// Імпорти
// ----------------------
import Link from "next/link"; 
// Для переходів між сторінками Next.js

import { Button } from "@/components/ui/button"; 
// Кнопка з UI бібліотеки компонентів

import { NotebookText } from "lucide-react"; 
// Іконка блокнота

import { useLanguage } from "@/components/languageContext"; 
// Хук для отримання поточної мови користувача

import { translations } from "@/components/translations"; 
// Тексти для всіх мов

// ----------------------
// Типи Props
// ----------------------
type Props = {
  title: string; // Назва юніта
  description: string; // Опис юніта
};

// ----------------------
// Компонент UnitBannerClient
// ----------------------
const UnitBannerClient = ({ title, description }: Props) => {
  const { lang } = useLanguage(); 
  // Поточна мова користувача

  const t = translations[lang].unitBanner; 
  // Беремо переклад для банера юніта

  return (
    <div className="w-full rounded-xl bg-orange-300 p-5 text-gray-800 flex items-center justify-between">
      {/* Основний контейнер банера: ширина 100%, скруглені кути, фон оранжевий, padding, flex для розташування */}
      
      <div className="space-y-2.5">
        {/* Контейнер для тексту, gap між елементами */}
        <h3 className="text-2xl lg:text-3xl font-bold">
          {t.title} 
          {/* Заголовок банера (локалізований) */}
        </h3>
        <p className="text-lg lg:text-xl">
          {t.description} 
          {/* Опис банера (локалізований) */}
        </p>
      </div>

      <Link href="/practice">
        {/* Посилання на сторінку практики */}
        <Button
          size="lg"
          variant="secondary"
          className="hidden lg:flex border-2 border-b-4 active:border-b-2 text-xl font-semibold px-6 py-3"
          // Прихований на маленьких екранах, відображається на lg+
          // Стиль: рамка, товста нижня рамка, активний стан
        >
          <NotebookText className="mr-3 h-7 w-7" /> 
          {/* Іконка блокнота */}
          {t.button} 
          {/* Текст кнопки (локалізований) */}
        </Button>
      </Link>
    </div>
  );
};

export default UnitBannerClient;
