"use client"; // ← обов'язково для useLanguage()

import {
  ClerkLoading,
  ClerkLoaded,
  SignInButton,
  SignedIn,
  SignedOut,
  SignUpButton,
} from "@clerk/nextjs";
import Image from "next/image";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLanguage } from "@/components/languageContext";
import { translations } from "@/components/translations";

export default function Home() {
  const { lang } = useLanguage(); // отримуємо обрану мову

  return (
    <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-8">
      {/* Ліва частина — картинка */}
      <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
        <Image src="/hero.png" fill alt="Hero" className="object-contain" />
      </div>

      {/* Права частина — текст, кнопки і підпис */}
      <div className="flex flex-col items-center gap-y-6">
        <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 max-w-[480px] text-center">
          {translations[lang].homeDescription}
        </h1>

        <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <div className="flex flex-col gap-4 w-full">
                <SignUpButton mode="modal" forceRedirectUrl="/countries">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full py-6 text-lg"
                  >
                    {translations[lang].signUpButton}
                  </Button>
                </SignUpButton>
                <SignInButton mode="modal" forceRedirectUrl="/countries">
                  <Button
                    size="lg"
                    variant="primaryOutline"
                    className="w-full py-6 text-lg"
                  >
                    {translations[lang].signInButton}
                  </Button>
                </SignInButton>
              </div>
            </SignedOut>

            <SignedIn>
              <Button
                size="lg"
                variant="secondary"
                className="w-full py-6 text-lg"
                asChild
              >
                <Link href="/countries">{translations[lang].continueLearning}</Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
}

