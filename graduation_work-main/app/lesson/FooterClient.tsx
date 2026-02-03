"use client";

import { useKey, useMedia } from "react-use";
import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/languageContext";
import { translations } from "@/components/translations";

type Props = {
  onCheck: () => void;
  status: "correct" | "wrong" | "none" | "completed";
  disabled?: boolean;
  lessonId?: number;
};

const FooterClient = ({
  onCheck,
  status,
  disabled,
  lessonId,
}: Props) => {
  const isMobile = useMedia("(max-width: 1024px)");
  const { lang } = useLanguage();
  const t = translations[lang].footer;

  useKey(
    "Enter",
    () => {
      if (status === "completed" || disabled) return;
      onCheck();
    },
    {},
    [onCheck, status, disabled]
  );

  const handlePrimaryClick = () => {
    if (status === "completed" || disabled) return;
    onCheck();
  };

  return (
    <footer
      className={cn(
        "lg:h-[140px] h-[100px] border-t-2",
        status === "correct" && "border-transparent bg-green-100",
        status === "wrong" && "border-transparent bg-rose-100"
      )}
    >
      <div className="max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10">
        {status === "correct" && (
          <div className="text-green-500 font-extrabold text-xl lg:text-3xl flex items-center">
            <CheckCircle className="h-7 w-7 lg:h-12 lg:w-12 mr-4" />
            {t.correctText}
          </div>
        )}

        {status === "wrong" && (
          <div className="text-rose-500 font-extrabold text-xl lg:text-3xl flex items-center">
            <XCircle className="h-7 w-7 lg:h-12 lg:w-12 mr-4" />
            {t.wrongText}
          </div>
        )}

        {status === "completed" && (
          <Button
            size={isMobile ? "sm" : "lg"}
            onClick={() => lessonId && (window.location.href = "/learn")}
            className="text-lg font-semibold"
          >
            {t.continueButton}
          </Button>
        )}

        <Button
          disabled={disabled}
          onClick={handlePrimaryClick}
          size={isMobile ? "sm" : "lg"}
          variant={status === "wrong" ? "danger" : "secondary"}
          className={cn(
            "ml-auto font-semibold text-lg px-5 py-2",
            isMobile && "text-base px-3 py-1.5"
          )}
        >
          {status === "none" && t.checkButton}
          {status === "correct" && t.nextButton}
          {status === "wrong" && t.retryButton}
        </Button>
      </div>
    </footer>
  );
};

export default FooterClient;


