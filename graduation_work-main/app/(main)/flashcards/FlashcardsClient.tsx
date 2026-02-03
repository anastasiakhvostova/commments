//Маша

"use client"; 
// Вказує, що компонент виконується на клієнті (браузері, React hooks)

import Link from "next/link"; 
// Компонент для навігації без перезавантаження сторінки

import { useEffect, useState } from "react"; 
// React hooks: useState для станів, useEffect для побічних ефектів

import { cn } from "@/lib/utils"; 
// Утиліта для умовного поєднання CSS класів

import { useLanguage } from "@/components/languageContext"; 
// Хук для отримання поточної мови інтерфейсу

import { translations } from "@/components/translations"; 
// Об'єкт перекладів текстів

import { Button } from "@/components/ui/button"; 
// Кнопка з вашої бібліотеки UI

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"; 
// Компоненти модального вікна (діалог)

// -----------------------
// TYPES
// -----------------------

type Flashcard = {
  id: number; 
  // унікальний ID картки
  word: string; 
  // слово на вивченні
  translation_ua: string; 
  // переклад українською
  translation_en: string; 
  // переклад англійською
  translation_de: string; 
  // переклад німецькою
  audioSrc: string | null; 
  // шлях до аудіо або null
};

type Props = {
  flashcards: Flashcard[]; 
  // масив карток для відображення
  hasProgress: boolean; 
  // чи користувач почав навчання
};

// -----------------------
// COMPONENT
// -----------------------

export const FlashcardsPracticeClient = ({ flashcards, hasProgress }: Props) => {
  const { lang } = useLanguage(); 
  // Поточна мова
  const t = translations[lang]; 
  // Вибрані переклади для цієї мови

  const [open, setOpen] = useState(false); 
  // Стан модального вікна "немає прогресу"
  const [cards, setCards] = useState<Flashcard[]>([]); 
  // Відсортовані/перемішані картки
  const [currentIndex, setCurrentIndex] = useState(0); 
  // Індекс поточної картки
  const [showTranslation, setShowTranslation] = useState(false); 
  // Чи показувати переклад

  // -----------------------
  // SHOW DIALOG IF NO PROGRESS
  // -----------------------
  useEffect(() => {
    if (!hasProgress) {
      setOpen(true); 
      // Якщо користувач не почав навчання — відкриваємо діалог
    }
  }, [hasProgress]);

  // -----------------------
  // SHUFFLE CARDS
  // -----------------------
  useEffect(() => {
    setCards([...flashcards].sort(() => Math.random() - 0.5)); 
    // Перемішуємо картки для практики
  }, [flashcards]);

  if (!cards.length) return null; 
  // Якщо немає карток — нічого не рендеримо

  const card = cards[currentIndex]; 
  // Поточна картка

  const translation =
    lang === "ua"
      ? card.translation_ua
      : lang === "en"
      ? card.translation_en
      : card.translation_de; 
  // Вибираємо переклад залежно від мови

  return (
    <>
      {/* ===== NO PROGRESS DIALOG ===== */}
      <Dialog open={open} onOpenChange={setOpen}>
        {/* Модальне вікно */}
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center">
              {t.leaderboardNoProgressTitle} 
              {/* Заголовок модалки */}
            </DialogTitle>

            <DialogDescription className="text-center mt-2">
              {t.leaderboardNoProgressText} 
              {/* Опис модалки */}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 flex justify-center">
            <Link
              href="/countries"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              {t.goToCountries} 
              {/* Кнопка переходу до вибору країн */}
            </Link>
          </div>
        </DialogContent>
      </Dialog>

      {/* ===== FLASHCARDS CONTENT ===== */}
      <div
        className={cn(
          "w-full max-w-3xl mx-auto text-center transition-all",
          !hasProgress && "grayscale opacity-50 pointer-events-none"
          // якщо прогресу немає — робимо контент сірим і неклікабельним
        )}
      >
        {/* TITLE */}
        <h1 className="text-3xl font-bold mb-10">
          {t.flashcards} 
          {/* Заголовок "Флеш-картки" */}
        </h1>

        {/* CARD */}
        <div className="bg-white rounded-2xl shadow-md px-10 py-12 mb-8">
          <div className="text-4xl font-bold mb-6">
            {card.word} 
            {/* Слово картки */}
          </div>

          {showTranslation && (
            <div className="text-lg font-medium mb-6">
              {translation} 
              {/* Показ перекладу */}
            </div>
          )}

          <div className="flex justify-center gap-3">
            <Button onClick={() => setShowTranslation(v => !v)}>
              {showTranslation ? t.hideTranslation : t.showTranslation} 
              {/* Кнопка показати/сховати переклад */}
            </Button>

            {card.audioSrc && (
              <Button
                variant="secondary"
                onClick={() => new Audio(card.audioSrc!).play()} 
                // Відтворення аудіо слова
              >
                {t.playAudio}
              </Button>
            )}
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="flex justify-center gap-4 mb-2">
          <Button
            variant="primaryOutline"
            onClick={() =>
              setCurrentIndex(
                i => (i - 1 + cards.length) % cards.length 
                // Перехід до попередньої картки циклічно
              )
            }
          >
            {t.prev} 
            {/* Попередня */}
          </Button>

          <Button
            onClick={() =>
              setCurrentIndex(
                i => (i + 1) % cards.length 
                // Перехід до наступної картки циклічно
              )
            }
          >
            {t.next} 
            {/* Наступна */}
          </Button>
        </div>

        <div className="text-sm text-gray-500">
          {currentIndex + 1} / {cards.length} 
          {/* Індекс поточної картки / загальна кількість */}
        </div>
      </div>
    </>
  );
};
