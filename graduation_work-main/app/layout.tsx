// app/layout.tsx
import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { PracticeModal } from "@/components/modals/practice-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";
import { ExitModal } from "@/components/modals/exit-modal";
import { LanguageProvider } from "@/components/languageContext";
import { Providers } from "./providers";

const font = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Dialecto",
  description: "Dialect learning app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body className={font.className} suppressHydrationWarning>
        <LanguageProvider>
          <Providers>
            <Toaster />
            <ExitModal />
            <HeartsModal />
            {children}
          </Providers>
        </LanguageProvider>
      </body>
    </html>
  );
}
