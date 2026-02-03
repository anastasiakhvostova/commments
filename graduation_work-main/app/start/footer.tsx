"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useLanguage } from "@/components/languageContext";

export const Footer = () => {
  const { lang, setLang } = useLanguage();

  return (
    <footer className="w-full border-t-2 border-slate-200 p-4">
      <div className="max-w-screen-lg mx-auto flex flex-col items-center justify-center gap-4">
        <p className="text-center text-black text-xl font-semibold">
          {lang === "ua" ? "Оберіть мову" : lang === "en" ? "Choose language" : "Sprache wählen"}
        </p>
        <div className="flex items-center justify-evenly w-full">
          <Button size="lg" variant="ghost" onClick={() => setLang("ua")}>
            <Image src="/ukraine.png" alt="UA" height={32} width={40} className="mr-4 rounded-md" />
            Українська
          </Button>

          <Button size="lg" variant="ghost" onClick={() => setLang("de")}>
            <Image src="/germany.png" alt="DE" height={32} width={40} className="mr-4 rounded-md" />
            Deutsch
          </Button>

          <Button size="lg" variant="ghost" onClick={() => setLang("en")}>
            <Image src="/britain.png" alt="EN" height={32} width={40} className="mr-4 rounded-md" />
            English
          </Button>
        </div>
      </div>
    </footer>
  );
};

