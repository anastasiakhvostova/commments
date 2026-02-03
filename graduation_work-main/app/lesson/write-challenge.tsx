//мАША

"use client"; // Вказує Next.js, що цей компонент рендериться на клієнті (Client Component)

import { forwardRef, useImperativeHandle, useState } from "react";

// Тип рефа для WriteChallenge
// Ми можемо отримати значення або очистити поле з батьківського компонента
export type WriteChallengeRef = {
  getValue: () => string; // повертає поточне значення input
  clear: () => void;      // очищає input
};

// Тип пропсів для WriteChallenge
type Props = {
  disabled?: boolean;       // чи вимкнене поле
  placeholder?: string;     // текст-підказка у полі
};

// Компонент WriteChallenge з forwardRef, щоб батьківський компонент міг керувати input
export const WriteChallenge = forwardRef<WriteChallengeRef, Props>(
  ({ disabled, placeholder }, ref) => {
    // Локальний стан значення input
    const [value, setValue] = useState("");

    // Встановлюємо методи, доступні через ref
    useImperativeHandle(ref, () => ({
      getValue: () => value, // метод для отримання поточного тексту
      clear: () => setValue("") // метод для очищення поля
    }));

    return (
      // Контейнер для центрування input
      <div className="w-full flex justify-center">
        <div className="w-full max-w-xl">
          {/* Поле вводу */}
          <input
            type="text"
            value={value}                   // прив’язка до стану
            onChange={(e) => setValue(e.target.value)} // оновлення стану при введенні
            disabled={disabled}             // блокування поля при disabled
            placeholder={placeholder}       // підказка для користувача

            className="
              w-full px-5 py-3
              text-lg lg:text-xl
              rounded-2xl
              border border-neutral-300
              bg-white
              shadow-sm
              transition-all
              focus:outline-none 
              focus:ring-4 focus:ring-sky-200 
              focus:border-sky-500 
              hover:border-neutral-400
              disabled:opacity-60 disabled:cursor-not-allowed
            "
          />
        </div>
      </div>
    );
  }
);

// Встановлюємо displayName для кращого дебагу у React DevTools
WriteChallenge.displayName = "WriteChallenge";

