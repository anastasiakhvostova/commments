"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePracticeModal } from "@/store/use-practice-modal";
import { useLanguage } from "@/components/languageContext";
import { translations } from "@/components/translations";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const PracticeModal = () => {
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = usePracticeModal();
  const { lang } = useLanguage();

  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center w-full justify-center mb-5">
            <Image src="/heart.png" alt="Heart" height={90} width={90} />
          </div>

          <DialogTitle className="text-center font-bold text-2xl">
            {translations[lang].quiz.practiceTitle}
          </DialogTitle>

          <DialogDescription className="text-center text-base mt-2">
            {translations[lang].quiz.practiceText}
          </DialogDescription>

          <p className="text-center text-sm text-muted-foreground mt-2">
            {translations[lang].quiz.practiceNote}
          </p>
        </DialogHeader>

        <DialogFooter className="mt-6">
          <Button
            variant="primary"
            className="w-full"
            size="lg"
            onClick={close}
          >
            {translations[lang].quiz.exit}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
