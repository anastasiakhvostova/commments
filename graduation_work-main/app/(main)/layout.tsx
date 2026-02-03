//Лера
// ================= MainLayout.tsx =================
import { Sidebar } from "@/components/sidebar"; // Ліве меню
import { MobileHeader } from "@/components/mobile-header"; // Хедер для мобільних

type Props = {
  children: React.ReactNode; // Контент сторінки, який буде вставлений у layout
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      {/* -------------------------------
        Мобільний хедер
        Відповідальний: Frontend Developer (UI/UX)
      -------------------------------- */}
      <MobileHeader />

      {/* -------------------------------
        Бокове меню для десктопу
        Відповідальний: Frontend Developer (UI/UX)
      -------------------------------- */}
      <Sidebar className="hidden lg:flex" />

      {/* -------------------------------
        Основна зона контенту
        Відповідальний: Frontend Developer
      -------------------------------- */}
      <main className="lg:pl-[256px] h-full pt-[50px] lg:pt-0">
        <div className="max-w-[1056px] mx-auto pt-6 h-full">
          {children} {/* Динамічний контент сторінок */}
        </div>
      </main>
    </>
  );
};

export default MainLayout;
