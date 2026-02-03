//Лера

// ================= FooterClient.tsx =================
// Компонент FooterClient — це UI футер для уроків, який відображає статус відповіді
// і надає кнопку для перевірки або переходу далі.

"use client";

import { useKey, useMedia } from "react-use"; // Хуки для клавіш та медіа-запитів
import { CheckCircle, XCircle } from "lucide-react"; // Іконки статусу
import { cn } from "@/lib/utils"; // Функція для комбінування класів
import { Button } from "@/components/ui/button"; // Кнопка UI
import { useLanguage } from "@/components/languageContext"; // Хук для мовної підтримки
import { translations } from "@/components/translations"; // Тексти перекладу

// ================= Типи Props =================
// Відповідальний: Frontend Developer
type Props = {
  onCheck: () => void; // Функція для перевірки відповіді
  status: "correct" | "wrong" | "none" | "completed"; // Поточний статус завдання
  disabled?: boolean; // Чи вимкнена взаємодія
  lessonId?: number; // ID уроку, для переходу далі (опційно)
};

// ================= Компонент FooterClient =================
// Відповідальний: Frontend Developer
// Призначення: Відображає статус відповіді користувача та кнопки для взаємодії
const FooterClient = ({
  onCheck,
  status,
  disabled,
  lessonId,
}: Props) => {
  const isMobile = useMedia("(max-width: 1024px)"); // Визначаємо мобільний розмір
  const { lang } = useLanguage(); // Отримуємо мову користувача
  const t = translations[lang].footer; // Тексти перекладу для футера

  // Обробка натискання клавіші Enter
  useKey(
    "Enter",
    () => {
      if (status === "completed" || disabled) return; // Не реагуємо, якщо завершено або вимкнено
      onCheck();
    },
    {},
    [onCheck, status, disabled]
  );

  // Обробка натискання основної кнопки
  const handlePrimaryClick = () => {
    if (status === "completed" || disabled) return; // Не реагуємо, якщо завершено або вимкнено
    onCheck();
  };

  return (
    <footer
      className={cn(
        "lg:h-[140px] h-[100px] border-t-2",
        status === "correct" && "border-transparent bg-green-100",
        status === "wrong" && "border-transparent bg-rose-100"
      )}
    >
      <div className="max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10">

        {/* Відображення статусу "correct" */}
        {status === "correct" && (
          <div className="text-green-500 font-extrabold text-xl lg:text-3xl flex items-center">
            <CheckCircle className="h-7 w-7 lg:h-12 lg:w-12 mr-4" />
            {t.correctText}
          </div>
        )}

        {/* Відображення статусу "wrong" */}
        {status === "wrong" && (
          <div className="text-rose-500 font-extrabold text-xl lg:text-3xl flex items-center">
            <XCircle className="h-7 w-7 lg:h-12 lg:w-12 mr-4" />
            {t.wrongText}
          </div>
        )}

        {/* Відображення статусу "completed" з кнопкою для переходу далі */}
        {status === "completed" && (
          <Button
            size={isMobile ? "sm" : "lg"}
            onClick={() => lessonId && (window.location.href = "/learn")}
            className="text-lg font-semibold"
          >
            {t.continueButton}
          </Button>
        )}

        {/* Основна кнопка для перевірки / наступного кроку / повтору */}
        <Button
          disabled={disabled}
          onClick={handlePrimaryClick}
          size={isMobile ? "sm" : "lg"}
          variant={status === "wrong" ? "danger" : "secondary"}
          className={cn(
            "ml-auto font-semibold text-lg px-5 py-2",
            isMobile && "text-base px-3 py-1.5"
          )}
        >
          {status === "none" && t.checkButton}
          {status === "correct" && t.nextButton}
          {status === "wrong" && t.retryButton}
        </Button>
      </div>
    </footer>
  );
};

export default FooterClient;
