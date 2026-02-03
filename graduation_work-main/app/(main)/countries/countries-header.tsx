//Лера


"use client"; 
// Файл виконується на клієнті (браузері), а не на сервері. 
// Це означає, що він працює з React-хуками і інтерфейсом.

import Link from "next/link"; 
// Компонент Next.js для навігації між сторінками. 
// Використовується замість <a>, щоб зберегти SPA-поведінку (без перезавантаження сторінки).

import { ArrowLeft } from "lucide-react"; 
// Іконка стрілки вліво з бібліотеки Lucide. Використовується для кнопки "назад".

import { Button } from "@/components/ui/button"; 
// Кастомний UI-компонент кнопки з вашої бібліотеки компонентів.

import { useLanguage } from "@/components/languageContext"; 
// Хук для доступу до поточної мови інтерфейсу (локалізація).

import { translations } from "@/components/translations"; 
// Об’єкт з перекладами для різних мов.

const CountriesHeader = () => { 
  // Оголошення функціонального компоненту React для шапки екрану "Вибір країни".

  const { lang } = useLanguage(); 
  // Дістаємо поточну мову користувача з контексту.

  return (
    <div className="mt-4 mb-6 flex items-center gap-3">
      {/* Контейнер для шапки */}
      {/* mt-4 mb-6 – зовнішні відступи зверху та знизу */}
      {/* flex items-center – вертикальне центрування елементів */}
      {/* gap-3 – відстань між елементами */}

      <Link href="/start">
        {/* Посилання на головний екран */}
        <Button
          variant="ghost" 
          // Варіант кнопки без фону, прозорий
          title="Повернутись на головний екран"
          // Текст, що відображається при наведенні (tooltip)
          className="flex items-center gap-2 text-black p-0 h-auto"
          // flex items-center – центрування іконки та тексту
          // gap-2 – відстань між іконкою та текстом
          // text-black – колір тексту чорний
          // p-0 – паддінг 0
          // h-auto – висота автоматична
        >
          <ArrowLeft className="h-5 w-5 stroke-2 text-neutral-400" />
          {/* Іконка стрілки */}
          {/* h-5 w-5 – висота і ширина 1.25rem */}
          {/* stroke-2 – товщина лінії 2 */}
          {/* text-neutral-400 – сірий колір */}
        </Button>
      </Link>

      <h1 className="text-2xl font-bold text-neutral-700">
        {/* Заголовок сторінки */}
        {translations[lang].chooseCountry}
        {/* Беремо переклад для поточної мови */}
      </h1>
    </div>
  );
};

export default CountriesHeader; 
// Експортуємо компонент для використання в інших місцях


