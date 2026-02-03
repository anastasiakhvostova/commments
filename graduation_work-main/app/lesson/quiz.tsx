"use client";

import { Footer } from "./footer";
import { challengesOptions, challenges } from "@/db/schema";
import { useState, useTransition, useRef, useEffect } from "react";
import { Header } from "./header";
import { QuestionBubble } from "./question-bubble";
import { Challenge } from "./challenge";
import { WriteChallenge, WriteChallengeRef } from "./write-challenge";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { reduceHearts, type ReduceHeartsResult } from "@/actions/user-progress";
import { useAudio, useWindowSize } from "react-use";
import Image from "next/image";
import { ResultCard } from "./result-card";
import Confetti from "react-confetti";
import { useRouter } from "next/navigation";
import { useHeartsModal } from "@/store/use-hearts-modal";
import { usePracticeModal } from "@/store/use-practice-modal";
import { PracticeModal } from "@/components/modals/practice-modal";
import { useLanguage } from "@/components/languageContext";
import { translations } from "@/components/translations";

type Props = {
  initialLessonId: number;
  initialHearts: number;
  initialPercentage: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOption: typeof challengesOptions.$inferSelect[];
  })[];
};

export const Quiz = ({
  initialLessonId,
  initialHearts,
  initialPercentage,
  initialLessonChallenges,
}: Props) => {
  const router = useRouter();
  const { width, height } = useWindowSize();
  const heartsModal = useHeartsModal();
  const practiceModal = usePracticeModal();

  const { lang } = useLanguage();
  const t = translations[lang].quiz;

  const [correctAudio, _c, correctControls] = useAudio({ src: "/correct.mp3" });
  const [incorrectAudio, _i, incorrectControls] = useAudio({ src: "/incorrect.mp3" });
  const [finishAudio] = useAudio({ src: "/finish.mp3", autoPlay: false });

  const [pending, startTransition] = useTransition();

  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(initialPercentage);
  const [challengesState] = useState(initialLessonChallenges);

  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompleted = initialLessonChallenges.findIndex((ch) => !ch.completed);
    return uncompleted === -1 ? 0 : uncompleted;
  });

  const [isFinished, setIsFinished] = useState(activeIndex >= initialLessonChallenges.length);

  const isPracticeMode = initialPercentage >= 100;

  // 🔹 Локальний стан, щоб відкрити PracticeModal лише один раз
  const [practiceModalOpened, setPracticeModalOpened] = useState(false);

  useEffect(() => {
    if (isPracticeMode && !practiceModalOpened) {
      practiceModal.open();
      setPracticeModalOpened(true);
    }
  }, [isPracticeMode, practiceModal, practiceModalOpened]);

  const [selectedOption, setSelectedOption] = useState<number | undefined>();
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

  const writeRef = useRef<WriteChallengeRef>(null);

  const challenge = challengesState[activeIndex];
  const options = challenge?.challengeOption ?? [];

  if (!challenge) return null;

  // 🌍 ПЕРЕКЛАД ПИТАННЯ
  const question =
    challenge.questionTranslations?.[lang] ?? challenge.question;

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

    // WRITE
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

    // SELECT / ASSIST / LISTEN
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

  // 🎉 FINISH
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

      <PracticeModal /> {/* 🔹 додали тут, щоб показувалась у всіх уроках */}

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
