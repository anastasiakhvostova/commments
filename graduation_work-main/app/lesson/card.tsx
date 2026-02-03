//Маша
import { challenges } from "@/db/schema"; // Структура таблиці challenges для типів
import { cn } from "@/lib/utils"; // Утиліта для умовного додавання класів
import Image from "next/image"; // Компонент Next.js для зображень
import { useCallback } from "react"; // Хук для мемоізації функцій
import { useAudio, useKey } from "react-use"; // Хуки для роботи з аудіо та клавішами

type Props = {
  id: number;
  imageSrc: string | null; // Джерело зображення для карти
  audioSrc: string | null; // Джерело аудіо для карти
  text: string; // Текст на карті
  shortcut: string; // Клавіша-шорткат для вибору карти
  selected?: boolean; // Вибрана карта чи ні
  onClick: () => void; // Обробник кліку
  disabled?: boolean; // Чи карта недоступна
  status?: "correct" | "wrong" | "none"; // Статус відповіді
  type: typeof challenges.$inferInsert["type"]; // Тип карти (наприклад ASSIST)
};

// ================= Компонент Card =================
// Відповідальний: Frontend Developer
// Призначення: відображення однієї карти завдання з підтримкою аудіо, зображення, клавіатурного шорткату
// --------------------------------------------------
export const Card = ({
  id,
  imageSrc,
  audioSrc,
  text,
  shortcut,
  selected,
  onClick,
  disabled,
  status,
  type,
}: Props) => {

  // ================= Ініціалізація аудіо =================
  // Відповідальний: Frontend Developer
  // Якщо є audioSrc, створюємо аудіо за допомогою useAudio
  const [audio, _, controls] = audioSrc
    ? useAudio({ src: audioSrc })
    : [null, null, { play: () => {} }]; // Пустий об’єкт, якщо аудіо немає

  // ================= Обробка кліку =================
  // Відповідальний: Frontend Developer
  const handleClick = useCallback(() => {
    if (disabled) return; // Не робимо нічого, якщо карта заблокована

    if (audioSrc) {
      controls.play(); // Відтворюємо аудіо при кліку
    }

    onClick(); // Викликаємо переданий зовнішній обробник
  }, [disabled, audioSrc, onClick, controls]);

  // ================= Виклик через клавішу =================
  // Відповідальний: Frontend Developer
  useKey(shortcut, handleClick, {}, [handleClick]);

  // ================= Рендер карти =================
  // Відповідальний: Frontend Developer
  return (
    <div
      onClick={handleClick}
      className={cn(
        "h-full border-2 rounded-xl border-b-4 p-4 lg:p-6 cursor-pointer transition-all duration-200 ease-out",
        "bg-white hover:bg-yellow-50",
        "border-gray-300 active:border-b-2",
        selected && "border-sky-300 bg-sky-100 hover:bg-sky-100", // Стиль для вибраної карти
        selected && status === "correct" && "border-green-300 bg-green-100 hover:bg-green-100", // Відповідь правильна
        selected && status === "wrong" && "border-rose-300 bg-rose-100 hover:bg-rose-100", // Відповідь неправильна
        disabled && "pointer-events-none hover:bg-white", // Блокуємо недоступну карту
        type === "ASSIST" && "lg:p-3 w-full" // Стиль для допоміжних карт
      )}
    >
      {/* Аудіо */}
      {audioSrc && audio}

      {/* Зображення */}
      {imageSrc && (
        <div className="relative aspect-square mb-4 max-h-[80px] lg:max-h-[150px] w-full">
          <Image src={imageSrc} fill alt={text} sizes="100%" />
        </div>
      )}

      {/* Текст та шорткат */}
      <div
        className={cn(
          "flex items-center justify-between",
          type === "ASSIST" && "flex-row-reverse"
        )}
      >
        {type === "ASSIST" && <div />} {/* Пустий блок для вирівнювання ASSIST */}

        {/* Текст карти */}
        <p
          className={cn(
            "text-neutral-600 text-lg lg:text-xl font-medium",
            selected && "text-sky-500",
            selected && status === "correct" && "text-green-500",
            selected && status === "wrong" && "text-rose-500"
          )}
        >
          {text}
        </p>

        {/* Шорткат */}
        <div
          className={cn(
            "lg:w-[34px] lg:h-[34px] w-[26px] h-[26px] border-2 flex items-center justify-center rounded-lg text-neutral-400 lg:text-base text-sm font-semibold",
            selected && "border-sky-300 text-sky-500",
            selected && status === "correct" && "border-green-500 text-green-500",
            selected && status === "wrong" && "border-rose-500 text-rose-500"
          )}
        >
          {shortcut}
        </div>
      </div>
    </div>
  );
};
