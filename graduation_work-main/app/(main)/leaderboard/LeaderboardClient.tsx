//Маша

"use client"; 
// Цей компонент виконується на клієнті (React hooks працюють у браузері)

import Image from "next/image"; 
// Компонент Next.js для оптимізованого відображення зображень

import Link from "next/link"; 
// Компонент для навігації без перезавантаження сторінки

import { useEffect, useState } from "react"; 
// React hooks: useState для станів, useEffect для побічних ефектів

import { Separator } from "@/components/ui/separator"; 
// Компонент для лінії розділення

import { Avatar, AvatarImage } from "@/components/ui/avatar"; 
// Компоненти для відображення аватарів користувачів

import { useLanguage } from "@/components/languageContext"; 
// Хук для отримання поточної мови інтерфейсу

import { translations } from "@/components/translations"; 
// Об’єкт з перекладами текстів

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"; 
// Компоненти модального вікна

// -----------------------
// Типи
// -----------------------

type LeaderboardUser = {
  userId: string; 
  // унікальний ID користувача
  userName: string; 
  // ім’я користувача
  userImageSrc: string; 
  // посилання на аватар
  points: number; 
  // кількість очок/XP
};

type Props = {
  leaderboard: LeaderboardUser[]; 
  // масив користувачів у рейтингу
  hasProgress: boolean; 
  // чи користувач розпочав навчання
};

// -----------------------
// COMPONENT
// -----------------------

export const LeaderboardClient = ({ leaderboard, hasProgress }: Props) => {
  const { lang } = useLanguage(); 
  // Поточна мова інтерфейсу

  const [open, setOpen] = useState(false); 
  // Стан модального вікна, якщо немає прогресу

  useEffect(() => {
    if (!hasProgress) {
      setOpen(true); 
      // Відкриваємо діалог, якщо користувач не почав навчання
    }
  }, [hasProgress]);

  return (
    <>
      {/* ===== MODAL DIALOG ===== */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center">
              {translations[lang].leaderboardNoProgressTitle} 
              {/* Заголовок модалки */}
            </DialogTitle>

            <DialogDescription className="text-center mt-2">
              {translations[lang].leaderboardNoProgressText} 
              {/* Опис модалки */}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 flex justify-center">
            <Link
              href="/countries"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              {translations[lang].goToCountries} 
              {/* Кнопка повернення до вибору країн */}
            </Link>
          </div>
        </DialogContent>
      </Dialog>

      {/* ===== LEADERBOARD CONTENT ===== */}
      <div className="w-full flex-col items-center">
        <Image
          src="/Leardboard.png"
          alt="Leaderboard"
          width={90}
          height={90}
          className="mx-auto"
        />
        {/* Іконка/зображення рейтингу */}

        <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
          {translations[lang].leaderboardTitle} 
          {/* Заголовок "Рейтинг" */}
        </h1>

        <p className="text-muted-foreground text-center text-lg mb-6">
          {translations[lang].leaderboardDescription} 
          {/* Пояснення рейтингу */}
        </p>

        <Separator className="mb-4 h-0.5 rounded-full" /> 
        {/* Лінія розділення */}

        {leaderboard.map((user, index) => (
          <div
            key={user.userId}
            className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-yellow-200/50"
          >
            <p className="font-bold text-lime-700 mr-4">
              {index + 1} 
              {/* Місце користувача у рейтингу */}
            </p>

            <Avatar className="border bg-green-500 h-12 w-12 ml-3 mr-6">
              <AvatarImage src={user.userImageSrc} />
              {/* Аватар користувача */}
            </Avatar>

            <p className="font-bold text-neutral-800 flex-1">
              {user.userName} 
              {/* Ім’я користувача */}
            </p>

            <p className="text-muted-foreground">
              {user.points} XP 
              {/* Кількість очок користувача */}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};
