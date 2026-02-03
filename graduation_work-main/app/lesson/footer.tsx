//Лера

// ================= Footer.tsx =================
// Компонент Footer — це обгортка над FooterClient, яка просто передає всі пропси далі

import FooterClient from "./FooterClient";

// ================= Типи Props =================
// Відповідальний: Frontend Developer
type Props = {
  onCheck: () => void; // Функція, яка викликається при перевірці відповіді
  status: "correct" | "wrong" | "none" | "completed"; // Статус поточного завдання
  disabled?: boolean; // Чи можна взаємодіяти з кнопками
  lessonId?: number; // Ідентифікатор уроку (опційно)
};

// ================= Компонент Footer =================
// Відповідальний: Frontend Developer
// Призначення: Проста оболонка для FooterClient, щоб можна було додати логіку або props у майбутньому
export const Footer = (props: Props) => {
  // Всі пропси передаються далі у FooterClient
  return <FooterClient {...props} />;
};
