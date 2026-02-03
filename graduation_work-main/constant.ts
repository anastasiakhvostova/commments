export const POINTS_TO_REFILL = 10;

export type QuestKey = "earn20" | "earn50" | "earn100" | "earn500" | "earn1000";

export const quests: { key: QuestKey; value: number }[] = [
  { key: "earn20", value: 20 },
  { key: "earn50", value: 50 },
  { key: "earn100", value: 100 },
  { key: "earn500", value: 500 },
  { key: "earn1000", value: 1000 },
];

