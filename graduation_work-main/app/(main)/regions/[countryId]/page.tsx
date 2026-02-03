//Лера

// ---------------------- Імпорти ----------------------
import { getRegionsByCountryId, getUserProgress } from "@/db/queries";
// ⬅️ Серверні функції для отримання:
// - регіонів певної країни
// - прогресу поточного користувача

import { RegionsList } from "./list";
// ⬅️ Компонент зі списком карток регіонів

import Link from "next/link";
// ⬅️ Компонент для навігації між сторінками (Next.js)

import { Button } from "@/components/ui/button";
// ⬅️ UI-кнопка

import { ArrowLeft } from "lucide-react";
// ⬅️ Іконка "назад"

import { DialectMap } from "./regions-map";
// ⬅️ Інтерактивна карта з клікабельними регіонами

import RegionHeader from "./region-header";
// ⬅️ Заголовок сторінки регіонів

// ---------------------- Типи props сторінки ----------------------
interface RegionsPageProps {
  params: Promise<{ countryId: string }>;
  // ⬅️ Параметри маршруту Next.js
  // countryId приходить як рядок з URL (/regions/[countryId])
}

// ---------------------- Server Component ----------------------
const RegionsPage = async (props: RegionsPageProps) => {
  // ⬅️ Асинхронна серверна сторінка

  const { countryId } = await props.params;
  // ⬅️ Дістаємо countryId з URL

  const countryIdNum = Number(countryId);
  // ⬅️ Перетворюємо ID країни з рядка в число

  // ---------------------- Захист від помилок ----------------------
  if (isNaN(countryIdNum)) {
    // ⬅️ Якщо ID не є числом — це помилка маршруту
    throw new Error("Invalid country ID");
  }

  // ---------------------- Запити до БД ----------------------
  const [regions, userProgress] = await Promise.all([
    getRegionsByCountryId(countryIdNum),
    // ⬅️ Отримуємо всі регіони цієї країни

    getUserProgress(),
    // ⬅️ Отримуємо прогрес користувача (активний регіон тощо)
  ]);

  // ---------------------- Рендер сторінки ----------------------
  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      {/* Контейнер сторінки з обмеженою шириною */}

      <div className="mt-4 mb-6 flex items-center gap-3">
        {/* Верхня панель з кнопкою "назад" та заголовком */}

        <Link href="/countries">
          {/* Повернення до вибору країни */}
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-black p-0 h-auto"
          >
            {/* Тут може бути ArrowLeft */}
          </Button>
        </Link>

        <RegionHeader />
        {/* Заголовок сторінки регіонів */}
      </div>

      {/* ------------------ Карта діалектів ------------------ */}
      <DialectMap
        countryId={countryIdNum}
        // ⬅️ ID країни для відображення правильної карти

        activeRegionId={userProgress?.activeRegionId ?? null}
        // ⬅️ Активний регіон користувача (якщо є)
      />
    </div>
  );
};

export default RegionsPage;
// ⬅️ Експорт сторінки
