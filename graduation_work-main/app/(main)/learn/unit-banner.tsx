//Маша

// Імпортуємо компонент UnitBannerClient — це реальний банер з усією логікою
import UnitBannerClient from "./unit-banner-client";

// ----------------------
// Типи Props
// ----------------------
type Props = {
  title: string;        // Назва юніта
  description: string;  // Опис юніта
};

// ----------------------
// Обгортка UnitBanner
// ----------------------
export const UnitBanner = (props: Props) => {
  // Просто передаємо всі пропси у UnitBannerClient
  // Це дає змогу додатково керувати/обгортати компонент у майбутньому
  return <UnitBannerClient {...props} />;
};

//  id: 10,
//     regionId: 16,
//     title: {
//       ua: "Додаток",
//       en: "Appendix",
//       de: "Anhang",
//     },
//     description: {
//       ua: "Перед тим, як практикуватися, радимо прочитати навчальні матеріали",
//       en: "Before practicing, we recommend reading the learning materials",
//       de: "Bevor Sie üben, empfehlen wir, die Lernmaterialien zu lesen",
//     },
//     order: 1,