import { cache } from "react";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

import db from "./drizzle";
import {
  userProgress,
  countries,
  regions,
  units,
  lessons,
  challenges,
  challengesProgress,
} from "./schema";
export const getCountries = cache(async () => {
    const data = await db.query.countries.findMany()

    return data;
})
export const getCountryById = cache(async (countryId: number) => {
    const data = await db.query.countries.findFirst({
        where: eq(countries.id, countryId)


    })

    return data

})
/* -------------------- USER PROGRESS -------------------- */
export const getUserProgress = async () => {
  const { userId } = await auth();
  if (!userId) return null;

  return db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCountry: true,
      activeRegion: true,
    },
  });
};

/* -------------------- UNITS -------------------- */
export const getUnits = async () => {
  const { userId } = await auth();
  const user = await getUserProgress();
  if (!userId || !user?.activeRegionId) return [];

  const unitsInRegion = await db.query.units.findMany({
    where: eq(units.regionId, user.activeRegionId),
    orderBy: (u, { asc }) => [asc(u.order)],
    with: {
      lessons: {
        orderBy: (l, { asc }) => [asc(l.order)],
        with: {
          challenges: {
            orderBy: (c, { asc }) => [asc(c.order)],
            with: {
              challengeProgress: {
                where: eq(challengesProgress.userId, userId),
              },
            },
          },
        },
      },
    },
  });

  return unitsInRegion.map((unit) => {
    const lessonsWithStatus = unit.lessons.map((lesson) => {
      const completed = lesson.challenges.every((ch) =>
        ch.challengeProgress?.some(p => p.completed && !p.isPractice)
      );

      return { ...lesson, completed };
    });

    // Визначаємо перший доступний урок (activeLesson)
    const firstIncompleteIndex = lessonsWithStatus.findIndex(l => !l.completed);
    const lessonsFinal = lessonsWithStatus.map((lesson, index) => ({
      ...lesson,
      active: firstIncompleteIndex === -1 ? false : index === firstIncompleteIndex,
    }));

    return { ...unit, lessons: lessonsFinal };
  });
};


/* -------------------- REGIONS -------------------- */
export const getRegionsByCountryId = cache(async (countryId: number) => {
  return (
    (await db.query.regions.findMany({
      where: eq(regions.countryId, countryId),
      with: {
        units: {
          orderBy: (units, { asc }) => [asc(units.order)],
          with: { lessons: { orderBy: (lessons, { asc }) => [asc(lessons.order)] } },
        },
      },
    })) ?? []
  );
});

/* -------------------- REGION PROGRESS -------------------- */
export const getRegionProgress = cache(async () => {
  const { userId } = await auth();
  const user = await getUserProgress();
  if (!userId || !user?.activeRegionId) return null;

  const unitsInRegion = await db.query.units.findMany({
    orderBy: (units, { asc }) => [asc(units.order)],
    where: eq(units.regionId, user.activeRegionId),
    with: {
      lessons: {
        orderBy: (lessons, { asc }) => [asc(lessons.order)],
        with: {
          challenges: {
            with: { challengeProgress: { where: eq(challengesProgress.userId, userId) } },
          },
        },
      },
    },
  });

  // знайти перший непройдений урок
  const firstUncompletedLesson = unitsInRegion
    .flatMap((u) => u.lessons)
      .find((lesson) =>
    !lesson.challenges.every((ch) =>
      ch.challengeProgress?.some(p => p.completed && !p.isPractice)
    )
  )


  return { activeLesson: firstUncompletedLesson, activeLessonId: firstUncompletedLesson?.id };
});

/* -------------------- LESSON PERCENTAGE -------------------- */
export const getLessonPercantage = cache(async () => {
    const regionProgress = await getRegionProgress()

    if (!regionProgress?.activeLessonId) {
        return 0
    }
    const lesson = await getLesson(regionProgress.activeLessonId)

    if (!lesson || lesson.challenges.length === 0) {
  return 0
}

    const completedChallenges = lesson.challenges
        .filter((challenge) => challenge.completed)
    const percentage = Math.round(
        (completedChallenges.length / lesson.challenges.length) * 100
    )

    return percentage
})
/* -------------------- USER LANGUAGE -------------------- */
export const getUserLanguage = cache(async () => {
  const user = await getUserProgress();
  return (user?.lang as "ua" | "en" | "de") || "ua";
});

export const getLesson = cache(async (id?: number) => {
  const { userId } = await auth();
  if (!userId) return null;

  const regionProgress = await getRegionProgress();
  const lessonId = id || regionProgress?.activeLessonId;
  if (!lessonId) return null;

  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, lessonId),
    with: {
      challenges: {
        orderBy: (challenges, { asc }) => [asc(challenges.order)],
        with: {
          challengeOption: true,
          challengeProgress: { where: eq(challengesProgress.userId, userId) },
        },
      },
    },
  });

  if (!data || !data.challenges) return null;

  const normalizedChallenges = data.challenges.map((challenge) => ({
    ...challenge,
    completed: challenge.challengeProgress?.some((p) => p.completed) ?? false,
  }));

  const lessonCompleted = normalizedChallenges.every((ch) => ch.completed);

  return { ...data, challenges: normalizedChallenges, completed: lessonCompleted };
});


// export const getLessonPercantage = cache(async () => {
//     const regionProgress = await getRegionProgress()

//     if (!regionProgress?.activeLessonId) {
//         return 0
//     }
//     const lesson = await getLesson(regionProgress.activeLessonId)

//     if (!lesson || lesson.challenges.length === 0) {
//   return 0
// }

//     const completedChallenges = lesson.challenges
//         .filter((challenge) => challenge.completed)
//     const percentage = Math.round(
//         (completedChallenges.length / lesson.challenges.length) * 100
//     )

//     return percentage
// })

export const getTopTenUsers = cache(async () => {
    const { userId } = await auth()

    if (!userId){
        return []
    }
    const data = await db.query.userProgress.findMany({
        orderBy: (userProgress, { desc }) => [desc(userProgress.points)],
        limit: 10,
        columns: {
            userId: true,
            userName: true,
            userImageSrc: true,
            points: true,
        }

    })
    return data
})