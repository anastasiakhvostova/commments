"use client";

import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { enUS, ukUA, deDE } from "@clerk/localizations";
import { Lang, useLanguage } from "@/components/languageContext";

export const clerkLocales: Record<Lang, any> = {
  ua: ukUA,
  en: enUS,
  de: deDE,
};

type Props = {
  children: ReactNode;
};

export const Providers = ({ children }: Props) => {
  const { lang } = useLanguage(); // беремо поточну мову з context
  const locale = clerkLocales[lang] || deDE;

  return (
    // Важливо: key={lang} щоб перезмонтувати Provider при зміні мови
    <ClerkProvider key={lang} localization={locale}>
      {children}
    </ClerkProvider>
  );
};
