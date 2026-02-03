//Маша
"use client"; // Цей файл виконується на клієнті, не на сервері

// ---------------------- Імпорти ----------------------
import { StickyWrapper } from "@/components/sticky-wrapper"; // Ліпка бічна панель
import { FeedWrapper } from "@/components/feed-wrapper"; // Основний скролюємий контент
import { UserProgress } from "@/components/user-progress"; // Прогрес користувача (серця, поінти)
import { Quests } from "@/components/quests"; // Квести користувача
import { RegionImage } from "@/components/current_region_image"; // Картинка активного регіону
import { Feedback } from "@/components/Feedback"; // Форма для зворотного зв’язку
import { Button } from "@/components/ui/button"; // UI кнопка
import { useLanguage } from "@/components/languageContext"; // Хук для визначення мови користувача
import { translations } from "@/components/translations"; // Переклади текстів
import Link from "next/link"; // Для навігації
import { NotebookText } from "lucide-react"; // Іконка нотатника
import { Check, Crown, Star } from "lucide-react"; // Іконки для кнопок уроків
import { CircularProgressbarWithChildren } from "react-circular-progressbar"; // Прогресбар для уроків
import "react-circular-progressbar/dist/styles.css"; // Стилі прогресбару

// ---------------------- Типи ----------------------
type Flashcard = {
  id: number;
  word: string;
  translation_ua: string;
  translation_en: string;
  translation_de: string;
  audioSrc: string | null;
};

type LeaderboardUser = {
  userId: string;
  userName: string;
  userImageSrc: string;
  points: number;
};

type PracticeProps = {
  userProgress: any;
  activeRegion: any;
  words: any[];
  videoSrc: string;
  fileSrc: string;
  fileSrcCountry: string;
};

type UnitBannerProps = {
  title: string;
  description: string;
};

type LessonButtonProps = {
  id: number;
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  percentage: number;
  completed: boolean;
};

// ---------------------- Компонент: FlashcardsPracticeClient ----------------------
export const FlashcardsPracticeClient = ({
  flashcards,
  hasProgress,
}: {
  flashcards: Flashcard[];
  hasProgress: boolean;
}) => {
  const { lang } = useLanguage();
  const t = translations[lang];

  const [open, setOpen] = useState(false);
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);

  // Показуємо діалог, якщо немає прогресу
  useEffect(() => {
    if (!hasProgress) setOpen(true);
  }, [hasProgress]);

  // Перемішуємо картки для практики
  useEffect(() => {
    setCards([...flashcards].sort(() => Math.random() - 0.5));
  }, [flashcards]);

  if (!cards.length) return null; // Якщо карток немає, нічого не рендеримо

  const card = cards[currentIndex];
  const translation =
    lang === "ua"
      ? card.translation_ua
      : lang === "en"
      ? card.translation_en
      : card.translation_de;

  return (
    <>
      {/* Діалог "немає прогресу" */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center">
              {t.leaderboardNoProgressTitle}
            </DialogTitle>
            <DialogDescription className="text-center mt-2">
              {t.leaderboardNoProgressText}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 flex justify-center">
            <Link href="/countries" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
              {t.goToCountries}
            </Link>
          </div>
        </DialogContent>
      </Dialog>

      {/* Основний контент карток */}
      <div className={`w-full max-w-3xl mx-auto text-center transition-all ${!hasProgress ? "grayscale opacity-50 pointer-events-none" : ""}`}>
        <h1 className="text-3xl font-bold mb-10">{t.flashcards}</h1>

        <div className="bg-white rounded-2xl shadow-md px-10 py-12 mb-8">
          <div className="text-4xl font-bold mb-6">{card.word}</div>
          {showTranslation && <div className="text-lg font-medium mb-6">{translation}</div>}

          <div className="flex justify-center gap-3">
            <Button onClick={() => setShowTranslation(v => !v)}>
              {showTranslation ? t.hideTranslation : t.showTranslation}
            </Button>
            {card.audioSrc && (
              <Button variant="secondary" onClick={() => new Audio(card.audioSrc!).play()}>
                {t.playAudio}
              </Button>
            )}
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-2">
          <Button variant="primaryOutline" onClick={() => setCurrentIndex(i => (i - 1 + cards.length) % cards.length)}>{t.prev}</Button>
          <Button onClick={() => setCurrentIndex(i => (i + 1) % cards.length)}>{t.next}</Button>
        </div>

        <div className="text-sm text-gray-500">{currentIndex + 1} / {cards.length}</div>
      </div>
    </>
  );
};

// ---------------------- Компонент: LessonButton ----------------------
export const LessonButton = ({
  id,
  index,
  totalCount,
  locked,
  current,
  percentage,
  completed,
}: LessonButtonProps) => {
  const { lang } = useLanguage();
  const t = translations[lang].lesson;

  const cycleLength = 8;
  const cycleIndex = index % cycleLength;
  let indentationLevel;
  if (cycleIndex <= 2) indentationLevel = cycleIndex;
  else if (cycleIndex <= 4) indentationLevel = 4 - cycleIndex;
  else if (cycleIndex <= 6) indentationLevel = 4 - cycleIndex;
  else indentationLevel = cycleIndex - 8;
  const rightPosition = indentationLevel * 40;

  const isFirst = index === 0;
  const isLast = index === totalCount - 1;
  const Icon = completed ? Check : isLast ? Crown : Star;
  const href = completed ? `/lesson?lessonId=${id}` : "/lesson";

  return (
    <Link href={href} aria-disabled={locked} style={{ pointerEvents: locked ? "none" : "auto" }}>
      <div className="relative" style={{ right: `${rightPosition}px`, marginTop: isFirst && !completed ? 60 : 24 }}>
        {current ? (
          <div className="h-[102px] w-[102px] relative">
            <div className="absolute -top-6 left-2.5 px-3 py-2.5 border-2 font-bold uppercase text-orange-500 bg-white rounded-xl animate-bounce tracking-wide z-10">
              {t.start}
              <div className="absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-x-1/2" />
            </div>
            <CircularProgressbarWithChildren
              value={Number.isNaN(percentage) ? 0 : percentage}
              styles={{ path: { stroke: "#4ade80" }, trail: { stroke: "#e5e7eb" } }}
            >
              <Button size="rounded" variant={locked ? "locked" : "secondary"} className="h-[70px] w-[70px] border-b-8">
                <Icon className={`h-10 w-10 ${locked ? "fill-neutral-400 text-neutral-400 stroke-neutral-400" : "fill-primary-foreground text-primary-foreground"} ${completed && "fill-none stroke-[4]"}`} />
              </Button>
            </CircularProgressbarWithChildren>
          </div>
        ) : (
          <Button size="rounded" variant={locked ? "locked" : "secondary"} className="h-[70px] w-[70px] border-b-8">
            <Icon className={`h-10 w-10 ${locked ? "fill-neutral-400 text-neutral-400 stroke-neutral-400" : "fill-primary-foreground text-primary-foreground"} ${completed && "fill-none stroke-[4]"}`} />
          </Button>
        )}
      </div>
    </Link>
  );
};

// ---------------------- Компонент: UnitBannerClient ----------------------
export const UnitBannerClient = ({ title, description }: UnitBannerProps) => {
  const { lang } = useLanguage();
  const t = translations[lang].unitBanner;

  return (
    <div className="w-full rounded-xl bg-orange-300 p-5 text-gray-800 flex items-center justify-between">
      <div className="space-y-2.5">
        <h3 className="text-2xl lg:text-3xl font-bold">{t.title}</h3>
        <p className="text-lg lg:text-xl">{t.description}</p>
      </div>
      <Link href="/practice">
        <Button size="lg" variant="secondary" className="hidden lg:flex border-2 border-b-4 active:border-b-2 text-xl font-semibold px-6 py-3">
          <NotebookText className="mr-3 h-7 w-7" />
          {t.button}
        </Button>
      </Link>
    </div>
  );
};

// ---------------------- Компонент: UnitBanner (обгортка) ----------------------
export const UnitBanner = (props: UnitBannerProps) => {
  return <UnitBannerClient {...props} />;
};

// ---------------------- Компонент: Unit ----------------------
export const Unit = ({
  id,
  order,
  title,
  description,
  lessons,
  activeLesson,
  activeLessonPercentage,
}: any) => {
  return (
    <>
      <UnitBanner title={title} description={description} />
      <div className="flex items-center flex-col relative">
        {lessons.map((lesson: any, index: number) => {
          const isCurrent = lesson.id === activeLesson?.id;
          const isLocked = !lesson.completed && !isCurrent;
          const percentage = isCurrent ? activeLessonPercentage : lesson.completed ? 100 : 0;
          return (
            <LessonButton
              key={lesson.id}
              id={lesson.id}
              index={index}
              totalCount={lessons.length}
              current={isCurrent}
              locked={isLocked}
              completed={lesson.completed}
              percentage={percentage}
            />
          );
        })}
      </div>
    </>
  );
};

// ---------------------- Компонент: PracticeClient ----------------------
const PracticeClient = ({
  userProgress,
  activeRegion,
  words,
  videoSrc,
  fileSrc,
  fileSrcCountry,
}: PracticeProps) => {
  const lang = userProgress.lang as "ua" | "en" | "de";
  const regionTitle = userProgress.activeRegion.translations?.[lang] ?? userProgress.activeRegion.title;

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress activeCourse={activeRegion} hearts={userProgress.hearts} points={userProgress.points} />
        <Quests points={userProgress.points} />
        <RegionImage activeRegionId={activeRegion.id} />
        <Feedback />
      </StickyWrapper>

      <FeedWrapper>
        <h1 className="text-3xl font-bold mb-6">{translations[lang].practice.title}: {regionTitle}</h1>
        <p className="text-lg font-semibold text-center">{translations[lang].practice.watchVideo}</p>
        <video controls className="w-full rounded-2xl shadow-lg border">
          <source src={videoSrc} type="video/mp4" />
          {translations[lang].practice.videoNotSupported}
        </video>

        <div className="flex justify-center mt-6 gap-4">
          <a href={fileSrc} download><Button size="lg" variant="primary">{translations[lang].practice.downloadRegion}</Button></a>
          <a href={fileSrcCountry} download><Button size="lg" variant="secondaryOutline">{translations[lang].practice.downloadCountry}</Button></a>
        </div>

        <h2 className="text-2xl font-bold text-center mt-10">{translations[lang].practice.dictionary}</h2>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full border border-gray-300 rounded-xl">
            <thead className="bg-orange-100">
              <tr>
                <th className="p-3 border text-lg">ID</th>
                <th className="p-3 border text-lg">{translations[lang].practice.table.audio}</th>
                <th className="p-3 border text-lg">{translations[lang].practice.table.dialect}</th>
                <th className="p-3 border text-lg">{translations[lang].practice.table.translation}</th>
              </tr>
            </thead>
            <tbody>
              {words.map((item: any) => (
                <tr key={item.id} className="text-center">
                  <td className="p-3 border text-lg font-medium">{item.id}</td>
                  <td className="p-3 border"><audio controls className="mx-auto w-32 h-8"><source src={item.audio} type="audio/mpeg" /></audio></td>
                  <td className="p-3 border text-xl font-semibold">{item.word}</td>
                  <td className="p-3 border text-xl">{item.translations?.[lang] ?? item.translation ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default PracticeClient;

