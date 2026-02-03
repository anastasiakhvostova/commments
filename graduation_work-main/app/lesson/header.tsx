//Лера

// ================= Header.tsx =================
// Компонент Header — відображає верхню панель уроку з прогресом та кількістю сердець

import { X, InfinityIcon } from "lucide-react"; // Іконки для кнопки виходу та додаткових елементів
import { Progress } from "@/components/ui/progress"; // Прогрес-бар
import Image from "next/image"; // Для відображення зображень
import { useExitModal } from "@/store/use-exit-modal"; // Хук для управління модаллю виходу

// ================= Типи Props =================
// Відповідальний: Frontend Developer
type Props = {
  hearts: number; // Кількість сердець у користувача
  percentage: number; // Прогрес у відсотках (0-100)
};

// ================= Компонент Header =================
// Відповідальний: Frontend Developer
// Призначення: Відображає верхню панель з прогресом уроку та кількістю життів
export const Header = ({
  hearts,
  percentage,
}: Props) => {
  const { open } = useExitModal(); // Функція для відкриття модалки виходу

  return (
    <header className="lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full">
      
      {/* Кнопка закриття уроку */}
      <X
        onClick={open}
        className="text-slate-500 hover:opacity-75 transition cursor-pointer"
      />

      {/* Прогрес-бар */}
      <Progress value={percentage} />

      {/* Кількість сердець */}
      <div className="flex items-center">
        <Image
          src="/heart.png"
          height={28}
          width={28}
          alt="Heart"
          className="mr-2"
        />
        {hearts}
      </div>
    </header>
  );
};
