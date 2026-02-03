//нАСТЯ
"use client"; // Компонент рендериться на клієнті

import { Footer } from "./footer"; // Футер з кнопками перевірки/продовження
import { challengesOptions, challenges } from "@/db/schema"; // Схема бази даних для завдань
import { useState, useTransition, useRef, useEffect } from "react";
import { Header } from "./header"; // Хедер з серцями та прогресом
import { QuestionBubble } from "./question-bubble"; // Бульбашка питання
import { Challenge } from "./challenge"; // Компонент для SELECT / ASSIST / LISTEN
import { WriteChallenge, WriteChallengeRef } from "./write-challenge"; // Компонент для WRITE-завдань
import { upsertChallengeProgress } from "@/actions/challenge-progress"; // Функція збереження прогресу
import { reduceHearts, type ReduceHeartsResult } from "@/actions/user-progress"; // Функції роботи з серцями
import { useAudio, useWindowSize } from "react-use"; // Хуки для аудіо та розміру вікна
import Image from "next/image"; // Next.js Image
import { ResultCard } from "./result-card"; // Картка результатів
import Confetti from "react-confetti"; // Конфетті при завершенні уроку
import { useRouter } from "next/navigation"; // Навігація
import { useHeartsModal } from "@/store/use-hearts-modal"; // Модалка сердець
import { usePracticeModal } from "@/store/use-practice-modal"; // Модалка практики
import { PracticeModal } from "@/components/modals/practice-modal"; // Компонент модалки практики
import { useLanguage } from "@/components/languageContext"; // Хук локалізації
import { translations } from "@/components/translations"; // Переклади

// Тип пропсів для компонента Quiz
type Props = {
  initialLessonId: number;
  initialHearts: number;
  initialPercentage: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOption: typeof challengesOptions.$inferSelect[];
  })[];
};

// ✅ Основний компонент Quiz — навчальний двигун
export const Quiz = ({
  initialLessonId,
  initialHearts,
  initialPercentage,
  initialLessonChallenges,
}: Props) => {
  const router = useRouter(); // Навігація
  const { width, height } = useWindowSize(); // Розміри вікна для конфетті
  const heartsModal = useHeartsModal(); // Модалка сердець
  const practiceModal = usePracticeModal(); // Модалка практики

  const { lang } = useLanguage(); // Поточна мова
  const t = translations[lang].quiz; // Переклади для Quiz

  // Аудіо
  const [correctAudio, _c, correctControls] = useAudio({ src: "/correct.mp3" });
  const [incorrectAudio, _i, incorrectControls] = useAudio({ src: "/incorrect.mp3" });
  const [finishAudio] = useAudio({ src: "/finish.mp3", autoPlay: false });

  const [pending, startTransition] = useTransition(); // React Transition для оновлення стану

  // Локальні стани
  const [hearts, setHearts] = useState(initialHearts); // Серця користувача
  const [percentage, setPercentage] = useState(initialPercentage); // Прогрес уроку
  const [challengesState] = useState(initialLessonChallenges); // Список завдань

  // Індекс активного завдання
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompleted = initialLessonChallenges.findIndex((ch) => !ch.completed);
    return uncompleted === -1 ? 0 : uncompleted;
  });

  const [isFinished, setIsFinished] = useState(activeIndex >= initialLessonChallenges.length); // Чи урок завершено
  const isPracticeMode = initialPercentage >= 100; // Перевірка практичного режиму

  // 🔹 Локальний стан, щоб відкрити PracticeModal лише один раз
  const [practiceModalOpened, setPracticeModalOpened] = useState(false);

  useEffect(() => {
    if (isPracticeMode && !practiceModalOpened) {
      practiceModal.open();
      setPracticeModalOpened(true);
    }
  }, [isPracticeMode, practiceModal, practiceModalOpened]);

  const [selectedOption, setSelectedOption] = useState<number | undefined>(); // Вибір користувача
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none"); // Статус завдання

  const writeRef = useRef<WriteChallengeRef>(null); // Ref для WRITE-завдань

  const challenge = challengesState[activeIndex]; // Поточне завдання
  const options = challenge?.challengeOption ?? [];

  if (!challenge) return null;

  // 🌍 Переклад питання
  const question = challenge.questionTranslations?.[lang] ?? challenge.question;

  // Функції для відтворення аудіо
  const playAudio = async (src?: string | null) => {
    if (!src) return;
    try {
      const audio = new Audio(src);
      await audio.play();
    } catch {}
  };

  const playChallengeAudio = () => {
    if (challenge.audioSrc) return playAudio(challenge.audioSrc);
    const opt = options.find((o) => o.audioSrc);
    if (opt?.audioSrc) playAudio(opt.audioSrc);
  };

  // Обробка переходу до наступного завдання
  const onNext = () => {
    if (activeIndex + 1 >= challengesState.length) {
      setIsFinished(true);
      setStatus("none");
      return;
    }
    setActiveIndex((prev) => prev + 1);
    setStatus("none");
    setSelectedOption(undefined);
    writeRef.current?.clear();
  };

  // Обробка перевірки відповіді та логіки сердець
  const onContinue = () => {
    if (status !== "none") {
      if (status === "correct") onNext();
      else setStatus("none");
      return;
    }

    if (hearts === 0) {
      heartsModal.open();
      return;
    }

    // WRITE-завдання
    if (challenge.type === "WRITE") {
      const answer = writeRef.current?.getValue() || "";
      const correctAnswer = options.find((o) => o.correct)?.text || "";
      const isCorrect = answer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
      setStatus(isCorrect ? "correct" : "wrong");

      if (isCorrect) {
        startTransition(() => {
          upsertChallengeProgress(challenge.id);
          correctControls.play();
          setPercentage((prev) =>
            challenge.completed ? prev : prev + 100 / challengesState.length
          );
        });
      } else {
        startTransition(() => {
          reduceHearts(challenge.id, initialLessonId).then((res: ReduceHeartsResult) => {
            if (res && "error" in res) {
              if (res.error === "серця") {
                setHearts(0);
                heartsModal.open();
                return;
              }
              if (res.error === "practice") {
                incorrectControls.play();
                return;
              }
            }
            incorrectControls.play();
            setHearts((prev) => Math.max(prev - 1, 0));
          });
        });
      }
      return;
    }

    // SELECT / ASSIST / LISTEN завдання
    if (!selectedOption) return;
    const correctOption = options.find((o) => o.correct);
    if (!correctOption) return;

    const isCorrect = correctOption.id === selectedOption;
    setStatus(isCorrect ? "correct" : "wrong");

    if (isCorrect) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id);
        correctControls.play();
        setPercentage((prev) =>
          challenge.completed ? prev : prev + 100 / challengesState.length
        );
      });
    } else {
      startTransition(() => {
        reduceHearts(challenge.id, initialLessonId).then((res: ReduceHeartsResult) => {
          if (res && "error" in res) {
            if (res.error === "серця") {
              setHearts(0);
              heartsModal.open();
              return;
            }
            if (res.error === "practice") {
              incorrectControls.play();
              return;
            }
          }
          incorrectControls.play();
          setHearts((prev) => Math.max(prev - 1, 0));
        });
      });
    }
  };

  // 🎉 FINISH — якщо урок завершено
  if (isFinished) {
    return (
      <>
        {finishAudio}
        <Confetti width={width} height={height} recycle={false} />

        <div className="flex flex-col gap-y-6 max-w-lg mx-auto text-center items-center justify-center h-full">
          <Image src="/finish.png" alt="Finish" height={100} width={100} />

          <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
            {t.greatJob}
            <br />
            {t.lessonFinished}
          </h1>

          <div className="flex gap-x-4">
            <ResultCard
              variant="points"
              value={isPracticeMode ? 0 : challengesState.length * 10}
              label={t.resultCard.pointsLabel}
            />
            <ResultCard
              variant="hearts"
              value={hearts}
              label={t.resultCard.heartsLabel}
            />
          </div>

          <button
            onClick={() => router.push("/learn")}
            className="mt-6 px-8 py-3 rounded-full bg-yellow-400 font-semibold"
          >
            {t.continue}
          </button>
        </div>
      </>
    );
  }

  // 🧠 TITLE
  const title = challenge.type === "ASSIST" ? t.chooseCorrect : question;

  return (
    <>
      {correctAudio}
      {incorrectAudio}
      {finishAudio}

      <PracticeModal /> {/* 🔹 модалка практики */}

      <Header hearts={hearts} percentage={percentage} />

      <div className="flex-1 flex items-center justify-center">
        {challenge.type === "LISTEN" ? (
          <div className="w-full max-w-4xl rounded-3xl bg-white p-8">
            <h1 className="text-center text-2xl font-semibold">{t.listenAndChoose}</h1>

            <div className="flex justify-center mt-6">
              <button
                onClick={playChallengeAudio}
                className="rounded-full bg-orange-600 px-6 py-3 text-white"
              >
                {t.listen}
              </button>
            </div>

            <Challenge
              options={options}
              onSelect={(id) => status === "none" && setSelectedOption(id)}
              status={status}
              selectedOption={selectedOption}
              disabled={false}
              type={challenge.type}
            />
          </div>
        ) : (
          <div className="max-w-xl w-full px-6">
            <h1 className="text-2xl font-bold mb-6">{title}</h1>

            {challenge.type === "ASSIST" && <QuestionBubble question={question} />}

            {challenge.type === "WRITE" ? (
              <WriteChallenge ref={writeRef} placeholder={t.writePlaceholder} />
            ) : (
              <Challenge
                options={options}
                onSelect={(id) => status === "none" && setSelectedOption(id)}
                status={status}
                selectedOption={selectedOption}
                disabled={false}
                type={challenge.type}
              />
            )}
          </div>
        )}
      </div>

      <Footer disabled={pending} status={status} onCheck={onContinue} />
    </>
  );
};
