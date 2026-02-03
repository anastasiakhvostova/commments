"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage, Lang } from "./languageContext";
import { ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// ------------------------
// УНІВЕРСАЛЬНИЙ ТИП ДЛЯ COUNTRY / REGION
// ------------------------
export type CourseLike = {
  id: number;
  title: string;
  imageSrc: string;
  translations: Partial<Record<"ua" | "en" | "de", string>> | null;
};

// ------------------------
// Пропси компонента
// ------------------------
type Props = {
  activeCourse: CourseLike | null;
  hearts: number;
  points: number;
};

const languageFlags: Record<Lang, string> = {
  ua: "/flags/ua.png",
  en: "/flags/en.png",
  de: "/flags/de.png",
};

export const UserProgress = ({ activeCourse, points, hearts }: Props) => {
  const { lang, setLang } = useLanguage();

  const cycleLanguage = () => {
    const nextLang: Lang =
      lang === "ua" ? "de" : lang === "de" ? "en" : "ua";
    setLang(nextLang);
  };

  // Отримуємо правильний title з перекладу або fallback на title
  const courseTitle =
    activeCourse?.translations?.[lang] ?? activeCourse?.title ?? "";

  return (
    <div className="flex justify-end items-center gap-3 w-full">
      {/* КНОПКА МОВИ */}
      <div
        onClick={cycleLanguage}
        title="Змінити мову"
        className="
          mr-auto
          flex items-center gap-2
          bg-yellow-100
          px-3 py-1.5
          rounded-xl
          cursor-pointer
          hover:bg-yellow-200
          transition
          shadow-sm
        "
      >
        <Image
          src={languageFlags[lang]}
          alt="Мова"
          width={28}
          height={28}
          className="rounded-md"
        />
        <ArrowLeftRight size={16} className="text-yellow-700" />
      </div>
      <Button variant="ghost"
      asChild
      className="flex items-center gap-2 px-3 py-1.5 h-auto rounded-xl
                hover:bg-rose-100 transition">
         {/* БАЛИ */}
      <Link href="/quests" className="flex items-center gap-1 text-orange-500">
        <Image src="/points.png" height={28} width={28} alt="Бали" />
        <span className="font-medium">{points}</span>
      </Link>
      </Button>
     {/* СЕРЦЯ */}
    <Button
      variant="ghost"
      asChild
      className="flex items-center gap-2 px-3 py-1.5 h-auto rounded-xl
                hover:bg-rose-100 transition"
    >
      <Link href="/shop" className="flex items-center gap-2 text-rose-600">
        <Image src="/heart.png" height={22} width={22} alt="Серця" />
        <span className="font-medium">{hearts}</span>
      </Link>
    </Button>

    </div>
  );
};
