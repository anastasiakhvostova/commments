//Лера

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/languageContext";
import { translations } from "@/components/translations";
import { Items } from "./items"; // Компонент з кнопками для поповнення сердець
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

type Props = {
  points: number;
  hearts: number;
  hasProgress: boolean; // Чи користувач почав навчання
};

export const ShopList = ({ points, hearts, hasProgress }: Props) => {
  const { lang } = useLanguage(); // поточна мова
  const t = translations[lang]; // словник перекладів

  const [open, setOpen] = useState(false);

  /* -----------------------------------------------
     Відкриваємо діалог, якщо користувач ще не має прогресу
     ----------------------------------------------- */
  useEffect(() => {
    if (!hasProgress) {
      setOpen(true);
    }
  }, [hasProgress]);

  return (
    <>
      {/* ===== DIALOG: NO PROGRESS ===== */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center">
              {t.leaderboardNoProgressTitle}
            </DialogTitle>

            <DialogDescription className="text-center mt-2">
              {t.leaderboardNoProgressText}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 flex justify-center">
            <Link
              href="/countries"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              {t.goToCountries}
            </Link>
          </div>
        </DialogContent>
      </Dialog>

      {/* ===== SHOP CONTENT ===== */}
      <div
        className={cn(
          "w-full flex-col items-center transition-all",
          !hasProgress && "grayscale opacity-50 pointer-events-none" // блокуємо доступ, якщо немає прогресу
        )}
      >
        {/* Логотип магазину */}
        <Image
          src="/shop.png"
          alt="Shop"
          width={90}
          height={90}
          className="mx-auto"
        />

        {/* Заголовок */}
        <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
          {t.sidebarShop}
        </h1>

        {/* Опис */}
        <p className="text-muted-foreground text-center text-lg mb-6">
          {t.shopDescription}
        </p>

        {/* Список предметів для покупки */}
        <Items hearts={hearts} points={points} />
      </div>
    </>
  );
};
