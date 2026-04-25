export type Difficulty = "easy" | "normal" | "hard";

export type Quest = {
  id: string;
  emoji: string;
  title: string;
  oneLiner?: string;
  steps: string[];
  minutes: number;
  cost: number;
  difficulty: Difficulty;
  tags: string[];
  color: keyof typeof CARD_COLORS;
  doneCount?: number;
};

export type Record = {
  id: string;
  questId: string;
  questTitle: string;
  questEmoji: string;
  note?: string;
  photoUrl?: string;
  createdAt: string;
};

export type Badge = {
  id: string;
  emoji: string;
  name: string;
  description: string;
  unlocked: boolean;
};

export const CARD_COLORS = {
  pink: "bg-card-pink",
  blue: "bg-card-blue",
  yellow: "bg-card-yellow",
  green: "bg-card-green",
  purple: "bg-card-purple",
  orange: "bg-card-orange",
} as const;
