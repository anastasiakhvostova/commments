"use client";

type Props = {
  userProgress: {
    activeRegion?: any;
    lang?: string | null;
  } | null;
  onClose: () => void;
};

export const ProgressModal = ({ userProgress, onClose }: Props) => {
  const lang: "ua" | "en" | "de" =
    userProgress?.lang === "en" ||
    userProgress?.lang === "de" ||
    userProgress?.lang === "ua"
      ? userProgress.lang
      : "ua";

  const messages = {
    ua: "Спершу обери країну і регіон!",
    en: "Please select a country and region first!",
    de: "Bitte wähle zuerst ein Land und eine Region aus!",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-6 max-w-sm text-center shadow-lg">
        <p className="text-lg font-bold mb-4">
          {messages[lang]}
        </p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          OK
        </button>
      </div>
    </div>
  );
};
