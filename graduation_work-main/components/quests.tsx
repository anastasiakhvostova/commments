"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { quests } from "@/constant";
import { Progress } from "./ui/progress";
import { useLanguage } from "@/components/languageContext";
import { translations } from "@/components/translations";

type Props = {
  points: number;
};

export const Quests = ({ points }: Props) => {
  const { lang } = useLanguage(); // отримуємо обрану мову
  const currentQuest = quests.find((quest) => points < quest.value);

  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between w-full space-y-2">
        <h3 className="font-bold text-lg">{translations[lang].questsTitle}</h3>
        <Link href="/quests">
          <Button size="sm" variant="primaryOutline">
            {translations[lang].questsSeeAll}
          </Button>
        </Link>
      </div>
      {currentQuest ? (
  <div
    className="flex items-center w-full p-4 gap-x-4 border-t-2"
    key={currentQuest.key} // <- сюди ключ
  >
    <Image src="/points.png" alt="Points" width={60} height={60} />
    <div className="flex flex-col gap-y-2 w-full">
      <p className="text-neutral-700 text-xl font-bold">
        {translations[lang].quests[currentQuest.key]} {/* <- переклад */}
      </p>
      <Progress
        value={(points / currentQuest.value) * 100}
        className="h-3"
      />
    </div>
  </div>
) : (
  <p className="text-center text-neutral-500 font-medium">
    {translations[lang].questsCompleted}
  </p>
)}
    </div>
  )
}
