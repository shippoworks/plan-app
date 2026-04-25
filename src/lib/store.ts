import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Record } from "../types";

type AppState = {
  records: Record[];
  totalDone: number;
  level: number;
  xp: number;
  unlockedBadges: string[];
  addRecord: (r: Record) => { leveledUp: boolean; newBadges: string[] };
  reset: () => void;
};

const xpForDone = 10;

const xpToLevel = (xp: number): number => {
  // Lv 1: 0xp, Lv2: 30, Lv3: 70, Lv5: 200, Lv10: 1000
  if (xp < 30) return 1;
  if (xp < 70) return 2;
  if (xp < 130) return 3;
  if (xp < 200) return 4;
  if (xp < 300) return 5;
  if (xp < 450) return 6;
  if (xp < 650) return 7;
  if (xp < 900) return 8;
  if (xp < 1200) return 9;
  return 10;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      records: [],
      totalDone: 0,
      level: 1,
      xp: 0,
      unlockedBadges: ["b1", "b2", "b3", "b4", "b5"],
      addRecord: (r) => {
        const prevLevel = get().level;
        const newXp = get().xp + xpForDone;
        const newLevel = xpToLevel(newXp);
        set({
          records: [r, ...get().records],
          totalDone: get().totalDone + 1,
          xp: newXp,
          level: newLevel,
        });
        return { leveledUp: newLevel > prevLevel, newBadges: [] };
      },
      reset: () => set({ records: [], totalDone: 0, level: 1, xp: 0, unlockedBadges: [] }),
    }),
    { name: "yatta-store" },
  ),
);

export const xpThresholds = [0, 30, 70, 130, 200, 300, 450, 650, 900, 1200];

export const progressToNext = (xp: number, level: number) => {
  const cur = xpThresholds[level - 1] ?? 0;
  const next = xpThresholds[level] ?? cur + 300;
  return Math.min(1, (xp - cur) / (next - cur));
};
