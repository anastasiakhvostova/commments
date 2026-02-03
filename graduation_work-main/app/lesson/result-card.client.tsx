"use client";

import { ResultCard } from "./result-card";
import { useLanguage } from "@/components/languageContext";
import { translations } from "@/components/translations";

type Props = {
  value: number;
  variant: "points" | "hearts";
};

export const ResultCardClient = ({ value, variant }: Props) => {
  const { lang } = useLanguage();

  // ✅ Тепер звертаємось прямо до resultCard під quiz
  const t = translations[lang].quiz.resultCard;
  const label = variant === "hearts" ? t.heartsLabel : t.pointsLabel;

  return <ResultCard value={value} variant={variant} label={label} />;
};

